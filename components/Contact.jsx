import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import storage from '@react-native-firebase/storage';

const Contact = ({contact}) => {
  const [profilePictureFromFS, setProfilePictureFromFS] = useState(null);

  useEffect(() => {
    const getImageFromFSStorage = async () => {
      console.log(contact.item);
      if (contact?.item.profilePicture) {
        const url = await storage()
          .ref(contact?.item.profilePicture)
          .getDownloadURL();
        setProfilePictureFromFS(url);
        console.log(url);
      }
    };
    getImageFromFSStorage();
  }, []);

  return (
    <>
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
