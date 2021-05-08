import { useState } from 'react';
import FixedFloatInput from '../compoments/FixedFloatInput';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('App Test', module);

stories.add('App', () => {
    const [value, setValue] = useState(12);
    const onChange = value => setValue(value);

    return <FixedFloatInput value={value} onChange={onChange} />;

});
