 const icons = ["fas fa-tree", "fas fa-bug", "fas fa-list", "fas fa-link", "fas fa-sync-alt", "fas fa-key", "fas fa-car-crash", "fas fa-sort-numeric-down"]

 const mainContain = document.querySelector('#main-contain');

 const clickCountDisplay = document.querySelector('#click-count-display');

 const gameClockDisplay = document.querySelector('#game-clock-display')

 const flexTable = document.createElement('div');
 flexTable.className = 'flex-table';

 const timesUpRule = document.querySelector('#times-up-rule');

 function makeGrid() {
     // set game start defaults
     totalClicks = 0;
     clickCountDisplay.innerText = `${totalClicks} clicks`;
     gameClockDisplay.innerText = 'time 0:00';
     userMatches = 0;
     timesUp = false;

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


 function gameClock() {
     const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
     if (timeElapsed < 45) {
         gameClockDisplay.innerText = `time 0:0${timeElapsed}`
     } else {
         gameClockDisplay.innerText = `time 0:${timeElapsed}`
     }
     if (timeElapsed == 45) {
         flexTable.style.opacity = '0.4';
         clearInterval(startClock);
         timesUpRule.className = 'underline-flash';
         return timesUp = true;
     };
 }


 let firstClick, userMatches, totalClicks, startClock, startTime, timesUp;

 // start/stop stats, track user clicks, click order: if no match lastClick becomes firstClick
 flexTable.addEventListener('click', (e) => {
     if (e.target.className != 'cell' || timesUp == true) {
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

 // on page load
 document.addEventListener('DOMContentLoaded', () => {
     makeGrid()
 });

 const newGameBtn = document.querySelector('#new-game-btn');
 newGameBtn.addEventListener('click', () => {
     timesUpRule.className = null;
     timesUp = false;
     clearInterval(startClock);
     flexTable.innerHTML = null;
     flexTable.style.opacity = '1';
     makeGrid();
 });