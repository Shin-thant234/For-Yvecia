const CORRECT_PIN = '1234';
    const input = document.getElementById('pwd');
    const countdownDisplay = document.getElementById('countdownDisplay');

    function press(num) {
      input.value += num;
    }
    function clearInput() {
      input.value = '';
    }
    function confirmInput() {
      if (input.value === CORRECT_PIN) {
        goToScreen('screen-countdown');
        startCountdown(3.0);
      } else {
        alert('Incorrect code!');
        input.value = '';
      }
    }

    const PUZZLE_SIZE = 5; 
const TILE_SIZE = 64;  
let puzzleTiles = [];
let emptyPos = { row: PUZZLE_SIZE - 1, col: PUZZLE_SIZE - 1 };
let shuffled = false;

function createPuzzleTiles() {
  puzzleTiles = [];
  for (let row = 0; row < PUZZLE_SIZE; row++) {
    for (let col = 0; col < PUZZLE_SIZE; col++) {
      puzzleTiles.push({
        row, col,
        correctRow: row,
        correctCol: col,
        isEmpty: row === PUZZLE_SIZE - 1 && col === PUZZLE_SIZE - 1
      });
    }
  }
}

function renderPuzzleBoard() {
  const board = document.getElementById('puzzle-board');
  board.innerHTML = '';
  puzzleTiles.forEach(tile => {
    if (tile.isEmpty) return;
    const div = document.createElement('div');
    div.className = 'puzzle-tile';
    div.style.left = `${tile.col * TILE_SIZE}px`;
    div.style.top = `${tile.row * TILE_SIZE}px`;
    div.style.backgroundImage = "url('photo_2025-08-01_23-40-21.jpg')";
    div.style.backgroundPosition = `-${tile.correctCol * TILE_SIZE}px -${tile.correctRow * TILE_SIZE}px`;
    div.style.backgroundSize = `${PUZZLE_SIZE * TILE_SIZE}px ${PUZZLE_SIZE * TILE_SIZE}px`;
    div.onclick = () => moveTile(tile.row, tile.col);
    board.appendChild(div);
  });
}

function moveTile(row, col) {
  if (!shuffled) return;
  if (isAdjacent(row, col, emptyPos.row, emptyPos.col)) {
    const tile = puzzleTiles.find(t => t.row === row && t.col === col);
    tile.row = emptyPos.row;
    tile.col = emptyPos.col;
    emptyPos = { row, col };
    renderPuzzleBoard();
    if (checkPuzzleWin()) {
      document.getElementById('message').textContent = 'Congratulations! You solved the puzzle!';
    }
  }
}

function isAdjacent(r1, c1, r2, c2) {
  return (Math.abs(r1 - r2) === 1 && c1 === c2) || (Math.abs(c1 - c2) === 1 && r1 === r2);
}

function shufflePuzzle() {
  shuffled = true;
  document.getElementById('shuffleBtn').style.display = 'none';
  document.getElementById('tryAgainBtn').style.display = '';
  document.getElementById('message').textContent = '';
  // Shuffle tiles except the empty one
  for (let i = 0; i < 200; i++) {
    const adj = puzzleTiles.filter(t => isAdjacent(t.row, t.col, emptyPos.row, emptyPos.col) && !t.isEmpty);
    const tile = adj[Math.floor(Math.random() * adj.length)];
    if (tile) {
      let tempRow = tile.row, tempCol = tile.col;
      tile.row = emptyPos.row; tile.col = emptyPos.col;
      emptyPos = { row: tempRow, col: tempCol };
    }
  }
  renderPuzzleBoard();
}

function resetPuzzle() {
  shuffled = false;
  createPuzzleTiles();
  emptyPos = { row: PUZZLE_SIZE - 1, col: PUZZLE_SIZE - 1 };
  renderPuzzleBoard();
  document.getElementById('shuffleBtn').style.display = '';
  document.getElementById('tryAgainBtn').style.display = 'none';
  document.getElementById('message').textContent = '';
}

function checkPuzzleWin() {
  return puzzleTiles.every(t =>
    t.row === t.correctRow && t.col === t.correctCol
  );
}

