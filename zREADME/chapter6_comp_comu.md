世界三大MOOC网站： Coursera、Udacity（有免费的D3可学）、edX 去找你需要的课程吧，小伙子

> 此文档中包含对 类的真意的理解；

# 组件间通

![组件间通讯](../images/component_communication.png)

* angular的应用的核心就是组件，任何一个angular程序在本质上都是一个组件树，如图中所示 1号组件是整个组件树的‘根’ 一般就是我们的appComponent 其包含 2、3、6三个子组件，2号组件又包含4、5两个子组件，在设计一个组件时我们需要确保组件之间是‘松耦合’的，也就是说‘组件之间互相知道的越少越好’ 因为松耦合的组件 重用性才高；
* 假设我们点击组件4 模板里面的一个按钮的时候，应该触发组件5的一段初始化逻辑，按照传统的做法我们会在组件4的按钮点击事件里，调用组件5的一个方法，但是如果我们这样做 则组件4与组件5就会紧密的耦合在一起； 那么有没有可能在组件4不知道组件5存在的情况下，实现上面的需求
* 在之前我们学会使用 “依赖注入” 来实现“松耦合的组件” ，但是光有依赖注入是不够的，在这一章里我们将学习如何使用一种 松耦合 的方式 在组件之间来传递数据，是我们可以开发出 高重用性的组件，

## 组件的输入输出属性

> 黑盒模型、输入属性、输出属性、订阅

* 游戏机本身就是一个黑盒模型，我们看不到游戏机内部是如何去运转的，游戏机值暴露两个手柄给我们，而游戏机并不关心谁来操作这两个手柄，游戏机只关心一件事情 就是如果你按了a建，屏幕上应该去显示什么；就像它不关心谁在按手柄给其输入信息一样，它也不关心谁在看它的屏幕输出，甚至有没有看都无所谓，外面是一条狗还是一个人在玩游戏机，对游戏机来说是没有区别的，它只是规定好输入的格式（两个手柄），然后去输出外面可能会感兴趣的东西；
* 我们的组件就要设计成这样的黑盒模型，如果一个组件要从外部世界去接受一些东西，那么他应该使用输入属性声明它需要的东西，至于这些东西从哪里来，组件不需要知道，组件只需要知道 当这些它需要的东西 外部世界提供给它之后，它应该怎么去做；
* 同样一个组件想要将一些外部世界可能感兴趣的东西告诉外部世界，其应该通过其“输出属性”来发射事件，至于这些事件发射给谁，组件也不需要去知道
* 那些对组件发射东西感兴 趣的东西，应该自己来“订阅”组件发射的事件

### 组件的输入属性

组件的输入属性指的是用@input()装饰器注解的属性<注意首先其是一个property，输入知识一个修饰>，用来从父组件接受数据；

使用场景：在父组件中输一个我想买的股票的名字，通过输入属性将股票的名字传递给子组件，然后在子组件中显示出来

影响时单向的：父组件的值改变时，会影响子组件，子组件的值改变的时候 不会反过来影响父组件，

#### 两种向组件传递数据方式的对比：

到现在为止，我们已经讲了两种向组件传递数据的方式，一种时刚才看到的输入属性，还有一种时路由参数我们来对比一下这两种：

* 输入属性时通过`属性` 来传递数据的，并且这种传递只能在有父子关系的组件之间，由父组件向子组件来传递数据，

```html
<div>我是父组件</div>
<div>
  <input [(ngModel)]="stock">
  <!-- 在组件的模板中引用另一个组件的时候，他们两个实际上形成了一个父子关系，这个时候才能同组输入属性从父组件给子组件传递数据 -->
  <app-order [stockCode]="stock" [amonut]="100" ></app-order>
</div>

```

* 路由参数是通过构造函数来传递数据的，

```ts
export class OrderComponent implements OnInit {
  @Input()
  stockCode: string;
  @Input()
  amonut: number;
  // 在构造函数里面依赖注入一个ActivatedRoute类型的一个对象，然后通过这样一个对象的‘参数订阅’或者‘参数快照’外面传入的参数
  constructor(routeInfo: ActivatedRoute) { }

  ngOnInit() {
  }

}

```

### 组件的输出属性

angular组件可以使用EventEmit对象来发射自定义的事件，这些事件可以被其它组件处理，EventEmit是Rxjs库中Submit类的一个子类，在响应式编程中其即可以作为观察者也可以作为被观察者，换句话说EventEmitter对象既可以通过emit()方法来发射自定义事件，也可以通过其subscripe方法来订阅EventEmit对象所发射的事件流，我们主要集中在如何使用EventEmit来向外发送事件。

使用场景：假设我们要写一个组件，这个组件可以链接到股票交易所，并且实时显示变动的股票价格，为了让这个组件可以在不同金融类的项目中重用，除了显示股票价格之外，组件还应将最新的股票价格发送至组件之外，这样其它的组件就可以根据变动的股票价格来执行相应的业务逻辑

