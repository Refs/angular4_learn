# Advanced Angular Concepts by Alex Rickabaugh
> https://www.youtube.com/watch?v=rKbY1t39dHU

## The <ng-template> & template directives

Rather tan do it in kind of an abstrct way , we want to talk about a couple of problems that can make use of these api's for solution , that's designing a left navigation Ui , where the current route can actually control some of the content in the left and then disigning a image carousel ,so we're going to both of those and make use of <ng-template></ng-template> and template directive 

## Left Nav 

Left navigation is a pretty common UX pattern in application ;

This design has kind of a twist to it , because we want the route to be able to dictate some some of the content that shows up in the left nav right outside of the <router-outlet></router-outlet> , you can imagine like a flight search right, where you search for you put in your cities and that happens in the main pane and then these controls move move over to the left nav and kind exist there as long as you're on that route 

![](../images/leftNav.png)

We can do this with [innerHtml], we could have the route have some static HTML that it's going to send the service to the left nav and we just render it with an InnerHTML binding and that works if you want to accpet a couple different constraints , that HTML is static we can't have data binding , we also can't take any advantage of any angular components or directives . 

So we think a better is to use `Templates` for this and achieve the full power of angular . 

> `Templates are instructions on how to render `
So `template` kind of more formally is a chunk angular HTML that runs through ng see of ahead of time coplication and it gets turned those elements that you declare & the directive and the components and all the data binding gets turned into instructions to our view engine on how to render these things at the runtime 

> We mostly use `templates` indirectly with @Component 
Every template have a template and that template gets compiled and is used to display the components and so that looks kind of like this:

```ts
@Component({
    template: `
    <h1>This is a template</h1>
    <some-other-com *ngIf="showOther">...</some-other-cmp>
    `,
    ...
})

```

> there is a second kind of the template in angular and that is the <ng-template>
We can embed these in your component template and use them to do kind of more advanced things:

```ts 
@Component({
    template: `
        <h1>This is rendered with the component.</h1>
        <ng-template>
            <h2>This is a template. It's not rendered right away</h2>
        </ng-template>
    `
})

``` 

When we actually render the component that `<h2>` is nowhere to be found , it's not part of the instruction to display this <ng-component> and is keeping it for us on the side and we can tell it when and where we want to render that content;

![](../images/template.png)

The template even doesn't have to be in the same component that declares the template . One component can say I have this `h2` which is a template that I'm going have on the side and I'm sending it to some other component and render it once or even more times . `We're in complete control of where and when this content gets shown `

How do we do that ? Well in order send the template around from one component to another , we need a way to talk about it in code and with angular that's called a `templateRef`

A temlateRef is a reference a handle to the template which we can send , and we get the TemplateRef through a two-step process:

```ts
@Component({
    template:  `
        <h1> This is rendered with the component. </h1>
        <ng-template #myTemplate>
            <h2> This is a template. It's not rendered right away. </h2>
        </ng-template>
    `
})

```

* First of all , we have to give the template a name which is some way to refer to it and we do that with a `#myTemplate`
* Second, we can use the @ViewChild() to go and tell angular to query for it and angular will find that template for us and give us a reference to it in code 

If you done @ViewChild() before , you probably know we can't access this field in the constructor , it won't be set until a view exists . We do that by using the `ngAfterVIewInit` lifecycle hook. So once that hook fires ,that reference is okay and we can then go and use it to tranmit to leftNav , and left nav go ahead and render it ;

 ![](../images/left-nav.png)

 We're going to have routes and our routes will declare a template , then send them somehow to the left nav by a templateRef and the left nav will render it 

### View Containers

rendering a template and angular involves the creation of a view , a view is a rendered bit of html

you'd create views dynamically in angular with things called view containers which is a location in the Dom that lets you go ahead and instantiate templates or components insides of it . and it'll keep track of them to make sure change detection works and when it's time to remove them it knows how to do that 

> get a view container

we get a view container by indicting to angular where in the DOM , where in your component Dom you would like to be able to in sert things dynamically `#tag an element` and then query for it with `@ViewChild` . But there's one in particular that's really useful for it which is `<ng-container>`

`<ng-cotainer>` is kind of like an invisible div, it exists to organize your code , you can place other elements, other components inside the `<ng-container>` 

![](../images/container.png)

But at runtime when it's rendered , their children are rendered , but the container itself is non-existent in the runtime DOM .

We can actually place logic on this container, we can add *ngIf , *NgFor so we can repeat the section inside of it and that lets us kind of organize our code without resorting to a bunch of nested 

But the <ng-container> doesn't exist at runtime that makes it really nice for indicating that `here is a location in the Dom ` where I would like to be able to insert things later :

