namespace Abschlussarbeit {
    export class Snowball extends Moving {

        private size: number = 1;
        private destination: Vector = new Vector(0, 0);
        private speed: number = 0.8;

        constructor(_position: Vector) {
            super();
            this.destination = _position;
            this.position = new Vector(0.5, 1);
            this.setVelocity();
        }

        public move(_timeslice: number): void {
            this.position.add(Vector.getScaled(this.velocity, _timeslice));
            this.size = this.size * 0.92;

        }
        public draw(_crc2: CanvasRenderingContext2D): void {
            let width: number = _crc2.canvas.width;
            let height: number = _crc2.canvas.height;

            _crc2.translate(this.position.x * width, this.position.y * height);
            _crc2.scale(this.size, this.size);
            _crc2.fillStyle = "RGB(250,250,250)";

            _crc2.beginPath();
            _crc2.arc(0, 0, height * 0.3, 0, 2 * Math.PI, false);
            _crc2.closePath();
            _crc2.fill();

            _crc2.fillStyle = "RGB(250,0,250)";
            _crc2.resetTransform();

        }

        public isHitting(): boolean {
            if (this.position.y < this.destination.y) {
                return true;
            } else {
                return false;
            }
        }

        public getPosition(): Vector {
            return this.position;
        }

        private setVelocity(): void {
            let tempVelocity: Vector = new Vector(0, 0);
            tempVelocity = Vector.getuberVector(this.speed, Vector.getDifference(this.destination, this.position));
            this.velocity = tempVelocity;
        }



    }
}