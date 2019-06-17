 const icons = ["fas fa-tree", "fas fa-bug", "fas fa-list", "fas fa-link", "fas fa-sync-alt", "fas fa-key", "fas fa-car-crash", "fas fa-sort-numeric-down"]

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
     const gridContainer = document.createElement('div');
     gridContainer.className = 'grid-container';

     const cell = document.createElement('div');
     cell.className = 'grid-item';

     const cellContent = document.createElement('i');
     cellContent.style.visibility = 'hidden';
     for (let i = 0; i < iconIndexDupeArr.length; i++) {
         cellContent.classList = icons[iconIndexDupeArr[i]] + ' ' + i;
         cell.appendChild(cellContent);
         gridContainer.appendChild(cell.cloneNode(true));
     }

     mainContainer.appendChild(gridContainer);
 };

 document.addEventListener('DOMContentLoaded', () => {
     makeGrid()
 });

 // track user clicks. click order: if no match lastClick becomes firstClick
 let lastClick, firstClick;
 mainContainer.addEventListener('click', (e) => {
     if (e.target.className = 'grid-item') {
         lastClick = e.target.firstChild;
         lastClick.style.visibility = 'visible';
         if (firstClick != null && firstClick.classList[1] == lastClick.classList[1]) {
             // consecutive clicks on same cell do not return match
             if (firstClick.classList[2] != lastClick.classList[2]) {
                 firstClick.style.visibility = 'visible';
                 return firstClick = null;
             }
         } else { firstClick = lastClick; }

         setTimeout(() => {
             return lastClick.style.visibility = 'hidden';
         }, 500)
     }
 });
