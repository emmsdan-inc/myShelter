import $http from "./api";
import { Alert } from "react-native";

export async function createOrUpdateByUniqueIdService(data) {
  try {
    const search = await $http.post("note", data);
    return search.data;
  } catch (error) {
    return error?.response?.data || error.message;
  }
}

export async function getSingleNoteService(id) {
  try {
    const note = await $http.get(`note/${id}`);
    return note.data;
  } catch (error) {
    return error?.response?.data || error.message;
  }
}
