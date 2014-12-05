/**
 * Created by rytis on 12/5/14.
 */
class BaseClass {

    static count : number = 0;

    private static count2 : number;

    private name;

    constructor (name) {
        // BaseClass.count++;
        this.name = name;
    }

    private getName () {
        return this.name;
    }

    public getMyPublicName () {
        return this.name;
    }

    public doSomething() {
        console.log('hi');
    }

    public static increaseCount2 () {
        BaseClass.count2++;
    }

}

class ChildClass extends BaseClass {

    constructor (myName) {
        super(myName);
    }

    private getMyName () {
        super.doSomething();
        return this.getMyPublicName();
    }

    public doSomething() {
        console.log('h0');
    }


}
