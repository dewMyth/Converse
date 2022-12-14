import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import Skeleton from '../components/Skeleton';

const ContactsLoadingSkeleton = () => {
  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.imageSkeletonContainer}>
        <Skeleton width={60} height={60} style={{borderRadius: 30}} />
      </View>
      <View style={styles.textSkeletonContainer}>
        <View style={styles.nameSkeletonContainer}>
          <Skeleton width={Dimensions.get('window').width - 120} height={30} />
        </View>
        <View style={styles.phoneSkeletonContainer}>
          <Skeleton width={Dimensions.get('window').width - 120} height={20} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
    height: 80,
    paddingHorizontal: 20,
  },

  imageSkeletonContainer: {
    flex: 1,
  },

  textSkeletonContainer: {
    flex: 4,
  },

  phoneSkeletonContainer: {
    marginTop: 10,
  },
});

export default ContactsLoadingSkeleton;
