Function.prototype.newCall = function (context,...params) {
  if (typeof context === 'object') {
      context = context || window
  } else {
      context = Object.create(null);
  }
  let fn = Symbol();
  context[fn] = this
  console.log(this, fn, 'this111')
  const result = context[fn](...params);

  delete context.fn;
  return result;
}

var person = {
  name: "jayChou"
};

function say(age, sex) {
  console.log(`name: ${this.name},age: ${age}, sex: ${sex}`);
  return age + sex;
}

var check = say.newCall(person, 18, '男');
console.log(check); // 18男
