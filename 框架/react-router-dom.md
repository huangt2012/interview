# react-router
## 主要组件
- 路由器：BrowserRouter 和 HashRouter
- 路由匹配器：Route 和 Switch
- 导航：Link，NavLink，Redirect

### 路由器
- BrowserRouter 和 HashRouter 的区别：主要区别在于它们存储URL和与Web通信的方式
    - BrowserRouter使用常规的URL路径，这些通常是外观最好的网址，但要求服务器匹配正确，也就是说，web服务器要在所有由React Router客户端管理的URL上提供相同的页面
    - HashRouter将当前位置存储在URL的哈希部分，因此URL看起来类似于 http://example.com/#/your/page。由于哈希从不发送到服务器，因此不需要特殊的服务器配置
- 要使用路由器，只需确保将其渲染在元素层次结构的根目录下即可。通常，将顶级的 \<App />包装在路由器中
  ```
    import React from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter  } from 'react-router-dom'
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      document.getElementById("root")
    )
  ```