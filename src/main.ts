import { Piece } from "./class/Piece";
import { PieceContainer } from "./class/PieceContainer";
import { PiaceInitializeUtil } from "./module/PieceInitializeUtil";

const message: string = "main.tsを実行します。";

q1_RandomInit_dispChainPieces();

console.log("\n---------------------------\n");

q2_NonChainRandomInit();

console.log("\n---------------------------\n");

q3_ExcheangePoint_VerticalOrHorizon();


function q1_RandomInit_dispChainPieces(): void {
    const piaceContainer = PiaceInitializeUtil.random();
    console.log("▼ランダム生成の結果は以下の通りになりました。");
    dispPiaceContainer(piaceContainer);

    console.log("▼連鎖の部分を抽出します。");
    dispAllXYPoint(piaceContainer.getChainedPiecesArray());
}

function q2_NonChainRandomInit(): void {
    const piaceContainer = PiaceInitializeUtil.nonChainRandom();
    console.log("▼ランダム生成(ただし連鎖は避ける)の結果は以下の通りになりました。");
    dispPiaceContainer(piaceContainer);

    console.log("▼連鎖の部分を抽出します。(出力はされないはず)");
    dispAllXYPoint(piaceContainer.getChainedPiecesArray());
}

function q3_ExcheangePoint_VerticalOrHorizon(): void {
    const piaceContainer = PiaceInitializeUtil.nonChainRandom();
    console.log("▼ランダム生成(ただし連鎖は避ける)の結果は以下の通りになりました。");
    dispPiaceContainer(piaceContainer);
    console.log("\n");

    console.log("▼入れ替えて連鎖する場合の座標を抽出します。");
    dispAllXYPoint(piaceContainer.getChainablePiecesArray());
}

// ------------------------------------------------------
// コンソールログ出力用のfunction
// ------------------------------------------------------
function dispPiaceContainer(piaceContainer: PieceContainer): void {
    let result: string = "";
    piaceContainer.piaceArray.forEach((p, i) => {
        result += p.join(" ") + "\n";
    });
    console.log(result);
}

function dispAllXYPoint(piaceArray: Piece[][]): void {
    piaceArray.forEach((array, i) => {
        let result: string = `座標 ${i + 1}組目：`;
        result += array.map((p) => ` (${p.pointX}, ${p.pointY})`);
        console.log(result);
    });
}