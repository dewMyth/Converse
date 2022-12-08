import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const VerificationCompleteDialog = ({visible, hideDialog, mobileNo}) => {
  return (
    <>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={styles.title}>This is a title</Dialog.Title>
        <Dialog.Content>
          <Paragraph>This is simple dialog</Paragraph>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});

export default VerificationCompleteDialog;
