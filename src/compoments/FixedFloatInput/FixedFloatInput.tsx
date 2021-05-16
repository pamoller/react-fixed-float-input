import React, { useState, useEffect, InputHTMLAttributes } from "react";

const defaultFormatter = function (precision: number, roundType: string, locale: string): CallableFunction {
    precision = Math.floor(precision < 0 ? 0 : precision);
    roundType = ["round", "ceil", "floor"].indexOf(roundType) < 0?"round":roundType;
    return (number: any): string => {
        const res = Math[roundType](10 ** precision * parseFloat(number)) / 10 ** precision;
        return isNaN(res) ? '' : res.toFixed(precision);
    }
}

const connectFormatter = function (formatter: CallableFunction): CallableFunction {
    return (value: any): string => {
        return String(formatter(value))
    };
}

export interface FixedFloatInputType extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    formatter?: Function,
    onChangeValue?: Function,
    precision?: number,
    roundType?: string,
    value?: number | string,
    locale?: string
};

export default ({ value, onChangeValue = () => undefined, precision = 2, locale, roundType = "round", formatter, onChange = () => undefined, onBlur = () => undefined, onKeyPress = () => undefined, ...props }: FixedFloatInputType) => {
    const format = connectFormatter(formatter ? formatter : defaultFormatter(precision, roundType, 'de'));
    const [innerValue, setInnerValue] = useState(format(value));

    function setAllValues(value) {
        setInnerValue(value);
        onChangeValue(parseFloat(value));
    }

    function onInnerChange(event) {
        console.log(event.currentTarget.value)
        setAllValues(event.currentTarget.value);
        onChange(event);
    }

    function onInnerBlur(event) {
        if (innerValue !== '')
            setAllValues(format(innerValue));
        onBlur(event);
    }

    function onInnerKeyPress(event) {
        if (['-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.'].indexOf(event.key) < 0)
            event.preventDefault();
        onKeyPress(event);
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
            type="number"
            value={innerValue}
            onKeyPress={onInnerKeyPress.bind(this)}
            onChange={onInnerChange.bind(this)}
            onBlur={onInnerBlur.bind(this)}
        />
    );
}