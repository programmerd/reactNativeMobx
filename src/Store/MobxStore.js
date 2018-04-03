import React,{Component} from 'react'
import {observable,computed} from 'mobx'

export default class MobxStore extends Component<{}>{

  @observable price = '1';

  @observable amount = '10';

  @observable num = '1';

  @computed get onChange(){
    return parseInt(this.num) * parseInt(this.num)
  }

  computed = computed(() => {
    return (parseInt(this.num)>4)?"输入值大于4为：真":"输入值大于4为：假"
  })
}