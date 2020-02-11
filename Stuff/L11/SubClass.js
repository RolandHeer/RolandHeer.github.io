var L11;
(function (L11) {
    class SubClass extends L11.SuperClass {
        greetPublic() {
            console.log("Subklassenhallo!");
            super.greetPublic();
        }
    }
    L11.SubClass = SubClass;
})(L11 || (L11 = {}));
//# sourceMappingURL=SubClass.js.map