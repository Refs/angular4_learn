// import Routes | ModuleWithProviders to give us type hints, when we code ;
// the type hints is always useful because it call always tell us if we have a route that isn't configured correctly

import { RouterModule , Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes  = [
  // the type hints is always useful because it call always tell us if we have a route that isn't configured correctly
  // tslint:disable-next-line:max-line-length
  // I really like building the entire routing file from beging because we know how we our application is going to look , and it kind of gives us an outline of how to move through our application  as we build it

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

// angular 应用就是一组试图状态的集合，所谓路由不过是让其从一种状态，去跳到另外一种状态；

// angular 应用是由组件拼接而成的，app.component.html 就像一个板子（主机板）， 板子上面提供一个又一个插座，我们通过将模块插到板子上面，让后让其工作； 类似与主机安装差不多；
// 设计这块板子就是设计板子的路由，板子长什么样记本上就看到 最后拼装后的应用长什么样了；
// 路就是线路了；

// 不管对于angular 还是 ionic 设计路由都是第一步， 就类似于写作文是一样的；看别人的文章，第一步也是去看路由；

