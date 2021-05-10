# react fixed float input

Use it to start and end editing the encapsulated ````<input/>```` field with a float of fixed precision.

e.g. start by 0.00 and with end: 9.99, but allow free editing in between. By default 9.98542 will be rounded to 9.99 on leaving the field (onBlur). 

## Installation
 
## Usage


```jsx
import { useState } from 'react';
import FixedFloatInput from 'react-fixed-float-input';
 
function Formular() {
    const [value, setValue] = useState(0);
    const onChange = value => setValue(value);
    return <FixedFloatInput value={value} onChange={onChange}/>;
}
 ```
 
1) initialize value by 0: ````setValue(0)```` results in formatting ````<input/>```` to ````<input>0.00</input>```` 
2) editing the ````<input/>```` field manually to ````<input>9.98542</input>```` sets value by ````setValue(9.98542)````
3) leaving the input field (onBlur) sets value by ````setValue(9.99)```` and formats ````<input/>```` to ````<input>9.99</input>````  

## Props

| Name | Type | Default | Description |
| -----|------| --------| ----------- |
| className | string | none | Custom CSS class |   
| formatter | ````func(value: number): string```` | round to precision | Format the input value by a callback function |
| max | number | none | maximum value |
| min | number | none | minimum value |
| onChange | ````func(value: number, event: Event)````| required | Handle the changed value by a callback |
| precision | number (integer) | 2 | The precision of the formatted value, e.g. 2 => 12.00. Works only for the default formatter. |
| step | number | 1 | in/decrease the input value by spinner |
| value | number | required | the formatted value | 