```ts
@Component({
    template: `
        <h1>The container is a placeholder between here</h1>
        <--! In between these two `<h1>`, we've declare a <ng-container> with a name so we can query for it , and then inside the class itself wo can go ahead do that  -->
        <ng-contianer #myContainer>
        <ng-contianer>
        <h1>and here</h1>
    `
})
export class MyComponent implements AfterViewInit {
    // Unlike with the template we have to tell angular we're actually interested in a ViewContainer , so please give us a ViewContainerRef
    // This is the action of asking for it , and tell angular `here is the location we want to be able to insert content at runtime `
    @ViewChild('myContainer', {read: ViewContainerRef}) 
    vcr: ViewContainerRef;

    // We wait for ngAfterViewInit then we can call the createEmbeddedView method , then pass it an TemplateRef , angular will go ahead and instantiate the template in the Dom 
    ngAfterViewInit(): void {
        // get a reference to a TemplateRef from somewhere
        const ref : EmbededViewRef = this.vcr.createEmbeddedView(someTemplate);
        // When it comes time to remove it ,we can actually get the reference returned from createEmbeddedView method and then destory it 
        // For example , when we navigate away from one route , we probably want to remove that rendered template , before the next route loads   
        ref.destroy();
    }
}

```

So above is our design , write an routes component we'll specify an <ng-template>, then we'll send that templateRef via a service over to the left nav and the left nav will use the view container to render it dynamically at runtime 

```ts
// in one Route component
export class SomeRoute implements NgAfterViewInit {
    @ViewChild('myTemplate') tmpl: TemplateRef;

    ngAfterViewInit() : void {
        this.navSerivice.setTemplate(this.tmpl);
    }
}

```

This is great , it will work . there is one problem with it and that's that it's actually pretty complex inside the route , we have to wait for the lifecycle event to communicate to the service and we have to repeat this code for every `route component` that's really not acceptable .

We want to find a way to abstract this logic into a service or a component or in this case we're actually put it in a directive 


### <ng-template> + Directives = template directive

So it turns out that if you combine templates and directives , you get this nice thing called a `template directive`  , we've used before because that is `*NgIf` ; 


```html

<div *ngIf = "!hide">
    <p> Hidden? </p>
</div>

<!-- 等于 下面 -->

<ng-template [ngIf]="!hide" > 
    <div>
        <p> Hidden? </p>
    </div>

</ng-template>


```

What angular is actually seeing is the code blower , so we're actually declaring a <ng-template> that's what * means in `*ngIf` and the <ng-template> has the directive on it , and the directive gets to control what happens to this template:  `does it  get rendered or not ` | `does it get sent to some other part of the application  ` so we can do the same thing 

Our directive has to get access to the template somehow , but we don't have a way to query for it . Because the directive is on the template itself , angular knows we can just inject it , angular will provide it for us .

So we can imagine we create a left nav directive that's used the same way , all it does is inject the templateRef and send it to our left nav component 

```ts
// *leftNav Directive
@Directive({selector: '[leftNav]'})
export class LeftNavDirective {
    constructor(tmpl: TemplateRef) {
        // send tmpl to left Nav component.
    }
}

```

We create a `*LeftNav Directive` that's used the same way . All it does is inject the templateRef and send it to our leftNav component , and then all we have to do in the route component is actually annotate some content within leftNav and that content will automatically get rendered in the left nav instead of in the <router-outlet> . That's much easier to use especially for someone who doesn't understand how all this works , if you have other developers on your team who weren't part of building this system , they just want to be able to use it , this is really nice API

```ts
// route component
@Component({
    template: `
    <h1> This is the route content. </h1>

    <div *leftNav>
        <h2> This content shows up in the left nav. </h2>
    </div>

    `
})

export class SomeRoute {}

```






## Designing a image carousel

> 自己若真想 自己来，需要使用 rxjs 的operator --- timer interval  ，  angular 一般都是 靠 rxjs 来驱动的；要有使用 rxjs 的意识； 

> https://stackblitz.com/edit/adv-ng-carousel?file=app%2Fcarousel.directive.ts

In particular we want to design a directive that implements the logic of the carousel , we leave the UI up to the user , we only want to encode the mechanism of the carousel , let the user figure our how they want to display images , how the want to reat to next or previous events . So let's start by sketching this :

```html
<!-- we want to implement a directive called carousel , it's going to be a template directive, and the user is going to provide the template.  -->
<!-- The template will be the actual UI of the carousel , so the user decide how to render it right , we're going to have an image and a button to navigate next or previous  -->
<!--  We have a couple of questions here we have to answer . How the carousel get the its input ? How does it know what the the list of images that it want to loop over ? How the template know what the current url is ?  When something happens where we decide to advance carousel and how do we tell it to do that ?   -->
<div *carousel="?" >
    <img [src] ="? " >
    <button (click) ="?" > Next </button>
</>

``` 

To answer above questions we can actually turn another built in angular directive called *ngFor , we use it so often that probably don't even think about the fact , it is kind of weird(奇怪) as far as directive go. Most binding to angular happen to an expression which produces a single value , this one has some syntax in there we have multiple identifiers , so it's kind of interesting and this is actually a feature of template directive called micro syntax  

![](../images/ngfor.png)

