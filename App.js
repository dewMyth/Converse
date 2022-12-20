import React, {useEffect, useState, useContext} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeScreen from './screens/WelcomeScreen';
import PhoneNoScreen from './screens/PhoneNoScreen';
import VerifyOtpScreen from './screens/VerifyOtpScreen';
import CreateProfileScreen from './screens/CreateProfileScreen';
import HomeScreen from './screens/HomeScreen';
import ConversationScreen from './screens/ConversationScreen';

import {useAuthContext} from './hooks/useAuthContext';

import SplashScreen from 'react-native-splash-screen';

import io from 'socket.io-client';
import GlobalState from './GlobalState';

const App = () => {
  const Stack = createNativeStackNavigator();

  const {user} = useAuthContext();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 700);
  }, []);

  useEffect(() => {
    const socket = io('ws://converse-server.onrender.com');
    GlobalState.socket = socket;
  }, []);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Conversation" component={ConversationScreen} />
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
