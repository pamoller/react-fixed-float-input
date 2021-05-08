import React, { useState, useEffect } from "react";
import PropTypes, { InferProps } from 'prop-types';

const defaultFormatter = function (precision: number) {
    precision = Math.abs(Math.ceil(precision < 1 ? 0 : precision));
    return number => (Math.round(10 ** precision * parseFloat(number)) / 10 ** precision).toFixed(precision);
}


const propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    precision: PropTypes.number,
    formatter: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyPress: PropTypes.func,
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,
    inputmethod: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    name: PropTypes.string,
    readonly: PropTypes.bool,
    required: PropTypes.bool,
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    id: PropTypes.string
};

const defaultProps = {
    precision: 2,
    onBlur: () => undefined,
    onKeyPress: () => undefined
};

function FixedFloatInput({ value, onChange, precision, formatter, onBlur, onKeyPress, ...props }: InferProps<typeof FixedFloatInput.propTypes>)  {
    const format = formatter ? formatter : defaultFormatter(precision);
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
        onBlur(event.target.value, event)
    }

    function onInnerKeyPress(event) {
        if (['-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.'].indexOf(event.key) < 0)
            event.preventDefault();
        onKeyPress(event);
    }

    useEffect(
        () => {
            if ((innerValue !== '' || value !== null) && parseFloat(innerValue) !== parseFloat(value as any)) {
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

FixedFloatInput.propTypes = propTypes;
FixedFloatInput.defaultProps = defaultProps;

export default FixedFloatInput;