import {createContext, useEffect, useReducer} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAsyncStorageValue, jsonUser} from '../getAsyncStorageValue';

const initialState = {
  user: null,
};

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Method to get json value from async storage
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log('error in getData =>', e);
      }
    };

    const user = getData().then(response => {
      console.log('response before set as user in AuthContext =>', response);
      return value;
    });

    if (user) {
      dispatch({
        type: 'LOGIN',
        payload: user,
      });
    }
  }, []);

  console.log('AuthContext State', state);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};
