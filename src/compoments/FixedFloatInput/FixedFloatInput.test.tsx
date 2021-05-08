import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'

import FixedFloatInput from './FixedFloatInput';

function Wrapper({ init, ...props }) {
    const [value, setValue] = useState(parseFloat(init));
    const [preset, setPreset] = useState('');
    const onChange = value => setValue(value);
    return (
        <>
            <h1>value: {value}, type:{typeof (value)}</h1>
            <FixedFloatInput data-testid='behaviour' {...props} value={value} onChange={onChange} />
            <button data-testid="button" onClick={() => setValue(parseFloat(preset))}>&lt;- Set Preset:</button>
            <input data-testid="preset" type="text" value={preset} onChange={evt => setPreset(evt.target.value)} />
        </>
    );
}

const setup = (ele) => {
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

test('has inital value', async () => {
    const { input } = setup(<Wrapper init="12" />);
    expect((input as any).value).toBe('12.00');
});

test('can change value', async () => {
    const { input } = setup(<Wrapper init="12" />);
    fireEvent.change(input, { target: { value: '23.0' } })
    expect((input as any).value).toBe('23.0');
});

test('round on blur', async () => {
    const { input } = setup(<Wrapper init="12" />);
    fireEvent.change(input, { target: { value: '23.009' } })
    fireEvent.blur(input)
    expect((input as any).value).toBe('23.01');
});

test('round negative on blur', async () => {
    const { input } = setup(<Wrapper init="12" />);
    fireEvent.change(input, { target: { value: '-23.009' } })
    fireEvent.blur(input)
    expect((input as any).value).toBe('-23.01');
});

test('revoke illegal characters', async () => {
    const { input } = setup(<Wrapper init="12" />);
    fireEvent.change(input, { target: { value: 'eab' } })
});

test('reset value', async () => {
    const { input, preset, button } = setup(<Wrapper init="12" />);
    fireEvent.change(preset, { target: { value: '13' } });
    fireEvent.click(button);
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.00');
});

test('format a sientific notated value', async () => {
    const { input } = setup(<Wrapper init="12" />);
    fireEvent.change(input, { target: { value: '13.00009e2' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('1300.01');
});

test('use a cusotm formatter', async () => {
    const { input } = setup(<Wrapper init="12" formatter={val => val} />);
    fireEvent.change(input, { target: { value: '13.009' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.009');
});

test('use a non default precision', async () => {
    const { input } = setup(<Wrapper init="12" precision={1} />);
    fireEvent.change(input, { target: { value: '13.09' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.1');
});

test('use precision = 0', async () => {
    const { input } = setup(<Wrapper init="12" precision={0} />);
    fireEvent.change(input, { target: { value: '13.09' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13');
});

test('use precision < 1', async () => {
    const { input } = setup(<Wrapper init="12" precision={Math.random()} />);
    fireEvent.change(input, { target: { value: '13.09' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13');
});

test('use negative precision', async () => {
    const { input } = setup(<Wrapper init="12" precision={Math.random()*-1000} />);
    fireEvent.change(input, { target: { value: '13.09' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13');
});
