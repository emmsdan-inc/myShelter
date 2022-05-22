import React from 'react';
import { FlatList, Text } from 'react-native';
import FlexSpaceBetweenCenter, { BaseWrapper } from '../../components/Untils';
import { scale } from 'react-native-size-matters';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';
import { SearchInput } from '../../components/Input';
import Spacer from '../../components/Spacer';
import { Title } from '../../components/SectionTitle/SectionTitle';
import AudioListCard from '../../components/Audio/AudioListCard';
import useCacheableGetRequest from '../../hooks/useCacheableGetRequest';
import Colors from '../../constants/Colors';
import AudioListSkeleton from '../../components/Audio/AudioListSkeleton';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DiscoverScreen() {
  const route = useRoute();
  const { category, series } = route.params || {};

  const [value, setValue] = React.useState('');
  const [type, setType] = React.useState(
    category ? 'category' : series ? 'series' : '',
  );

  const { data, error, prev, next, loading, setParams, reset, isLastPage } =
    useCacheableGetRequest('media', true, {
      categories: category,
      series,
      limit: 15,
    });
  const onTitlePress = type => () => {
    setType(type);
  };
  const loadData = () => {
    if (loading) return;
    reset({ series, categories: category, search: value });
  };
  React.useEffect(() => {
    // setParams({ series, categories: category })
    if (value || value === '') loadData();
  }, [value, series, category]);
  React.useEffect(() => {
    // reset({ series, categories: category })
    loadData();
  }, [series, category]);

  React.useEffect(() => {
    setValue('');
  }, [route.params]);
  return (
    <SafeAreaView>
      <BaseWrapper>
        {route.params?.title && (
          <>
            <Spacer size={12} />
            <Text
              style={{
                color: Colors().blackGlaze,
                fontSize: scale(24),
                textTransform: 'capitalize',
              }}
            >
              {route.params?.title}
            </Text>
          </>
        )}
        <SearchInput value={value} onSearch={setValue} />
      </BaseWrapper>
      {category || series ? (
        <BaseWrapper>
          <FlexSpaceBetweenCenter>
            {series && (
              <Title
                title={'Series'}
                onPress={onTitlePress('series')}
                active={type === 'series' || !type}
              />
            )}
            {category && (
              <Title
                title={'Category'}
                onPress={onTitlePress('category')}
                active={type === 'category' || !type}
              />
            )}
          </FlexSpaceBetweenCenter>
        </BaseWrapper>
      ) : null}
      <BaseWrapper>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item: audio, index }) => (
            <AudioListCard
              id={audio.id}
              time={audio.time}
              uri={audio.thumbnail_url}
              title={audio.title}
              author={audio.author}
              media={{ ...audio, playlistIndex: data, playlist: index }}
              onPress={() => {}}
              playlistIndex={data}
              playlist={index}
            />
          )}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          style={styles.flatList}
          ListFooterComponent={() => (
            <>
              {loading ? (
                <AudioListSkeleton />
              ) : !data || data.length === 0 ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: scale(16),
                    paddingVertical: 50,
                  }}
                >
                  Nothing to display.{'\n'}
                  <Text style={{ fontSize: scale(12) }}>
                    Try searching for something else.
                  </Text>
                </Text>
              ) : null}
              {!isLastPage ? (
                <TouchableOpacity
                  onPress={next}
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    alignSelf: 'center',
                  }}
                >
                  <Text style={{ fontSize: scale(14) }}>Load More</Text>
                </TouchableOpacity>
              ) : null}
              <Spacer size={40} />
            </>
          )}
          refreshing={loading}
          onEndReachedThreshold={0.5}
        />
      </BaseWrapper>
      <Spacer size={60} />
    </SafeAreaView>
  );
}
