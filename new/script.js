const CORRECT_PIN = '322024';
    const input = document.getElementById('pwd');

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

    const countdownDisplay = document.getElementById('countdownDisplay');

    function startCountdown(seconds) {
      let timeLeft = seconds;
      const interval = 100;
      const timer = setInterval(() => {
        timeLeft = Math.max(0, timeLeft - interval / 1000);
        countdownDisplay.textContent = timeLeft.toFixed(1) + 's';
        if (timeLeft <= 0) {
          clearInterval(timer);
          goToScreen('screen-greeting');
        }
      }, interval);
    }

    function showLetter() {
      const content = `
        <p>CX Sone Yay</p>
        <p>You are beautiful. Beautiful like a lone daisy in the middle of the field waiting patiently for 
        a drop of rain. Beautiful in a way even the brightest star would grow envious as if you were painted by 
        the universe itself. Beautiful like the glow of the moon when it lights up the darkest of the nights. 
        I don't care if the whole world thinks otherwise. In my eyes, you are the perfect image, a work of art. You hold the
         beauty that isn't just seen, it's felt.<br>❤️</p>
      `.trim();
      document.getElementById('letterContent').innerHTML = content;
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
    div.style.backgroundImage = "url('viber_image_2025-08-02_22-14-25-597.jpg')";
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


