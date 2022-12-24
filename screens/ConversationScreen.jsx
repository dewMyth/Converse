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

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import GlobalState from '../GlobalState';

const ConversationScreen = ({navigation, route}) => {
  console.log(conversation);

  const {contact, conversation, profilePictureFromFS, friendId} = route.params;

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [message, setMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollViewRef = useRef();
  const height = useHeaderHeight();

  const {user} = useAuthContext();

  const socket = GlobalState.socket;

  useEffect(() => {
    socket.emit('addUser', user._id);
  }, [user]);

  useEffect(() => {
    const getMessagesByConversationId = async () => {
      console.log(
        baseUrl +
          '/message/get-messages-by-conversation-id/' +
          conversation._id,
      );
      const response = await fetch(
        baseUrl +
          '/message/get-messages-by-conversation-id/' +
          conversation._id,
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
  }, [conversation]);

  // Receive message from socket server
  useEffect(() => {
    socket.on('getMessage', message => {
      console.log(message);
      setArrivalMessage({
        senderId: message.senderId,
        text: message.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      conversation?.members.includes(arrivalMessage.senderId) &&
      setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage, conversation]);

  const handleSendMsg = async () => {
    socket.emit('sendMessage', {
      senderId: user._id,
      receiverId: friendId,
      text: message,
    });

    const response = await fetch(baseUrl + '/message/create-new-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId: user._id,
        receiverId: contact._id,
        conversationId: conversation._id,
        text: message,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(true);
      setErrorMsg(json.message);
    }
    if (response.ok) {
      setMessages([...messages, json]);
      setMessage('');
    }
  };

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
          <KeyboardAvoidingView
            style={{position: 'absolute', left: 0, right: 0, bottom: 5}}
            behavior="position"
            keyboardVerticalOffset={height - 300}>
            <View style={styles.chatBottomContainer}>
              <View style={styles.textInputContainer}>
                <TextInput
                  value={message}
                  style={styles.textInput}
                  placeholder="Message"
                  underlineStyle={{backgroundColor: '#fff'}}
                  onChangeText={message => setMessage(message)}
                />
              </View>
              <View style={styles.sendBtnContainer}>
                <Button
                  mode="contained"
                  style={styles.sendBtn}
                  onPress={e => handleSendMsg(e)}>
                  <MaterialCommunityIcon
                    name="send-outline"
                    size={14}
                    color="#fff"
                  />
                </Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
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
  chatBottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    height: 60,
  },
  textInputContainer: {
    flex: 8,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  textInput: {
    backgroundColor: 'white',
    outline: 'none',
  },
  sendBtnContainer: {
    flex: 2,
    marginRight: 10,
    alignItems: 'center',
  },
  sendBtn: {
    backgroundColor: '#21005C',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ConversationScreen;
