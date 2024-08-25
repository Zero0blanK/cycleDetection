

function addRow() {
    const data = document.getElementById('dataInput').value.trim();
    const nextNode = document.getElementById('nextNodeInput').value.trim();

    if (data === '') {
        alert('Please enter some data.');
        return;
    }

    if (nextNode.length > 1) {
        alert('Next Node should be a single value.');
        return;
    }

    const id = data.charAt(0);

    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
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