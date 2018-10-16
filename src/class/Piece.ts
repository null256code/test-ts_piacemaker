/** パズルの一ピースを表すクラス。 */
export class Piece {
    
    public static TYPE: number[] = [1, 2, 3, 4, 5, 6];
    public pointX: number = 0;
    public pointY: number = 0;
    public type: number = 0; //パズルが持つ値。PieceContainer.pieceArrayの持つ値と同じ。

    constructor(x: number, y: number, type: number) {
        this.pointX = x;
        this.pointY = y;
        this.type = type;
    }
}