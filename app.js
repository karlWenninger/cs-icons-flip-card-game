 const icons = ["fas fa-tree", "fas fa-bug", "fas fa-list", "fas fa-link", "fas fa-sync-alt", "fas fa-key", "fas fa-car-crash", "fas fa-sort-numeric-down"]

 const mainContain = document.querySelector('#main-contain')

 const flexContain = document.createElement('div');
 flexContain.className = 'flex-contain';

 function makeGrid() {
     // make icon index array
     let iconIndexArr = [];
     for (let i = 0; i < icons.length; i++) {
         iconIndexArr.push(i);
     };
     // dupe each index
     iconIndexDupeArr = iconIndexArr.concat(iconIndexArr)
     // random sort indexes
     iconIndexDupeArr.sort((a, b) => 0.5 - Math.random())

     // make HTML elements
     const row = document.createElement('div');
     row.className = 'row';

     const cell = document.createElement('div');
     cell.className = 'cell';

     const cellContent = document.createElement('i');
     cellContent.style.visibility = 'hidden';

     // poplulate cells w icons, rows w cells, flexContain w rows
     let cellCount = 1;
     for (let i of iconIndexDupeArr) {
         cellContent.classList = `${icons[i]} ${cellCount}`;
         cell.appendChild(cellContent);
         row.appendChild(cell.cloneNode(true))
         if (cellCount % 4 == 0) {
             flexContain.appendChild(row.cloneNode(true));
             row.innerHTML = null;
         }
         cellCount++;
     };
     mainContain.appendChild(flexContain);
 };

 document.addEventListener('DOMContentLoaded', () => {
     makeGrid()
 });

 // track user clicks. click order: if no match lastClick becomes firstClick
 let lastClick, firstClick;
 flexContain.addEventListener('click', (e) => {
     if (e.target.className = 'cell') {
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