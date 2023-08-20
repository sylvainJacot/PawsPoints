import { ProfileScreenProps } from "../../screens/profile-screen/type";
import { userDataProps } from "../../types/user-data";

export type StackNavigationParamList = {
  Welcome: undefined;
  Home: {userData: userDataProps};
  Profile: {userData: userDataProps};
  SignUp: undefined;
};