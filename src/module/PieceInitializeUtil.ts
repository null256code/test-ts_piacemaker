import { Piece } from "../class/Piece";
import { PieceContainer } from "../class/PieceContainer";

export module PiaceInitializeUtil {

    export function random(): PieceContainer {
        let piaceArray: number[][] = new Array(PieceContainer.LENGTH_Y);
        for (let y = 0; y < PieceContainer.LENGTH_Y; y++) {
            piaceArray[y] = new Array(PieceContainer.LENGTH_X);
            for (let x = 0; x < PieceContainer.LENGTH_X; x++) {
                const type = Math.floor(Math.random() * Piece.TYPE.length) + 1;
                piaceArray[y][x] = type;
            }
        }
        return new PieceContainer(piaceArray);
    }

    export function nonChainRandom(): PieceContainer {
        let piaceArray: number[][] = new Array(PieceContainer.LENGTH_Y);
        for (let y = 0; y < PieceContainer.LENGTH_Y; y++) {
            piaceArray[y] = new Array(PieceContainer.LENGTH_X);
            for (let x = 0; x < PieceContainer.LENGTH_X; x++) {
                let type = Math.floor(Math.random() * Piece.TYPE.length) + 1;

                const isChainX: boolean = x < 2 ? false : type === piaceArray[y][x-1] && type === piaceArray[y][x-2];
                const isChainY: boolean = y < 2 ? false : type === piaceArray[y-1][x] && type === piaceArray[y-2][x];
                if (isChainX || isChainY) {
                    const excludeType: number[] = [];
                    if (x >= 2)  { excludeType.push(piaceArray[y][x-1]) }
                    if (y >= 2)  { excludeType.push(piaceArray[y-1][x]) }

                    // TYPEの配列からX軸Y軸の一つどなりの値を除外した配列を作り、そこからランダムなインデックスで取得する。
                    type = Piece.TYPE.filter((t) => !excludeType.some((ext) => t === ext))[Math.floor(Math.random() * (Piece.TYPE.length - excludeType.length))];
                }

                piaceArray[y][x] = type;
            }
        }
        return new PieceContainer(piaceArray);
    }

    /** PieceContainer.pieceArrayがディープコピーされた状態のPieceContainerを作るために作成。
     *  TODO: もしPieceContainerにpieceArray以外のプロパティが出来たら、このメソッドは修正する必要がある。 */
    export function copyPieceContainer(pieceContainer: PieceContainer): PieceContainer { 
        const copiedArray: number[][] = [];
        pieceContainer.piaceArray.forEach((a) => {
            copiedArray.push(a.concat());
        })
        return new PieceContainer(copiedArray);
    }
}