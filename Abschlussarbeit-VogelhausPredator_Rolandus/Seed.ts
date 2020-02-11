namespace Abschlussarbeit {
    export class Seed extends Moving {

        private movable: boolean = true;
        private reported: boolean = false;
        private feastedOn: boolean = false;
        private main: boolean = false;
        private countdown: number;
        //        private dying: boolean = false;
        private spliced: boolean = false;

        constructor(_position: Vector, _isMain: boolean) {
            super();
            this.position = _position;
            this.velocity = new Vector(0, 0.5);
            this.main = _isMain;
        }

        public move(_timeslice: number): void {
            this.position.add(Vector.getScaled(this.velocity, _timeslice));
        }
        public draw(_crc2: CanvasRenderingContext2D): void {
            let width: number = _crc2.canvas.width;
            let height: number = _crc2.canvas.height;
            _crc2.translate(this.position.x * width, this.position.y * height);

            _crc2.fillStyle = "RGB(200,180,100)";

            _crc2.beginPath();
            _crc2.ellipse(0, 0, width / 400, height / 400, 0, 0, 2 * Math.PI, false);
            _crc2.closePath();
            _crc2.fill();
            _crc2.fillStyle = "RGB(250,0,250)";
            _crc2.resetTransform();
        }

        public makeUnmovable(): void {
            this.movable = false;
        }

        public isMovable(): boolean {
            return this.movable;
        }

        public getPosition(): Vector {
            return this.position;
        }

        public setReported(): void {
            this.reported = true;
        }

        public isReported(): boolean {
            return this.reported;
        }

        public isMain(): boolean {
            return this.main;
        }

        public setFeastedOn(): void {
            this.feastedOn = true;
            if (this.main) {
                this.countdown = 150;
            } else {
                this.countdown = Math.floor(Math.random() * 145);
            }
        }
        public isFeastedOn(): boolean {
            return this.feastedOn;
        }

        public update(): boolean {
            this.countdown--;
            if (this.countdown < 2 && this.countdown > 0 && this.main) {
                    this.spliced = true;
            }
            if (this.countdown < 0) {
                this.spliced = false;
                return true;
            } else {
                return false;
            }
        }

        public isSpliced(): boolean {
            if (this.main) {
                return this.spliced;
            } else {
                return false;
            }
        }
    }
}