var L11;
(function (L11) {
    class SuperClass {
        static greetStatic() {
            console.log("Hello from SuperClass");
        }
        greetPublic() {
            this.greetPrivate();
        }
        greetProtected() {
            this.greetPrivate();
        }
        greetPrivate() {
            console.log("Lol");
        }
    }
    L11.SuperClass = SuperClass;
})(L11 || (L11 = {}));
//# sourceMappingURL=SuperClass.js.map