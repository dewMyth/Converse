import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import storage from '@react-native-firebase/storage';
import {TouchableRipple} from 'react-native-paper';
import {baseUrl} from '../baseUrl';

import {useAuthContext} from '../hooks/useAuthContext';

const Contact = ({contact, navigation}) => {
  const {user} = useAuthContext();
  const [profilePictureFromFS, setProfilePictureFromFS] = useState(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [contactDetails, setContactDetails] = useState(contact.item);

  useEffect(() => {
    const getImageFromFSStorage = async () => {
      if (contactDetails?.profilePicture) {
        const url = await storage()
          .ref(contactDetails?.profilePicture)
          .getDownloadURL();
        setProfilePictureFromFS(url);
        console.log(url);
      }
    };
    getImageFromFSStorage();
  }, []);

  const onPressContact = async () => {
    const response = await fetch(baseUrl + '/message/create-new-conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId: user._id,
        receiverId: contactDetails._id,
      }),
    });

    console.log('response =>', response);

    const json = await response.json();

    console.log('json =>', json);

    if (!response.ok) {
      setError(true);
      setErrorMsg(json.message);
    }
    if (response.ok) {
      navigation.navigate('Conversation', {
        contact: contactDetails,
        profilePictureFromFS: profilePictureFromFS,
        conversationId: json._id,
      });
    }
  };

  return (
    <>
      <TouchableRipple
        onPress={() => onPressContact()}
        rippleColor="rgba(0, 0, 0, .32)"
        style={{paddingTop: 10}}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={
                profilePictureFromFS
                  ? {uri: profilePictureFromFS}
                  : {
                      uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
                    }
              }
              style={styles.img}
            />
          </View>

          <View style={styles.textContainer}>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>{contact.item.username}</Text>
            </View>
            <View style={styles.mobileNoContainer}>
              <Text style={styles.mobileNo}> {contact.item.mobileNo} </Text>
            </View>
          </View>
        </View>
      </TouchableRipple>
    </>
  );
};

const styles = StyleSheet.create({
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
    alignSelf: 'center',
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
  mobileNoContainer: {
    // flex: 1,
    marginBottom: 5,
  },
  mobileNo: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
});

export default Contact;
