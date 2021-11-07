class Event {
  constructor(){
    this._events = this._events || new Map() // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限
  }

  // 触发名为type的事件
  emit(type, ...args){
    let handler
    handler = this._events.get(type)
    if(Array.isArray(handler)){
      // 如果是一个数组说明有多个监听者,需要依次此触发里面的函数
      for(let i = 0; i < handler.length; i++){
        if(args.length > 0){
          handler[i].apply(this, args)
        }else{
          handler[i].call(this)
        }
      }
    }else{
      // 单个函数的情况我们直接触发即可
      if (args.length > 0) {
        handler.apply(this, args);
      } else {
        handler.call(this);
      }
    }
    return true
  }

  // 监听名为type的事件
  addListener(type, fn){
    const handler = this._events.get(type) // 获取对应事件名称的函数清单
    if(!handler){
      this._events.set(type, fn)
    }else if(handler && typeof handler === "function") {
      // 如果handler是函数说明只有一个监听者
      this._events.set(type, [handler, fn]);
    }else {
      handler.push(fn); // 已经有多个监听者,那么直接往数组里push函数即可
    }
  }

  removeListener(type, fn){
    const handler = this._events.get(type); // 获取对应事件名称的函数清单
    // 如果是函数,说明只被监听了一次
    if(handler && typeof handler === 'function'){
      this._events.delete(type, fn)
    }else {
      let postion;
      // 如果handler是数组,说明被监听多次要找到对应的函数
      for (let i = 0; i < handler.length; i++) {
        if (handler[i] === fn) {
          postion = i;
        } else {
          postion = -1;
        }
      }

      // 如果找到匹配的函数,从数组中清除
      if (postion !== -1) {
        // 找到数组对应的位置,直接清除此回调
        handler.splice(postion, 1);
        // 如果清除后只有一个函数,那么取消数组,以函数形式保存
        if (handler.length === 1) {
          this._events.set(type, handler[0]);
        }
      } else {
        return this;
      }
    }
  }
}
