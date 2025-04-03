import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Platform,
  StatusBar,
} from 'react-native';

import {VIDEO_DATA} from '@utils/constant';
import FeedRow from '@components/FeedRow';
import {videoDataType} from '@types/FeedDataType';
import {themeColor} from '@theme/colors';

const FeedPage = () => {
  const {height: windowHeight, width} = useWindowDimensions();
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [paused, setPaused] = useState(false); // Global play/pause state.
  const flatListRef = useRef(null);
  const [availableHeight, setAvailableHeight] = useState(windowHeight);

  useEffect(() => {
    const updateAvailableHeight = () => {
      let statusBarHeight = 0;
      if (Platform.OS === 'android') {
        statusBarHeight = StatusBar.currentHeight || 0; // Get status bar height
      }

      setAvailableHeight(windowHeight - statusBarHeight);
    };

    updateAvailableHeight();

    return () => {};
  }, [windowHeight]);

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any}) => {
      if (viewableItems.length > 0) {
        setVisibleIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 85, // Adjust as needed.
  }).current;

  const getItemLayout = useCallback(
    (_, index) => ({
      length: availableHeight,
      offset: availableHeight * index,
      index,
    }),
    [availableHeight],
  );

  console.log('availableHeight ', availableHeight);
  console.log('he ', windowHeight);
  const keyExtractor = useCallback(item => item.id, []);

  const handlePlayPause = () => {
    setPaused(!paused); // Toggle global pause state
  };

  const renderItem = useCallback(
    ({item, index}: {item: videoDataType; index: number}) => (
      <FeedRow
        item={item}
        isVisible={index === visibleIndex}
        height={availableHeight}
        width={width}
        paused={paused} // Pass global pause state
        onPlayPause={handlePlayPause}
      />
    ),
    [visibleIndex, availableHeight, width, paused],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={VIDEO_DATA}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        removeClippedSubviews
        windowSize={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: themeColor.bgPrimary,
  },
  container: {
    flex: 1,
    backgroundColor: themeColor.bgPrimary,
  },
});

export default FeedPage;
