import React, {useState} from 'react';
import {BottomNavigation, Text, FAB} from 'react-native-paper';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';

import Topbar from '../components/Topbar';
import Chats from './Chats';

const ChatsRoute = () => <Chats />;

const StatusRoute = () => <Text>Status</Text>;

const ContactsRoute = () => <Text>Contacts</Text>;

const HomeScreen = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'chats',
      title: 'Chats',
      focusedIcon: 'chat',
      unfocusedIcon: 'chat-outline',
    },
    {
      key: 'status',
      title: 'Status',
      focusedIcon: 'image-multiple',
      unfocusedIcon: 'image-multiple-outline',
    },
    {
      key: 'contacts',
      title: 'Contacts',
      focusedIcon: 'account-supervisor',
      unfocusedIcon: 'account-supervisor-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    chats: ChatsRoute,
    status: StatusRoute,
    contacts: ContactsRoute,
  });

  return (
    <>
      <Topbar />

      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{
          backgroundColor: '#fff',
          height: 70,
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
        }}
        inactiveColor="#674FA3"
        activeColor="#21005C"
        labeled={true}
        style={styles.bottmNavigation}
        renderLabel={({route}) => (
          <Text
            style={{
              color: route.focused ? '#21005C' : '#674FA3',
              textAlign: 'center',
              fontFamily: 'Nunito-Regular',
            }}>
            {route.title}
          </Text>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
    </>
  );
};

const styles = {
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 60,
  },
};

export default HomeScreen;