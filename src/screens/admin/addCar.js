import { View, Text, Image, TouchableOpacity, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Icon, CheckBox } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import rentalRequester from "../../services/request";
import { rentalService } from "../../services/service";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { useAppSelector } from "../../store";
import { store } from "../../store/slices/store";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
const AddCar = () => {
  const storeData = useAppSelector(store);
  const [price, setPrice] = useState(false);
  const [limit, setLimit] = useState(false);
  const [time, setTime] = useState(false);
  const [clean, setClean] = useState(false);
  const [deo, setDeo] = useState(false);
  const [allFeatures, setAllFeatures] = useState(null);
  const priceSwitch = () => setPrice((previousState) => !previousState);
  const limitSwitch = () => setLimit((previousState) => !previousState);
  const timeSwitch = () => setTime((previousState) => !previousState);
  const cleanSwitch = () => setClean((previousState) => !previousState);
  const deoSwitch = () => setDeo((previousState) => !previousState);
  const [agree, setAgree] = useState(false);
  const [selectedValuesFeature, setSelectedValuesFeature] = useState([]);
  const [listCate, setListCate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [arrayFeature, setArrayFeature] = useState([]);
  const { control, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState(null);
  const getAllFeature = async () => {
    await rentalService.getFeature(setAllFeatures);
  };
  const getAllCategories = async () => {
    await rentalService.getAllCategories(setListCate, setLoading);
  };
  function toggleValue(id, value, photo) {
    const index = selectedValuesFeature.findIndex((item) => item.id === id);
    if (index === -1) {
      // Nếu giá trị không tồn tại trong mảng, thêm nó vào mảng
      setSelectedValuesFeature([...selectedValuesFeature, { id, value, photo }]);
    } else {
      // Nếu giá trị đã tồn tại trong mảng, loại bỏ nó khỏi mảng
      const updatedValues = [...selectedValuesFeature];
      updatedValues.splice(index, 1);
      setSelectedValuesFeature(updatedValues);
    }
  }
  function isSelected(id) {
    return selectedValuesFeature.some((item) => item.id === id);
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: true,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets);
    }
  };
  const handleClick = async (value) => {
    if(!category) {
      alert("Please select a category");
      return;
    }
    if(!image) {
      alert("Please select an image");
      return;
    }
    const listImage = []
    image.forEach((item) => {
      {
        listImage.push({
          ...item,
          uri: `data:image/jpg;base64,${item.base64}`,
        });
      }
    });
    const data = {
      storeId: storeData._id,
      ...value,
      sortDesc: desc,
      model: JSON.stringify(category),
      features: selectedValuesFeature,
      images: listImage,
      location: storeData?.location ? storeData.location : "",
    };
    await rentalService.addCarAdmin(data, null);
    alert("Add car successfully!");
  };
  useEffect(() => {
    if (!allFeatures) {
      getAllFeature();
    }
    if (listCate.length === 0) {
      getAllCategories();
    }
  }, []);
  return (
    <ScrollView>
      <View className="bg-white h-full">
        <View className="">
          <Text className="m-4 text text-[18px] font-[700] text-[#000]">
            Car infomation
          </Text>
          <Animated.View entering={FadeInRight.delay(200).duration(1000).springify()} className="mb-2 mx-4">
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Name is required"
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Name"
                      placeholderTextColor={"gray"}
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
            {/* <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
              <TextInput placeholder={"Name"} placeholderTextColor={"gray"} />
            </View> */}
          </Animated.View>
          <View className="mt-4 mb-2 mx-4">
            <Animated.View entering={FadeInLeft.delay(200).duration(1000).springify()} className="border-[1px] border-[#ddd] p-4 rounded-md w-full h-[150px] mb-4">
              <TextInput
                placeholder={"Description"}
                placeholderTextColor={"gray"}
                multiline
                onChangeText={(text) => setDesc(text)}
              />
            </Animated.View>
          </View>
        </View>
        <View className="">
          <Text className="m-4 text text-[18px] font-[700] text-[#000]">
            Organize
          </Text>
          <View className="mb-4 mx-4">
            <Text className="mb-4 text-[16px] font-[500] text-black font-regular">
              Vehicle Type
            </Text>
            <Animated.View entering={FadeInLeft.delay(200).duration(1000).springify()} className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
              {/* <TextInput placeholder={"Name"} placeholderTextColor={"gray"} /> */}
              <SelectDropdown
                data={listCate}
                onSelect={(selectedItem, index) => {
                  setCategory(selectedItem);
                }}
                defaultButtonText={category?.name}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.name;
                }}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <>
                      <Icon
                        type="font-awesome"
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        color={"#444"}
                        size={14}
                      />
                    </>
                  );
                }}
                dropdownIconPosition={"right"}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.name;
                }}
                buttonStyle={{
                  width: "100%",
                  height: "auto",
                  backgroundColor: "#FFF",
                }}
                buttonTextStyle={{
                  color: "#444",
                  textAlign: "left",
                  marginLeft: -7,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              />
            </Animated.View>
          </View>
          {/* <View className="mb-4 mx-4">
            <Text className="mb-4 text-[14px] text-black font-regular">
              Car Body Type
            </Text>
            <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full mb-4">
              <TextInput
                placeholder={"Description"}
                placeholderTextColor={"gray"}
              />
            </View>
          </View> */}
        </View>
        <View className="">
          <Text className="m-4 text text-[18px] font-[700] text-[#000]">
            Image
          </Text>
          <TouchableOpacity onPress={pickImage}>
            <Animated.View entering={FadeInRight.delay(200).duration(1000).springify()} className=" mx-4 rounded-lg border-[1px] border-[#ddd] h-[auto] mb-4 items-center justify-center">
              {!image ? (
                <View className="border-[1px] border-[#666cff] w-[150px] h-[40px] rounded-md items-center justify-center m-4">
                  <Text className=" text-[16px] font-[700] text-[#666cff]">
                    BROWSE IMAGE
                  </Text>
                </View>
              ) : (
                <>
                  {image && image?.length > 0 && (
                    <>
                      <View className="flex-row flex-wrap justify-center">
                        {image?.map((item, index) => (
                          <Image
                            source={{ uri: item?.uri }}
                            className="w-[100px] h-[100px] m-2"
                          />
                        ))}
                      </View>
                    </>
                  )}
                </>
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
        <View className=" mx-4 mt-4 rounded-lg shadow-inner">
          <Text className="mb-4 text-[18px] font-[700] text-[#000]">
            Specification
          </Text>
          <View className="flex justify-between">
            <Text className="my-4 text text-[16px] font-[600] text-[#000]">
              Seats
            </Text>
            <Controller
              control={control}
              name="seat"
              rules={{
                required: "Seat is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Seat should be a number",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="4"
                      placeholderTextColor={"gray"}
                      keyboardType="numeric"
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
            <Text className="my-4 text text-[16px] font-[600] text-[#000]">
              Transmission
            </Text>
            <Controller
              control={control}
              name="transmission"
              rules={{
                required: "Transmission is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Automatic number"
                      placeholderTextColor={"gray"}
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
            <Text className="my-4 text text-[16px] font-[600] text-[#000]">
              Fuel
            </Text>
            <Controller
              control={control}
              name="fuel"
              rules={{
                required: "Fuel is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Gasoline"
                      placeholderTextColor={"gray"}
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
            <Text className="my-4 text text-[16px] font-[600] text-[#000]">
              Energy consumption (Number of liters of fuel for a distance of
              100km.)
            </Text>
            <Controller
              control={control}
              name="energy"
              rules={{
                required: "Energy consumption is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Energy consumption should be a number",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="10"
                      placeholderTextColor={"gray"}
                      keyboardType="numeric"
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>
        </View>
        <View className=" m-4 rounded-lg shadow-inner ">
          <Text className="mb-4 text text-[18px] font-[700] text-[#000]">
            {" "}
            Feature
          </Text>
          <View>
            <View className=" flex justify-center">
              <View className="flex flex-row flex-wrap justify-between ">
                {allFeatures?.map((item, index) => (
                  <>
                    <TouchableOpacity
                      key={item.id}
                      className="w-[49%] mb-2"
                      onPress={() => toggleValue(item.id, item.name, item.photo)}
                    >
                      <View
                        className={
                          isSelected(item.id)
                            ? "flex justify-center rounded-2xl border-[1px] border-[#1ecb15] bg-[#effaf3] py-[10px] px-[5px] items-center"
                            : "flex justify-center rounded-2xl border-[1px] border-[#ddd] py-[10px] px-[5px] items-center"
                        }
                      >
                        <View>
                          <Image
                            className="w-[30px] h-[30px] m-2"
                            source={{ uri: item.logo }}
                          />
                        </View>
                        <View>
                          <Text className="text-black font-bold text-[16px] text-center mb-1">
                            {item.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View className="">
          <Text className="m-4 text text-[18px] font-[700] text-[#000]">
            Price
          </Text>

          <View className="mb-2 mx-4">
            <Controller
              control={control}
              name="costPrice"
              rules={{
                required: "Cost price is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Cost price should be a number",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Cost price"
                      placeholderTextColor={"gray"}
                      keyboardType="numeric"
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>
          <View className="m-4">
            <Controller
              control={control}
              name="salePrice"
              rules={{
                required: "Sale price is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Sale price should be a number",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Sale price"
                      placeholderTextColor={"gray"}
                      keyboardType="numeric"
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>
          {/* <View className="flex-row border-t-[1px] border-[#ddd] mx-4 items-center ">
            <View className=" mb-4 mt-4">
              <Text className=" text-[14px] text-gray-400 font-regular">
                Available
              </Text>
            </View>
            <View className=" ml-auto mb-4 mt-4">
              <Switch
                trackColor={{ false: "#ddd", true: "#666cff" }}
                thumbColor={price ? "#fff" : "#fff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={priceSwitch}
                value={price}
              />
            </View>
          </View> */}
        </View>
        <View className="">
          <Text className="m-4 text text-[18px] font-[700] text-[#000]">
            Delivery Location
          </Text>
          <View className="mb-2 mx-4">
            <Controller
              control={control}
              name="deliveryRadius"
              rules={{
                required: "Deliver within is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Deliver within should be a number",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Deliver within"
                      placeholderTextColor={"gray"}
                      keyboardType="numeric"
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>

          <View className="mt-4 mb-2 mx-4">
            <Controller
              control={control}
              name="deliveryRadiusFree"
              rules={{
                required: "Free delivery within is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Free delivery within should be a number",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Free delivery within"
                      placeholderTextColor={"gray"}
                      keyboardType="numeric"
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>
          <View className="m-4">
            <Controller
              control={control}
              name="deliveryPrice"
              rules={{
                required: "Delivery fee (2 ways) is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Delivery fee (2 ways) should be a number",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Delivery fee (2 ways)"
                      placeholderTextColor={"gray"}
                      keyboardType="numeric"
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>
          {/* <View className="flex-row border-t-[1px] border-[#ddd] m-4 items-center ">
            <View>
              <Text className=" text-[14px] text-gray-400 font-regular">
                Deliver car at airport
              </Text>
            </View>
            <View>
              <CheckBox
                value={agree}
                onValueChange={() => setAgree(!agree)}
                color={agree ? "#666cff" : undefined}
              />
            </View>
          </View> */}
        </View>
        <View className="">
          <Text className="m-4 text text-[18px] font-[700] text-[#000]">
            Vehicle Delivery Time (24h)
          </Text>

          <View className="mb-2 mx-4">
            <Controller
              control={control}
              name="timeStart"
              rules={{
                required: "Time Start is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Time Start should be a number",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Time Start"
                      placeholderTextColor={"gray"}
                      keyboardType="numeric"
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>
          <View className="m-4">
            <Controller
              control={control}
              name="endTime"
              rules={{
                required: "Time End is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Time End should be a number",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Time End"
                      placeholderTextColor={"gray"}
                      keyboardType="numeric"
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>
        </View>
        <View className="">
          <Text className="m-4 text text-[18px] font-[700] text-[#000]">
            Surcharge for exceeding KM
          </Text>

          <View className="mb-4 mx-4">
            <Controller
              control={control}
              name="limitPrice"
              rules={{
                required: "Limit price is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Limit price should be a number",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="4000(VND)"
                      placeholderTextColor={"gray"}
                      keyboardType="numeric"
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>
          {/* <View className="m-4">
            <View className="border-[1px] border-[#ddd] p-4 rounded-md ">
              <TextInput
                placeholder={"Limit distance (km)"}
                placeholderTextColor={"gray"}
              />
            </View>
          </View>
          <View className="flex-row border-t-[1px] border-[#ddd] mx-4 items-center ">
            <View className=" mb-4 mt-4">
              <Text className=" text-[14px] text-gray-400 font-regular">
                Available
              </Text>
            </View>
            <View className=" ml-auto mb-4 mt-4">
              <Switch
                trackColor={{ false: "#ddd", true: "#666cff" }}
                thumbColor={limit ? "#fff" : "#fff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={limitSwitch}
                value={limit}
              />
            </View>
          </View> */}
        </View>
        <View className="">
          <Text className="m-4 text text-[18px] font-[700] text-[#000]">
            Overtime surcharge
          </Text>

          <View className="mb-4 mx-4">
            <Controller
              control={control}
              name="overTimePrice"
              rules={{
                required: "Over time price is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Over time price should be a number",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="60000(VND)"
                      placeholderTextColor={"gray"}
                      keyboardType="numeric"
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>
          {/* <View className="m-4">
            <View className="border-[1px] border-[#ddd] p-4 rounded-md ">
              <TextInput
                placeholder={"Limit hour"}
                placeholderTextColor={"gray"}
              />
            </View>
          </View>
          <View className="flex-row border-t-[1px] border-[#ddd] mx-4 items-center ">
            <View className=" mb-4 mt-4">
              <Text className=" text-[14px] text-gray-400 font-regular">
                Available
              </Text>
            </View>
            <View className=" ml-auto mb-4 mt-4">
              <Switch
                trackColor={{ false: "#ddd", true: "#666cff" }}
                thumbColor={time ? "#fff" : "#fff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={timeSwitch}
                value={time}
              />
            </View>
          </View> */}
        </View>
        <View className="">
          <Text className="m-4 text text-[18px] font-[700] text-[#000]">
            {" "}
            Cleaning
          </Text>

          <View className="mb-4 mx-4">
            <Controller
              control={control}
              name="washingPrice"
              rules={{
                required: "Clean price is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Clean price should be a number",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="100000(VND)"
                      placeholderTextColor={"gray"}
                      keyboardType="numeric"
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>
          {/* <View className="flex-row border-t-[1px] border-[#ddd] mx-4 items-center ">
            <View className=" mb-4 mt-4">
              <Text className=" text-[14px] text-gray-400 font-regular">
                Available
              </Text>
            </View>
            <View className=" ml-auto mb-4 mt-4">
              <Switch
                trackColor={{ false: "#ddd", true: "#666cff" }}
                thumbColor={clean ? "#fff" : "#fff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={cleanSwitch}
                value={clean}
              />
            </View>
          </View> */}
        </View>
        <View className="">
          <Text className="m-4 text text-[18px] font-[700] text-[#000]">
            Deodorization
          </Text>

          <View className="mx-4">
            <Controller
              control={control}
              name="deodorisePrice"
              rules={{
                required: "Deodorization is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Deodorization should be a number",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <View className="border-[1px] border-[#ddd] p-4 rounded-md w-full ">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="400000(VND)"
                      placeholderTextColor={"gray"}
                      keyboardType="numeric"
                    />
                  </View>

                  {error && (
                    <Text className="text-red-500 mt-1">{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>
          {/* <View className="flex-row border-t-[1px] border-[#ddd] mx-4 items-center ">
            <View className=" mb-4 mt-4">
              <Text className=" text-[14px] text-gray-400 font-regular">
                Available
              </Text>
            </View>
            <View className=" ml-auto mb-4 mt-4">
              <Switch
                trackColor={{ false: "#ddd", true: "#666cff" }}
                thumbColor={deo ? "#fff" : "#fff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={deoSwitch}
                value={deo}
              />
            </View>
          </View> */}
        </View>
        <TouchableOpacity onPress={handleSubmit(handleClick)}>
          <View className="border-[1px] border-[#666cff] w-[150px] h-[40px] rounded-md items-center justify-center m-6 ml-auto">
            <Text className=" text-[16px] font-[700] text-[#666cff]">
              ADD A CAR
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddCar;
