# angular表单处理

> html提供了一系列基本的表单功能: 显示表单项、校验用户输入的值、将表单数据提供到服务器上的某一个服务器地址上面去; 但是html表单对于真实世界的业务逻辑来说并不足够， 我们需要更好的方式来处理用户输入的数据，自定义一系列校验规则，显示对用户来说友好的错误信息、并可以去选择服务器提交到后台的方式与格式；
> 在对一个系统做web框架的技术选型的时候，如何处理表单应该是最重要的考虑因素之一；我们将描述一组现代的web应用应该满足的用户体验需求，并且看一下标准的html表单与angular是如何支持这些体验的；

> 我们可能会感觉奇怪，如果html已经给我们提供了表单校验， 和提交的功能；对于表单来说，除了框架给我们提供了数据的双向绑定，我们还希望框架给我们提供什么喃？

## 纯html表单

<form action="/registry" method="post">
    <div>用户名：<input type="text"> </div>
    <div>手机号：<input type="text"> </div>
    <div>密码：<input type="password"> </div>
    <div>确认密码：<input type="password"> </div>
    <div><button type="submit">注册</button></div>
</form>

> 对于一个spa单页面程序来说，纯的html表单不能满足我们的要求，一般情况下我们需要我们的表单具有以下的功能：

* 第一： 每一个输入的字段 都应该可以独立的指定一系列的校验规则；
* 第二： 如果用户的输入不符合校验规则，则应该在出问题的输入框旁边，显示错误信息；
* 第三： 彼此依赖的字段（输入密码与再次输入密码），应该被一起校验
* 第四： 应用应该可以控制，提交到服务器表单中的值；也就是说当点击按钮的时候，应用应该去调用一个事件处理方法，将表单中的数据，传给此方法； 这个方法可以在服务器数据，真正被发送到服务器之前，校验这些数据的合法性，或者去改变这些数据的格式，
* 应用 应该可以控制这些数据，是如何被提交到数据库之中的；可以是一个http请求，也1可以是一个ajax异步的请求，也可以是一个web socket消息

### angular两种表单

> 在angular中存在两种不同的表单处理方式，一种的模板驱动方式我们简称模板式，另一种是响应式编程的方式我们简称响应式；在angular中这两种方式 表现成两种不同的api：

* 模板式表单： 表单的数据模型时通过组件模板中的相关指令来定义的，因为使用这种方式定义表单的数据模型的时候，我们会受限与HTML语法，所以模板驱动的方式只适合用于一些简单的场景。

* 响应式表单： 使用响应式表单时，我们通过编写Typescript代码而不是HTML代码来创建一个底层数据模型，在这个模型定义好之后，我们使用一些特定的指令，将模板上的html元素与底层的数据模型连接在一起；

> 两种表单的区别

1. 不管时那种表单，都有一个对应的数据模型来存储表单的数据。在模板式表单中，数据模型是由angular给予你的组件模板中的指令 隐式创建的。 而在响应式表单中，你通过编码明确的创建数据模型，然后将模板上的html元素与底层数据模型连接在一起； 
2. 数据模型并不是一个任意的对象，它是一个由angular/forms模块中一些特定的类，如FormControl、FormGroup、FormArray等组成。在模板式表单中，你是不能直接访问到这些类的；而在响应式表单中我们要去直接用这些类去写代码；
3. 响应式表单并不会替你生成HTML,模板仍然需要你自己来编写。
4. 不管使用哪一种表单都应该在angular中引入相应的表单模块 FormsModule（模板式表单） ReactiveFormsModule（响应式表单）


## 模板式表单

> 使用指令来定义数据模型，有那些指令可以使用喃？NgForm、NgModel、NgModelGroup指令；这些指令都来源于FormsModule模块；

### NgForm  

> NgForm指令用来代表整个表单，在angular应用中 其会被`自动的`添加到每一个<form>标签上面，即默认的情况下angular会为<form>标签挂一个NgForm指令，然后其就会将整个form的处理给接管了，也就是我们写在form上的`<form action="/registry" method="post">`action与method都没有用了， 即我们若此时再去点击页面上的submit按钮其是什么反应都没有的；

