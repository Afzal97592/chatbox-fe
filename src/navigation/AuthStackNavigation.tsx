import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import OnBoardingScreen from '../screens/AuthScreens/OnBoardingScreen';
import SignupScreen from '../screens/AuthScreens/SignupScreen';
import SigninScreen from '../screens/AuthScreens/SigninScreen';

const Stack = createNativeStackNavigator();

const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      <Stack.Screen name="SigninScreen" component={SigninScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;

const styles = StyleSheet.create({});
