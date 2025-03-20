import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeAreaComp from '../../components/SafeAreaComp';
import HeaderComp from '../../components/HeaderComp';
import {goBack} from '../../utils/navigationService';
import SearchIcon from '../../assets/icons/Search.svg';

const ContactList = () => {
  return (
    <SafeAreaComp>
      <HeaderComp
        showBackButton={false}
        screenName={'Contacts'}
        onPress={() => goBack()}
        RightIcon={<SearchIcon width={25} height={25} />}
      />
    </SafeAreaComp>
  );
};

export default ContactList;

const styles = StyleSheet.create({});
