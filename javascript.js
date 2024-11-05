let bigContainer = document.createElement('div');
bigContainer.classList.add('bigContainer');
const container = document.querySelector('body');
container.appendChild(bigContainer);
// bigContainer.classList.add("bigContainer");

// const body = document.querySelector('body');
const allSquares = document.querySelectorAll('.square');
allSquares.forEach(square => {
    square.addEventListener('click', () => {
        //call function here.
    })
    
})
// let removeEverything = () => {
//     const allSquares = document.querySelectorAll('.square');
//     const allRows = document.querySelectorAll('.rows');
//     allSquares.forEach(square => {
//         square.remove();
//     });
//     allRows.forEach(row => {
//         row.remove();
//     })
// }

let addSquares = (num1, num2) => {
    for (let i = 0; i < num1; i++) {
        let newContainer = document.createElement('div');
        bigContainer.append(newContainer);
        newContainer.classList.add('rowContainer', 'row' + i);
        for (let j = 0; j < num2; j++) {
            let squareContainer = document.createElement('div');
            newContainer.append(squareContainer);
            squareContainer.classList.add('square');
            squareContainer.classList.add("col"+ j);
            squareContainer.textContent="";
            squareContainer.addEventListener('mouseover', () => {
                squareContainer.style.backgroundColor = "red";
            });
            squareContainer.addEventListener('mouseleave', () => {
                if (!squareContainer.classList.contains(0)) {
                    let otherSquare = bigContainer.querySelector('.row5').querySelector('.col'+j);
                    otherSquare.style.backgroundColor = 'blue';
                }
                
                squareContainer.style.backgroundColor = "white";
            });
        }
    }
}

addSquares(6,7);

// let sizer = document.querySelector('.sizer');
// sizer.addEventListener('click',() => {
//     let num = 200;
//     while (num > 100 || num < 1) {
//         num = prompt("Enter a number, 1-100 (inclusive)");
//     }
//     removeEverything();
//     addSquares(num);
// });
let reset = document.querySelector('.reset');
reset.addEventListener('click',() => {
    allSquares.forEach(square, () => {
        square.style.backgroundColor = "white";
    })
});