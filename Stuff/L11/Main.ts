namespace L11 {

    console.log(SuperClass);

    SuperClass.greetStatic();

    let a: SuperClass = new SuperClass();
    a.greetPublic();

    let b: SubClass = new SubClass();
    b.greetPublic();
}