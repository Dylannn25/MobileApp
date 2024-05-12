import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import Svg, { Path } from "react-native-svg";
import { Rating, formatPrice } from "../utils";
import ViewMapDistance from "./modal/viewMapDistance";
const PayDone = () => {
  return (
    <View className="bg-white justify-center h-full">
      <Icon
        type="font-awesome"
        name="check-circle-o"
        color="#5fcf86"
        size={90}
      />
      <Text className="text-[18px] font-[700] text-black text-center my-2">
        Booked Successfully
      </Text>
      <Text className="text-[16px] font-regular text-black text-center mx-4 mb-6">
        You've booked Car's name successfully. Go to My Trip for more booking
        details.
      </Text>
      <View className=" bg-gray-50 border-[1px] border-[#ddd] py-4 px-4 rounded-lg  my-2 mx-4">
        <Text className="text-[18px] font-[700] text-black text-center">
          Summary
        </Text>
        <Text className=" text-[16px] font-regular text-gray-500">Car</Text>
        <Text className=" text-[16px] font-regular text-black mb-4">
          Car's name
        </Text>
        <Text className=" text-[16px] font-regular text-gray-500">
          Pick-up location
        </Text>
        <Text className=" text-[16px] font-regular text-black mb-4">
          17a Duong so 5 kp5 Truong tho
        </Text>
        <Text className=" text-[16px] font-regular text-gray-500">
          Trip date
        </Text>
        <Text className=" text-[16px] font-regular text-black">
          Thu 4 April, 11:00 pm - Fri 5 April, 11:00 pm
        </Text>

        <View className="bg-white mx-4 rounded-lg mt-6 mb-4">
          <Text className=" text-[16px] font-regular text-black m-4">
            Price
          </Text>
          <View className="flex-row mx-4">
            <Text className=" text-[16px] font-regular text-gray-500 ">
              Rental Price
            </Text>
            <Text className="text-[16px] font-regular text-black ml-auto">
              1 492 000 đ
            </Text>
          </View>
          <View className="flex-row my-2 mx-4">
            <Text className=" text-[16px] font-regular text-gray-500 ">
              Service Price
            </Text>
            <Text className="text-[16px] font-regular text-black ml-auto">
              149 200 đ
            </Text>
          </View>
          <View className="flex-row mx-4">
            <Text className=" text-[16px] font-regular text-gray-500 ">
              Subtotal
            </Text>
            <Text className="text-[16px] font-regular text-black ml-auto">
              1 641 2a00 đ x 1
            </Text>
          </View>
          <View className="flex-row my-2 mx-4">
            <Text className=" text-[16px] ont-[700] text-[#5fcf86] ">
              Total
            </Text>
            <Text className="text-[16px] font-[700] text-[#5fcf86] ml-auto">
              1 641 200 đ
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity>
        <View className="  bg-green-400 mt-4 mx-4 rounded-md p-3">
          <Text className="text-white font-bold text-[16px] inline-block text-center">
            Explore more trips
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PayDone;
