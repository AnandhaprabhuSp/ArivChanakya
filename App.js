import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/util/store.js'
import {persistor} from './src/util/store.js'
import LandingComponent from './src/components/LandingComponent.js'
import {PersistGate} from 'redux-persist/integration/react'
import Loader from './src/containers/Loader.js';
import {GoogleAnalyticsTracker} from "react-native-google-analytics-bridge";
import { getUniqueID } from 'react-native-device-info';  
let tracker = new GoogleAnalyticsTracker("UA-115925715-12322");

export default class App extends Component {
  constructor() {
    super()
    this.date = new Date();
  }
  componentWillMount() {
    let uniqueId = 'ariv-const'; 
      if(typeof getUniqueID == 'function'){
          uniqueId = getUniqueID();
      }
    tracker.trackScreenView("AppPage");
    tracker.trackEvent("AppJsPage", uniqueId);
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<View></View>} persistor={persistor}>
          <StatusBar backgroundColor="#000" barStyle="light-content"/>
          <View style={styles.container}>
            <LandingComponent/>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
