var Chronolog;
(function (Chronolog) {
    class Event {
        constructor(_year, _title, _descript, _graphic, _ambient, _crc2, _distMultiplier) {
            this.year = _year;
            this.title = _title;
            this.descript = _descript;
            this.graphic = _graphic;
            this.ambient = _ambient;
            this.crc2 = _crc2;
            this.distMultiplier = _distMultiplier;
        }
        renderEvent() {
            this.crc2.drawImage(this.graphic, (this.year * this.distMultiplier) + this.crc2.canvas.width / 3, 0, (this.crc2.canvas.width / 3) * 2, this.crc2.canvas.height);
        }
        getYear() {
            return this.year;
        }
        getYearString() {
            if (this.year < 0) {
                return (this.year * (-1)) + " v. Chr.";
            }
            else {
                return "" + this.year;
            }
        }
        getTitle() {
            return this.title;
        }
        getDescript() {
            return this.descript;
        }
        getGraphic() {
            return this.graphic;
        }
        getSound() {
            return this.ambient;
        }
    }
    Chronolog.Event = Event;
})(Chronolog || (Chronolog = {}));
//# sourceMappingURL=ChronEvent.js.map