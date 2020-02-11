namespace Abschlussarbeit {
    export class Bird extends Moving {

        private color: string;
        private size: number;
        private speed: number;
        private wait: number;
        private nextWaitingTime: number = Math.random() * 100;
        //private depth: number;
        private sitting: boolean = true;
        private defaultdest: Vector = new Vector(1, 1);
        private destination: Vector = this.defaultdest;
        private lastDest: Vector;
        //private isHit: boolean;
        private housePos: Vector = new Vector(0.6 + ((Math.random() * 42) / 1000), 0.538);
        private housePos2: Vector = new Vector(0.62, 0.625);
        private snowmanPos: Vector = new Vector(0.185 + ((Math.random() * 30) / 1000), 0.611);

        private availableFood: Seed[] = [];
        private chosenSeed: Seed;
        //private splicedSeed: Seed;
        private feasting: boolean = false;

        private willBeHit: boolean = false;

        constructor(_position: Vector) {
            super();
            this.position = _position;
            this.lastDest = this.destination;
            this.speed = 0.28;
            this.color = "RGB(" + (Math.random() * 150 + 100) + "," + (Math.random() * 150 + 100) + "," + (Math.random() * 150 + 100) + ")";
            this.size = (Math.random() / 2) + 0.5;
            this.setNextDest();
        }

        public move(_timeslice: number): void {
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
                    let tempSeed: Seed;
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
            if ((Vector.getLength(Vector.getDifference(this.destination, this.position))) < this.speed * _timeslice && this.position != this.destination) {
                this.sitting = true;
                this.position = this.destination;
            }
            if (this.position == this.destination) {

                this.sitting = true;
                if (this.chosenSeed) {
                    if (this.availableFood.length != 0 && !this.chosenSeed.isFeastedOn()) {
                        this.chosenSeed.setFeastedOn();
                        this.feasting = true;
                    } else {
                        this.feasting = true;
                    }

                } else {
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
                this.position.add(Vector.getScaled(this.velocity, _timeslice));
                this.setVelocity();
                this.wait = 0;
            }

        }

        public setAvailable(_newSeed: Seed): void {
            this.availableFood.push(_newSeed);
        }

        public resetAvailable(): void {
            this.availableFood = [];
        }

        public draw(_crc2: CanvasRenderingContext2D): void {

            let width: number = _crc2.canvas.width;
            let height: number = _crc2.canvas.height;

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
            } else {
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
            } else {
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

        public getPosition(): Vector {
            return this.position;
        }

        public inform(): void {
            this.willBeHit = true;
            console.log("ich würde getroffen werden");
        }

        private setNextDest(): void {
            let tempDestination: Vector = this.defaultdest;
            if ((this.availableFood.length != 0)) {
                if (this.feasting) {
                    let tempNearest: Seed = new Seed(new Vector(100, 100), false);
                    for (let seed of this.availableFood) {
                        if (Vector.getLength(Vector.getDifference(seed.getPosition(), this.position)) < Vector.getLength(Vector.getDifference(tempNearest.getPosition(), this.position))) {
                            tempNearest = new Seed(new Vector(seed.getPosition().x, seed.getPosition().y), false);
                            this.chosenSeed = seed;
                        }
                    }

                    if (Vector.getDifference(tempNearest.getPosition(), this.position).x < 0) {
                        tempDestination = tempNearest.getPosition();
                        tempDestination.x = tempDestination.x + ((Math.random() / 2) / 10);
                    } else {
                        tempDestination = tempNearest.getPosition();
                        tempDestination.x = tempDestination.x - ((Math.random() / 2) / 10);
                    }
                    this.destination = tempDestination;
                    return;
                }

            }
            if (Math.random() > 0.5) {
                if (this.availableFood.length != 0) {
                    let tempNearest: Seed = new Seed(new Vector(100, 100), false);
                    for (let seed of this.availableFood) {
                        if (Vector.getLength(Vector.getDifference(seed.getPosition(), this.position)) < Vector.getLength(Vector.getDifference(tempNearest.getPosition(), this.position))) {
                            tempNearest = new Seed(new Vector(seed.getPosition().x, seed.getPosition().y), false);
                            this.chosenSeed = seed;
                        }
                    }

                    if (Vector.getDifference(tempNearest.getPosition(), this.position).x < 0) {
                        tempDestination = tempNearest.getPosition();
                        tempDestination.x = tempDestination.x + ((Math.random() / 2) / 10);
                    } else {
                        tempDestination = tempNearest.getPosition();
                        tempDestination.x = tempDestination.x - ((Math.random() / 2) / 10);
                    }
                }
            } else {

                let tempRnd: number = Math.random();
                if (tempRnd > 0.7) {
                    tempDestination = this.snowmanPos;
                } else {
                    if (tempRnd > 0.35) {
                        tempDestination = this.housePos;
                    } else {
                        if (tempRnd > 0.28) {
                            tempDestination = this.housePos2;
                        } else {
                            if (Math.random() >= 0.5) {
                                tempDestination = new Vector(-1, Math.random());
                            } else {
                                tempDestination = new Vector(2, Math.random());
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

        private setVelocity(): void {
            let tempVelocity: Vector = new Vector(0, 0);
            tempVelocity = Vector.getuberVector(this.speed, Vector.getDifference(this.destination, this.position));
            this.velocity = tempVelocity;
        }

        private komischeSacheDieIchAnscheinendTunMuss(): void {
            this.housePos = new Vector(0.6 + ((Math.random() * 42) / 1000), 0.538);
            this.housePos2 = new Vector(0.62, 0.625);
            this.snowmanPos = new Vector(0.185 + ((Math.random() * 30) / 1000), 0.611);
        }
    }
}