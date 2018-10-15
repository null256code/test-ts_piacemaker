import { PiaceInitializeUtil } from "./module/PieceInitializeUtil";

const message: string = "テストです。";

q1_randomInit_dispChainPieces();

console.log("\n---------------------------\n");

q2_nonChainRandomInit();


function q1_randomInit_dispChainPieces(): void {
    let pc = PiaceInitializeUtil.random();
    console.log("▼ランダム生成の結果は以下の通りになりました。");
    pc.dispContainer();

    console.log("▼3連続の部分を抽出します。");
    pc.dispChainedPiecesArray();
}

function q2_nonChainRandomInit(): void {
    let pc = PiaceInitializeUtil.nonChainRandom();
    console.log("▼ランダム生成(ただし連鎖は避ける)の結果は以下の通りになりました。");
    pc.dispContainer();

    console.log("▼3連続の部分を抽出します。(出力はされないはず)");
    pc.dispChainedPiecesArray();
}