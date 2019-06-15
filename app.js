 const icons = ["fas fa-crown", "fas fa-drum", "fas fa-child", "fas fa-music", "fas fa-bolt", "fas fa-socks", "fas fa-car-crash", "fas fa-glasses"]

 const mainContainer = document.querySelector('#main-contain')

 function makeGrid() {
     // make icon index array
     let iconIndexArr = [];
     for (let i = 0; i < icons.length; i++) {
         iconIndexArr.push(i);
     }
     // dupe each index
     iconIndexArr = iconIndexArr.concat(iconIndexArr)
     // random sort indexes
     iconIndexArr.sort((a, b) => 0.5 - Math.random())

     // make HTML elements
     const table = document.createElement('table');
     const row = document.createElement('tr');
     const cell = document.createElement('td');
     const cellContent = document.createElement('i');
     cellContent.style.visibility = 'hidden';

     // make rows, populate cells with icons
     let rowWidth = Math.sqrt(iconIndexArr.length);
     let index = 0;
     while (index < iconIndexArr.length - 1) {
         row.innerHTML = '';
         for (let i = 0; i < rowWidth; i++) {
             cellContent.classList = `${icons[iconIndexArr[index]]} ${index}`
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

 let firstClick;
 mainContainer.addEventListener('click', (e) => {
     if (e.target.classList.contains('cell-content')) {
         clickedContent = e.target.firstElementChild;
         clickedContent.style.visibility = 'visible';
         console.log(clickedContent.classList[2]);


         if (firstClick != null && firstClick.classList[1] == clickedContent.classList[1]) {
             firstClick.style.visibility = 'visible';
             clickedContent.style.visibility = 'visible';
             return firstClick = null;

         } else {
             firstClick = clickedContent;
         };
         setTimeout(() => {
             clickedContent.style.visibility = 'hidden';
         }, 500)
     };
 });