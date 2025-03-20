import {Dimensions, Platform, PixelRatio} from 'react-native';

export const {width: SCREEN_W_WIDTH, height: SCREEN_W_HEIGHT} =
  Dimensions.get('window');

const scale = SCREEN_W_WIDTH / 375;

const scaleVertical = SCREEN_W_HEIGHT / 812;

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('screen');

export function moderateScale(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
}

export function verticalScale(size: number) {
  const newSize = size * scaleVertical;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
}

export function isTab() {
  if (SCREEN_W_WIDTH > 550) {
    return true;
  } else {
    return false;
  }
}

export function isScreenHeight770() {
  if (SCREEN_W_HEIGHT > 740 && SCREEN_W_HEIGHT < 760) {
    return true;
  } else {
    return false;
  }
}
