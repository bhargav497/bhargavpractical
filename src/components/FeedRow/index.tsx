import {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {videoDataType} from '@types/FeedDataType';
import {themeColor} from '@theme/colors';
import {moderateScale, scale, verticalScale} from '@theme/dimen';

const FeedRow = ({
  item,
  isVisible,
  height,
  width,
  paused,
  onPlayPause,
}: {
  item: videoDataType;
  isVisible: boolean;
  height: number;
  width: number;
  paused: boolean;
  onPlayPause: () => void;
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const videoRef = useRef(null);
  const [internalPaused, setInternalPaused] = useState(!isVisible);
  const {top, bottom} = useSafeAreaInsets();
  console.log('TOP ', top);

  useEffect(() => {
    setInternalPaused(!isVisible || paused);
  }, [isVisible, paused]);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <View style={[styles.videoItemContainer, {height, width}]}>
      <TouchableOpacity style={styles.videoContainer} onPress={onPlayPause}>
        <Video
          ref={videoRef}
          source={{uri: item.videoUrl}}
          style={styles.video}
          resizeMode="cover"
          paused={internalPaused}
          repeat
          volume={1}
        />
        {internalPaused && (
          <TouchableOpacity style={styles.pauseOverlay} onPress={onPlayPause}>
            <Icon name="play" size={scale(50)} color={themeColor.icon} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      <View style={[styles.overlayContainer]}>
        <View
          style={[
            styles.topInfo,
            {paddingTop: top != 0 ? top : verticalScale(20)},
          ]}>
          <Image
            style={styles.profilePic}
            source={{uri: item.user.profilePic}}
          />
          <Text style={styles.username}>{item.user.username}</Text>
        </View>

        <View style={styles.bottomInfo}>
          <Text
            style={styles.description}
            numberOfLines={isDescriptionExpanded ? 0 : 1}>
            {item.description}
          </Text>
          {!isDescriptionExpanded && item.description?.trim()?.length > 50 && (
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.readMore}>Read More</Text>
            </TouchableOpacity>
          )}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Icon name="heart" size={scale(25)} color={themeColor.icon} />
              <Text style={styles.statText}>{item.likes}</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="comment" size={scale(25)} color={themeColor.icon} />
              <Text style={styles.statText}>{item.comments}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FeedRow;

const styles = StyleSheet.create({
  videoItemContainer: {
    width: '100%',
    backgroundColor: themeColor.bgPrimary,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pauseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor.iconContainer,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  topInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: themeColor.bgSecondary,
  },
  username: {
    color: themeColor.textPrimary,
    fontWeight: 'bold',
    fontSize: scale(18),
  },
  bottomInfo: {
    paddingBottom: verticalScale(40),
    paddingTop: verticalScale(20),
    backgroundColor: themeColor.iconContainer,
    paddingHorizontal: moderateScale(20),
  },
  description: {
    color: themeColor.textPrimary,
    fontSize: scale(16),
    marginBottom: 5,
  },
  readMore: {
    color: themeColor.textPrimary,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  statItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: moderateScale(15),
  },
  statText: {
    color: themeColor.textPrimary,
    fontSize: scale(14),
    marginTop: 5,
  },
});
