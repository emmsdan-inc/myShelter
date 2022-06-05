import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { BaseWrapper, HorizontalScroll } from '../../components/Untils';
import styles from './style';
import Spacer from '../../components/Spacer';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import $http from "../../services/api";
import Skeleton from "../Home/Skeleton";
import AudioImageCard from "../../components/Audio/AudioImageCard";
import Routes from "../../navigation/Routes";

export default function DiscoverScreen({ navigation }) {
    const [response, setResponse] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [, setError] = React.useState(null);
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
    return loading || !response ? (
        <Skeleton />
    ) : (
        <ScrollView>
            {response
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => {
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
                                hideSeeMore={!item.media.length}
                                onPress={onPress}
                            />
                            <Spacer size={8} />
                            <HorizontalScroll>

                                {
                                    (item.media || []).length ?
                                        data.map((audio, i) => (
                                            <View key={audio.media.id} style={styles.cardContainer}>
                                                {audio.value}
                                            </View>
                                        ))
                                        :
                                        <BaseWrapper>
                                            <Text style={{marginLeft: -10}}>Coming Soon</Text>
                                        </BaseWrapper>
                                }
                            </HorizontalScroll>
                            <Spacer size={10} />
                        </View>
                    );
                })}
        </ScrollView>
    );
}
