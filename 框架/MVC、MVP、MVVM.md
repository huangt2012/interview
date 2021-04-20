## 结合vue、react、angular谈谈MVC、MVP、MVVM  
- react：用户构建用户界面的libray
- vue：核心库也是关注视图层  
实际上，狭义的react.js和vue.js实际上只是library，还不是一个framework，因为他们没有一整套的解决方案，我们所讨论的vue、react只是我们将他们武装之后，有了一整套解决方案，成为了一个框架。
- Model（数据模型）：原始数据模型的管理
- View（视图）：用户接触操作的页面  
MVC/MVP/MVVM的区别在于Model和View联系的部分。
### MVC
- Controller（应用逻辑控制层）：将用户的操作反馈给Model，通知其进行数据更新，业务逻辑的中心 。负责监听View的用户事件，得到数据后做一些处理然后渲染View。 
  MVC大概流程：html（view）操作，告知js（Controller）要更新数据，js(Controller)经过请求或者其他操作更新了数据（Model），再告诉html（View）找指定的UI节点更新数据。  
这样的架构模式在早期的web应用中可以适应的很好，因为早期的web应用，页面的作用基本就是数据展示。Model层可以将数据处理好之后通知view渲染。  
但是随着web的发展，业务逻辑的复杂，这种架构模式有以下两个问题：
- 1.view更新的时候，必须要通过Controller去更新一遍Model，Model更新的时候也要去更新一遍视图。此时开发者是同时维护View层和Model层。当页面复杂的时候开发者不得不做许多繁琐的工作来保证数据的状态、页面的展示都是正确的。
- 2.view层和model层耦合，复用性差。eg：点击按钮更新model并将数据渲染为列表；这时再点击一个按钮，需要渲染为表格，这时候由于之前逻辑已经连成一块，不得不再写一套渲染代码。
- 3.由于view和model耦合，数据流会十分混乱，eg:改变model，view的更新又触发了另一个controller，使得另一个model更新

### MVP
Controller变成了Presenter（中介者）层，Presenter层既能将页面操作告知Model进行数据更新，也能在数据更新时通知View进行更新视图，使View层和Model层解耦。
- Presenter：比起Controller，Presenter会调用View层提供的接口去渲染Moel
### MVVM
中间的ViewModel层中，会构建一份状态数据，视图层根据其渲染视图，MVVM是实现了数据绑定的MVP
- ViewModel：比起MVP中View需要提供API，MVVM在VM中构建了一组状态数据（state data）作为View状态的抽象。通过数据绑定使VM中的状态数据与View中的显示状态保持一致，这样，VM中的展示逻辑只需要修改对应的状态数据，就可以控制View的状态。

- Vue：MVVM框架
  - Model层：接口层，原始数据模型
  - View层：视图层，template中的html代码
  - ViewModel层：基于一个html元素构建的vue实例。
- AngularJs：MVVM框架
- React：MVVM
  - Model层：接口层，原始数据模型
  - View层：编译之后的DOM
  - ViewModel层：基于jsx语法，以及react构建的vdom，单向数据流

- 参考：
  - https://segmentfault.com/a/1190000015310674
  - https://zhuanlan.zhihu.com/p/64257809


