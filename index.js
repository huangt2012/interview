

const React = (function() {
    let hooks = []
    let currentHook = 0
    return {
        render(Component) {
            console.log('render')
            const Com = Component()
            Com.render()
            currentHook = 0 // 为下一次render重置hook索引
            return Com
        },
        useState(initialValue) {
            hooks[currentHook] =  hooks[currentHook] || initialValue
            const setStateHookIndex = currentHook
            const setState = (newVal) => {
                console.log(setStateHookIndex, '====', newVal, hooks)
                hooks[setStateHookIndex] = newVal
            }
            return [hooks[currentHook++], setState]
        },
        useEffect(callback, depArr) {
            const hasNoDeps = !depArr
            const deps = hooks[currentHook]
            const hasChanged = deps ? !depArr.every((v, i) => v === deps[i]) : true
            if (hasNoDeps || hasChanged) {
                callback()
                hooks[currentHook] = depArr
            }
            currentHook++
        }
    }
})()

function Counter() {
    const [count, setCount] = React.useState(0)
    const [text, setText] = React.useState('my')
    React.useEffect(() => {

        // console.log('effect', text)
    }, [count, text])
    return {
        click: () => setCount(count + 1),
        render: () => {},
        type: (text) => setText(text),
        noop: () => setCount(count)
    }
}
let App = React.render(Counter)
App.click()
App.type('hhh')
App = React.render(Counter)
// App.type('hhhhhh')
// App = React.render(Counter)
App.noop()