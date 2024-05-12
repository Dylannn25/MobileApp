import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { rentalService } from "../services/service";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { useAppSelector } from "../store";
import { user } from "../store/slices/user";
import { AuthContext } from "../store/auth";
const Profile = () => {
  const navigation = useNavigation();
  const userLogin = useAppSelector(user);
  const { logout } = useContext(AuthContext);
  return (
    <ScrollView>
      <View className="flex bg-[#f3f3f6] ">
        <View className=" bg-[#bbf7d0] w-full h-44 rounded-2xl items-center"></View>
        <Animated.View
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className=" -mt-16 overflow-hidden justify-center items-center"
        >
          <Image
            className="w-36 h-36 rounded-full border-[#1ecb15] border-[2px]"
            source={{
              uri: userLogin?.photos
                ? userLogin.photos
                : "https://img.freepik.com/premium-vector/man-character-driving-his-eco-car_99413-107.jpg",
            }}
          />
        </Animated.View>
        <Animated.View entering={FadeIn.delay(400).duration(1000).springify()}>
          <Text className="font-[600] text-[18px] text-black text-center mt-4">
            {userLogin?.fullName}
          </Text>
        </Animated.View>
        <View className="flex mt-8 mx-4 rounded-2xl bg-white flex-1">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HiddenScreen", { screen: "MyAccount" })
            }
          >
            <Animated.View
              entering={FadeInLeft.delay(600).duration(1000).springify()}
              className=" flex flex-row items-center border-b-[1px] border-[#ddd] my-2 mx-2"
            >
              <Icon
                type="font-awesome"
                name="user-o"
                color="#030712"
                size={18}
                className=" w-[64px] my-2"
              ></Icon>
              <Text className="text-[#111111] text-[16px] font-bold my-2 ">
                My account
              </Text>
              <View className="ml-auto">
                <Icon
                  type="font-awesome"
                  name="angle-right"
                  color="#030712"
                  size={28}
                  className=" w-[64px] my-2"
                ></Icon>
              </View>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HiddenScreen", { screen: "MyTrip" })
            }
          >
            <Animated.View
              entering={FadeInRight.delay(600).duration(1000).springify()}
              className=" flex flex-row items-center border-b-[1px] border-[#ddd] my-2 mx-2"
            >
              <Icon
                type="font-awesome"
                name="car"
                color="#030712"
                size={18}
                className=" w-[64px] my-2"
              ></Icon>
              <Text className="text-[#111111] text-[16px] font-bold my-2 ">
                My trips
              </Text>
              <View className="ml-auto">
                <Icon
                  type="font-awesome"
                  name="angle-right"
                  color="#030712"
                  size={28}
                  className=" w-[64px] my-2"
                ></Icon>
              </View>
            </Animated.View>
          </TouchableOpacity>
          {userLogin?.store=="" && (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("HiddenScreen", {
                    screen: "BecomeCarOwner",
                  })
                }
              >
                <Animated.View
                  entering={FadeInLeft.delay(600).duration(1000).springify()}
                  className=" flex flex-row items-center border-b-[1px] border-[#ddd] my-2 mx-2"
                >
                  <Icon
                    type="font-awesome"
                    name="handshake-o"
                    color="#030712"
                    size={18}
                    className=" w-[64px] my-2"
                  ></Icon>
                  <Text className="text-[#111111] text-[16px] font-bold my-2 ">
                    Become car owner
                  </Text>
                  <View className="ml-auto">
                    <Icon
                      type="font-awesome"
                      name="angle-right"
                      color="#030712"
                      size={28}
                      className=" w-[64px] my-2"
                    ></Icon>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HiddenScreen", { screen: "FavCar" })
            }
          >
            <Animated.View
              entering={FadeInRight.delay(600).duration(1000).springify()}
              className=" flex flex-row items-center border-b-[1px] border-[#ddd] my-2 mx-2"
            >
              <Icon
                type="font-awesome"
                name="heart-o"
                color="#030712"
                size={18}
                className=" w-[64px] my-2"
              ></Icon>
              <Text className="text-[#111111] text-[16px] font-bold my-2 ">
                Favorite cars
              </Text>
              <View className="ml-auto">
                <Icon
                  type="font-awesome"
                  name="angle-right"
                  color="#030712"
                  size={28}
                  className=" w-[64px] my-2"
                ></Icon>
              </View>
            </Animated.View>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => navigation.navigate("HiddenScreen",{ screen: 'MyAddress' })}>
            <Animated.View
              entering={FadeInLeft.delay(600).duration(1000).springify()} className=" flex flex-row items-center border-b-[1px] border-[#ddd] my-2 mx-2">
              <Icon
                type="font-awesome"
                name="address-book-o"
                color="#030712"
                size={18}
                className=" w-[64px] my-2"
              ></Icon>
              <Text className="text-[#111111] text-[16px] font-bold my-2 ">
                My address
              </Text>
              <View className="ml-auto">
                <Icon
                  type="font-awesome"
                  name="angle-right"
                  color="#030712"
                  size={28}
                  className=" w-[64px] my-2"
                ></Icon>
              </View>
            </Animated.View>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HiddenScreen", { screen: "DriveLicense" })
            }
          >
            <Animated.View
              entering={FadeInRight.delay(600).duration(1000).springify()}
              className=" flex flex-row items-center my-2 mx-2"
            >
              <Icon
                type="font-awesome"
                name="id-card-o"
                color="#030712"
                size={18}
                className=" w-[64px] my-2"
              ></Icon>
              <Text className="text-[#111111] text-[16px] font-bold my-2 ">
                Driver license
              </Text>
              <View className="ml-auto">
                <Icon
                  type="font-awesome"
                  name="angle-right"
                  color="#030712"
                  size={28}
                  className=" w-[64px] my-2"
                ></Icon>
              </View>
            </Animated.View>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Animated.View
              entering={FadeInLeft.delay(600).duration(1000).springify()} className=" flex flex-row items-center my-2 mx-2">
              <Icon
                type="font-awesome"
                name="credit-card"
                color="#030712"
                size={18}
                className=" w-[64px] my-2"
              ></Icon>
              <Text className="text-[#111111] text-[16px] font-bold my-2 ">
                My card
              </Text>
              <View className="ml-auto">
                <Icon
                  type="font-awesome"
                  name="angle-right"
                  color="#030712"
                  size={28}
                  className=" w-[64px] my-2"
                ></Icon>
              </View>
            </Animated.View>
          </TouchableOpacity> */}
        </View>
        <View className="flex mt-12 mx-4 rounded-2xl bg-white flex-1">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HiddenScreen", { screen: "ChangePassword" })
            }
          >
            <View className=" flex flex-row items-center my-2 mx-2">
              <Icon
                type="font-awesome"
                name="key"
                color="#030712"
                size={18}
                className=" w-[64px] my-2"
              ></Icon>
              <Text className="text-[#111111] text-[16px] font-bold my-2 ">
                Change password
              </Text>
              <View className="ml-auto">
                <Icon
                  type="font-awesome"
                  name="angle-right"
                  color="#030712"
                  size={28}
                  className=" w-[64px] my-2"
                ></Icon>
              </View>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <View className=" flex flex-row items-center my-2 mx-2">
              <Icon
                type="font-awesome"
                name="trash-o"
                color="#030712"
                size={18}
                className=" w-[64px] my-2"
              ></Icon>
              <Text className="text-[#111111] text-[16px] font-bold my-2 ">
                Delete account
              </Text>
              <View className="ml-auto">
                <Icon
                  type="font-awesome"
                  name="angle-right"
                  color="#030712"
                  size={28}
                  className=" w-[64px] my-2"
                ></Icon>
              </View>
            </View>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity onPress={() => logout()}>
          <View className=" flex flex-row items-center justify-center my-4">
            <Icon
              type="font-awesome"
              name="sign-out"
              color="#ff1a1a"
              size={28}
              className="w-[36px]"
            ></Icon>
            <Text className="text-[#ff1a1a] text-[18px] font-[600]">
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
