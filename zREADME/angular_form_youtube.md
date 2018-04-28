# angular2 - Forms and validation

> youtube : https://www.youtube.com/watch?v=qS_VArWQX7o&index=18&list=PL67QbqrRRyyTAMKgM_kFcGRFjSBMchKc3

## Course1 Getting started

> Forms is the main way that we're going to get data from our users into our application；  Forms之所以重要 原因在于其是应用获取用户输入数据的最主要的接口； 即用户向应用传递数据 主要是通过填写表单这种方式； 

1. angular 中的form分为两种类型 
    * templete driven 

<!-- the (click) to the left of the equal sign identifies the button's click event as the target of binding -->


## Course3 Way data Binding 

1. angular doesn't have two-way data binding coming out of box , we acturally have to add it in the app module 

* You import FormsModule.

* You add the FormsModule to the list of imports defined in the @NgModule decorator. This gives the application access to all of the template-driven forms features, including ngModel.

2. form module give us access to ngModel which is teo-way data-binding

## Course5 Simple validation

1. When we're dealing with angular validation , angular provides a couple different states for us so tat we can know what state our input fields are in 

* touched or untouched 

* dirty or pristine

* valid or invalid

2. In addition to prividing the States angular provides a way to have classes that will automatically be applied to each of these input fields . this takes a  lot of guesswork out of end . So an input field an automatically have class and automatically get it removed depending on the state of that input field.  

* .ng-touched or .ng-untouched

* .ng-dirty or .ng-pristine

* .ng-valid or .ng-invalid  

3. we can use a local templete variable to see above class 

```css
input.ng-valid.ng-touched {
    border-left: 5px sold green;
}

input.ng-invalid.ng-touched {
    border-left: 5px solid red;
}

```

## Course6 Advanced Validation

Right now we can only use these classed on the input field itself , we'll use a little bootstrap classed that allow us to show validation 

1. https://v3.bootcss.com/css/#forms --->  校检状态

>  Bootstrap 对表单控件的校验状态，如 error、warning 和 success 状态，都定义了样式。使用时，添加 .has-warning、.has-error 或 .has-success 类到这些控件的父元素即可。任何包含在此元素之内的 .control-label、.form-control 和 .help-block 元素都将接受这些校验状态的样式。

```html
<!-- bootsctrap templete -->

<div class="form-group has-success">
  <label class="control-label" for="inputSuccess1">Input with success</label>
  <input type="text" class="form-control" id="inputSuccess1" aria-describedby="helpBlock2">
  <span id="helpBlock2" class="help-block">A block of help text that breaks onto a new line and may extend beyond one line.</span>
</div>
```

```html
<!-- in our angular templete -->

<div class="form-group" [ngClass]="{ 
    'has-error':name.invalid && name.touched,
    'has-sucess': name.valid && name.touched }">
    <label class="control-label" > name </lable>
    <input type="text" class="form-control" name="name" required [(ngModel)]="user.name" #name="ngModel"  >
    <span class="help-block" *ngIf="name.invalid && name.touched"  >
        name is required
    </span>
</div>

```

## Course7 Overall Form Validation

To make sure the submit button is disabled if the overall form is invalid;  

The form is only valid when each of its input is also valid ;  just like we ware able to bind the ngModel over to the local template variable , let's do the same things to our form . We're going to create a form temlate variable and we'll bind it to ngForm ; now we can use this variable to access the form ;

```html

<form #form="ngForm">
    <!-- ........... -->
    <div class="form-group">
        <button type="submit" class="btn btn-primary" [disable]="form.invalid" > save </button>
    <div >
</form>

```

* template driven form code

```html
<!-- template-form.component.html -->

<div class="jumbotron text-center" *ngIf="submitted">
    <h2>Thanks for your submission!</h2>
    <p>We appreciate it!</p>
</div>

<form (ngSubmit)="processForm()" *ngIf="!submitted" #form="ngForm">

    Is Form Valid? {{ form.valid }}

    <div class="form-group" 
        [ngClass]="{ 
            'has-error': name.invalid && name.touched,
            'has-success': name.valid && name.touched 
        }">
        <label class="control-label">Name</label>
        <input type="text" class="form-control" name="name" required
            [(ngModel)]="user.name"
            #name="ngModel">

        <span class="help-block" *ngIf="name.invalid && name.touched">
            Name is required.
        </span>
    </div>

    <div class="form-group" 
        [ngClass]="{ 
            'has-error': username.invalid && username.touched,
            'has-success': username.valid && username.touched 
        }">
        <label class="control-label">Username</label>
        <input type="text" class="form-control" name="username" required
            [(ngModel)]="user.username"
            #username="ngModel"> 

        <span class="help-block" *ngIf="username.invalid && username.touched">
            Username is required.
        </span>
    </div>

    <div class="form-group">
        <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Save</button>
    </div>

    {{ diagnostic }}

</form>
```

```ts
// template-form.component
import { Component, OnInit } from '@angular/core';

export class User {
  name: string;
  username: string;
}

@Component({
  selector: 'template-form',
  styleUrls: ['./app/template/template-form.component.css'],
  templateUrl: './app/template/template-form.component.html'
})
export class TemplateFormComponent implements OnInit {
  user: User;
  submitted: boolean = false;   // check if the form is submitted

  ngOnInit() {
    this.user = {
      name: '',
      username: ''
    };
  }

  get diagnostic() {
    return JSON.stringify(this.user);
  }

  processForm() {
    console.log(this.user);
    this.submitted = true;

    // create a user
    // this.service.createUser(this.user)...
  }

}
```

```css
/* template-form.component.css */
input.ng-valid.ng-touched  {
  border-left: 5px solid green;
}

input.ng-invalid.ng-touched  {
  border-left: 5px solid red;
}

```



 

