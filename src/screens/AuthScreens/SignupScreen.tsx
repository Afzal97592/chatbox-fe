import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Back from '../../assets/icons/Back.svg';
import SquareButton from '../../components/buttons/SquareButton';
import CustomText from '../../components/CustomText';
import InputWithLabel from '../../components/inputs/InputWithLabel';
import SafeAreaComp from '../../components/SafeAreaComp';
import {primary} from '../../constants/colors';
import {
  moderateScale,
  SCREEN_WIDTH,
  verticalScale,
} from '../../utils/responsive';
import HeaderComp from '../../components/HeaderComp';
import {goBack} from '../../utils/navigationService';
import useFormValidation from '../../hooks/validateFields';
import {useRegisterUserMutation} from '../../redux/api/user/userApis';
import PopupModal from '../../components/models/PopupModal';

const SignupScreen = () => {
  const {formData, errors, handleInputChange, validateForm, isValidated} =
    useFormValidation({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

  const [register, {isLoading, error, data}] = useRegisterUserMutation();
  const [showModel, setIsShowModel] = useState(false);

  const handleSubmit = async () => {
    if (validateForm()) {
      console.log('Form submitted successfully!', formData);
      const userData = await register(formData);
    }
  };

  return (
    <SafeAreaComp>
      <HeaderComp onPress={() => goBack()} />
      <View style={styles.topContainer}>
        <CustomText variant="h1" fontfamily="Nunito-ExtraBold">
          Sign up with Email
        </CustomText>
        <CustomText variant="h4" style={{textAlign: 'center'}}>
          Get chatting with friends and family today by signin up for our chat
          app!
        </CustomText>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <InputWithLabel
            inputLabel="Your Name"
            placeholder="Enter Your Name"
            labelColor={primary.btn}
            value={formData.name}
            onChangeText={text => handleInputChange('name', text)}
            error={errors.name}
            inputContainer={{marginBottom: verticalScale(36)}}
          />
          <InputWithLabel
            inputLabel="Your Email"
            placeholder="Enter Your Email"
            labelColor={primary.btn}
            value={formData.email}
            error={errors.email}
            inputContainer={{marginBottom: verticalScale(36)}}
            onChangeText={text => handleInputChange('email', text)}
          />
          <InputWithLabel
            inputLabel="Your Password"
            placeholder="Enter Your Password"
            labelColor={primary.btn}
            value={formData.password}
            error={errors.password}
            onChangeText={text => handleInputChange('password', text)}
            inputContainer={{marginBottom: verticalScale(36)}}
          />
          <InputWithLabel
            inputLabel="Confirm Password"
            placeholder="Confirm Password"
            labelColor={primary.btn}
            value={formData.confirmPassword}
            error={errors.confirmPassword}
            onChangeText={text => handleInputChange('confirmPassword', text)}
            inputContainer={{marginBottom: verticalScale(36)}}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <SquareButton
          title="Sign Up"
          textColor={isValidated ? primary.background : primary.gray}
          style={{
            paddingVertical: verticalScale(13),
            backgroundColor: isValidated ? primary.btn : primary.extraLight,
          }}
          onPress={handleSubmit}
        />
      </View>
      <PopupModal
        visible={!showModel}
        onClose={() => setIsShowModel(false)}
        title="Success"
        subtitle="You successfully registered! please login continue"
        buttonText="Continue login"
        isCrossIcon={false}
      />
    </SafeAreaComp>
  );
};

export default SignupScreen;

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
    position: 'absolute',
    bottom: verticalScale(40),
    width: SCREEN_WIDTH - moderateScale(80),
    alignSelf: 'center',
  },
});
