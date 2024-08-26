import {clearAnimation,clearBoxValue, hideLogsButton} from './animation.js'
(function clearRow(){
    const clearButton = document.getElementById('clearButton')
    if(clearButton){
        clearButton.addEventListener('click',()=>{

            const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0]
            tableBody.innerHTML = ''
            clearAnimation()
            clearBoxValue()
            hideLogsButton()
        })
    }
})();

function addRow() {
    const data = document.getElementById('dataInput').value.trim();
    const nextNode = document.getElementById('nextNodeInput').value.trim();
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const idArray = Array.from((table.getElementsByTagName('tr'))).map(row=>row.children[0])
    let idArrayValues = [];
    if(idArray){
        idArray.forEach((td)=>{
            idArrayValues.push(td.firstChild.data)
        })
    }
    const id = table.childElementCount;
    const previousElement = Array.from(table.getElementsByTagName('tr')).map(row=>row.children[2])
    const mostRecentNextElement = previousElement[previousElement.length -1]

    if (data === '') {
        alert('Please enter some data.');
        return;
    }
    const nextNodeValueInArray = idArrayValues.find((value)=>value === nextNode)
    if (!(nextNodeValueInArray) && nextNode  != '' && idArrayValues.length > 0) {
        alert('Node Id Does Not exist');
        return;
    }

    if(mostRecentNextElement &&mostRecentNextElement.innerHTML === 'null'){
        mostRecentNextElement.innerText = id;
    }
    const newRow = table.insertRow();

    const idCell = newRow.insertCell(0);
    const dataCell = newRow.insertCell(1);
    const nextNodeCell = newRow.insertCell(2);

    idCell.innerHTML = id;
    dataCell.innerHTML = data;
    nextNodeCell.innerHTML = nextNode === '' ? 'null' : nextNode;

    document.getElementById('dataInput').value = '';
    document.getElementById('nextNodeInput').value = '';
}

window.addRow = addRow