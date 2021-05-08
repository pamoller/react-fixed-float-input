Format the value of a HTML input field as a float with fixed precision 
 
```jsx
import { useState } from 'react';
import FixedFloatInput from 'react-fixed-float-input';
 
function Formular() {
    const [value, setValue] = useState(12);
    const onChange = value => setValue(value);
    return <FixedFloatInput  data-testid='behaviour' value={value} onChange={onChange}/>;
}
 ```
 
1) initialize value by 12 => <input>12.00</input> 
2) editing the field manually to <input>9.092121</input> => value=9.091212
3) leaving the field (onBlur) => value=9.10 and <input>9.10</input>  

