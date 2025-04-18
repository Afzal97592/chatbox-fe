import React, {FC, memo, ReactNode} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';

import {ViewStyle} from 'react-native';
import {globalStyles} from '../globalCss/globalCss';
import {primary} from '../constants/colors';

interface SafeAreaCompProps {
  style?: ViewStyle;
  children: ReactNode;
  statusbarColorIos?: ViewStyle;
  statusbarBackgroundColor?: string;
  barStyle?: 'dark-content' | 'light-content';
}

const SafeAreaComp: FC<SafeAreaCompProps> = ({
  style,
  children,
  statusbarColorIos,
  statusbarBackgroundColor,
  barStyle,
}) => {
  return (
    <>
      <View style={[globalStyles.container, style]}>
        <SafeAreaView />
        <StatusBar
          barStyle={barStyle ?? 'dark-content'}
          backgroundColor={statusbarBackgroundColor ?? primary.background}
        />
        {children}
      </View>
    </>
    // </SafeAreaView>
  );
};

export default memo(SafeAreaComp);
