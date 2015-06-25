import { Component, View, bootstrap } from 'angular2/angular2';

@Component({
    selector: 'hello'
})

@View({
    template: `<span>Hello, {{name}}!</span>`
})

class Hello {
    constructor() {
        this.name = 'NEW World';
        alert('hi');
    }
};

console.log('hi');
bootstrap(Hello);
