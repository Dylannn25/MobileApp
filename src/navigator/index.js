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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import Cars from "../screens/Cars";
import FindCar from "../screens/modal/findCar";
import MyAddress from "../screens/myAddress";
import AddAddress from "../screens/addAddress";
import EditProfile from "../screens/editProfile";
import ChangePassword from "../screens/changePassword";
import Booking from "../screens/Booking";
import MyTrip from "../screens/myTrip";
import DatePicker from "../common/Calendarpicker/datePicker";
import FavCar from "../screens/favCar";
import BecomeCarOwner from "../screens/becomeCarOwner";
import SearchAddress from "../screens/modal/searchAddress";
import Admin from "../screens/admin/Admin";
import Dashboard from "../screens/admin/Dashboard";
import DriveLicense from "../screens/driveLicense";
import Notification from "../common/notification/notification";

const Navigator = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const { userToken } = useContext(AuthContext);
  const userLogin = useAppSelector(user);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: "#1ecb15",
              tabBarInactiveTintColor: "#fff",
              tabBarStyle: {
                // Màu nền của thanh tab
                backgroundColor: "#000",
                borderTopWidth: 2, // Độ dày của đường viền phía trên thanh tab
                borderTopColor: "#1ecb15", // Màu của đường viền phía trên thanh tab
                // borderTopLeftRadius: 30,
                // borderTopEndRadius: 30,
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomePage}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <View>
                      <Icon
                        type="octicon"
                        name="home"
                        color={focused ? "#1ecb15" : "#fff"}
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
            {/* <Tab.Screen
              name="Notification"
              component={Notification}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <View>
                      <Icon
                        type="octicon"
                        name="home"
                        color={focused ? "#1ecb15" : "#fff"}
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
            /> */}
            <Tab.Screen
              name="Car"
              component={Cars}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <View>
                      <Icon
                        type="font-awesome"
                        name="car"
                        color={focused ? "#1ecb15" : "#fff"}
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
            {userLogin.store !== '' && userLogin.store && (
              <Tab.Screen
                name="Admin"
                component={Admin}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View>
                        <Icon
                          type="font-awesome"
                          name="pie-chart"
                          color={focused ? "#1ecb15" : "#fff"}
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
            )}
            <Tab.Screen
              name="HiddenScreen"
              options={{ tabBarButton: () => null, headerShown: false }} // Ẩn nút tab cho màn hình này
            >
              {() => (
                <Stack.Navigator initialRouteName="YourHiddenScreen">
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="DriveLicense"
                    component={DriveLicense}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="otp"
                    component={Otp}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="FindCar"
                    component={FindCar}
                    options={{
                      presentation: "modal",
                    }}
                  />
                  <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="CarDetail"
                    component={CarDetail}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="MyAccount"
                    component={MyAccount}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="MyAddress"
                    component={MyAddress}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="AddAddress"
                    component={AddAddress}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="DatePicker"
                    component={DatePicker}
                    options={{
                      headerShown: false,
                    }}
                  />
                  {/* <Stack.Screen
                    name="Booking"
                    component={Booking}
                    options={{
                      headerShown: false,
                    }}
                  /> */}
                  <Stack.Screen
                    name="MyTrip"
                    component={MyTrip}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="FavCar"
                    component={FavCar}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="BecomeCarOwner"
                    component={BecomeCarOwner}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="SearchAddress"
                    component={SearchAddress}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                      headerShown: false,
                    }}
                  />
                  {/* Thêm các màn hình khác trong Stack.Navigator nếu cần */}
                </Stack.Navigator>
              )}
            </Tab.Screen>
            {userToken && userLogin.fullName ? (
              <>
                <Tab.Screen
                  name={userLogin?.fullName}
                  component={Profile}
                  options={{
                    tabBarIcon: ({ focused }) => {
                      return (
                        <View>
                          <Icon
                            type="font-awesome"
                            name="user"
                            color={focused ? "#1ecb15" : "#fff"}
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
            ) : (
              <>
                <Tab.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{
                    tabBarIcon: ({ focused }) => {
                      return (
                        <View>
                          <Icon
                            type="font-awesome"
                            name="user"
                            color={focused ? "#1ecb15" : "#fff"}
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
                <Tab.Screen
                  name="SignUp"
                  component={SignupScreen}
                  options={{
                    tabBarIcon: ({ focused }) => {
                      return (
                        <View>
                          <Icon
                            type="font-awesome"
                            name="user"
                            color={focused ? "#1ecb15" : "#fff"}
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
          </Tab.Navigator>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default Navigator;
