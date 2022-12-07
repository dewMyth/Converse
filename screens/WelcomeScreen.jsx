import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Button} from 'react-native-paper';

const WelcomeScreen = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to Converse</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/welcome.png')}
            style={{width: 340, height: 340}}
          />
        </View>
        <View style={styles.privacyPolicyContainer}>
          <Text style={styles.privacyPolicy}>
            Read our <Text style={styles.purpleText}>Privacy Policy</Text>. Tap
            “Agree and continue” to accept the
            <Text style={styles.purpleText}>Terms of Services.</Text>
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Button mode="contained" style={styles.btn}>
            Agree and continue
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  titleContainer: {
    marginTop: 70,
    paddingLeft: 5,
    paddingRight: 5,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 30,
    color: '#21005C',
  },
  imageContainer: {
    marginTop: 50,
  },
  privacyPolicyContainer: {
    marginTop: 50,
    flex: 1,
  },
  privacyPolicy: {
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
  },
  purpleText: {
    color: '#674FA3',
  },
  btnContainer: {
    paddingBottom: 50,
  },
  btn: {
    backgroundColor: '#21005C',
    width: 300,
  },
});

export default WelcomeScreen;
