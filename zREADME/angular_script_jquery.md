# import arbitrary js file in the component

1. install jquery 

```bash
npm install jquery
```

2. copy the jquery.js file into /assets/js folder  as static resource to dynamically import through script mark in the component

```ts
// app.component.ts

import { Component , OnInit, ElementRef, AfterViewInit } from '@angular/core';

// import jquery
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
      private elementRef: ElementRef
  ) {}

  ngOnInit() {
      $(document).ready(function(){
         $('#buttonClickMe').click
      })
      
  }

  ngAfterViewInit() {
      var jquery = document.createElement('script');
      jquery.type = 'text/javascript';
      jquery.src = './assets/js/jquery.js';
      this.elementRef.nativeElement.appendChild(jquery);
  }

}

```
