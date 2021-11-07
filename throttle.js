// 节流: 基于时间戳实现
const throttle = (fn, delay) => {
  let start = 0
  return (...args) => {
    start++
    if(Date.now() - start > delay){
      fn.apply(this, args)
      start = Date.now()
    }
  }
}

// 基于定时器实现
const throttle2 = (fn, delay) => {
  let timer = null
  return (...args) => {
    if(!timer){
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      },delay)
    }
  }
}
