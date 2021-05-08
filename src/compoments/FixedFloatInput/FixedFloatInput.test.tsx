import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import React from 'react';

import FixedFloatInput from './FixedFloatInput';

const setup = (start) => {
    let [value, onChange] = [start, val => value = val];
    const utils = render(<FixedFloatInput data-testid='behaviour' value={value} onChange={onChange} />)
    const input = utils.getByTestId(/behaviour/i);
    return {
        input,
        value,
        onChange,
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

/**
test('can change value', async () => {
    const { input, value, onChange } = setup(12);
    onChange(100.02);
    expect((input as any).value).toBe('100.02');
});
*/

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