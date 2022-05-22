import React from 'react';
import { Text, View } from '../../components/Themed';
import styles from './style';
import Spacer from '../../components/Spacer';
import Item from '../../components/ListItems';
import { FlatList, Platform, TextInput } from 'react-native';
import Button from '../../components/Button';
import { BaseWrapper } from '../../components/Untils';
import { useNavigation } from '@react-navigation/native';
import { TopHeader } from '../../components/NavTab/TabBar';
import Routes from '../../navigation/Routes';
import { KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import {
  create,
  prayerAndTestimoniesActions,
  update,
} from '../../services/others';
import { searchService } from '../../services/media';
import { toaster } from '../../shared/helpers/func';

const onShare = item => {
  prayerAndTestimoniesActions()(item.id, 'prayer-request');
};

export const GetPrayerRequests = ({ onCreatePrayer, route }) => {
  const [data, setSearch] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const navigation = useNavigation();

  const onDelete = async item => {
    await prayerAndTestimoniesActions(() => {
      fetchData();
    })(item.id, 'prayer-request', 'delete');
  };
  const onEdit = item => {
    navigation.navigate(Routes.CreatePrayerRequest, item);
  };
  const onSend = item => {
    console.log('onShare', item);
  };
  const getId = (item, action = () => {}) => {
    return () => action(item);
  };
  function fetchData() {
    setLoading(true);
    searchService('prayer-request', { limit: 100 }).then(({ data }) => {
      setLoading(false);
      setSearch(data);
    });
  }
  React.useEffect(() => {
    if (!loading) {
      fetchData();
    }
  }, [route.params]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <Item
          onPress={getId(item, onEdit)}
          onEdit={getId(item, onEdit)}
          onSend={getId(item, onSend)}
          onShare={getId(item, onShare)}
          onDelete={getId(item, onDelete)}
          key={index}
          item={item}
        />
      )}
      ListHeaderComponent={
        <>
          {(!data && !loading) || (data && !data.length) ? (
            <BaseWrapper style={{ alignItems: 'center' }}>
              <Spacer size={30} />
              <Text style={[styles.menuText, { textAlign: 'center' }]}>
                You have not added any Prayer Requests
              </Text>
              <Spacer />
              <Button onPress={onCreatePrayer} md give>
                Add Prayer Request
              </Button>
            </BaseWrapper>
          ) : loading ? (
            Array(20)
              .fill(0)
              .map((_, index) => (
                <View key={index}>
                  <Item isLoading />
                  <Spacer size={10} />
                </View>
              ))
          ) : (
            <Spacer size={10} />
          )}
        </>
      }
      ListFooterComponent={
        <>
          <Spacer size={60} />
        </>
      }
      refreshing={loading}
    />
  );
};

export function CreatePrayerRequest({ route }) {
  const [state, setState] = React.useState({});
  const [updated, setUpdate] = React.useState(false);
  const [prev, setPrev] = React.useState({});
  React.useEffect(() => {
    if (route.params) {
      setState(route.params || {});
    }
  }, [route.params]);
  const onSave = async () => {
    try {
      if (state.id && !state.newPrayerId) {
        // save
        const payload = {
          ...state,
          title: state.description?.slice(0, 40),
          description: state.description,
        };
        await update('prayer-request/' + state.id, payload);
        setPrev(payload);

        toaster('Prayer Request', 'Your PR has been updated');
      } else {
        // create
        const payload = {
          title: state.description?.slice(0, 40),
          description: state.description,
        };
        const data = await create('prayer-request', payload);
        setState(data);
        setPrev(data);

        toaster('Prayer Request', 'Your PR has been created');
      }
      setUpdate(true);
    } catch (error) {
      console.error(error);
    }
  };

  const textInput = React.useRef(null);
  React.useEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
    if (state.description !== prev.description) {
      setUpdate(false);
    }
  }, [state]);

  return (
    <View style={{ flex: 1 }}>
      <BaseWrapper>
        <TopHeader
          title={`${state.title ? 'Edit' : 'Create'} Prayer Request`}
          back={{
            name: Routes.PrayerRequest,
            params: { id: state.id, random: Math.random() },
          }}
          rightContent={
            <Ionicons
              name={updated ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={updated ? 25 : 35}
              color={updated ? Colors().skeletonSuccess : Colors().blackGlaze}
              onPress={onSave}
            />
          }
        />
      </BaseWrapper>
      <Spacer size={15} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TextInput
          placeholder="Enter Your Prayer request"
          placeholderTextColor={Colors().textPlaceholder}
          autoFocus={true}
          ref={textInput}
          style={[styles.textArea, { color: Colors().text }]}
          value={state.description}
          onChangeText={text => setState({ ...state, description: text })}
          multiline={true}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
