import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  SlideInUp,
} from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { rentalService } from "../services/service";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { useAppSelector } from "../store";
import { user } from "../store/slices/user";
import { AuthContext } from "../store/auth";
const MyAccount = () => {
  const navigation = useNavigation();
  const userLogin = useAppSelector(user);
  const { logout } = useContext(AuthContext);
  const [dataSubmit, setDataSubmit] = useState(null);
  const [haveData, setHaveData] = useState(false);
  const getDriveLicense = async () => {
    await rentalService.getDriveLicense(setDataSubmit, setHaveData);
  };
  useEffect(() => {
    getDriveLicense();
  }, []);
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="bg-white ">
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
              My Account
            </Text>
          </View>
          <View className=" absolute top-[0px] right-[20px] ">
            <Icon
              type="font-awesome"
              name="pencil"
              color="#000000"
              size={24}
              onPress={() =>
                navigation.navigate("HiddenScreen", { screen: "EditProfile" })
              }
            />
          </View>
        </View>
        <View className="flex justify-center items-center">
          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify()}
          >
            <Image
              className="w-36 h-36 rounded-full mt-4 border-[#1ecb15] border-[2px]"
              source={{
                uri: userLogin?.photos
                  ? userLogin.photos
                  : "https://img.freepik.com/premium-vector/man-character-driving-his-eco-car_99413-107.jpg",
              }}
            />
          </Animated.View>
          <Animated.View
            entering={FadeIn.delay(400).duration(1000).springify()}
          >
            <Text className="font-[600] text-[18px] text-black text-center mt-4">
              {userLogin?.fullName}
            </Text>
          </Animated.View>
          <Text className="font-regukar text-[13px] text-black text-center mt-2"></Text>
        </View>
        {/* <View className="flex flex-row justify-center mt-4">
            <Animated.View
              entering={FadeInRight.delay(500).duration(1000).springify()} className="mx-2 border-[1px] border-[#ddd] rounded-xl items-center">
              <View className="flex-row items-center mx-2 my-1">
                <Icon
                  type="font-awesome"
                  name="car"
                  color="#86efac"
                  size={18}
                  className="w-[20px]"
                />
                <Text className="text-[#262626] font-[500] text-[18px] inline-block ml-2 ">
                  14 trips
                </Text>
              </View>
            </Animated.View>
            <Animated.View
              entering={FadeInLeft.delay(500).duration(1000).springify()} className="mx-2 border-[1px] border-[#ddd] rounded-xl items-center">
              <View className="flex-row items-center mx-2 my-1">
                <Icon
                  type="font-awesome"
                  name="trophy"
                  color="#ffc634"
                  size={18}
                  className="w-[20px]"
                />
                <Text className="text-[#262626] font-[500] text-[18px] inline-block ml-2 ">
                  0 point
                </Text>
              </View>
            </Animated.View>
          </View> */}
        <View className="flex mt-8 ml-2 mr-4 rounded-2xl bg-white ">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HiddenScreen", { screen: "DriveLicense" })
            }
          >
            <Animated.View
              entering={FadeInLeft.delay(600).duration(1000).springify()}
              className=" flex flex-row items-center border-b-[1px] border-[#ddd] pb-4"
            >
              <Text className="text-[#6b7280] text-[13px] font-regular ">
                Driver license
              </Text>
              {dataSubmit?.gplx ? (
                <>
                  <View className="bg-green-100 mx-2 px-1 rounded-3xl">
                    <View className=" items-center flex-row m-1">
                      <Icon
                        type="font-awesome"
                        name="check-circle"
                        color="#86efac"
                        size={13}
                        className="w-[15px]"
                      />
                      <Text className="text-[#262626] font-[500] text-[12px] inline-block">
                        Verified
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row ml-auto">
                    <Text className="text-black text-[13px] font-regular ">
                      {dataSubmit?.gplx}
                    </Text>
                    <Icon
                      type="font-awesome"
                      name="angle-right"
                      color="#030712"
                      size={16}
                      className=" w-[32px]"
                    ></Icon>
                  </View>
                </>
              ) : (
                <>
                <View className="bg-yellow-100 mx-2 px-1 rounded-3xl">
                  <View className=" items-center flex-row m-1">
                    <Icon
                      type="font-awesome"
                      name="info-circle"
                      color="#fdba74"
                      size={13}
                      className="w-[15px]"
                    />
                    <Text className="text-[#262626] font-[500] text-[12px] inline-block">
                      Not verified
                    </Text>
                  </View>
                </View>
                <View className="flex-row ml-auto">
                  <Text className="text-black text-[13px] font-regular ">
                    Verify now
                  </Text>
                  <Icon
                    type="font-awesome"
                    name="angle-right"
                    color="#030712"
                    size={16}
                    className=" w-[32px]"
                  ></Icon>
                </View>
                </>
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
        {/* <View className="flex mt-4 ml-2 mr-4 rounded-2xl bg-white ">
            <TouchableOpacity>
              <Animated.View
              entering={FadeInRight.delay(600).duration(1000).springify()} className=" flex flex-row items-center border-b-[1px] border-[#ddd] pb-4">
                <Text className="text-[#6b7280] text-[13px] font-regular ">
                  Phone Number
                </Text>
                <View className="bg-green-100 mx-2 rounded-3xl">
                  <View className=" items-center flex-row m-1">
                    <Icon
                      type="font-awesome"
                      name="check-circle"
                      color="#86efac"
                      size={13}
                      className="w-[15px]"
                    />
                    <Text className="text-[#262626] font-[500] text-[12px] inline-block">
                      Verified
                    </Text>
                  </View>
                </View>
                <View className="flex-row ml-auto">
                  <Text className="text-black text-[13px] font-regular ">
                    0889607402
                  </Text>
                  <Icon
                    type="font-awesome"
                    name="angle-right"
                    color="#030712"
                    size={16}
                    className=" w-[32px]"
                  ></Icon>
                </View>
              </Animated.View>
            </TouchableOpacity>
          </View> */}
        <View className="flex mt-4 ml-2 mr-4 rounded-2xl bg-white ">
          <TouchableOpacity>
            <Animated.View
              entering={FadeInLeft.delay(600).duration(1000).springify()}
              className=" flex flex-row items-center border-b-[1px] border-[#ddd] pb-4"
            >
              <Text className="text-[#6b7280] text-[13px] font-regular ">
                Email
              </Text>
              <View className="bg-green-100 mx-2 rounded-3xl">
                <View className=" items-center flex-row m-1">
                  <Icon
                    type="font-awesome"
                    name="check-circle"
                    color="#86efac"
                    size={13}
                    className="w-[15px]"
                  />
                  <Text className="text-[#262626] font-[500] text-[12px] inline-block">
                    Verified
                  </Text>
                </View>
              </View>
              <View className="flex-row ml-auto">
                <Text className="text-black text-[13px] font-regular ">
                  {userLogin?.email}
                </Text>
                <Icon
                  type="font-awesome"
                  name="angle-right"
                  color="#030712"
                  size={16}
                  className=" w-[32px]"
                ></Icon>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </View>
        {/* <View className="flex mt-4 ml-2 mr-4 rounded-2xl bg-white ">
            <TouchableOpacity>
              <Animated.View
              entering={FadeInRight.delay(600).duration(1000).springify()} className=" flex flex-row items-center border-b-[1px] border-[#ddd] pb-4">
                <Text className="text-[#6b7280] text-[13px] font-regular ">
                  Facebook
                </Text>
                <View className="bg-red-100 mx-2 rounded-3xl">
                  <View className=" items-center flex-row m-1">
                    <Icon
                      type="font-awesome"
                      name="info-circle"
                      color="#fdba74"
                      size={13}
                      className="w-[15px]"
                    />
                    <Text className="text-[#262626] font-[500] text-[12px] inline-block">
                      Not verified yet
                    </Text>
                  </View>
                </View>
                <View className="flex-row ml-auto">
                  <Text className="text-black text-[13px] font-regular ">
                    Link now
                  </Text>
                  <Icon
                    type="font-awesome"
                    name="angle-right"
                    color="#030712"
                    size={16}
                    className=" w-[32px]"
                  ></Icon>
                </View>
              </Animated.View>
            </TouchableOpacity>
          </View>
          <View className="flex mt-4 ml-2 mr-4 rounded-2xl bg-white mb-40">
            <TouchableOpacity>
              <Animated.View
              entering={FadeInLeft.delay(600).duration(1000).springify()} className=" flex flex-row items-center border-b-[1px] border-[#ddd] pb-4">
                <Text className="text-[#6b7280] text-[13px] font-regular ">
                  Google
                </Text>
                <View className="bg-green-100 mx-2 rounded-3xl">
                  <View className=" items-center flex-row m-1">
                    <Icon
                      type="font-awesome"
                      name="check-circle"
                      color="#86efac"
                      size={13}
                      className="w-[15px]"
                    />
                    <Text className="text-[#262626] font-[500] text-[12px] inline-block">
                      Verified
                    </Text>
                  </View>
                </View>
                <View>
                  <Icon
                    type="font-awesome"
                    name="times-circle"
                    color="#ef4444"
                    size={13}
                    className="w-[15px]"
                  />
                </View>
                <View className="ml-auto">
                  <Icon
                    type="font-awesome"
                    name="angle-right"
                    color="#030712"
                    size={16}
                    className=" w-[32px]"
                  ></Icon>
                </View>
              </Animated.View>
            </TouchableOpacity>
          </View> */}
      </View>
    </SafeAreaView>
  );
};

export default MyAccount;
