namespace Abschlussarbeit {
    export abstract class Thingo {
        protected position: Vector;
        public abstract draw(_crc2: CanvasRenderingContext2D): void;
    }
}