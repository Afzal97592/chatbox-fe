import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import AuthStackNavigation from './AuthStackNavigation';
import {navigate, navigationRef} from '../utils/navigationService';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {mmKvStorage} from '../utils/mmkv-storage-utils';
import MainAppNavigation from './MainAppNavigation';
import {useSelector} from 'react-redux';
import {useLoginUserMutation} from '../redux/api/user/userApis';

const RootNavigation = () => {
  const userData = useSelector((state: any) => state.auth);
  const [isSplashScreen, setIsSplashScreen] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(
    mmKvStorage.getItem('token'),
  );

  useEffect(() => {
    const token = mmKvStorage.getItem('token');
    if (token) {
      setIsAuthenticated(token);
    }
  }, [userData]);

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
