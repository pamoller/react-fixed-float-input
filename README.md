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
| roundType | round \| ceil \| floor | round | Round additional digits by Math.round, ... Works only for the default formatter |
| value | number \| string | | the formatted value | 

* Inspect the code for the default formatter
* HTML 5 input attributes, see https://developer.mozilla.org/de/docs/Web/HTML/Element/Input#attribute.

## Custom formatter

````jsx
(number) => isNaN(parseFloat(value))?'':parseFloat(number).toLocaleString('en', {minimumFractionDigits:0, maximumFractionDigits:2});
````

Note: the returned string should be a vaild float in spite of HTML 5 e.g. -123.3456

## Comments

Sure, JS and Typescript know only numbers, no floats.

Personally I don't like to get stuck while typing on the keyboard. So this compoment allows free typing of digits. 

Try to use the global lang attribute to influence the representation in Firefox. Chrome actually uses always its own borwser settings
