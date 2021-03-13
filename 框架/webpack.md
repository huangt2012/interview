# webpack
- 参考资料：
    - https://www.jianshu.com/p/216ed82a3e49
    - https://www.jianshu.com/p/4e86878f2271
## 1.什么是webpack，与grunt、gulp的区别
- **webpack是基于模块化打包的工具**
    - webpack是静态模块打包工具。在webpack看来，项目中所有的资源都是模块。自动化处理模块，从入口开始，递归遍历所有直接依赖或间接依赖的模块，并在内部构建能够映射项目所需模块的依赖图（dependency graph），然后将所有模块打包生成一个或多个bundle文件。
    - **简单来说：webpack 对有依赖关系的多个模块文件进行打包处理之后，生成浏览器可以直接高效运行的资源**
- **grunt 和 gulp 是基于任务运行的工具**
    - 它们会自动执行指定的任务，就像流水线，将不同的资源放上去然后通过不同插件进行加工。
    - 现在主流的方式是用 npm script 代替grunt、gulp，npm script同样可以打造任务流

 ## 2.webpack、rollup和parcel的优劣
- **webpack适用于大型复杂的前端站点的构建：** webpack 有强大的loader和plugin生态，打包后生成的其实是一个立即执行函数，函数接收一个参数，这个参数是模块对象，键是模块路径，值是模块内容，立即执行函数内部实际是处理模块间引用关系，执行模块等，所以webpack更适合文件依赖复杂的应用开发
- **rollup适用于基础库的打包：**rollup其实是将所有的模块打包进一个文件，并且通过Tree-shaking删除无用代码，可以最大程度上降低代码的体积，但是rollup没有webpack诸如代码分割、按需加载等高级功能，rollup更聚焦于库的打包，所以更适合库的开发
- **parcel适用于简单的实验性项目：** 可以满足低门槛的快速看到效果，但生态差、报错信息不够全面等都是它的硬伤，因此parcel更适合一些实验性的项目

## 3.Loader和Plugin的区别
- 有哪些常用的Loader
    - file-loader: 把文件输出到文件夹中，在代码中通过相对路径去引用文件
    - url-loader：和file-loader是类似，只不过对于一些比较小的文件会直接生成base64的方式放入到代码中
    - source-map-loader：加载额外的source map文件，方便调试
    - image-loader：加载并且压缩图片文件
    - babel-loader：将es6代码转为es5代码
    - css-loader：加载css，支持模块化，压缩和文件引用
    - style-loader：把css注入到JavaScript代码中，通过dom操作去加载css
    - eslint-loader：通过Eslint检查JavaScript代码
    - ts-loader：将TypeScript转为JavaScript
    - awesome-typescript-loader：也是将TypeScript转为JavaScript，性能优于ts-loader
- 常见的Plugin
    - define-plugin：定义环境变量
    - html-webpack-plugin：简化html创建
    - uglifyjs-webpack-plugin：压缩es6代码
    - mini-css-extract-plugin：css提取到单独的文件中，支持按需加载