function showPuzzleScreen() {
  createPuzzleTiles();
  emptyPos = { row: PUZZLE_SIZE - 1, col: PUZZLE_SIZE - 1 };
  renderPuzzleBoard();
  document.getElementById('shuffleBtn').style.display = '';
  document.getElementById('tryAgainBtn').style.display = 'none';
  document.getElementById('message').textContent = '';
}

    function goToScreen(id) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById(id).classList.add('active');
      if (id === 'screen-puzzle') showPuzzleScreen();
      if (id === 'screen-special-letter') {
        
        let display = document.querySelector('#screen-special-letter .special-letter-content');
        display.style.opacity = 0;
        setTimeout(() => { display.style.opacity = 1; }, 400);
      }
      if (id === 'screen-greeting') {
        showLetter();
        document.getElementById('countdownDisplay').textContent = '';
      }
    }

    function startCountdown(seconds) {
      let timeLeft = seconds;
      const interval = 100;
      const timer = setInterval(() => {
        timeLeft = Math.max(0, timeLeft - interval/1000);
        countdownDisplay.textContent = timeLeft.toFixed(1) + 's';
        if (timeLeft <= 0) {
          clearInterval(timer);
          goToScreen('screen-greeting');
        }
      }, interval);
    }

    function showLetter() {
      const content = `
        <p>My dearest love,</p>
        <p>Every moment with you feels like a dream come true. Your smile lights up my world and your laugh is the sweetest melody. On this special day, I want you to know just how cherished you are, how deeply you are loved, and how grateful I am to share my life with you.</p>
        <p>May this birthday be filled with joy, surprises, and the warmth of every hug and every kiss. Here’s to many more adventures, laughter, and memories together.</p>
        <p>Forever and always,<br>❤️</p>
      `.trim();
      document.getElementById('letterContent').innerHTML = content;
    }const SIZE = 3; 
let board = [];
let emptyTile = { row: SIZE - 1, col: SIZE - 1 }; 

function initBoard() {
  board = [];
  let num = 1;
  for (let row = 0; row < SIZE; row++) {
    board[row] = [];
    for (let col = 0; col < SIZE; col++) {
      board[row][col] = num < SIZE * SIZE ? num++ : null; 
    }
  }
  shuffleBoard();
  renderBoard();
}

function shuffleBoard() {
  for (let i = 0; i < 100; i++) {
    const direction = Math.floor(Math.random() * 4);
    moveTile(direction);
  }
}

function renderBoard() {
  const boardElement = document.getElementById('puzzle-board');
  boardElement.innerHTML = '';
  for (let row = 0; row < SIZE; row++) {
    const rowElement = document.createElement('div');
    rowElement.className = 'puzzle-row';
    for (let col = 0; col < SIZE; col++) {
      const tile = board[row][col];
      const tileElement = document.createElement('div');
      tileElement.className = 'puzzle-tile';
      if (tile) {
        tileElement.textContent = tile;
        tileElement.onclick = () => handleTileClick(row, col);
      }
      rowElement.appendChild(tileElement);
    }
    boardElement.appendChild(rowElement);
  }
}

function handleTileClick(row, col) {
  if (isAdjacent(row, col, emptyTile.row, emptyTile.col)) {
    swapTiles(row, col);
    renderBoard();
    if (checkWin()) {
      setTimeout(() => alert('Congratulations! You solved the puzzle!'), 100);
    }
  }
}

function isAdjacent(row1, col1, row2, col2) {
  return (Math.abs(row1 - row2) === 1 && col1 === col2) || (Math.abs(col1 - col2) === 1 && row1 === row2);
}

function swapTiles(row, col) {
  board[emptyTile.row][emptyTile.col] = board[row][col];
  board[row][col] = null;
  emptyTile = { row, col };
}

function checkWin() {
  let num = 1;
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (row === SIZE - 1 && col === SIZE - 1) return board[row][col] === null; 
      if (board[row][col] !== num++) return false;
    }
  }
  return true;
}

function reset() {
  initBoard();
  document.getElementById('message').textContent = '';
}

document.addEventListener('DOMContentLoaded', initBoard);
