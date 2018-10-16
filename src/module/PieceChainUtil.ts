import { Piece } from "../class/Piece";

export module PieceChainUtil {

    const CHAIN_NUM: number = 3; //修正するときは PiaceInitializeUtil#nonChainRandom() も修正すること。

    /** 引数の配列から連鎖しているピースを探し返す。
     *  引数のPiece[]はチェックしたい１行のみを受け取ることを想定している。 */
    export function getChainedPiecesArray(line: Piece[]): Piece[][] {

        const result: Piece[][] = [];
        Piece.TYPE.forEach((type) => {
            let chainCount = 0;
            let maxChainCount = 0;
            let lastChainedPieceIndex: number = 0;
            line.forEach((p, i) => {
                // TODO: この方法だとline.lengthが7以上のときに２つ塊があるときに正しくチェックできない時がある。
                chainCount = p.type === type ? chainCount + 1 : 0;
                if (maxChainCount < chainCount) {
                    maxChainCount = chainCount;
                    lastChainedPieceIndex = i;
                }
            });
            if (maxChainCount >= CHAIN_NUM) { 
                result.push(line.slice(lastChainedPieceIndex-maxChainCount+1, lastChainedPieceIndex+1));
            }
        });
        return result;
    }

    export function isChainLine(line: Piece[]): boolean {
        return getChainedPiecesArray(line).length > 0;
    }
}