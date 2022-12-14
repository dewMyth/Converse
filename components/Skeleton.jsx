import {View, Text, Animated, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Skeleton = ({width, height, style}) => {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  }, [width]);

  return (
    <View
      style={StyleSheet.flatten([
        {
          width: width,
          height: height,
          backgroundColor: 'rgba(0,0,0,0.12)',
          overflow: 'hidden',
        },
        style,
      ])}>
      <Animated.View
        style={{
          height: '100%',
          width: '100%',
          transform: [{translateX: translateX}],
        }}>
        <LinearGradient
          style={{height: '100%', width: '100%'}}
          colors={['transparent', 'rgba(0,0,0,0.05)', 'transparent']}
          start={{x: 1, y: 1}}
        />
      </Animated.View>
    </View>
  );
};

export default Skeleton;
