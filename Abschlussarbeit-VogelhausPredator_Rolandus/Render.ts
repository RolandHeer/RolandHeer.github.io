namespace Abschlussarbeit {
    export class Render {
        public static background(_crc2: CanvasRenderingContext2D): void {
            let gradient: CanvasGradient = _crc2.createLinearGradient(0, 0, 0, _crc2.canvas.height);
            gradient.addColorStop(0.0, "RGB(0,20,50)");
            gradient.addColorStop(0.2, "RGB(0,115,209)");
            gradient.addColorStop(0.4, "RGB(255, 106, 0)");
            _crc2.fillStyle = gradient;
            _crc2.fillRect(0, 0, _crc2.canvas.width, _crc2.canvas.height);
            _crc2.fillStyle = "RGB(250,0,250)";
        }
        public static hills(_crc2: CanvasRenderingContext2D): void {
            let width: number = _crc2.canvas.width;
            let height: number = _crc2.canvas.height;
            Render.hill(_crc2, 0, height / 2.6, width / 3.5, height / 4, "RGB(70,70,70)", "RGB(240,240,250)");
            Render.hill(_crc2, width / 4, height / 2.5, width / 3, height / 3.5, "RGB(70,70,70)", "RGB(240,240,250)");
            Render.hill(_crc2, width / 2, height / 2.4, width / 3, height / 3.3, "RGB(70,70,70)", "RGB(240,240,250)");
            Render.hill(_crc2, width / 1.5, height / 2.7, width / 3, height / 3.5, "RGB(90,90,90)", "RGB(240,240,250)");
            _crc2.transform(1, 0, 0, 1, width / 2, 0);
            Render.hill(_crc2, width / 4, height / 2.5, width / 3, height / 3.5, "RGB(70,70,70)", "RGB(240,240,250)");
            _crc2.transform(1, 0, 0, 1, width / 2.5, 0);
            Render.hill(_crc2, width / 2, height / 2.4, width / 3, height / 3.5, "RGB(70,70,70)", "RGB(240,240,250)");

            Render.hill(_crc2, width / 7, height / 2.3, width / 2.7, height / 3.4, "RGB(50,50,50)", "RGB(240,240,250)");
            Render.hill(_crc2, width / 3, height / 2.3, width / 2.7, height / 2.8, "RGB(50,50,50)", "RGB(240,240,250)");
            Render.hill(_crc2, width / 1.7, height / 2.3, width / 2.7, height / 3.2, "RGB(50,50,50)", "RGB(240,240,250)");
            _crc2.transform(1, 0, 0, 1, (width / 3) * 2, 0);
            Render.hill(_crc2, width / 7, height / 2.3, width / 2.7, height / 3.4, "RGB(50,50,50)", "RGB(240,240,250)");
            _crc2.transform(1, 0, 0, 1, width / 1.5, 0);
            Render.hill(_crc2, width / 3, height / 2.3, width / 2.7, height / 2.8, "RGB(50,50,50)", "RGB(240,240,250)");
        }

        public static hill(_crc2: CanvasRenderingContext2D, _x: number, _y: number, _sizeX: number, _sizeY: number, _color: string, _snowColor: string): void {
            _crc2.transform(1, 0, 0, 1, _x, _y - _sizeY);
            let gradient: CanvasGradient = _crc2.createLinearGradient(0, 0, 0, _sizeY);
            gradient.addColorStop(0.25, _snowColor);
            gradient.addColorStop(0.35, _color);
            _crc2.fillStyle = gradient;
            _crc2.beginPath();
            _crc2.moveTo(0, 0);
            _crc2.lineTo(_sizeX / 2, _sizeY);
            _crc2.lineTo(-_sizeX / 2, _sizeY);
            _crc2.closePath();
            _crc2.fill();
            _crc2.resetTransform();
            _crc2.fillStyle = "RGB(250,0,250)";
        }

        public static ground(_crc2: CanvasRenderingContext2D): void {
            let width: number = _crc2.canvas.width;
            let height: number = _crc2.canvas.height;
            let gradient: CanvasGradient = _crc2.createLinearGradient(0, height / 2.7, 0, height);
            gradient.addColorStop(0, "RGB(200,200,240)");
            gradient.addColorStop(1, "RGB(230,230,250)");
            _crc2.fillStyle = gradient;
            _crc2.fillRect(0, height / 2.7, width, height - (height / 2.7));
        }
        public static trees(_crc2: CanvasRenderingContext2D, _treeArray: Tree[]): void {
            for (let tree of _treeArray) {
                tree.draw(_crc2);
            }
        }
        public static birdsHouse(_crc2: CanvasRenderingContext2D): void {
            let width: number = _crc2.canvas.width;
            let height: number = _crc2.canvas.height;
            let houseWidth: number = width / 20;
            let totalHeight: number = height / 3.2;
            let houseHeight: number = totalHeight / 3;

            _crc2.transform(1, 0, 0, 1, width * 0.62, height * 0.85);

            _crc2.fillStyle = "RGB(170,120,100)";
            _crc2.transform(1, 0, 0.1, 1, houseWidth / 3, 0);
            _crc2.fillRect(-houseWidth / 2, -totalHeight, houseWidth / 6, houseHeight);

            _crc2.transform(1, 0, -0.2, 1, -(houseWidth / 1.5), 0);
            _crc2.fillRect(houseWidth / 2, -totalHeight, -(houseWidth / 6), houseHeight);

            _crc2.fillStyle = "RGB(60,60,60)";
            _crc2.transform(1, 0, 0.1, 1, houseWidth / 3, 0);
            _crc2.fillRect(-houseWidth / 2, -totalHeight, houseWidth, houseHeight / 5);

            _crc2.fillStyle = "RGB(150,100,80)";
            _crc2.fillRect(-houseWidth / 2.5, -totalHeight + houseHeight, houseWidth / 1.25, -(houseHeight / 5));

            _crc2.fillStyle = "RGB(130,80,60)";
            _crc2.fillRect(-houseWidth / 8, -totalHeight + houseHeight, houseWidth / 4, totalHeight - houseHeight);

            _crc2.beginPath();
            _crc2.arc(0, -totalHeight + houseHeight - (houseHeight / 10), houseHeight / 12, 0, 2 * Math.PI, false);
            _crc2.closePath();
            _crc2.fill();

            _crc2.fillStyle = "RGB(250,0,250)";
            _crc2.resetTransform();
        }
        public static snowman(_crc2: CanvasRenderingContext2D): void {
            let width: number = _crc2.canvas.width;
            let height: number = _crc2.canvas.height;
            _crc2.transform(1, 0, 0, 1, width / 5, height * 0.9);
            _crc2.fillStyle = "RGB(230,230,230)";
            _crc2.beginPath();
            _crc2.arc(0, 0, height / 10, 0, 2 * Math.PI, false);
            _crc2.closePath();
            _crc2.fill();

            _crc2.fillStyle = "RGB(240,240,240)";
            _crc2.beginPath();
            _crc2.arc(0, -height / 8.5, height / 14, 0, 2 * Math.PI, false);
            _crc2.closePath();
            _crc2.fill();

            _crc2.fillStyle = "RGB(250,250,250)";
            _crc2.beginPath();
            _crc2.arc(0, -height / 5, height / 20, 0, 2 * Math.PI, false);
            _crc2.closePath();
            _crc2.fill();

            _crc2.fillStyle = "RGB(50,50,50)";
            _crc2.fillRect(-width / 60, -height / 4.2, width / 30, -height / 20);
            _crc2.fillRect(-width / 50, -height / 4.2, width / 25, -height / 80);

            _crc2.beginPath();
            _crc2.arc(-width / 100, -height / 4.8, height / 120, 0, 2 * Math.PI, false);
            _crc2.closePath();
            _crc2.fill();

            _crc2.beginPath();
            _crc2.arc(width / 100, -height / 4.8, height / 120, 0, 2 * Math.PI, false);
            _crc2.closePath();
            _crc2.fill();

            _crc2.fillStyle = "RGB(250,180,0)";
            _crc2.beginPath();
            _crc2.moveTo(-width / 200, -height / 5);
            _crc2.lineTo(width / 200, -height / 5);
            _crc2.lineTo(0, -height / 6);
            _crc2.closePath();
            _crc2.fill();

            _crc2.resetTransform();
        }
        public static birds(_crc2: CanvasRenderingContext2D, _birdArray: Bird[]): void {
            for (let bird of _birdArray) {
                bird.draw(_crc2);
            }
        }
        public static snow(_crc2: CanvasRenderingContext2D, _snowArray: Snow[]): void {
            for (let snow of _snowArray) {
                snow.draw(_crc2);
            }
        }
        public static seeds(_crc2: CanvasRenderingContext2D, _feedingArray: Seed[][]): void {
            for (let i: number = _feedingArray.length; i > 0; i--) {
                for (let seed of _feedingArray[i - 1]) {
                    seed.draw(_crc2);
                }
            }
        }
        public static snowball(_crc2: CanvasRenderingContext2D, _snowballs: Snowball[]): void {
            for (let ball of _snowballs) {
                ball.draw(_crc2);
            }
        }
    }
}