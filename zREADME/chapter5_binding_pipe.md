# chapter 5 数据绑定、响应式编程、管道

## 数据绑定

### 数据绑定的三种形式

```html
<!-- 使用插值表达式将一个表达式的值显示在模版上 -->
<h1>{{productTitle}}</h1>

<!-- 使用方括号将HTML标签的一个属性绑定到一个表达式上 -->
<img [src] = "imgUrl">

<!-- 使用小括号将组件控制器的一个方法绑定为模版上一个事件的处理器 -->
<button (click)="toProductDetail()">商品详情</button>

```

### angular默认采用单向的数据绑定 

* 在angular中默认的数据绑定市以单向方式实现的，所谓单向：要么将组件控制器属性的变化反应到模版上，要么将模板上的事件绑定到组件控制器的方法上；

```html
<h1>{{productTitle}}</h1>
<!-- 组件控制器的productTitle属性发生变化的时候，模板中的差值表达式中的productTitle会立刻自动的更新，但是如果我们使用jquery之类的库去改变h1标签中的内容时，并不会导致组件控制器上面那个个productTitle属性的值发生改变，这就是单向的绑定 -->
<!-- 在angularjs中，默认的数据绑定方式时双向绑定，也就是h1标签中内容的变化同时会导致productTitle的属性值发生变化，这也是angularjs在处理复杂页面会出现性能问题的根源，因为angularjs会在页面去维护一个存有所有数据表达式的列表，当一个浏览器事件发生时 会导致angularjs反复的去检查这个列表，直到其确定所有的东西都已经同步，这个过程时比较耗性能的 -->

<!-- 在angular中默认的数据绑定方式是单向绑定，虽然默认情况下其不使用双向的绑定 ，但我们依然可以使用明确指定的方式，来使用数据绑定，也就是双向绑定现在变成一个可选项，而不是框架的默认的行为 -->
```

### angular中的事件绑定

```ts
// <!-- The directive creates an EventEmmiter and expose i as a property. The directive calls EventEmmiter.emit(payload) to fire event, passing in a message payload -->
// <!-- Parent directives listen for the event by binding to this property and accessing the payload thougn $event object -->

// 监听事件/触发事件/获取事件信息
// 事件触发后，执行处理函数，函数执行所需要的实参/事件对象，从前传到后； 即 后台“什么时候执行handler 以及 执行handler所需要的实参，均是从前面获取得到” 上述两点就是单向传输的内容；
 
// 触发：通过EventEmmiter.emit() 方法触发；payload
// 监听：通过绑定充当property的EventEmitter;
// 获取 the binding conveys information---payload 通过$event;

// Consider a HeroDetailComponent that presents hero information and response to user actions. Although the HeroDetailComponent has a delete button it doesn't know how to delete the hero itself. The best it can do is raise an event reporting the user's delete request.
 

// 理解事件绑定
<a onclick = do()>敢点我试试</a>

```
1. 最简单的页面就是纯用html  写的页面；但html作为一个历史产物，使用其有限的标签，所能达到表现能力是有限的； 而angular给了我们一套构建标签的方法，通过这些方法，我们去diy一些标签，通过最原始的html书写方式，去完成我们的页面；

2. 如果requireJS 让自己学会，自己想做什么千万不要自己去做，而是自己去捏个会做这件事的人（define）,并将它叫到自己面前（injection）, 并把事情甩给他（call method）的逻辑； 则angular 则让自己学会 自己使用最简单的html标签去写页面（前端最开始就是这么办的），自己想要一个什么标签，就去自己diy一个标签，并将这个标签简单的排在自己的html文件中就行了；

3. 而angular给我们提供了两种diy标签的方式，一种是component 的方式 即按照html 标签的本质逻辑 去重构一个新的标签； 一种是directive 的方式 即顺着标签的逻辑 去人为的增设一些东西，其实就是一个新的标签，有别于原始的标签；

4. 我们要从这个纬度，去理解angular, 如现在我们去理解自定义事件；

<a href="http://" target="_blank" onclick="do()">
href 与 onclick 的区别是一个是普通属性，一个是事件属性； angular 要模仿的就是事件属性，要能做到三点： 本质上是属性，可被监听，可触发事件；

<app-hero-detail (deleteRequest)="deleteHero($event)"></app-hero-detail>

> 理解事件绑定是从template到component的绑定，因为handler 是定义在component中的， 处理函数的运行肯定是后台组件中运行（这一点很好理解，想象一下自己进行断点调试，事件触发时肯定时蹦到component中的handler函数体中去了），而运行中所需要的参数是从前传到后的；`关键点在于理解handler 是在后台调用执行的`

> 依赖注入的逻辑是遇到事情就去安排个人去处理---是从上至下的(requireJS)，而事件绑定的逻辑是遇到事自己处理不了，将事情反馈给上级 让自己的上级去处理。

### promise逻辑的理解

> 一般异步的逻辑是“这个事我现在没法干，得先让‘小李干‘，等他干完了有结果了，我才能做。如果结果为a, 我就这样这样干；如果结果为b 我就那样那样干”- 对现在干不了的事情给领导说个计划，给个承诺；---- 都是满满的套路；而promise的出现就是对付这种套路（其无需等待）， 虽然现在具体结果还没有出来，但结果大概张什么样的自己肯定事心知肚明，就类似于我现在与后台配合做页面，伪说法是 后台需要等前台的页面做完其才能开始做，但现实是虽然页面还没有出来，但页面上将来要部署那些功能，需要那些接口，需不需要分页，都是明的，后台不需要等我页面完全出来，就可以去做这些工作了-------“上级：我知道这个事情现在你没法做，需要先等到小李做完，但你可以先将能做的都做了，并不一定非得等他将结果做出来，`可以将未知结果设置成为一个变量，利用这个变量 你该写你的逻辑写你的逻辑`, `等真实的结果出之后，直接将其传到逻辑中的变量中运行一遍事情就做完了`”  --- 假设未来，先做事，提升效率的逻辑；

```js
function TimeOut (ms){
   return new Promise((resolve,reject)=>{
    //我： “首先这个事 立刻让 小李去做” Promise 构造函数的函数参数中的逻辑 就是小李做事的逻辑
       setTimeout(resolve,ms,'done');
   })
}
// 我：“并不一定要等到他，将这个事情做完，我可以将未知的结果设置成为一个变量，然后该写我的逻辑，写我的逻辑”
TimeOut(200).then((value)=>{
    // 我： “等小李真的将事情做完了，他可以通过调用resole(data)方法的方式通知我，并将真实的结果传给我； 等到脚本所有的同步代码都运行完毕后（then中的函数必须等所有同步脚本，运行完毕后执行），我在运行一遍我的逻辑，事情就有结果了 ” then 方法函数参数中的逻辑事我的逻辑
    console.log(value);
})

```

### 理解工厂函数的固定写法


## 响应式编程

这个和angular关系不大，其使由rsgx框架来实现的，集成了gxgs并将一些相应式的特性建立在gxgs的基础上

## 管道

用来格式化模版输出的可重用对象