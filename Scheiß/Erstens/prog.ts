let variable:String = "Humbug";

console.log(variable);
console.log("Lol so ein kack");
console.log("start");
communicate("https://jirkadelloro.github.io/EIA2-Inverted/L05_Client/Material/Test.txt");
console.log("end");
async function communicate(_url: RequestInfo): Promise<void> {
    let response: Response = await fetch(_url);
    console.log("Response", response);
    variable = await response.text();
    console.log(variable);
}
