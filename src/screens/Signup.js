import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { rentalService } from "../services/service";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SignupScreen() {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return (
      <>
        <View className="flex flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }
  function generateRandomNumber() {
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += Math.floor(Math.random() * 10); // Sinh số ngẫu nhiên từ 0 đến 9
    }
    return result;
  }
  const registerSuccess = (rs)=>{
    if(rs?.success) {
        setIsLoading(false)
        navigation.navigate('otp')
    }
    else{
        setMessage(rs?.message)
    }
  }
  const onSubmit = (data) => {
    setIsLoading(true)
    if(data?.password !== data?.rePassword){
        setMessage("Password not match")
        setIsLoading(false)
    }
    else{
        setMessage(null)
        const otp = generateRandomNumber()
        AsyncStorage.setItem('otpRegister', otp)
        AsyncStorage.setItem('emailUser', data?.email)
        const dataRegister = {
            ...data,
            otp: otp,
        }
        rentalService.register(dataRegister, registerSuccess)
    }
    setIsLoading(false)
  };
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
            SignUp
          </Text>
        </Animated.View>
        <View className="flex items-center mx-4 space-y-4">
            {
                message && <Text className="text-red-500">{message}</Text>
            }
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="w-full"
          >
            <Controller
              control={control}
              name="fullName"
              rules={{ required: "User name is required" }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="bg-white p-5 rounded-2xl w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="UserName"
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
                  <View className="bg-white p-5 rounded-2xl w-full ">
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
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className=" w-full"
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
                  <View className="bg-white p-5 rounded-2xl w-full ">
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
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="w-full mb-3"
          >
            <Controller
              control={control}
              name="rePassword"
              rules={{ required: "Re-enter password is a required field" }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="bg-white p-5 rounded-2xl w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Re-enter Password"
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
            entering={FadeInDown.delay(800).duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity
              className="w-full bg-green p-3 rounded-2xl mb-1 bg-[#1ecb15]"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-xl font-bold text-white text-center">
                SignUp
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex justify-center items-center"
          >
            <View className="flex-row justify-center">
              <Text className="text-white"> Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-[#1ecb15] font-bold">Login</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
