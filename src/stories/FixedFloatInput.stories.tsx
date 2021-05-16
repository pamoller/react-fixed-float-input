import React, { useState, useRef } from 'react';
import FixedFloatInput from '../compoments/FixedFloatInput';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('App Test', module);


stories.add('Default behaviour (preset is number)', () => {
    const [value, setValue] = useState("12");
    const [preset, setPreset] = useState("");
    const onChangeValue = value => setValue(value);

    return (
        <>
            <h1>value: {value}, type:{typeof (value)}</h1>
            <FixedFloatInput value={value} onChangeValue={onChangeValue} />
            <button onClick={() => setValue(preset)}>&lt;- SetValue:</button>
            <input type="number" value={preset} onChange={evt => setPreset(evt.target.value)} />
        </>
    );

});


stories.add('Default behaviour (preset is string)', () => {
    const [value, setValue] = useState(12);
    const [preset, setPreset] = useState('');
    const onChangeValue = value => setValue(value);

    return (
        <>
            <h1>value: {value}, type:{typeof (value)}</h1>
            <FixedFloatInput value={value} onChangeValue={onChangeValue} />
            <button onClick={() => setValue(parseFloat(preset))}>&lt;- SetValue:</button>
            <input type="text" value={preset} onChange={evt => setPreset(evt.target.value)} />
        </>
    );

});

stories.add('Default behaviour (value is a cated string)', () => {
    const [value, setValue] = useState('12');
    const [preset, setPreset] = useState('');
    const onChangeValue = value => setValue(value);

    return (
        <>
            <h1>value: {value}, type:{typeof (value)}</h1>
            <FixedFloatInput value={value as any as number} onChangeValue={onChangeValue} />
            <button onClick={() => setValue(preset)}>&lt;- SetValue:</button>
            <input type="text" value={preset} onChange={evt => setPreset(evt.target.value)} />
        </>
    );

});

stories.add('Precision', () => {
    const [value, setValue] = useState(12);
    const [preset, setPreset] = useState('2');
    const [precision, setPrecision] = useState(2);
    const onChangeValue = value => setValue(value);

    return (
        <>
            <h1>value: {value}, type:{typeof (value)}</h1>
            <FixedFloatInput value={value} precision={precision} onChangeValue={onChangeValue} />
            <button onClick={() => setPrecision(parseInt(preset))}>&lt;- SetPrecision:</button>
            <input type="number" value={preset} onChange={evt => setPreset(evt.target.value)} />
        </>
    );

});

stories.add('Step width', () => {
    const [value, setValue] = useState(12);
    const [preset, setPreset] = useState('0.01');
    const [step, setStep] = useState(0.01);
    const onChangeValue = value => setValue(value);

    return (
        <>
            <h1>value: {value}, type:{typeof (value)}</h1>
            <FixedFloatInput value={value} step={preset} onChangeValue={onChangeValue} />
            <button onClick={() => setStep(parseFloat(preset))}>&lt;- SetStep:</button>
            <input type="number" value={preset} onChange={evt => setPreset(evt.target.value)} />
        </>
    );
});

stories.add('Max=1 Min=0', () => {
    const [value, setValue] = useState(12);
    const onChangeValue = value => setValue(value);

    return (
        <>
            <h1>value: {value}, type:{typeof (value)}</h1>
            <FixedFloatInput value={value} step={0.1} max={1} min={0} onChangeValue={onChangeValue} />
        </>
    );
});