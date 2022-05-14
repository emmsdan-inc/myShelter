import Routes from "../../navigation/Routes";
import { scale } from "react-native-size-matters";

export default {
  sideMenu: [
    { icon: "paper-plus", label: "Prayer Request", uri: Routes.PrayerRequest },
    { icon: "heart", label: "Testimony", uri: Routes.Testimony },
    { icon: "download", label: "Downloads", uri: Routes.Register },
    // { icon: "edit", label: "Notes", uri: Routes.Register },
    { icon: "", label: "", uri: "", spacer: scale(45) },
    { icon: "", label: "", uri: "", spacer: scale(45) },
    { icon: "call", label: "Contact Us", uri: Routes.ContactUs },
    { icon: "setting", label: "Settings", uri: Routes.Register },
    { icon: "logout", label: "Logout", uri: "Logout" },
  ],
};
