import React from 'react';
import $http from '../../services/api';
import { Text, View } from 'react-native';
import Skeleton from './Skeleton';
import AudioImageCard from '../../components/Audio/AudioImageCard';
import Routes from '../../navigation/Routes';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Spacer from '../../components/Spacer';
import { HorizontalScroll } from '../../components/Untils';
import styles from './style';
import { BaseWrapper } from '../../components/Untils';
import useTrackPlayer from '../../hooks/useTrackPlayer';

const ListHomeContent = ({ navigation }) => {
  const [response, setResponse] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const getAudio = async () => {
    setLoading(true);
    try {
      const resp = await $http.get('category');
      setResponse(resp.data.data);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    getAudio();
  }, []);
  if ((error && !loading) || (!loading && !response)) {
    return (
      <BaseWrapper>
        <Text style={{ fontSize: 20 }}>Could not load media at this time.</Text>
      </BaseWrapper>
    );
  }

  return loading || !response ? (
    <Skeleton />
  ) : (
    <>
      {response
        .filter(item => (item.media || []).length)
        .map((item, index) => {
          const data = [];

          if (item.media.length) {
            for (let i = 0; i < item.media.length; ) {
              const media1 = item.media[i];
              const media2 = item.media[i + 1];
              if (media2 && item.media.length >= 3) {
                const media = media2 || media1 || {};
                data.push({
                  value: [
                    <AudioImageCard
                      media={media}
                      key={media.id}
                      uri={media2.thumbnail_url}
                      playlistIndex={i + 1}
                      playlist={item.media}
                    />,
                    <AudioImageCard
                      playlistIndex={i}
                      playlist={item.media}
                      key={(media1 || media2).id}
                      media={media1 || media2}
                      uri={(media1 || media2 || {}).thumbnail_url}
                    />,
                  ],
                  media: media2 || media1,
                });
                i += 2;
              } else {
                const media = media1 || media2 || {};
                data.push({
                  value: (
                    <AudioImageCard
                      playlistIndex={i}
                      playlist={item.media}
                      media={media}
                      key={media.id}
                      uri={media1.thumbnail_url}
                    />
                  ),
                  media: media1 || media2 || {},
                });
                i++;
              }
            }
          }

          const names = {
            accelerate: 'Accelerate Service Sermons',
          };
          const onPress = () => {
            navigation.navigate(Routes.Discover, {
              screen: Routes.DiscoverHome,
              params: { category: item.category_id, title: item.name },
            });
          };
          return (
            <View key={(item.category_id || item.name) + Math.random()}>
              <SectionTitle
                title={names[item.name] || item.name}
                onPress={onPress}
              />
              <Spacer size={8} />
              <HorizontalScroll>
                {data.map((audio, i) => (
                  <View key={audio.media.id} style={styles.cardContainer}>
                    {audio.value}
                  </View>
                ))}
              </HorizontalScroll>
              <Spacer size={10} />
            </View>
          );
        })}
    </>
  );
};

export default ListHomeContent;
