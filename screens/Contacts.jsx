import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';

import MyContacts from 'react-native-contacts';

import {baseUrl} from '../baseUrl';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
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
          })
          .catch(err => console.log(err));
      }
    });
  }, []);

  return (
    <>
      <View>
        <Text>{JSON.stringify(contacts ? contacts : 'No Contacts')}</Text>
      </View>
    </>
  );
};

export default Contacts;
