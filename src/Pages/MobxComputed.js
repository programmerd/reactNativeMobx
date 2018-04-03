import React,{Component} from 'react'
import {
  View,
  Text,
  Alert,
  TextInput
} from 'react-native'
import {observable,computed,action,autorun} from 'mobx'
import {observer,inject,Provider} from 'mobx-react/native'

@inject('store')
@observer
export default class MobxComputed extends Component<{}> {

  @action("监听input的变化") _onChange = (val) =>{
    this.props.store.MobxStore.num = val
  }

  render() {
    const {num, onChange,computed} = this.props.store.MobxStore;
    return (
      <View>
        <Text>computed计算后的变化</Text>
        <TextInput
          value = {num}
          onChangeText = {this._onChange}
        />
        <Text>{onChange}</Text>
        <Text>{computed.get()}</Text>
      </View>
    )
  }
}