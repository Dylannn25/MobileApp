import { View, Text } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const Footer = () => {
  return (
    <View className="px-2 mx-3">
      <View className="flex">
        <View className="pb-8">
          <Text className="text-[#fff] text-[20px] font-bold mb-5">
            About Rentaly
          </Text>
          <Text className="text-[#fff] text-[16px]  mb-5">
            Where quality meets affordability. We understand the importance of a
            smooth and enjoyable journey without the burden of excessive costs.
            That's why we have meticulously crafted our offerings to provide you
            with top-notch vehicles at minimum expense.
          </Text>
        </View>
        <View className="pb-8">
          <Text className="text-[#fff] text-[20px] font-bold mb-5">
            Contact Info
          </Text>
          <Text className="text-[#fff] text-[16px] mb-2">
            <Icon
              type="font-awesome"
              name="map-marker"
              color="#1ecb15"
              size={15}
              className="w-[20px]"
            />
            01 Vo Van Ngan, Linh Chieu, Thu Duc, Ho Chi Minh City
          </Text>
          <Text className="text-[#fff] text-[16px] mb-2">
            <Icon
              type="font-awesome"
              name="phone"
              color="#1ecb15"
              size={15}
              className="w-[20px]"
            />
            +84 388 004 519
          </Text>
          <Text className="text-[#fff] text-[16px] mb-2">
            <Icon
              type="font-awesome"
              name="envelope"
              color="#1ecb15"
              size={15}
              className="w-[20px] "
            />
            rentalcarvn28@gmail.com
          </Text>
        </View>
        <View className="pb-8">
          <Text className="text-[#fff] text-[20px] font-bold mb-5">
            Quick Links
          </Text>
          <Text className="text-[#fff] text-[16px]  mb-2">Home</Text>
          <Text className="text-[#fff] text-[16px]  mb-2">Cars</Text>
          <Text className="text-[#fff] text-[16px]  mb-2">Booking</Text>
        </View>
      </View>
    </View>
  );
};

export default Footer;
