import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ScrollView } from 'react-native';
import { BaseWrapper } from '../../components/Untils';
import get from 'lodash/get';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import moment from 'moment';

export default function VideoScreen({ route }) {
  const [playing, setPlaying] = React.useState(false);
  const playerRef = React.useRef();
  const { id, ...info } = get(route.params, 'params', route.params);

  const onStateChange = React.useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      alert('video has finished playing!');
    }
  }, []);
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT,
    );
  }

  return (
    <ScrollView style={{ paddingTop: 10 }}>
      <BaseWrapper>
        <View
          style={[
            {
              maxHeight: heightPercentageToDP('50%') / 2,
              overflow: 'hidden',
              marginVertical: 15,
            },
          ]}
        >
          <YoutubePlayer
            height={heightPercentageToDP('50%')}
            play={playing}
            videoId={id}
            ref={playerRef}
            onChangeState={onStateChange}
            onFullScreenChange={changeScreenOrientation}
          />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
          {get(info, 'title', '')}
        </Text>
        <Text
          style={{
            paddingBottom: 10,
            fontSize: 14,
            fontWeight: 'normal',
            color: Colors().primary,
          }}
        >
          Started {moment(get(info, 'publishedAt', '')).fromNow()}
        </Text>
        <Text style={{ fontSize: 16 }}>{get(info, 'description', '')}</Text>
      </BaseWrapper>
    </ScrollView>
  );
}
