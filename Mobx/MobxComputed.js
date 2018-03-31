import React,{Component} from 'react'
import {
  View,
  Text,
  Alert,
  TextInput
} from 'react-native'
import {observable,computed,action,autorun} from 'mobx'
import {observer,inject,Provider} from 'mobx-react/native'

@observer
export default class MobxComputed extends Component<{}> {

  @observable num = '1';
  _onChange = (val) =>{
    this.num = val
  }

  @computed get onCase(){
    return parseInt(this.num)>3
  }

  render() {
    return (
      <View>
        <Text>computed计算后的变化</Text>
        <TextInput
          value={this.num}
          onChangeText={this._onChange}
        />
        <Text>{this.onCase?this.num:"没变化"}</Text>
      </View>
    )
  }
}