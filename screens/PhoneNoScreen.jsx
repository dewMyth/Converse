import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  InteractionManager,
} from 'react-native';
import React, {useLayoutEffect, useEffect, useRef} from 'react';
import {Button, TextInput} from 'react-native-paper';

const PhoneNoScreen = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const mobileRef = useRef();

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
              onLayout={() => mobileRef.current.focus()}
              keyboardType="numeric"></TextInput>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button style={styles.btn} mode="contained">
            NEXT
          </Button>
        </View>
      </View>
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
