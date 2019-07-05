// get HTML stuff
const mainContain = document.querySelector('#main-contain');
const clickCountDisplay = document.querySelector('#click-count-display');
const gameClockDisplay = document.querySelector('#game-clock-display');
const timesUpLi = document.querySelector('#times-up-li');
const fauxGridContainer = document.querySelector('#faux-grid-container');

let firstClick, userMatches, totalClicks, startClock, startTime, timesUp;

const icons = ["fas fa-tree", "fas fa-bug", "fas fa-list", "fas fa-link", "fas fa-sync-alt", "fas fa-key", "fas fa-car-crash", "fas fa-sort-numeric-down"];

function makeGrid() {
    // set game start defaults
    totalClicks = 0;
    clickCountDisplay.innerText = `${totalClicks} clicks`;
    gameClockDisplay.innerText = 'time 0:00';
    userMatches = 0;
    timesUp = false;
    timesUpLi.className = null;
    clearInterval(startClock);
    fauxGridContainer.innerHTML = null;
    fauxGridContainer.style.opacity = null;

    // make icon index array
    let iconIndexArr = [];
    for (let i in icons) {
        iconIndexArr.push(i);
    }
    // dupe entire array (each icon loads in fauxGridContainer twice)
    let iconIndexDupeArr = iconIndexArr.concat(iconIndexArr);
    // random sort indexes
    iconIndexDupeArr.sort((a, b) => 0.5 - Math.random());
    // create HTML elements
    const row = document.createElement('div');
    row.className = 'row';
    const cell = document.createElement('div');
    cell.className = 'cell';
    const cellContent = document.createElement('i');
    cellContent.style.visibility = 'hidden';

    // poplulate cells w icons, rows w cells, fauxGridContainer w rows
    let cellCount = 1;
    for (let i of iconIndexDupeArr) {
        cellContent.classList = `${icons[i]} ${cellCount}`;
        cell.appendChild(cellContent);
        row.appendChild(cell.cloneNode(true));
        if (cellCount % 4 == 0) {
            fauxGridContainer.appendChild(row.cloneNode(true));
            row.innerHTML = null;
        }
        cellCount++;
    }
    mainContain.appendChild(fauxGridContainer);
}

function gameClock() {
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    if (timeElapsed < 10) {
        gameClockDisplay.innerText = `time 0:0${timeElapsed}`;
    } else {
        gameClockDisplay.innerText = `time 0:${timeElapsed}`;
    }
    if (timeElapsed == 45) {
        timesUpLi.className = 'underline-flash';
        fauxGridContainer.style.opacity = '0.5';
        clearInterval(startClock);
        return timesUp = true;
    }
}

fauxGridContainer.addEventListener('click', (e) => {
    // exit func
    if (e.target.className != 'cell' || timesUp == true) {
        return;
    } else {
        // start gameClock
        if (totalClicks == 0) {
            startTime = Date.now();
            startClock = setInterval(gameClock, 1000);
        }
        totalClicks++;
        clickCountDisplay.innerText = `${totalClicks} clicks`;

        // track user clicks: if no match lastClick becomes firstClick
        const lastClick = e.target.firstChild;
        lastClick.style.visibility = 'visible';

        if (firstClick != null && firstClick.classList[1] == lastClick.classList[1]) {
            // consecutive clicks on same cell do not return match
            if (firstClick.classList[2] != lastClick.classList[2]) {
                firstClick.style.visibility = 'visible';
                userMatches++;
                if (userMatches == icons.length) {
                    // stop clock cuz game over
                    clearInterval(startClock);
                    return timesUp = true;
                }
                return firstClick = null;
            }
        } else { firstClick = lastClick; }
        setTimeout(() => {
            return lastClick.style.visibility = 'hidden';
        }, 500);
    }
});

const newGameBtn = document.querySelector('#new-game-btn');
newGameBtn.addEventListener('click', () => {
    makeGrid();
});

document.addEventListener('DOMContentLoaded', () => {
    makeGrid();
});