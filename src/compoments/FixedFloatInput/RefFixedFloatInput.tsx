import React, { useState, useEffect } from "react";

const defaultFormatter = function (precision: number, roundType: string): CallableFunction {
    precision = Math.floor(precision < 0?0:precision);
    return (number: any): string => {
        const res = Math[roundType](10 ** precision * parseFloat(number)) / 10 ** precision;
        return isNaN(res) ? '' : res.toFixed(precision);
    }
}

const connectFormatter = function (formatter: CallableFunction): CallableFunction {
    return (value: any): string => String(formatter(value));
}

type Props = {
    autofocus: boolean,
    className: string,
    disabled: boolean,
    id: string,
    formatter: Function,
    max: number,
    min: number,
    name: string,
    onChange: Function,
    precision: number,
    roundType: 'round' | 'ceil' | 'floor' 
    readonly: boolean,
    step: number | string,
    value: number | string,
};

export type RefType = HTMLInputElement;

const RefFixedFloatInput = React.forwardRef<RefType,Props>(({value, onChange = () => undefined, precision = 2, roundType = 'round', formatter = () => undefined, ...props }, ref) => {
    const format = connectFormatter(formatter ? formatter : defaultFormatter(precision, roundType));
    const [innerValue, setInnerValue] = useState(format(value));

    function setAllValues(value, event) {
        setInnerValue(value);
        onChange(parseFloat(value), event);
    }

    function onInnerChange(event) {
        setAllValues(event.target.value, event);
    }

    function onInnerBlur(event) {
        if (innerValue !== '')
            setAllValues(format(innerValue), event);
    }

    function onInnerKeyPress(event) {
        if (['-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.'].indexOf(event.key) < 0)
            event.preventDefault();
    }

    useEffect(
        () => {
            if (parseFloat(innerValue) !== parseFloat(value as any)) {
                setInnerValue(format(value));
            }
        },
        [value]
    );

    useEffect(
        () => {
            setInnerValue(format(innerValue));
        },
        [precision]
    );

    return (
        <input
            {...props}
            ref = {ref}
            type="number"
            value={innerValue}
            onKeyPress={onInnerKeyPress.bind(this)}
            onChange={onInnerChange.bind(this)}
            onBlur={onInnerBlur.bind(this)}
        />
    );
});

export default RefFixedFloatInput;