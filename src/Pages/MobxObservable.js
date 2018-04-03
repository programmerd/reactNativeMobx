import React,{Component} from 'react'
import {
  View,
  Text,
  TextInput
} from 'react-native'
import {computed,action} from 'mobx'
import {observer,inject,Provider} from 'mobx-react/native'

@inject('store')
@observer
export default class MobxObservable extends Component<{}> {

  @computed get total(){
    const {price, amount} = this.props.store.MobxStore
    return parseInt(price) * parseInt(amount)
  }

  @computed get totalGT100(){
    const {price, amount} = this.props.store.MobxStore
    return (parseInt(price) * parseInt(amount))>100
  }

  _onChangePrice = (val) =>{
    this.props.store.MobxStore.price = val
  }

  _onChangeAmount = (val) =>{
    this.props.store.MobxStore.amount = val
  }

  render() {
    const {price, amount} = this.props.store.MobxStore;
    return (
      <View>
        <Text>单价(个)：</Text>
        <TextInput
          value = {price}
          onChangeText = {this._onChangePrice}
        />
        <Text>  数量(元)：</Text>
        <TextInput
          value = {amount}
          onChangeText = {this._onChangeAmount}
        />
        <Text>总计：{this.total}</Text>
        <Text>总计大于100时：{this.totalGT100?"大于100":"小于100"}</Text>
      </View>
    )
  }
}