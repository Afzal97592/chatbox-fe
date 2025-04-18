import React, {useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
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
import {goBack, navigate} from '../../utils/navigationService';
import {globalStyles} from '../../globalCss/globalCss';
import {
  ErrorAnimation,
  fbIcon,
  GoogleIcon,
  SuccessAnimation,
} from '../../constants/ImagesPath';
import useFormValidation from '../../hooks/validateFields';
import {useLoginUserMutation} from '../../redux/api/user/userApis';
import PopupModal from '../../components/models/PopupModal';
import {mmKvStorage} from '../../utils/mmkv-storage-utils';
import RootNavigation from '../../navigation/RootNavigation';
import {useDispatch} from 'react-redux';
import {setToken} from '../../redux/api/user/authSlice';

const SigninScreen = () => {
  const {formData, errors, handleInputChange, validateForm, isValidated} =
    useFormValidation({
      email: '',
      password: '',
    });

  const [loginUser, {data, error, isLoading}] = useLoginUserMutation();
  const dispatch = useDispatch();
  const [modalContent, setModalContent] = useState({
    title: '',
    subtitle: '',
    animationSource: null,
  });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const data = await loginUser(formData).unwrap();

        setModalContent({
          title: 'Success',
          subtitle: 'You successfully logged in!',
          animationSource: SuccessAnimation,
        });
        setShowModal(true);
        if (data.token) {
          setTimeout(() => {
            mmKvStorage.setItem('token', data.token);
            dispatch(setToken(data.token));
          }, 1000);
        }
      } catch (error: any) {
        console.error('Error submitting form:', error);
        setModalContent({
          title: 'Oops',
          subtitle:
            error?.data?.message || 'Something went wrong. Please try again.',
          animationSource: ErrorAnimation,
        });
        setShowModal(true);
      }
    }
  };
  isLoading && <Text>Loading...</Text>;
  return (
    <SafeAreaComp>
      <HeaderComp onPress={() => goBack()} />
      <ScrollView>
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
            <Image
              source={GoogleIcon}
              style={{width: '100%', height: '100%'}}
            />
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
      </ScrollView>
      <PopupModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title={modalContent.title}
        subtitle={modalContent.subtitle}
        animationSource={modalContent.animationSource}
        isCrossIcon={true}
        isOnBackPressClose={false}
      />
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
