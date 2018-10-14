const message: string = "テストです。";
console.log(`${message}`);

class PieceContainer {

    public static LENGTH_X: number = 6;
    public static LENGTH_Y: number = 5;
    public static CAPACITY: number = PieceContainer.LENGTH_X * PieceContainer.LENGTH_Y;

    private piaceArray: PuzzlePiece[] = [];

    constructor() {
        PiaceArrayInitializer.random(this.piaceArray);
    }

    public dispContainer(): void {
        // TODO: 表示ごとにソートしているので実際のゲームだったら物凄く効率が悪い。。。
        this.piaceArray.sort((a: PuzzlePiece, b: PuzzlePiece) => a.compareOfPoint(b));

        let result: string = "";
        this.piaceArray.forEach((p, i) => {
            result += p.typeString;
            if ((i + 1) % PieceContainer.LENGTH_X === 0) { result += "\n"; }
        });

        console.log("▼ランダム生成の結果は以下の通りになりました。");
        console.log(result);

        console.log("▼3連続の部分を抽出します。");
        const chainResultArray: PuzzlePiece[][] = [];
        for (let x = 1; x <= PieceContainer.LENGTH_X; x++) {
            const array: PuzzlePiece[] = PieceArrayChecker.getChainedPieces(this.getLineY(x));
            if (array.length > 0) {
                chainResultArray.push(array);
            }
        }
        for (let y = 1; y <= PieceContainer.LENGTH_Y; y++) {
            const array: PuzzlePiece[] = PieceArrayChecker.getChainedPieces(this.getLineX(y));
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

    public getLineX(y: number): PuzzlePiece[] {
        return this.piaceArray.filter((p) => p.pointY === y);
    }

    public getLineY(x: number): PuzzlePiece[] {
        return this.piaceArray.filter((p) => p.pointX === x);
    }
}

// tslint:disable-next-line:max-classes-per-file
class PuzzlePiece {

    public static TYPE: number[] = [1, 2, 3, 4, 5, 6];
    public pointX: number = 0;
    public pointY: number = 0;
    public type: number = 0;

    constructor(x: number, y: number, type: number) {
        this.pointX = x;
        this.pointY = y;
        this.type = type;
    }

    public compareOfPoint(p: PuzzlePiece): number {
        const isLess: boolean = this.pointY === p.pointY ? this.pointX < p.pointX : this.pointY < p.pointY;
        return isLess ? -1 : 1;
    }

    get typeString(): string {
        return this.type.toString();
    }
}

// tslint:disable-next-line:no-namespace
namespace PiaceArrayInitializer {
    export function random(piaceArray: PuzzlePiece[]) {
        // do something
        Math.random();
        for (let y = 1; y <= PieceContainer.LENGTH_Y; y++) {
            for (let x = 1; x <= PieceContainer.LENGTH_X; x++) {
                const type = Math.floor(Math.random() * PuzzlePiece.TYPE.length) + 1;
                piaceArray.push(new PuzzlePiece(x, y, type));
            }
        }
    }
}

// tslint:disable-next-line:no-namespace
namespace PieceArrayChecker {

    const CHAIN_NUM: number = 3;

    export function getChainedPieces(line: PuzzlePiece[]): PuzzlePiece[] {

        const targetType: number[] = PuzzlePiece.TYPE.filter((type) => {
            let chainCount = 0;
            let maxChainCount = 0;
            line.forEach((p) => {
                // TODO: この方法だとline.lengthが7以上のときに２つ塊があるときに正しくチェックできない時がある。
                chainCount = p.type === type ? chainCount + 1 : 0;
                if (maxChainCount < chainCount) {
                    maxChainCount = chainCount;
                }
            });
            return maxChainCount >= CHAIN_NUM;
        });

        return line.filter((p) => {
            return targetType.some((t) => t === p.type);
        });
    }
}

let pc = new PieceContainer();
pc.dispContainer();
