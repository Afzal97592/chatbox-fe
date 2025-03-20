import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import AuthStackNavigation from './AuthStackNavigation';
import {navigate, navigationRef} from '../utils/navigationService';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {mmKvStorage} from '../utils/mmkv-storage-utils';
import MainAppNavigation from './MainAppNavigation';

const RootNavigation = () => {
  const [isSplashScreen, setIsSplashScreen] = useState(true);

  const isAuthenticated = mmKvStorage.getItem('token');

  setTimeout(() => {
    setIsSplashScreen(false);
  }, 4000);

  return (
    <NavigationContainer ref={navigationRef}>
      {isSplashScreen ? (
        <SplashScreen />
      ) : isAuthenticated ? (
        <MainAppNavigation />
      ) : (
        <AuthStackNavigation />
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
