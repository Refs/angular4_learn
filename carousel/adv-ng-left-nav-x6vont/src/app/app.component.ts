import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
<header>Left-Nav with a Twist</header>
<div class="container">
  <left-nav></left-nav>
  <div class="r-o">
    <router-outlet></router-outlet>
  </div>
</div>
  `,
  styles: [`
header {
  height: 50px;
  width: 100%;
  font-size: 36px;
  text-align: center;
  padding-top: 15px;
}

.container {
  display: flex;
  flex-direction: row;
}

.container left-nav {
  flex: 0 0 12em;
}

.container .r-o {
  flex: 1;
  outline: 1px dashed red;
}
`]
})
export class AppComponent  {
}
