import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import Animated, { FadeInDown } from "react-native-reanimated";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { Image } from "react-native";
import { isValidDate } from "../utils";
import { useAppSelector } from "../store";
import { user } from "../store/slices/user";
import { rentalService } from "../services/service";
const DriveLicense = () => {
  const userLogin = useAppSelector(user);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [changeImage, setChangeImage] = useState(false);
  const [image, setImage] = useState(null);
  const [dataSubmit, setDataSubmit] = useState(null);
  const [haveData, setHaveData] = useState(false);
  const navigation = useNavigation();
  const { control, handleSubmit, setValue, setError } = useForm({
    defaultValues: {
      gplx: dataSubmit?.gplx || "",
      fullName: dataSubmit?.fullName || "",
      birthDay: dataSubmit?.birthDay || "",
    },
  });
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
    getDriveLicense();
  }, []);
  useEffect(() => {
    if(dataSubmit){
      setValue("gplx", dataSubmit?.gplx);
      setValue("fullName", dataSubmit?.fullName);
      setValue("birthDay", dataSubmit?.birthDay);
    }
  },[dataSubmit])
  const getDriveLicense = async()=>{
    await rentalService.getDriveLicense(setDataSubmit, setHaveData);
  }
  const result = (value)=>{
      if(value?.message){
        alert(value?.message);
      }else{
        alert("Add drive license successfully!");
      }
  }
  const handleUpdateDriverLicense = async() => {
    try {
      const data = {
        userId: userLogin?.id,
        ...dataSubmit
      }
      if(haveData){
        await rentalService.updateDriveLicense(data, result);
      }
      else{
        await rentalService.createDriveLicense(data, result);
      }
    } catch (error) {
      
    }
  }
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    var dataArray = data.split("\n");

    // Lấy từng phần của dữ liệu
    var maSo = dataArray[0];
    var ten = dataArray[1];
    var ngaySinh = dataArray[2];
    var hang = dataArray[3];
    var donVi = dataArray[4];

    if(maSo.trim() != dataSubmit?.gplx?.trim()){
      Alert.alert("Driver's license number not match!");
      return;
    }
    if(ten.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() !== dataSubmit?.fullName?.toUpperCase()?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()){
      Alert.alert("First and last name not match!");
      return;
    }
    if(ngaySinh.trim() != dataSubmit?.birthDay.trim()){
      Alert.alert("Date of birth not match!");
      return;
    }

    Alert.alert(
      "Verify", 
      "Driver's license Verified successfully!",
      [
        {
          text: "Update driver's license",
          onPress: () => handleUpdateDriverLicense(),
        },
        {
          text: "Cancel",
          style: "cancel",
        }
      ],
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const onSubmit = (value) => {
    setDataSubmit(value);
    setScanned(false);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      // allowsMultipleSelection: true,
      base64: true,
      allowsEditing: true,
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
  const handleChange = (text) => {
    setValue('birthDay',text);
    if (!isValidDate(text)) {
      setError('birthDay', {
        type: 'manual',
        message: 'Invalid date format. Please use dd/mm/yyyy',
      });
    } else {
      setError('birthDay', null);
      const [day, month, year] = text.split('/').map(Number);
      const selectedDate = new Date(year, month - 1, day); // month - 1 vì tháng trong JavaScript tính từ 0 đến 11
      const currentDate = new Date();
      if (selectedDate > currentDate) {
        setError('birthDay', {
          type: 'manual',
          message: 'Selected date cannot be in the future',
        });
      }
    }
  };
  return (
    <>
      <SafeAreaView className="flex bg-white h-full">
        <View className="px-4 bg-white w-full h-full">
          <View className="flex-row justify-center items-center">
            <View className=" absolute top-[-8px] left-[0px] border-[1px] border-[#ddd] w-[40px] h-[40px] rounded-full justify-center items-center">
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
              <Text className="font-[400] text-[24px] text-black text-center">
                Drive License
              </Text>
            </View>
          </View>
          <ScrollView className="mt-4">
            <View className="flex">
              <Text className="text-[18px] text-black font-semibold">
                License front photo
              </Text>
              <Text className="text-[16px] text-gray-500 my-2">
                The photo needs to show a representative photo and license
                number
              </Text>

              <View className="w-full h-[280px] border-[1px] border-[#ddd] my-2 rounded-[10px] justify-center items-center">
                <Image
                  className="w-[100%] h-[250px] border-[#1ecb15] border-[2px]"
                  source={{
                    uri: image
                      ? `data:image/jpg;base64,${image[0].base64}`
                      : "https://www.mioto.vn/static/media/dl-confirm.d76e5bdc.png",
                  }}
                />
                {/* <TouchableOpacity onPress={openImagePicker}>
                  <View className=" w-10 h-10 rounded-full bg-emerald-100 justify-center absolute bottom-[-10px] right-[-10px]">
                    <Icon
                      type="font-awesome"
                      name="camera"
                      color="#34d399"
                      size={18}
                    />
                  </View>
                </TouchableOpacity> */}
              </View>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full"
              >
                <Controller
                  control={control}
                  name="gplx"
                  rules={{
                    required: "Driver's license number is required",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Driver's license number should be a number",
                    },
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Text className="text-[18px] text-black font-semibold mt-4">
                        Driver's license number
                      </Text>
                      <Text className="text-[16px] text-gray-500 my-2">
                        12-digit series on the front of the license
                      </Text>
                      <View className="bg-white p-4 rounded-[10px] w-full border-[1px] border-[#ddd] my-2">
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder="0000-0000-0000"
                          placeholderTextColor={"gray"}
                          keyboardType="numeric"
                          maxLength={12}
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
                entering={FadeInDown.delay(200).duration(1000).springify()}
                className="w-full"
              >
                <Controller
                  control={control}
                  name="fullName"
                  rules={{ required: "First and last name is required" }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Text className="text-[18px] text-black font-semibold mt-2">
                        First and last name
                      </Text>

                      <View className="bg-white p-4 rounded-[10px] w-full border-[1px] border-[#ddd] my-2">
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder="Full Name"
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
                entering={FadeInDown.delay(300).duration(1000).springify()}
                className="w-full mb-3"
              >
                <Controller
                  control={control}
                  name="birthDay"
                  rules={{ required: "Date of birth is required" }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Text className="text-[18px] text-black font-semibold mt-2">
                        Date of birth
                      </Text>

                      <View className="bg-white p-4 rounded-[10px] w-full border-[1px] border-[#ddd] my-2">
                        <TextInput
                          value={value}
                          onChangeText={handleChange}
                          onBlur={onBlur}
                          placeholder="dd/mm/yyyy"
                          placeholderTextColor={"gray"}
                          keyboardType="numbers-and-punctuation"
                          maxLength={10}
                        />
                      </View>

                      {error && (
                        <Text className="text-red-500">{error.message}</Text>
                      )}
                    </>
                  )}
                />
              </Animated.View>
            </View>
          </ScrollView>
          <View className="my-4">
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <Animated.View
                entering={FadeInDown.delay(500).duration(1000).springify()}
                className="  bg-green-400 mt-4 rounded-md p-3 "
              >
                <Text className="text-white font-bold text-[16px] inline-block text-center">
                  Verify
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {!scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </>
    // <View style={styles.container}>
    //   <BarCodeScanner
    //     onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
    //     style={StyleSheet.absoluteFillObject}
    //   />
    //   {scanned && (
    //     <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
    //   )}
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
export default DriveLicense;
