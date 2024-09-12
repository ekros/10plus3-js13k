/*
    10 + 3 Math puzzle game
    
    In the middle there is a random number.
    Using the up, down, left and right operations in the correct order
    try to get 13 as a result.

    Controls: Use arrow keys to select the operations!
*/

// TODO-ING:
// On-screen game instructions
// simple sounds
// test it!!

import { setCanvasPixelated, vec2, Sound, rgb, drawText, engineInit, Color, keyWasPressed, setShowWatermark, drawRect } from "littlejsengine";
import { startGameRound } from "./helpers";
import { OPERATION_TYPE } from "./types";
import { COLOR_PALETTE, DIFFICULTY, GAME_STATE } from "./constants";
import { renderBackground, renderInstructions, renderLevel } from "./render-functions";

// do not use pixelated rendering
setCanvasPixelated(false);
// remove watermark
setShowWatermark(false);


// sound effects
const sound_goodMove = new Sound([.4,.2,250,.04,,.04,,,1,,,,,3]);
const sound_badMove = new Sound([,,700,,,.07,,,,3.7,,,,3,,,.1]);
const sound_fall = new Sound([.2,,1900,,,.01,,1.4,,91,,,,,,,,,,.7]);

// tiles
const tileColors = 
[
    rgb(1,0,0),
    rgb(1,1,1),
    rgb(1,1,0),
    rgb(0,1,0),
    rgb(0,.6,1),
    rgb(.6,0,1),
    rgb(.5,.5,.5),
];

// ***********
  let gameRound;
  let addOperand;
  let subOperand;
  let divOperand;
  let mulOperand;
  let gameState = GAME_STATE.PLAYING;
  let level = 1;
// ***********

const createOperands = gameRound => {
  gameRound.sequence.forEach(op => {
    if (op.type === OPERATION_TYPE.ADD) {
      addOperand = op.value;
    } else if (op.type === OPERATION_TYPE.SUB) {
      subOperand = op.value;
    } else if (op.type === OPERATION_TYPE.MUL) {
      mulOperand = op.value;
    } else if (op.type === OPERATION_TYPE.DIV) {
      divOperand = op.value;
    }
  });
};

const resetOperands = () => {
  addOperand = undefined;
  subOperand = undefined;
  divOperand = undefined;
  mulOperand = undefined;
};

const resetGame = () => {
  let currentDifficulty = DIFFICULTY.easy;
  if (level > 10) {
    currentDifficulty = DIFFICULTY.hard;
  } else if (level > 5) {
    currentDifficulty = DIFFICULTY.medium;
  }
  gameRound = startGameRound(currentDifficulty);
  resetOperands();
  createOperands(gameRound);
  gameState = GAME_STATE.PLAYING;
};

const nextLevel = () => {
  level += 1;
  resetGame();
}

const updateCurrentResult = (op) => {
  if (op.type === OPERATION_TYPE.ADD) {
    gameRound.initialNumber += op.value;
  } else if (op.type === OPERATION_TYPE.SUB) {
    gameRound.initialNumber -= op.value;
  } else if (op.type === OPERATION_TYPE.MUL) {
    gameRound.initialNumber *= op.value;
  } else if (op.type === OPERATION_TYPE.DIV) {
    gameRound.initialNumber /= op.value;
  }
};

function gameInit()
{
  gameRound = startGameRound();
  console.log("gameRound", gameRound);
  createOperands(gameRound);
}


