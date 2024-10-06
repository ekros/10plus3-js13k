import { drawRect, drawText, mainCanvas, vec2 } from "littlejsengine"
import { COLOR_PALETTE } from "./constants"

export const renderBackground = () => {
    drawRect(vec2(0,0), vec2(mainCanvas.width, mainCanvas.height), COLOR_PALETTE.YELLOW);
    // drawRect(vec2(-10, 0), vec2(mainCanvas.width, 1), COLOR_PALETTE.ORANGE);
    // drawRect(vec2(0, -10), vec2(1, mainCanvas.height), COLOR_PALETTE.ORANGE);
}

export const renderLevel = (level: number) => {
    drawText(`Level ${level}`, vec2(0, 12), 1, COLOR_PALETTE.WHITE, 2, COLOR_PALETTE.TRANSPARENT);
}

export const renderInstructions = () => {
    drawRect(vec2(-20, -9), vec2(100, 4), COLOR_PALETTE.BLUE);
    drawText("Welcome to 10 + 3! This game will help you with your phobia to... that number.", vec2(0, -9), 0.5 , COLOR_PALETTE.WHITE, 2, COLOR_PALETTE.TRANSPARENT);
    drawText("Use the arrow keys to perform the operations in the correct order to get... that number.", vec2(-0.85, -9.5), 0.5 , COLOR_PALETTE.WHITE, 2, COLOR_PALETTE.TRANSPARENT);
}

export const renderMaxLevel = (maxLevel: string) => {
    drawText(`Your max. level: ${maxLevel}`, vec2(12, 12), 0.5, COLOR_PALETTE.WHITE, 2, COLOR_PALETTE.TRANSPARENT);
}