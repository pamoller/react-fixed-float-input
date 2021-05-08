import React, { useState, useEffect } from "react";
import PropTypes, { InferProps } from 'prop-types';

const defaultFormatter = function(precision) {
    return number => (Math.round(10 ** precision * parseFloat(number)) / 10 ** precision).toFixed(precision);
}

const propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    precision: PropTypes.number,
    formatter: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyPress: PropTypes.func
};

const defaultProps = {
    precision: 2,
    onBlur: () => undefined,
    onKeyPress: () => undefined
};

function FixedFloatInput({value, onChange, precision, formatter, onBlur, onKeyPress, ...props}: InferProps<typeof FixedFloatInput.propTypes>) {
    const format = formatter ? formatter : defaultFormatter(precision);
    const [innerValue, setInnerValue] = useState(format(value));
   
    function setAllValues(value, event) {
        console.log(value, typeof(value));
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
        if (['-','0','1','2','3','4','5','6','7','8','9',',','.'].indexOf(event.key) < 0)
            event.preventDefault();
        onKeyPress(event);
    }


    useEffect(
        () => {
            console.log(innerValue, typeof(innerValue), value, typeof(innerValue), (innerValue !== '' || value !== null), );
            if ((innerValue !== '' || value !== null) && parseFloat(innerValue) !== parseFloat(value as any)) {
                console.log("modified");
                setInnerValue(format(value));
            }
        },
        [value]
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