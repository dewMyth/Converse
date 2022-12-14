import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  PermissionsAndroid,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Button, TextInput, HelperText, Portal} from 'react-native-paper';

import {launchImageLibrary} from 'react-native-image-picker';

import {useLogin} from '../hooks/useLogin';
import Loading from '../components/Loading';
import {baseUrl} from '../baseUrl';

const CreateProfileScreen = ({navigation, route}) => {
  const mobileNo = route.params.mobileNo;

  const {login, isLoading, error} = useLogin();

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

  const [username, setUsername] = useState('');
  const [imgThumbnailPath, setImgThumbnailPath] = useState('');

  // Image Data
  const [uri, setUri] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');

  const handleProfilePictureUpload = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        setImgThumbnailPath(response.assets[0].uri);
        setUri(response.assets[0].uri);
        setType(response.assets[0].type);
        setName(response.assets[0].fileName);
      } else {
        setImgThumbnailPath('');
      }
    }).catch(err => {
      setImgThumbnailPath('');
    });
  };

  const onHandleNext = async () => {
    if (imgThumbnailPath !== '') {
      const data = new FormData();
      data.append('profilePicture', {
        uri: uri,
        type: type,
        name: name,
      });

      console.log(baseUrl + '/file-upload/profile-picture');
      try {
        // Image upload
        const config = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        };
        await fetch(baseUrl + '/file-upload/profile-picture', config).then(
          response => {
            return response.json().then(data => {
              login(username, mobileNo, data.profilePictureName);
            });
          },
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await login(username, mobileNo, imgThumbnailPath);
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Profile Info</Text>
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>
            Please provide your name and an optional profile photo
          </Text>
        </View>
        <View style={styles.imgView}>
          <TouchableOpacity onPress={handleProfilePictureUpload}>
            <Image
              source={
                imgThumbnailPath
                  ? {uri: imgThumbnailPath}
                  : {
                      uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
                    }
              }
              style={styles.img}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.usernameContainer}>
          <TextInput
            label="Username"
            value={username}
            onChangeText={username => setUsername(username)}
            mode="outlined"
            underlineColorAndroid="transparent"
            style={styles.usernameInput}
          />
          <HelperText type="error" visible={error}>
            {error}
          </HelperText>
        </View>
        <View style={styles.btnContainer}>
          <Button
            disabled={isLoading}
            style={styles.btn}
            mode="contained"
            onPress={onHandleNext}>
            NEXT
          </Button>
        </View>
      </View>

      <Portal>
        <Loading visible={isLoading} />
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#21005C',
  },
  subTitleContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
  },

  imgView: {
    marginTop: 30,
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  },
  usernameContainer: {
    marginTop: 30,
  },

  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  btn: {
    backgroundColor: '#21005C',
    borderRadius: 5,
    width: '30%',
  },
});

export default CreateProfileScreen;
