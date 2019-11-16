namespace code{

    window.addEventListener("load",handleLoad);

    function handleLoad(){
        console.log("hat geladen");
        main();
    }

    function main (){
        console.log("bin im Main");
        
        let parentDocument : HTMLDocument = window.parent.document;
        
        console.log("dies ist die Ausgabe: " + parentDocument.getElementById("ueberschrift").innerHTML);  
    }
}
