import React from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import FlexSpaceBetweenCenter, { BaseWrapper } from "../../components/Untils";
import { scale } from "react-native-size-matters";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import { SearchInput } from "../../components/Input";
import Spacer from "../../components/Spacer";
import { Title } from "../../components/SectionTitle/SectionTitle";
import AudioListCard from "../../components/Audio/AudioListCard";
import useCacheableGetRequest from "../../hooks/useCacheableGetRequest";
import Colors from "../../constants/Colors";
import AudioListSkeleton from "../../components/Audio/AudioListSkeleton";

export default function DiscoverScreen() {
  const route = useRoute();
  const { category, series } = route.params || {};

  const [value, setValue] = React.useState("");
  const [type, setType] = React.useState(category ? "category" : "series");

  const { data, error, prev, next, loading, setParams, reset } =
    useCacheableGetRequest("media", true, { categories: category, series });
  const onTitlePress = type => () => {
    setType(type);
  };
  const loadData = () => {
    if (loading) return;
    reset({ series, categories: category, search: value });
  };
  React.useEffect(() => {
    // setParams({ series, categories: category })
    if (value || value === "") loadData();
  }, [value, series, category]);
  React.useEffect(() => {
    // reset({ series, categories: category })
    loadData();
  }, [series, category]);

  React.useEffect(() => {
    setValue("");
  }, [route.params]);
  return (
    <SafeAreaView>
      <Spacer size={15} />
      <BaseWrapper>
        <Text style={{ fontSize: scale(24), textTransform: "capitalize" }}>
          {route.params?.title}
        </Text>
        <Spacer size={5} />
        <SearchInput value={value} onSearch={setValue} />
      </BaseWrapper>
      <Spacer size={15} />
      {!category ? (
        <BaseWrapper>
          <FlexSpaceBetweenCenter>
            {!category ? (
              <Title
                title={"Series"}
                onPress={onTitlePress("series")}
                active={type === "series" || !type}
              />
            ) : null}
            {category ? (
              <Title
                title={"Category"}
                onPress={onTitlePress("category")}
                active={type === "category" || !type}
              />
            ) : null}
            <Title
              title={"Recently Played"}
              onPress={onTitlePress("recent")}
              active={type === "recent"}
            />
            {category && series ? null : (
              <Title
                title={"Downloads"}
                onPress={onTitlePress("download")}
                active={type === "download"}
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
          keyExtractor={item => item.id}
          style={styles.flatList}
          ListFooterComponent={() => (
            <>
              {loading ? (
                <AudioListSkeleton />
              ) : !data || data.length === 0 ? (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: scale(16),
                    paddingVertical: 50,
                  }}
                >
                  Nothing to display.{"\n"}
                  <Text style={{ fontSize: scale(12) }}>
                    Try searching for something else.
                  </Text>
                </Text>
              ) : null}
              <Spacer size={40} />
            </>
          )}
          refreshing={loading}
          onEndReached={next}
          onScroll={next}
          onEndReachedThreshold={0.5}
        />
      </BaseWrapper>
      <Spacer size={60} />
    </SafeAreaView>
  );
}
