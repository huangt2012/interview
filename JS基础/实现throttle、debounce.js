/**
 * 节流的核心思想是：如果在定时器的时间范围内再次触发，则不予理睬，
 * 就比如公交车，每10分钟一趟，那在10分钟之内有多少人在公交站都不予理睬
 */

 function throttle(fn, interval) {
     let flag = true
     return function(...args) {
         let context = this
         if (!flag) return
         flag = false
         setTimeout(() => {
            flag = true
            fn.apply(context, args)
         }, interval)
     }
 }

 function throttle2(fn, interval) {
     let last = 0
     return function(...args) {
         const context = this
         let now = new Date()
         if (now - last < interval) return
         fn.apply(context, args)
         last = now
     }
 }

/**
* 防抖的思想：频繁触发只执行最后一次
每次事件触发则删除原来的定时器，建立新的定时器
类似于王者荣耀的回城按钮，频繁的点击只有最后一次生效
*/

function debounce(fn, delay) {
    let timer = null
    return function(...args) {
        const context = this
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    }
}

/**
 * 加强版防抖
 * 因为防抖有时候触发的太频繁，用户的操作一次响应都没有，希望固定时间必须给用户一次响应
 * 
 */

 function debounce1(fn, delay) {
    let timer = null
    let last = 0
    return function(...args) {
        const context = this
        const now = new Date()
        if (now - last < delay) {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(context, args)
                last = now
            }, delay)
        } else {
            // 这个时候表示时间到了
            fn.apply(context, args)
            last = now
        }
    }
 }