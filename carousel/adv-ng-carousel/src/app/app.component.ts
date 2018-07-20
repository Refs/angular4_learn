import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
<h1>Image Carousel:</h1>
<p>This carousel shows URLs instead of images because I'm lazy.</p>

<div *carousel="let url from images; let ctrl = controller">
  <p>Url: {{url}}</p>
  <button (click)="ctrl.prev()">Previous</button>
  <button (click)="ctrl.next()">Next</button>
</div>
`
})
export class AppComponent  {
  images = [
    '/some/image/a.png',
    '/other/image/b.png',
    '/third/image/c.png',
    '/more/images/d.png',
  ];
}
