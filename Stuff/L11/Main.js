var L11;
(function (L11) {
    console.log(L11.SuperClass);
    L11.SuperClass.greetStatic();
    let a = new L11.SuperClass();
    a.greetPublic();
    let b = new L11.SubClass();
    b.greetPublic();
})(L11 || (L11 = {}));
//# sourceMappingURL=Main.js.map