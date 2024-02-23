const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 60;
const ballSize = 10;

let player1Score = 0;
let player2Score = 0;
const winningScore = 5; // Define the winning score

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: 3,
  dy: 3
};

let player1 = {
  x: 10,
  y: canvas.height / 2 - paddleHeight / 2
};

let player2 = {
  x: canvas.width - paddleWidth - 10,
  y: canvas.height / 2 - paddleHeight / 2
};

function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillStyle = "#000";
  ctx.fillRect(player1.x, player1.y, paddleWidth, paddleHeight);
  ctx.fillRect(player2.x, player2.y, paddleWidth, paddleHeight);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.closePath();

  // Draw scores
  ctx.font = "20px Arial";
  ctx.fillText("Player 1: " + player1Score, 50, 30);
  ctx.fillText("Player 2: " + player2Score, canvas.width - 150, 30);
}

function update() {
  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ball collision with walls
  if (ball.y + ball.dy > canvas.height - ballSize || ball.y + ball.dy < ballSize) {
    ball.dy = -ball.dy;
  }

  // Ball collision with paddles
  if (
    (ball.x + ball.dx < player1.x + paddleWidth && ball.y > player1.y && ball.y < player1.y + paddleHeight) ||
    (ball.x + ball.dx > player2.x && ball.y > player2.y && ball.y < player2.y + paddleHeight)
  ) {
    ball.dx = -ball.dx;
  }

  // Ball out of bounds
  if (ball.x + ball.dx > canvas.width - ballSize || ball.x + ball.dx < ballSize) {
    if (ball.x + ball.dx < ballSize) {
      player2Score++;
    } else {
      player1Score++;
    }
    if (player1Score >= winningScore || player2Score >= winningScore) {
      endGame();
    } else {
      resetBall();
    }
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
  ball.dy = Math.random() < 0.5 ? -3 : 3;
}

function endGame() {
  if (player1Score >= winningScore) {
    alert("Player 1 wins!");
  } else {
    alert("Player 2 wins!");
  }
  // Reset scores
  player1Score = 0;
  player2Score = 0;
}

function gameLoop() {
  draw();
  update();
  requestAnimationFrame(gameLoop);
}

gameLoop();

// Player 1 controls
document.addEventListener("keydown", function(event) {
  if (event.key === "w" && player1.y > 0) {
    player1.y -= 10;
  } else if (event.key === "s" && player1.y < canvas.height - paddleHeight) {
    player1.y += 10;
  }
});

// Player 2 controls
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp" && player2.y > 0) {
    player2.y -= 10;
  } else if (event.key === "ArrowDown" && player2.y < canvas.height - paddleHeight) {
    player2.y += 10;
  }
});
