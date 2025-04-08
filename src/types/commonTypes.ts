import {TextStyle} from 'react-native';

export interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export type VariantTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7';

export type FontFamilyTypes =
  | 'Nunito-Bold'
  | 'Nunito-ExtraBold'
  | 'Nunito-SemiBold'
  | 'Nunito-Regular'
  | 'Nunito-Black'
  | 'Nunito-Light'
  | 'Nunito-Medium';

export interface TextInputProps {
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
  labelVariant?: VariantTypes;
  errorVariant?: VariantTypes;
  isCrossIcon?: boolean;
  onPressCross?: () => void;
}
