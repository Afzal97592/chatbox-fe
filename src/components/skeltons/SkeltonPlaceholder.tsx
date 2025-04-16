import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SCREEN_W_WIDTH} from '../../utils/responsive';

const SkeltonPlaceholderComponent = () => {
  return (
    <SkeletonPlaceholder
      borderRadius={10}
      backgroundColor="#E0E0E0"
      highlightColor="#00000090"
      speed={1000}
      angle={10}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
          <SkeletonPlaceholder.Item marginLeft={20}>
            <SkeletonPlaceholder.Item
              width={SCREEN_W_WIDTH - 200}
              height={20}
            />
            <SkeletonPlaceholder.Item marginTop={10} width={150} height={20} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          marginTop={30}
          width={70}
          height={30}
          borderRadius={20}
          paddingHorizontal={10}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default SkeltonPlaceholderComponent;

const styles = StyleSheet.create({});
