import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import {View} from 'react-native';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    </>
  );
};

export default App;