```bash
#  创建一个报价组件
ng g component priceQuote
```
```ts
// order.component.ts
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class orderComponent implements OnInit {
  

  constructor() {
   }

  ngOnInit() {
  }

} 

```

> 上述注释中，包含对类的本意理解： 类就是类型，是用来描述一个对象的类型，而对于其所涵盖的对象，有些属性是一致的如人的本质属性都是‘人’，我们可以直接将其具体为一个值； 而对于某些属性人与人之间是不一样的，如性别 如年龄 如工作，我们描述人这个类型的时候，无法将其具体，只能说将其设置为一个变量： 将其放到构造函数的参数接口中，传入具体的实参，从而实例化一个具体的对象； 就是这样一个逻辑； 这也是构造函数参数存在的意义；

```js 
class human {
  catgory: string =  'animal';
  public work: string;
  public age: number;
  constructor(work,age){

  } 
}
```
```html
<!-- price-quote.component.html -->
<div>这里是报价组件</div>
<div>
  股票的代码是{{stockCode}},股票价格是{{price | number:'2,2-2'}}
</div>

```

```html
<!-- app.component.html -->
<!-- 4.2 内部子组件的信息现在并没有传到父组件上面，  现在我们要捕捉子组件所发射的事件，然后来处理； 捕捉用EventEmitter发射出来的事件与捕捉原生的DOM事件是一摸一样的， 绑定节点的事件属性即可; 事件的产生机制与什么时候会到来与父组件没有关系，父组件只需要利用一个事件处理函数去监听一下就可以了 ==>4.3 app.component.ts  -->
<app-price-quote (lastPrice)="priceQuoteHandler($event)">
</app-price-quote>
<div>
  这里是报价组件的外部，
  这里是股票的名称{{priceQuote.stackCode}},
  这里是股票的最新价格{{priceQuote.lastPrice}},
</div>


```

```ts
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 stock = '';

//  4.1 在父组件中我们首先也熬声明一个PriceQuote类型的变量，因为我们发射出来的事件是这个类型的，所以我们在父组件里面要声明这样类型的一个属性来接受我们在子组件中所发射的对象；---> app.compoennt.html
  priceQuote: PriceQuote = new PriceQuote("",0);//给其一个默认值

  // 4.3 将我们捕获到的对象 赋值给本地的对象;
  //在默认情况下，自定义事件的名字与子组件的输出属性的名字是一样的，如果我们想使用另外一个名字只需要修改其装饰器@Output中的元数据的name属性值就可以了 
  priceQuoteHandler(event: PriceQuote){
    this.priceQuote = event;
  }
  
}

```

 
## 使用中间人模式传递数据

> 我们已经学习了输出属性来向组件外面发射事件，并通过事件携带数据，但是现在这个事件只能由他的父组件的模板通过事件绑定的方式来捕获并处理，如果两个组件之间不存在类似的父子关系，那么我如何以松耦合的方式来传递数据？---->中间人模式；

> 我们在创建一个组件的时候，组件不应该去依赖外部已经存在的组件，要实现这样松耦合的组件需要使用“中间人模式” 如下图所示；

![组件间通讯](../images/component_communication.png)

* 除了组件1之外每一个组件都有一个父组件，可以扮演中间人的角色，顶级的中间人就是组件1（app.component）它可以使组件2、3、6之间互相通讯，一次类推组件2是组件4\5的中间人，可以使组件4 组件5之间互相通讯；
* 中间人负责从一个组件中去接受数据，并将其传递给另外一个组件；
* 以我们之前的股票价格为例，假设有一个交易员在监视着报价组件的价格，当股票的的价格达到一定的值的时候，交易员会点一个购买按钮来购买股票；在报价组件上添加一个购买按钮很容易，但报价组件并不知道如何下单来买股票，其只是用来监控股票价格的；所以报价组件这个时候应该去通知下中间人（报价组件与交易组件的父组件），告诉它交易员要在某一个价位买了某一个股票；中间人应该知道那个组件可以买股下单，并将股票代码和当前的价格传给该组件
* 我们在上一节的代码中继续完成中间人模式的代码；

```html
<!-- price-quote.component.html -->
<div>这里是报价组件</div>
<div>
  股票的代码是{{stockCode}},股票价格是{{price | number:'2,2-2'}}
</div>

<!--1. 我们在报价组件上添加一个按钮，让其在某一个价格的时候，交易员可以去科技这个按钮去买股票 -->
<div>
  <input type="button" value="立即购买" (cclick)="buyStock($event)" >
</div>

```

