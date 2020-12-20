class Subject {
    constructor(name) {
        this.name = name;
        this.observers = [];
        this.state = "我现在很开心";
    }
    attach(observer) {
        this.observers.push(observer);
    }
    setState(newState) {
        this.state = newState;
        this.observers.forEach(observer => {
            observer.update(this);
        });
    }
}
class Observer {
    constructor(name) {
        this.name = name;
    }
    update(baby) {
        console.log(baby.name + "对" + this.name + "说", baby.state);
    }
}
const baby = new Subject("小婴儿");
const father = new Observer("爸爸");
const mother = new Observer("妈妈");
baby.attach(father);
baby.attach(mother);
baby.setState("宝宝很生气");
baby.setState("我要睡觉");