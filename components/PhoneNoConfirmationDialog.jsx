import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import {Dialog, Paragraph, Button} from 'react-native-paper';

const PhoneNoConfirmationDialog = ({
  visible,
  setVisible,
  mobileNo,
  onPressOK,
}) => {
  const hideDialog = () => setVisible(false);

  return (
    <>
      <Dialog visible={visible} onDismiss={hideDialog} style={styles.container}>
        <Dialog.Content>
          <Text style={styles.phrase}>
            The number you entered is as follows :
          </Text>
          <Text style={styles.phoneNo}>
            +94{' '}
            {mobileNo
              ? mobileNo.slice(0, 2) +
                ' ' +
                mobileNo.slice(2, 5) +
                ' ' +
                mobileNo.slice(5, 10)
              : null}
          </Text>
          <Text style={styles.question}>
            Is this OK? or would you like to change the number?
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.btnContainer}>
          <Button onPress={hideDialog}>EDIT</Button>
          <Button onPress={onPressOK}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  phrase: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    paddingBottom: 20,
  },

  phoneNo: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: '#21005C',
  },
  question: {
    paddingTop: 20,
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default PhoneNoConfirmationDialog;