NgForm指令：其隐式的创建了一个FormGroup类的实例，FormGroup类用来代表表单的数据模型，并且存储表单的数据；标有ngForm指令的html标签，`会自动发现其所有标有ngModel指令的子元素，并将他们的值自动添加到表单的数据模型中`；

> 需要注意的地方：

1. ngForm标签可以在<form>标签之外使用：`<div ngForm></div>`等同于`<form></form>`
2. 如果我们不希望由angular来自动处理我们的表单，我们需要在<form>标签上明确的添加ngNoForm指令，则angular就不会去接管这个表单，即其行为会是一个标准的html行为

> 两个特性

![](../images/ngForm.png)
1. ngForm指令可以被一个模板的本地变量所引用，以便在模板中去访问ngForm对象的实例
2. ngForm指令会拦截标准的html表单数据提交事件，阻止表单的自动提交，因为表单的自动提交会导致页面刷新，而我们是一个单页应用页面是永远不刷新的； angular会利用一个自定义的叫ngSubmit的事件来代替表单的提交；

```html

<!-- 我们可以利用事件绑定语法来绑定angular提供的onSubmit事件，将器绑定到组件的自定义方法上来处理，并且使用模版变量#myForm.value属性将表单的值传输给方法 -->
<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm.value)">
    <div>用户名：<input type="text"> </div>
    <div>手机号：<input type="text"> </div>
    <div>密码：<input type="password"> </div>
    <div>确认密码：<input type="password"> </div>
    <div><button type="submit">注册</button></div>
</form>

<div>
    {{myForm.value | json}}
    <!-- 此时在渲染出来的浏览器页面上，无论我们在上面输入框中怎么输，下面对象输出的json里面都不会发生变化，也就是我们输入的值并没有反应到对象上面，这是因为我们的input标签上都没有标注ngModel指令，而FormGroup类的实例会自动发现标有ngModel -->
</div>

```   


### NgModel 除了数据的双向绑定，还用来标注一个html元素，应该成为表单数据模型的一部分；

在angular的表单api中，ngModule指令代表表单中的一个字段，该指令会为其附着的input隐式的创建FormControl对象的实例 代表字段的数据模型，并利用FormControl这个模型 来存储字段的值；

需要注意的是， 在标有ngForm指令的html元素内（form表单的子元素上），使用ngModel指令的时候是不需要使用方括号或这小括号将其括起来的，也不用去指定将ngModel绑定到组件的某一个属性上 直接写一个ngModule就可以了； 但是我们需要为指定了ngModule指令的元素去指定一个'name'属性； name属性的值会成为ngForm.value对象上面的一个属性；

与ngForm指令类似，ngModule指令创建的对象也可以通过一个模版变量来引用， 并通过模版变量的value属性来访问字段的值，

```html
<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm.value)">
    <div>用户名：<input #username="ngModule" ngModule name="username" type="text"> </div>
    <div>手机号：<input type="text"> </div>
    <div>密码：<input type="password"> </div>
    <div>确认密码：<input type="password"> </div>
    <div><button type="submit">注册</button></div>
</form>

<div>{{username.value}}</div>

```

### NgModelGroup

NgModuleGroup代表的是表单中的一部分， 器允许我们将一些表单的字段组织在一起形成更清晰的层次关系，与NgForm指令类似NgModuleGroup指令 也会创建一个FormGroup类的实例，这个对象会在NgForm.value的对象中表现成为一个嵌套的对象即 NgModuleGroup的子属性，都会变成嵌套对象的子属性

