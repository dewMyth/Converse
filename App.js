import React, {useEffect, useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeScreen from './screens/WelcomeScreen';
import PhoneNoScreen from './screens/PhoneNoScreen';
import Chats from './screens/Chats';
import VerifyOtpScreen from './screens/VerifyOtpScreen';
import CreateProfileScreen from './screens/CreateProfileScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // error reading value
      }
    };
    getData().then(response => {
      setUser(response);
    });
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Navigator>
        {user != null ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="PhoneNo" component={PhoneNoScreen} />
            <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
            <Stack.Screen
              name="CreateProfile"
              component={CreateProfileScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default App;
