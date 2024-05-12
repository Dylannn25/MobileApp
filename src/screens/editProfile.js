import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { useAppDispatch, useAppSelector } from "../store";
import { setUser, user } from "../store/slices/user";
import { AuthContext } from "../store/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import PickerComponent from "../common/picker/picker";
import { Alert } from "react-native";
import { Platform } from "react-native";
import { rentalService } from "../services/service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userLogin = useAppSelector(user);
  const { logout } = useContext(AuthContext);
  const gender = [
    {
      label: "Male",
      value: "Male",
      backgroundColor: "#008000",
      color: "#1ecb15",
    },
    {
      label: "Female",
      value: "Female",
      backgroundColor: "#008000",
      color: "#1ecb15",
    },
  ];
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: userLogin?.fullName,
      email: userLogin?.email,
      gender: selectedOption ? selectedOption : userLogin?.gender,
    },
  });

  const [image, setImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [changeImage, setChangeImage] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      // allowsMultipleSelection: true,
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
  const updateData = (value)=>{
    if(!value){
      alert("Update profile failed!");
      return;
    }
    dispatch(setUser(value));
    AsyncStorage.setItem("userApp", JSON.stringify(value));
    alert("Update profile successfully!");
  }
  const handleUpdate = async (value) => {
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
    const data = {
      id: userLogin.id,
      name: value.name,
      email: value.email,
      gender: value.gender,
      images: listImage,
      imageOld: userLogin.photos,
      app: true,
    };
    await rentalService.updateUserId(data, updateData);
  };
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
                navigation.navigate("HiddenScreen", { screen: "MyAccount" })
              }
            />
          </View>
          <View className=" mb-2">
            <Text className="font-[400] text-[20px] text-black text-center">
              Edit Profile
            </Text>
          </View>
        </View>
        <Animated.View
              entering={FadeInUp.delay(200).duration(1000).springify()} className="flex justify-center mt-4 items-center">
          <Image
            className="w-36 h-36 rounded-full border-[#1ecb15] border-[2px]"
            source={{
              uri: image
                ? `data:image/jpg;base64,${image[0].base64}`
                : userLogin.photos,
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
              entering={FadeInDown.delay(400).duration(1000).springify()} className="mt-4 mb-2 mx-4">
          <View className="mb-1">
            <Text className=" text-[14px] text-gray-500 font-regular">
              Name
            </Text>
          </View>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Name is required",
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
                    placeholder={userLogin?.fullName}
                    placeholderTextColor={"black"}
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
              entering={FadeInDown.delay(500).duration(1000).springify()} className="mt-4 mb-2 mx-4">
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
                <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full">
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder={userLogin?.email}
                    placeholderTextColor={"black"}
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
              entering={FadeInDown.delay(600).duration(1000).springify()} className="mt-4 mb-2 mx-4">
          <View className="mb-1">
            <Text className=" text-[14px] text-gray-500 font-regular">
              Gender
            </Text>
          </View>
          <Controller
            control={control}
            name="gender"
            rules={{
              required: "Gender is required",
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
                    placeholder={
                      selectedOption ? selectedOption : userLogin?.gender
                    }
                    placeholderTextColor={"black"}
                    editable={false}
                    onPressIn={() => setShowPicker(true)}
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
              entering={FadeInDown.delay(700).duration(2000).springify()} className=" mt-auto mb-8">
          {!showPicker ? (
            <TouchableOpacity onPress={handleSubmit(handleUpdate)}>
              <View className="  bg-[#1ecb15] mt-4 mx-2 rounded-md p-3">
                <Text className="text-white font-bold text-[16px] inline-block text-center">
                  Save
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <PickerComponent
              setShowPicker={setShowPicker}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              items={gender}
              setValue={setValue}
            />
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