```html
<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm.value)">
  <div NgModuleGroup="userInfo">
    <div>用户名：<input #username="ngModule" ngModule name="username" type="text"> </div>
    <div>手机号：<input type="text"> </div>
  </div>
    <div>密码：<input type="password"> </div>
    <div>确认密码：<input type="password"> </div>
    <div><button type="submit">注册</button></div>
</form>

<div>{{username.value}}</div>

<!-- 
    {"userInfo":{
        "username": ""
    }} 即形成了一个嵌套的关系
 -->

```
### 实例

```html
<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm.value)">
    <div>用户名：<input ngModule name="username" type="text"> </div>
    <div>手机号：<input ngModule name="mobile" type="number"> </div>

    <!-- 由于两个密码字段是联动的，最终我们提交的时候也只会提交其中一个字段， 所以很自然的我们应该将他们放到一个group中去 -->
    <!-- 这样当我们在做校验的时候，我们可以利用一个叫 passwordsGroup的对象，来方便的处理所有密码相关的字段 -->
  <div ngModelGroup="passwordsGroup">
    <div>密码：<input ngModel name="password" type="password"> </div>
    <div>确认密码：<input ngModel name="pconfirm" type="password"> </div>
  </div>

    <div><button type="submit">注册</button></div>
</form>


```

### 模版式表单的总结

在上面的例子中，我们模版表单的数据模型是由模版中的指令来控制的，angular给<form>标签自动的添加了一个NgForm 指令，创建了一个FormGroup对象


## 响应式表单

与模版式表单不同，创建一个响应式表单需要两步： 首先我们需要编码来创建一个数据模型，然后我们需要使用指令 将模版中的html元素连接到数据模型上面

### 创建一个数据模型

数据模型指的是用来存储表单数据的数据结构，简称模型；它由angular定义在forms模块中的三个类组成： Formcontrol FormGroup FormArray

1. FormControl:  构成表单的基本单位，通常情况下代表一个input元素，但是其也可以代指一个更复杂的Ui组件，如 日历  下拉选择框， FormControl保存着与其关联的html元素当前的值以及元素的校验状态、元素是否被修改过等信息，

> 创建一个formcontrol的实例

```bash
ng g component reactiveForm
```

```ts
// reactive-form.component.ts中
export class ReactiveFormComponent implements OnInit{
    // FormControl的构造函数会接收一个参数，这个参数是用来指定FormControl的初始值； 如下面传参'aaa’ 若我们将实例化过的username与页面上的<input>连接之后，则<input>的初始值就是'aaa'
    // 模版式表单中的ngModel指令实际上就是为其附着的<input>创建一个FormControl的实例
    username: FormControl = new FormControl('aaa');
}

```

2. FormGroup

FormGroup即可以代表表单中的一部分，也可以用来代表整个表单，其是多个FormControl的集合，其将多个FormControl的值与状态聚合在一起；

在表单校验中，如果FormGroup中的其中一个FormControl是无效的，则整个FormGroup就是无效的，在管理表单多个相关联的字段的时候，FormGroup是很方便的，如：一个日期范围在表单中一般会表现为两个input字段，一个起始日期与一个截止日期，则这两个input就可以被放到同一个 FormGroup里面，这样当两个日期字段中的任何一个值无效的时候都会显示一个错误的信息；

```ts
// reactive-form.component.ts中
export class ReactiveFormComponent implements OnInit{
    username: FormControl = new FormControl('aaa');

    // FormGroup的构造函数 接收一个对象，
    formMdel: FormGroup = new FormGroup({
        // 在这个FormGroup的实例中 存有两个字段(FormControl的实例)，一个是from一个是to；
        from: new FormControl(),
        to: new FormControl()
    })
}

```

3. FormArray

FormArray与FormGroup  类似，但是其有一个额外的长度属性， 一般来说FormGroup用来代表整个表单，或者表单字段的一个固定的子集，而FormArray通常是代表一个可以增长的字段的集合； 举例说： 表单中我们可能会有email的一块区域，一个用户可能会有多个email,这个时候我们就可以使用FormArray来让用户去输入，任意数量的email的地址

