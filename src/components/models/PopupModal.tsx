import React, {FC} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import LottieView from 'lottie-react-native';
import CustomText from '../CustomText';
import CloseIcon from '../../assets/icons/Cross.svg';
import PillButton from '../buttons/PillButton';
import {moderateScale, verticalScale} from '../../utils/responsive';
import {primary} from '../../constants/colors';
import {FontFamilyTypes, VariantTypes} from '../../types/commonTypes';

interface PopupModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  animationSource?: any;
  isOnBackPressClose?: boolean;
  buttonText?: string;
  onButtonPress?: () => void;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  variant?: VariantTypes;
  fontfamily?: FontFamilyTypes;
  isCrossIcon?: boolean;
}

const PopupModal: FC<PopupModalProps> = ({
  visible,
  onClose,
  title = 'Add Title',
  subtitle = 'Add Subtitle',
  animationSource,
  isOnBackPressClose = true,
  buttonText,
  onButtonPress,
  containerStyle,
  titleStyle,
  subtitleStyle,
  buttonStyle,
  variant = 'h2',
  fontfamily = 'Nunito-Bold',
  isCrossIcon = true,
}) => {
  const renderButton = () => {
    if (buttonText) {
      return (
        <PillButton
          title={buttonText}
          onPress={onButtonPress}
          style={{...styles.button, ...buttonStyle}}
        />
      );
    }
    return null;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback
        onPress={isOnBackPressClose ? onClose : undefined}>
        <View style={styles.overlay}>
          <BlurView style={styles.blurView} blurType="light" blurAmount={10} />
          <TouchableWithoutFeedback>
            <View style={[styles.modalContent, containerStyle]}>
              {isCrossIcon && (
                <TouchableWithoutFeedback onPress={onClose}>
                  <View style={styles.closeButton}>
                    <CloseIcon
                      width={moderateScale(10)}
                      height={moderateScale(10)}
                    />
                  </View>
                </TouchableWithoutFeedback>
              )}

              <CustomText
                variant={variant}
                fontfamily={fontfamily}
                style={{...styles.title, ...titleStyle}}>
                {title}
              </CustomText>
              {animationSource && (
                <LottieView
                  source={animationSource}
                  autoPlay
                  loop
                  style={styles.animation}
                />
              )}

              <CustomText
                variant="h4"
                fontfamily="Nunito-Regular"
                style={{...styles.subtitle, ...subtitleStyle}}>
                {subtitle}
              </CustomText>

              {renderButton()}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PopupModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width: '80%',
    backgroundColor: primary.background,
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
    zIndex: 1,
  },
  animation: {
    width: moderateScale(100),
    height: moderateScale(100),
    marginBottom: verticalScale(20),
  },
  title: {
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  subtitle: {
    textAlign: 'center',
    color: primary.gray,
  },
  button: {
    marginTop: verticalScale(20),
    backgroundColor: primary.btn,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(25),
  },
});
