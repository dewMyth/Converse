import {View, Text, StyleSheet} from 'react-native';
import React, {useLayoutEffect, useState, useRef} from 'react';
import {TextInput, HelperText, Portal} from 'react-native-paper';

import VerificationCompleteDialog from '../components/VerificationCompleteDialog';

const VerifyOtpScreen = ({navigation, route}) => {
  const {mobileNo} = route.params;
  const otpRef = useRef();
  const [otp, setOtp] = useState(0);
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onVerificationComplete = () => {
    navigation.navigate('CreateProfile', {mobileNo: mobileNo});
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Verifying your number</Text>
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>
            We have sent an SMS with an OTP code to the +94{' '}
            {mobileNo
              ? mobileNo.slice(0, 2) +
                ' ' +
                mobileNo.slice(2, 5) +
                ' ' +
                mobileNo.slice(5, 10)
              : null}
          </Text>
        </View>
        <View style={styles.otpContainer}>
          <Text style={styles.otpTitle}>Enter 6 digit code</Text>
          <TextInput
            style={styles.otpInput}
            label="OTP"
            value={otp}
            ref={otpRef}
            mode="outlined"
            onLayout={() => otpRef.current.focus()}
            keyboardType="numeric"
            onChangeText={otp => {
              setOtp(otp);
              if (otp.length === 6) {
                setVisible(true);
              }
            }}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottom}>Didn't receive a code?</Text>
        </View>
      </View>

      <Portal>
        <VerificationCompleteDialog
          visible={visible}
          hideDialog={hideDialog}
          mobileNo={mobileNo}
          onVerificationComplete={onVerificationComplete}
        />
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: '#21005C',
  },
  subTitleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  subTitle: {
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    padding: 15,
  },
  otpContainer: {
    marginTop: 20,
  },
  otpTitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  otpInput: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '20%',
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  bottom: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
  },
});

export default VerifyOtpScreen;
