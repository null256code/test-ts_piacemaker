import { Piece } from "./Piece";
import { PiaceInitializeUtil } from "../module/PieceInitializeUtil";
import { PieceChainUtil } from "../module/PieceChainUtil";

export class PieceContainer {

    public static LENGTH_X: number = 6;
    public static LENGTH_Y: number = 5;
    public static CAPACITY: number = PieceContainer.LENGTH_X * PieceContainer.LENGTH_Y;

    private piaceArray: Piece[] = [];

    constructor() {
        PiaceInitializeUtil.random(this.piaceArray);
    }

    public dispContainer(): void {
        // TODO: 表示ごとにソートしているので実際のゲームだったら物凄く効率が悪い。。。
        this.piaceArray.sort((a: Piece, b: Piece) => a.compareOfPoint(b));

        let result: string = "";
        this.piaceArray.forEach((p, i) => {
            result += p.typeString;
            if ((i + 1) % PieceContainer.LENGTH_X === 0) { result += "\n"; }
        });

        console.log("▼ランダム生成の結果は以下の通りになりました。");
        console.log(result);

        console.log("▼3連続の部分を抽出します。");
        const chainResultArray: Piece[][] = [];
        for (let x = 1; x <= PieceContainer.LENGTH_X; x++) {
            const array: Piece[] = PieceChainUtil.getChainedPieces(this.getLineY(x));
            if (array.length > 0) {
                chainResultArray.push(array);
            }
        }
        for (let y = 1; y <= PieceContainer.LENGTH_Y; y++) {
            const array: Piece[] = PieceChainUtil.getChainedPieces(this.getLineX(y));
            if (array.length > 0) {
                chainResultArray.push(array);
            }

        }
        chainResultArray.forEach((array, i) => {
            let result: string = `連鎖 ${i + 1}番目：`;
            result += array.map((p) => ` (${p.pointX}, ${p.pointY})`);
            console.log(result);
        });
    }

    public getLineX(y: number): Piece[] {
        return this.piaceArray.filter((p) => p.pointY === y);
    }

    public getLineY(x: number): Piece[] {
        return this.piaceArray.filter((p) => p.pointX === x);
    }
}