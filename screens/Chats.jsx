import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

import Contacts from 'react-native-contacts';

const Chats = () => {
  useEffect(() => {
    Contacts.getAll()
      .then(contacts => {
        console.log(contacts.map(c => c.displayName));
      })
      .catch(e => {
        //handle error })
      });
  }, []);

  return (
    <View>
      <Text>Chats</Text>
    </View>
  );
};

export default Chats;
