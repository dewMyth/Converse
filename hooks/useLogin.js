import {useState} from 'react';
import {baseUrl} from '../baseUrl';
import {useAuthContext} from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {dispatch} = useAuthContext();

  const login = async (username, mobileNo) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(baseUrl + '/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, mobileNo}),
    });

    console.log('response =>', response);

    const json = await response.json();

    console.log('json =>', json);

    const {user} = json;

    if (!response.ok) {
      setError(json.msg);
      setIsLoading(false);
      return;
    }
    if (response.ok) {
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
