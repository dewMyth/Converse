import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';

import Contacts from 'react-native-contacts';
import Conversation from '../components/Conversation';

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
      <ScrollView style={styles.container}>
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
});
export default Chats;
