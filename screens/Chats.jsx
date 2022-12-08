import {View, Text, StyleSheet} from 'react-native';
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
    <>
      <View style={styles.container}>
        <Text>Chats</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default Chats;
