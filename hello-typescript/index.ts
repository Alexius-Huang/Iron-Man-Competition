const message = 'Hello World!';

function say(something: string): void {
  console.log(something);
}

say(message);
// => Hello World

// const message = 'Hello World!';

// Should Raise Error!
// console.log(message.touppercase());
