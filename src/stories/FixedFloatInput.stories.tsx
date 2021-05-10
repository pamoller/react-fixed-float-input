import React, { useState } from 'react';
import FixedFloatInput from '../compoments/FixedFloatInput';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('App Test', module);


stories.add('Default behaviour (preset is number)', () => {
    const [value, setValue] = useState(12);
    const [preset, setPreset] = useState(NaN);
    const onChange = value => setValue(value);

    return (
        <>
            <h1>value: {value}, type:{typeof (value)}</h1>
            <FixedFloatInput value={value} onChange={onChange} />
            <button onClick={() => setValue(preset)}>&lt;- Set Preset:</button>
            <input type="number" value={preset} onChange={evt => setPreset(parseFloat(evt.target.value))} />
        </>
    );

});


stories.add('Default behaviour (preset is string)', () => {
    const [value, setValue] = useState(12);
    const [preset, setPreset] = useState('');
    const onChange = value => setValue(value);

    return (
        <>
            <h1>value: {value}, type:{typeof (value)}</h1>
            <FixedFloatInput value={value} onChange={onChange} />
            <button onClick={() => setValue(parseFloat(preset))}>&lt;- Set Preset:</button>
            <input type="text" value={preset} onChange={evt => setPreset(evt.target.value)} />
        </>
    );

});

stories.add('Default behaviour (value is a cated string)', () => {
    const [value, setValue] = useState('12');
    const [preset, setPreset] = useState('');
    const onChange = value => setValue(value);

    return (
        <>
            <h1>value: {value}, type:{typeof (value)}</h1>
            <FixedFloatInput value={value as any as number} onChange={onChange} />
            <button onClick={() => setValue(preset)}>&lt;- Set Preset:</button>
            <input type="text" value={preset} onChange={evt => setPreset(evt.target.value)} />
        </>
    );

});

stories.add('Precision', () => {
    const [value, setValue] = useState(12);
    const [preset, setPreset] = useState('2');
    const [precision, setPrecision] = useState(2);
    const onChange = value => setValue(value);

    return (
        <>
            <h1>value: {value}, type:{typeof (value)}</h1>
            <FixedFloatInput value={value} precision={precision} onChange={onChange} />
            <button onClick={() => setPrecision(parseInt(preset))}>&lt;- Set Preset:</button>
            <input type="number" value={preset} onChange={evt => setPreset(evt.target.value)} />
        </>
    );

});

stories.add('Step width', () => {
    const [value, setValue] = useState(12);
    const [preset, setPreset] = useState('0.01');
    const [step, setStep] = useState(0.01);
    const onChange = value => setValue(value);

    return (
        <>
            <h1>value: {value}, type:{typeof (value)}</h1>
            <FixedFloatInput value={value} step={preset} onChange={onChange} />
            <button onClick={() => setStep(parseFloat(preset))}>&lt;- Set Preset:</button>
            <input type="number" value={preset} onChange={evt => setPreset(evt.target.value)} />
        </>
    );

});
