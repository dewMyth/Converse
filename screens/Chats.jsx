import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';

import Conversation from '../components/Conversation';

const Chats = () => {
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
