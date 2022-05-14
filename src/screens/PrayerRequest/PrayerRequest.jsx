import React from "react";
import { Text, View } from "../../components/Themed";
import styles from "./style";
import Spacer from "../../components/Spacer";
import data from "./data";
import Item from "../../components/ListItems";
import { Alert, FlatList, Platform, TextInput } from "react-native";
import Button from "../../components/Button";
import { BaseWrapper, FlexSpaceBetween } from "../../components/Untils";
import { useNavigation } from "@react-navigation/native";
import { TopHeader } from "../../components/NavTab/TabBar";
import Routes from "../../navigation/Routes";
import { KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {
  create,
  prayerAndTestimoniesActions,
  update,
} from "../../services/others";
import { searchService } from "../../services/media";
import useCacheableGetRequest from "../../hooks/useCacheableGetRequest";

const onShare = item => {
  prayerAndTestimoniesActions(item.id, "prayer-request");
};

export const GetPrayerRequests = ({ onCreatePrayer, route }) => {
  const [data, setSearch] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const navigation = useNavigation();

  const onDelete = async item => {
    await prayerAndTestimoniesActions(() => {
      fetchData();
    })(item.id, "prayer-request", "delete");
  };
  const onEdit = item => {
    navigation.navigate(Routes.CreatePrayerRequest, item);
  };
  const onSend = item => {
    console.log("onShare", item);
  };
  const getId = (item, action = () => {}) => {
    // console.log ("getId", item.id, action.name);
    return () => action(item);
  };
  function fetchData() {
    setLoading(true);
    searchService("prayer-request", { limit: 100 }).then(({ data }) => {
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
            <BaseWrapper style={{ alignItems: "center" }}>
              <Spacer size={30} />
              <Text style={[styles.menuText, { textAlign: "center" }]}>
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
  React.useEffect(() => {
    if (route.params) {
      setState(route.params || {});
    }
  }, [route.params]);
  const onSave = async () => {
    if (state.id && !state.newPrayerId) {
      // save
      const payload = {
        ...state,
        title: state.description?.slice(0, 40),
        description: state.description,
      };
      await update("prayer-request/" + state.id, payload);
    } else {
      // create
      const payload = {
        title: state.description?.slice(0, 40),
        description: state.description,
      };
      const data = await create("prayer-request", payload);
      setState(data);
      console.log("data", data);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <BaseWrapper>
        <TopHeader
          title={`${state.title ? "Edit" : "Create"} Prayer Request`}
          back={{
            name: Routes.PrayerRequest,
            params: { id: state.id, random: Math.random() },
          }}
        />
      </BaseWrapper>
      <Spacer size={15} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          placeholder="Enter Your Prayer request"
          value={state.description}
          onChangeText={text => setState({ ...state, description: text })}
          style={[styles.textArea, { height: "90%" }]}
          multiline={true}
          showsVerticalScrollIndicator={false}
        />
        <FlexSpaceBetween
          style={[
            {
              paddingHorizontal: 20,
              marginBottom: -15,
              justifyContent: "flex-end",
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
          <Ionicons
            name="checkmark-circle"
            size={30}
            color={Colors().primary}
            onPress={onSave}
          />
        </FlexSpaceBetween>
      </KeyboardAvoidingView>
    </View>
  );
}
