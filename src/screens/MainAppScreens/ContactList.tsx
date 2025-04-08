import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CrossIcon from '../../assets/icons/Cross.svg';
import SearchIcon from '../../assets/icons/Search.svg';
import PillButton from '../../components/buttons/PillButton';
import CustomText from '../../components/CustomText';
import HeaderComp from '../../components/HeaderComp';
import SearchInput from '../../components/inputs/SearchInput';
import SafeAreaComp from '../../components/SafeAreaComp';
import {primary} from '../../constants/colors';
import {useGetAllUsersQuery} from '../../redux/api/user/userApis';
import {goBack} from '../../utils/navigationService';
import {moderateScale, verticalScale} from '../../utils/responsive';

const ContactList = () => {
  const animTranslateY = useSharedValue(70);
  const animListTranslateY = useSharedValue(0);
  const animOpacity = useSharedValue(0);
  const [isSearchInputOpen, setIsSearchInputOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const {data, error} = useGetAllUsersQuery({});
  const [openModel, setOpenModel] = useState(true);

  const toggleInputContainer = () => {
    setIsSearchInputOpen(!isSearchInputOpen);
    if (animOpacity.value === 0) {
      animOpacity.value = withTiming(1, {duration: 700});
      animTranslateY.value = withTiming(100, {duration: 700});
      animListTranslateY.value = withTiming(70, {duration: 400});
    } else {
      animOpacity.value = withTiming(0, {duration: 700});
      animTranslateY.value = withTiming(70, {duration: 700});
      animListTranslateY.value = withTiming(0, {duration: 1000});
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animOpacity.value,
      transform: [{translateY: animTranslateY.value}],
    };
  });
  const animatedStyleList = useAnimatedStyle(() => {
    return {
      transform: [{translateY: animListTranslateY.value}],
    };
  });

  const CardComp = () => {
    return (
      <View style={styles.card}>
        <View style={styles.left}>
          <View style={styles.avatarContainer}>
            {true ? (
              <CustomText
                fontfamily="Nunito-SemiBold"
                color="#FFFFFF"
                fontSize={25}>
                AF
              </CustomText>
            ) : (
              <Image />
            )}
          </View>
          <View style={styles.nameContainer}>
            <CustomText fontfamily="Nunito-Medium" fontSize={14}>
              Afzal Ahmad
            </CustomText>
            <CustomText fontfamily="Nunito-Medium" fontSize={10}>
              Ahmad_97
            </CustomText>
          </View>
        </View>

        <View>
          <PillButton title="Add" />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaComp>
      <Animated.View style={[styles.searchContainer, animatedStyle]}>
        <SearchInput
          isCrossIcon={true}
          value={searchInput}
          onChangeText={text => setSearchInput(text)}
          onPressCross={() => setSearchInput('')}
        />
      </Animated.View>
      <HeaderComp
        showBackButton={false}
        screenName={'Contacts'}
        style={{paddingHorizontal: moderateScale(4)}}
        onPress={() => goBack()}
        RightIcon={
          isSearchInputOpen ? (
            <CrossIcon width={16} height={16} />
          ) : (
            <SearchIcon width={22} height={22} />
          )
        }
        onPressRightIcon={() => toggleInputContainer()}
      />

      <Animated.View style={[styles.listContainer, animatedStyleList]}>
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <CardComp />}
          keyExtractor={(item, index) => index.toString()}
        />
      </Animated.View>
    </SafeAreaComp>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 24,
  },

  searchContainer: {
    // position: 'absolute',
  },
  listContainer: {
    marginTop: verticalScale(14),
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(9),
  },
  left: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
  avatarContainer: {
    width: moderateScale(52),
    height: verticalScale(52),
    backgroundColor: primary.gray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(52 / 2),
  },
  nameContainer: {
    marginLeft: moderateScale(5),
  },
});
