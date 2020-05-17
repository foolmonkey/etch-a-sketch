const defaultNumRows = 2;

window.onload = generateBoxes(defaultNumRows);

function generateBoxes(numRows){
    let container = document.getElementById("container");

    let containerRows = [];
    let containerBoxes = [];


    // create each div corresponding to boxes
    for(let i = 0; i < numRows; i++){
        containerRows[i] = document.createElement('div');
        containerRows[i].classList.add('containerRow');

        for(let j = 0; j < numRows; j++){
            containerBoxes[j] = document.createElement('div');
            containerBoxes[j].classList.add("containerBox");
    
            // append element to row
            containerRows[i].appendChild(containerBoxes[j]);
        }

        container.appendChild(containerRows[i]);
    }
}