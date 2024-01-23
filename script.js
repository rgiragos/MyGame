const player = document.querySelector(".player");
const scoreDisplay = document.querySelector(".score");
const obstaclesContainer = document.querySelector(".obstacles");
const gameContainer = document.querySelector(".game-container");
const gameOverScreen = document.querySelector(".game-over");
const restartButton = document.querySelector(".game-over button");
const finalScoreDisplay = document.querySelector(".game-over span");
const collectiblesContainer = document.querySelector(".collectibles");
const collectiblesCounter = document.querySelector(".collectibles-count .count"); // Select the collectibles counter
const audioControlButton = document.getElementById('audioControl');
const backgroundMusic = document.getElementById('backgroundMusic');
const audioContainer = document.getElementById('audio-container');

let isAudioPlaying = false;

function toggleAudio() {
  if (isAudioPlaying) {
    backgroundMusic.pause();
  } else {
    backgroundMusic.play();
  }
  isAudioPlaying = !isAudioPlaying;
  updateAudioControlButtonText();
}

function updateAudioControlButtonText() {
  audioControlButton.textContent = isAudioPlaying ? 'Pause Audio' : 'Play Audio';
}

audioControlButton.addEventListener('click', toggleAudio);

// Initialize the button text
updateAudioControlButtonText();

function restartGame() {
  // Restart the game
  // ...

  // Restart the audio
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();
  isAudioPlaying = true;
  updateAudioControlButtonText();
}

// Add an event listener for game restart
restartButton.addEventListener('click', restartGame);



let playerPositionY = 0;
let isJumping = false;
let score = 0;
let collectiblesCount = 0; // Initialize collectibles count
let gameInProgress = true;

function jump(event) {
  if (event.keyCode === 32 && !isJumping && gameInProgress) {
    isJumping = true;
    playerPositionY += 100;
    player.style.bottom = playerPositionY + "px";
    setTimeout(() => {
      playerPositionY -= 100;
      player.style.bottom = playerPositionY + "px";
      isJumping = false;
    }, 500);
  }

  // Left arrow key (move left)
  if (event.keyCode === 37 && gameInProgress) {
    const playerLeft = parseInt(player.style.left, 10);
    if (playerLeft > 0) {
      player.style.left = playerLeft - 20 + "px";
    }
  }

  // Right arrow key (move right)
  if (event.keyCode === 39 && gameInProgress) {
    const playerLeft = parseInt(player.style.left, 10);
    if (playerLeft < gameContainer.offsetWidth - player.offsetWidth) {
      player.style.left = playerLeft + 20 + "px";
    }
  }
}

function restartGame() {
  gameInProgress = true;
  score = 0;
  scoreDisplay.textContent = "Score: " + score;
  obstaclesContainer.innerHTML = "";
  collectiblesContainer.innerHTML = "";
  collectiblesCount = 0; // Reset the collectibles count
  collectiblesCounter.textContent = collectiblesCount; // Update the collectibles count display
  gameOverScreen.style.display = "none";
  playerPositionY = 0;
  player.style.bottom = playerPositionY + "px";
  player.style.left = "0"; // Reset player's horizontal position
  finalScoreDisplay.textContent = "0";
  startGameLoop();
}

restartButton.addEventListener("click", restartGame);

document.addEventListener("keydown", jump);

function createObstacle() {
  if (!gameInProgress) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstaclesContainer.appendChild(obstacle);
  obstacle.style.left = "1000%";
  obstacle.style.bottom = "0";

  function moveObstacle() {
    if (!gameInProgress) return;

    obstacle.style.left = parseInt(obstacle.style.left, 10) - 6 + "px";
    const obstacleLeft = parseInt(obstacle.style.left, 10);

    if (obstacleLeft < -30) {
      obstaclesContainer.removeChild(obstacle);
      score++;
      scoreDisplay.textContent = "Score: " + score;
    } else {
      const playerTop = playerPositionY;
      const playerBottom = playerPositionY + 50;
      const playerLeft = parseInt(player.style.left, 10);
      const playerRight = playerLeft + 50;
      const obstacleTop = 0;
      const obstacleBottom = 30;
      const obstacleRight = obstacleLeft + 30;

      if (
        playerBottom >= obstacleTop &&
        playerTop <= obstacleBottom &&
        playerRight >= obstacleLeft &&
        playerLeft <= obstacleRight
      ) {
        gameOver();
      }

      requestAnimationFrame(moveObstacle);
    }
  }

  requestAnimationFrame(moveObstacle);
}

