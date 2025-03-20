import React, {FC, memo, ReactNode} from 'react';
import {SafeAreaView, View} from 'react-native';

import {ViewStyle} from 'react-native';
import {globalStyles} from '../globalCss/globalCss';
import {primary} from '../constants/colors';

interface SafeAreaCompProps {
  style?: ViewStyle;
  children: ReactNode;
  statusbarColorIos?: ViewStyle;
}

const SafeAreaComp: FC<SafeAreaCompProps> = ({
  style,
  children,
  statusbarColorIos,
}) => {
  return (
    <>
      <View style={[globalStyles.container, style]}>
        <SafeAreaView />
        {children}
      </View>
    </>
    // </SafeAreaView>
  );
};

export default memo(SafeAreaComp);
