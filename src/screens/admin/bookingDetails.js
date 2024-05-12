import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import Svg, { Path } from "react-native-svg";
import { convertTimestampToFormat } from "../../utils";
import ViewMapDistance from "../modal/viewMapDistance";
import { useSelector } from "react-redux";
import { selectDestination } from "../../store/slices/destination";
import { Picker } from "@react-native-picker/picker";
import { Alert } from "react-native";
import { rentalService } from "../../services/service";
const BookingDetails = ({ data, setShowModalBookingDetail }) => {
  const destination = useSelector(selectDestination);
  const [modalMap, setModalMap] = useState(false);
  const [item, setItem] = useState(data);
  const [selectedOption, setSelectedOption] = useState("");
  const items = [
    {
      label: "Cancel",
      value: "Cancel",
      backgroundColor: "#ff0000",
      color: "red",
      check: (item?.cancel?.status==true && item?.delivery?.status == false),
    },
    {
      label: "Delete",
      value: "Delete",
      backgroundColor: "#ff0000",
      color: "red",
      check: (item?.sellerDelete==false && item?.cancel?.status==true),
    },
    {
      label: "Confirm",
      value: "Confirm",
      backgroundColor: "#008000",
      color: "#1ecb15",
      check: (item?.confirmed?.status==true && item?.cancel?.status == true),
    },
    {
      label: "Deliver",
      value: "Deliver",
      backgroundColor: "#008000",
      color: "#1ecb15",
      check: item?.delivery?.status == false && item?.cancel?.status == true,
    },
    {
      label: "Return Car",
      value: "Return Car",
      backgroundColor: "#008000",
      color: "#1ecb15",
      check: item?.returnCar?.status == false && item?.cancel?.status == true,
    },
    {
      label: "Paid",
      value: "Paid",
      backgroundColor: "#008000",
      color: "#1ecb15",
      check: item?.payment == false && item?.cancel?.status == true,
    },
  ];
  const [showPicker, setShowPicker] = useState(false);
  const currentDate = new Date(); // Lấy ngày hiện tại
  const formattedDate = currentDate.toISOString();
  const setValueItemAfterUpdate = (value) => {
    setItem(value);
  };
  const handleClick = async () => {
    let update = {
      email: item.user?.email,
    };
    if (selectedOption === "Confirm") {
      update = {
        ...update,
        confirmed: { status: true, time: formattedDate },
        status: "Confirmed",
      };
    } else if (selectedOption === "Cancel") {
      update = {
        ...update,
        cancel: { status: true, time: formattedDate },
        status: "Canceled",
      };
    } else if (selectedOption === "Deliver") {
      update = {
        ...update,
        delivery: { status: true, time: formattedDate },
        status: "Delivered",
      };
    } else if (selectedOption === "Return Car") {
      update = {
        ...update,
        returnCar: { status: true, time: formattedDate },
        status: "Return car",
      };
    } else if (selectedOption === "Paid") {
      update = {
        ...update,
        payment: true,
        paymentTime: formattedDate,
      };
    }else if (selectedOption === "Delete") {
      update = {
        ...update,
        sellerDelete: { status: true, time: formattedDate },
        status: "Canceled",
      };
    }
    await rentalService.updateBooking(
      item?._id,
      update,
      setValueItemAfterUpdate
    );
    alert(`${selectedOption} successfully!`);
  };
  useEffect(() => {}, [item]);
  return (
    <SafeAreaView className="bg-white">
      {item && (
        <>
          <View className=" flex relative pt-[5px] bg-[#fff]">
            <View className="flex-row justify-center items-center">
              <View className=" absolute top-[0px] left-[20px] ">
                <TouchableOpacity
                  onPress={() => {
                    setShowModalBookingDetail(false);
                  }}
                >
                  <Icon
                    type="font-awesome"
                    name="angle-left"
                    color="#000000"
                    size={28}
                  />
                </TouchableOpacity>
              </View>
              <View className=" mb-2">
                <Text className="font-[400] text-[20px] text-black text-center">
                  Booking Details
                </Text>
              </View>
            </View>
          </View>
          <ScrollView>
            <View className="bg-white pb-[110px] mb-[20px]">
              <View className="rounded-[6px] ">
                <View>
                  <Text className="font-bold text-[#72e128] mx-4 mt-4">
                    Booking #{item.codeBooking}
                  </Text>
                  <View className="flex-relative mt-4 ml-4 flex-row ">
                    <View className="mr-2">
                      <Image
                        className="w-[150px] h-[100px] rounded-[10px]"
                        contentFit="cover"
                        source={{ uri: item.car?.photoCar }}
                      />
                    </View>
                    <View className=" justify-center">
                      <Text className="text-[16px] font-[800] text-[#000] w-fit">
                        {item.car?.carName}
                      </Text>
                      <Text className="text-[#262626] font-[500] text-[13px] inline-block my-1">
                        <Icon
                          type="font-awesome"
                          name="star"
                          color="#ffc634"
                          size={13}
                          className="w-[15px]"
                        />{" "}
                        {item.car?.rating}
                      </Text>
                      <Text className="text-[#262626] font-[500] text-[13px] inline-block">
                        <Icon
                          type="font-awesome"
                          name="car"
                          color="#262626"
                          size={13}
                          className="w-[15px]"
                        />{" "}
                        {item.car?.rentalQuantity}
                      </Text>
                    </View>
                  </View>
                  <View className=" flex-1">
                    <Text className="text-[18px] text-black font-bold mx-4 mt-4 ">
                      Car rental information
                    </Text>
                    <View className="flex-row py-2 mx-4 justify-between">
                      <View className="my-2">
                        <View className="flex-row">
                          <Icon
                            type="font-awesome"
                            name="calendar"
                            color="#000000"
                            size={14}
                            className="w-[15px] mr-2"
                          />
                          <Text className="text-[14px] text-black font-regular">
                            Pick up time
                          </Text>
                        </View>
                        <Text className="text-[13px] text-black font-bold mt-2">
                          {item.dateStart}, {item.timeStart}
                        </Text>
                      </View>
                      <View className="my-2">
                        <View className="flex-row">
                          <Icon
                            type="font-awesome"
                            name="calendar"
                            color="#000000"
                            size={14}
                            className="w-[15px] mr-2"
                          />
                          <Text className="text-[14px] text-black font-regular">
                            Return time
                          </Text>
                        </View>
                        <Text className="text-[13px] text-black font-bold mt-2">
                          {item.dateEnd}, {item.timeEnd}
                        </Text>
                      </View>
                    </View>
                    <View className=" mx-4">
                      <View className="flex justify-center ">
                        <Text className="text-[#767676] font-[500] text-[16px] inline-block">
                          <Icon
                            type="font-awesome"
                            name="map-marker"
                            color="#767676"
                            size={20}
                            className="w-[15px]"
                          />
                          {""} Pick up location
                        </Text>
                        <View className=" mt-1">
                          <Text className="text-[13px] text-black font-bold">
                            {item.locationDest}
                          </Text>
                        </View>
                        {item.car?.locationCar && item.car?.locationBooking && (
                          <TouchableOpacity onPress={() => setModalMap(true)}>
                            <View className="mt-4 flex-row">
                              <View className=" border-b-[1px] border-[#000]">
                                <Text className="text-[14px] text-black font-bold">
                                  View map
                                </Text>
                              </View>
                              <View>
                                <Icon
                                  type="font-awesome"
                                  name="angle-right"
                                  color="#000"
                                  size={18}
                                  className="w-[15px]"
                                />
                              </View>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View className="bg-gray-200 mt-4">
                <View className="mx-4 mt-4">
                  <Text className="text-[18px] text-black font-bold">
                    Price details
                  </Text>
                </View>
                <View className=" flex m-2 rounded-xl bg-white">
                  <View className="flex flex-row m-2">
                    <View className="mx-2 items-center">
                      <Text className="text-[18px] text-black font-bold mt-2">
                        Rental Price
                      </Text>
                    </View>
                    <View className="mx-2 items-center ml-auto">
                      <Text className="text-[18px] text-gray-500 font-regular mt-2">
                        {item.priceRental / 1000}K VNĐ
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row mx-2 mb-4 ">
                    <View className="mx-2 items-center">
                      <Text className="text-[18px] text-black font-bold mt-2">
                        Service Price
                      </Text>
                    </View>
                    <View className="mx-2 items-center ml-auto">
                      <Text className="text-[18px] text-gray-500 font-regular mt-2">
                        {item.priceService / 1000}K VNĐ
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row mx-2 mb-4 ">
                    <View className="mx-2 items-center">
                      <Text className="text-[18px] text-black font-bold">
                        Delivery Price
                      </Text>
                    </View>
                    <View className="mx-2 items-center ml-auto">
                      <Text className="text-[18px] text-gray-500 font-regular a">
                        {item.priceDelivery > 0
                          ? `${item.priceDelivery / 1000}K`
                          : item.priceDelivery}{" "}
                        VNĐ
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row mx-4 border-b-[1px] border-[#ddd] "></View>
                  <View className="flex flex-row m-2">
                    <View className="mx-2 items-center">
                      <Text className="text-[18px] text-black font-bold">
                        Total
                      </Text>
                    </View>
                    <View className="mx-2 items-center ml-auto">
                      <Text className="text-[18px] text-[#5fcf86] font-bold mb-2">
                        {item.priceTotal / 1000}K VNĐ
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="bg-gray-200 ">
                <View className="mx-4 mt-2">
                  <Text className="text-[18px] text-black font-bold">
                    Customer
                  </Text>
                </View>
                <View className=" flex m-2 rounded-xl bg-white">
                  <TouchableOpacity>
                    <View className="flex flex-row">
                      <Image
                        className=" w-14 h-14 rounded-full my-4 ml-4 mr-2"
                        source={
                          item.user?.photos
                            ? { uri: item.user?.photos }
                            : require("../../assets/images/avatar/user.webp")
                        }
                      />
                      <View className=" flex mt-4 justify-start">
                        <Text className="text-[16px] text-black font-bold mt-2">
                          {item.user?.fullName}
                        </Text>
                        <View className="flex mt-1 ">
                          <Text className=" text-gray-400 font-[500] text-[13px] inline-block">
                            Customer ID: #{item.user?.id.slice(0, 6)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View className="mx-4">
                    <Text className="text-[18px] text-black font-bold">
                      Contac Infomation
                    </Text>
                    <Text className=" text-gray-400 font-[500] text-[16px] inline-block mt-2 mb-4">
                      Email: {item.user?.email}
                    </Text>
                  </View>
                </View>
                <View className="bg-gray-200">
                  <View className="m-2">
                    <Text className="text-[18px] text-black font-bold">
                      Activity
                    </Text>
                  </View>
                  <View className=" flex mx-3 my-2 rounded-3xl bg-white">
                    <View className="my-4 mx-6 flex md:px-60">
                      <View className="space-y-6  border-l-[1px]">
                        <View className=" relative w-full">
                          <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={
                              item.cancel.status
                                ? "absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-[#ff4747] bg-white"
                                : "absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-gray-500 bg-white"
                            }
                          >
                            <Path
                              fill-rule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                              clip-rule="evenodd"
                            />
                          </Svg>
                          <View className="ml-6">
                            <Text
                              className={
                                item.cancel.status
                                  ? "font-bold text-[#ff4747]"
                                  : "font-bold text-gray-500"
                              }
                            >
                              Trip was canceled
                            </Text>
                            <Text className=" text-sm text-gray-500">
                              Your car has been canceled
                            </Text>
                            <Text className=" text-sm text-gray-500">
                              {item.delivery?.time &&
                                convertTimestampToFormat(item.delivery.time)}
                            </Text>
                          </View>
                        </View>
                        <View className=" relative w-full">
                          <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-[#1ecb15] bg-white"
                          >
                            <Path
                              fill-rule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                              clip-rule="evenodd"
                            />
                          </Svg>
                          <View className="ml-6">
                            <Text className="font-bold text-[#1ecb15]">
                              Trip was booked
                            </Text>
                            <Text className=" text-sm text-gray-500">
                              Your car has been booked
                            </Text>
                            <Text className=" text-sm text-gray-500">
                              {item.createdAt &&
                                convertTimestampToFormat(item.createdAt)}
                            </Text>
                          </View>
                        </View>
                        <View className=" relative w-full">
                          <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={
                              item.confirmed.status
                                ? "absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-[#1ecb15] bg-white"
                                : "absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-gray-500 bg-white"
                            }
                          >
                            <Path
                              fill-rule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                              clip-rule="evenodd"
                            />
                          </Svg>
                          <View className="ml-6">
                            <Text
                              className={
                                item.confirmed.status
                                  ? "font-bold text-[#1ecb15]"
                                  : "font-bold text-gray-500"
                              }
                            >
                              Trip was confirm
                            </Text>
                            <Text className=" text-sm text-gray-500">
                              Your car has been confirm
                            </Text>
                            <Text className=" text-sm text-gray-500">
                              {item.confirmed?.time &&
                                convertTimestampToFormat(item.confirmed.time)}
                            </Text>
                          </View>
                        </View>
                        <View className=" relative w-full">
                          <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={
                              item.delivery.status
                                ? "absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-[#1ecb15] bg-white"
                                : "absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-gray-500 bg-white"
                            }
                          >
                            <Path
                              fill-rule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                              clip-rule="evenodd"
                            />
                          </Svg>
                          <View className="ml-6">
                            <Text
                              className={
                                item.delivery.status
                                  ? "font-bold text-[#1ecb15]"
                                  : "font-bold text-gray-500"
                              }
                            >
                              Car was delivered
                            </Text>
                            <Text className=" text-sm text-gray-500">
                              Your car has been delivered to customer
                            </Text>
                            <Text className=" text-sm text-gray-500">
                              {item.delivery?.time &&
                                convertTimestampToFormat(item.delivery.time)}
                            </Text>
                          </View>
                        </View>
                        <View className=" relative w-full">
                          <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={
                              item.returnCar.status
                                ? "absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-[#1ecb15] bg-white"
                                : "absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-gray-500 bg-white"
                            }
                          >
                            <Path
                              fill-rule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                              clip-rule="evenodd"
                            />
                          </Svg>
                          <View className="ml-6">
                            <Text
                              className={
                                item.returnCar.status
                                  ? "font-bold text-[#1ecb15]"
                                  : "font-bold text-gray-500"
                              }
                            >
                              Custumer retuned car
                            </Text>
                            <Text className=" text-sm text-gray-500">
                              Get your car back
                            </Text>
                            <Text className=" text-sm text-gray-500">
                              {item.returnCar?.time &&
                                convertTimestampToFormat(item.returnCar.time)}
                            </Text>
                          </View>
                        </View>
                        <View className=" relative w-full">
                          <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={
                              item.payment
                                ? "absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-[#1ecb15] bg-white"
                                : "absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-gray-500 bg-white"
                            }
                          >
                            <Path
                              fill-rule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                              clip-rule="evenodd"
                            />
                          </Svg>
                          <View className="ml-6">
                            <Text
                              className={
                                item.payment
                                  ? "font-bold text-[#1ecb15]"
                                  : "font-bold text-gray-500"
                              }
                            >
                              Paid
                            </Text>
                            <Text className=" text-sm text-gray-500">
                              Paid successfully
                            </Text>
                            <Text className=" text-sm text-gray-500">
                              {item.paymentTime &&
                                convertTimestampToFormat(item.paymentTime)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          {showPicker ? (
            <View className="absolute bottom-[80px] w-full bg-white h-[170px] border-[#ddd] border-t-[1px]">
              <Picker
                selectedValue={selectedOption}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedOption(itemValue);
                  setShowPicker(false);
                }}
                style={{
                  height: 0,
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "#1ecb15",
                }}
                mode="dialog"
                selectionColor="#1ecb15"
                itemStyle={{
                  fontSize: 22,
                  color: "#1ecb15",
                  fontWeight: "500",
                }}
              >
                {items.map(
                  (item, index) =>
                    !item.check && (
                      <Picker.Item
                        key={index}
                        label={item.label}
                        value={item.value}
                        color={item.color}
                      />
                    )
                )}
              </Picker>
            </View>
          ) : (
            <View className="absolute bottom-0 w-full bg-white h-[170px] border-[#ddd] border-t-[1px]">
              <TouchableOpacity
                onPress={() =>
                  // navigation.navigate("HiddenScreen", { screen: "AddAddress" })
                  {
                    if (selectedOption) {
                      Alert.alert(
                        `${selectedOption} `,
                        `Are you sure you want change order to ${selectedOption} or select another option?`,
                        [
                          {
                            text: "Choose another option",
                            onPress: () => setShowPicker(true),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => {
                              handleClick();
                            },
                          },
                        ]
                      );
                    }
                    else{
                      setShowPicker(true)
                    }
                  }
                }
              >
                <View className="  bg-[#1ecb15] mt-4 mx-2 rounded-md p-3">
                  <Text className="text-white font-bold text-[20px] inline-block text-center">
                    {selectedOption == "" ? "Choose option" : selectedOption}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalMap}
        onRequestClose={() => {
          setModalMap(!modalMap);
        }}
      >
        <View>
          <ViewMapDistance
            item={item?.car}
            setModalMap={setModalMap}
            destination={item.car?.locationBooking}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default BookingDetails;
