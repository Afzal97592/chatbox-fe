import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Call from '../assets/icons/Call.svg';
import CallGreenIcon from '../assets/icons/CallGreen.svg';
import MessageIcon from '../assets/icons/Message.svg';
import MessageGreenIcon from '../assets/icons/MessageGreen.svg';
import Settings from '../assets/icons/Settings.svg';
import User from '../assets/icons/User.svg';
import UserGreenIcon from '../assets/icons/UserGreen.svg';
import CustomText from '../components/CustomText';
import {verticalScale} from '../utils/responsive';
import CallsHistory from './MainAppScreens/CallsHistory';
import ChatChannels from './MainAppScreens/ChatChannels';
import ContactList from './MainAppScreens/ContactList';
import ProfileScreen from './MainAppScreens/ProfileScreen';

const BottomTabs = createBottomTabNavigator();

const MyTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((item: any, index: number) => {
        let label;
        if (item.name === 'ChatChannels') {
          label = 'Chats';
        } else if (item.name === 'ContactList') {
          label = 'Contacts';
        } else if (item.name === 'ClassHistory') {
          label = 'Calls';
        } else if (item.name === 'ProfileScreen') {
          label = 'Profile';
        }

        const Icon = () => {
          return (
            <>
              {item.name === 'ChatChannels' ? (
                isFocused ? (
                  <MessageGreenIcon width={30} height={30} />
                ) : (
                  <MessageIcon width={30} height={30} />
                )
              ) : item.name === 'ContactList' ? (
                isFocused ? (
                  <UserGreenIcon width={30} height={30} />
                ) : (
                  <User width={30} height={30} />
                )
              ) : item.name === 'ClassHistory' ? (
                isFocused ? (
                  <CallGreenIcon width={30} height={30} />
                ) : (
                  <Call width={30} height={30} />
                )
              ) : item.name === 'ProfileScreen' ? (
                <Settings width={30} height={30} />
              ) : null}
            </>
          );
        };

        const isFocused = state.index === index;
        return (
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: isFocused ? 50 : 0,
              elevation: isFocused ? 50 : 0,
              borderTopWidth: isFocused ? 5 : 0,
              borderTopColor: isFocused ? '#24786D95' : 'transparent',
              zIndex: isFocused ? 999 : 1,
              paddingTop: isFocused ? verticalScale(10) : 0,
              shadowColor: isFocused ? '#24786D' : '#fff',
              shadowOpacity: 0.9,
              shadowRadius: 20,
              shadowOffset: {
                height: 10,
                width: 0,
              },
            }}
            key={index}
            onPress={() => navigation.navigate(item.name)}>
            <Icon />
            <CustomText
              variant="h5"
              color={isFocused ? '#24786D' : '#000'}
              fontfamily="Nunito-Medium"
              style={{marginTop: 4}}>
              {label}
            </CustomText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const HomeScreen = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}>
      <BottomTabs.Screen name="ChatChannels" component={ChatChannels} />
      <BottomTabs.Screen name="ContactList" component={ContactList} />
      <BottomTabs.Screen name="ClassHistory" component={CallsHistory} />
      <BottomTabs.Screen name="ProfileScreen" component={ProfileScreen} />
    </BottomTabs.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    paddingBottom: verticalScale(20),
    elevation: 16,
    shadowColor: '#24786D80',
    shadowOpacity: 0.9,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
});
