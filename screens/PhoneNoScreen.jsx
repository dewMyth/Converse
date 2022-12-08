import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React, {useLayoutEffect, useState, useRef} from 'react';
import {Button, TextInput, Portal, HelperText} from 'react-native-paper';
import PhoneNoConfirmationDialog from '../components/PhoneNoConfirmationDialog';

const PhoneNoScreen = ({navigation}) => {
  const mobileRef = useRef();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [mobileNo, setMobileNo] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onConfirmationDialog = () => {
    setVisible(true);
  };

  const onConfirmationError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  const onPressOK = () => {
    setVisible(false);
    navigation.navigate('VerifyOtp', {mobileNo: mobileNo});
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Enter your phone number</Text>
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>
            Converse will need to verify your phone number.
          </Text>
        </View>
        <View style={styles.mobile}>
          <View style={styles.mobileCountryCodeContainer}>
            <TextInput style={styles.mobileNo} mode="outlined">
              +94
            </TextInput>
          </View>
          <View style={styles.mobileNoContainer}>
            <TextInput
              style={styles.mobileNo}
              ref={mobileRef}
              mode="outlined"
              label="Phone No"
              value={mobileNo}
              onChangeText={mobileNo => setMobileNo(mobileNo)}
              onLayout={() => mobileRef.current.focus()}
              keyboardType="numeric"></TextInput>
            <HelperText type="error" visible={error}>
              Mobile number should has 9 digits
            </HelperText>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            style={styles.btn}
            mode="contained"
            onPress={
              mobileNo && mobileNo.length === 9
                ? onConfirmationDialog
                : onConfirmationError
            }>
            NEXT
          </Button>
        </View>
      </View>

      {/* Confirmation Dialog */}
      <Portal>
        <PhoneNoConfirmationDialog
          visible={visible}
          setVisible={setVisible}
          mobileNo={mobileNo}
          onPressOK={onPressOK}
        />
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'column',
  },
  titleContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Nunito-Regular',
    fontSize: 25,
    color: '#21005C',
  },
  subTitleContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },

  mobile: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
  },
  mobileCountryCodeContainer: {
    flex: 1,
    padding: 5,
  },
  mobileNoContainer: {
    flex: 4,
    padding: 5,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  btn: {
    backgroundColor: '#21005C',
    borderRadius: 5,
  },
});

export default PhoneNoScreen;
