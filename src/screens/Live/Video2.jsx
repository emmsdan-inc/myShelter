import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import Colors from '../../constants/Colors';
import { BaseWrapper } from '../../components/Untils';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import {
  createOrUpdateByUniqueIdService,
  getSingleNoteService,
} from '../../services/note';

export default function VideoScreen({ route }) {
  const [playing, setPlaying] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [note, setNote] = React.useState('');
  const noteREf = React.useRef();
  const { id, publishedAt, ...video } = route.params;

  const onStateChange = React.useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      alert('video has finished playing!');
    }
  }, []);
  const saveNote = React.useCallback(
    async state => {
      try {
        const payload = {
          title: video.title,
          note,
          uniqueId: id + publishedAt,
        };
        setSaving(!saving);
        const data = await createOrUpdateByUniqueIdService(payload);
        setSaving(false);
      } catch (e) {
        setSaving(false);
        console.log(e);
      }
    },
    [note],
  );

  React.useEffect(() => {
    getSingleNoteService(id + publishedAt).then(resp => {
      if (resp && resp.length > 0) {
        saveNote(resp[0]?.note);
      }
    });
  }, [video, route]);

  return (
    <KeyboardAvoidingView
      style={{ height: '90%', padding: 0, margin: 0 }}
      behavior={'height'}
    >
      <ScrollView style={{ paddingTop: 10 }}>
        <BaseWrapper>
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={id}
            onChangeState={onStateChange}
            webViewStyle={{
              borderRadius: 10,
              backgroundColor: Colors().primary2,
            }}
            fullscreen={true}
          />
        </BaseWrapper>
        <BaseWrapper style={{ height: '80%', maxHeight: 400 }}>
          <Pressable
            onPress={() => {
              noteREf.current?.focus();
            }}
            style={{
              minHeight: 300,
              backgroundColor: Colors().background,
              flex: 1,
              borderColor: Colors().primary2,
              borderWidth: 1,
              padding: 10,
              marginTop: -40,
            }}
          >
            <TextInput
              ref={noteREf}
              placeholder={'Take notes...'}
              multiline
              onChangeText={setNote}
              value={note}
            />
          </Pressable>
          <Spacer />
          <Button disabled={saving || note.length <= 5} onPress={saveNote}>
            {saving ? <ActivityIndicator color={Colors().primary} /> : 'Save'}
          </Button>
        </BaseWrapper>
        <Spacer size={50} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
