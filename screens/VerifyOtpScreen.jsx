import {View, Text, StyleSheet} from 'react-native';
import React, {useLayoutEffect, useState, useRef} from 'react';
import {TextInput, HelperText, Portal, Button} from 'react-native-paper';

import VerificationCompleteDialog from '../components/VerificationCompleteDialog';

import {baseUrl} from '../baseUrl';

const VerifyOtpScreen = ({navigation, route}) => {
  const {mobileNo} = route.params;
  const otpRef = useRef();
  const [otp, setOtp] = useState(0);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const hideDialog = () => setVisible(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onVerificationComplete = () => {
    setVisible(false);
    navigation.navigate('CreateProfile', {mobileNo: mobileNo});
  };

  const checkVerification = async (mobileNo, otp) => {
    const credentials = {
      countryCode: '94',
      mobileNo: mobileNo,
      otp: otp,
    };

    console.log('credentials =>', JSON.stringify(credentials));
    console.log('url =>', baseUrl + '/auth/verify-otp');

    const response = await fetch(baseUrl + '/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    console.log('response =>', response);

    const json = await response.json();

    console.log('json =>', json);

    if (!response.ok) {
      setError(true);
      setErrorMsg(json.message);
    }
    if (response.ok) {
      setVisible(true);
    }
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
            onChangeText={otp => setOtp(otp)}></TextInput>
          <HelperText
            style={{marginHorizontal: '18%'}}
            type="error"
            visible={error}>
            {errorMsg ? errorMsg : 'Something Wrong!'}
          </HelperText>
        </View>
        <View style={styles.btnContainer}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => checkVerification(mobileNo, otp)}>
            VERIFY
          </Button>
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
  btn: {
    backgroundColor: '#21005C',
    borderRadius: 5,
    width: '50%',
    alignSelf: 'center',
  },
});

export default VerifyOtpScreen;
