import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeAreaComp from '../components/SafeAreaComp';
import {SplashLogo} from '../constants/ImagesPath';
import {navigate} from '../utils/navigationService';

const SplashScreen = () => {
  const animation = useAnimatedValue(0);

  useEffect(() => {
    navigate('OnBoardingScreen');
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  });
  return (
    <SafeAreaComp>
      <Animated.View style={{...styles.container, opacity: animation}}>
        <Image source={SplashLogo} />
      </Animated.View>
    </SafeAreaComp>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
