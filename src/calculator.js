#!/usr/bin/env node

/*
 Node.js CLI Calculator

 Supported operations:
 - add : addition (a + b)
 - sub : subtraction (a - b)
 - mul : multiplication (a * b)
 - div : division (a / b)

 Usage examples:
   node src/calculator.js add 1 2    # prints 3
   node src/calculator.js sub 5 2    # prints 3
   node src/calculator.js mul 3 4    # prints 12
   node src/calculator.js div 8 2    # prints 4

 The script validates inputs and exits with a non-zero code on error.
*/

function printUsage() {
  const help = `Usage: node src/calculator.js <command> <a> <b>

Commands:
  add    Add a and b
  sub    Subtract b from a
  mul    Multiply a by b
  div    Divide a by b

Examples:
  node src/calculator.js add 1 2
  node src/calculator.js div 8 2
`;
  console.log(help);
}

function exitError(msg) {
  // When used as a library by tests, throw an Error so tests can catch it.
  // The CLI runner will catch errors and exit with a non-zero code.
  throw new Error(msg);
}

function parseNumber(s, name) {
  const n = Number(s);
  if (!Number.isFinite(n)) exitError(`Invalid number for ${name}: '${s}'`);
  return n;
}

function calculate(cmd, a, b) {
  switch (cmd) {
    case 'add':
    case '+':
      return a + b;
    case 'sub':
    case '-':
      return a - b;
    case 'mul':
    case '*':
      return a * b;
    case 'div':
    case '/':
      if (b === 0) exitError('Division by zero is not allowed');
      return a / b;
    default:
      exitError(`Unknown command: ${cmd}`);
  }
}

// CLI entry
if (require.main === module) {
  try {
    const argv = process.argv.slice(2);
    if (argv.length === 0 || argv[0] === '--help' || argv[0] === '-h') {
      printUsage();
      process.exit(0);
    }

    if (argv.length !== 3) {
      console.error('Error: Incorrect number of arguments.');
      printUsage();
      process.exit(1);
    }

    const [cmd, aStr, bStr] = argv;
    const a = parseNumber(aStr, 'a');
    const b = parseNumber(bStr, 'b');

    const result = calculate(cmd.toLowerCase(), a, b);

    // Print result. Keep formatting simple: if integer, print without decimal.
    if (Number.isInteger(result)) console.log(result);
    else console.log(result);

    process.exit(0);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { calculate, parseNumber };
