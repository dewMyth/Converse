import {View, Text} from 'react-native';
import React from 'react';

const ConversationScreen = ({navigation, route}) => {
  const {contact} = route.params;

  return (
    <View>
      <Text>{JSON.stringify(contact)}</Text>
    </View>
  );
};

export default ConversationScreen;
