import {
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../store";
import {user} from "../store/slices/user";
import { AuthContext } from "../store/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
const MyAddress = () => {
    const navigation = useNavigation();
    const userLogin = useAppSelector(user);
    const { logout } = useContext(AuthContext);
  return (
    <SafeAreaView className="bg-white">
    <View className="bg-gray-50 h-full">
      <View className="bg-white">
      <View className="flex-row justify-center items-center">
            <View className=" absolute top-[0px] left-[20px] ">
              <Icon
                type="font-awesome"
                name="angle-left"
                color="#000000"
                size={28}
                onPress={() => navigation.navigate("HiddenScreen", { screen: "Profile" })}
              />
            </View>
            <View className=" mb-2">
              <Text className="font-[400] text-[20px] text-black text-center">
                My Address
              </Text>
            </View>
          </View>
      </View>
      <View className="flex mt-5">
        <TouchableOpacity>
          <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} className=" flex flex-row items-center border-b-[1px] border-[#ddd] pb-4 mx-2">
          <View>
            <Icon
              type="font-awesome"
              name="home"
              color="#030712"
              size={28}
              className=" w-[54px]"
            ></Icon>
          </View>
          <View className="ml-1">
            <Text className="text-[#000000] text-[16px] font-bold ">
             Home
            </Text>
            <Text className="text-[#6b7280] text-[13px] font-regular ">
            {userLogin?.address}
            </Text>
            </View>
            <View className="flex-row ml-auto">
              <Icon
                type="font-awesome"
                name="angle-right"
                color="#030712"
                size={24}
                className=" w-[54px]"
              ></Icon>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
      <Animated.View entering={FadeInDown.delay(300).duration(1000).springify()} className="flex py-2 bg-green-400  mx-4 rounded-lg justify-start mt-auto mb-12">
            <TouchableOpacity  onPress={() =>
              navigation.navigate("HiddenScreen", { screen: "AddAddress" })
            }>
                <View className=" items-center flex-row my-2 justify-center">
                  <Icon
                    type="font-awesome"
                    name="plus"
                    color="#ffff"
                    size={13}
                    className="w-[15px]"
                  />
                  <Text className="text-white font-bold text-[13px] inline-block">
                   {" "} Add more address
                  </Text>

              </View>
            </TouchableOpacity>
          </Animated.View>
    </View>
    </SafeAreaView>
  );
};

export default MyAddress;
