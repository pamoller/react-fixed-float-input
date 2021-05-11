import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import PropTypes, { InferProps } from 'prop-types';

import FixedFloatInput from './FixedFloatInput';

const WrapperPropTypes = {
    init: PropTypes.any,
    type: PropTypes.string,
    formatter: PropTypes.func,
    max: PropTypes.number,
    min: PropTypes.number,
    precision: PropTypes.number,
    roundType: PropTypes.oneOf(['round', 'floor', 'ceil']),
}

const WrapperDefaultProps = {
    type: undefined
}

function Wrapper({ init, type, ...props }: InferProps<typeof Wrapper.propTypes>) {
    const cast = value => type === 'number' ? parseFloat(value) : value;
    const [value, setValue] = useState(cast(init));
    const [preset, setPreset] = useState('');
    const onChange = value => setValue(cast(value));
    return (
        <>
            <h1>value: {value}, type:{typeof (value)}</h1>
            <FixedFloatInput data-testid='behaviour' {...props} value={value} onChange={onChange} />
            <button data-testid="button" onClick={() => setValue(cast(preset))}>&lt;- Set Preset:</button>
            <input data-testid="preset" type="text" value={preset} onChange={evt => setPreset(evt.target.value)} />
        </>
    );
}

Wrapper.propTypes = WrapperPropTypes;
Wrapper.defaultProps = WrapperDefaultProps;

const setupWrapper = (ele) => {
    const utils = render(ele)
    const input = utils.getByTestId(/behaviour/i);
    const preset = utils.getByTestId(/preset/i);
    const button = utils.getByTestId(/button/i);
    return {
        input,
        preset,
        button
    };
};

const setup = (ele) => {
    const utils = render(ele)
    const input = utils.getByTestId(/behaviour/i);
    return {
        input,
    };
};

test('has inital value', async () => {
    const { input } = setupWrapper(<Wrapper init={12} />);
    expect((input as any).value).toBe('12.00');
});

test('can change value', async () => {
    const { input } = setupWrapper(<Wrapper init={12} />);
    fireEvent.change(input, { target: { value: '23.0' } })
    expect((input as any).value).toBe('23.0');
});

test('round on blur', async () => {
    const { input } = setupWrapper(<Wrapper init={12} />);
    fireEvent.change(input, { target: { value: '23.009' } })
    fireEvent.blur(input)
    expect((input as any).value).toBe('23.01');
});

test('round negative on blur', async () => {
    const { input } = setupWrapper(<Wrapper init={12} />);
    fireEvent.change(input, { target: { value: '-23.009' } })
    fireEvent.blur(input)
    expect((input as any).value).toBe('-23.01');
});

test('revoke illegal characters', async () => {
    const { input } = setupWrapper(<Wrapper init={12} />);
    fireEvent.change(input, { target: { value: 'eab' } })
});

test('reset value', async () => {
    const { input, preset, button } = setupWrapper(<Wrapper init={12} />);
    fireEvent.change(preset, { target: { value: '13' } });
    fireEvent.click(button);
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.00');
});

test('format a sientific notated value', async () => {
    const { input } = setupWrapper(<Wrapper init={12} />);
    fireEvent.change(input, { target: { value: '13.00009e2' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('1300.01');
});

test('use a cusotm formatter', async () => {
    const { input } = setupWrapper(<Wrapper init={12} formatter={val => val} />);
    fireEvent.change(input, { target: { value: '13.009' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.009');
});

test('use a non default precision', async () => {
    const { input } = setupWrapper(<Wrapper init={12} precision={1} />);
    fireEvent.change(input, { target: { value: '13.09' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.1');
});


test('use a non integer precision', async () => {
    const precision = 4 * Math.random();
    const intPrecision = Math.floor(precision);
    const value = 100 * Math.random();
    const expected = (Math.round(10 ** intPrecision * value) / 10 ** intPrecision).toFixed(intPrecision);
    const { input } = setupWrapper(<Wrapper init={12} precision={precision} />);
    fireEvent.change(input, { target: { value: value } });
    fireEvent.blur(input);
    console.log(precision, intPrecision, value, expected);
    expect((input as any).value).toBe(String(expected));
});

test('use precision = 0', async () => {
    const { input } = setupWrapper(<Wrapper init={12} precision={0} />);
    fireEvent.change(input, { target: { value: '13.09' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13');
});

test('use precision < 1', async () => {
    const { input } = setupWrapper(<Wrapper init={12} precision={Math.random()} />);
    fireEvent.change(input, { target: { value: '13.09' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13');
});

test('use precision < 0', async () => {
    const { input } = setupWrapper(<Wrapper init={12} precision={Math.random() * -1000} />);
    fireEvent.change(input, { target: { value: '13.09' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13');
});

test('use a string as value', async () => {
    const { input } = setupWrapper(<Wrapper init="12" />);
    fireEvent.change(input, { target: { value: '13.09' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.09');
})

test('use roundType = round', async () => {
    const { input } = setupWrapper(<Wrapper init="12" roundType='round' />);
    fireEvent.change(input, { target: { value: '13.091' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.09');
})

test('use roundType = ceil', async () => {
    const { input } = setupWrapper(<Wrapper init="12" roundType='ceil' />);
    fireEvent.change(input, { target: { value: '13.091' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.10');
})

test('use roundType = floor', async () => {
    const { input } = setupWrapper(<Wrapper init="12" roundType='floor' />);
    fireEvent.change(input, { target: { value: '13.091' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.09');
})

test('use no value', async () => {
    const { input } = setup(<FixedFloatInput data-testid='behaviour' />);
    expect((input as any).value).toBe('');
    fireEvent.change(input, { target: { value: '13.091' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.09');
})
