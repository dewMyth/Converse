import React, {useEffect, useState} from 'react';
import {Button, PermissionsAndroid, View, Text} from 'react-native';

const CreateProfileScreen = () => {
  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
      ])
        .then(result => {
          if (result['android.permission.READ_CONTACTS'] === 'granted') {
            console.log('READ_CONTACTS granted');
          } else {
            console.log('READ_CONTACTS denied');
          }
          if (result['android.permission.CAMERA'] === 'granted') {
            console.log('CAMERA granted');
          } else {
            console.log('CAMERA denied');
          }
          if (
            result['android.permission.ACCESS_MEDIA_LOCATION'] === 'granted'
          ) {
            console.log('ACCESS_MEDIA_LOCATION granted');
          } else {
            console.log('ACCESS_MEDIA_LOCATION denied');
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <>
      <View>
        <Text>Create CreateProfileScreen</Text>
      </View>
    </>
  );
};

export default CreateProfileScreen;
