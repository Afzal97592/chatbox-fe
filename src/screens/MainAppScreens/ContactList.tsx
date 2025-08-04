import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, Image, Platform, StyleSheet, View} from 'react-native';
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
import SkeltonPlaceholderComponent from '../../components/skeltons/SkeltonPlaceholder';
import {primary} from '../../constants/colors';
import {useGetAllUsersQuery} from '../../redux/api/user/userApis';
import {UserDataProps} from '../../types/commonTypes';
import {goBack} from '../../utils/navigationService';
import {moderateScale, verticalScale} from '../../utils/responsive';

const ContactList = () => {
  const animTranslateY = useSharedValue(70);
  const animListTranslateY = useSharedValue(0);
  const animOpacity = useSharedValue(0);
  const [isSearchInputOpen, setIsSearchInputOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const {data, error, isLoading, isFetching} = useGetAllUsersQuery({
    pageNum,
    limit: 10,
    searchQuery: searchQuery.trim(),
  });
  const [userData, setUserData] = useState<UserDataProps[]>([]);

  console.log('userData', userData.length);

  const [openModel, setOpenModel] = useState(true);

  const toggleInputContainer = () => {
    setIsSearchInputOpen(!isSearchInputOpen);
    if (animOpacity.value === 0) {
      let toBottom = Platform.OS === 'ios' ? 100 : 85;
      animOpacity.value = withTiming(1, {duration: 700});
      animTranslateY.value = withTiming(toBottom, {duration: 700});
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setPageNum(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    if (data && pageNum === 1) {
      setUserData(data?.users);
    } else if (data && pageNum > 1) {
      setUserData(prevUserData => [...prevUserData, ...data?.users]);
    }
  }, [data]);

  const handlePagination = () => {
    if (userData.length < data?.totalCount && !isFetching) {
      setPageNum(prevPageNum => prevPageNum + 1);
    }
  };

  // Memoized keyExtractor
  const keyExtractor = useCallback(
    (item: UserDataProps, index: number) => item._id || `fallback-key-${index}`,
    [],
  );

  // Memoized renderItem
  const renderItem = useCallback(
    ({item}: {item: UserDataProps}) => <CardComp {...item} />,
    [],
  );

  const CardComp = (item: UserDataProps) => {
    return (
      <View style={styles.card}>
        <View style={styles.left}>
          <View style={styles.avatarContainer}>
            {!item?.profilePicture ? (
              <CustomText
                fontfamily="Nunito-SemiBold"
                color="#FFFFFF"
                fontSize={25}>
                {item?.name.charAt(0).toLocaleUpperCase()}
              </CustomText>
            ) : (
              <Image
                source={{uri: item?.profilePicture}}
                style={styles.avatar}
              />
            )}
          </View>
          <View style={styles.nameContainer}>
            <CustomText fontfamily="Nunito-Medium" fontSize={14}>
              {item?.name}
            </CustomText>
            <CustomText fontfamily="Nunito-Medium" fontSize={10}>
              {item?.username}
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
          inputContainer={{
            marginVertical:
              Platform.OS === 'ios' ? verticalScale(12) : verticalScale(-10),
            padding:
              Platform.OS === 'ios' ? moderateScale(12) : moderateScale(5),
          }}
        />
      </Animated.View>
      <HeaderComp
        showBackButton={false}
        screenName={'Contacts'}
        style={{
          paddingHorizontal: moderateScale(4),
        }}
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
        {isFetching &&
          userData.length === 0 &&
          Array.from({length: 10}).map((_, index) => (
            <View style={{marginTop: verticalScale(10)}} key={index}>
              <SkeltonPlaceholderComponent />
            </View>
          ))}
        <FlatList
          data={userData}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem} // Use memoized renderItem
          keyExtractor={keyExtractor} // Use memoized keyExtractor
          onEndReachedThreshold={0.2}
          onEndReached={handlePagination}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: verticalScale(100),
          }}
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
    // marginTop: verticalScale(6),
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
    height: moderateScale(52),
    backgroundColor: primary.gray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(52 / 2),
  },
  nameContainer: {
    marginLeft: moderateScale(5),
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(52 / 2),
  },
});
