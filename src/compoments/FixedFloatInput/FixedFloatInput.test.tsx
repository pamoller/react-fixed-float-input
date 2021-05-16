import React, { useState, useRef } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'

import FixedFloatInput, { FixedFloatInputType } from './FixedFloatInput';

function Wrapper({ value, ...props }: FixedFloatInputType) {
    const [innerValue, setInnerValue] = useState(value);
    const [preset, setPreset] = useState('');
    const onChangeValue = value => setInnerValue(value);
    return (
        <>
            <FixedFloatInput data-testid='behaviour' {...props} value={innerValue} onChangeValue={onChangeValue} />
            <button data-testid="button" onClick={() => setInnerValue(preset)}>&lt;- Set Preset:</button>
            <input data-testid="preset" type="text" value={preset} onChange={evt => setPreset(evt.target.value)} />
        </>
    );
}

const setup = (ele, id = undefined) => {
    return render(ele).getByTestId(id ? id : /behaviour/i);
};

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

test('prop className got written', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' className="base custom" />);
    expect((input as any).className).toBe('base custom');
})


test('prop formatter overwrites the default formatter', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' value={12} formatter={val => val} />);
    fireEvent.change(input, { target: { value: '13.009' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.009');
});

test('prop precision varies the default', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' value={12} precision={1} />);
    fireEvent.change(input, { target: { value: '13.09' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.1');
});

test('prop precision = float is evaulated to an integer', async () => {
    const precision = 4 * Math.random();
    const intPrecision = Math.floor(precision);
    const value = 100 * Math.random();
    const expected = (Math.round(10 ** intPrecision * value) / 10 ** intPrecision).toFixed(intPrecision);
    const input = setup(<FixedFloatInput data-testid='behaviour' value={12} precision={precision} />);
    fireEvent.change(input, { target: { value: value } });
    fireEvent.blur(input);
    console.log(precision, intPrecision, value, expected);
    expect((input as any).value).toBe(String(expected));
});

test('prop precision = 0 is evaulated to 0', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' value={12} precision={0} />);
    fireEvent.change(input, { target: { value: '13.09' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13');
});

test('prop precision < 1  is evaulated to 0', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' value={12} precision={Math.random()} />);
    fireEvent.change(input, { target: { value: '13.09' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13');
});

test('prop precision < 0  is evaulated to 0', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' value={12} precision={Math.random() * -1000} />);
    fireEvent.change(input, { target: { value: '13.09' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13');
});

test('prop roundType = round works', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' value={12} roundType='round' />);
    fireEvent.change(input, { target: { value: '13.091' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.09');
})

test('prop roundType = ceil works', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' value={12} roundType='ceil' />);
    fireEvent.change(input, { target: { value: '13.091' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.10');
})

test('prop roundType = floor works', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' value={12} roundType='floor' />);
    fireEvent.change(input, { target: { value: '13.091' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.09');
})

test('prop value can be skipped', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' />);
    expect((input as any).value).toBe('');
    fireEvent.change(input, { target: { value: '13.091' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.09');
})

test('prop value initializes', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' value={12} />);
    expect((input as any).value).toBe('12.00');
});

test('prop value react on reinitialization', async () => {
    const { input, preset, button } = setupWrapper(<Wrapper value={12} />);
    fireEvent.change(preset, { target: { value: '13' } });
    fireEvent.click(button);
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.00');
});

test('prop value can be changed manually', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' value={12} />);
    fireEvent.change(input, { target: { value: '23.0' } })
    expect((input as any).value).toBe('23.0');
});

test('prop value = string is accepted', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' value="12" />);
    fireEvent.change(input, { target: { value: '13.09' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('13.09');
})

test('prop value = sientific notated value is accepted', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' value={12} />);
    fireEvent.change(input, { target: { value: '13.00009e2' } });
    fireEvent.blur(input);
    expect((input as any).value).toBe('1300.01');
});

test('prop value revoke illegal input characters', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' value={12} />);
    fireEvent.change(input, { target: { value: 'eab' } })
});

test('prop value get rounded on negative value ', async () => {
    const input = setup(<FixedFloatInput data-testid='behaviour' value={12} />);
    fireEvent.change(input, { target: { value: '-23.009' } })
    fireEvent.blur(input)
    expect((input as any).value).toBe('-23.01');
});