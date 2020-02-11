var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Tree extends Abschlussarbeit.Thingo {
        constructor(_position) {
            super();
            this.position = _position;
            this.size = ((Math.floor(Math.random() * 100)) / 200) + 0.75;
            this.colorValue = (Math.random() / 2) + 0.5;
        }
        draw(_crc2) {
            let width = _crc2.canvas.width;
            let height = _crc2.canvas.height;
            let treeWidth = width / 15;
            let treeHeight = height / 2.5;
            let trunkHeight = treeHeight * 0.2;
            let crownHeight = treeHeight - trunkHeight;
            let tempColor;
            _crc2.transform(this.size, 0, 0, this.size, width * this.position.x, height * this.position.y);
            _crc2.fillStyle = "RGB(100,40,20)";
            _crc2.beginPath();
            _crc2.moveTo(0, -treeHeight);
            _crc2.lineTo(treeWidth / 7, 0);
            _crc2.lineTo(-treeWidth / 7, 0);
            _crc2.closePath();
            _crc2.fill();
            tempColor = "RGB(30," + 80 * this.colorValue + ",30";
            _crc2.fillStyle = tempColor;
            _crc2.beginPath();
            _crc2.moveTo(0, (-crownHeight / 2) - trunkHeight);
            _crc2.lineTo(treeWidth, -trunkHeight);
            _crc2.lineTo(-treeWidth, -trunkHeight);
            _crc2.closePath();
            _crc2.fill();
            tempColor = "RGB(30," + 100 * this.colorValue + ",30";
            _crc2.fillStyle = tempColor;
            _crc2.beginPath();
            _crc2.moveTo(0, -treeHeight + (crownHeight / 4));
            _crc2.lineTo(treeWidth * 0.8, (-crownHeight / 4) - trunkHeight * 1.3);
            _crc2.lineTo(-treeWidth * 0.8, (-crownHeight / 4) - trunkHeight * 1.3);
            _crc2.closePath();
            _crc2.fill();
            tempColor = "RGB(30," + 120 * this.colorValue + ",30";
            _crc2.fillStyle = tempColor;
            _crc2.beginPath();
            _crc2.moveTo(0, -treeHeight);
            _crc2.lineTo(treeWidth * 0.6, (-crownHeight / 2.2) - trunkHeight * 1.6);
            _crc2.lineTo(-treeWidth * 0.6, (-crownHeight / 2.2) - trunkHeight * 1.6);
            _crc2.closePath();
            _crc2.fill();
            _crc2.resetTransform();
            _crc2.fillStyle = "RGB(250,0,250)";
        }
    }
    Abschlussarbeit.Tree = Tree;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Tree.js.map