namespace L11 {
    export class SuperClass {

        public static greetStatic(): void {
            console.log("Hello from SuperClass");
        }

        public greetPublic(): void {
            this.greetPrivate();
        }

        protected greetProtected(): void {
            this.greetPrivate();
        }

        private greetPrivate(): void {
            console.log("Lol");
        }
    }
}