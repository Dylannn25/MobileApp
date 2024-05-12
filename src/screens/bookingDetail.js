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
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import Svg, { Path } from "react-native-svg";
import { Rating, formatPrice } from "../utils";
import { rentalService } from "../services/service";
const BookingDetail = ({ item, setBookingDetail }) => {
  const [store, setStore] = useState(null);
  const getDataStore = async () => {
    await rentalService.getStore(item?.car?.carOwner, setStore);
  };
  useEffect(() => {
    getDataStore();
  }, []);
  return (
    <SafeAreaView className="bg-white">
      <View className=" flex relative pt-[5px] bg-[#fff]">
        <View className="flex-row justify-center items-center">
          <View className=" absolute top-[0px] left-[20px] ">
            <TouchableOpacity onPress={() => setBookingDetail(false)}>
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
        {item && (
          <View className="bg-white pb-[110px]">
            <View className="rounded-[6px] ">
              <View>
                <View className="flex-relative mt-4 ml-4 flex-row ">
                  <View className="mr-2">
                    <Image
                      className="w-[150px] h-[100px] rounded-[10px]"
                      contentFit="cover"
                      source={{ uri: item?.car.photoCar }}
                    />
                  </View>
                  <View className=" justify-center">
                    <Text className="text-[16px] font-[800] text-[#000] w-fit">
                      {item?.car.carName}
                    </Text>
                    <Text className="text-[#262626] font-[500] text-[13px] inline-block my-1">
                      <Icon
                        type="font-awesome"
                        name="star"
                        color="#ffc634"
                        size={13}
                        className="w-[15px]"
                      />{" "}
                      {/* {Rating(item.dataCar)} */}
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
                <View className=" mt-4 border-t-[1px] border-b-[1px] border-[#ddd] mx-2">
                  <View className="flex-row my-2 ">
                    <Svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M8.65372 3.63C9.89372 3.29813 11.2114 3 12 3C12.7886 3 14.1063 3.29813 15.3463 3.63C16.6149 3.9675 17.8937 4.36687 18.6457 4.60875C18.9601 4.71096 19.2389 4.8984 19.4499 5.14954C19.661 5.40068 19.7958 5.70533 19.8389 6.0285C20.52 11.0651 18.9394 14.7979 17.0217 17.2672C16.2085 18.3236 15.2388 19.2538 14.1451 20.0269C13.767 20.2944 13.3663 20.5296 12.9474 20.73C12.6274 20.8785 12.2834 21 12 21C11.7166 21 11.3737 20.8785 11.0526 20.73C10.6337 20.5296 10.233 20.2944 9.85486 20.0269C8.76118 19.2538 7.79153 18.3236 6.97829 17.2672C5.06058 14.7979 3.48001 11.0651 4.16115 6.0285C4.20422 5.70533 4.33903 5.40068 4.55008 5.14954C4.76114 4.8984 5.03988 4.71096 5.35429 4.60875C6.44594 4.25641 7.54607 3.93007 8.65372 3.63Z"
                        stroke="#5FCF86"
                        stroke-width="1.5"
                      ></Path>
                      <Path
                        d="M11.3333 12.6668L9.5 10.8335"
                        stroke="#5FCF86"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></Path>
                      <Path
                        d="M14.9997 9L11.333 12.6667"
                        stroke="#5FCF86"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></Path>
                    </Svg>
                    <View className="ml-2 justify-center">
                      <Text className="text-[16px] text-[#5fcf86] font-bold">
                        MIC car rental insurance
                      </Text>
                    </View>
                  </View>
                </View>
                <View className=" flex-1 mt-2">
                  <Text className="text-[18px] text-black font-bold mx-2 mt-2 ">
                    Car rental information
                  </Text>
                  <View className="flex-row py-2 mx-4 justify-between">
                    <View className="my-2 mx-4">
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
                    <View className="my-2 mx-4">
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
                  <View className=" mx-2">
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
                      <View className="ml-4 mt-1">
                        <Text className="text-[13px] text-black font-bold">
                          {item?.locationOrigin}
                        </Text>
                      </View>
                      {/* <TouchableOpacity onPress={() => setModalMap(true)}>
                        <View className="ml-4 mt-4 flex-row">
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
                      </TouchableOpacity> */}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {store && (
              <View className="bg-gray-200 mt-4">
                <View className="m-2">
                  <Text className="text-[18px] text-black font-bold">
                    Car owner
                  </Text>
                </View>
                <View className=" flex mx-3 my-2 rounded-3xl bg-white">
                  <TouchableOpacity>
                    <View className="flex flex-row">
                      <Image
                        className=" w-14 h-14 rounded-full my-4 ml-4 mr-2"
                        source={{ uri: store?.photos }}
                      />
                      <View className=" flex mt-4 justify-start">
                        <Text className="text-[16px] text-black font-bold mt-2">
                          {store?.storeName}
                        </Text>
                        <View className="flex flex-row gap-2 mt-0">
                          {/* <Text className="text-[#262626] font-[500] text-[13px] inline-block">
                            <Icon
                              type="font-awesome"
                              name="star"
                              color="#ffc634"
                              size={13}
                              className="w-[15px]"
                            />{" "}
                            {Rating(store)}
                          </Text> */}
                          <Text className="text-[#262626] font-[500] text-[13px] inline-block">
                            <Icon
                              type="font-awesome"
                              name="car"
                              color="#262626"
                              size={13}
                              className="w-[15px]"
                            />{" "}
                            {store?.rentalQuantity} trips
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View className=" flex mx-4 my-2 bg-blue-100 rounded-lg justify-center">
                    <View className="flex flex-row  items-center m-2">
                      <Svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          d="M8.65372 3.63C9.89372 3.29813 11.2114 3 12 3C12.7886 3 14.1063 3.29813 15.3463 3.63C16.6149 3.9675 17.8937 4.36687 18.6457 4.60875C18.9601 4.71096 19.2389 4.8984 19.4499 5.14954C19.661 5.40068 19.7958 5.70533 19.8389 6.0285C20.52 11.0651 18.9394 14.7979 17.0217 17.2672C16.2085 18.3236 15.2388 19.2538 14.1451 20.0269C13.767 20.2944 13.3663 20.5296 12.9474 20.73C12.6274 20.8785 12.2834 21 12 21C11.7166 21 11.3737 20.8785 11.0526 20.73C10.6337 20.5296 10.233 20.2944 9.85486 20.0269C8.76118 19.2538 7.79153 18.3236 6.97829 17.2672C5.06058 14.7979 3.48001 11.0651 4.16115 6.0285C4.20422 5.70533 4.33903 5.40068 4.55008 5.14954C4.76114 4.8984 5.03988 4.71096 5.35429 4.60875C6.44594 4.25641 7.54607 3.93007 8.65372 3.63Z"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                        ></Path>
                        <Path
                          d="M11.3333 12.6668L9.5 10.8335"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                        <Path
                          d="M14.9997 9L11.333 12.6667"
                          stroke="#5FCF86"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                      </Svg>
                      <View className="ml-2 mr-10 my-3">
                        <Text className="text-[13px] text-black font-regular">
                          Chủ xe 5* có thời gian phản hồi nhanh chóng, tỉ lệ
                          đồng ý cao, mức giá cạnh tranh & dịch vụ nhận được
                          nhiều đánh giá tốt từ khách hàng.
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex flex-row m-2 justify-center space-x-7">
                    <View className="mx-2 items-center mb-4">
                      <Text className="text-[13px] text-gray-500 font-regular mt-2">
                        Tỉ lệ phản hồi
                      </Text>
                      <Text className="text-[16px] text-black font-bold mt-2">
                        100%
                      </Text>
                    </View>
                    <View className="mx-2 items-center mb-4">
                      <Text className="text-[13px] text-gray-500 font-regular mt-2">
                        Tỉ lệ đồng ý
                      </Text>
                      <Text className="text-[16px] text-black font-bold mt-2">
                        100%
                      </Text>
                    </View>
                    <View className="mr-2 items-center mb-4">
                      <Text className="text-[13px] text-gray-500 font-regular mt-2">
                        Phản hồi trong vòng
                      </Text>
                      <Text className="text-[16px] text-black font-bold mt-2">
                        5 phút
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            <View className="bg-gray-200 ">
              <View className="m-2">
                <Text className="text-[18px] text-black font-bold">
                  Price details
                </Text>
              </View>
              <View className=" flex mt-2 mb-4 mx-3 rounded-3xl bg-white">
                <View className="flex flex-row m-2">
                  <View className="mx-2 items-center">
                    <Text className="text-[18px] text-black font-bold mt-2">
                      Rental Price
                    </Text>
                  </View>
                  <View className="mx-2 items-center ml-auto">
                    <Text className="text-[18px] text-gray-500 font-regular mt-2">
                      {formatPrice(item?.priceRental)}
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
                      {formatPrice(item?.priceService)}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row mx-2 mb-4 ">
                  <View className="mx-2 items-center">
                    <Text className="text-[18px] text-black font-bold mt-2">
                      Delivery Price
                    </Text>
                  </View>
                  <View className="mx-2 items-center ml-auto">
                    <Text className="text-[18px] text-gray-500 font-regular mt-2">
                      {formatPrice(item?.priceDelivery)}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row mx-4 border-b-[1px] border-[#ddd] "></View>
                {/* <View className="flex flex-row m-2">
                  <View className="mx-2 items-center">
                    <Text className="text-[18px] text-black font-bold">
                      Subtotal
                    </Text>
                  </View>
                  <View className="mx-2 items-center ml-auto">
                    <Text className="text-[18px] text-[#5fcf86] font-bold">
                      {formatPrice(item?.priceTotal)}
                    </Text>
                  </View>
                </View> */}
                <View className="flex flex-row mx-4 border-b-[1px] border-[#ddd] "></View>
                <View className="flex flex-row m-2">
                  <View className="mx-2 items-center">
                    <Text className="text-[18px] text-black font-bold">
                      Total
                    </Text>
                  </View>
                  <View className="mx-2 items-center ml-auto">
                    <Text className="text-[18px] text-[#5fcf86] font-bold">
                      {formatPrice(item?.priceTotal)}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row mx-4  mb-4 "></View>
              </View>
            </View>
            <View className="flex mx-2 mt-2">
              <View className="my-2">
                <Text className="text-[18px] text-black font-bold">
                  Car rental documents {"  "}
                  <Icon
                    type="font-awesome"
                    name="question-circle-o"
                    color="#000000"
                    size={16}
                    className="w-[15px]"
                  />
                </Text>
              </View>
              <View className=" my-2">
                <Text className="text-[13px] text-blac font-bold">
                  Choose 1 of 2 ways:
                </Text>
              </View>
              <View className=" flex flex-row items-center">
                <Icon
                  type="font-awesome"
                  name="id-card-o"
                  color="#6b7280"
                  size={20}
                  className="w-[25px] my-2 mr-2"
                ></Icon>
                <Text className="text-gray-500 text-[16px] font-regular">
                  GPLX & CCCD (Doi chieu)
                </Text>
              </View>
              <View className=" flex flex-row items-center border-[#ddd] border-b-[1px]">
                <Icon
                  type="font-awesome"
                  name="id-card-o"
                  color="#6b7280"
                  size={20}
                  className="w-[25px] my-2 mr-2"
                ></Icon>
                <Text className="text-gray-500 text-[16px] font-regular">
                  GPLX (doi chieu) & Passport (Giu lai)
                </Text>
              </View>
            </View>
            <View className="flex mx-2">
              <View className="my-2">
                <Text className="text-[18px] text-black font-bold">
                  Collateral {"  "}
                  <Icon
                    type="font-awesome"
                    name="question-circle-o"
                    color="#000000"
                    size={16}
                    className="w-[15px]"
                  />
                </Text>
              </View>
              <View className=" my-2 border-[#ddd] border-b-[1px]">
                <Text className="text-[13px] text-gray-500 font-regular mb-4">
                  Does not require tenants to mortgage Cash or Motorcycle
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingDetail;
