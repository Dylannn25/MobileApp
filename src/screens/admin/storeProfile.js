import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { Icon } from "react-native-elements";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { setStore, store } from "../../store/slices/store";
import { useAppSelector } from "../../store";
import { Modal } from "react-native";
import SearchAddress from "../modal/searchAddress";
import { rentalService } from "../../services/service";
import { useDispatch } from "react-redux";

const StoreProfile = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [changeImage, setChangeImage] = useState(false);
  const [modalChangeAddress, setModalChangeAddress] = useState(false);
  const storeData = useAppSelector(store);
  const [selectedLocation, setSelectedLocation] = useState(
    JSON.parse(storeData.location)
  );
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      storeName: storeData?.storeName ? storeData.storeName : "",
      email: storeData?.email ? storeData.email : "",
      phone: storeData?.phone ? "0" + storeData.phone.toString() : "",
      // location: storeData?.location ? JSON.parse(storeData.location)?.name : "",
      zip: storeData?.zip ? storeData.zip : "",
    },
  });
  const setLocation = (data) => {
    setSelectedLocation({
      name: data?.formatted_address,
      address: data?.formatted_address,
      lat: data?.geometry?.location.lat,
      lon: data?.geometry?.location.lon,
    });
  };
  const dataResult = (data) => {
    if(data){
      dispatch(setStore(data));
      alert("Update Profile Success!!");
    }
    else{
      alert("Update Profile Fail!!");
    }
  };
  const onSubmit = async (data) => {
    const listImage = [];
    if (changeImage) {
      image.forEach((item) => {
        {
          listImage.push({
            ...item,
            uri: `data:image/jpg;base64,${item.base64}`,
          });
        }
      });
    }
    const update = {
      ...data,
      location: JSON.stringify(selectedLocation),
      id: storeData._id,
      images: listImage,
      imageOld: storeData.photos,
      app: true,
    };
    await rentalService.updateProfile(update, dataResult);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      // allowsMultipleSelection: true,
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      setChangeImage(true);
      setImage(result.assets);
    }
  };
  const pickCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        quality: 1,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
      });

      if (!result.canceled) {
        setChangeImage(true);
        setImage(result.assets);
      }
    } catch (error) {}
  };

  const openImagePicker = () => {
    Alert.alert(
      "Choose Image Source",
      "Select the source of the image",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Take Photo", onPress: pickCamera },
        { text: "Choose from Library", onPress: pickImage },
      ],
      { cancelable: true }
    );
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="bg-white h-full">
          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify()}
            className="flex justify-center items-center"
          >
            <Image
              className="w-28 h-28 rounded-full border-[#1ecb15] border-[2px] mt-2"
              source={{
                uri: storeData?.photos
                  ? image
                    ? `data:image/jpg;base64,${image[0].base64}`
                    : storeData.photos
                  : require("../../assets/images/avatar/user.webp"),
              }}
            />
            <TouchableOpacity onPress={openImagePicker}>
              <View className=" w-10 h-10 rounded-full bg-emerald-100 justify-center  -mt-5 ">
                <Icon
                  type="font-awesome"
                  name="camera"
                  color="#34d399"
                  size={18}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="mt-4 mb-2 mx-2"
          >
            <View className="mb-1">
              <Text className=" text-[14px] text-gray-500 font-regular">
                Name
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
                      placeholder="Store name"
                      placeholderTextColor={"gray"}
                    />
                  </View>
                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="mt-4 mb-2 mx-2"
          >
            <View className="mb-1">
              <Text className=" text-[14px] text-gray-500 font-regular">
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
                      placeholder="Email"
                      placeholderTextColor={"gray"}
                    />
                  </View>
                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="mt-4 mb-2 mx-2"
          >
            <View className="mb-1">
              <Text className=" text-[14px] text-gray-500 font-regular">
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
                      placeholder="Phone number"
                      placeholderTextColor={"gray"}
                    />
                  </View>
                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="mt-4 mb-2 mx-2"
          >
            <View className="mb-1">
              <Text className=" text-[14px] text-gray-500 font-regular">
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
                }}
              />
            </View>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="mt-4 mb-2 mx-2"
          >
            <View className="mb-1">
              <Text className=" text-[14px] text-gray-500 font-regular">
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
                      placeholder="Zip code"
                      placeholderTextColor={"gray"}
                    />
                  </View>
                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(700).duration(2000).springify()}
            className=" mt-auto mb-8"
          >
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <View className="  bg-[#1ecb15] mt-4 mx-2 rounded-md p-3">
                <Text className="text-white font-bold text-[16px] inline-block text-center">
                  Update Profile
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoreProfile;
