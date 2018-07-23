# angular_animation

> https://www.youtube.com/watch?v=Lx4_bEykDIA

Angular offers the ability to create powerful animations and activate them based on a variety of different factors . You can place animations on any HTML elements and make them occur based on angular lifecycles , user events and more . 

## START 

1. import the BrowserAnimationModule 

```
import { BrowserAnimationModule } from "@angular/platform-browser/animations";

```

2. import the animation function

```
import {
 trigger, state, style, transition, animate, keyframes
} from "@angular/animations";

```

> If we component template won't include mutip-step animations ,  then you can omit keyframes ;

## set the animation metadate

```ts

@Component({
    selector:"",  template: "", styles: "",

    animations: [
        // the first step is to use the triggers function, the first auguments accepts the name of the trigger and the second arguments will accpet all the other innovation functions that we imported 
        trigger('myAwesomeAnimation',[
            // the second is to set the state function; The state function allow you to define different states that you can in transition between , the first argument accept a unique name , the seconf argument accepts the style function 

            // the style function allows you to apply an object with the web animation
        ])

    ]
})


```