 const icons = ["fas fa-tree", "fas fa-bug", "fas fa-list", "fas fa-link", "fas fa-sync-alt", "fas fa-key", "fas fa-car-crash", "fas fa-sort-numeric-down"]

 const mainContain = document.querySelector('#main-contain')

 const clickCountDisplay = document.querySelector('#click-count-display');

 const gameClockDisplay = document.querySelector('#game-clock-display')

 let flexTable = document.createElement('div');
 flexTable.className = 'flex-table';

 function makeGrid() {
     // initial stat display
     totalClicks = 0;
     userMatches = 0;
     clickCountDisplay.innerText = `${totalClicks} clicks`;
     gameClockDisplay.innerText = 'time 0:00'

     // make icon index array
     let iconIndexArr = [];
     for (let i in icons) {
         iconIndexArr.push(i);
     };
     // dupe entire array (each icon loads in grid twice)
     iconIndexDupeArr = iconIndexArr.concat(iconIndexArr);
     // random sort indexes
     iconIndexDupeArr.sort((a, b) => 0.5 - Math.random());
     // create HTML elements
     const row = document.createElement('div');
     row.className = 'row';
     const cell = document.createElement('div');
     cell.className = 'cell';
     const cellContent = document.createElement('i');
     cellContent.style.visibility = 'hidden';

     // poplulate cells w icons, rows w cells, flexTable w rows
     let cellCount = 1;
     for (let i of iconIndexDupeArr) {
         cellContent.classList = `${icons[i]} ${cellCount}`;
         cell.appendChild(cellContent);
         row.appendChild(cell.cloneNode(true))
         if (cellCount % 4 == 0) {
             flexTable.appendChild(row.cloneNode(true));
             row.innerHTML = null;
         }
         cellCount++;
     };
     mainContain.appendChild(flexTable);
 };
 // on page load
 document.addEventListener('DOMContentLoaded', () => {
     makeGrid()
 });

 const newGameBtn = document.querySelector('#new-game-btn');
 newGameBtn.addEventListener('click', () => {
     clearInterval(startClock);
     flexTable.innerHTML = null;
     makeGrid();
 });

 const gameClock = () => gameClockDisplay.innerText = `time :${Math.floor((Date.now() - startTime) / 1000)}`;

 let firstClick, userMatches, totalClicks, startClock, startTime;

 // start/stop stats, track user clicks, click order: if no match lastClick becomes firstClick
 flexTable.addEventListener('click', (e) => {
     if (e.target.className != 'cell') {
         return;
     } else {
         // track user clicks
         let lastClick = e.target.firstChild;
         lastClick.style.visibility = 'visible';
         // start game stats
         if (totalClicks == 0) {
             startTime = Date.now();
             startClock = setInterval(gameClock, 1000);
         }
         totalClicks++;
         clickCountDisplay.innerText = `${totalClicks} clicks`;

         if (firstClick != null && firstClick.classList[1] == lastClick.classList[1]) {
             // consecutive clicks on same cell do not return match
             if (firstClick.classList[2] != lastClick.classList[2]) {
                 firstClick.style.visibility = 'visible';
                 userMatches++;
                 if (userMatches == icons.length) {
                     // stop clock cuz game over
                     clearInterval(startClock);
                 }
                 return firstClick = null;
             }
         } else { firstClick = lastClick; }

         setTimeout(() => {
             return lastClick.style.visibility = 'hidden';
         }, 500)
     }
 });