```ts
// reactive-form.component.ts中
export class ReactiveFormComponent implements OnInit{
    username: FormControl = new FormControl('aaa');

    formMdel: FormGroup = new FormGroup({
        from: new FormControl(),
        to: new FormControl()
    })；

    // FormArray的构造函数接收一个数组，数组中的每一个元素都是一个字段， 
    emails:FormArray = new FormArray([
        // 字段的构造函数中接受的参数就是字段的初始值；
        new FormControl('a@a.com')，
        new FormControl('b@b.com')
    ])
    // 值得一提的是FormArray与FormGroup不一样的地方在于，前者的字段FormControl是没有一个相关的key的，我们只能通过序号来访问FormArray中的元素；
}

```

### 响应式表单指令

响应式表单使用了一组与模版式表单完全不同的一套指令，这些指令都来源于ReactiveFormsModule 模块

在下面的表单中第二列是使用`属性绑定`中使用的指令，指令的名称与类名相同，首字母小写，需要注意FormArray是不能使用属性绑定指令来绑定； 第三列是可以属性名字来连接数据模型与dom元素的

|    类名     |    指令1    |      指令2      |
|:-----------:|:-----------:|:---------------:|
|  FormGroup  |  formGroup  |  formGroupName  |
| FormControl | formControl | formControlName |
|  FormArray  |             |  formArrayName  |


> formControlName必须声明在一个FormGroup之内，来链接FormGroup中的FromControl和页面上的Dom元素；
> formArrayName与FormControlName一样 必须用在 formGroup这样一个指令范围之内；
> formControl 在响应式表单中 `不能用在`FormFroup的里面，而只能使用在FormGroup外面而单独的和一个input字段 绑定在一块



```html
<input [formCont rol]="username" >
<!-- 但是在后台中username属性 并不在表单的数据模型里面； -->
<!-- 而若想将username放到 表单的数据模型里面去，那么绑定的时候，我们要将其放到模板的 FormGroup里面去 -->
<form [formGroup]="formModel" (submit)="onSubmit">
    <!-- 但是我们绑定的时候，就不能使用如下的方式去绑定， -->
    <!-- <input [formControl]="username" >    -->
    <!-- 在formGroup内部使用formControlName来单独绑定一个字段； -->
    <input formControlName="username">
    
</form>

```

> 需要注意的点：

1. 响应式表单所有的指令都是以form开头的，所以我们可以很容易通过查看组件的模版，来区分表单的处理方式 是模版式表单还是响应式表单；
2. 与模版式表单不同 响应式表单中的这些form开头的指令是不可以引用的，也就是不能使用`<form #myForm="ngForm">`的方式通过自定义模版本地变量来引用指令的实例，在angular中 其是故意这么做的，目的是明确的区分这两种表单的处理方式： 
    + 前面说的模版式表单中，我们是不能访问数据模型相关的类的，在组件的事件处理方法中不能拿到FormControl、FormGroup 、FormArray的引用，我们只能拿到表单最终的一个数据（由模版通过事件参数传递）； 但是我们可以在模版中 通过模版的本地变量来操作 数据模型的实例
    + 在响应式表单中，我们可以去直接去访问数据模型的相关的类，但是由于它们是不可以被本地变量所引用的，我们是不可以在模版中去操作数据模型的，只能在代码中去操作，所以这两者是完全相反的： 一个是只能在模版中操作，一个是只能在代码中去操作；


