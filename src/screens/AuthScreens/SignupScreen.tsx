import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
import {goBack, navigate} from '../../utils/navigationService';
import useFormValidation from '../../hooks/validateFields';
import {useRegisterUserMutation} from '../../redux/api/user/userApis';
import PopupModal from '../../components/models/PopupModal';
import {SuccessAnimation, ErrorAnimation} from '../../constants/ImagesPath';
import {globalStyles} from '../../globalCss/globalCss';

const SignupScreen = () => {
  const {formData, errors, handleInputChange, validateForm, isValidated} =
    useFormValidation({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    subtitle: '',
    animationSource: null,
    btnText: '',
  });

  const [register, {isLoading}] = useRegisterUserMutation();

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      await register(formData).unwrap();
      setModalContent({
        title: 'Success',
        subtitle: 'You successfully registered! Please login to continue.',
        animationSource: SuccessAnimation,
        btnText: 'Continue login',
      });
      setShowModal(true);
    } catch (err: any) {
      setModalContent({
        title: 'Oops',
        subtitle:
          err?.data?.message || 'Something went wrong. Please try again.',
        animationSource: ErrorAnimation,
        btnText: 'Try again',
      });
      setShowModal(true);
    }
  };

  const handleNavigation = () => {
    if (modalContent.title === 'Oops') {
      setShowModal(false);
    } else {
      navigate('SigninScreen');
      setShowModal(false);
    }
  };

  return (
    <SafeAreaComp>
      <HeaderComp onPress={goBack} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        scrollsToTop={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <CustomText variant="h1" fontfamily="Nunito-ExtraBold">
            Sign up with Email
          </CustomText>
          <CustomText variant="h4" style={{textAlign: 'center'}}>
            Get chatting with friends and family today by signing up for our
            chat app!
          </CustomText>
        </View>
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
            onChangeText={text => handleInputChange('email', text)}
            error={errors.email}
            inputContainer={{marginBottom: verticalScale(36)}}
          />
          <InputWithLabel
            inputLabel="Your Password"
            placeholder="Enter Your Password"
            labelColor={primary.btn}
            value={formData.password}
            onChangeText={text => handleInputChange('password', text)}
            error={errors.password}
            inputContainer={{marginBottom: verticalScale(36)}}
          />
          <InputWithLabel
            inputLabel="Confirm Password"
            placeholder="Confirm Password"
            labelColor={primary.btn}
            value={formData.confirmPassword}
            onChangeText={text => handleInputChange('confirmPassword', text)}
            error={errors.confirmPassword}
            inputContainer={{marginBottom: verticalScale(36)}}
          />
        </View>
        <View style={styles.buttonContainer}>
          <SquareButton
            title="Sign Up"
            textColor={isValidated ? primary.background : primary.gray}
            style={{
              paddingVertical: verticalScale(13),
              backgroundColor: isValidated ? primary.btn : primary.extraLight,
            }}
            onPress={handleSubmit}
            disable={isLoading}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>

      <PopupModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title={modalContent.title}
        subtitle={modalContent.subtitle}
        animationSource={modalContent.animationSource}
        buttonText={modalContent.btnText}
        onButtonPress={handleNavigation}
        isCrossIcon={false}
        isOnBackPressClose={true}
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
    marginBottom: verticalScale(100),
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: verticalScale(25),
    width: SCREEN_WIDTH - moderateScale(80),
    alignSelf: 'center',
  },
});
