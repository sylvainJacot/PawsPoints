import { proModeProps } from "../../types/pro-mode";
import { userDataProps } from "../../types/user-data";

export type StackNavigationParamList = {
  Welcome: undefined;
  Home: {userData: userDataProps};
  Profile: {userData: userDataProps};
  CardCreation: {proMode: proModeProps};
  SignUp: undefined;
};