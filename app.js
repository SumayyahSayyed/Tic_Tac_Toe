let turn = '';
let isGameOver = false;
let combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [6, 4, 2]
];

let options = [];
let blocks = document.querySelectorAll(".container-child");
let imageChild = document.querySelectorAll(".image-class");
let src = ""
let reset = document.getElementById("reset");

let user1 = document.querySelector(".user1");
let user2 = document.querySelector(".user2");
let label = document.querySelector(".label");
let results = document.querySelector(".results")


let buttons = document.querySelectorAll('.container-child');

function hover() {
    if (turn === "user1") {
        blocks.forEach(block => {
            block.classList.add("hover-blue");
            block.classList.remove("hover-red");
        })
    }
    if (turn === "user2") {
        blocks.forEach(block => {
            block.classList.add("hover-red");
            block.classList.remove("hover-blue");
        })
    }
    blocks.forEach(block => {
        if (block.hasChildNodes()) {
            block.classList.remove('hover-blue');
            block.classList.remove('hover-red');
        }
    });
}

if (isGameOver === false) {
    turn = 'user1';
    user1.style.color = "#2b29a3";
    user2.style.color = "#b5171f";

    blocks.forEach((block, index) => {
        block.classList.add('hover-blue');

        block.addEventListener("click", () => {

            if (turn === 'user1') {
                let tickMark = document.createElement("img");
                tickMark.classList.add("image-class");
                tickMark.src = "images/Tick-mark.png";
                block.appendChild(tickMark);

                block.disabled = true;

                turn = 'user2';
                hover();
            }

            else if (turn === 'user2') {
                let crossMark = document.createElement("img");
                crossMark.classList.add("image-class");
                crossMark.src = "images/cross-mark.png";
                block.appendChild(crossMark);

                block.disabled = true;

                turn = 'user1';
                hover();
            }

            let imageChild = block.querySelectorAll(".image-class");

            if (imageChild.length > 0) {
                imageChild.forEach(image => {
                    src = image.getAttribute("src");
                    options[index] = src;
                })
            }
            else {
                options.push(" ");
            }

            checkWinner();
        })

    })
}

function areAllBlocksFilled() {
    let allFilled = true;
    blocks.forEach(block => {
        if (!block.hasChildNodes()) {
            allFilled = false;
        }
    });
    return allFilled;
}

function checkWinner() {
    let hasWinner = false;

    for (let k = 0; k < combinations.length; k++) {
        let singleCombo = combinations[k];
        let cellA = options[singleCombo[0]];
        let cellB = options[singleCombo[1]];
        let cellC = options[singleCombo[2]];

        if (cellA && cellA === cellB && cellB === cellC) {
            console.log("game won");
            console.log(cellA, cellB, cellC);

            results.classList.remove("hide");

            if (cellA === "images/Tick-mark.png") {
                label.textContent = "USER1 WON";
            } else if (cellA === "images/cross-mark.png") {
                label.textContent = "USER2 WON";
            }

            GameOver();
            hasWinner = true;
            break;
        }
    }

    if (!hasWinner && areAllBlocksFilled()) {
        results.classList.remove("hide");
        label.textContent = "DRAW";
        GameOver();
    }
}

function GameOver() {
    isGameOver = true;
    blocks.forEach(block => {
        block.disabled = true;
    })
    options.splice(0, options.length);
}


reset.addEventListener("click", () => {
    results.classList.add("hide");

    blocks.forEach(block => {
        while (block.firstChild) {
            block.removeChild(block.firstChild);
            isGameOver = false;
        }
        hover();
        block.disabled = false;
        label.textContent = "";
        console.log("Removed images");
    });
});
