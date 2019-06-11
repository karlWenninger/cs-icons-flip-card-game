const mainContainer = document.querySelector('#main-contain')

function makeGrid(numColumns) {
    const table = document.createElement('table');
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    const cellContent = document.createElement('span');
    cellContent.style.visibility = 'hidden';


    let count = 1;
    while (count <= numColumns) {
        row.innerHTML = '';
        for (let i = 1; i <= numColumns; i++) {
            cellContent.classList = "fas fa-crown";
            cell.appendChild(cellContent);
            cell.classList = 'cell-content';
            row.appendChild(cell.cloneNode(true));
        }
        table.appendChild(row.cloneNode(true));
        count++;
    }
    mainContainer.appendChild(table)
}

document.addEventListener('DOMContentLoaded', () => {
    makeGrid(4)
});

mainContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell-content')) {
        clickedContent = e.target.firstElementChild;
        clickedContent.style.visibility = 'visible';

        setTimeout(() => {
            clickedContent.style.visibility = 'hidden';
        }, 1000)
    }
});