```html
<!-- reactive-form-html中 -->

<!-- 2. 在模板中使用formGroup指令，绑定后台的FormGroup类对象的实例 ； 绑定后整个表单的处理方式，就变为了一个响应式表单的处理方式 ->3 -->
<!-- 3. 表单的提交 是利用dom元素自带的submit事件属性，绑定到后台的handler方法中去处理 ->4 -->
<form [formGroup]='formModel' (submit)="onSubmit()" > 
    <!-- 5.1 利用formGroupName指令去链接一个FormGroup -->
    <!-- 5.3 在模板中使用formGroupName指令去绑定后台自定义的FromGroup的实例dateRange -->
    <div formGroupName="dateRange">
        <!-- 6. formControlName必须声明在一个FormGroup之内，来链接FormGroup中的FromControl和页面上的Dom元素 -->
        <!-- 6.1  formControlName的值依然是一个字符串（属性的名字），所以不要使用属性绑定语法-->
        起始日期：<input type="date" formControlName="from">
        截止日期：<input type="date" formControlName"to" >
    </div>
    <div>
        <!-- formArrayName与FormControlName一样 必须用在 formGroup这样一个指令范围之内；下面是在最外层的 formGroup指令下面-->
        <ul formArrayName="emails" >
        <!-- 前面我们已经说过FormArray中的FromControl没有key，只有顺序号，所以一般情况下 我们会与ngFor指令阿里一起使用forArrayName指令 -->
            <li *ngFor="let e of this.formModel.get('emails').controls; let i=index;" >
                <!-- 在 字段中我们使用formControlName 将其与循环下标绑定在一块，注意此处需要使用属性绑定的语法 -->
                <input type="text" [formControlName]="i">
            </li>
        </ul>
        <button type="button"  (click)="addEmail()">增加email<button>
    </div>
    <div>
        <button type="submit">保存</button>
    </div> 

</form>

```

> `<form [formGroup]='formModel' (submit)="onSubmit()" >  <div formGroupName="dateRange">` 这里需要注意的 formGroup绑定的是后台的一个属性，所以要使用属性绑定的方括号的语法；而formGroupName的值是一个字符串，所以不要使用属性绑定语法，直接使用属性名称的字符串就可以了；

> `<form>`标签默认时被angular模板式表单中中的ngForm指令来接管的，而在reactive 表单中 我们要让FormGroup去接管；通常情况下我们会利用绑定到`<form></form>`标签的FormGroup对象来代表整个表单，

```ts
// reactive-form-component.ts中

export class ReactiveFormComponent implements OnInit{
    //1.  创建一个FromGroup类的对象的实例formModel,用以表示整个表单的数据，在页面上使用上表中介绍的formgroup指令 ->2
    formModel: FormGroup = new FormGroup({
        //5.2 首先我们要在组件中去声明一个FormGroup
        dateRange: new FormGroup({
            from: new FormControl(),
            to: new FormControl()
        }),

        emails:  new FormArray([
            new FormControl('a@a.com')，
            new FormControl('b@b.com')
        ])
    })；
    
    username: FormControl = new FormControl('aaa');


    constructor(){
        
        
    }
    
    ngOnInit (){
        
    }
    
    onSubmit(){
        //4.  在handler中 将此时的扁担数据模型 打印出来；
        console.log(this.formModel.value);
    }

    addEmail(){
        let emails = this.formModel.get("emails") as FromArray;
        emails.push(new FormControl());
    }
} 

```

> `总结：` 所有的指令都是以form开头的，如果指令以Name结尾， 则不需要使用属性绑定语法的方括号，只需要指定属性绑定的名字； 反之则需要使用属性绑定的语法，绑定到一个属性上；  以Name为结尾的属性,只能使用在FormGroup覆盖的范围之内， 反之第二列不能用在内部；

### 响应式表单的重构

```html
<!-- 纯html的表单  -->

<form action="/registry" method="post">
    <div>用户名：<input type="text"> </div>
    <div>手机号：<input type="text"> </div>
    <div>密码：<input type="password"> </div>
    <div>确认密码：<input type="password"> </div>
    <div><button type="submit">注册</button></div>
</form>

```


```ts

// reactive-form-component.ts中 构建表单的数据模型；

export class ReactiveFormComponent implements OnInit{

    formModel: FormGroup;

    constructor(){
        this.formModel = new FormGroup({
            username: new FormControl(),
            mobile: new FormControl(),
            passWordsGroup: new FormGroup({
                password: new FormControl(),
                pconfirm: new FormControl()
            })
        })
    }

    ngOnInit() {}





    
} 

```






