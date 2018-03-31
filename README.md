# reactNativeMobx
react-native之MOBX的使用

* yarn: Yarn是Facebook提供的替代npm的工具，可以加速node模块的下载。React Native的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。

* yarn常用替换npm: yarn代替npm install  、 yarn add 第三方库名 代替 npm install --save 第三方库名 、 yarn add 库名 -D  代替 npm install --save-dev
* 这里是详情对比[yarn与npm指令的对比](https://segmentfault.com/a/1190000008632323)
1. 安依赖包

        npm install 或者 yarn

2. 启动项目

        react-native run android 或者 react-native run-ios

### 以下操作在本项目中已经安装（以下为安装及操作过程)

1. 安装 MOBX 及 React绑定库(进入项目根目录)

        npm install --save mobx
        npm install --save mobx-react
        或者
        yarn add mobx
        yarn add mobx-react

2. 如果在项目中想要支持ES7中decorator(修饰符)特性 需安装一些babel插件

        npm install --save-dev babel-plugin-transform-decorators-legacy
        npm install --save-dev babel-preset-react-native-stage-0
        或者
        yarn add babel-plugin-transform-decorators-legacy -D
        yarn add babel-preset-react-native-stage-0 -D
** 需要在.babelrc(如果没有请在根目录下新建.babelrc文件)导入Decorator的配置（配置后从新npm install 项目 或使用 yarn install）

        {
        	 'presets': ['react-native'],
             'plugins': ['transform-decorators-legacy']
        }

* 这样就可以在项目导入mobx

        import {observable} from 'mobx'
        import {observer} from 'mobx-react/native'

* 这样就可以使用修饰符@了 如@observable youStateName="数据"


## 使用MOBX
* 首先需要创建一个用于存储数据的Store 在Store内使用@observable 定义被观察者
> MobxStore.js

        @observable price=0
        @observable amount=0

>在App.js中 使用<Provider store={Store定义的被观察者}> 根据上下文Provider可以传递Store给子组件

        <Provider store={initStore()}>
            <子组件>
        <Provider/>

>在子组件中MobxObservable.js中使用 @inject('store') 将store作为props传递给子组件,通过this.props可以拿到Store的被观察者变量

        const {price,amount} = this.props.store.MobxStore

>在子组件中MobxObservable.js可以通过观察者@observer 监听组件被观察者变量是否变化 如果被观察者发生改变@observer监听的组件将重新render

        @inject('store')
        @observer
        class MobxObservable extends Component<{}>{

           //在Mobx中可以利用@computed 当被观察者状态发生改变时 进行想要的计算 返回true时 组件重新render
           @computed get total(){
                 const {price} = this.props.store.MobxStore
                 const {amount} = this.props.store.MobxStore
                return price*amount
           }

           render(){
                 const {total} = this
                return(
                    <Text>总计：{total}</Text>
                )
           }
        }

