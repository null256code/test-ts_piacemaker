import { Piece } from "./Piece";
import { PieceChainUtil } from "../module/PieceChainUtil";

export class PieceContainer {

    public static LENGTH_X: number = 6;
    public static LENGTH_Y: number = 5;
    public static CAPACITY: number = PieceContainer.LENGTH_X * PieceContainer.LENGTH_Y;

    private piaceArray: number[][] = [];

    constructor(piaceArray: number[][]) {
        this.piaceArray = piaceArray;
    }

    public dispContainer(): void {
        let result: string = "";
        this.piaceArray.forEach((p, i) => {
            result += p.join(" ") + "\n";
        });
        console.log(result);
    }

    public dispChainedPiecesArray(): void {
        this.getChainedPiecesArray().forEach((array, i) => {
            let result: string = `連鎖 ${i + 1}番目：`;
            result += array.map((p) => ` (${p.pointX + 1}, ${p.pointY + 1})`);
            console.log(result);
        });
    }

    public getPiecesOfLineX(y: number): Piece[] {
        const pieces: Piece[] = [];
        for (let x = 0; x < PieceContainer.LENGTH_X; x++) {
            pieces.push(new Piece(x, y, this.piaceArray[y][x]));
        }
        return pieces;
    }

    public getPiecesOfLineY(x: number): Piece[] {
        const pieces: Piece[] = [];
        for (let y = 0; y < PieceContainer.LENGTH_Y; y++) {
            pieces.push(new Piece(x, y, this.piaceArray[y][x]));
        }
        return pieces;
    }

    private getChainedPiecesArray(): Piece[][] {
        const chainResultArray: Piece[][] = [];
        for (let x = 0; x < PieceContainer.LENGTH_X; x++) {
            const array: Piece[] = PieceChainUtil.getChainedPiecesOfLine(this.getPiecesOfLineY(x));
            if (array.length > 0) {
                chainResultArray.push(array);
            }
        }
        for (let y = 0; y < PieceContainer.LENGTH_Y; y++) {
            const array: Piece[] = PieceChainUtil.getChainedPiecesOfLine(this.getPiecesOfLineX(y));
            if (array.length > 0) {
                chainResultArray.push(array);
            }
        }
        return chainResultArray;
    }
}