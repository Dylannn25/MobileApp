import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
// import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import { useAppSelector } from "../../store";
import { user } from "../../store/slices/user";
import { rentalService } from "../../services/service";
import { formatPrice } from "../../utils";
import FilterItemTypeTrip from "../../common/filterItem/fiterTypeTrip";
import { TextInput } from "react-native";
import { Modal } from "react-native";
import BookingDetails from "./bookingDetails";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import ReloadData from "../../common/svg/reloadData";
const Booking = ({ selectStatus = null, setSelectStatus = null }) => {
  const statusOptions = [
    "Waiting",
    "Confirmed",
    "Canceled",
    "Delivered",
    "Paid",
  ];
  const userLogin = useAppSelector(user);
  const [dataBooking, setDataBooking] = useState(null);
  const [page, setPage] = useState(1);
  const [keySearch, setKeySearch] = useState("");
  const [sortBookingId, setSortBookingId] = useState("");
  const [sortCarName, setSortCarName] = useState("");
  const [sortPickUpLocation, setSortPickUpLocation] = useState("");
  const [sortPickUpDateTime, setSortPickUpDateTime] = useState("");
  const [sortReturnDateTime, setSortReturnDateTime] = useState("");
  const [sortStatus, setSortStatus] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [showModalBookingDetail, setShowModalBookingDetail] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [bookingDetail, setBookingDetail] = useState(false);
  const initSort = () => {
    setSortBookingId("");
    setSortCarName("");
    setSortPickUpLocation("");
    setSortPickUpDateTime("");
    setSortReturnDateTime("");
    setSortStatus("");
  };
  const handleFilter = async (value) => {
    try {
      let listCar = {
        storeId: userLogin.store,
        page: page,
        limit: 12,
        key: keySearch,
        sortBookingId: sortBookingId,
        sortCarName: sortCarName,
        sortPickUpLocation: sortPickUpLocation,
        sortPickUpDateTime: sortPickUpDateTime,
        sortReturnDateTime: sortReturnDateTime,
        sortStatus: sortStatus,
        selectStore: null,
        admin: false,
        status: selectedValues,
      };
      if (value) {
        listCar = {
          ...listCar,
          key: value,
        };
      }
      setTimeout(async () => {
        await rentalService.getListBookingOfSeller(listCar, setDataBooking);
      }, 1000);
    } catch (err) {
      console.log("search :", err.message);
    }
  };
  const handleSearchBooking = async (value) => {
    try {
      setKeySearch(value);
    } catch (err) {
      console.log("search :", err.message);
    }
  };
  const loadProducts = async () => {
    setLoadingMore(true);
    try {
      if (dataBooking?.countBooking <= dataBooking?.listFilterBooking?.length) {
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
  function isSelected(id) {
    return selectedValues.some((item) => item.id === id);
  }
  function toggleValue(id, value) {
    setPage(1);
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
  useEffect(() => {
    handleFilter();
  }, [
    page,
    keySearch,
    sortBookingId,
    sortCarName,
    sortPickUpLocation,
    sortPickUpDateTime,
    sortReturnDateTime,
    sortStatus,
    selectedValues,
  ]);
  const reloadDataS = ()=>{
    if(page!==1 && keySearch !== ""){
      setDataBooking([])
      setPage(1)
      setKeySearch('')
    }
    else{
      setDataBooking([])
      handleFilter()
    }
  }
  return (
    <SafeAreaView>
      <View className="bg-white h-full">
      <Animated.View className="flex-row w-[100%] mx-3">

        <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} className="border-[1px] border-[#ddd] p-4 rounded-lg  my-2 w-[80%]">
          <TextInput
            placeholder="Search everything..."
            placeholderTextColor={"gray"}
            clearButtonMode="while-editing"
            onChangeText={handleSearchBooking}
          />
          <TouchableOpacity className="absolute right-0 top-5 mr-2 justify-center items-center">
            <View>
              <Icon
                type="font-awesome"
                name="search"
                color="#000"
                size={20}
                className="w-[20px]"
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} className="border-[1px] border-[#ddd] rounded-lg my-2 w-[14%] ml-[1%] justify-center items-center">
          <TouchableOpacity className=" flex justify-center items-center " onPress={() => reloadDataS()}>
            <ReloadData />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
        <View className="my-2 px-2">
          <FilterItemTypeTrip
            isSelected={isSelected}
            toggleValue={toggleValue}
          />
        </View>
        <FlatList
          data={dataBooking?.listFilterBooking}
          refreshing={true}
          renderItem={({ item }) => (
            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className=" mx-3 mb-4 rounded-lg shadow-inner border-[1px] border-[#ddd]">
              <TouchableOpacity
                onPress={() => {
                  setBookingDetail(item);
                  setShowModalBookingDetail(true);
                }}
              >
                <View className="flex-relative my-4 ml-2 flex-row">
                  <View className="mr-2">
                    <Image
                      className="w-[130px] h-[90px] rounded-[10px]"
                      contentFit="cover"
                      source={{ uri: item?.car?.photoCar }}
                    />
                  </View>
                  <View className="">
                    <Text
                      className="text-[16px] font-[800] text-[#000] w-[220px]"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item?.car?.carName}
                    </Text>
                    <Text className="text-[#262626] font-[500] text-[13px] inline-block">
                      Booking Id: {item?.codeBooking}
                    </Text>
                    {/* <View className="bg-green-100 rounded-3xl mt-2">
                    <View className=" items-center p-2">
                      <SelectDropdown
                        data={statusOptions}
                        onSelect={(selectedItem, index) => {
                          setSelectStatus(selectedItem);
                        }}
                        defaultButtonText={
                          selectStatus ? selectStatus : "Waiting"
                        }
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem;
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
                          return item;
                        }}
                        buttonStyle={{
                          width: "20px",
                          height: "auto",
                          backgroundColor: "#dcfce7",
                        }}
                        buttonTextStyle={{
                          color: "#444",
                          fontSize: 16,
                          marginLeft: 7,
                          fontWeight: "600",
                        }}
                      />
                    </View>
                  </View> */}
                    <View className="bg-green-100 rounded-3xl mt-2 w-[150px]">
                      <View className=" items-center p-2">
                        <Text className="text-[#262626] font-[500] text-[16px] inline-block">
                          {item?.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
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
            </Animated.View>
          )}
          onEndReached={() => {
            handleEndReached();
          }}
          keyExtractor={(item) => item._id}
          onEndReachedThreshold={0.2}
          initialNumToRender={11}
          maxToRenderPerBatch={12}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModalBookingDetail}
        onRequestClose={() => {
          setShowModalBookingDetail(!showModalBookingDetail);
        }}
      >
        <View>
          <BookingDetails
            data={bookingDetail}
            setShowModalBookingDetail={setShowModalBookingDetail}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Booking;
