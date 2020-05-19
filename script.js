const defaultNumRows = 5;
const defaultNumColumns = 10;

let xPos = document.getElementById("xPos");
let yPos = document.getElementById("yPos");
let drawMode = document.getElementsByName("drawMode");

window.onload = generateBoxes(defaultNumRows, defaultNumColumns);

let defaultColor = 'white';
let defaultFillColor = 'black';

function generateBoxes(numRows, numColumns) {
    let container = document.getElementById("container");
    let containerRows = [];
    let containerBoxes = [];

    // create each div corresponding to boxes
    for (let i = 0; i < numRows; i++) {
        containerRows[i] = document.createElement('div');
        containerRows[i].classList.add('containerRow');

        for (let j = 0; j < numColumns; j++) {
            containerBoxes[j] = document.createElement('div');
            containerBoxes[j].classList.add("containerBox");

            mouseMode(containerBoxes[j]);

            // append element to row
            containerRows[i].appendChild(containerBoxes[j]);
        }

        container.appendChild(containerRows[i]);
    }

    // track position
    let initialPos = Math.floor(defaultNumRows / 2);

    xPos.textContent = initialPos;    
    yPos.textContent = initialPos;

    arrowKeyMode();
}

function mouseMode(element) {
    element.addEventListener('mouseenter', function () {
        if(drawMode[0].checked){
            event.target.style.backgroundColor = defaultFillColor;
        }
    });
}

function arrowKeyMode() {
    // add keyboard events for arrow keys
    window.addEventListener('keydown', function (e) {
        if(drawMode[1].checked){
            // handle keyboard inputs
            switch (e.code) {
                // left
                case 'KeyA':
                case 'ArrowLeft':
                    if(+xPos.textContent > 0){
                        xPos.textContent = Number(xPos.textContent) - 1;
                    }
                    break;
                // up
                case 'KeyW':
                case 'ArrowUp':
                    if(+yPos.textContent > 0){
                        yPos.textContent = Number(yPos.textContent) - 1;
                    }
                    break;
                // right
                case 'KeyD':
                case 'ArrowRight':
                    if(+xPos.textContent < defaultNumColumns - 1){
                        xPos.textContent = Number(xPos.textContent) + 1;
                    }
                    break;
                // down
                case 'KeyS':
                case 'ArrowDown':
                    if(+yPos.textContent < defaultNumColumns - 1){
                        yPos.textContent = Number(yPos.textContent) + 1;
                    } 
    
                    break;
            }

            let row = Number(yPos.textContent) * defaultNumRows;
            let index = Number(xPos.textContent) + row;
            let box = this.document.getElementsByClassName("containerBox")[index]; 
            

            box.style.backgroundColor = defaultFillColor;
        }
    });
}

function resetCanvas(){
    let allItems = document.getElementsByClassName("containerBox");
    
    for (let i =0; i < allItems.length; i++){
        allItems[i].style.backgroundColor = defaultColor;
    }
}

// draw mode button behaviour
let drawModeButtons = document.getElementsByName("drawMode");

drawModeButtons[0].onchange = function(e) {
    document.activeElement.blur();
};

drawModeButtons[1].onchange = function(e) {
    document.activeElement.blur();
};