import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
const AddAddress = () => {
  const navigation = useNavigation();
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
                navigation.navigate("HiddenScreen", { screen: "MyAddress" })
              }
            />
          </View>
          <View className=" mb-2">
            <Text className="font-[400] text-[20px] text-black text-center">
              Address Details
            </Text>
          </View>
        </View>
      <View className="mx-4">
        <View className="my-2">
          <Text className=" text-[16px] text-black font-bold">
            Type of address
          </Text>
        </View>
        <View className="flex-row">
          <View className=" border-[1px] border-[#ddd] rounded-3xl mr-4">
            <View className=" items-center flex-row m-1 p-1">
              <Icon
                type="font-awesome"
                name="home"
                color="#000000"
                size={20}
                className=""
              />
              <Text className="text-[#262626] font-[500] text-[13px] inline-block ml-2">
                Home
              </Text>
            </View>
          </View>
          <View className=" border-[1px] border-[#ddd] rounded-3xl mr-4">
            <View className=" items-center flex-row m-1 p-1">
              <Icon
                type="font-awesome"
                name="building-o"
                color="#000000"
                size={20}
                className=""
              />
              <Text className="text-[#262626] font-[500] text-[13px] inline-block ml-2">
                Company
              </Text>
            </View>
          </View>
          <View className=" border-[1px] border-[#ddd] rounded-3xl">
            <View className=" items-center flex-row m-1 p-1">
              <Icon
                type="font-awesome"
                name="bookmark-o"
                color="#000000"
                size={20}
              />
              <Text className="text-[#262626] font-[500] text-[13px] inline-block ml-2">
                Other
              </Text>
            </View>
          </View>
        </View>
        <View className="mt-4 mb-2">
          <View className="mb-1">
            <Text className=" text-[16px] text-black font-bold">Name</Text>
          </View>
          <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
            <TextInput
              placeholder="Enter the address name"
              placeholderTextColor={"gray"}
            />
          </View>
        </View>
        <View className="my-2">
          <View className="mb-1">
            <Text className=" text-[16px] text-black font-bold">
              Province/city
            </Text>
          </View>
          <View className="border-[1px] border-[#ddd] flex-row p-4 rounded-md w-full ">
            <TouchableOpacity>
              <View className=" items-center flex-row">
                <View className="">
                  <Text className=" text-gray-500 font-[500] text-[14px] inline-block">
                    Province/city
                  </Text>
                </View>
                <View className="ml-56">
                  <Icon
                    type="font-awesome"
                    name="angle-down"
                    color="#000000"
                    size={16}
                    className="w-[15px]"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="my-2">
          <View className="mb-1">
            <Text className=" text-[16px] text-black font-bold">Districts</Text>
          </View>
          <View className="border-[1px] border-[#ddd] flex-row p-4 rounded-md w-full ">
            <TouchableOpacity>
              <View className=" items-center flex-row">
                <View className=" mr-4">
                  <Text className=" text-gray-500 font-[500] text-[14px] inline-block">
                  Districts
                  </Text>
                </View>
                <View className="ml-60">
                  <Icon
                    type="font-awesome"
                    name="angle-down"
                    color="#000000"
                    size={16}
                    className="w-[15px]"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="my-2">
          <View className="mb-1">
            <Text className=" text-[16px] text-black font-bold">Communes</Text>
          </View>
          <View className="border-[1px] border-[#ddd] flex-row p-4 rounded-md w-full ">
            <TouchableOpacity>
              <View className=" items-center flex-row">
                <View className="mr-3">
                  <Text className=" text-gray-500 font-[500] text-[14px] inline-block">
                  Communes
                  </Text>
                </View>
                <View className="ml-56">
                  <Icon
                    type="font-awesome"
                    name="angle-down"
                    color="#000000"
                    size={16}
                    className="w-[15px]"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="my-2">
          <View className="mb-1">
            <Text className=" text-[16px] text-black font-bold">Address</Text>
          </View>
          <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
            <TextInput placeholder="Address" placeholderTextColor={"gray"} />
          </View>
        </View>
      </View>
      <View className="m-4 flex-row">
          <Text className=" text-[16px] text-black font-bold">
          Set as default address
          </Text>
        </View>
      <View className=" border-t-[1px] border-[#ddd]">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("HiddenScreen", { screen: "AddAddress" })
          }
        >
          <View className="  bg-green-400 mt-4 mx-2 rounded-md p-3">
            <Text className="text-white font-bold text-[16px] inline-block text-center">
              Save
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default AddAddress;
