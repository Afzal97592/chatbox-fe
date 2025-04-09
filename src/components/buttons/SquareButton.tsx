import React, {FC, memo} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {primary} from '../../constants/colors';
import CustomText from '../CustomText';
import {moderateScale} from '../../utils/responsive';

interface Props {
  style?: Object;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7';
  title: string;
  onPress?: () => void;
  textColor?: string;
  disable?: boolean;
  isLoading?: boolean;
}

const SquareButton: FC<Props> = ({
  style = {},
  variant = 'h3',
  title = '',
  onPress,
  textColor = primary.gray,
  disable = false,
  isLoading,
  ...rest
}) => {
  console.log('disable', disable, isLoading);
  return (
    <TouchableOpacity
      style={{...styles.button, ...style}}
      onPress={onPress}
      disabled={disable}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <CustomText
          variant={variant}
          color={textColor}
          fontfamily="Nunito-SemiBold">
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default memo(SquareButton);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: primary.extraLight,
    justifyContent: 'center',
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
  },
});