```ts
// price-quote.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-quote',
  templateUrl: './price-quote.component.html',
  styleUrls: ['./price-quote.component.css']
})
export class PriceQuoteComponent implements OnInit {
  stockCode: string = 'IBM';
  price: number;

  @Output()
  lastPrice: EventEmitter<PriceQuote> = new EventEmitter();

  // 2.2 实例化一个EventEmitter对象---输出属性buy
  @Output()
  buy: EventEmitter<PriceQuote> = new EventEmitter();

  constructor() {
    setInterval(()=>{
      let priceQuote: PriceQuote = new PriceQuote(this.stockCode, 100*Math.random());
      this.price = priceQuote.lastPrice;
      this.lastPrice.emit(priceQuote); 
    },1000)
   }
  ngOnInit() {
  }
  //2.1 在组件的控制器上 写buyStock() 当我们点击“立即购买”按钮的时候，我们应该是向外发送一个事件，告诉外部 说有人点击了该按钮了；并说明当按钮被点击的时候 股票的价格是多少钱，将这个事件给发射出去； 所以我们需要一个EventEmitter对象
  
  // 注意自定义的事件函数一般要写在，构造函数与生命周期的函数下面
  buyStock(event:any) {
    // 当按钮被点击之后，我们就应该将交易请求以及当前的股票价格给发送出去
    // **这就是报价组件应该做的事情，其只要将这个价格发送出去就可以了，而不用去关心到底是谁去接收**
    this.buy.emit(new PriceQuote(this.stockCode,this.price));   
  }
}
```

> **这就是报价组件应该做的事情，其只要将这个价格发送出去就可以了，而不用去关心到底是谁去接收** --- 思考一下我们的黑盒子模型； 

> 对于不属于自己业务范围内的事情，自己只负责传递消息（事件），不负责去执行，这个一个很重要的管理手段；一个人都做完了。就不是松耦合-可重用了； 至于发送的事件最终被谁所接收 以及最终被谁执行 自己根本不用去关心；做到这一步就够了， 做人也要这样，明白自己该做什么，不该做什么，做到哪一步就可以了；

```html
<!-- app.component.html -->

<!-- 在PriceQuote组件的父组件上 监听PriceQuote组件传递的信息（发送的事件）buy -->
<app-price-quote (buy)="buyHandler($event)">
</app-price-quote>

<!-- 父组件作为一个中间人，其要做的不是将报价组件所传递的信息，显示出来给我们看，而是要将这信息 传递给下单组件 ,告诉它 “使用此价格来买东西”-->

<!-- 通过属性绑定，将报价组件所传递过来的报价信息，传递给order组件 这就是中间人需要做的事情 -->
<app-order [priceQuote]="priceQuote">
</app-order>
```

```ts
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 stock = '';

  priceQuote: PriceQuote = new PriceQuote("",0);//给其一个默认值

  buyHandler(event: PriceQuote){
    this.priceQuote = event;
  }
  
}

```


```ts
// order.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  // 使用一个输入属性，用来接受 从中间人传递过来的下单信息；
  @Input()
  priceQuote : PriceQuote

  constructor() {
   }
  ngOnInit() {
  }
  
}
```

```html
<!-- order.component.html -->
<!-- 当我们接收到中间人传递过来的PriceQuote之后将其显示到页面中 -->

<div>
买100手{{priceQuote.stockCode}}股票,买入的价格是{{priceQuote.lastPrice | number: '2.2-2'}}
</div>

```

> 这就是中间人模式了：在我们报价组件里面 我们没有与下单组件相关的任何一点代码，我们没有调下单里面的任何东西，我们甚至不知道有下单组件这面一个东西存在，我们只是将股票价格与股票代码发送出去； 我们下单组件里面 也没有任何与报价组件相关的代码，也就是说报价组件与订单组件，在彼此不知道对方存在的情况下，共同完成了一个股票下单的功能； 就向最开始图描述的东西一样 组件4根本不知道组件5的存在情况下，点4里面的按钮来触发5里面的一些功能，这就是中间人模式； 这样报价组件与下单组件就会有很高的重用性，我们在编写报价组件的时候，根本就不用考虑一会有个下单组件 要挂上；

### 非兄弟组件之间信息的传递

> 在上面的例子中我们使用了一个父组件appComponent来作为两个兄弟组件orderComponent、priceQuoteComponent的中间人,那么两个组件如果没有共同的父组件甚至不在同一时刻显示怎么办？ ----> 此时我们应该使用一个可注入的服务作为中间人，无论何时当组件被创建，这个中间人服务会被注入进来，然后组件可以订阅该服务发射的事件，在我们后面服务器通讯 我们会演示如何利用一个服务作为中间人

> 在我们使用angular开发一个应用前，我们应该首先设计好需要编写那些可以重用的组件，那些组件或服务用来做那些组件的中间人，组件的输入与输出，组件之间如何去通讯，将这些都考虑好之后，我们再去开始编写代码；angular在开始之前必须要去深入的思考如何设计的问题；

## 组件生命周期以及angular的变化发现机制

世界三大MOOC网站： Coursera、Udacity、edX 去找你需要的课程吧，小伙子
