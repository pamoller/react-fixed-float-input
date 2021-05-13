# react fixed float input
 
The component decorates the HTML 5 ````<input/>```` element by props to start and end editing with a float of fixed precision.

e.g. start by 0.00 and with end: 9.99, but allow free editing in between. By default 9.98542 will be rounded to 9.99 on leaving the field (onBlur). 

## Installation
 
## Usage


```jsx
import { useState } from 'react';
import FixedFloatInput from 'react-fixed-float-input';
 
function Formular() {
    const [value, setValue] = useState(0);
    const onChangeValue = value => setValue(value);
    return <FixedFloatInput value={value} onChangeValue={onChangeValue}/>;
}
 ```
 
1) initialize value by ````setValue(0)```` results in formatting ````<input/>```` to ````<input>0.00</input>```` 
2) editing the ````<input/>```` field manually to ````<input>9.98542</input>```` calls ````setValue(9.98542)```` in the onChangeValue callback
3) leaving the input field (onBlur) calls again  ````setValue(9.99)```` and formats ````<input/>```` to ````<input>9.99</input>````  

## Props

| Name | Type | Default | Description |
| -----|------| --------| ----------- |
| className | string | | Custom CSS class |   
| formatter | ````func(value: number): string```` | | Custom formatter callback overwrites the default formatter |
| onChangeValue | ````func(value: number)```` | | Handle the changed value by a callback |
| precision | number  | 2 | The precision of the formatted value, e.g. 2 => 12.00. Works only for the default formatter. |
| roundType | round \| ceil \| floor | round | Round arbitrary digits by Math.round, ...|
| value | number | | the formatted value | 

* default formatter, inspect the code
* HTML 5 input attributes, see https://developer.mozilla.org/de/docs/Web/HTML/Element/Input#attribute.
