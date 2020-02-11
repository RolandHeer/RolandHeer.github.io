var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Seed extends Abschlussarbeit.Moving {
        constructor(_position, _isMain) {
            super();
            this.movable = true;
            this.reported = false;
            this.feastedOn = false;
            this.main = false;
            //        private dying: boolean = false;
            this.spliced = false;
            this.position = _position;
            this.velocity = new Abschlussarbeit.Vector(0, 0.5);
            this.main = _isMain;
        }
        move(_timeslice) {
            this.position.add(Abschlussarbeit.Vector.getScaled(this.velocity, _timeslice));
        }
        draw(_crc2) {
            let width = _crc2.canvas.width;
            let height = _crc2.canvas.height;
            _crc2.translate(this.position.x * width, this.position.y * height);
            _crc2.fillStyle = "RGB(200,180,100)";
            _crc2.beginPath();
            _crc2.ellipse(0, 0, width / 400, height / 400, 0, 0, 2 * Math.PI, false);
            _crc2.closePath();
            _crc2.fill();
            _crc2.fillStyle = "RGB(250,0,250)";
            _crc2.resetTransform();
        }
        makeUnmovable() {
            this.movable = false;
        }
        isMovable() {
            return this.movable;
        }
        getPosition() {
            return this.position;
        }
        setReported() {
            this.reported = true;
        }
        isReported() {
            return this.reported;
        }
        isMain() {
            return this.main;
        }
        setFeastedOn() {
            this.feastedOn = true;
            if (this.main) {
                this.countdown = 150;
            }
            else {
                this.countdown = Math.floor(Math.random() * 145);
            }
        }
        isFeastedOn() {
            return this.feastedOn;
        }
        update() {
            this.countdown--;
            if (this.countdown < 2 && this.countdown > 0 && this.main) {
                this.spliced = true;
            }
            if (this.countdown < 0) {
                this.spliced = false;
                return true;
            }
            else {
                return false;
            }
        }
        isSpliced() {
            if (this.main) {
                return this.spliced;
            }
            else {
                return false;
            }
        }
    }
    Abschlussarbeit.Seed = Seed;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Seed.js.map