import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const Conversation = () => {
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
            <Text style={styles.username}>John Doe</Text>
          </View>
          <View style={styles.lastMsgContainer}>
            <Text style={styles.lastMsg}> Hi! How are you? </Text>
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
    // flex: 1,
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

export default Conversation;