function gameUpdate()
{
  const sendAnswer = (answerOperation: OPERATION_TYPE) => {
    const op = gameRound.sequence.pop();
    if (op.type === answerOperation) {
      resetOperands();
      createOperands(gameRound);
      updateCurrentResult(op);
      if (gameRound.sequence.length === 0) {
        gameState = GAME_STATE.WIN;
      }
    } else {
      gameState = GAME_STATE.LOSE;
    }
  }

  if (gameState === GAME_STATE.PLAYING && keyWasPressed("ArrowUp") && addOperand) {
    sendAnswer(OPERATION_TYPE.ADD);
  } else if (gameState === GAME_STATE.PLAYING && keyWasPressed("ArrowRight") && mulOperand) {
    sendAnswer(OPERATION_TYPE.MUL);
  } else if (gameState === GAME_STATE.PLAYING && keyWasPressed("ArrowDown") && subOperand) {
    sendAnswer(OPERATION_TYPE.SUB);
  } else if (gameState === GAME_STATE.PLAYING && keyWasPressed("ArrowLeft") && divOperand) {
    sendAnswer(OPERATION_TYPE.DIV);
  } else if (gameState === GAME_STATE.WIN && keyWasPressed("Enter")) {
    nextLevel();
  } else if (gameState === GAME_STATE.LOSE && keyWasPressed("Enter")) {{
    level = 1;
    resetGame();
  }}
}

function gameUpdatePost()
{

}

function gameRender()
{
  renderBackground();

  renderLevel(level);

  if (gameState === GAME_STATE.WIN) {
    drawRect(vec2(-0.05, 0), vec2(1.7, 1.7), COLOR_PALETTE.GREEN);
  } else {
    drawRect(vec2(-0.05, 0), vec2(1.7, 1.7), COLOR_PALETTE.BLUE);
  }
  drawText(gameRound.initialNumber.toString(), vec2(0, 0), 1, COLOR_PALETTE.WHITE, 4, COLOR_PALETTE.TRANSPARENT);

  if (addOperand) {
    drawText("+", vec2(0, 2), 1, COLOR_PALETTE.WHITE, 2, COLOR_PALETTE.TRANSPARENT);
    drawText(addOperand, vec2(0, 4), 1, COLOR_PALETTE.WHITE, 2, COLOR_PALETTE.TRANSPARENT);
    drawRect(vec2(0, 4), vec2(1.7, 1.7), COLOR_PALETTE.ORANGE);
  }
  
  if (subOperand) {
    drawText("-", vec2(0, -2), 1, COLOR_PALETTE.WHITE, 2, COLOR_PALETTE.TRANSPARENT);
    drawText(subOperand, vec2(0, -4), 1, COLOR_PALETTE.WHITE, 2, COLOR_PALETTE.TRANSPARENT);
    drawRect(vec2(0, -4), vec2(1.7, 1.7), COLOR_PALETTE.ORANGE);
  }
  
  if (mulOperand) {
    drawText("x", vec2(2, 0), 1, COLOR_PALETTE.WHITE, 2, COLOR_PALETTE.TRANSPARENT);
    drawText(mulOperand, vec2(4, 0), 1, COLOR_PALETTE.WHITE, 2, COLOR_PALETTE.TRANSPARENT);
    drawRect(vec2(4, 0), vec2(1.7, 1.7), COLOR_PALETTE.ORANGE);
  }
  
  if (divOperand) {
    drawText("/", vec2(-2, 0), 1, COLOR_PALETTE.WHITE, 2, COLOR_PALETTE.TRANSPARENT);
    drawText(divOperand, vec2(-4, 0), 1, COLOR_PALETTE.WHITE, 2, COLOR_PALETTE.TRANSPARENT);
    drawRect(vec2(-4, 0), vec2(1.7, 1.7), COLOR_PALETTE.ORANGE);
  }

  if (level <= 3) {
    renderInstructions();
  }

  switch (gameState) {
    case GAME_STATE.WIN:
        const successColor = new Color();
        drawText("Correct! Press enter to continue...", vec2(0, 6), 1, COLOR_PALETTE.GREEN, 2, COLOR_PALETTE.TRANSPARENT);
      break;
      case GAME_STATE.LOSE:
        const errorColor = new Color();
        drawText("Wrong! Press enter to continue...", vec2(0, 6), 1, COLOR_PALETTE.RED, 2, COLOR_PALETTE.TRANSPARENT);
    break;
  }
}

function gameRenderPost()
{
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);

