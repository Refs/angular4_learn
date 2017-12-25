import {CanActivate} from '@angular/router';

// 这个类实现angular 框架提供的一个接口，实现了Angular框架的接口CanActivate
export class LoginGuard implements CanActivate {
  // 实现了一个方法canActivate()这个方法 要返回一个布尔值， angular会根据返回的布尔值true或false来决定当前的路由请求，是通过 或者是不通过；
  canActivate() {
    // 声明一个变量loggedIn用来表示当前的用户 是否已经登陆了,此处利用一个随机数来模拟,大于0.5的视为未登陆状态；否则视为已经登陆；
    const loggedIn: boolean = Math.random() < 0.5;
    if (!loggedIn) {
      console.log('用户为未登录状态');
    }
    return loggedIn;
  }
}
