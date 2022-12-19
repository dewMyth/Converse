import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import {TouchableRipple} from 'react-native-paper';

import {baseUrl} from '../baseUrl';

import {useAuthContext} from '../hooks/useAuthContext';

import storage from '@react-native-firebase/storage';

const Conversation = ({chat, navigation}) => {
  const {user} = useAuthContext();

  const [friend, setFriend] = useState({});
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [profilePictureFromFS, setProfilePictureFromFS] = useState(null);

  const [latestMessage, setLatestMessage] = useState('');

  useEffect(() => {
    const friendId = chat.members.find(friend => friend !== user._id);
    const getFriendDeatils = async () => {
      const response = await fetch(
        baseUrl + '/user/find-user-by-id/' + friendId,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const json = await response.json();

      if (!response.ok) {
        setError(true);
        setErrorMsg(json.message);
      }
      if (response.ok) {
        setFriend(json);
      }
    };

    getFriendDeatils();
  }, [chat]);

  useEffect(() => {
    const getImageFromFSStorage = async () => {
      if (friend?.profilePicture) {
        const url = await storage()
          .ref(friend?.profilePicture)
          .getDownloadURL();
        setProfilePictureFromFS(url);
      }
    };
    getImageFromFSStorage();
  }, [friend]);

  useEffect(() => {
    const getLatestMessage = async () => {
      const response = await fetch(
        baseUrl + '/message/get-messages-by-conversation-id/' + chat._id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const json = await response.json();

      if (!response.ok) {
        setError(true);
        setErrorMsg(json.message);
      }
      if (response.ok) {
        if (json.length > 0) {
          setLatestMessage(json[json.length - 1].text);
        }
      }
    };
    getLatestMessage();
  }, [chat]);

  const onPressContact = async () => {
    const response = await fetch(baseUrl + '/message/create-new-conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId: user._id,
        receiverId: friend._id,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(true);
      setErrorMsg(json.message);
    }
    if (response.ok) {
      navigation.navigate('Conversation', {
        contact: friend,
        profilePictureFromFS: profilePictureFromFS,
        conversationId: json._id,
      });
    }
  };

  return (
    <>
      <TouchableRipple
        onPress={() => onPressContact()}
        rippleColor="rgba(0, 0, 0, .32)">
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
              <Text style={styles.username}>{friend.username}</Text>
            </View>
            <View style={styles.lastMsgContainer}>
              <Text style={styles.lastMsg}>
                {latestMessage ? (
                  `${latestMessage.slice(0, 30)}...`
                ) : (
                  <DefaultNullText />
                )}
              </Text>
            </View>
          </View>
        </View>
      </TouchableRipple>
    </>
  );
};

const DefaultNullText = () => {
  return (
    <Text style={{color: 'grey', fontStyle: 'italic'}}>No messages yet</Text>
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
  usernameContainer: {},
  username: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#21005C',
  },
  lastMsgContainer: {
    overflow: 'hidden',
    // marginBottom: 5,
  },
  lastMsg: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
});

export default Conversation;
