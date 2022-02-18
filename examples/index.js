const rect = require('./rectangle')

const solveRect = (a, b) => {
//   console.log(`Perform arithmetic operations on: ${a} and ${b}`);

    rect(a, b, (err, rectangle) => {
        if (err) {
            console.log(`ERROR: ${err.message}`);
        }
        else {
            console.log(`The Area is: ${rectangle.area()}`);
            console.log(`The Perimeter is: ${rectangle.perimeter()}`);
        }
    })

    console.log("--------------------------------------");
};

solveRect(3, 5);
solveRect(4, 10);
solveRect(2, 3);
solveRect(-1, 5);
solveRect(3, 8);
