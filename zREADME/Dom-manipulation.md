# Implementing advanced DOM manipulation scenarios

> https://www.youtube.com/watch?time_continue=1036&v=vz9cNCkaPsY

## Dom  operations categories

1. Modifying Dom element properties

* classList.add()
* setAttribute()
* style.setProperty()

2. Modifying Dom hierarchy

* createrElement()
* Remove()
* appendChild()
* removeChild()

> In angular there are specific tools for each of these type of operations. Will start with the tools that angular peovides for us with working with existing elements peoperties 


## Modifying Dom element properties 

###. task 1 (t1a branch)

```ts
/* app.component.ts */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<span #el>I want to be green</span>`,
  styles: ['[highlight] {color: green}']
})
export class AppComponent {
}

```

The task is we have one span element in the Dom and what we want is we want to change the dont coler of the span element and and to do that we need to simply add the highlight attribute . Because we have styles that when any element has highlight attribute the color is  applied to it . 

So the task here will be get hold of the span element inside the coponent and add the attribute to it . 

2. solution concept

* What we need to know to accomplish this task? In angular how do we get access to dom elements we use something called template reference variables and @viewChild() of your children queries 

```ts
@Component({
    ...
    template: '<span #e1> I want to be green </span>',
})
export class AppComponent implements AfterVIewInit {
    // we use view child query here and pass in the name of the reference to get hold of this span element and what is return is something called elementRef which is simply an abstraction around native Dom elements . We need it because angular runs on other platforms where there is no native Dom , but we need something to work with and that's why we elementRef here 
    @ViewChild('e1')
    span: ElementRef;
    ...
    // then we can use nativeElement property to get access to this native Dom element 
    this.span.nativeElement
}


```

* The nest question is when can we use `this.span.nativeElement` , we can do that inside AfterVIewInit lifecycle hook  

3. solution steps 

* Use @ViewCHild query and template reference to get HTML element

```ts
<span #e1> I want to be  green </span>

...
@ViewCHild('e1') span: ElementRef;

```

* Use `setAttribute` method of a native Dom element to add an attribute

```ts
this.span.nativeElement.setAttribute()

```

3. solution

```ts

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<span #el>I want to be red</span>`,
  styles: ['[highlight] {color: red}']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('el') span: ElementRef;

  ngAfterViewInit() {
    this.span.nativeElement.setAttribute('highlight', '');
  }
}


```

There is one problem with our solution now and the problem is that we mixing together rendering  and presentation logic . 

What is presentation logic ? because presentation logict defines how business data should be presentated to a user . For example a set of task can be split into two columns with all tasks in left column and completed tasks in right column . So the presentation logic would define two arrays with different set of tasks . 

What is rendering logic ? THe rendering logic actually manipulates the Dom . It arranges dom node in a particular order , so that we can actually can see these tasks . In here we working directly with the dom , so we're using rendering logic , but right now it's implemented inside the component . But the general recommendation is to put presentation logic into components adn rendering logic into directives .

Okay we can use data binding mechanism to communicate between components and directives , so what we need to do this will be our next task

### task 1b (t1b branch) change color by adding an attribute #1b

We need to implement a directive that will do exactly tha same work we've done inside the component that will set the attribute on a dom element 

So what do we need  to know ? If we put this rendering logic into component , we need to use @ViewChild() of your child queies and template references to get a hold of the Dom element . If we use  a directive we don't to do that because we can inject a dom element that the directive is applied to  directly into the directives constructor , so we don't longer need to use @ViewChild or template references  


1. concepts 

* ElementRef injection into a constructor

```ts
@Directive({...})
export class AddAtrributeDirective implements OnInit {
    constructor(private element: ElementRef) {

    }
}

```

The second things is that need to communicate to the directive what attribute needs to be added ? We can use data binding mechanism for this purpose . SO we need to define an `@input() addAttribute` inside the directive . when we will be referencing our directive in a components template we can pass in the attribute name . Then in the directive ngOnInit lifecycle hook where we can get access to all inputs . so in the lifecycle we can use element's setAttribute method to do the same kind of work we did inside a component

* @Inputs to pass a directive parameter & NgOnInit

```ts
/* add-attribute.directive.ts */
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[addAttribute]'
})
export class AddAttributeDirective {
  @Input() addAttribute;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.element.nativeElement.setAttribute(this.addAttribute, '');
  }
}


```

```ts
/* app.component.ts */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // when we will be referencing our directive in a components template we can pass in the attribute name 
  template: `<span [addAttribute]="'highlight'">I want to be red</span>`,
  styles: ['[highlight] {color: red}']
})
export class AppComponent {
}

```

2. steps

* Add input parameter to the directive

```ts
export class AddAttributeDirective implements OnInit {
    @Input() addAttribute;
}

