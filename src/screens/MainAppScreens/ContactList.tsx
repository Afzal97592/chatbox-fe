import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeAreaComp from '../../components/SafeAreaComp';
import HeaderComp from '../../components/HeaderComp';
import {goBack} from '../../utils/navigationService';
import SearchIcon from '../../assets/icons/Search.svg';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

function AccordionItem({isExpanded, children, viewKey, style, duration = 500}) {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    }),
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}>
      <View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={styles.wrapper}>
        {children}
      </View>
    </Animated.View>
  );
}

function Item() {
  return <View style={styles.box} />;
}

function Parent({open}) {
  return (
    <View style={styles.parent}>
      <AccordionItem isExpanded={open} style={{}} viewKey="Accordion">
        <Item />
      </AccordionItem>
    </View>
  );
}

const ContactList = () => {
  const open = useSharedValue(false);
  const onPress = () => {
    open.value = !open.value;
  };
  return (
    <SafeAreaComp>
      <HeaderComp
        showBackButton={false}
        screenName={'Contacts'}
        onPress={() => goBack()}
        RightIcon={<SearchIcon width={25} height={25} />}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} title="Click me" />
      </View>

      <View style={styles.content}>
        <Parent open={open} />
      </View>
    </SafeAreaComp>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 24,
  },
  buttonContainer: {
    flex: 1,
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parent: {
    width: 200,
  },
  wrapper: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
  },
  animatedView: {
    width: '100%',
    overflow: 'hidden',
  },
  box: {
    height: 120,
    width: 120,
    color: '#f8f9ff',
    backgroundColor: '#b58df1',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
