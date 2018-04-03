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
* 首先需要创建一个用于存储数据的Store 在Store内使用@observable 定义被观察者变量
> MobxStore.js

        @observable price = 0
        @observable amount = 0

>在App.js中 使用<Provider store={Store定义的被观察者}> 根据上下文Provider可以传递Store给子组件

        <Provider store={initStore()}>
            <子组件>
        <Provider/>

>在子组件中MobxObservable.js中使用 @inject('store') 将store作为props传递给子组件,通过this.props可以拿到Store的被观察者变量

        const {price, amount} = this.props.store.MobxStore

>在子组件中MobxObservable.js可以通过观察者@observer 监听组件被观察者变量是否变化 如果被观察者发生改变@observer监听的组件将重新render

        @inject('store')
        @observer
        class MobxObservable extends Component<{}>{

           //在Mobx中可以利用@computed 当被观察者状态发生改变时 进行想要的计算 组件重新render
           @computed get total(){
                 const {price, amount} = this.props.store.MobxStore
                 return price*amount
           }

           render(){
                 const {total} = this
                return(
                    <Text>总计：{total}</Text>
                )
           }
        }

* computed 可以返回一个新的计算后的值，修饰符下的 @computed 与无修饰符下的 computed

> MobxStore.js中定义被观察者num 并且使用compute返回计算后的新值

        @observable num = "1"
        //使用修饰符下的computed
        @ computed get onChange(){
            // 返回 num 输入值 相乘的结果
            return parseInt(this.num) * parseInt(this.num)
        }
        // 不使用修饰符下的computed
        computed = computed(() => {
            return parseInt(this.num)>4?"大于4":"小于4"
        })

> MobxComputed.js 通过this.props.store ...去调用

         const {num, onChange,computed} = this.props.store.MobxStore;
            return (
              <View>
                <Text>computed计算后的变化</Text>
                <TextInput
                  value = {num}
                  onChangeText = {this._onChange}
                />
                //修饰符下@computed的调用
                <Text>{onChange}</Text>
                //无修饰符先computed()下的调用
                <Text>{computed.get()}</Text>
              </View>
            )
> *  computed 中有getter与setter方法  这种使用getter、setter方法定义的属性为'存储器属性' 具体介绍[getter与setter](https://segmentfault.com/a/1190000011760834)
>> 在MobxStore.js中定义 computed 的 get 与 set 方法(永远在getter之后定义setter)

        @computed get totals() {
            return this.total ? this.total : 0;
          }

          set totals(val){
            console.log('setter: '+val);
            this.total = val;
          }

>> 在MobxComputed.js 中对totals进行赋值操作，

        _onPress = () => {
        //"存储器属性" 在setter中赋值 相当与将值存储到totals上 totals又将值赋给了total
            this.props.store.MobxStore.totals += 1;
          }
         //操作
         <Text>total: {totals}</Text>
         <Button title="+1" onPress={this._onPress}></Button>

* action对任意修改该过@observable或改变状态的时候使用的函数@action 在启用严格模式(useStrict)的时候 强制使用action
> 在MobxStore.js中定义一个数组 arrList 定义一个变量example 在使用computed对其进行getter与setter

         @observable example = 0;

         @observable arrList = [1,2,3];

         @computed get addData(){
             return this.arrList.length
           }
           set addData(val){
             this.arrList.push(val);
           }

>在MobxAction.js 改变arrList与example的状态 在改变状态前加@action(标记出修改状态 动作所在的位置)

        ......
        //使用@action标记处修改状态是所在的位置
         @action _addPush = () => {
              this.props.store.MobxStore.example += 1;
              this.props.store.MobxStore.addData += 1;
          };


>>@action(name) 支持在后面添加一个那么属性 是指更好的说明@action的意图 上面可以写成:

         @action('向数组中push元素的动作') _addPush = () => {
               this.props.store.MobxStore.example += 1;
               this.props.store.MobxStore.addData += 1;
           };
         .......

         render(){
              const {example,arrList,addData} = this.props.store.MobxStore;
              //这里想打印出arrList的数组内容需要对数组进行slice(0)浅拷贝一个新的数组
              //因为@observable 会自动将数组变成一个可观察的observable数组 直接打印或取值是拿不到的，
              //或者可以在定义的时候就禁止自动将其转换为observable类型 只需要在@observable后面添加ref属性即可
              //如@abservable.ref arr=[1,2,3]  这样的话就可以向普通数组一样进行操作
              console.log(arrList.slice())
              return (
                <View>
                  <Button
                    title = "向数组中push元素"
                    onPress = {this._addPush}
                  />
                  <Text>被点击了：{example}次</Text>
                  <Text>数组的长度：{addData}</Text>
                </View>
              )
          }