import { group, animate, query, transition, style, trigger } from '@angular/animations';
import { Component, Directive, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/observable/timer'

@Directive({
  selector: '[bannerCtrl]',
  exportAs: 'bannerCtrl'
})
export class BannerCtrlDirective {
  @Input() itemsLength: number;

  selectedIndex = 0;
  @Output('selectedIndex')  selectedIndexEmitter = new EventEmitter<number>();
  @Output('actualIndex')  actualIndexEmitter = new EventEmitter<number>();

  destroyed$ = new Subject();
  resetTimer$ = new Subject();

  ngOnInit() {
    this.resetTimer$
      .startWith(null)
      .takeUntil(this.destroyed$)
      .switchMap(t => Observable.timer(5000, 5000))
      .subscribe(() => this.next())
  }
  ngOnDestroy() {
    this.destroyed$.next();
  }

  actualIndex() {
    let len = this.itemsLength;
    // negative still return the right index
    return ((this.selectedIndex % len) + len) % len;
  }

  setIndex(index: number) {
    this.selectedIndex = index;
    this.actualIndexEmitter.next(this.actualIndex())
    this.selectedIndexEmitter.next(index)
    this.resetTimer$.next();
  }

  previous() {
    --this.selectedIndex
    this.actualIndexEmitter.next(this.actualIndex());
    this.selectedIndexEmitter.next(this.selectedIndex);
    this.resetTimer$.next();
  }

  next() {
    ++this.selectedIndex
    this.actualIndexEmitter.next(this.actualIndex())
    this.selectedIndexEmitter.next(this.selectedIndex)
    this.resetTimer$.next();
  }

}

@Component({
  selector: 'my-app',
  styles: [`
       .banner-container {
          position:relative;
          height:500px;
          overflow:hidden;
        } 
       .banner-container > .banner {
          position:absolute;
          height: 100px;
          width: 100px;
          background-color: pink;
        }
        button.active{
          background-color: pink;
        }
     `],
  template: `
       <button (click)="ctrl.previous()">Previous</button>
       <button (click)="ctrl.next()">Next</button>
       <button *ngFor="let item of backingItems;let i=index" [class.active]="i==actualIndex" (click)="ctrl.setIndex(i)" >{{item}}</button>
       <br />
       actualIndex: {{actualIndex}} <br />
       <hr>
       <div [@bannerAnimation]="selectedIndex" 
            class="banner-container"
            bannerCtrl
            #ctrl="bannerCtrl"
            [itemsLength]="backingItems.length"
            (selectedIndex)="selectedIndex = $event"
            (actualIndex)="actualIndex = $event"
        >
         <div class="banner" *ngFor="let banner of items"> {{ banner }} </div>
       </div>
     `,
  animations: [
    trigger('bannerAnimation', [
      transition(":increment", group([
        query(':enter', [
          style({ left: '100%' }),
          animate('0.5s ease-out', style('*'))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({ left: '-100%' }))
        ])
      ])),
      transition(":decrement", group([
        query(':enter', [
          style({ left: '-100%' }),
          animate('0.5s ease-out', style('*'))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({ left: '100%' }))
        ])
      ])),
    ])
  ]
})
export class AppComponent {
  backingItems = ['1', '2', '3', '4', '5'];
  actualIndex = 0;
  selectedIndex = 0;

  get items() {
    return [this.backingItems[this.actualIndex]];
  }
}