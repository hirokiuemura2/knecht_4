let bigContainer = document.createElement('div');
const container = document.querySelector('body');
container.appendChild(bigContainer);
bigContainer.classList.add("bigContainer");

const body = document.querySelector('body');
let removeEverything = () => {
    const allSquares = document.querySelectorAll('.square');
    const allRows = document.querySelectorAll('.rows');
    allSquares.forEach(square => {
        square.remove();
    });
    allRows.forEach(row => {
        row.remove();
    })
}

let addSquares = (num) => {
    for (let i = 0; i < num; i++) {
        let newContainer = document.createElement('div');
        bigContainer.append(newContainer);
        newContainer.classList.add('rows');
        for (let j = 0; j < num; j++) {
            let squareContainer = document.createElement('div');
            newContainer.append(squareContainer);
            squareContainer.classList.add('square');
            squareContainer.textContent="";
            squareContainer.addEventListener('mouseover', () => {
                squareContainer.style.backgroundColor = "red";
            });
        }
    }
}

addSquares(50);

let sizer = document.querySelector('.sizer');
sizer.addEventListener('click',() => {
    let num = 200;
    while (num > 100 || num < 1) {
        num = prompt("Enter a number, 1-100 (inclusive)");
    }
    removeEverything();
    addSquares(num);
});