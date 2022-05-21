import React from 'react';
import { Text, View } from '../../components/Themed';
import styles from './style';
import Spacer from '../../components/Spacer';
import Item from '../../components/ListItems';
import { FlatList, Platform, TextInput } from 'react-native';
import Button from '../../components/Button';
import { BaseWrapper, FlexSpaceBetween } from '../../components/Untils';
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
import { sendNotification, toaster } from '../../shared/helpers/func';
import Toast from 'react-native-toast-message';

const onShare = item => {
  prayerAndTestimoniesActions()(item.id, 'testimony');
};

export const GetTestimony = ({ onCreateTestimony, route }) => {
  const [data, setSearch] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const navigation = useNavigation();

  const onDelete = async item => {
    await prayerAndTestimoniesActions(() => {
      fetchData();
    })(item.id, 'testimony', 'delete');
  };
  const onEdit = item => {
    navigation.navigate(Routes.CreateTestimony, item);
  };
  const onSend = item => {
    console.log('onShare', item);
  };
  const getId = (item, action = () => {}) => {
    return () => action(item);
  };
  function fetchData() {
    setLoading(true);
    searchService('testimony', { limit: 100 }).then(({ data }) => {
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
          onShare={getId(item, onShare)}
          onDelete={getId(item, onDelete)}
          key={index}
          item={{ ...item, description: item.testimony, title: item.name }}
        />
      )}
      ListHeaderComponent={
        <>
          {(!data && !loading) || (data && !data.length) ? (
            <BaseWrapper style={{ alignItems: 'center' }}>
              <Spacer size={30} />
              <Text style={[styles.menuText, { textAlign: 'center' }]}>
                You have not shared any testimony yet.
              </Text>
              <Spacer />
              <Button onPress={onCreateTestimony} md give>
                Add Testimony
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

export function CreateTestimony({ route }) {
  const [state, setState] = React.useState({});
  React.useEffect(() => {
    if (route.params) {
      setState(route.params || {});
    }
  }, [route.params]);
  const onSave = async () => {
    if (state.id && !state.newTestimonyId) {
      // save
      const payload = {
        ...state,
        name: state.testimony.slice(0, 40),
        testimony: state.testimony,
      };
      await update('testimony/' + state.id, payload);
      await toaster('Testimony', 'Your testimony has been updated');
    } else {
      // create
      const payload = {
        name: state.testimony.slice(0, 40),
        testimony: state.testimony,
      };
      const data = await create('testimony', payload);
      setState(data);
      await toaster('Testimony', 'Your testimony has been added');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <BaseWrapper>
        <TopHeader
          title={`${state.name ? 'Edit' : 'Create'} Testimony`}
          back={{
            name: Routes.Testimony,
            params: { id: state.id, random: Math.random() },
          }}
          rightContent={
            <Ionicons
              name="checkmark-circle"
              size={30}
              color={Colors().primary}
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
          placeholder="Enter Your Testimony"
          value={state.testimony}
          onChangeText={text => setState({ ...state, testimony: text })}
          style={[styles.textArea, { height: '90%' }]}
          multiline={true}
          showsVerticalScrollIndicator={false}
        />
        <FlexSpaceBetween
          style={[
            {
              paddingHorizontal: 20,
              marginBottom: -15,
              justifyContent: 'flex-end',
            },
          ]}
        >
          <Ionicons
            name="arrow-redo"
            size={30}
            color={Colors().primary}
            onPress={() => onShare(state)}
          />
          <Spacer size={10} />
        </FlexSpaceBetween>
      </KeyboardAvoidingView>
    </View>
  );
}
