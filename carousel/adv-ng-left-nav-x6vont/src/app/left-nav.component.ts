import {AfterViewInit, Component, EmbeddedViewRef, ViewChild, ViewContainerRef} from '@angular/core';

import {LeftNav} from './left-nav.service';

@Component({
  selector: 'left-nav',
  template: `
<h2>I am the left nav</h2>
<ul>
  <li><a [routerLink]="['a']">Route A</a></li>
  <li><a [routerLink]="['b']">Route B</a></li>
  <li><a [routerLink]="['c']">Route C</a></li>
</ul>
<h2 *ngIf="_current != null">Route-specific:</h2>
<ng-container #vcr></ng-container>
`,
  styles: [`
:host {
  display: block;
}
  `]
})
export class LeftNavComponent implements AfterViewInit {
  _current: EmbeddedViewRef<any>|null = null;

  @ViewChild('vcr', {read: ViewContainerRef})
  vcr: ViewContainerRef;

  constructor(private leftNav: LeftNav) {}

  ngAfterViewInit(): void {
    this
      .leftNav
      .contents
      .subscribe(ref => {
        if (this._current !== null) {
          this._current.destroy();
          this._current = null;
        }
        if (ref === null) {
          return;
        }
        this._current = this.vcr.createEmbeddedView(ref);
    });
  }
}
