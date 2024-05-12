import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import Svg, { Path } from "react-native-svg";
import { Rating, formatPrice } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
// import { SafeAreaView } from "react-native-safe-area-context";
import { rentalService } from "../services/service";
import { user } from "../store/slices/user";
import { useAppSelector } from "../store";
import SVGEmptyCar from "../common/svg/emtyCar";
import FilterItemTypeTrip from "../common/filterItem/fiterTypeTrip";
import BookingDetail from "./bookingDetail";
import Animated, {FadeInDown} from "react-native-reanimated";
const MyTrip = () => {
  const navigation = useNavigation();
  const userLogin = useAppSelector(user);
  const [allBooking, setAllBooking] = useState(null);
  const [dataBooking, setDataBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [keySearch, setKeySearch] = useState("");
  const [page, setPage] = useState(1);
  const [bookingDetail, setBookingDetail] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [dataBookingDetail, setDataBookingDetail] = useState(null);
  function toggleValue(id, value) {
    const index = selectedValues.findIndex((item) => item.id === id);
    if (index === -1) {
      // Nếu giá trị không tồn tại trong mảng, thêm nó vào mảng
      setSelectedValues([...selectedValues, { id, value }]);
    } else {
      // Nếu giá trị đã tồn tại trong mảng, loại bỏ nó khỏi mảng
      const updatedValues = [...selectedValues];
      updatedValues.splice(index, 1);
      setSelectedValues(updatedValues);
    }
  }
  function isSelected(id) {
    return selectedValues.some((item) => item.id === id);
  }
  const handleFilterTrip = async (value) => {
    setKeySearch(value);
    const data = {
      userId: userLogin.id,
      key: value,
      page: page,
      limit: 11,
      status: selectedValues,
    };
    await rentalService.getPageBookingOfUser(data, setDataBooking);
    setLoading(false);
  };
  const loadProducts = async () => {
    setLoadingMore(true);
    try {
      if (dataBooking?.countAllBookings <= dataBooking?.allBookings?.length) {
        setLoadingMore(true);
        return;
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoadingMore(false);
    }
  };
  const handleEndReached = () => {
    if (!loadingMore) {
      loadProducts();
    }
  };
  useEffect(() => {
    if (allBooking === null) {
      // getBookingOfUser(userLogin.id, setAllBooking);
      handleFilterTrip("");
    } else {
      handleFilterTrip(keySearch);
    }
  }, [page, selectedValues]);
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
                navigation.navigate("HiddenScreen", { screen: "Profile" })
              }
            />
          </View>
          <View className="">
            <Text className="font-[400] text-[20px] text-black text-center">
              My Trips
            </Text>
          </View>
        </View>
        <View className="my-2 px-2">
          <FilterItemTypeTrip
            isSelected={isSelected}
            toggleValue={toggleValue}
          />
        </View>
        {dataBooking && dataBooking?.allBookings?.length > 0 ? (
          <>
            <FlatList
              className="mb-[2px]"
              data={dataBooking?.allBookings}
              renderItem={({ item, index }) => (
                <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} key={item._id + "-" + item?.codeBooking}>
                  <TouchableOpacity onPress={() => {
                    setDataBookingDetail(item)
                    setBookingDetail(true)
                    }}>
                    <View className=" mx-4 mt-4 rounded-lg shadow-inner border-[1px] border-[#ddd]">
                      <View className="flex-relative my-4 ml-2 flex-row overflow-hidden">
                        <View className="mr-2">
                          <Image
                            className="w-[130px] h-[90px] rounded-[10px]"
                            contentFit="cover"
                            source={{ uri: item?.car?.photoCar }}
                          />
                        </View>
                        <View className="">
                          <Text
                            className="text-[16px] font-[800] text-[#000] w-[240px]"
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {item?.car?.carName}
                          </Text>
                          <Text className="text-[#262626] font-[500] text-[13px] inline-block">
                            Booking Id: {item?.codeBooking}
                          </Text>
                          <View className="bg-green-100 rounded-3xl mt-2 w-[150px]">
                            <View className=" items-center p-2">
                              <Text className="text-[#262626] font-[500] text-[16px] inline-block">
                                {item?.status}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View className=" items-center justify-center">
                        <Text className="text-[#000] font-[500] text-[16px] inline-block">
                          <Icon
                            type="font-awesome"
                            name="map-marker"
                            color="#767676"
                            size={20}
                            className="w-[15px]"
                          />
                          {""} {item?.locationDest}
                        </Text>
                      </View>
                      <View className="flex-row mx-2 mt-2 justify-between">
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
                              Pick up
                            </Text>
                          </View>
                          <Text className="text-[13px] text-black font-bold mt-2">
                            {item?.timeStart}, {item?.dateStart}
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
                              Return
                            </Text>
                          </View>
                          <Text className="text-[13px] text-black font-bold mt-2">
                            {item?.timeEnd}, {item?.dateEnd}
                          </Text>
                        </View>
                        <View className="my-2">
                          <View className="flex-row">
                            <Text className="text-[14px] text-black font-regular">
                              Paid
                            </Text>
                          </View>
                          <Text className="text-[13px] text-black font-bold mt-2">
                            {formatPrice(item?.priceTotal)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              )}
              keyExtractor={(item, index) => item._id}
              onEndReached={() => {
                handleEndReached();
              }}
              onEndReachedThreshold={0.9} // Adjust the threshold as needed
              ListFooterComponent={loading && loadingItem()}
              initialNumToRender={11}
              maxToRenderPerBatch={12}
            />
          </>
        ) : (
          <View className="flex justify-center items-center h-[90vh]">
            <Text className="text-[#1ecb15] font-bold text-[20px] text-center opacity-100">
              No any trip
            </Text>
            <SVGEmptyCar />
          </View>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={bookingDetail}
        onRequestClose={() => {
          setBookingDetail(!bookingDetail);
        }}
      >
        <BookingDetail item={dataBookingDetail} setBookingDetail={setBookingDetail} />
      </Modal>
    </SafeAreaView>
  );
};

export default MyTrip;
