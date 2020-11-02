import React,{ useState, useEffect } from 'react';
import MainStackNavigator from './src/navigation/MainStackNavigator'
import TechicianNavigator from './src/navigation/TechicianNavigator'
import CustomerNavigator from './src/navigation/CustomerNavigator'
import { YellowBox } from 'react-native';
import _ from 'lodash';


YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};




export default function App() {
  

  //return <MainStackNavigator />
  return <TechicianNavigator/>
  //return <CustomerNavigator/>

}