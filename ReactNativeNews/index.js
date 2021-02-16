/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (__DEV__) {
  require('react-native-performance-flipper-reporter').setupDefaultFlipperReporter();
}

AppRegistry.registerComponent(appName, () => App);

