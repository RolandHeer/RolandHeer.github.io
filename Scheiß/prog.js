var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let variable = "Humbug";
console.log(variable);
console.log("Lol so ein kack");
console.log("start");
communicate("https://jirkadelloro.github.io/EIA2-Inverted/L05_Client/Material/Test.txt");
console.log("end");
function communicate(_url) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(_url);
        console.log("Response", response);
        variable = yield response.text();
        console.log(variable);
    });
}
//# sourceMappingURL=prog.js.map