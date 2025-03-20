import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Back from '../../assets/icons/Back.svg';
import SquareButton from '../../components/buttons/SquareButton';
import CustomText from '../../components/CustomText';
import InputWithLabel from '../../components/inputs/InputWithLabel';
import SafeAreaComp from '../../components/SafeAreaComp';
import {primary} from '../../constants/colors';
import {moderateScale, verticalScale} from '../../utils/responsive';
import HeaderComp from '../../components/HeaderComp';
import {goBack} from '../../utils/navigationService';
import {globalStyles} from '../../globalCss/globalCss';
import {fbIcon, GoogleIcon} from '../../constants/ImagesPath';
import useFormValidation from '../../hooks/validateFields';
import {useLoginUserMutation} from '../../redux/api/user/userApis';
import {mmKvStorage} from '../../utils/mmkv-storage-utils';

const SigninScreen = () => {
  const {formData, errors, handleInputChange, validateForm, isValidated} =
    useFormValidation({
      email: '',
      password: '',
    });

  const [loginUser, {data, error, isLoading}] = useLoginUserMutation();

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        console.log('Form submitted successfully!!!!', formData);
        const result = await loginUser(formData);
        if (result.data.token) {
          console.log('Token:', result.data.token);
          mmKvStorage.setItem('token', result.data.token);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };
  return (
    <SafeAreaComp>
      <HeaderComp onPress={() => goBack()} />
      <View style={styles.topContainer}>
        <CustomText variant="h1" fontfamily="Nunito-ExtraBold">
          Log in to Chatbox
        </CustomText>
        <CustomText variant="h4" style={{textAlign: 'center'}}>
          Welcome back! Sign in using your social account or email to continue
          us
        </CustomText>
      </View>
      <View
        style={{
          ...globalStyles.row,
          gap: moderateScale(36),
          marginVertical: verticalScale(18),
          marginTop: verticalScale(30),
        }}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => Alert.alert('Coming Soon')}>
          <Image source={GoogleIcon} style={{width: '100%', height: '100%'}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => Alert.alert('Coming Soon')}>
          <Image source={fbIcon} style={{width: '100%', height: '100%'}} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...globalStyles.row,
          gap: moderateScale(16),
          marginVertical: verticalScale(10),
        }}>
        <View style={{...styles.line}} />
        <CustomText
          variant="h1"
          fontfamily="Nunito-SemiBold"
          color={primary.gray}>
          OR
        </CustomText>
        <View style={styles.line} />
      </View>
      <View style={styles.inputContainer}>
        <InputWithLabel
          inputLabel="Your Email"
          placeholder="Enter Your Email"
          error={errors.email}
          value={formData.email}
          onChangeText={text => handleInputChange('email', text)}
          labelColor={primary.btn}
          inputContainer={{marginBottom: verticalScale(36)}}
        />
        <InputWithLabel
          inputLabel="Your Password"
          placeholder="Enter Your Password"
          error={errors.password}
          value={formData.password}
          onChangeText={text => handleInputChange('password', text)}
          secureTextEntry={true}
          labelColor={primary.btn}
          inputContainer={{marginBottom: verticalScale(36)}}
        />
      </View>
      <View style={styles.buttonContainer}>
        <SquareButton
          title="Sign In"
          onPress={handleSubmit}
          textColor={isValidated ? primary.background : primary.gray}
          style={{
            backgroundColor: isValidated ? primary.btn : primary.extraLight,
          }}
          disable={!isValidated}
        />
      </View>
    </SafeAreaComp>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    marginTop: verticalScale(50),
    gap: verticalScale(20),
  },
  inputContainer: {
    marginVertical: verticalScale(40),
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: verticalScale(60),
    marginHorizontal: moderateScale(18),
  },
  icon: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(100),
    // backgroundColor: primary.dark,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(12),
    borderWidth: moderateScale(1),
    borderColor: primary.dark,
  },
  line: {
    height: verticalScale(1),
    backgroundColor: primary.borderColor,
    flex: 1,
    marginVertical: verticalScale(16),
  },
});