- 不同点：
    - **作用不同**  
    Loader直译为加载器。webpack将一切资源视为模块，但是webpack原生只能解析js文件的，如果要将其他的文件也打包的话，就需要用到loader。所以loader的作用是让webpack有了加载和解析非JavaScript文件的能力。    
    Plugin直译为插件。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。在webpack运行的生命周期中会广播出许多事件，plugin可以去监听这些事件，在合适的时机通过webpack提供的Api改变输出结果
    - **用法不同**  
    Loader是在module.rules中配置，也就是说它是作为模块的解析规则而存在的。类型为数组，每一项是一个对象，每个对象里描述了对应不同类型的文件，使用不同的loader以及对应的参数。  
    Plugin是在plugins中配置，每一项是plugin的实例，参数都是通过构造函数传入的。

    ## 4.bundle、chunck和module分别是什么
    - bundle：是webpack打包出来的文件
    - chunck：代码块，包含了一个或多个模块，用于代码的和分割
    - module：开发中的单个模块，webpack的世界中，一切皆模块，一个模块对应一个文件，webpack会从entry入口开始，递归遍历所有依赖的模块。

    ## 5.webpack的构建流程  
    webpack的运行流程是一个串行的流程，从启动到结束一次执行以下流程
    - 1.初始化参数：从配置文件和Shell语句中读取参数并合并参数，得到最终的参数
    - 2.开始编译：使用上一步得到的参数初始化Compiler对象，加载所有配置的插件，执行对象的run方法开始编译
    - 3.确定入口：根据配置中的entry找到所有的入口文件
    - 4.编译模块：从入口文件开始，调用所有配置的Loader对模块进行翻译，再找出模块中的依赖的模块，再递归本步骤直到所有入口依赖的文件都执行了该步骤
    - 5.编译完成：经过第4步使用Loader翻译完所有模块后，得到每个模块被翻译后的内容以及它们之间的依赖关系
    - 6.输出资源：根据入口和模块之间的依赖关系，组装成一个个包含一个或多个模块的chunk，再把每个chunk转换成单独的文件加入到输出列表中，这步是可以修改输出内容的最后机会
    - 7.输出完成：根据配置中的output确定输出路径和名称，把文件内容写出到文件系统中

    ## 6.webpack热更新的原理
    热更新又称为热替换（hot module replacement，HMR),基于**webpack-dev-server**。当修改了代码并保存后，会重新打包文件，并将改动的模块发送到浏览器，浏览器用新的模块替换旧的模块，从而实现局部刷新。  

    ## 7.用webpack来优化前端性能
    用webpack来优化前端性能，是指优化webpack的输出结果，让其在浏览器高效运行
    - 压缩代码：删除多余的代码、注释和简化代码写法等等。js用UglifyJsPlugin和ParalleUglifyPlugin压缩，css用mini-css-extract-plugin
    - 利用CDN加速。在构建过程中，将引用的静态资源修改为CDN上对应的路径。可以利用webpack对于output参数和各loader的publicPath参数来修改资源的路径
    - 删除死代码：js利用Tree-shaking删除一些永远不会执行的代码，css需要用到purify-css
    - 提取公共代码：利用CommonsChunkPlugin插件来提取公共代码
    ## 8.如何提高webpack的构建速度  
    （1）多入口的情况下使用CommonsChunkPlugin来提取公共代码  
    （2）通过externals配置来提取常用库。将不怎么需要更新的库脱离bundle打包，从而减少打包时间。比如jquery，直接使用script标签引入  
    （3）利用DllPlugin和DllReferencePlugin来预编译资源模块。通过DllPlugin将引用的但不会修改的代码进行预编译，再通过DllReferencePlugin将预编译的资源加载进来  
    （4）使用Happypack实现多线程编译  
    （5）使用webpack-uglify-parallel来加速uglify-plugin的压缩速度。它的核心就是采用多核并行压缩来提升压缩速度  
    （6）使用Tree-shaking和Scope Hoisting来剔除多余的代码
    ## 9.如何配置单页应用，多页应用
    单页应用可以看做是webpack的标准模式，只需要在entry中指定对应的入口文件。  
    多页应用可以使用webpack的AutoWebPlugin来完成简单的自动化配置，但前提是项目的目录结构需要符合它的预设。
    ## 10.webpack的基本功能和工作原理
    - 代码转换：TypeScript转为JavaScript，scss转为csss等
    - 文件优化：压缩JavaScript、html、css等文件，图片的压缩合并
    - 代码分割：提取多个页面的公共代码，提取首屏不需要加载的代码让其异步加载
    - 模块合并：在使用模块化的项目有很多模块和文件，需要构建功能把模块合并为一个文件
    - 自动刷新：监听本地代码的变化，自动构建刷新浏览器
    - 代码校验：在代码被提交到仓库前，先检查是否符合规范
    - 自动发布：更新完代码之后，自动构建线上的代码并发送到发布系统


