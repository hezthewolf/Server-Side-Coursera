const rect = require('./rectangle')

const solveRect = (a, b) => {
  console.log(`Perform arithmetic operations on: ${a} and ${b}`);

  if (a <= 0 || b <= 0) {
    console.log("Value cannot be less than or equal to zero");
  } else {
    console.log(`The perimeter of the rectangle is: ${rect.perimeter(a, b)}`);
    console.log(`The area of the rectangle is: ${rect.area(a, b)}`);
  }

  console.log("---------------------------------------");
};

solveRect(3, 5);
solveRect(4, 10);
solveRect(2, 3);
solveRect(-1, 5);
solveRect(3, 8);
