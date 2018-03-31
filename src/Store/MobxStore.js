import React,{Component} from 'react'
import {observable,computed} from 'mobx'

export default class MobxStore extends Component<{}>{

  @observable price = '1';

  @observable amount = '10';


}