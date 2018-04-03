import React,{Component} from 'react'
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native'
import {computed,action} from 'mobx'
import {observer,inject,Provider} from 'mobx-react/native'

@inject('store')
@observer
export default class MobxAction extends Component<{}>{

  @action('点击按钮改变状态') _addPush = () => {
      this.props.store.MobxStore.example += 1;
      this.props.store.MobxStore.addData += 1;
  };

  render(){
    const {example,arrList,addData} = this.props.store.MobxStore;
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
}