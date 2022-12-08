import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Paragraph, Dialog, Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const VerificationCompleteDialog = ({
  visible,
  hideDialog,
  mobileNo,
  onVerificationComplete,
}) => {
  return (
    <>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <MaterialIcons name="check-circle-outline" style={styles.icon} />
        <Dialog.Title style={styles.title}>Verification Complete</Dialog.Title>
        <Dialog.Content style={{marginTop: -15}}>
          <Paragraph style={styles.paragraph}>
            Your no. +94{' '}
            {mobileNo
              ? mobileNo.slice(0, 2) +
                ' ' +
                mobileNo.slice(2, 5) +
                ' ' +
                mobileNo.slice(5, 10)
              : null}{' '}
            is verified!
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onVerificationComplete}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
  },
  icon: {
    alignSelf: 'center',
    fontSize: 100,
    color: '#21005C',
  },
  paragraph: {
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
  },
});

export default VerificationCompleteDialog;
