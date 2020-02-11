namespace L11 {
    export class SubClass extends SuperClass {

        public greetPublic(): void {
            console.log("Subklassenhallo!");
            super.greetPublic();
        }
    }
}