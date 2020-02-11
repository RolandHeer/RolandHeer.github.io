var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Bird extends Abschlussarbeit.Moving {
        constructor(_position) {
            super();
            this.nextWaitingTime = Math.random() * 100;
            //private depth: number;
            this.sitting = true;
            this.defaultdest = new Abschlussarbeit.Vector(1, 1);
            this.destination = this.defaultdest;
            //private isHit: boolean;
            this.housePos = new Abschlussarbeit.Vector(0.6 + ((Math.random() * 42) / 1000), 0.538);
            this.housePos2 = new Abschlussarbeit.Vector(0.62, 0.625);
            this.snowmanPos = new Abschlussarbeit.Vector(0.185 + ((Math.random() * 30) / 1000), 0.611);
            this.availableFood = [];
            //private splicedSeed: Seed;
            this.feasting = false;
            this.willBeHit = false;
            this.position = _position;
            this.lastDest = this.destination;
            this.speed = 0.28;
            this.color = "RGB(" + (Math.random() * 150 + 100) + "," + (Math.random() * 150 + 100) + "," + (Math.random() * 150 + 100) + ")";
            this.size = (Math.random() / 2) + 0.5;
            this.setNextDest();
        }
        move(_timeslice) {
            if (!this.feasting && this.willBeHit) {
                if (Math.random() > 0.3) {
                    this.sitting = false;
                    this.wait = 500;
                    this.setNextDest();
                    this.willBeHit = false;
                }
            }
            if (this.availableFood.length == 0 && this.feasting) {
                if (this.chosenSeed.isSpliced()) {
                    this.feasting = false;
                    this.sitting = false;
                    this.wait = 500;
                    let tempSeed;
                    this.chosenSeed = tempSeed;
                }
            }
            if (this.position.x > 1) {
                this.position.x = 0;
                this.setNextDest();
            }
            if (this.position.x < 0) {
                this.position.x = 1;
                this.setNextDest();
            }
            if (this.sitting && this.wait >= this.nextWaitingTime) {
                this.sitting = false;
                this.setNextDest();
                this.wait = 0;
                this.nextWaitingTime = Math.random() * 100;
            }
            if ((Abschlussarbeit.Vector.getLength(Abschlussarbeit.Vector.getDifference(this.destination, this.position))) < this.speed * _timeslice && this.position != this.destination) {
                this.sitting = true;
                this.position = this.destination;
            }
            if (this.position == this.destination) {
                this.sitting = true;
                if (this.chosenSeed) {
                    if (this.availableFood.length != 0 && !this.chosenSeed.isFeastedOn()) {
                        this.chosenSeed.setFeastedOn();
                        this.feasting = true;
                    }
                    else {
                        this.feasting = true;
                    }
                }
                else {
                    this.wait++;
                }
                if (this.feasting) {
                    this.wait += 3;
                }
                return;
            }
            if (this.destination == this.lastDest || this.destination == this.defaultdest) {
                this.setNextDest();
            }
            if ((this.destination != this.lastDest) || this.destination != this.defaultdest) {
                this.sitting = false;
                this.position.add(Abschlussarbeit.Vector.getScaled(this.velocity, _timeslice));
                this.setVelocity();
                this.wait = 0;
            }
        }
        setAvailable(_newSeed) {
            this.availableFood.push(_newSeed);
        }
        resetAvailable() {
            this.availableFood = [];
        }
        draw(_crc2) {
            let width = _crc2.canvas.width;
            let height = _crc2.canvas.height;
            _crc2.transform(this.size, 0, 0, this.size, width * this.position.x, height * this.position.y);
            if (this.velocity.x > 0) {
                _crc2.scale(-1, 1);
            }
            _crc2.translate(width / 400, -2 * (height / 40));
            if (this.sitting) {
                _crc2.beginPath();
                _crc2.moveTo(0, height / 40);
                _crc2.lineTo(width / 400, 1.5 * (height / 40));
                _crc2.lineTo(-width / 400, 2 * (height / 40));
                _crc2.lineTo(-width / 130, 2 * (height / 40));
                _crc2.lineTo(width / 400, 2 * (height / 40));
                _crc2.stroke();
                _crc2.lineWidth = 2;
            }
            else {
                _crc2.beginPath();
                _crc2.moveTo(0, height / 40);
                _crc2.lineTo(width / 60, 1.2 * (height / 40));
                _crc2.lineTo(width / 50, 1.5 * (height / 40));
                _crc2.lineTo(width / 60, 1.2 * (height / 40));
                _crc2.lineTo(width / 50, 1.2 * (height / 40));
                _crc2.stroke();
                _crc2.lineWidth = 2;
            }
            _crc2.fillStyle = "RGB(250,100,50)";
            _crc2.beginPath();
            _crc2.moveTo(width / 70, 0);
            _crc2.lineTo(width / 30, -height / 40);
            _crc2.lineTo(width / 28, height / 60);
            _crc2.closePath();
            _crc2.fill();
            _crc2.fillStyle = this.color;
            _crc2.beginPath();
            _crc2.ellipse(0, 0, width / 50, height / 40, 0.1, 0, 2 * Math.PI, false);
            _crc2.closePath();
            _crc2.fill();
            _crc2.beginPath();
            _crc2.ellipse(-width / 50, -height / 80, width / 90, height / 55, 0, 0, 2 * Math.PI, false);
            _crc2.closePath();
            _crc2.fill();
            _crc2.fillStyle = "RGB(0,0,0)";
            _crc2.beginPath();
            _crc2.moveTo(-width / 50 - width / 90, -height / 80 - height / 160);
            _crc2.lineTo(-width / 50 - width / 90, -height / 80 + height / 160);
            _crc2.lineTo(-width / 50 - width / 60, -height / 80);
            _crc2.closePath();
            _crc2.fill();
            _crc2.beginPath();
            _crc2.arc(-width / 40, -height / 50, height / 200, 0, 2 * Math.PI, false);
            _crc2.closePath();
            _crc2.fill();
            if (this.sitting) {
                _crc2.fillStyle = "RGB(250,100,50)";
                _crc2.beginPath();
                _crc2.moveTo(width / 60, height / 30);
                _crc2.lineTo(-width / 100, -height / 150);
                _crc2.lineTo(width / 100, -height / 150);
                _crc2.closePath();
                _crc2.fill();
            }
            else {
                _crc2.fillStyle = "RGB(250,100,50)";
                _crc2.beginPath();
                _crc2.moveTo(width / 90, -height / 20);
                _crc2.lineTo(-width / 100, -height / 150);
                _crc2.lineTo(width / 100, -height / 150);
                _crc2.closePath();
                _crc2.fill();
            }
            _crc2.fillStyle = "RGB(250,0,250)";
            _crc2.resetTransform();
        }
        getPosition() {
            return this.position;
        }
        inform() {
            this.willBeHit = true;
            console.log("ich würde getroffen werden");
        }
        setNextDest() {
            let tempDestination = this.defaultdest;
            if ((this.availableFood.length != 0)) {
                if (this.feasting) {
                    let tempNearest = new Abschlussarbeit.Seed(new Abschlussarbeit.Vector(100, 100), false);
                    for (let seed of this.availableFood) {
                        if (Abschlussarbeit.Vector.getLength(Abschlussarbeit.Vector.getDifference(seed.getPosition(), this.position)) < Abschlussarbeit.Vector.getLength(Abschlussarbeit.Vector.getDifference(tempNearest.getPosition(), this.position))) {
                            tempNearest = new Abschlussarbeit.Seed(new Abschlussarbeit.Vector(seed.getPosition().x, seed.getPosition().y), false);
                            this.chosenSeed = seed;
                        }
                    }
                    if (Abschlussarbeit.Vector.getDifference(tempNearest.getPosition(), this.position).x < 0) {
                        tempDestination = tempNearest.getPosition();
                        tempDestination.x = tempDestination.x + ((Math.random() / 2) / 10);
                    }
                    else {
                        tempDestination = tempNearest.getPosition();
                        tempDestination.x = tempDestination.x - ((Math.random() / 2) / 10);
                    }
                    this.destination = tempDestination;
                    return;
                }
            }
            if (Math.random() > 0.5) {
                if (this.availableFood.length != 0) {
                    let tempNearest = new Abschlussarbeit.Seed(new Abschlussarbeit.Vector(100, 100), false);
                    for (let seed of this.availableFood) {
                        if (Abschlussarbeit.Vector.getLength(Abschlussarbeit.Vector.getDifference(seed.getPosition(), this.position)) < Abschlussarbeit.Vector.getLength(Abschlussarbeit.Vector.getDifference(tempNearest.getPosition(), this.position))) {
                            tempNearest = new Abschlussarbeit.Seed(new Abschlussarbeit.Vector(seed.getPosition().x, seed.getPosition().y), false);
                            this.chosenSeed = seed;
                        }
                    }
                    if (Abschlussarbeit.Vector.getDifference(tempNearest.getPosition(), this.position).x < 0) {
                        tempDestination = tempNearest.getPosition();
                        tempDestination.x = tempDestination.x + ((Math.random() / 2) / 10);
                    }
                    else {
                        tempDestination = tempNearest.getPosition();
                        tempDestination.x = tempDestination.x - ((Math.random() / 2) / 10);
                    }
                }
            }
            else {
                let tempRnd = Math.random();
                if (tempRnd > 0.7) {
                    tempDestination = this.snowmanPos;
                }
                else {
                    if (tempRnd > 0.35) {
                        tempDestination = this.housePos;
                    }
                    else {
                        if (tempRnd > 0.28) {
                            tempDestination = this.housePos2;
                        }
                        else {
                            if (Math.random() >= 0.5) {
                                tempDestination = new Abschlussarbeit.Vector(-1, Math.random());
                            }
                            else {
                                tempDestination = new Abschlussarbeit.Vector(2, Math.random());
                            }
                        }
                    }
                }
            }
            this.lastDest = this.destination;
            this.destination = tempDestination;
            this.setVelocity();
            this.komischeSacheDieIchAnscheinendTunMuss();
        }
        setVelocity() {
            let tempVelocity = new Abschlussarbeit.Vector(0, 0);
            tempVelocity = Abschlussarbeit.Vector.getuberVector(this.speed, Abschlussarbeit.Vector.getDifference(this.destination, this.position));
            this.velocity = tempVelocity;
        }
        komischeSacheDieIchAnscheinendTunMuss() {
            this.housePos = new Abschlussarbeit.Vector(0.6 + ((Math.random() * 42) / 1000), 0.538);
            this.housePos2 = new Abschlussarbeit.Vector(0.62, 0.625);
            this.snowmanPos = new Abschlussarbeit.Vector(0.185 + ((Math.random() * 30) / 1000), 0.611);
        }
    }
    Abschlussarbeit.Bird = Bird;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Bird.js.map