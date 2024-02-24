import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Display from './components/Display';
import Button from './components/Button';

export default App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState(null);
  const [values, setValues] = useState([null, null]);
  const [position, setPosition] = useState(0);

  const isDecimalPoint = (char) => char === '.';

  const shouldClearDisplay = (char) =>
    !isDecimalPoint(char) && (displayValue === '0' || clearDisplay);

  const appendCharacterToDisplay = (char) =>
    shouldClearDisplay(char) ? char : displayValue + char;

  const handleDigitInput = (digit) => {
    if (digit === '.' && displayValue.includes('.')) return;

    const updatedDisplay = appendCharacterToDisplay(digit);
    setDisplayValue(updatedDisplay);
    setClearDisplay(false);

    if (!isDecimalPoint(digit)) updateValuesWith(parseFloat(updatedDisplay));
  };

  const updateValuesWith = (newValue) => {
    const updatedValues = [...values];
    updatedValues[position] = newValue;
    setValues(updatedValues);
  };

  const applyOperation = () => {
    const [firstValue, secondValue] = values;

    if (firstValue && secondValue) {
      switch (operation) {
        case '+':
          return firstValue + secondValue;
        case '-':
          return firstValue - secondValue;
        case 'x':
          return firstValue * secondValue;
        case '/':
          return firstValue / secondValue;
        case '%':
          return (firstValue / 100) * secondValue;
        case '=':
          return firstValue;
        default:
          throw new Error('Unknown operation');
      }
    } else {
      return 'Error';
    }
  };

  const handleOperationInput = (operationInput) => {
    if (position === 0) {
      prepareForNextOperation(operationInput);
    } else {
      const result = applyOperation();
      setStateAfterOperation(operationInput, result);
    }
  };

  const prepareForNextOperation = (operationInput) => {
    setOperation(operationInput);
    setPosition(1);
    setClearDisplay(true);
  };

  const setStateAfterOperation = (operationInput, result) => {
    const isResultFinal = operationInput === '=';
    setDisplayValue(result.toString());
    setOperation(isResultFinal ? null : operationInput);
    setPosition(isResultFinal ? 0 : 1);
    setValues([result, null]);
    setClearDisplay(true);
  };

  const clearAll = () => {
    setDisplayValue('0');
    setClearDisplay(false);
    setOperation(null);
    setValues([null, null]);
    setPosition(0);
  };

  const toggleSign = () => {
    if (parseFloat(displayValue)) {
      const invertedValue = parseFloat(displayValue) * -1;
      const updatedValues = [...values];
      updatedValues[position] = invertedValue;

      setDisplayValue(invertedValue.toString());
      setValues(updatedValues);
    } else {
      return 'Error';
    }
  };

  const renderButton = (label, options = {}) => {
    const action =
      options.onclick ||
      (options.operation ? handleOperationInput : handleDigitInput);
    return <Button key={label} label={label} {...options} onclick={action} />;
  };

  const buttonsData = [
    ['AC', { otherButtons: true, onclick: clearAll }],
    ['+/-', { otherButtons: true, onclick: toggleSign }],
    ['%', { otherButtons: true, operation: true }],
    ['/', { operation: true }],
    ['7'],
    ['8'],
    ['9'],
    ['x', { operation: true }],
    ['4'],
    ['5'],
    ['6'],
    ['-', { operation: true }],
    ['1'],
    ['2'],
    ['3'],
    ['+', { operation: true }],
    ['0', { zero: true }],
    ['.'],
    ['=', { operation: true }],
  ];

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        {buttonsData.map(([label, options]) => renderButton(label, options))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
    marginBottom: 50
  },
});
