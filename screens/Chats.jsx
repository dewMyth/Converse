import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';

import Conversation from '../components/Conversation';
import ContactsLoadingSkeleton from '../components/ContactsLoadingSkeleton';

import {useAuthContext} from '../hooks/useAuthContext';

import {baseUrl} from '../baseUrl';

const Chats = ({navigation}) => {
  const {user} = useAuthContext();

  const [chats, setChats] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getChatsOfaUser = async () => {
      setLoading(true);
      const response = await fetch(
        baseUrl + '/message/get-conversation-by-one-user/' + user._id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const json = await response.json();

      console.log('json =>', json);

      if (!response.ok) {
        setError(true);
        setErrorMsg(json.message);
      }
      if (response.ok) {
        setLoading(false);
        setChats(json);
      }
    };

    getChatsOfaUser();
  }, [user]);

  return (
    <>
      {loading ? (
        <>
          <ContactsLoadingSkeleton />
          <ContactsLoadingSkeleton />
          <ContactsLoadingSkeleton />
          <ContactsLoadingSkeleton />
        </>
      ) : (
        <ScrollView style={styles.container}>
          {chats.map(chat => (
            <Conversation key={chat._id} chat={chat} navigation={navigation} />
          ))}
        </ScrollView>
      )}
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
