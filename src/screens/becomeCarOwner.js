import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioForm from "react-native-simple-radio-button";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "../store";
import { user } from "../store/slices/user";
import SearchAddress from "./modal/searchAddress";
import { rentalService } from "../services/service";

const BecomeCarOwner = () => {
  const userData = useAppSelector(user);
  const navigation = useNavigation();
  const [openModal, setOpenModal] = useState(false);
  const [pickvalue, setPickvalue] = useState(0);
  const pick = [{ label: "Self-driving car", pickvalue: 0 }];
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalChangeAddress, setModalChangeAddress] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: userData?.email ? userData?.email : "",
      // email: "thanhtest123@maildrop.cc",
      yearEstablished: new Date().getFullYear().toString(),
    },
  });

  const dataResult = (value) => {
    if (value) {
      alert("Request Become Car Owner Successfully!");
      reset();
      setOpenModal(false);
    }
    else{
      alert("Request Become Car Owner Failed!");
    }
  };
  const onSubmit = async (data) => {
    console.log(data);
    const createData = {
      ...data,
      location: JSON.stringify(selectedLocation)
    }
    await rentalService.requestBecomeSeller(createData, dataResult);
  };
  const setLocation = (data) => {
    setSelectedLocation({
      name: data?.formatted_address,
      address: data?.formatted_address,
      lat: data?.geometry?.location.lat,
      lon: data?.geometry?.location.lon,
    });
  };
  return (
    <SafeAreaView className="bg-[#DFF3E7] h-full">
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
        <View className="">
          <Text className="font-[400] text-[20px] text-black text-center">
            Become Car Owner
          </Text>
        </View>
      </View>
      <View>
        <Image
          className="flex w-[100%] h-[150px]"
          contentFit="cover"
          source={require("../assets/images/background/carowner.jpg")}
        />
      </View>
      <View className="bg-white mx-4 rounded-xl">
        <Text className="text-[16px] text-black font-bold mx-4 my-2">
          Choose rental method
        </Text>
        <RadioForm
          radio_props={pick}
          initial={pickvalue}
          onPress={(pickvalue) => setPickvalue(pickvalue)}
          buttonColor="#5fcf86"
          selectedButtonColor="#5fcf86"
          buttonSize={10}
          labelStyle={{ fontSize: 14 }}
          className=" mx-4 my-2 justify-center"
        />
      </View>
      <View className=" mx-2 mt-4">
        <Text className="text-[16px] text-black font-bold mx-4 my-2">
          Increase income from 5-10 million/month with Rentaly!
        </Text>
        <Text className="text-[13px] text-gray-500 font-bold mx-4 my-2">
          Simple & quick 4-step registration procedure
        </Text>
      </View>
      <View className=" mx-2 mt-4">
        <View className="flex-row items-center">
          <View className=" ml-4 mr-2 w-10 h-10 rounded-full bg-gray-200 justify-center items-center">
            <Icon
              type="font-awesome"
              name="file-text-o"
              color="#5fcf86"
              size={20}
            />
          </View>
          <View>
            <Text className="text-[13px] text-blcak font-regular">
              Fill in car owner information
            </Text>
          </View>
        </View>
      </View>
      <View className=" mx-2 mt-4">
        <View className="flex-row items-center">
          <View className=" ml-4 mr-2 w-10 h-10 rounded-full bg-gray-200 justify-center items-center">
            <Icon
              type="font-awesome"
              name="commenting-o"
              color="#5fcf86"
              size={20}
            />
          </View>
          <View>
            <Text className="text-[13px] text-blcak font-regular">
              Rentaly advises and approves
            </Text>
          </View>
        </View>
      </View>
      <View className=" mx-2 mt-4">
        <View className="flex-row items-center">
          <View className=" ml-4 mr-2 w-10 h-10 rounded-full bg-gray-200 justify-center items-center">
            <Icon
              type="font-awesome"
              name="picture-o"
              color="#5fcf86"
              size={20}
            />
          </View>
          <View>
            <Text className="text-[13px] text-blcak font-regular">
              Post car pictures
            </Text>
          </View>
        </View>
      </View>
      <View className=" mx-2 mt-4">
        <View className="flex-row items-center">
          <View className=" ml-4 mr-2 w-10 h-10 rounded-full bg-gray-200 justify-center items-center">
            <Icon type="font-awesome" name="car" color="#5fcf86" size={20} />
          </View>
          <View>
            <Text className="text-[13px] text-blcak font-regular">
              Start car rental
            </Text>
          </View>
        </View>
      </View>
      <View className="absolute bottom-2 w-full mt-8">
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <View className="  bg-green-400 mt-4 mx-2 rounded-md p-3">
            <Text className="text-white font-bold text-[16px] inline-block text-center">
              Next
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal visible={openModal} animationType="slide">
        <SafeAreaView className="bg-[#DFF3E7] h-full">
          <ScrollView>
            <View className="mt-14">
              <View className="flex-row justify-center items-center">
                <View className=" absolute top-[0px] left-[20px] ">
                  <Icon
                    type="font-awesome"
                    name="angle-left"
                    color="#000000"
                    size={28}
                    onPress={() => setOpenModal(false)}
                  />
                </View>
                <View className="">
                  <Text className="font-[400] text-[20px] text-black text-center">
                    Register
                  </Text>
                </View>
              </View>
            </View>
            <View className=" bg-white mt-8">
              <View className="m-4">
                <View>
                  <Text className=" text-[16px] text-black font-bold">
                    Store name
                  </Text>
                </View>
                <Controller
                  control={control}
                  name="storeName"
                  rules={{
                    required: "Store name is required",
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full">
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder="Enter your store name"
                          placeholderTextColor={"gray"}
                        />
                      </View>
                      {error && (
                        <Text className="text-red-500 mt-1">
                          {error.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>
              <View className="mx-4 my-2">
                <View className="mb-1">
                  <Text className=" text-[16px] text-black font-bold">
                    Email
                  </Text>
                </View>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Email is required",
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full">
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder="Enter your email"
                          placeholderTextColor={"gray"}
                          readOnly
                        />
                      </View>
                      {error && (
                        <Text className="text-red-500 mt-1">
                          {error.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>
              <View className="mx-4 my-2">
                <View className="mb-1">
                  <Text className=" text-[16px] text-black font-bold">
                    Phone number
                  </Text>
                </View>
                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: "Phone number is required",
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full">
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder="Enter your phone number"
                          placeholderTextColor={"gray"}
                          keyboardType="numeric"
                        />
                      </View>
                      {error && (
                        <Text className="text-red-500 mt-1">
                          {error.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>
              <View className="mx-4 my-2">
                <View>
                  <Text className=" text-[16px] text-black font-bold">
                    Car location
                  </Text>
                </View>
                <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full">
                  <TextInput
                    value={selectedLocation?.name}
                    placeholder="Car location"
                    placeholderTextColor={"gray"}
                    readOnly
                    onPressIn={() => {
                      setModalChangeAddress(true);
                      // console.log("open modal");
                    }}
                  />
                </View>
              </View>
              <View className="mx-4 my-2">
                <View>
                  <Text className=" text-[16px] text-black font-bold">
                    Year established
                  </Text>
                </View>
                <Controller
                  control={control}
                  name="yearEstablished"
                  rules={{
                    required: "Year established is required",
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full">
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder="Enter your year established"
                          placeholderTextColor={"gray"}
                          readOnly
                        />
                      </View>
                      {error && (
                        <Text className="text-red-500 mt-1">
                          {error.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>
              <View className="mx-4 mt-2 mb-4">
                <View>
                  <Text className=" text-[16px] text-black font-bold">
                    Zip code
                  </Text>
                </View>
                <Controller
                  control={control}
                  name="zip"
                  rules={{
                    required: "Zip code is required",
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full">
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder="Enter your zip code"
                          placeholderTextColor={"gray"}
                          keyboardType="numeric"
                        />
                      </View>
                      {error && (
                        <Text className="text-red-500 mt-1">
                          {error.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>
            </View>
            <View className=" mt-8">
              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <View className="  bg-green-400 m-4 rounded-md p-3">
                  <Text className="text-white font-bold text-[16px] inline-block text-center">
                    Submit
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalChangeAddress}
          onRequestClose={() => {
            setModalChangeAddress(!modalChangeAddress);
          }}
        >
          <View className="z-10">
            <SearchAddress
              setModalChangeAddress={setModalChangeAddress}
              setValue={setLocation}
            />
          </View>
        </Modal>
      </Modal>
    </SafeAreaView>
  );
};

export default BecomeCarOwner;
