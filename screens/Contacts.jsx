import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import {ActivityIndicator} from 'react-native-paper';

import MyContacts from 'react-native-contacts';

import {baseUrl} from '../baseUrl';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    MyContacts.getAll().then(contacts => {
      if (contacts.length === 0) {
        console.log('No contacts found');
      } else {
        fetch(baseUrl + '/user/find-my-users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contacts),
        })
          .then(res => res.json())
          .then(data => {
            setContacts(data.myContacts);
            setLoading(false);
          })
          .catch(err => console.log(err));
      }
    });
  }, []);

  const renderContacts = contact => {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
              }}
              style={styles.img}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>{contact.item.username}</Text>
            </View>
            <View style={styles.lastMsgContainer}>
              <Text style={styles.lastMsg}> {contact.item.mobileNo} </Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderContacts}
          keyExtractor={contact => contact._id}
          style={{marginTop: 20}}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  textContainer: {
    marginLeft: 10,
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  usernameContainer: {
    marginBottom: 5,
    marginTop: 5,
  },
  username: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#21005C',
    paddingLeft: 5,
  },
  lastMsgContainer: {
    // flex: 1,
    marginBottom: 5,
  },
  lastMsg: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
});

export default Contacts;
