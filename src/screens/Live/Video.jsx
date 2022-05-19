import React from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import WebView from "react-native-webview";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import Colors from "../../constants/Colors";
import { BaseWrapper } from "../../components/Untils";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import {
  createOrUpdateByUniqueIdService,
  getSingleNoteService,
} from "../../services/note";
import get from "lodash/get";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
export default function VideoScreen({ route }) {
  const [playing, setPlaying] = React.useState(false);
  const playerRef = React.useRef();
  const { id } = get(
    route.params,
    "params",
    route.params
  );

  const onStateChange = React.useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      alert("video has finished playing!");
    }
  }, []);
  return (
      <ScrollView style={{ paddingTop: 10 }}>
        <BaseWrapper style={[ {
          // transform: [{ rotate: "90deg" }]
        }]}>
          <YoutubePlayer
            height={heightPercentageToDP('50%')}
            width={widthPercentageToDP('100%')}
            play={playing}
            videoId={id}
            ref={playerRef}
            onChangeState={onStateChange}
            webViewStyle={{
              borderRadius: 10,
              backgroundColor: Colors().primary2,
            }}
          />
        </BaseWrapper>
      </ScrollView>
  );
}
