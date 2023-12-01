let displayValue = '0';
  let storedValue = null;
  let selectedOperator = null;
  let decimalClicked = false;

  function updateDisplay() {
    document.getElementById('display').textContent = displayValue;
  }

  function appendToDisplay(value) {
    if (value === '.') {
        if (decimalClicked) {
          return; // Don't allow multiple decimal points
        }
        decimalClicked = true;
      }
    if (displayValue === '0' || displayValue === 'Error') {
      displayValue = value;
    } else {
      displayValue += value;
    }
    updateDisplay();
  }

  function calculatePercentage() {
    const currentValue = parseFloat(displayValue);
    const percentageValue = storedValue * (currentValue / 100);
    displayValue = percentageValue.toFixed(4);
    updateDisplay();
  }

  function toggleSign() {
    displayValue = (parseFloat(displayValue) * -1).toString();
    updateDisplay();
  }

  function clearDisplay() {
    displayValue = '0';
    storedValue = null;
    selectedOperator = null;
    updateDisplay();
  }

  function backspace() {
    displayValue = displayValue.slice(0, -1);
    if (displayValue === '') {
      displayValue = '0';
    }
    updateDisplay();
  }

  function operate(operator) {
    if (selectedOperator !== null) {
      calculateResult();
    }
    if (operator === '%') {
        calculatePercentage();
      } else {
        storedValue = parseFloat(displayValue);
        selectedOperator = operator;
        displayValue = '0';
        decimalClicked = false; // Reset the decimal flag
      }
    
  }


  // Keyboard support
  document.addEventListener('keydown', handleKeyPress);

  function handleKeyPress(event) {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
      // Numbers and decimal point
      appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
      // Enter or equal sign for calculation
      calculateResult();
    } else if (key === 'Backspace') {
      // Backspace for deleting
      backspace();
    } else if (key === 'Escape') {
      // Escape for clearing
      clearDisplay();
    } else if (['+', '-', '*', '/'].includes(key)) {
      // Operators
      operate(key);
    }
  }

  function calculateResult() {
    if (selectedOperator === null) {
      return;
    }

    const currentValue = parseFloat(displayValue);

    switch (selectedOperator) {
      case '+':
        displayValue = storedValue + currentValue;
        break;
      case '-':
        displayValue = storedValue - currentValue;
        break;
      case '*':
        displayValue = storedValue * currentValue;
        break;
      case '/':
        if (currentValue === 0) {
          displayValue = 'Error';
        } else {
          displayValue = (storedValue / currentValue).toFixed(4);
        }
        break;
      default:
        return;
    }

    

    displayValue = displayValue.toString();
    storedValue = null;
    selectedOperator = null;
    decimalClicked = false;
    updateDisplay();
  }