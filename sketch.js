let monsterX, monsterY; // 怪獸的位置
let monsterSpeedX, monsterSpeedY; // 怪獸移動速度
let music; // 音樂
let amplitude; // 音樂振幅
let currentExpression = 1; // 目前的表情，預設為1

function preload() {
  // 載入音樂文件
  music = loadSound('We Wish You a Merry Christmas.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 初始位置在畫布中央
  monsterX = width / 2;
  monsterY = height / 2;

  // 初始化怪獸移動速度
  randomizeMonsterSpeed();

  // 創建移動按鈕
  let moveButton = createButton('移動');
  moveButton.position(10, 10);
  moveButton.mousePressed(randomizeMonsterSpeed);

  // 創建停止按鈕
  let stopButton = createButton('停止');
  stopButton.position(70, 10);
  stopButton.mousePressed(stopMonster);

  // 創建變換表情按鈕
  let expressionButton = createButton('變換表情');
  expressionButton.position(140, 10);
  expressionButton.mousePressed(changeExpression);

  // 設置音樂撥放按鈕
  let musicButton = createButton('撥放音樂');
  musicButton.position(240, 10);
  musicButton.mousePressed(toggleMusic);

  // 初始化音樂振幅
  amplitude = new p5.Amplitude();
}

function draw() {
  background(220);

  // 檢查音樂振幅
  let level = amplitude.getLevel();
  let rotationAngle = map(level, 0, 1, 0, PI / 2);

  // 移動怪獸
  monsterX += monsterSpeedX;
  monsterY += monsterSpeedY;

  // 碰到邊界就反彈
  if (monsterX <= 0 || monsterX >= width) {
    monsterSpeedX *= -1;
  }

  if (monsterY <= 0 || monsterY >= height) {
    monsterSpeedY *= -1;
  }

  // 繪製怪獸
  drawMonster(monsterX, monsterY, currentExpression, rotationAngle);
}

function drawMonster(x, y, expression, rotationAngle) {
  push();
  translate(x, y);

  // 怪獸身體
  fill("#cdb4db"); // 紫色
  ellipse(0, 0, 80, 100);

  // 怪獸眼睛
  fill(255); // 白色
  ellipse(-20, -20, 20, 20);
  ellipse(20, -20, 20, 20);

  // 怪獸瞳孔
  fill(0); // 黑色
  ellipse(-20, -20, 10, 10);
  ellipse(20, -20, 10, 10);

  // 怪獸嘴巴
  fill("#e63946"); // 紅色
  arc(0, 10, 40, 20, 0, PI);

  // 怪獸牙齒
  fill("#fdf0d5");
  triangle(-10, 10, 0, 20, 10, 10);

  // 怪獸手
  fill("#bde0fe"); // 藍色
  rect(-30, 20, 20, 10);
  rect(10, 20, 20, 10);

  // 怪獸腳
  rect(-20, 50, 20, 10);
  rect(0, 50, 20, 10);

  // 擺動
  rotate(rotationAngle);

  // 表情
  if (expression === 2) {
    // 表情2
    fill("#ffafcc"); // 粉色
    rect(-10, -15, 20, 5);
  }

  pop();
}

function randomizeMonsterSpeed() {
  // 隨機設定怪獸移動速度
  monsterSpeedX = random(-3, 3);
  monsterSpeedY = random(-3, 3);
}

function stopMonster() {
  // 怪獸停止移動
  monsterSpeedX = 0;
  monsterSpeedY = 0;
}

function changeExpression() {
  // 變換表情
  currentExpression = (currentExpression === 1) ? 2 : 1;
}

function toggleMusic() {
  // 切換音樂播放狀態
  if (music.isPlaying()) {
    music.stop();
  } else {
    music.play();
  }
}