import React, { useContext } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Tabs } from "expo-router/tabs";
import Home from "../screens/Home";
import HomePage from "../screens/HomePage";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import { Icon } from "react-native-elements";
import { AuthContext } from "../store/auth";
import { user } from "../store/slices/user";
import { useAppSelector } from "../store";
import Otp from "../screens/Otp";
import ForgotPassword from "../screens/ForgotPassword";
import Profile from "../screens/Profile";
import CarDetail from "../screens/carDetails";
import MyAccount from "../screens/myAccount";
import MyAddress from "../screens/myAddress";
import AddAddress from "../screens/addAddress";
import EditProfile from "../screens/editProfile";
import ChangePassword from "../screens/changePassword";
import Booking from "../screens/Booking";
import MyTrip from "../screens/myTrip";
import DatePicker from "../common/Calendarpicker/datePicker";
import FavCar from "../screens/favCar";
import BecomeCarOwner from "../screens/becomeCarOwner";
import Admin from "../screens/admin/Admin";
import Dashboard from "../screens/admin/Dashboard";

const Navigator = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  const userLogin = useAppSelector(user);
  if (isLoading) {
    return (
      <>
        <View className="flex flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }
  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
      >
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#1ecb15",
          }}
        >
          <Tabs.Screen
            name="Home"
            component={HomePage}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View>
                    <Icon
                      type="octicon"
                      name="home"
                      color="#1ecb15"
                      size={24}
                    />
                  </View>
                );
              },
              tabBarLabelStyle: {
                fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
              },
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="Forgot Password"
            component={ForgotPassword}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => {
                return (
                  <View>
                    <Icon
                      type="octicon"
                      name="home"
                      color="#1ecb15"
                      size={24}
                    />
                  </View>
                );
              },
              tabBarLabelStyle: {
                fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
              },
              headerShown: false,
            }}
          />
           <Tabs.Screen
            name="MyTrip"
            component={MyTrip}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => {
                return (
                  <View>
                    <Icon
                      type="octicon"
                      name="home"
                      color="#1ecb15"
                      size={24}
                    />
                  </View>
                );
              },
              tabBarLabelStyle: {
                fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
              },
              headerShown: false,
            }}
          />
          {userToken && userLogin?.fullName && (
            <>
              <Tabs.Screen
                name={userLogin?.fullName}
                component={SignupScreen}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
            </>
          )}
          {!userToken && (
            <>
              <Tabs.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
              <Tabs.Screen
                name="SignUp"
                component={SignupScreen}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
              <Tabs.Screen
                name="otp"
                component={Otp}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
              <Tabs.Screen
                name="Profile"
                component={Profile}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
              <Tabs.Screen
                name="CarDetail"
                component={CarDetail}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
              <Tabs.Screen
                name="MyAccount"
                component={MyAccount}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
               <Tabs.Screen
                name="MyAddress"
                component={MyAddress}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
              <Tabs.Screen
                name="AddAddress"
                component={AddAddress}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
               <Tabs.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
              <Tabs.Screen
                name="Booking"
                component={Booking}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
              <Tabs.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
              <Tabs.Screen
                name="DatePicker"
                component={DatePicker}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
               <Tabs.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
               <Tabs.Screen
                name="FavCar"
                component={FavCar}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
              <Tabs.Screen
                name="BecomeCarOwner"
                component={BecomeCarOwner}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
              <Tabs.Screen
                name="Admin"
                component={Admin}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="user"
                          color="#1ecb15"
                          size={24}
                        />
                      </View>
                    );
                  },
                  tabBarLabelStyle: {
                    fontSize: 11, // Đây là cách bạn thiết lập kích thước font cho tabBarLabel
                  },
                  headerShown: false,
                }}
              />
            </>
          )}
        </Tabs>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default Navigator;
