let defaultResolution = 50;

let xPos = document.getElementById("xPos");
let yPos = document.getElementById("yPos");
let drawMode = document.getElementsByName("drawMode");

window.onload = generateBoxes();

let defaultColor = 'white';
let defaultFillColor = 'black';

function generateBoxes(resolution = 50) {
    let container = document.getElementById("container");
    let containerRows = [];
    let containerBoxes = [];

    let numRows = resolution;
    let numColumns = numRows * 2;

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
    xPos.textContent = Math.floor(numColumns / 2);    
    yPos.textContent = Math.floor(numRows / 2);
}

function mouseMode(element) {
    element.addEventListener('mouseenter', function () {
        if(drawMode[0].checked){
            event.target.style.backgroundColor = colorSelection(event.target);
        }
    });
}

function arrowKeyMode(e) {
    let numRows = Number(document.getElementById("resolution").value);
    let numColumns = numRows * 2;

    // add keyboard events for arrow keys
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
                if(+xPos.textContent < numColumns - 1){
                    xPos.textContent = Number(xPos.textContent) + 1;
                }
                break;
            // down
            case 'KeyS':
            case 'ArrowDown':
                if(+yPos.textContent < numRows - 1){
                    yPos.textContent = Number(yPos.textContent) + 1;
                } 
                break;
        }

        let row = Number(yPos.textContent) * numColumns;
        let index = Number(xPos.textContent) + row;
        let box = document.getElementsByClassName("containerBox")[index]; 
        
        box.style.backgroundColor = colorSelection(box);
    }
}

// function resetCanvas(){
//     console.log("e");
//     let allItems = document.getElementsByClassName("containerBox");
    
//     for (let i =0; i < allItems.length; i++){
//         allItems[i].style.backgroundColor = defaultColor;
//     }
// }

function changeSize(){
    let canvas = document.getElementById("container");
    canvas.innerHTML = "";
    
    generateBoxes(Number(document.getElementById("resolution").value));
}

function colorSelection(box){
    let selection = document.getElementsByName("colour");

    for(let i = 0; i < selection.length; i++){
        if(selection[i].checked){
            selection = selection[i].value;
        }
    }

    switch(selection){
        case 'randomColour':
            box.style.opacity = '1';
            return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);        
        case 'black':
            box.style.opacity = '1';
            return 'black';
        case 'white':
            box.style.opacity = '0';
            return 'white';
        case 'gradient':
            //let colour = `hsl(${originalColour}%,${originalColour}%,${originalColour}%)`;
            if(box.style.opacity != '1'){
                box.style.opacity = Number(box.style.opacity) + 0.1; 
            }
            return 'black';
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

document.onkeydown = arrowKeyMode;

// let changeResolutionButton = document.getElementById("changeResolution");
// changeResolutionButton.onclick = changeSize;

let sizeInput = document.getElementById("resolution");
sizeInput.onchange = changeSize;

