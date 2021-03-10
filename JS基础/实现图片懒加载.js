/**
 * 方案一：使用clientHeight/scrollTop/offsetTop
 * 1.首先给图片一个占位资源：<img src="default.jpg" data-src="http://www.xxx.com/target.jpg" />
 * 2.监听window.scroll事件判断是否到达视口
 */
const imgs = document.getElementsByTagName('img')
const num = imgs.length
let count = 0  // 计数器，从第一张图片开始

// 初始的时候加载图片
lazyload()
// 监听scroll事件
// 最好对scroll进行节流，以免频繁触发
window.addEventListener('scroll', lazyload)

function lazyload() {
    const viewHeight = document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    for (let i = count; i < num; i++) {
        if (imgs[i].offsetTop < viewHeight + scrollTop) {
            // 说明元素出现在视口了
            if (imgs[i].getAttribute('src') !== 'default.jpg') continue
            imgs[i].src = imgs[i].getAttribute('data-src')
            count++
        }
    }
}

/**
 * 方案二：使用 getBoundingClientRect 判断是否出现在视口
 */
function lazyload2() {
    for (let i = count; i < num; i++) {
        if (imgs[i].getBoundingClientRect().top < document.documentElement.clientHeight) {
            // 说明元素出现在视口
            if (imgs[i].getAttribute('src') !== 'default.jpg') continue
            imgs[i].src = imgs[i].getAttribute('data-src')
            count++
        }
    }
}

/**
 * 方案三：使用 intersectionObserver 
 * 这是浏览器内置的API，实现了监听滚动事件，是否出现在视口中，节流三大功能
 */
function lazyload3() {
    const observer = new IntersectionObserver((changes) => {
        for (let i = 0; i < changes.length; i++) {
            const change = changes[i]
            if (change.isIntersecting) { // 通过这个属性判断是否在视口中
                const imgElement = change.target
                imgElement.src = imgElement.getAttribute('data-src')
                observer.unobserve(imgElement)
            }
        }
    })
    Array.from(imgs).forEach((item) => observer.observe(item))
}

/**
 * 方案四：浏览器觉得懒加载可以由自己完成，开发者只需要加一个属性：loading
 * <img src="shanyue.jpg" loading="lazy"> 
 * 但是目前兼容性还不是很好
 * 
 */
