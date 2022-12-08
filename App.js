import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import PhoneNoScreen from './screens/PhoneNoScreen';
import Chats from './screens/Chats';
import VerifyOtpScreen from './screens/VerifyOtpScreen';
import CreateProfileScreen from './screens/CreateProfileScreen';

const App = () => {
  const Stack = createNativeStackNavigator();

  const isSignedIn = false;

  return (
    <>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen name="Chats" component={Chats} />
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
