import { Piece } from "./Piece";
import { PieceChainUtil } from "../module/PieceChainUtil";
import { PiaceInitializeUtil } from "../module/PieceInitializeUtil";

/** #### パズルピースを5*6のマスに格納するためのクラス。
 * 
 *  ##### パズルピースの座標とpiaceArrayに関して
 *  * 座標の管理は piaceArray で行っている。piaceArray[Y座標][X座標] の形。
 *  * 座標を指定して検索するとき以外は、piaceArrayは用いずにPieceクラスを使って値を取得しています。
 *  * piaceArrayに格納している値はPiece.typeと同じで、パズルがもつ値を指しています。
 * 
 *  ##### 初期化に関して
 *  * このクラスの初期化はPiaceInitializeUtilのメソッドで行ってください。piaceArrayの初期化処理が向こうにあるためです。
 */
export class PieceContainer {

    public static LENGTH_X: number = 6;
    public static LENGTH_Y: number = 5;
    public static CAPACITY: number = PieceContainer.LENGTH_X * PieceContainer.LENGTH_Y;

    public piaceArray: number[][] = [];

    constructor(piaceArray: number[][]) {
        this.piaceArray = piaceArray;
    }

    /** 引数:xy1 と 引数:xy2で指定した座標の値を入れ替えます。 */
    private exchangePiece(xy1: number[], xy2: number[]): void {
        const tmp: number = this.piaceArray[xy1[1]][xy1[0]];
        this.piaceArray[xy1[1]][xy1[0]] = this.piaceArray[xy2[1]][xy2[0]];
        this.piaceArray[xy2[1]][xy2[0]] = tmp;
    }

    /** 引数のY座標にある、X方向のピースを一括で取得します。 */
    private getPiecesOfLineX(y: number): Piece[] {
        const pieces: Piece[] = [];
        for (let x = 0; x < PieceContainer.LENGTH_X; x++) {
            pieces.push(new Piece(x, y, this.piaceArray[y][x]));
        }
        return pieces;
    }

    /** 引数のX座標にある、Y方向のピースを一括で取得します。 */
    private getPiecesOfLineY(x: number): Piece[] {
        const pieces: Piece[] = [];
        for (let y = 0; y < PieceContainer.LENGTH_Y; y++) {
            pieces.push(new Piece(x, y, this.piaceArray[y][x]));
        }
        return pieces;
    }

    /** piaceArrayの中で、連鎖(=3つ以上同じ値が連なっている)のピースのまとまりを配列で返します。 */
    public getChainedPiecesArray(): Piece[][] {
        const chainResultArray: Piece[][] = [];
        for (let x = 0; x < PieceContainer.LENGTH_X; x++) {
            const array: Piece[][] = PieceChainUtil.getChainedPiecesArray(this.getPiecesOfLineY(x));
            if (array.length > 0) {
                array.forEach(a => chainResultArray.push(a));
            }
        }
        for (let y = 0; y < PieceContainer.LENGTH_Y; y++) {
            const array: Piece[][] = PieceChainUtil.getChainedPiecesArray(this.getPiecesOfLineX(y));
            if (array.length > 0) {
                array.forEach(a => chainResultArray.push(a));
            }
        }
        return chainResultArray;
    }

    /** piaceArrayの中で、交換すると連鎖するピースを配列にして返します。(交換は隣接するものしか行わない想定。)  
     *  入れ替えた方向の１列、入れ替える方向と垂直の２列(交換した２つのピースを含んでいる列)をチェックしています。 */
    public getChainablePiecesArray(): Piece[][] {
        const chainablePoint: Piece[][] = [];
        for (let y = 0; y < PieceContainer.LENGTH_Y-1; y++) {
            for (let x = 0; x < PieceContainer.LENGTH_X-1; x++) {
                // X軸に入れ替えた場合のチェック
                const tmpPcX = PiaceInitializeUtil.copyPieceContainer(this);
                tmpPcX.exchangePiece([x, y], [x+1, y]);
                if (PieceChainUtil.isChainLine(tmpPcX.getPiecesOfLineX(y))) {
                    chainablePoint.push([new Piece(x, y, this.piaceArray[y][x]), new Piece(x+1, y, this.piaceArray[y][x+1])]);
                } else if (PieceChainUtil.isChainLine(tmpPcX.getPiecesOfLineY(x)) || PieceChainUtil.isChainLine(tmpPcX.getPiecesOfLineY(x+1))) {
                    chainablePoint.push([new Piece(x, y, this.piaceArray[y][x]), new Piece(x+1, y, this.piaceArray[y][x+1])]);
                }
                // Y軸に入れ替えた場合のチェック
                const tmpPcY = PiaceInitializeUtil.copyPieceContainer(this);
                tmpPcY.exchangePiece([x, y], [x, y+1]);
                if (PieceChainUtil.isChainLine(tmpPcY.getPiecesOfLineY(x))) {
                    chainablePoint.push([new Piece(x, y, this.piaceArray[y][x]), new Piece(x, y+1, this.piaceArray[y+1][x])]);
                } else if (PieceChainUtil.isChainLine(tmpPcY.getPiecesOfLineX(y)) || PieceChainUtil.isChainLine(tmpPcY.getPiecesOfLineX(y+1))) {
                    chainablePoint.push([new Piece(x, y, this.piaceArray[y][x]), new Piece(x, y+1, this.piaceArray[y+1][x])]);
                }
            }
        }
        return chainablePoint;
    }

}