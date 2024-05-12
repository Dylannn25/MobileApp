import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAppSelector } from "../store";
import { user } from "../store/slices/user";
import { rentalService } from "../services/service";
import { AuthContext } from "../store/auth";
const ChangePassword = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, reset  } = useForm();
  const userLogin = useAppSelector(user);
  const [message, setMessage] = useState(null);
  const { logout } = useContext(AuthContext);
  const resultChange = (data) => {
    if (data.message) {
      setMessage(data.message);
    } else {
      Alert.alert("Change Password", "Change password successfully!", [
        {
          text: "OK",
          onPress: () => {
            logout();
            navigation.navigate("Login");
            reset();
          },
        },
      ]);
    }
  };
  const changePasswordProfile = async (data) => {
    try {
      console.log(data);
      if(data.newPassword !== data.rePassword) {
        setMessage("Password not match")
        return;
      }
      const changePassword = {
        newPassword: data.newPassword,
        oldPassword: data.password,
        id: userLogin.id,
      };
      await rentalService.changePasswordUser(changePassword, resultChange);
    } catch (error) {
      console.log(error?.data?.message);
    }
  };
  return (
    <SafeAreaView className="bg-white">
      <View className="bg-white h-full">
        <View className="flex-row justify-center items-center">
          <View className=" absolute top-[0px] left-[20px] ">
            <Icon
              type="font-awesome"
              name="angle-left"
              color="#000000"
              size={28}
              onPress={() =>
                navigation.navigate("HiddenScreen", { screen: "Profile" })
              }
            />
          </View>
          <View className=" mb-2">
            <Text className="font-[400] text-[20px] text-black text-center">
              Change Password
            </Text>
          </View>
        </View>
        <View className="mt-12 mb-2 mx-4">
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Current password is required",
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Animated.View
                  entering={FadeInDown.delay(200).duration(1000).springify()}
                  className="border-[1px] border-[#ddd] p-4 rounded-md w-full"
                >
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder={"Current password"}
                    placeholderTextColor={"gray"}
                    secureTextEntry
                  />
                </Animated.View>
                {error && (
                  <Text className="text-red-500 mt-1">{error.message}</Text>
                )}
              </>
            )}
          />
        </View>
        <View className="mt-8 mb-2 mx-4">
          {/* <View className="mb-1"></View> */}
          <Controller
            control={control}
            name="newPassword"
            rules={{
              required: "New password is required",
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Animated.View
                  entering={FadeInDown.delay(300).duration(1000).springify()}
                  className="border-[1px] border-[#ddd] p-4 rounded-md w-full"
                >
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder={"New password"}
                    placeholderTextColor={"gray"}
                    secureTextEntry
                  />
                </Animated.View>
                {error && (
                  <Text className="text-red-500 mt-1">{error.message}</Text>
                )}
              </>
            )}
          />
        </View>
        <View className="mt-4 mb-2 mx-4">
          {/* <View className="mb-1"></View> */}
          <Controller
            control={control}
            name="rePassword"
            rules={{
              required: "Confirm new password is required",
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Animated.View
                  entering={FadeInDown.delay(400).duration(1000).springify()}
                  className="border-[1px] border-[#ddd] p-4 rounded-md w-full"
                >
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder={"Confirm new password"}
                    placeholderTextColor={"gray"}
                    secureTextEntry
                  />
                </Animated.View>
                {error && (
                  <Text className="text-red-500 mt-1">{error.message}</Text>
                )}
              </>
            )}
          />
        </View>
        {message && <Text className="text-red-500 mt-1 text-center text-[16px] font-bold">{message}</Text>}
        <View className=" mt-4 mb-8">
          <TouchableOpacity onPress={handleSubmit(changePasswordProfile)}>
            <Animated.View
              entering={FadeInDown.delay(500).duration(1000).springify()}
              className="  bg-green-400 mt-4 mx-2 rounded-md p-3"
            >
              <Text className="text-white font-bold text-[16px] inline-block text-center">
                Update
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
