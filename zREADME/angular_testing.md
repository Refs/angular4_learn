# test

> the objective of a unit test is to test a particular function 

> For a more strikingly visual effect, hide the data entry area and display something else . 

> Wrap hte form in a <div> and bind its hidden peoperty to the HeroFormComponent.submitted property.


```html
<div [hidden] = "submitted" >
<h1> Hero Form </h1>
<form (ngSubmit) = "onSubmit()" #heroForm="ngForm" >

</form>

</div>

```

```html
<div [hidden]="!submitted"  >
    <h2> you submitted the following: </h2>


</div>
```

> data modification, validation, and more

* An ANgular HTML 

> know the importance of write , 


> improve overall data quanlity by validating user input for accurancy and completeness


