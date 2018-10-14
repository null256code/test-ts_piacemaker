export class Piece {
    
    public static TYPE: number[] = [1, 2, 3, 4, 5, 6];
    public pointX: number = 0;
    public pointY: number = 0;
    public type: number = 0;

    constructor(x: number, y: number, type: number) {
        this.pointX = x;
        this.pointY = y;
        this.type = type;
    }

    public compareOfPoint(p: Piece): number {
        const isLess: boolean = this.pointY === p.pointY ? this.pointX < p.pointX : this.pointY < p.pointY;
        return isLess ? -1 : 1;
    }

    get typeString(): string {
        return this.type.toString();
    }
}