# chapter4 依赖注入

> angular 如何自动处理对象的创建过程，也就是依赖注入，任何一个angular程序，都是一堆组件、指令、以及一堆彼此依赖类的集合，虽然每个组件都可以明确的实例化自己的依赖，但是angular提供了一种依赖注入的机制，来完成这个工作。以阿里注入事一种设计模式。

> 自由当我们理解了，什么是依赖注入的模式之后，我们才可能写出可重用的组件；而只有当我们写出可以重用的组件之后，我们才能真正叫做会使用angular框架了；

## 什么是依赖注入的模式，使用依赖注入的好处

### 依赖注入: Dependency injection 简称DJ

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
> 控制反转与依赖注入是一体两变，表达的是一个思想 控制反转侧重于描述目的，即目的是将依赖的控制权从代码的内部转移到代码的外部，而依赖注入则侧重于描述手段即如何去实现控制反转，使用的手段就是依赖注入；实现了控制反转模式的框架成为IOC(inversion of control)容器；而angular 框架就是一个IOC容器，angular实现控制反转的手段就是依赖注入

### 使用依赖注入的好处

 简单来说依赖注入会让我们以一种松耦合的方式来编写代码，是我们的代码可测性与可重用性更高

 #### 一、松耦合和可重用
 假设我们有一个商品组件ProductComponent，在组件中我们要 使用一个商品服务 productService 来获取商品信息，如果没有依赖注入，在组件里面我们需要知道如何去实例化ProductService,有很多的方式可以做到这一点:

 ```ts
 var productService = new ProductService();
 ```
 但不论使用哪一种方式，我们的ProductComponent组件`将与ProductService类紧密的耦合在一起`；如果我们想在另外一个项目中重用ProductComponent组件，但我们要使用另外一个不同的服务对象来获取我们的商品信息，我们必须要修改ProductComponent组件代码中`var productService = new ProductService()` 将其改成：

 ```ts
//  用另外一个商品服务对象，来获取信息；
 var productService = new AnotherProductService();
 ```

 这代码我们的商品组件ProductComponent和商品服务ProductService是紧密的耦合在一起的，如果我们想在别的项目中使用商品组件，必须要改商品组件中的代码才可以去使用；而依赖注入可以解除ProductComponen组件与ProductService服务之间的这种紧耦合关系；从而可以使我们在不同的项目之中重用ProductComponent组件；而不用去修改其代码；

```ts
@NgModule({
    // 在angular中我们可以通过指定providers,来告诉angular那些对象需要进行依赖注入; 因为providers是一个数组 数组中的每一个元素称为provider; 一个provider定义了一个对象在被注入到对象或指令之前如何实例化：
    /*providers: [ProductService]等价于： 
    * providers:[{provide:ProductService, useClass:ProductService}]
    *上面一行代码涉及到angular的一个概念:token;一个token代表一个可被注入的对象的类型；token的类型有provider的配置对象的provide属性来决定；
    * 所以上面一行代码的意思是：注册一个类型是ProductService的token, 当有组件或指令声明自己需要一个类型为ProductService的token时，实例化一个ProductService, 并将其注入到目标对象；
    * 而组件或指令是如何声明自己需要一个类型为ProductService的token？就是用其构造函数：`constructor(productService: ProductService) {}` 意思就是我需要一个类型为ProductService的token;
    * angular 看到上面的声明之后，其就会去声明的providers数组中去找`{provide:ProductService, useClass:ProductService}` ProductService这个类型的token 对应的类是哪一个（useClass所指定的类）；
    * 然后angular会将useClass指定的类ProductService实例化，并注入到`constructor(productService: ProductService)`中的productService参数中（如requireJs一致）
    * ProductComponent组件本身并不知道传进来的是Productservice类的那个实现，更不需要明确的实例化这个ProductService类，其只需要去使用angular为它创建好的productService对象，并调用其getProduct()方法就可以了；
    * 如果我们想在其它的项目中去重用ProductComponent组件，而另外项目中有一个实现了ProductService的类，我们可以修改其@NgModule()中 providers的声明：
    * providers:[{provide:ProductService, useClass:AnotherProductService}]意思是我要注册一个类型是ProductService的token,当有组件或类声明”我需要ProductService“时，那么我就实例化一个AnotherProductService; 并将其注入到component组件里面；而ProductComponent组件本身并不需要任何的修改；
    * 这样就消除了ProductComponent与ProductService之间的紧耦合关系，从而提升了ProductComponent组件的重用性；
    * 这是使用依赖注入的第一个好处，松耦合与可重用；
    */ 
    providers: [ProductService]
    ...省略其它配置
})
export class AppModule {}

@Component({
    ...省略组件配置
})
export class ProductComponent {
    product: Product;
    constructor(productService: ProductService) {
        this.product = productService.getProduct();
    }
}

```
### 二、可测试性 

> 当真实的对象还不可以使用的时候，我们可以很方便的注入一个虚拟的对象，来测试我们组件；假设我们需要为我们的应用添加一个登陆功能；

![注入测试](../images/angular_injection.png)

* 我们可以创建一个LoginComponent来让用户填写用户名与密码；Login组件需要依赖一个Login服务,而Login服务应该链接一个身份认证服务器，并且检查用户提供的用户名与密码是否时正确的。但身份认证服务器时另外一个部门开发的并且现在还没有开发好，而我们已经将Login组件开发好了，但因为前面描述的无法控制的原因，导致我们没法去测试；而这时依赖注入可以帮我们很方便的去解决这个问题；

* 我们可以去创建一个MockLoginService, 这个服务并不会真正的去链接认证服务器，而是硬编码一段逻辑来判别是否可以登陆，譬如只有用户名是admin,密码是1234的时候才可以去登陆，其它情况都返回用户名与密码错误；

* 使用依赖注入将MockLoginService注入到LoginComponent组件，而不需要等真正的认证服务器开发完过一段时间；而当真正的认证服务器开发完成，我们只需要修改一行前面我们提到的代码`providers:[{provide:ProductService, useClass:AnotherProductService}]`就可以让angular注入真正的LoginService服务；

* 这就是使用依赖注入的另外一个好处提高可测试性；



## angular的依赖注入的实现：注入器与提供器 
> 通过实例展示angular事如何实现依赖注入模式的，编写一个可注入的服务。以及如何将该服务注入到其它的组件；我们会尝试将组件依赖的服务，替换成为另外一个实现；在这个过程中我们会发现，使用angular的依赖注入会有多么的方便；如直接实例化依赖的方式相比较， 使用依赖注入我们只需要使用一行的代码；

### 注入器

> 每一个组件都有一个注入器实例 负责注入组件需要的对象， 注入器是angular提供的一个服务类，一般情况下我们不需要直接去调用注入器的方法，注入器会自动的通过组件的构造函数，将组件所需要的对象注入到组件之中

```ts
constructor(private productService: ProductService){..}

```



## 注入器的层级关系