```ts 
// We have to identifiers here as I mentioned and they're serving very different purpose 

// On the right we have values , which is a list of value that we're passing in that we want ngFor to iterate over and that's actually the @input property of the directive 

// the identifier on the left value is completely different , it's actually a variable declaration right , we're taking some value out of the directive that we can bind to or display inside our template 

*ngFor = " let value of values "

```  

![](../images/ngforof.png)

On the right we have this 'of' keyword and it turn out the 'of' is not actually a keyword , it's the things called a binding key and what the angular is actually do is combining the name the name of the directive which is 'ngFor' with the binding key 'of' and creating a synthetic(合成) binding to an input . So as if we just wrote '[ngForOf]' is bound to values `@Input('ngForOf') <--> values` , `[ngForOf] = 'values'` 

We can even take this to an extrame  and imagine recreating an entire sql query inside inside of a template directive :

```bash
#
*sql = "let row selectFrom 'table' where cond orderBy 'foo' limit 10 "
```

 Here we have a binding key `selectFrom` which will be bound to the table , we have a binding key `where` which is bound to a condition function , orderBy and limit all of these would become inputs sql query form , sql where , sql orderBy , you can get very expressive in the domain specific language or DSL  that you can create inside you template directives . so we will do that with the carousel

 ```html
 <div *carousel="let source from images">
     <img [src] = "source">

     <button (click)="?">Next</button>

 </div>
 
 ```

 Let imagine our carousel has the syntax `let source from images`, so the `images` is the array we want to iterate over and source will be the URL coming out that we want to bind to . How do we implement something like this :

 ```ts
 @Directive({ selector: '[carousel]' })
 export class Carousel {
     @Input('carouselFrom') images: ImageEntry[];
 }
 
 ```

 Inside our directive we need an @input , input is the name of the directive plus the binding key so it'll be `carouselFrom` 
 
 ```ts
 @Directive({selector: '[carousel]'})
 export class Carousel {
     @Input('carouselFrom') images: ImageEntry[];

     ngOnInit(): void {
         this.vcr.createEmbededView(this.tml, {
             source: images[0].source,
         })
     }
 }
 
 ```
 
We create our embedded view of the template that the user will give us , we pass out a `context` and the context contains all these properies that we want to make available for binding in the template. But there is a problem here `we actually don't know want variable name the users going put .  ` we said `let source from images ` they could said `let url from images `

```ts
@Directive({selector: '[carousel]'})
export class Carousel {
    @Input('carouselFrom') images: ImageEntity[];

    ngOnInit(): void {
        this.vcr.createEmbeddedView(this.tml, {
            $implicit: images[0].source,
        })
    }
}

```

So actually  we they say let source,  there's some hidden syntactic sugar going on here. They're actually saying `*carouse = let source = $implicit ` let source equal property called $implicit. So it's @implicit that we actually want to provide as part of the context .  

 And we can provide other things as well , so for example we could imaging the user invokes the carousel this way `*carousel = let source from images; let ctrl = controller >` , and ontroller is a property that we're going to pass out out of the *carousel in to the template, and it'll have methods like next(), previous() and actually be able to interact with the carousel and tell it what todo 

```html
<div *carousel = "let source from iamges; let ctrl = controller">
    </img [src] = "source">
    <button (click) ="ctrl.next()"> Next </button>
    
</div>

```

Here is our final solution to this, we have a div with the *carousel , `remember * means a template`, so every thing inside of it will be passed as a template to the directive . `let source from images` so source is the current url , it's a variable coming out. `images` passes in an input binding to the carousel giving it the list of images to iterate over . We also need another variable coming out  `let ctrl` which is going to equal to the context controller property that we've passed out. 

The ctrl let us reat to for example the button click , so we can say control.next() and that will in theory advance the carousel (促进carousel 向前走一侦) to the next image :

```ts
@Directive({selctor: '[carousel]'})
export class Carousel {
    @input('carouselFrom') images: ImageEntity[];
    ngOnInit(): void {
        this.vcr.createEmbededView(this.tmpl, {
            $implicit: this.images[0].source,
            controller: {
                next: () => this.next()
            }
        })
    }
    next():void {...}
}

```

We have a `carouselFrom` @input, we create an embedded view , we pass the $implicit to indicate what the current url is . When we pass this controller object which has a function on it that knows how to advance the carousel .

So that we build an image carousel as a template directive 

## How to stop an interval on an Observable in RxJS

> https://stackoverflow.com/questions/46963486/how-to-stop-an-interval-on-an-observable-in-rxjs

carousel 的 url 切换事件出发，以及 启动 停止 ， 各种事件的相应 都是靠 rxjs 来控制的；要有这种控制的意识，这是一个流的控制；
setInterval clearInterval 等 原来 js 里面的操作，都可以利用 rxjs 来操作；

## 关于 template directive 的拓展与补充； 很精彩！

> https://blog.mgechev.com/2017/10/01/angular-template-ref-dynamic-scoping-custom-templates/