import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import CustomText from '../CustomText';
import {primary} from '../../constants/colors';
import {moderateScale, verticalScale} from '../../utils/responsive';

interface BtnProps {
  style?: ViewStyle;
  title: string;
  textStyle?: TextStyle;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7';
  textColor?: string;
}

const PillButton: FC<BtnProps> = ({
  style,
  title,
  textStyle,
  onPress,
  disabled,
  isLoading,
  variant,
  textColor,
}) => {
  return (
    <View style={{...styles.btnContainer, ...style}}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <CustomText
          style={textStyle}
          color={textColor ?? '#fff'}
          fontfamily="Nunito-Regular"
          variant={variant ?? 'h5'}>
          {title}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default PillButton;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: primary.btn,
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(14),
  },
});
