namespace Chronolog {
    export class Event {
        private crc2: CanvasRenderingContext2D;
        private distMultiplier: number;
        private year: number;
        private title: string;
        private descript: string;
        private graphic: HTMLImageElement;
        private ambient: HTMLAudioElement;

        constructor(_year: number, _title: string, _descript: string, _graphic: HTMLImageElement, _ambient: HTMLAudioElement,_crc2: CanvasRenderingContext2D, _distMultiplier: number) {
            this.year = _year;
            this.title = _title;
            this.descript = _descript;
            this.graphic = _graphic;
            this.ambient = _ambient;
            this.crc2 = _crc2;
            this.distMultiplier = _distMultiplier;
        }

        public renderEvent(): void{
            this.crc2.drawImage(this.graphic, (this.year*this.distMultiplier) + this.crc2.canvas.width/3, 0, (this.crc2.canvas.width/3)*2, this.crc2.canvas.height);
        }

        public getYear(): number {
            return this.year;
        }
        public getYearString(): string{
            if(this.year < 0){
                return (this.year*(-1)) + " v. Chr.";
            }else{
                return ""+this.year;
            }
        }
        public getTitle(): string {
            return this.title;
        }
        public getDescript(): string {
            return this.descript;
        }
        public getGraphic(): HTMLImageElement {
            return this.graphic;
        }
        public getSound(): HTMLAudioElement {
            return this.ambient;
        }
    }
}