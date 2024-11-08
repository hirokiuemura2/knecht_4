let bigContainer = document.createElement('div');
bigContainer.classList.add('bigContainer');
const container = document.querySelector('body');
container.appendChild(bigContainer);

const allSquares = document.querySelectorAll('.square');

let otherSquare = null;
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
                if (!squareContainer.classList.contains(0)) {
                    otherSquare = bigContainer.querySelector('.row5').querySelector('.col'+j);
                    otherSquare.style.backgroundColor = 'blue';
                }
            });
            squareContainer.addEventListener('click', () => {
                let x = 10;
                let y = 10;
                //function call to select column
                console.log("clicked " + squareContainer.classList[1].charAt(3));
                console.log(squareContainer.parentElement);
            });
            squareContainer.addEventListener('mouseleave', () => {
                if (otherSquare) {
                    otherSquare.style.backgroundColor = "white";
                }
                squareContainer.style.backgroundColor = "white";
            });
        }
    }
}

addSquares(6,7);

let updateSquares = () => {
    return;
}

let reset = document.querySelector('.reset');
// reset.addEventListener('click',() => {
//     updateSquares();
// });