import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';

import {Appbar, Avatar, TextInput, Button} from 'react-native-paper';
import {baseUrl} from '../baseUrl';

import {useHeaderHeight} from '@react-navigation/elements';

import Message from '../components/Message';

import {useAuthContext} from '../hooks/useAuthContext';

const ConversationScreen = ({navigation, route}) => {
  const {contact, conversationId, profilePictureFromFS} = route.params;

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const scrollViewRef = useRef();
  const height = useHeaderHeight();

  const {user} = useAuthContext();

  useEffect(() => {
    const getMessagesByConversationId = async () => {
      console.log(
        baseUrl + '/message/get-messages-by-conversation-id/' + conversationId,
      );
      const response = await fetch(
        baseUrl + '/message/get-messages-by-conversation-id/' + conversationId,
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
        setMessages(json);
      }
    };
    getMessagesByConversationId();
  }, [conversationId]);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.contactDetailsContainer}>
          <Avatar.Image
            size={36}
            source={
              profilePictureFromFS
                ? {uri: profilePictureFromFS}
                : {
                    uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
                  }
            }
          />
          <View style={styles.contactNameContainer}>
            <Text style={styles.username}>{contact.username}</Text>
            <Text style={styles.mobileNo}>{contact.mobileNo}</Text>
          </View>
        </View>
      </Appbar.Header>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/chat-bg.png')}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.chatBoxContainer}>
            <ScrollView
              style={styles.chatBox}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }>
              {messages?.map(message => {
                return (
                  <Message
                    key={message._id}
                    own={message.senderId === user._id ? true : false}
                    message={message}
                  />
                );
              })}
            </ScrollView>
          </View>
        </ImageBackground>
      </View>

      {/* <KeyboardAvoidingView
        style={{position: 'absolute', left: 0, right: 0, bottom: 0}}
        behavior="position"
        keyboardVerticalOffset={height - 300}>
        <View style={styles.chatBottom}>
          <View style={styles.textInput}>
            <TextInput
              label="Your Message"
              value={msg}
              mode="outlined"
              onChangeText={msg => setMsg(msg)}
            />
          </View>
          <View style={styles.sendBtn}>
            <Button
              icon="send"
              mode="contained"
              buttonColor="#da0037"
              onPress={e => handleSendMsg(e)}
            />
          </View>
        </View>
      </KeyboardAvoidingView> */}
    </>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
  },
  image: {
    flex: 1,
  },
  contactDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  contactNameContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#21005C',
  },
  mobileNo: {
    fontSize: 12,
  },

  chatBoxContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 55,
  },
  chatBottom: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 10,
  },
  textInput: {
    flex: 6,
    marginHorizontal: 10,
  },
  sendBtn: {
    flex: 1,
    marginHorizontal: 10,
  },
};

export default ConversationScreen;
