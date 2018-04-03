import React,{Component} from 'react'
import {observable,computed, action} from 'mobx'

export default class MobxStore extends Component<{}>{
  //observable
  @observable price = '1';

  @observable amount = '10';
  //computed
  @observable num = '1';

  @observable totals = 0;
  //action
  @observable example = 0;

  @observable arrList = [1,2,3];

  //computed
  @computed get onChange(){
    console.log("getter");
    return parseInt(this.num) * parseInt(this.num)
  }

  @computed get total() {
    return this.totals ? this.totals : 0;
  }

  set total1(val){
    console.log('setter: '+val);
    this.total = val;
  }

  computed = computed(() => {
    return (parseInt(this.num)>4)?"输入值大于4为：真":"输入值大于4为：假"
  })

  // action
  @computed get addData(){
    return this.arrList.length
  }
  set addData(val){
    this.arrList.push(val);
  }
}