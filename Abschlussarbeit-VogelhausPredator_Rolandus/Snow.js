var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Snow extends Abschlussarbeit.Moving {
        constructor(_position) {
            super();
            this.position = _position;
            this.sizeVar = (Math.random() / 2) + 0.5;
            this.speed = ((Math.random() / 2) + 0.5) / 10;
            this.velocity = new Abschlussarbeit.Vector(0.025 - (Math.random() / 20), this.speed);
        }
        move(_timeslice) {
            this.position.add(Abschlussarbeit.Vector.getScaled(this.velocity, _timeslice));
            if (this.position.y >= 1) {
                this.position.y = 0;
            }
            if (this.position.x <= 0) {
                this.position.x = 1;
            }
            else {
                if (this.position.x >= 1) {
                    this.position.x = 0;
                }
            }
        }
        draw(_crc2) {
            let width = _crc2.canvas.width;
            let height = _crc2.canvas.height;
            let snowSize = width / 400;
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
    Abschlussarbeit.Snow = Snow;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Snow.js.map