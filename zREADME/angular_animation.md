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
    selector:"",  
    
    template: `
        <--! attach the animation in the template   -->

        <p [@myAwesomeAnimation]="state" (click)= "animateMe()">I will animate</p>
    `, 
    
    styles: [`
        p {
            width: 200px;
            background: lightgray;
            margin: 100px auto;
            text-align: center;
            padding: 20px;
            font-size: 1.5em;
        }


    `],

    animations: [
        // the first step is to use the triggers function, the first auguments accepts the name of the trigger and the second arguments will accpet all the other innovation functions that we imported 
        trigger('myAwesomeAnimation',[
            // the second is to set the state function; The state function allow you to define different states that you can in transition between , the first argument accept a unique name , the seconf argument accepts the style function 

            // the style function allows you to apply an object with the web animation property names and associated values 

            state('small', style({
                transform: 'scale(1)',
            })),
            state('large', style({
                transform: 'scale(1.2)'
            })),
            // So we have two different states here, where the scale property is going from 1 to 1.2 

            // the third is the transition function , the transition function is what makes the actual animations occur, so the first argument accpets the direction between two different states , for instance we're going to `from small to large`  or `large to small ` or basically `either-or` ; ----- the second argument accpets the animate function , so the animate function allows you to define the length delay and easing of the transition , it also allows you to designate the style function where you can define the styles while the transitions are taking place or the keyframes functions which accepts for muti-step animations , both of which are placed in the second argument of the animate function , 
            transition('small <=> large', animate('300ms ease-in'))

            // this transition define the length of the transition as well as the easing type and when an element the uses the my `myAwesomeAnimation` trigger goes from the small state to the large state 

        ])

    ]
})

export class AppComponent {
    state: string = 'small';

    constructor(private dataService: DataService) {

    }

    animateMe() {
        // we're just going to do what's called ternary operator , it's going to toggle between small and large 
        this.state = (this.state ==== 'small' ? 'large': 'small');
    }
}


```


> 会使用基本的 animation , 会使用 ng- animation 动画库；一般情况，都能解决了；