import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, memo, useEffect, useRef, useState} from 'react';
import {moderateScale, verticalScale} from '../../utils/responsive';
import CustomText from '../CustomText';
import {primary} from '../../constants/colors';
import {fontFamilies} from '../../globalCss/fontstyle';

interface InputWithLabelProps {
  labelStyle?: TextStyle;
  errorColor?: string;
  inputLabel?: string;
  inputStyle?: Object;
  labelColor?: string;
  inputContainer?: Object;
  error?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  secureTextEntry?: boolean;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  labelVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7';
  errorVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7';
}

const InputWithLabel: FC<InputWithLabelProps> = ({
  labelStyle = {},
  inputLabel,
  errorColor = primary.warning,
  inputStyle = {},
  inputContainer = {},
  error,
  placeholder,
  placeholderTextColor,
  onChangeText,
  value,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  multiline,
  numberOfLines,
  maxLength,
  labelVariant,
  errorVariant,
  labelColor,
}) => {
  return (
    <View
      style={{
        ...styles.inputContainer,
        ...inputContainer,
      }}>
      <CustomText
        variant={labelVariant ?? 'h5'}
        color={labelColor}
        fontfamily="Nunito-SemiBold"
        style={{...styles.label, ...labelStyle}}>
        {inputLabel}
      </CustomText>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor ?? '#CDD1D0'}
        style={{
          ...styles.input,
          ...inputStyle,
        }}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
      />
      {error && (
        <CustomText
          color={errorColor ?? '#FF2D1B'}
          style={styles.error}
          variant={errorVariant ?? 'h6'}
          fontfamily="Nunito-SemiBold">
          {error}
        </CustomText>
      )}
    </View>
  );
};

export default memo(InputWithLabel);

const styles = StyleSheet.create({
  inputContainer: {
    gap: verticalScale(8),
    width: '100%',
  },
  input: {
    width: '100%',
    borderBottomWidth: moderateScale(1),
    paddingBottom: verticalScale(8),
    borderBottomColor: primary.borderColor,
    color: primary.dark,
    fontFamily: fontFamilies.medium,
    fontSize: moderateScale(14),
  },
  label: {},
  error: {alignSelf: 'flex-end', color: primary.warning},
});
