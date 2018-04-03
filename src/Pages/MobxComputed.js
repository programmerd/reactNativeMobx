import React,{Component} from 'react'
import {
  View,
  Text,
  Alert,
  Button,
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

  _onPress = () => {
    this.props.store.MobxStore.totals += 1;
  }

  render() {
    const {num, onChange,computed, totals} = this.props.store.MobxStore;
    return (
      <View>
        <Text>computed计算后的变化</Text>
        <TextInput
          value = {num}
          onChangeText = {this._onChange}
        />
        <Text>{onChange}</Text>
        <Text>{computed.get()}</Text>
        <Text>total: {totals}</Text>
        <Button title = "+1" onPress = {this._onPress}></Button>
      </View>
    )
  }
}