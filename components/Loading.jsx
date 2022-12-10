import React from 'react';
import {View} from 'react-native';
import {Button, Paragraph, Dialog, Portal, Provider} from 'react-native-paper';

const Loading = () => {
  return (
    <>
      <Dialog>
        <Dialog.Title>Please Wait</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Initializing...</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export default Loading;
