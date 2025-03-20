import {StyleSheet} from 'react-native';
import {primary} from '../constants/colors';
import {moderateScale} from '../utils/responsive';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary.background,
    paddingHorizontal: moderateScale(16),
  },

  rowWithBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
