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
console.log(y)

// 01-02. Primitive Types
// TODO:
// - [ ] Declare a variable `myName` with a type of `string`
const myName: string = "Mehmet"
console.log(myName)
// - [ ] Declare a variable `age` with a type of `number`
// - [ ] Declare a variable `isStudent` with a type of `boolean`
// - [ ] Declare a variable `hobbies` with a type of `string[]`
// - [ ] Declare a variable `person` with a type of `{ name: string; age: number }`

// 01-03. Type & Inference
// TODO:
// - [ ] Declare a type `Person` with the properties `name` of type `string` and `age` of type `number`
// - [ ] Declare a variable `john` with a type of `Person` and assign an object with the properties `name` and `age`
// - [ ] Declare an interface `User` with the properties `name` of type `string` and `age` of type `number`
// - [ ] Declare a variable `jane` with a type of `User` and assign an object with the properties `name` and `age`

/**
 * =====================================================================================================================
 */

/**
 * 02. FUNCTIONS
 */

// 02-01. Function Declaration
// TODO:
// - [ ] Declare a function `add` that takes two parameters `a` and `b` of type `number` and returns a `number`
// - [ ] Call the function `add` with the arguments `2` and `3` and log the result to the console
export function add() { }

// 02-02. Function Expression
// TODO:
// - [ ] Declare a function `subtract` that takes two parameters `a` and `b` of type `number` and returns a `number`
// - [ ] Call the function `subtract` with the arguments `5` and `3` and log the result to the console
export const subtract = function () { }

// 02-03. Arrow Function
// TODO:
// - [ ] Declare a function `multiply` that takes two parameters `a` and `b` of type `number` and returns a `number`
// - [ ] Call the function `multiply` with the arguments `2` and `3` and log the result to the console
export const multiply = () => { }

/**
 * =====================================================================================================================
 */

// 02-04. Optional and Default Parameters
// TODO:
// - [ ] Declare a function `greet` that takes two parameters `name` of type `string` and `greeting` of type `string` with a default value of `'Hello'` and returns a `string`
// - [ ] Call the function `greet` with the argument `'John'` and log the result to the console
export function greet(name: any, greeting = 'Hello') {
  return greeting + ', ' + name
}

// 02-05. Object Parameter
// TODO:
// - [ ] Declare an Interface `Person` with the properties `name` of type `string` and `age` of type `number`
// - [ ] Declare a function `sayHello` that takes a parameter `person` of type `Person` and returns a `string`
// - [ ] Call the function `sayHello` with the argument `{ name: 'John', age: 30 }` and log the result to the console
export type IPerson = {
  name: string
  age: number
}
export function sayHello() { }

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
export class Person {
  constructor() { }
  greet() { }
}
