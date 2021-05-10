import React, { useState, useEffect } from "react";
import PropTypes, { InferProps } from 'prop-types';

const defaultFormatter = function (precision: number): CallableFunction {
    precision = Math.abs(Math.ceil(precision < 1 ? 0 : precision));
    return (number: any): string => {
        const res = Math.round(10 ** precision * parseFloat(number)) / 10 ** precision;
        return isNaN(res) ? '' : res.toFixed(precision);
    }
}

const connectFormatter = function (formatter: CallableFunction): CallableFunction {
    return (value: any): string => String(formatter(value));
}

const propTypes = {
    autofocus: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    formatter: PropTypes.func,
    inputmethod: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
    precision: PropTypes.number,
    readonly: PropTypes.bool,
    required: PropTypes.bool,
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.number.isRequired,
};

const defaultProps = {
    precision: 2,
    onBlur: () => undefined,
    onKeyPress: () => undefined
};

function FixedFloatInput({ value, onChange, precision, formatter, onBlur, onKeyPress, ...props }: InferProps<typeof FixedFloatInput.propTypes>) {
    const format = connectFormatter(formatter ? formatter : defaultFormatter(precision));
    const [innerValue, setInnerValue] = useState(format(value, 'onInit'));

    function setAllValues(value, event) {
        setInnerValue(value);
        onChange(parseFloat(value), event);
    }

    function onInnerChange(event) {
        setAllValues(event.target.value, event);
    }

    function onInnerBlur(event) {
        if (innerValue !== '')
            setAllValues(format(innerValue, 'onInnerBlur'), event);
        onBlur(event.target.value, event)
    }

    function onInnerKeyPress(event) {
        if (['-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.'].indexOf(event.key) < 0)
            event.preventDefault();
        onKeyPress(event);
    }

    useEffect(
        () => {
            console.log(value, typeof (value), innerValue, typeof (innerValue))
            if (parseFloat(innerValue) !== parseFloat(value as any)) {
                console.log('set inner', format(value), typeof (format(value)))
                setInnerValue(format(value, 'oneffekt'));
            }
        },
        [value]
    );

    useEffect(
        () => {
            setInnerValue(format(innerValue, 'onpresision'));
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

FixedFloatInput.propTypes = propTypes;
FixedFloatInput.defaultProps = defaultProps;

export default FixedFloatInput;