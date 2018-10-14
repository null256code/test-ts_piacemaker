import { Piece } from "../class/Piece";

export module PieceChainUtil {

    const CHAIN_NUM: number = 3;

    export function getChainedPieces(line: Piece[]): Piece[] {

        const targetType: number[] = Piece.TYPE.filter((type) => {
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