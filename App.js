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
import {initStore} from './src/Store/index'
import MobxObservable from './src/Pages/MobxObservable'
import MobxComputed from './src/Pages/MobxComputed'

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

