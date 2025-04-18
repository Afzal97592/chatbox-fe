import React, {FC, memo} from 'react';
import {Platform, StyleSheet, Text, TextStyle} from 'react-native';
import {primary} from '../constants/colors';
import {moderateScale} from '../utils/responsive';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7';
type PlatformType = 'ios' | 'android';

interface CustomTextProps {
  variant?: Variant;
  fontfamily?:
    | 'Nunito-Bold'
    | 'Nunito-ExtraBold'
    | 'Nunito-SemiBold'
    | 'Nunito-Regular'
    | 'Nunito-Black'
    | 'Nunito-Light'
    | 'Nunito-Medium';
  fontSize?: number;
  color?: string;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  onLayout?: (event: any) => void;
  numbersOfLines?: number;
}

const fontSizeMap: Record<Variant, Record<PlatformType, number>> = {
  h1: {android: 26, ios: 22},
  h2: {android: 24, ios: 20},
  h3: {android: 22, ios: 18},
  h4: {android: 20, ios: 16},
  h5: {android: 18, ios: 14},
  h6: {android: 14, ios: 10},
  h7: {android: 12, ios: 9},
};

const CustomText: FC<CustomTextProps> = ({
  variant,
  fontfamily = 'Nunito-Regular',
  fontSize,
  color,
  style,
  children,
  onLayout,
  numbersOfLines,
  ...props
}) => {
  let computedFontSize: number =
    Platform.OS === 'android'
      ? moderateScale(fontSize || 12)
      : moderateScale(fontSize || 10);

  if (variant && fontSizeMap[variant]) {
    const defaultSize = fontSizeMap[variant][Platform.OS as PlatformType];
    computedFontSize = moderateScale(defaultSize);
  }

  const fontFamilyStyle = {
    fontFamily: fontfamily,
  };

  return (
    <Text
      style={{
        ...styles.text,
        ...style,
        color: color || primary.text,
        fontSize: computedFontSize,

        ...fontFamilyStyle,
      }}
      numberOfLines={numbersOfLines !== undefined ? numbersOfLines : undefined}
      onLayout={onLayout}
      {...props}>
      {children}
    </Text>
  );
};

export default memo(CustomText);

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});
