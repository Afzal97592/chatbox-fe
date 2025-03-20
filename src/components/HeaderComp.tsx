import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, memo} from 'react';
import {primary} from '../constants/colors';
import Back from '../assets/icons/Back.svg';
import CustomText from './CustomText';

interface HeaderCompProps {
  width?: number;
  height?: number;
  style?: ViewStyle;
  onPress: () => void;
  screenName?: string;
  RightIcon?: React.ReactNode;
  showBackButton?: boolean;
  onPressRightIcon?: () => void;
}

const HeaderComp: FC<HeaderCompProps> = ({
  width,
  height,
  style = {},
  onPress,
  screenName,
  RightIcon,
  showBackButton = true,
  onPressRightIcon,
}) => {
  return (
    <View style={{...styles.headerContainer, ...style}}>
      {showBackButton ? (
        <TouchableOpacity onPress={onPress}>
          <Back width={width ?? 30} height={height ?? 30} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      {screenName && (
        <CustomText variant="h3" fontfamily="Nunito-SemiBold">
          {screenName}
        </CustomText>
      )}
      {RightIcon && (
        <TouchableOpacity onPress={onPressRightIcon}>
          {RightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(HeaderComp);

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: primary.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
