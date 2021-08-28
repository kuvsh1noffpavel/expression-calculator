function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

  expr = expr.replace(/\*/g, ' * ');
  expr = expr.replace(/\//g, ' / ');
  expr = expr.replace(/\+/g, ' + ');
  expr = expr.replace(/-/g, ' - ');
  expr = expr.replace(/\(/g, ' ( ');
  expr = expr.replace(/\)/g, ' ) ');
  expr = expr.trimLeft().trimRight();

  while (expr.includes('  ')) {
    expr = expr.replace('  ', ' ');
  }

  let exprArr = expr.split(' ');
  let count = 0;

  for (const value of exprArr) {
    if (value === '(') count++;
    if (value === ')') count--;
  }

  if (count) throw new Error('ExpressionError: Brackets must be paired');

  let openBracketPos = 0;
  let closeBracket = 0;

  for (let i = 0; i < exprArr.length; i++){
    if (exprArr[i] == '('){
      openBracketPos = i;
    } else if (exprArr[i] == ')'){
      closeBracket = i;

      let mem = calculatorExprArr(exprArr.slice(openBracketPos + 1, closeBracket));
      exprArr.splice(openBracketPos, closeBracket - openBracketPos + 1, mem);
      i = -1;
    }
  }
    
  return calculatorExprArr(exprArr);

  function calculatorExprArr(arr){
  
    const operator = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    }
  
    function calculator(op1, op2) {
      for (let i = 0; i <= arr.length - 1; i++){
        if(arr[i] === op1 || arr[i] === op2) {
          if (arr[i] === '/' && arr[i+1] == 0){
              throw new Error('TypeError: Division by zero.');
          }
          arr[i] = operator[arr[i]](+arr[i-1],+arr[i+1]);
          arr.splice(i-1, 3, arr[i]);
          i--;
        }
      }
    }
    
    calculator('/', '*');
    calculator('+', '-');

    return arr[0];
  
  }

}

module.exports = {
    expressionCalculator
}