/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Provider} from 'mobx-react/native'
import {initStore} from './Mobx/Store/index'
import MobxObservable from './Mobx/MobxObservable'
import MobxComputed from './Mobx/MobxComputed'

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store = {initStore()}>
        <View >
          <MobxObservable/>
          <MobxComputed/>
        </View>
      </Provider>
    );
  }
}

