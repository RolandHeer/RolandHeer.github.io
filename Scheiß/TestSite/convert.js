var Convert;
(function (Convert) {
    //let needsConversion: string = process.argv[3];
    //console.log("needsConversion: " + needsConversion);
    let toConvert = process.argv[2];
    let initSystem = parseInt(process.argv[3], 10);
    let targetSystem = parseInt(process.argv[4], 10);
    console.log("to convert: " + toConvert + ", init System: " + initSystem + ", target System: " + targetSystem);
    let toConvertNum = parseInt(toConvert, initSystem);
    console.log("In Dezimal: " + toConvertNum);
    console.log("In Binär: " + toConvertNum.toString(targetSystem));
})(Convert || (Convert = {}));
//# sourceMappingURL=convert.js.map