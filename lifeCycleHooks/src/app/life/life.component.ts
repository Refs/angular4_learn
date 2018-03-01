import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.css']
})
// tslint:disable-next-line:max-line-length
// 刚生成的lifeComponent上面已经实现了一个OnInit接口，每一个钩子都是@angualr/core 库里面定义的接口，每一个都有一个唯一的钩子方法，他们的名字是由接口的名字加上ng前缀构成的； 从技术角度上来说“接口”对javascript与typescript的开发者都是可选的；
// javascript语言本身并没有接口，angular的运行时看不到typescript接口，因为接口在被编译成javascript的时候已经消失了
// tslint:disable-next-line:max-line-length
// 幸运的是他们也不是必须的，我们不需要在组件或者指令上添加生命周期钩子接口，就能获取钩子带来的好处；angular回去检查我们组件的类 一旦发现钩子方法被定义了就会去调用它； angular会找到并调用像ngOnInit()这样的钩子方法，有没有这个接口无所谓`implements OnInit`
// 但我们建议在typescript的类定义中去添加接口
export class LifeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
