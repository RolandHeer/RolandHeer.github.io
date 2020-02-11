var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Snowball extends Abschlussarbeit.Moving {
        constructor(_position) {
            super();
            this.size = 1;
            this.destination = new Abschlussarbeit.Vector(0, 0);
            this.speed = 0.8;
            this.destination = _position;
            this.position = new Abschlussarbeit.Vector(0.5, 1);
            this.setVelocity();
        }
        move(_timeslice) {
            this.position.add(Abschlussarbeit.Vector.getScaled(this.velocity, _timeslice));
            this.size = this.size * 0.92;
        }
        draw(_crc2) {
            let width = _crc2.canvas.width;
            let height = _crc2.canvas.height;
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
        isHitting() {
            if (this.position.y < this.destination.y) {
                return true;
            }
            else {
                return false;
            }
        }
        getPosition() {
            return this.position;
        }
        setVelocity() {
            let tempVelocity = new Abschlussarbeit.Vector(0, 0);
            tempVelocity = Abschlussarbeit.Vector.getuberVector(this.speed, Abschlussarbeit.Vector.getDifference(this.destination, this.position));
            this.velocity = tempVelocity;
        }
    }
    Abschlussarbeit.Snowball = Snowball;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Snowball.js.map