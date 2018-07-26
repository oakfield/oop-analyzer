class Test2 {
    constructor() {
        this.myVariable10 = null;
    }

    myMethod10() {
        return this.myVariable10;
    }
}

class Test {
    constructor() {
        this.myVariable1 = null;
        this.myVariable2 = 3;
    }
    
    myMethod() {
        console.log(this.myVariable1);
    }

    myBadMethod() {
        console.log(this.myVariable2);
    }
}