// 这个守卫确保当前用户执行保存操作之后，才能离开当前的页面；

import {CanDeactivate} from '@angular/router';
import {ProductComponent} from '../product/product.component';

// CanDeactivate接口与CanActivate接口的区别是，CanDeactivate这个接口，有一个泛型-- 指定当前组件的类型，
// 因为我们要保护的组件是ProductComponent组件，所以泛型 写ProductComponent; 同样其也有一个方法需要实现--canDeactivate()这个方法中的第一个参数，方法的第一个参数，就是泛型指定的组件，这样会将当前要保护的组件的信息 传递进来；
// 因为我们是想要离开，根据要保护组件的状态-- 组件中会有很多属性，同样我们可以在要保护组件中写一些方法，我们可以根据组件的某一个属性，或者去调用组件的方法，用以判断，当前的用户 是否可以离开；这就是其中的使用逻辑
// 此处我们不写那么复杂，
export class UnsavedGuard implements CanDeactivate<ProductComponent> {
    canDeactivate(component: ProductComponent) {
      // 当用户试图离开ProductComponent组件的时候，提示就会跳出来，若用户点击确认，则用户会离开当前，若用户点否，即方法返回的是false则会继续留在当前页面；
      return window.confirm('你还没有保存，确定要离开么');
    }
}
