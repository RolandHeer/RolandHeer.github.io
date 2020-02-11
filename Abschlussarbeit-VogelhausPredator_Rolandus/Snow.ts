namespace Abschlussarbeit {
    export class Snow extends Moving {

        private sizeVar: number;
        private speed: number;

        constructor(_position: Vector) {
            super();
            this.position = _position;
            this.sizeVar = (Math.random() / 2) + 0.5;
            this.speed = ((Math.random() / 2) + 0.5) / 10;
            this.velocity = new Vector(0.025 - (Math.random() / 20), this.speed);
        }

        public move(_timeslice: number): void {
            this.position.add(Vector.getScaled(this.velocity, _timeslice));
            if (this.position.y >= 1) {
                this.position.y = 0;
            }
            if (this.position.x <= 0) {
                this.position.x = 1;
            } else {
                if (this.position.x >= 1) {
                    this.position.x = 0;
                }
            }
        }

        public draw(_crc2: CanvasRenderingContext2D): void {
            let width: number = _crc2.canvas.width;
            let height: number = _crc2.canvas.height;
            let snowSize: number = width / 400;

            _crc2.translate(this.position.x * width, this.position.y * height);
            _crc2.scale(this.sizeVar, this.sizeVar);
            _crc2.fillStyle = "RGB(240,240,250)";
            _crc2.beginPath();
            _crc2.arc(0, 0, snowSize, 0, 2 * Math.PI, false);
            _crc2.closePath();
            _crc2.fill();
            _crc2.resetTransform();
            _crc2.fillStyle = "RGB(250,0,250)";
        }


    }
}