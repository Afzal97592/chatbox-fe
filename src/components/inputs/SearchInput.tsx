import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {
  moderateScale,
  SCREEN_W_WIDTH,
  SCREEN_WIDTH,
  verticalScale,
} from '../../utils/responsive';
import SearchIcon from '../../assets/icons/Search.svg';
import {TextInputProps} from '../../types/commonTypes';
import CustomText from '../CustomText';
import CrossIcon from '../../assets/icons/Cross.svg';

const SearchInput: FC<TextInputProps> = ({
  inputStyle = {},
  inputContainer = {},
  placeholder,
  placeholderTextColor,
  onChangeText,
  value,
  isCrossIcon = false,
  onPressCross,
}) => {
  return (
    <View style={{...styles.inputContainer, ...inputContainer}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <SearchIcon width={18} height={18} />
        <TextInput
          placeholder={placeholder ?? 'Search...'}
          style={{...styles.input, ...inputStyle}}
          placeholderTextColor={placeholderTextColor ?? '#999999'}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {isCrossIcon && (
        <TouchableOpacity onPress={onPressCross}>
          <CrossIcon width={12} height={12} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F6F6',
    padding: moderateScale(5),
    borderRadius: moderateScale(8),

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    marginHorizontal: moderateScale(10),
    width: SCREEN_W_WIDTH - moderateScale(200),
  },
});