function createCollectible() {
  if (!gameInProgress) return;

  // Minimum distance between collectibles and obstacles
  const minDistance = 100;

  // Calculate the position of the next obstacle
  const nextObstacle = document.querySelector(".obstacle");
  let obstaclePosition = 1000; // Default position when there are no obstacles

  if (nextObstacle) {
    obstaclePosition = parseInt(nextObstacle.style.left, 10);
  }

  // Calculate the position of the collectible
  const collectible = document.createElement("div");
  collectible.classList.add("collectible");
  collectiblesContainer.appendChild(collectible);
  collectible.style.left = obstaclePosition + minDistance + "px";
  collectible.style.bottom = "0";

  function moveCollectible() {
    if (!gameInProgress) return;

    collectible.style.left = parseInt(collectible.style.left, 10) - 6 + "px";
    const collectibleLeft = parseInt(collectible.style.left, 10);
    const playerTop = playerPositionY;
    const playerBottom = playerPositionY + 50;
    const playerLeft = parseInt(player.style.left, 10);
    const playerRight = playerLeft + 50;
    const collectibleTop = 0;
    const collectibleBottom = 30;
    const collectibleRight = collectibleLeft + 30;

    if (
      playerBottom >= collectibleTop &&
      playerTop <= collectibleBottom &&
      playerRight >= collectibleLeft &&
      playerLeft <= collectibleRight
    ) {
      // Player collected the collectible
      collectiblesContainer.removeChild(collectible);
      collectiblesCount++;
      collectiblesCounter.textContent = collectiblesCount;
    } else if (collectibleLeft < -30) {
      // Collectible went off the screen without being collected
      collectiblesContainer.removeChild(collectible);
    } else {
      requestAnimationFrame(moveCollectible);
    }
  }

  requestAnimationFrame(moveCollectible);
}

function gameOver() {
  gameInProgress = false;
  gameOverScreen.style.display = "block";
  finalScoreDisplay.textContent = score;
  gameContainer.style.display = "none";
}

function startGameLoop() {
  gameInProgress = true;
  score = 0;
  collectiblesCount = 0; // Reset the collectibles count
  scoreDisplay.textContent = "Score: " + score;
  collectiblesCounter.textContent = collectiblesCount; // Update the collectibles count display
  obstaclesContainer.innerHTML = "";
  collectiblesContainer.innerHTML = "";
  gameOverScreen.style.display = "none";
  gameContainer.style.display = "block";
  playerPositionY = 0;
  player.style.bottom = playerPositionY + "px";
  player.style.left = "0"; // Reset player's horizontal position
 

let isAudioPlaying = false;

function toggleAudio() {
  if (isAudioPlaying) {
    backgroundMusic.pause();
  } else {
    backgroundMusic.play();
  }
  isAudioPlaying = !isAudioPlaying;
  updateAudioControlButtonText();
}

function updateAudioControlButtonText() {
  audioControlButton.textContent = isAudioPlaying ? 'Pause Audio' : 'Play Audio';
}

audioControlButton.addEventListener('click', toggleAudio);

// Initialize the button text
updateAudioControlButtonText();

function restartGame() {
  // Restart the game
  // ...

  // Restart the audio
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();
  isAudioPlaying = true;
  updateAudioControlButtonText();
}

// Add an event listener for game restart
restartButton.addEventListener('click', restartGame);




  setInterval(createObstacle, 1500);
  setInterval(createCollectible, 10000);
}

startGameLoop();
