namespace Script {
    console.log("Das Skript tut doch");

    window.addEventListener("load", setup);

    function setup(_event: Event): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        let crc2: CanvasRenderingContext2D = canvas.getContext("2d");

        crc2.fillStyle = "#FF9999";
        crc2.fillRect(10, 10, crc2.canvas.width, crc2.canvas.height);
        crc2.fillRect(crc2.canvas.width / 2, crc2.canvas.height / 2, crc2.canvas.width / 2, crc2.canvas.height / 2);

        crc2.beginPath();
        crc2.arc(100, 100, 20, 0, 1.5 * Math.PI);
        crc2.closePath();
        crc2.stroke();

        crc2.beginPath();
        crc2.ellipse(100, 100, 10, 5, 0, 0, 2 * Math.PI);
        crc2.stroke();
    }

}