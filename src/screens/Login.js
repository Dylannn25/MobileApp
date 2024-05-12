import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/auth";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "../store";
import { user } from "../store/slices/user";
export default function LoginScreen() {
  const navigation = useNavigation();
  const { login, message, isLoading, userToken } = useContext(AuthContext);
  const userLogin = useAppSelector(user);
  const { control, handleSubmit } = useForm();
  const submitLogin = async(data) => {
    await login(data);
    if (userToken && userLogin?.fullName) {
      Alert.alert("Login", "Login successfully!", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Home");
          },
        },
      ]);
      // navigation.navigate('Home');
    }
  };
  // if (isLoading)
  //   return (
  //     <>
  //       <View className="flex flex-1 justify-center items-center">
  //         <ActivityIndicator size="large" />
  //       </View>
  //     </>
  //   );
  // }
  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      <Image
        className="h-full w-full absolute"
        source={require("../assets/images/background/2.jpg")}
      />
      <View className="h-full w-full flex justify-center pt-10 pb-10">
        <Animated.View
          entering={FadeInDown.duration(1000).springify()}
          className="flex items-center"
        >
          <Text className="text-white font-bold tracking-wider text-5xl mb-10">
            Login
          </Text>
          {message && <Text className="text-red-500">{message}</Text>}
        </Animated.View>
        <View className="flex items-center mx-4 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="w-full"
          >
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="bg-white p-4 rounded-2xl w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Email"
                      placeholderTextColor={"gray"}
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500">{error.message}</Text>
                  )}
                </>
              )}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="w-full mb-3"
          >
            <Controller
              control={control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="bg-white p-4 rounded-2xl w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Password"
                      placeholderTextColor={"gray"}
                      secureTextEntry
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500">{error.message}</Text>
                  )}
                </>
              )}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity
              className="w-full bg-green p-3 rounded-2xl mb-1 bg-[#1ecb15]"
              onPress={handleSubmit(submitLogin)}
            >
              <Text className="text-xl font-bold text-white text-center">
                Sign in
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex justify-center items-center"
          >
            <View className="flex-row justify-center">
              <Text className="text-white"> Don't have an account? </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("HiddenScreen", {
                    screen: "ForgotPassword",
                  })
                }
              >
                <Text className="text-[#1ecb15] font-bold">
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
