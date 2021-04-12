## CSS样式之层叠、特殊性以及继承
- 参考文档：https://www.jianshu.com/p/14c4cadd6bb8

## 浮动布局
- 当元素浮动以后，元素可以向左或向右移动，直到它的边缘触碰到包含它的边框或者另外一个浮动元素的边框位置为止。
- 元素浮动以后，会脱离正常的文档流。

### 优点
- 图文混排时，可以很好的使文字环绕在图片周围。
- 元素浮动后，它有者块级元素的一些性质，例如设置宽高等。
- 与inline-block有区别：
  - 1.float可以设置方向，inline-block是固定的
  - 2.inline-block在使用时有时会出现空白间隙的问题

### 缺点
- 浮动元素脱离文档流后无法撑起父元素，会造成父元素高度塌陷。

### 清除浮动的方法
- 1.添加额外的标签，并设置样式 "clear:both"
  ```
  <div class="parent">
        <div style="clear: both;"></div>
  </div>
  ``` 
- 2.父级添加overflow属性，或者设置具体的高度
  ```
  <div class="parent" style="overflow: auto;"> // overflow:hidden 也可以
        
  </div>
  ```
- 3.使用伪类选择器清除浮动
```
.parent:after {
    /* 设置添加子元素的内容为空 */
    content: '';
    /* 设置为块级元素 */
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
  }
  <div class="parent">
        
  </div>
```
## 使用display: inline-block 产生空白间隙问题  
- 问题：两个display: inline-block元素放到一起会产生一段空白
- 原因：元素被当成行内元素排版时，元素之间的空白符（空格、回车换行等）都会被浏览器处理，根据css的white-space属性的处理方式（默认是normal，合并多于空白），原来HTML代码中的回车换行被转成一个空白符，在字体大小不为0的情况下，空白符占据一定的宽度，所以产生空隙
### 解决方法
- 1.将子元素标签的结束符和下一个标签的开始符写在同一行，或者把所有子元素写在同一行
- 2.父元素设置font-size: 0，子元素设置正确大小
- 3.为子元素设置float: left

## 关于BFC
### 什么是BFC
- 浮动元素和绝对定位元素，非块级盒子的块级容器，overflow值不为visiable的块级盒子都会为他们的内容创建新的BFC（Block Formatting Context，BFC，块级格式上下文）
### 触发条件
- 根元素
- 浮动元素（float不为none）
- 绝对定位元素（position：fixed/absolute）
- 行内块元素（display：inline-block）
- overflow值不为visible的块元素（overflow：auto/hidden）
- 弹性元素（display：flex/inline-flex）
- 网格元素（display：grid/inline-grid）
### BFC渲染规则
- BFC垂直方向边距重叠
- BFC的区域不会与浮动元素重叠
- BFC是一个独立的容器，外面的元素不会影响里面的元素
- 计算BFC高度的时候浮动元素也会参与计算
### 应用场景
- 防止浮动导致父元素高度塌陷
- 避免外边距折叠
    - 两个块处于同一个BFC会造成外边距折叠，但如果分别设置BFC，边距重叠的问题就不存在了