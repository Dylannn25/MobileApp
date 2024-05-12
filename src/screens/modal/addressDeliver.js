import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import { formatPrice } from "../../utils";
import { Modal } from "react-native";
import ViewMapDistance from "./viewMapDistance";
import SearchAddress from "./searchAddress";
import { useNavigation } from "@react-navigation/native";
const AddressDeliver = ({ item, distanceKM, setModalAddress, destination }) => {
  const navigation = useNavigation();
  const [modalMap, setModalMap] = useState(false);
  const [modalChangeAddress, setModalChangeAddress] = useState(false);
  useEffect(() => {}, [modalChangeAddress]);
  return (
    <>
      <SafeAreaView className="bg-white h-[100vh]">
        <View className=" flex relative pt-[5px] bg-[#fff]">
          <Text className="text-center font-bold text-[18px] pb-[10px]">
            Pick up and Return Location
          </Text>
          {/* <View className="border-[1px] border-[#ddd] p-2 rounded-full absolute w-[35px] h-[35px] left-0 top-[3px] px-2 mx-3">
            <TouchableOpacity
              onPress={() => {
                setModalAddress(false);
              }}
            >
              <Icon type="font-awesome" name="close" color="#000" size={16} />
            </TouchableOpacity>
          </View> */}
        </View>
        <View className="px-2 mx-3 pt-[20px]">
          <View className="bg-[#f3f0f0] rounded-md">
            <View className="pt-2 px-2 flex-row justify-between">
              <Text>Delivery within</Text>
              <Text>{item?.deliveryRadius}km</Text>
            </View>
            <View className="pt-2 px-2 flex-row justify-between">
              <Text>Free delivery within</Text>
              <Text>{item?.deliveryRadiusFree}km</Text>
            </View>
            <View className="py-2 px-2 flex-row justify-between">
              <Text>Car delivery fee (2 ways)</Text>
              <Text>{formatPrice(item?.deliveryPrice)} đ/km</Text>
            </View>
          </View>
        </View>
        <View className="px-2 mx-3 pt-[20px] flex-row justify-between">
          <Text>Dia chi tuy chinh</Text>
          <TouchableOpacity
            onPress={() => {
              setModalChangeAddress(true);
              // navigation.navigate("HiddenScreen", { screen: "SearchAddress" })
            }}
          >
            <Text className="text-[#1ecb15] font-bold">Change</Text>
          </TouchableOpacity>
        </View>
        <View className="px-2 mx-3 pt-[20px]">
          <View className="flex-row py-2 border-[1px] border-[#1ecb15] rounded-lg bg-[#effaf3]">
            <View className="mt-2 ml-2 w-[90%]">
              <RadioForm
                radio_props={[
                  {
                    label: destination
                      ? destination?.description
                      : "Select address",
                    value: 0,
                  },
                ]}
                initial={0}
                onPress={() => {}}
                buttonColor="#5fcf86"
                selectedButtonColor="#5fcf86"
                buttonSize={10}
                labelStyle={{ fontSize: 14 }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View className="flex p-2 absolute bg-white w-[100%] bottom-0 border-[#ddd] border-t-[1px] h-[100px]">
        <View>
          {/* <Text className="text-[#767676] font-[800] text-[14px]">
                Daily rate from
              </Text> */}
          <TouchableOpacity onPress={() => setModalMap(true)}>
            <View className="flex flex-row items-center">
              <Text className="text-[#000] font-[500] text-[14px] py-1 pr-2">
                View map
              </Text>
              <Icon
                type="font-awesome"
                name="chevron-right"
                color="#000"
                size={16}
              />
            </View>
          </TouchableOpacity>
          <View>
            <Text className="text-[#000000] text-[14px]">
              {item?.deliveryRadiusFree &&
              distanceKM <= item?.deliveryRadiusFree ? (
                <Text className="text-[14px] text-[#5fcf86] font-bold">
                  Free({distanceKM}km)
                </Text>
              ) : distanceKM <= item?.deliveryRadius ? (
                <>
                  <Text className="text-[16px] text-[#5fcf86] font-bold">
                    Total: {formatPrice(distanceKM * item?.deliveryPrice)}
                  </Text>
                  <Text className="text-[16px] text-[#000] font-bold">
                    {" "}
                    ({distanceKM}km)
                  </Text>
                </>
              ) : (
                <Text className="text-[14px] text-[#f04949] font-bold">
                  {/* {formatPrice(distanceKM * item?.deliveryPrice)} */}
                  Over {item?.deliveryRadius}KM
                </Text>
              )}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setModalAddress(false)} disabled={distanceKM > item?.deliveryRadius}>
          <View className={distanceKM > item?.deliveryRadius ?"absolute right-0 bottom-[10px]  bg-[#ddd] rounded-[3px]":"absolute right-0 bottom-[10px]  bg-[#1ecb15] rounded-[3px]"}>
            <Text className="text-[#fff] pt-2 pb-2 pr-[15px] pl-[15px]">
              Confirm
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalMap}
        onRequestClose={() => {
          setModalMap(!modalMap);
        }}
      >
        <View>
          <ViewMapDistance item={item} setModalMap={setModalMap} destination={destination}/>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalChangeAddress}
        onRequestClose={() => {
          setModalChangeAddress(!modalChangeAddress);
        }}
      >
        <View className="z-10">
          <SearchAddress setModalChangeAddress={setModalChangeAddress} />
        </View>
      </Modal>
    </>
  );
};

export default AddressDeliver;
