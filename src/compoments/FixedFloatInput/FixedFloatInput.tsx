import React, { useState, useEffect } from "react";
import PropTypes, { InferProps } from 'prop-types';

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

const propTypes = {
    autofocus: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    formatter: PropTypes.func,
    max: PropTypes.number,
    min: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    precision: PropTypes.number,
    roundType: PropTypes.oneOf(['round', 'floor', 'ceil']),
    readonly: PropTypes.bool,
    //ref: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({current: PropTypes.any})]),
    ref: PropTypes.any,
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

const defaultProps = {
    precision: 2,
    roundType: 'round',
    onChange: () => undefined
};

function FixedFloatInput({ value, onChange, precision, roundType, formatter, ...props }: InferProps<typeof FixedFloatInput.propTypes>) {
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