import {useState} from 'react';
import {baseUrl} from '../baseUrl';
import {useAuthContext} from './useAuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {dispatch} = useAuthContext();

  const login = async (username, mobileNo) => {
    const newUser = {username, mobileNo};
    setIsLoading(true);
    setError(null);

    console.log(baseUrl + '/user/create');
    console.log(newUser);

    const response = await fetch(baseUrl + '/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    console.log('response =>', response);

    const json = await response.json();

    console.log('json =>', json);

    const {user} = json;

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
      return;
    }
    if (response.ok) {
      setError(json.error);
      //save the user to the async storage
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem('user', jsonValue);

      //update the auth context
      dispatch({type: 'LOGIN', payload: user});

      setIsLoading(false);
    }
  };

  return {login, error, isLoading};
};