```

* Inject an ElementRef into a constructor

```ts
constructor (private element: ElementRef) {}

```

* Use `setAttribute` method to add an attribute in NgOnInit lifecycle hook

* Apply the directive to the `span` element

```ts
template: `<span [addAttribute] ="highlight" >..</span>`

```

3. conlusion

```ts
/* app.component.ts */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<span [addAttribute]="'highlight'">I want to be red</span>`,
  styles: ['[highlight] {color: red}']
})
export class AppComponent {
}

```

```ts
/* add-attribute.directive.ts */

import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[addAttribute]'
})
export class AddAttributeDirective {
  @Input() addAttribute;

  constructor(private element: ElementRef) {
  }
 
  ngOnInit() {
    this.element.nativeElement.setAttribute(this.addAttribute, '');
  }
}

```

## Correct minset 

* Put presentation logic into components 
* Put rendering logic into directives
* Use dataj-binding mechanism for communication

### Benefits

What are benefit s of our split in presentation and render logic ? The first one is that if we put presentation logic in two components this logic anc be reused on platforms other than dom . For example nativescript they have their own implementation of the rendering layer . And if we put a rendering logic into directives angain we can reuse it , we can applu this directive we jsut implemented to any components template . The third benefit is that you always know where to look for, if you got an error right , if you suspect that it's something messes up with the dom you go into directive   


But there is another problem however with our solution here and the problem is that we're using the native steAttribute method , so we kind of expect that there's going to be Dom element there but what is we run inside the `web workers` which don't have native dom. In angular to eork around this problem we have something called renderer which is the service that makes changes to existing dom element properties safe its platform independent . It has all the methods that we have on Dom elements setAttribute() etc .

```bash
Renderer
# makes direct DOM access safe (platform independent)

Dom element modification methods
# setAttribute
# removeAttribute
# addClass
# removeClass
# setStyle
# removeStyle

```

What we need to do is that we need to replace the logic that we have just implement and instead of calling setAttribute() directly on the native Dom element we need to call this method on the renderer and then pass in the elementRef 


### task 1c (t1c branch) change color by adding an attribute #1c

1. Concepts

Renderer2 service injection into a constructor

```ts
@Directive({...})
export class AiDAddAttributeDirective implements OnInit {
    construct(private renderer: Renderer2) {}

    ..
    renderer.setAttribute(elementRef, attribute, value)
}

```

2. steps 

* Inject ElementRef & Renderer2 into a constructor of a directive

```ts
 constructor(private renderer: Renderer2) {}
```

* Use `SetAttribute` method of the Renderer to add an attribute

```ts
renderer.setAttribute(elementRef, attribute, value)

```

3. conclusion

```ts
/* add-attribute.directive.ts */

import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[addAttribute]'
})
export class AddAttributeDirective implements OnInit {
  @Input() addAttribute;

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.setAttribute(this.element.nativeElement, this.addAttribute, '');
  }
}



```


## Task 2 Remove a child Dom Node

Inside the appComponent we have a child component inside which is Dom element . WHat wee need to do is when the button is clicked ,inside the `remove()` method , we need to remove the <a-comp #c><a-com> from the dom . Kind of the way you do with jquery , that you just remove the dom element from the dom .

1. get a hold to the child element we want to remove

How we can do that ? I'm using a @ViewChildren() query and templete  reference to get access to the dom element.

What the type of @ViewChildren() here ? The type is QueryList. It means that child component variable will contain reference to all elements marked with the template reference . However since there is only one element inside the Dom in the template , we can use the first property of the query list to get access to the component child dom element . `this.childComps.first` will give you access to the elementRef specific to  <a-com>. then we know that to get access to the native element we need to use native element `this.childComps.first.nativeElement` 

The above is how we can get a hold to the child element 

2. inject the Renderer2

If we look at the removeChild() of the renderer we will be using Renderer2 , so we need to inject it `constructor(private r: Renderer2){}` . The renderer has a removeChild method . If we inspect the signature for the method it takes two nodes the parent node and the child node . SO we already know how to access to the child node which will be the second node parameter . So how we get the parent node ？ What the parent node of this is a component which is the host element of the current component exactually and it turn out that in a simliar way to the directive we can inject the host element of the component into the constructor.  


```ts
import { AfterViewChecked, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="remove()">Remove child component</button>
    <a-comp #c></a-comp>
  `
})
export class AppComponent implements AfterViewChecked {
  @ViewChildren('c', {read: ElementRef}) childComps: QueryList<ElementRef>;

  ngAfterViewChecked() {
    console.log('number of child components: ' + this.childComps.length);
  }

  remove() {
  }
}

```




