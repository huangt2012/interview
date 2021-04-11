/**
 * 什么是动态规划？
 * 将原问题拆解成若干子问题，同时保存子问题的答案，使得每个子问题只求解一次，最终获得原问题的答案
 * 本质上是递归问题 =》 递归过程中会遇到重叠子问题 =》如何解决重叠子问题？
 * 1）记忆化搜索：自顶向下的解决问题
 * 2）动态规划：自底向上的解决问题
 */

// 爬楼梯问题：leetcode：70
function climbStairs(n) {
    if (n === 0 || n === 1) return 1
    let prev = 1
    let curr = 1
    for (let i = 2; i <= n; i++) {
        let temp = prev + curr
        prev = curr
        curr = temp
    }
    return curr
}

// 整数拆分：letcode:343 
function integerBreak(n) {

}
