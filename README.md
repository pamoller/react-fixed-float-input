# react fixed float input
 
Format the content of a ````<input/>```` element as a float with fixed precision. Additional digits will be rounded on initialization and on the blur event.

## Installation

````npm install --save react-fixed-float-input````
 
 or 

````yarn add react-fixed-float-input````

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
 
1) initialize value by ````useState(0)```` results in displaying  the formatted value ````<input>0.00</input>````
2) editing the field manually to ````<input>9.98542</input>```` invokes ````setValue(9.98542)```` inside the onChangeValue callback
3) leaving the ````<input/>```` field (onblur) invokes again ````setValue(9.99)```` and  displaying ````<input>9.99</input>```` for the formated value

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

## Comments

Sure JS and Typescript know only numbers, no floats.

Personally I don't like to get stuck while typing on the keyboard. So this compoment allows free typing of numbers, Sure it remains a little suprise on bluring when your input gets rounded or cuted, anyway. 
