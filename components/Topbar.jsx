import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {Appbar} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Topbar = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Appbar.Header style={styles.appBar}>
          <View style={styles.title}>
            <Image
              style={{width: 100, height: 50, marginLeft: 20, marginTop: 25}}
              source={require('../assets/images/logo.png')}
            />
            {/* <Text style={styles.appBarTitle}> Converse </Text> */}
          </View>
          <View style={styles.iconContainer}>
            <Icon
              name="magnify"
              size={25}
              color="#21005C"
              style={styles.search}
            />
            <Icon
              name="camera-outline"
              size={25}
              color="#21005C"
              style={styles.camera}
            />
            <Icon
              name="dots-vertical"
              size={25}
              color="#21005C"
              style={styles.menu}
            />
          </View>
        </Appbar.Header>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },

  appBar: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  appBarTitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 25,
    color: '#21005C',
  },

  title: {
    flex: 1,
  },
  icons: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  search: {
    marginRight: 15,
  },
  camera: {
    marginRight: 15,
  },
  menu: {
    marginRight: 5,
  },
});

export default Topbar;
