import { Piece } from "../class/Piece";

export module PieceChainUtil {

    const CHAIN_NUM: number = 3;

    function getChainedType(line: Piece[]): number[] {

        const chainedType: number[] = Piece.TYPE.filter((type) => {
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
        return chainedType;
    }

    export function isChainLine(line: Piece[]): boolean {
        return getChainedType(line).length > 0;
    }

    export function getChainedPiecesOfLine(line: Piece[]): Piece[] {
        return line.filter((p) => {
            return getChainedType(line).some((t) => t === p.type);
        });
    }
}