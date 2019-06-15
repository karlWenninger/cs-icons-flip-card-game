 const icons = ["fas fa-tree", "fas fa-bug", "fas fa-robot", "fas fa-link", "fas fa-laptop", "fas fa-key", "fas fa-car-crash", "fas fa-sort-numeric-down"]

 const mainContainer = document.querySelector('#main-contain')

 function makeGrid() {
     // make icon index array
     let iconIndexArr = [];
     for (let i = 0; i < icons.length; i++) {
         iconIndexArr.push(i);
     }
     // dupe each index
     iconIndexDupeArr = iconIndexArr.concat(iconIndexArr)
     // random sort indexes
     iconIndexDupeArr.sort((a, b) => 0.5 - Math.random())

     // make HTML elements
     const table = document.createElement('table');
     const row = document.createElement('tr');
     const cell = document.createElement('td');
     const cellContent = document.createElement('i');
     cellContent.style.visibility = 'hidden';

     // make rows, populate cells with icons
     let rowWidth = Math.sqrt(iconIndexDupeArr.length);
     let index = 0;
     while (index < iconIndexDupeArr.length - 1) {
         row.innerHTML = '';
         for (let i = 0; i < rowWidth; i++) {
             cellContent.classList = `${icons[iconIndexDupeArr[index]]} ${index}`
             cell.appendChild(cellContent)
             cell.classList = 'cell-content';
             row.appendChild(cell.cloneNode(true));
             index++;
         }
         table.appendChild(row.cloneNode(true));
     }
     mainContainer.appendChild(table)
 };

 document.addEventListener('DOMContentLoaded', () => {
     makeGrid()
 });

 // track user clicks
 let firstClick;
 mainContainer.addEventListener('click', (e) => {
     if (e.target.className = 'cell-content') {
         clickedContent = e.target.firstElementChild;
         clickedContent.style.visibility = 'visible';
         // fontawesome classes match
         if (firstClick != null && firstClick.classList[1] == clickedContent.classList[1]) {
             // consecutive clicks on same cell do not return match
             if (firstClick.classList[2] != clickedContent.classList[2]) {
                 firstClick.style.visibility = 'visible';
                 clickedContent.style.visibility = 'visible';
                 return firstClick = null;
             }
         } else {
             firstClick = clickedContent;
         };
         setTimeout(() => {
             clickedContent.style.visibility = 'hidden';
         }, 500)
     };
 });