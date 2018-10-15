import { Piece } from "../class/Piece";
import { PieceContainer } from "../class/PieceContainer";

export module PiaceInitializeUtil {

    export function random(): Piece[] {
        let piaceArray: Piece[] = [];
        for (let y = 1; y <= PieceContainer.LENGTH_Y; y++) {
            for (let x = 1; x <= PieceContainer.LENGTH_X; x++) {
                const type = Math.floor(Math.random() * Piece.TYPE.length) + 1;
                piaceArray.push(new Piece(x, y, type));
            }
        }
        return piaceArray;
    }
}