# chapter4 依赖注入

> angular 如何自动处理对象的创建过程，也就是依赖注入，任何一个angular程序，都是一堆组件、指令、以及一堆彼此依赖类的集合，虽然每个组件都可以明确的实例化自己的依赖，但是angular提供了一种依赖注入的机制，来完成这个工作。以阿里注入事一种设计模式。

> 自由当我们理解了，什么是依赖注入的模式之后，我们才可能写出可重用的组件；而只有当我们写出可以重用的组件之后，我们才能真正叫做会使用angular框架了；

## 什么是依赖注入的模式，使用依赖注入的好处

依赖注入: Dependency injection 简称DJ

```ts
//1.1假设我们写一个方法，方法的参数是一个对象，当我们调用该方法时，我们需要将该对象实例化，并将其传递给方法，假设我们的在线竞拍程序，发货中心，负责将我们买的的商品发给我们，那么在程序中我们可能去编写以下的代码；

//1.2 new一个商品，商品的信息在Product构造函数的参数里面
var product = new Product();
// 调用createShipment方法，将实例后的额商品传递到方法里面，将商品发送出去；
createShipment(product);

//1.3 createShipment()方法需要一个已经存在的class Procduct类的实例，换句话说createShipment()方法依赖Product这个类；creatShipment()方法本身并不知道如何去创建一个product实例；调用createShipment()方法的代码需要以某种方式来创建product实例，并将该product对象作为参数传递给createShipment方法;-->我们将实例化的对象传递给这个方法 也可以称为注入到这个方法中。

```

```ts
// 2.1 加入我们现在需要将Product类，换成Product的一个子类MockProduct 在我们的例子中，你只需要改一行代码：
var product = new MockProduct();
createShipment(product);

// 2.2 但是如果createShipment()方法需要三个参数，如发货的时候我除了需要知道商品的信息，还需要知道快递公司的信息，还需要知道订单的信息，而每个对象又有自己的依赖：如订单信息里面又有一个地址信息对象，那我们的代码就有可能会变成如下的样子：

// 商品信息
var product = new Product();
// 快递公司信息
var shipCompany = new shipCompany();
// 地址信息
var address = new Address();
// 订单信息
var order = new Order();
// 订单信息依赖地址信息
order.setAddress(address);
// 发货方法依赖商品信息，快递公司信息，订单信息
createShipment(product,shipCompany, order);


// 2.3 上面代码中有大量的手工实例化的代码，那么能不能有人帮我们创建createShipment()方法所依赖的对象，以及这些对象所依赖的对象，而我们只需要写一句createShipment(product, shipCompany,order)代码，而上面的东西，别人已经帮我们创建好了 ---- 而这就是依赖模式所要解决 的问题：
// 2.3 如果一个对象A 依赖一个 类型为B 的对象，那么对象A 不需要明确的去实例化B（var b = new B()），b会由外部的机制注入进来，对象A只需要声明： ”我需要一个B类型的对象，谁能给我一个么？“  这就是依赖注入要去解决的问题，

```
```ts

// 3.1 与依赖注入通常同时出现的另外一个概念，叫做控制反转 inversion of control 简称IOC; 控制反转的意思的将依赖的控制权从代码的内部，转到代码的外部，
// 3.2 如下方式编写代码，代码对外部的依赖，是由代码的内部来决定的；var product = new Product(); 这行代码 决定了我们的代码依赖Product , 如果我们想让依赖由Product改为MockProduct 我们就需要修改方法内部的代码，将上面一行代码改掉改为var product = new MockProduct(); 
// 3.3 如果实现了控制反转，则内部代码只需要声明:"我需要Product" 至于传进来的 至于传进来的是Product 还是 Product的子类 MockProduct是由代码的外部来决定的，这是代码的控制权由代码的内部转移到了代码的外部，这就是控制反转；
var product = new Product();
createShipment(product);

```

## 介绍angular的依赖注入的实现：注入器与提供器 
> 通过实例展示angular事如何实现依赖注入模式的，编写一个可注入的服务。以及如何将该服务注入到其它的组件；我们会尝试将组件依赖的服务，替换成为另外一个实现；在这个过程中我们会发现，使用angular的依赖注入会有多么的方便；如直接实例化依赖的方式相比较， 使用依赖注入我们只需要使用一行的代码；

## 注入器的层级关系