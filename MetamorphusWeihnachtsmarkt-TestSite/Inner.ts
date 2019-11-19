namespace code{

    let parentDocument : HTMLDocument;

    window.addEventListener("load",handleLoad);


    function handleLoad(){
        console.log("hat geladen");
        document.getElementById("eins").addEventListener("click",handlePlus);
        //document.getElementById("zwei").addEventListener("click",handle);
        //document.getElementById("drei").addEventListener("click",handleEins);
        main();
    }

    function handlePlus(){
        let currentMuenze : number;
        let coins : HTMLParagraphElement = <HTMLParagraphElement> parentDocument.getElementById("Münzstand");
        currentMuenze = parseInt(coins.innerHTML, 10);
        coins.innerHTML = "" + (currentMuenze+1);
    }

    function main (){
        console.log("bin im Main");
        
        parentDocument = window.parent.document;
        
        console.log("dies ist die Ausgabe: " + parentDocument.getElementById("ueberschrift").innerHTML);  
    }
}
