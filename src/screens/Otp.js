import {
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useRef, useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rentalService } from "../services/service";
import { useNavigation } from "@react-navigation/native";
const Otp = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [message, setMessage] = useState(null);
  const textInputRefs = useRef([]);
  const navigation = useNavigation();
  const handleChangeText = (text, index) => {
    const newInputValues = [...code];
    newInputValues[index] = text;
    setCode(newInputValues);

    if (text.length === 1 && index < code.length - 1) {
      textInputRefs.current[index + 1].focus();
    }
  };
  const onSubmit = async () => {
    const otp = await AsyncStorage.getItem("otpRegister");
    const email = await AsyncStorage.getItem("emailUser");
    if (otp != code.join("")) {
      setMessage("Incorrect OTP!");
    } else {
      setMessage(null);
      if (email) {
        rentalService.verifyEmail(email, async(value) => {
          if (value) {
            await AsyncStorage.removeItem("otpRegister");
            await AsyncStorage.removeItem("emailUser");
            navigation.navigate("Login");
          }
        });
      }
    }
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
            OTP
          </Text>
        </Animated.View>
        <View className="flex items-center mx-4 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="w-full"
          >
            {message ? (
              <Text className="text-red-500 font-bold text-center text-xl uppercase">
                {message}
              </Text>
            ) : (
              <Text className="text-center text-[#fff] font-bold text-xl uppercase">
                Verify your email
              </Text>
            )}
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="w-full"
          >
            <Text className="text-center text-[#fff] font-500">
              Enter 4 digits code recieved in your email
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="items-center w-full"
          >
            <View className="flex justify-evenly w-[300px] flex-row items-center ">
              {[...Array(4)].map((_, index) => (
                <TextInput
                  key={index}
                  placeholderTextColor={"gray"}
                  className="w-[60px] h-[60px] bg-white text-center text-xl rounded-2xl"
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(text) => handleChangeText(text, index)}
                  onSubmitEditing={() => {
                    // Nếu đang ở TextInput cuối cùng và người dùng ấn Done, có thể thực hiện một hành động khác ở đây (ví dụ: submit form)
                    Keyboard.dismiss();
                  }}
                  ref={(ref) => {
                    textInputRefs.current[index] = ref;
                  }}
                  returnKeyType={index < code.length - 1 ? "next" : "done"} // Thay đổi returnKeyType để hiển thị phím "Next" hoặc "Done" trên bàn phím
                  blurOnSubmit={false} // Đảm bảo TextInput không mất focus sau khi ấn "Next" hoặc "Done"
                />
              ))}
            </View>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="w-full flex items-center"
          >
            <TouchableOpacity
              className="w-[120px] bg-green p-3 rounded-2xl mb-1 bg-[#1ecb15]"
              onPress={() => onSubmit()}
            >
              <Text className="text-xl font-bold text-white text-center">
                Verify
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Otp;
