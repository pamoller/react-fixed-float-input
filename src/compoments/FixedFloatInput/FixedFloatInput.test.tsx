import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'

import FixedFloatInput from './FixedFloatInput';
 
function Wrapper() {
    const [value, setValue] = useState(12);
    const onChange = value => setValue(value);
    return <FixedFloatInput  data-testid='behaviour' value={value} onChange={onChange}/>;
}

const setup = (start) => {
    const utils = render(<Wrapper/>)
    const input = utils.getByTestId(/behaviour/i);
    return {
        input,
        ...utils
    };
};

test('has inital value', async () => {
    const { input } = setup(12);
    expect((input as any).value).toBe('12.00');
});

test('can change value', async () => {
    const { input } = setup(12);
    fireEvent.change(input, { target: { value: '23.0' } })
    expect((input as any).value).toBe('23.0');
});

test('round on blur', async () => {
    const { input } = setup(12);
    fireEvent.change(input, { target: { value: '23.009' } })
    fireEvent.blur(input)
    expect((input as any).value).toBe('23.01');
});

test('round negative on blur', async () => {
    const { input } = setup(12);
    fireEvent.change(input, { target: { value: '-23.009' } })
    fireEvent.blur(input)
    expect((input as any).value).toBe('-23.01');
});

test('revoke illegal characters', async () => {
    const { input } = setup(12);
    fireEvent.change(input, { target: { value: 'eab' } })
});