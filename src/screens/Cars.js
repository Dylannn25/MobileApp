import "react-native-gesture-handler";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { FlatList } from "react-native";
import CarItem from "../common/carItem/carItem";
import { rentalService } from "../services/service";
import FilterItem from "../common/filterItem/filterItem";
import { CheckBox, Icon } from "react-native-elements";
import { Image } from "react-native";
import RangeSlider from "../common/rangeSlider/RangeSlider";
import RadioForm from "react-native-simple-radio-button";
import { dataSeat } from "../data/filterItemData";
import SearchLocation from "./modal/searchLocation";
import { format, addDays } from "date-fns";
import { selectDestination } from "../store/slices/destination";
import { useSelector } from "react-redux";
import { handleDatetime } from "../utils";
import { user } from "../store/slices/user";
import Animated, { FadeIn, FadeInDown, ZoomIn, ZoomOut } from "react-native-reanimated";
import { useAppSelector } from "../store";
import ViewMap from "./modal/viewMap";
import Carousel from "react-native-snap-carousel";
import MapSVG from "../common/svg/map";
import ListSVG from "../common/svg/list";
const Cars = () => {
  const navigation = useNavigation();
  const userLogin = useAppSelector(user);
  const bottomSheetModalRef = useRef(null);
  const carCompanyModalRef = useRef(null);
  const carTypeModalRef = useRef(null);
  const filterModalRef = useRef(null);
  const snapPoints = ["90%"];
  const snapPointss = ["40%"];
  const snapPointsLocation = ["48%", "75%"];
  const [listNewCar, setListNewCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(
    format(new Date(), "dd/MM/yyyy")
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    // format(addDays(new Date(), 1), "dd/MM/yyyy")
    null
  );
  const [selectPickupTime, setSelectPickupTime] = useState(null);
  const [selectReturnTime, setSelectReturnTime] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [seat, setSeat] = useState(10);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("car");
  const [listCate, setListCate] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [messageTime, setMessageTime] = useState(null);

  const MIN_KM = 0;
  const MAX_KM = 500;
  const [minKm, setMinKm] = useState(MIN_KM);
  const [maxKm, setMaxKm] = useState(MAX_KM);

  const MIN_PRICE = 350;
  const MAX_PRICE = 3000;
  const [minPrice, setMinPrice] = useState(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  const MIN_SEAT = 4;
  const MAX_SEAT = 10;
  const [minSeat, setMinSeat] = useState(MIN_SEAT);
  const [maxSeat, setMaxSeat] = useState(MAX_SEAT);

  const MIN_DIS = 0;
  const MAX_DIS = 30;
  const [minDis, setMinDis] = useState(MIN_DIS);
  const [maxDis, setMaxDis] = useState(MAX_DIS);

  const [isChecked, setIsChecked] = useState(false);
  const [tdvalue, setTdvalue] = useState(0);
  const [nlvalue, setNLvalue] = useState(0);
  const [selectedValuesSeat, setSelectedValuesSeat] = useState([]);
  const [viewMap, setViewMap] = useState(false);
  const [listDataOfMap, setListDataOfMap] = useState(false);
  const tds = [
    { label: "Tat ca", tdvalue: 0 },
    { label: "So san", tdvalue: 1 },
    { label: "So tu dong", tdvalue: 2 },
  ];
  const nls = [
    { label: "Tat ca", tdvalue: 0 },
    { label: "Xang", tdvalue: 1 },
    { label: "Dau", tdvalue: 2 },
    { label: "Dien", tdvalue: 3 },
  ];
  const [checkFav, setCheckFav] = useState(false);
  const [listFav, setListFav] = useState(null);
  const getAllCarHasLimitAPI = async (limit, setListNewCar, setLoading) => {
    await rentalService.getAllCarHasLimit(limit, setListNewCar, setLoading);
  };
  const getCarByFilter = async (data, setListNewCar, setLoading) => {
    await rentalService.getCarByFilter(data, setListNewCar, setLoading);
  };
  const getListAllCarsAppForMap = async (data) => {
    await rentalService.getListAllCarsAppForMap(
      data,
      setListDataOfMap,
      setLoading
    );
  };
  const getAllCategories = async (setListCate, setLoading) => {
    await rentalService.getAllCategories(setListCate, setLoading);
  };
  const getListFavCars = async () => {
    try {
      if (userLogin?.fullName) {
        const id = userLogin.id;
        const list = {
          userId: id,
        };
        await rentalService.getListFav(list, setListFav, setLoading);
      } else setListFav([]);
    } catch (err) {
      console.log("Get List Favorite Cars", err.message);
    }
  };

  useEffect(() => {
    getListFavCars();
  }, [checkFav]);
  useEffect(() => {
    handleFilters();
    getAllCategories(setListCate, setLoading);
  }, []);
  const reloadData =()=>{
    setSelectedValuesSeat([]);
    setSelectedValues([]);
    setMaxSeat(MAX_SEAT);
    setMinSeat(MIN_SEAT);
  }
  const handlePresentModal = () => {
    setShowModal(true);
    bottomSheetModalRef.current?.present();
  };
  const handleClosePresentModal = () => {
    setShowModal(false);
    bottomSheetModalRef.current?.dismiss();
  };
  const handlePresentCarCompanyModal = () => {
    setShowModal(true);
    carCompanyModalRef.current?.present();
  };
  const handlePresentCarTypeModal = () => {
    setShowModal(true);
    carTypeModalRef.current?.present();
  };
  const closeModalCarType = () => {
    setShowModal(false);
    carTypeModalRef.current?.dismiss(); // Dismiss the modal using its ref
  };
  const handlePresentFilterModal = () => {
    setShowModal(true);
    filterModalRef.current?.present();
  };
  const closeModalFilter = () => {
    setShowModal(false);
    filterModalRef.current?.dismiss(); // Dismiss the modal using its ref
  };
  const closeModalCarCompany = () => {
    // setShowModal(false);
    carCompanyModalRef.current?.dismiss(); // Dismiss the modal using its ref
  };
  const handleChange = (value) => {
    const isChecked = selectedValues.includes(value);
    if (!isChecked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((item) => item !== value));
    }
  };
  function toggleValue(id, value) {
    const index = selectedValuesSeat.findIndex((item) => item.id === id);
    if (index === -1) {
      // Nếu giá trị không tồn tại trong mảng, thêm nó vào mảng
      setSelectedValuesSeat([...selectedValuesSeat, { id, value }]);
    } else {
      // Nếu giá trị đã tồn tại trong mảng, loại bỏ nó khỏi mảng
      const updatedValues = [...selectedValuesSeat];
      updatedValues.splice(index, 1);
      setSelectedValuesSeat(updatedValues);
    }
  }
  const destination = useSelector(selectDestination);
  const handleFilters = async (submitLocation) => {
    let data = {
      location: selected,
      dateStart: selectedStartDate,
      dateEnd: selectedEndDate,
      timeStart: selectPickupTime,
      timeEnd: selectReturnTime,
      typeCar: type,
      priceMin: minPrice,
      priceMax: maxPrice,
      minSeat: minSeat,
      maxSeat: maxSeat,
      carCompany: selectedValues,
      pageCar: page,
    };
    if (submitLocation === "submitLocation") {
      setPage(1);
      if (
        !handleDatetime(
          selectedStartDate,
          selectedEndDate,
          selectPickupTime,
          selectReturnTime,
          null,
          setMessageTime
        )
      ) {
        return;
      }
      // if (selected == null) {
      //   NotificationManager.warning("Select address, please!", "Address", 2000);
      //   return;
      // }
      data = {
        ...data,
        location: {
          address: destination?.description,
          lat: destination?.location?.lat,
          lon: destination?.location?.lng,
          name: destination?.description,
        },
        pageCar: 1,
      };
    } else if (submitLocation === "filter") {
      setPage(1);
      data = {
        ...data,
        pageCar: 1,
      };
    }
    setMessageTime(null);
    setLoading(true);
    getCarByFilter(data, setListNewCar, setLoading);
    getListAllCarsAppForMap(data);
  };
  const submitFilterCarCompany = () => {
    closeModalCarCompany();
    handleFilters("filter");
  };
  const loadProducts = async () => {
    setLoadingMore(true);
    try {
      if (listNewCar?.count === listNewCar?.listCar?.length) {
        setLoadingMore(true);
        return;
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error loading cars:", error);
    } finally {
      setLoadingMore(false);
    }
  };
  function isSelected(id) {
    return selectedValuesSeat.some((item) => item.id === id);
  }
  const handleEndReached = () => {
    if (!loadingMore) {
      loadProducts();
    }
  };
  useEffect(() => {
    if (page > 1) {
      handleFilters();
    }
  }, [page]);
  useEffect(() => {
    if (selectedValuesSeat.length > 0) {
      const values = selectedValuesSeat.map((item) => item.value);
      setMinSeat(Math.min(...values));
      setMaxSeat(Math.max(...values));
    } else {
      setMinSeat(MIN_SEAT);
      setMaxSeat(MAX_SEAT);
    }
  }, [selectedValuesSeat]);
  useEffect(() => {
    handleFilters("filter");
  }, [minSeat, maxSeat, selectedValues]);
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView>
          {/* <View className={showModal && 'bg-gray-400 w-[100vw] h-[100vh]'}></View> */}
          <View className={" flex justify-center px-2 relative"}>
            <View>
              <TouchableOpacity
                onPress={() =>
                  // navigation.navigate("HiddenScreen", { screen: "FindCar" })
                  handlePresentModal()
                }
              >
                <View className="flex bg-[#ddd] mx-2 mt-1 px-8 py-2 rounded-[8px] flex-row items-center justify-between fixed">
                  <View className="flex items-center w-[90%]">
                    <Text
                      className="font-[800] text-[#111111] text-[18px]"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {destination
                        ? destination?.description
                        : "Select address"}
                    </Text>
                    <View>
                      <Text className="text-[#111111]">
                        {selectPickupTime ? selectPickupTime : "21:00"},{" "}
                        {selectedStartDate} -{" "}
                        {selectReturnTime ? selectReturnTime : "21:00"},{" "}
                        {selectedEndDate ? selectedEndDate : selectedStartDate}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View>
                      <Icon type="font-awesome" name="search" color="#111111" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View className="my-2 ">
              <FilterItem
                handlePresentCarCompanyModal={handlePresentCarCompanyModal}
                handlePresentCarTypeModal={handlePresentCarTypeModal}
                handlePresentFilterModal={handlePresentFilterModal}
                reloadData={reloadData}
              />
            </View>
            {!viewMap ? (
              <>
                {loading && (
                  <View className=" bg-black">
                    <Text className="text-[#1ecb15] font-bold text-[14px] text-center opacity-100">
                      Loading...
                    </Text>
                  </View>
                )}
                {listNewCar?.listCar.length > 0 ? (
                  <>
                    <FlatList
                      className="mb-[150px]"
                      refreshing
                      data={listNewCar?.listCar}
                      renderItem={({ item, index }) => (
                        <Animated.View entering={FadeIn.delay(200).duration(800).springify()}  key={item._id + "-" + item.name}>
                          <CarItem
                            item={item}
                            setCheckFav={setCheckFav}
                            checkFav={checkFav}
                            listFav={listFav}
                          />
                        </Animated.View>
                      )}
                      onEndReached={() => {
                        handleEndReached();
                      }}
                      onEndReachedThreshold={0.9} // Adjust the threshold as needed
                      // ListFooterComponent={loading && loadingItem()}
                      initialNumToRender={11}
                      maxToRenderPerBatch={12}
                      keyExtractor={(item) => item._id + " - " + item.name}
                    />
                  </>
                ) : (
                  <>
                    <View>
                      <View className=" h-[100vh] mx-auto w-[100vw] bg-white">
                        <Text className="text-center font-bold mt-[70px] text-[#1ecb15] text-[18px]">
                          Not found any cars
                        </Text>
                        <Image
                          className=" h-[400px] mx-auto mt-[10px] w-[400px]"
                          contentFit="cover"
                          source={{
                            uri: "https://img.freepik.com/premium-vector/taxi-services-online-taxi-ordering-illustration-cartoon-flat-style_198838-130.jpg",
                          }}
                        />
                      </View>
                    </View>
                  </>
                )}
              </>
            ) : (
              <>
                <Animated.View entering={ZoomIn.delay(200).duration(400).springify()} exiting={ZoomOut.delay(200).duration(400).springify()} className="bg-white h-[92vh]">
                  <ViewMap
                    setViewMap={setViewMap}
                    data={listDataOfMap?.listCar}
                  />
                </Animated.View>
              </>
            )}

            {/* <ScrollView>
              <View className="mb-[180px]">
                {listNewCar?.listCar?.map((item) => (
                  <>
                    <View key={item.id + "-" + item.fullName}>
                      <CarItem item={item} />
                    </View>
                  </>
                ))}
              </View>
            </ScrollView> */}

            {/* <StatusBar barStyle="dark-content" /> */}

            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPointsLocation}
              className="rounded-[8px]"
              onDismiss={() => setShowModal(false)}
            >
              <SearchLocation
                selectReturnTime={selectReturnTime}
                selectPickupTime={selectPickupTime}
                selectedEndDate={selectedEndDate}
                selectedStartDate={selectedStartDate}
                setSelectedEndDate={setSelectedEndDate}
                setSelectedStartDate={setSelectedStartDate}
                setSelectPickupTime={setSelectPickupTime}
                setSelectReturnTime={setSelectReturnTime}
                handleFilters={handleFilters}
                setShowModal={handleClosePresentModal}
                messageTime={messageTime}
                setMessageTime={setMessageTime}
              />
            </BottomSheetModal>
            <BottomSheetModal
              ref={carCompanyModalRef}
              index={0}
              snapPoints={snapPoints}
              className="rounded-[8px]"
              onDismiss={() => setShowModal(false)}
              backgroundStyle={{
                backgroundColor: "#fff",
              }}
            >
              {/* <View className="absolute top-[15px] left-[20px]">
                <TouchableOpacity onPress={() => closeModalCarCompany(false)}>
                  <Icon name="close" type="font-awesome" color="#000" />
                </TouchableOpacity>
              </View> */}
              <View className=" absolute right-[20px] top-[5px]">
                <TouchableOpacity
                  onPress={() => {
                    submitFilterCarCompany();
                  }}
                >
                  <View className="bg-green p-3 rounded-2xl bg-[#ddd] w-fit">
                    <Icon type="font-awesome" name="search" color={"#fff"} />
                  </View>
                </TouchableOpacity>
              </View>
              <View className=" flex justify-center mt-1 mb-2 items-center">
                <Text className="text-[20px] font-[800] py-2">Car Company</Text>
              </View>
              <View className=" flex justify-center mb-[160px]">
                <ScrollView>
                  {listCate?.map((item) => (
                    <>
                      <View className="flex-row items-center">
                        <CheckBox
                          checked={selectedValues.includes(item.name)}
                          onPress={() => handleChange(item.name)}
                          iconType="font-awesome"
                          checkedIcon="check"
                          checkedColor="#1ecb15"
                          size={32}
                        />
                        <Image
                          className="w-[50px] h-[50px] rounded-full mr-5"
                          source={{ uri: item.photo }}
                        />
                        <Text className="text-[#111] font-[700] text-[16px]">
                          {item.name}
                        </Text>
                      </View>
                    </>
                  ))}
                </ScrollView>
              </View>
            </BottomSheetModal>
            <BottomSheetModal
              ref={carTypeModalRef}
              index={0}
              snapPoints={snapPoints}
              className="rounded-[8px]"
              onDismiss={() => setShowModal(false)}
            >
              {/* <View className="absolute top-[15px] left-[20px]">
                <TouchableOpacity onPress={() => closeModalCarType(false)}>
                  <Icon name="close" type="font-awesome" color="#000" />
                </TouchableOpacity>
              </View> */}
              <View className=" flex justify-center mt-1 mb-2 items-center">
                <Text className="text-[20px] font-[800] py-2">Car Type</Text>
              </View>
              <View className=" flex justify-center px-2 ">
                <View className="flex flex-row flex-wrap justify-center space-x-4">
                  {dataSeat?.map((item, index) => (
                    <>
                      <TouchableOpacity
                        key={item.id - index}
                        className="w-[120px] m-[5px]"
                        onPress={() => toggleValue(item.id, item.value)}
                      >
                        <View
                          className={
                            isSelected(item.id)
                              ? "flex justify-center rounded-2xl border-[1px] border-[#1ecb15] bg-[#effaf3] py-[10px] px-[5px] items-center"
                              : "flex justify-center rounded-2xl border-[1px] border-[#ddd] py-[10px] px-[5px] items-center"
                          }
                        >
                          <View>
                            <Image className="w-20 h-20" source={item.photo} />
                          </View>
                          <View>
                            <Text className="text-black font-bold text-[16px] text-center -mt-3 mb-1">
                              {item.value} seats
                            </Text>
                            <Text className="text-black font-bold text-[16px] text-center mb-1">
                              ({item.name})
                            </Text>
                            {/* <Text className="text-gray font-regular text-[13px] text-center mb-2 mx-2">
                          (200+ vehicle)
                        </Text> */}
                          </View>
                        </View>
                      </TouchableOpacity>
                    </>
                  ))}
                </View>
              </View>
            </BottomSheetModal>
            <BottomSheetModal
              ref={filterModalRef}
              index={0}
              snapPoints={snapPointss}
              className="rounded-[8px]"
              onDismiss={() => setShowModal(false)}
            >
              <ScrollView>
                {/* <View className="absolute top-[15px] left-[20px]">
                  <TouchableOpacity onPress={() => closeModalCarCompany(false)}>
                    <Icon name="close" type="font-awesome" color="#000" />
                  </TouchableOpacity>
                </View> */}
                <View className="flex-row absolute right-[20px] ">
                  <View className="bg-green mt-1  w-fit">
                    {/* <TouchableOpacity>
                      <Text className="text-[20px] font-[400] text-[#ff1a1a] py-2">
                        Reset
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
                <View className=" flex justify-center mt-1 mb-2 items-center">
                  <Text className="text-[20px] font-[800] py-2">Filter</Text>
                </View>
                <View className=" justify-center items-center  mx-2">
                  <View className=" w-full bg-white">
                    <View className=" flex-1 justify-between">
                      <Text className="text-[16px] font-[600] text-black">
                        Price
                      </Text>
                      <View className="my-8">
                        <RangeSlider
                          sliderWidth={330}
                          min={MIN_PRICE}
                          max={MAX_PRICE}
                          step={50}
                          onValueChange={(range) => {
                            setMinPrice(range.min);
                            setMaxPrice(range.max);

                            handleFilters("filter");
                          }}
                        />
                      </View>
                      <View className="flex-row justify-end border-b-[1px] border-[#ddd]">
                        <View className="mb-4">
                          <Text className="text-black">{minPrice}k - </Text>
                        </View>
                        <View>
                          <Text className="text-black">{maxPrice}k</Text>
                        </View>
                      </View>
                    </View>
                    {/* <View className=" flex-1 justify-start mt-4">
                      <Text className="text-[16px] font-[600] text-black">
                        Truyen dong
                      </Text>
                      <View className="flex-row mt-4 border-b-[1px] border-[#ddd]">
                        <RadioForm
                          radio_props={tds}
                          initial={tdvalue}
                          onPress={(tdvalue) => setTdvalue(tdvalue)}
                          buttonColor="#5fcf86"
                          selectedButtonColor="#5fcf86"
                          buttonSize={12}
                          labelStyle={{ fontSize: 18 }}
                          className="mb-4"
                        />
                      </View>
                    </View> */}
                    {/* <View className=" flex-1 justify-start mt-4">
                      <Text className="text-[16px] font-[600] text-black">
                        Tieu chi
                      </Text>
                      <View className="flex-row mt-4 border-b-[1px] border-[#ddd] items-center">
                        <View className=" -ml-4 -mt-3">
                          <CheckBox
                            checked={isChecked}
                            onPress={() => setIsChecked(!isChecked)}
                            iconType="font-awesome"
                            checkedIcon="check"
                            checkedColor="#1ecb15"
                            size={28}
                          />
                        </View>
                        <View>
                          <Text className="text-black text-[18px] -ml-4 -mt-3">
                            Bao hiem xe
                          </Text>
                        </View>
                      </View>
                    </View> */}
                    {/* <View className=" flex-1 justify-between mt-4">
                      <Text className="text-[16px] font-[600] text-black">
                        Gioi han so KM
                      </Text>
                      <View className="my-8">
                        <RangeSlider
                          sliderWidth={330}
                          min={MIN_KM}
                          max={MAX_KM}
                          step={50}
                          onValueChange={(range) => {
                            setMinKm(range.min);
                            setMaxKm(range.max);
                          }}
                        />
                      </View>
                      <View className="flex-row border-b-[1px] border-[#ddd]">
                        <View className="mb-4 ml-2">
                          <View className="p-3 mt-1 border-[1px] border-[#EBECF2] rounded-md">
                            <Text className="text-black">
                              Tren {maxKm}km/ ngay
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View> */}
                    {/* <View className=" flex-1 justify-between mt-4">
                      <Text className="text-[16px] font-[600] text-black">
                        Phi vuot gioi
                      </Text>
                      <View className="my-8">
                        <RangeSlider
                          sliderWidth={330}
                          min={MIN_DIS}
                          max={MAX_DIS}
                          step={1}
                          onValueChange={(range) => {
                            setMinDis(range.min);
                            setMaxDis(range.max);
                          }}
                        />
                      </View>
                      <View className="flex-row border-b-[1px] border-[#ddd]">
                        <View className="mb-4 ml-2">
                          <View className="p-3 mt-1 border-[1px] border-[#EBECF2] rounded-md">
                            <Text className="text-black">{maxDis}k/ km</Text>
                          </View>
                        </View>
                      </View>
                    </View> */}
                    {/* <View className=" flex-1 justify-between mt-4">
                      <Text className="text-[16px] font-[600] text-black">
                        Khoang cach
                      </Text>
                      <View className="my-8">
                        <RangeSlider
                          sliderWidth={330}
                          min={MIN_DIS}
                          max={MAX_DIS}
                          step={1}
                          onValueChange={(range) => {
                            setMinDis(range.min);
                            setMaxDis(range.max);
                          }}
                        />
                      </View>
                      <View className="flex-row border-b-[1px] border-[#ddd]">
                        <View className="mb-4 ml-2">
                          <View className="p-3 mt-1 border-[1px] border-[#EBECF2] rounded-md">
                            <Text className="text-black">
                              {maxDis} km tro lai
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View> */}
                    {/* <View className=" flex-1 justify-start mt-4">
                      <Text className="text-[16px] font-[600] text-black">
                        Nhien lieu
                      </Text>
                      <View className="flex-row mt-4 border-b-[1px] border-[#ddd]">
                        <RadioForm
                          radio_props={nls}
                          initial={nlvalue}
                          onPress={(nlvalue) => setNLvalue(nlvalue)}
                          buttonColor="#5fcf86"
                          selectedButtonColor="#5fcf86"
                          buttonSize={12}
                          labelStyle={{ fontSize: 18 }}
                          className="mb-4"
                        />
                      </View>
                    </View> */}
                    {/* <View className=" flex-1 justify-between mt-4 mb-24">
                      <Text className="text-[16px] font-[600] text-black">
                        Muc tieu thu
                      </Text>
                      <View className="my-8">
                        <RangeSlider
                          sliderWidth={330}
                          min={MIN_DIS}
                          max={MAX_DIS}
                          step={1}
                          onValueChange={(range) => {
                            setMinDis(range.min);
                            setMaxDis(range.max);
                          }}
                        />
                      </View> */}
                  </View>
                </View>
              </ScrollView>
            </BottomSheetModal>
          </View>
          <TouchableOpacity
            onPress={() => {
              setViewMap(!viewMap);
            }}
            className="absolute bottom-[120px] flex justify-center w-full items-center"
          >
            <View className="my-2 mx-1 h-[40px] ">
              <View className="bg-white w-[140px] items-center h-[40px] justify-center rounded-full border-[#ddd] border-[1px]">
                <View className="flex justify-center flex-row w-[100%]">
                  <Text className="text-[18px] font-[500] pr-1">
                    View {!viewMap ? "map" : "list"}
                  </Text>
                  {!viewMap ? <MapSVG /> : <ListSVG />}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Cars;
