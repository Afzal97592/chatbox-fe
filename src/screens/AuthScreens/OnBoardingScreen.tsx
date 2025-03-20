import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SafeAreaComp from '../../components/SafeAreaComp';
import {primary} from '../../constants/colors';
import {Ellipse, fbIcon, GoogleIcon, Logo} from '../../constants/ImagesPath';
import {
  moderateScale,
  SCREEN_W_HEIGHT,
  SCREEN_W_WIDTH,
  verticalScale,
} from '../../utils/responsive';
import {globalStyles} from '../../globalCss/globalCss';
import CustomText from '../../components/CustomText';
import {fontFamilies} from '../../globalCss/fontstyle';
import SquareButton from '../../components/buttons/SquareButton';
import {navigate} from '../../utils/navigationService';

const OnBoardingScreen = () => {
  return (
    <SafeAreaComp
      style={{...globalStyles.container, backgroundColor: primary.dark}}>
      <ImageBackground
        source={Ellipse}
        style={styles.bgImage}></ImageBackground>
      <View
        style={{
          ...globalStyles.row,
          marginVertical: verticalScale(16),
          marginBottom: verticalScale(26),
        }}>
        <Image source={Logo} style={styles.logoImg} resizeMode="contain" />
        <CustomText
          style={{
            color: primary.background,
            marginHorizontal: moderateScale(6),
          }}
          color={primary.background}
          variant={'h4'}
          fontfamily={'Nunito-SemiBold'}>
          chatbox
        </CustomText>
      </View>
      <View style={{marginHorizontal: moderateScale(16)}}>
        <CustomText
          fontfamily={'Nunito-Bold'}
          color={primary.background}
          fontSize={moderateScale(55)}
          style={{
            lineHeight: verticalScale(70),
          }}>
          Connect friends easily & quickly
        </CustomText>
        <CustomText
          variant="h3"
          color={primary.background}
          style={{
            lineHeight: verticalScale(26),
            marginVertical: verticalScale(16),
          }}>
          Our chat app is the perfect way to stay connected with friends and
          family.
        </CustomText>
        <View
          style={{
            ...globalStyles.row,
            gap: moderateScale(36),
            marginVertical: verticalScale(16),
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
            color={primary.background}>
            OR
          </CustomText>
          <View style={styles.line} />
        </View>
        <View style={{marginVertical: verticalScale(20)}}>
          <SquareButton
            style={{padding: moderateScale(12)}}
            variant="h3"
            title="Signup with email"
            onPress={() => {
              navigate('SignupScreen');
            }}
          />
        </View>
        <View style={{...globalStyles.row, marginVertical: verticalScale(26)}}>
          <CustomText color={primary.light} variant="h3">
            Existing Account?{'  '}
          </CustomText>
          <TouchableOpacity onPress={() => navigate('SigninScreen')}>
            <CustomText
              color={primary.background}
              variant="h2"
              fontfamily="Nunito-SemiBold">
              Log in
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaComp>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: primary.dark,
    flex: 1,
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    width: SCREEN_W_WIDTH,
    height: SCREEN_W_HEIGHT,
  },
  logoImg: {
    width: moderateScale(18),
    height: moderateScale(22),
  },

  icon: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(100),
    backgroundColor: primary.dark,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(12),
    borderWidth: moderateScale(1),
    borderColor: primary.background,
  },
  line: {
    height: verticalScale(1.5),
    backgroundColor: primary.light,
    flex: 1,
    marginVertical: verticalScale(16),
  },
});
