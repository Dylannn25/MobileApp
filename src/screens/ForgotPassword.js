import { View, Text, StatusBar, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { rentalService } from "../services/service";
import { useNavigation } from "@react-navigation/native";
const ForgotPassword = () => {
  const [message, setMessage] = useState(null);
  const { control, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  if (isLoading) {
    return (
      <>
        <View className="flex flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }
  const onSubmit = (data) => {
    if(data.email){
      rentalService.resetPasswordSendEmailApp(data.email, sendSuccess)
    }
    else{
      setMessage("Send failed!");
    }
  }
  const sendSuccess = (rs)=>{
    console.log(rs)
    if(rs?.success) {
        setIsLoading(false)
        navigation.navigate('Login')
    }
    else{
        setIsLoading(false)
        setMessage(rs?.message)
    }
  }
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
          <Text className="text-white font-bold tracking-wider text-3xl mb-10">
            Forgot Password
          </Text>
        </Animated.View>
        <View className="flex items-center mx-4 space-y-4">
          
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="w-full"
          >
            {message ? (
              <Text className="text-red-500 font-bold text-center">
                {message}
              </Text>
            ) : (
              <Text className="text-center text-[#fff] font-500">
                Enter your email
              </Text>
            )}
          </Animated.View>
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
            className="w-full flex items-center"
          >
            <TouchableOpacity
              className="w-[120px] bg-green p-3 rounded-2xl mb-1 bg-[#1ecb15]"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-xl font-bold text-white text-center">
                Send
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;
