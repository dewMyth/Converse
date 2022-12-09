import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContextProvider} from './context/AuthContext';

export default function Main() {
  return (
    <AuthContextProvider>
      <PaperProvider>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </PaperProvider>
    </AuthContextProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
