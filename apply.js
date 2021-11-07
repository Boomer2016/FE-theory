Function.prototype.newApply = function(context, parameter) {
  if (typeof context === 'object') {
    context = context || window
  } else {
    context = Object.create(null)
  }
  let fn = Symbol()
  context[fn] = this;
  const result = context[fn](...parameter);
  delete context[fn];
  return result;
}

Function.prototype.newApply = function (context, arr) {
  if (typeof context === 'object') {
      context = context || window
  } else {
      context = Object.create(null);
  }
  context.fn = this;

  var result;
  if (!arr) {  // 判断函数参数是否为空
      result = context.fn();
  }
  else {
      var args = [];
      for (var i = 0; i < arr.length; i++) {
          args.push('arr[' + i + ']');
      }
      result = eval('context.fn(' + args + ')');
  }

  delete context.fn;
  return result;
}

