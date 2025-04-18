import React, {useEffect, useState} from 'react';
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
    searchQuery,
  });
  const [userData, setUserData] = useState<UserDataProps[]>([]);

  const [openModel, setOpenModel] = useState(true);

  const toggleInputContainer = () => {
    setIsSearchInputOpen(!isSearchInputOpen);
    if (animOpacity.value === 0) {
      let toBottom = verticalScale(100);
      // Platform.OS === 'ios' ? 100 : 85;
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
      setUserData([...userData, ...data?.users]);
    }
  }, [data]);

  const handlePagination = () => {
    if (userData.length < data?.totalCount && !isFetching) {
      setPageNum(pageNum + 1);
    }
  };

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
              Platform.OS === 'ios' ? verticalScale(12) : verticalScale(-16),
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
          Array.from({length: 10}).map((_, index) => (
            <View style={{marginTop: verticalScale(10)}}>
              <SkeltonPlaceholderComponent key={index} />
            </View>
          ))}
        <FlatList
          data={userData}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <CardComp {...item} />}
          keyExtractor={item => item._id}
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
