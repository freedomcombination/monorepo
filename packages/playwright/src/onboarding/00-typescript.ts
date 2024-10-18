/// //////////////////////////////////////////////////////////////////// ///
///                                                                      ///
///                           00. TYPESCRIPT                             ///
///              branch: onboarding/<username>/00-typescript             ///
///                                                                      ///
/// //////////////////////////////////////////////////////////////////// ///

/**
 * 01. VARIABLES AND TYPES
 */

// 01-01. Let and Const

// Let
let x = 'John Doe'
x = 'Jane Doe' // You can reassign a value to a variable declared with let
console.log(x)

// Const
const y = 30
// y = 31 // You cannot reassign a value to a variable declared with const
console.log(y+1);

// 01-02. Primitive Types
// TODO:
// - [ ] Declare a variable `myName` with a type of `string
const myName:string = "Mehmet";
console.log(myName);
// - [ ] Declare a variable `age` with a type of `number`
const age:number = 4;
console.log(age);
// - [ ] Declare a variable `isStudent` with a type of `boolean`
const isStudent:boolean = false;
console.log(isStudent);
// - [ ] Declare a variable `hobbies` with a type of `string[]`
const hobbies:string = "pinpong";
console.log(hobbies);
// - [ ] Declare a variable `person` with a type of `{ name: string; age: number }`
const person : {name:string; age:number; } = {
  name:"M",
  age:45
}
console.log(person)

// 01-03. Type & Inference
// TODO:
// - [ ] Declare a type `Person` with the properties `name` of type `string` and `age` of type `number`
type Person2 =  {
  name:string; 
  age:number;
};
// - [ ] Declare a variable `john` with a type of `Person` and assign an object with the properties `name` and `age`
const john: Person2 = {
  name: "WW John",
  age: 25
};
console.log(john.name)
// - [ ] Declare an interface `User` with the properties `name` of type `string` and `age` of type `number`
interface User {
  name:string;
  age:number;
}
// - [ ] Declare a variable `jane` with a type of `User` and assign an object with the properties `name` and `age`

const jane: User = {
name:'jane sane',
age:18
} 
console.log(jane);

/**
 * =====================================================================================================================
 */

/**
 * 02. FUNCTIONS
 */

// 02-01. Function Declaration
// TODO:
// - [ ] Declare a function `add` that takes two parameters `a` and `b` of type `number` and returns a `number`
function add(a: number, b:number): number {
  return a+b;
}
// - [ ] Call the function `add` with the arguments `2` and `3` and log the result to the console

const result = add(2,3);
console.log(result);

// 02-02. Function Expression
// TODO:
// - [ ] Declare a function `subtract` that takes two parameters `a` and `b` of type `number` and returns a `number`
const subtract = (a: number, b: number) =>  {
  return a - b;
};
 
// - [ ] Call the function `subtract` with the arguments `5` and `3` and log the result to the console
const result2 = subtract(5, 3);
console.log(result2);

// 02-03. Arrow Function
// TODO:
// - [ ] Declare a function `multiply` that takes two parameters `a` and `b` of type `number` and returns a `number`
const multiply = (a: number, b: number)=> {
return a*b;
}
// - [ ] Call the function `multiply` with the arguments `2` and `3` and log the result to the console
const result3 = multiply(2,3)
console.log(result3);

/**
 * =====================================================================================================================
 */

// 02-04. Optional and Default Parameters
// TODO:
// - [ ] Declare a function `greet` that takes two parameters `name` of type `string` and `greeting` of type `string` with a default value of `'Hello'` and returns a `string`

const greet =(name:string, greeting:string="Hello") => {
return `${greeting}, ${name}!`
}

// - [ ] Call the function `greet` with the argument `'John'` and log the result to the console

console.log(greet('John'));

// 02-05. Object Parameter
// TODO:
// - [ ] Declare an Interface `Person` with the properties `name` of type `string` and `age` of type `number`
interface Person1 {
  name:string;
  age:number;
}
// - [ ] Declare a function `sayHello` that takes a parameter `person` of type `Person` and returns a `string`
const sayHello = (person: Person1): string => {
return `Hello, ${person.name}! You are ${person.age} years old.`;
}
/*
function sayHello(person: Person1): string {
  // Here 'person' is used in the template string
  return `Hello, ${person.name}! You are ${person.age} years old.`;
}*/

// - [ ] Call the function `sayHello` with the argument `{ name: 'John', age: 30 }` and log the result to the console
const result4 = sayHello({ name: 'John', age: 30 });
console.log(result4);

/**
 * =====================================================================================================================
 */

/**
 * 02. CLASSES
 */

// 03-01. Class Declaration
// TODO:
// - [ ] Declare a class `Person` with constructor that takes two parameters `name` of type `string` and `age` of type `number`
 
// - [ ] Declare a function `greet` that returns a `string` with the format `'Hello, my name is ${name} and I am ${age} years old'`

// - [ ] Create an instance of `Person` with the arguments `'John'` and `30` and log the result of calling the `greet` function to the console

/*
export class Person {
  name:string;
  age:number;
  
  constructor ()
  } */

class Person3 {
  name:string;
  age:number;

  constructor(name:string, age:number) {
    this.name = name;
    this.age = age;
  }
  greet() {
    return `Hello my name is ${this.name}, and I am ${this.age} yers old.`;
  }
}
  // Create an instance of Person
  const john2 = new Person3('John', 30);


  console.log(john2.greet());
