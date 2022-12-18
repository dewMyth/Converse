import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyContacts from 'react-native-contacts';
import {baseUrl} from '../baseUrl';
import ContactsLoadingSkeleton from '../components/ContactsLoadingSkeleton';

import Contact from '../components/Contact';

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
            // Display the contact name by user saved name (contact.displayName)
            for (let contact of contacts) {
              for (let myContact of data.myContacts) {
                if (contact.phoneNumbers.length === 0) continue;
                if (contact.phoneNumbers[0].number === myContact.mobileNo) {
                  myContact.username = contact.displayName;
                }
              }
            }
            setLoading(false);
          })
          .catch(err => console.log(err));
      }
    });
  }, []);

  const renderContacts = contact => {
    return <Contact contact={contact} />;
  };

  return (
    <>
      {loading ? (
        <>
          <ContactsLoadingSkeleton />
          <ContactsLoadingSkeleton />
          <ContactsLoadingSkeleton />
          <ContactsLoadingSkeleton />
          <ContactsLoadingSkeleton />
          <ContactsLoadingSkeleton />
          <ContactsLoadingSkeleton />
          <ContactsLoadingSkeleton />
        </>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderContacts}
          keyExtractor={contact => contact._id}
        />
      )}
    </>
  );
};

export default Contacts;
