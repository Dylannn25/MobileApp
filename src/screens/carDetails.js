import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ScrollView,
  SafeAreaView,
  Share,
} from "react-native";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { Icon } from "react-native-elements";
import Svg, { Path } from "react-native-svg";
import {
  Rating,
  convertTimestampToFormat,
  formatPrice,
  handleDatetime,
} from "../utils";
import MapView, { Marker, Circle } from "react-native-maps";
import Swiper from "react-native-swiper";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { AirbnbRating } from "react-native-ratings";
import { format } from "date-fns";
import DatePicker from "../common/Calendarpicker/datePicker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, setDestination } from "../store/slices/destination";
import * as Location from "expo-location";
import { GOOGLE_MAPS_API_KEY5 } from "@env";
import AddressDeliver from "./modal/addressDeliver";
import { rentalService } from "../services/service";
import { useAppSelector } from "../store";
import { user } from "../store/slices/user";
import Booking from "./Booking";
import { setBooking } from "../store/slices/booking";
import SeatSvg from "../common/svg/seat";
import TransmissionSvg from "../common/svg/transmission";
import FuelSvg from "../common/svg/fuel";
import EnergySvg from "../common/svg/energy";
import Animated, {
  FadeInLeft,
  FadeInRight,
  SlideInDown,
  SlideInRight,
  interpolate,
  interpolateColor,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import * as Sharing from "expo-sharing";
import CarOwner from "./modal/carOwner";
const CarDetails = ({
  data,
  setModalVisible,
  handleClick = null,
  fav = null,
  checkFav = null,
  setFav = null,
}) => {
  const item = data;
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const dispatch = useDispatch();
  const destination = useSelector(selectDestination);
  const userLogin = useAppSelector(user);
  const [pickvalue, setPickvalue] = useState(0);
  let pick = [{ label: "Pick up by myself", pickvalue: 0 }];
  const [returnvalue, setReturnvalue] = useState(1);
  let retu = [{ label: "I want to deliver my car to my place", pickvalue: 1 }];
  const [modalDatePicker, setModalDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(
    format(new Date(), "dd/MM/yyyy")
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    // format(addDays(new Date(), 1), "dd/MM/yyyy")
    null
  );
  const [selectPickupTime, setSelectPickupTime] = useState(null);
  const [selectReturnTime, setSelectReturnTime] = useState(null);
  const [rentalDay, setRentalDay] = useState(1);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distanceKM, setDistanceKM] = useState(null);
  const [modalAddress, setModalAddress] = useState(false);
  const [newComment, setNewComment] = useState(null);
  const [carDetail, setCarDetail] = useState(null);
  const [page, setPage] = useState(1);
  const [checkAvailAbleComment, setCheckAvailAbleComment] = useState(null);
  const currentDate = new Date(); // Lấy ngày hiện tại
  const formattedDate = currentDate.toISOString();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalBooking, setModalBooking] = useState(false);
  const [closeModalBooking, setCloseModalBooking] = useState(false);
  const [changeAddress, setChangeAddress] = useState(false);
  const [listFav, setListFav] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useAnimatedRef();
  const handlePickPress = () => {
    setPickvalue(0);
    setReturnvalue(0);
    setChangeAddress(false);
  };
  const calculateDistance = () => {
    if (currentLocation && item?.location) {
      const destinationLocation = JSON.parse(item?.location);
      const { lat: lat1, lng: lon1 } = destination.location;
      const { lat: lat2, lon: lon2 } = destinationLocation;
      const R = 6371; // Bán kính Trái Đất trong km
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      setDistanceKM(distance.toFixed(2));
    }
  };
  useEffect(() => {
    calculateDistance();
  }, [destination]);
  const handleReturnPress = () => {
    if (destination) {
      setChangeAddress(true);
      calculateDistance();
      if (distanceKM) {
        setModalAddress(true);
      }
    }
    setPickvalue(1);
    setReturnvalue(1);
  };
  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY5}`
      );
      const data = await response.json();
      if (data && data.results && data.results.length > 0) {
        // setLocationAddress(data.results[0].formatted_address);
        dispatch(
          setDestination({
            location: {
              lat: latitude,
              lng: longitude,
            },
            description: data.results[0].formatted_address,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      alert("Error", "Failed to fetch address.");
    }
  };
  const getCommentOfCar = async () => {
    try {
      await rentalService.getCommentOfCar(item?._id, page, setNewComment);
    } catch (error) {
      console.error("Error getCommentOfCar:", error);
    }
  };
  const getCarDetail = async () => {
    try {
      await rentalService.getCarDetail(item?._id, setCarDetail);
    } catch (error) {
      console.error("Error getCarDetail:", error);
    }
  };
  const handleComment = async () => {
    try {
      if (comment === "") {
        alert("Please enter comment");
        return;
      }
      const data = {
        carId: item._id,
        storeId: item.store._id,
        carPhoto: item.photos[0],
        carName: item.name,
        userId: userLogin.id,
        user: userLogin,
        date: formattedDate,
        rating: rating,
        comment: comment,
        page: page,
      };
      await rentalService.createComment(data, setNewComment);
      alert("Comment successfully!");
    } catch (error) {
      alert("Comment fail!");
    }
  };
  const CheckAvailableComments = async () => {
    try {
      if (user.length > 0) {
        const data = {
          userId: userLogin.id,
          carId: item._id,
        };
        await rentalService.CheckAvailableComment(
          data,
          setCheckAvailAbleComment
        );
      }
    } catch (error) {
      console.error("Error CheckAvailableComments:", error);
    }
  };
  const loadMoreItems = () => {
    getCommentOfCar();
    setTimeout(() => {
      setNewComment((prevList) => ({
        ...prevList,
        listComment: [...newComment.listComment, ...prevList.listComment],
      }));
    }, 1000);
  };
  const handleBookNow = async () => {
    try {
      if (user.length === 0) {
        alert("You must login to booking");
        return;
      }
      if (
        !handleDatetime(
          selectedStartDate,
          selectedEndDate,
          selectPickupTime,
          selectReturnTime,
          item,
          alert
        )
      ) {
        alert("Booking Failed!");
        return;
      }
      var datetimeStart = moment(
        selectedStartDate + "T" + selectPickupTime,
        "DD/MM/YYYYTHH:mm"
      );
      var datetimeEnd = moment(
        selectedEndDate + "T" + selectReturnTime,
        "DD/MM/YYYYTHH:mm"
      );

      var diff = datetimeEnd.diff(datetimeStart, "days");
      var diffHours = datetimeEnd.diff(datetimeStart, "hours");
      var allDay = diff;
      if (diffHours - diff * 24 > 5) {
        allDay += 1;
      }

      const booking = {
        dataCar: item,
        car: {
          carId: item._id,
          carName: item.name,
          carOwner: item.storeId,
          carOwnerName: item.store.storeName,
          photoCar: item.photos[0],
          reviews: Rating(item),
          rating: item.rating,
          rentalQuantity: item.rentalQuantity,
          locationCar: item.location,
          locationBooking: destination,
        },
        userId: userLogin.id,
        user: userLogin,
        locationOrigin: JSON.parse(item.location).address,

        locationDest: changeAddress
          ? destination?.description
          : JSON.parse(item.location).address,
        dateStart: selectedStartDate,
        dateEnd: selectedEndDate,
        timeStart: selectPickupTime,
        timeEnd: selectReturnTime,
        priceTotal:
          (item.salePrice + item.salePrice * 0.1) * allDay +
          (distanceKM > item?.deliveryRadiusFree
            ? distanceKM * item.deliveryPrice
            : 0),
        priceRental: item.salePrice,
        priceService: item.salePrice * 0.1,
        priceDelivery:
          distanceKM > item?.deliveryRadiusFree
            ? distanceKM * item.deliveryPrice
            : 0,
        allDay: allDay,
        await: {
          type: true,
          time: formattedDate,
        },
      };
      if (!changeAddress) {
        dispatch(
          setDestination({
            location: {
              lat: JSON.parse(item.location).lat,
              lng: JSON.parse(item.location).lon,
            },
            description: JSON.parse(item.location).address,
          })
        );
      }
      dispatch(setBooking(booking));
      setModalBooking(true);
    } catch (err) {
      console.log("book now: " + err.message);
    }
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
    if (listFav) {
      const list = listFav.filter((fav) => {
        return fav?.carId?._id === item?._id && fav?.userId === userLogin.id;
      });
      if (setFav) {
        if (list.length > 0) {
          setFav(true);
        } else {
          setFav(false);
        }
      }
    }
  }, [checkFav, listFav]);
  useEffect(() => {
    getListFavCars();
  }, [checkFav]);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      fetchAddress(location.coords.latitude, location.coords.longitude);
    })();
    CheckAvailableComments();
    getCommentOfCar();
    getCarDetail();
  }, []);
  useEffect(() => {
    if (page > 1) {
      loadMoreItems();
    }
  }, [page]);
  useEffect(() => {
    if (
      selectedEndDate &&
      selectedStartDate &&
      selectReturnTime &&
      selectPickupTime
    ) {
      const datetimeStart = moment(
        `${selectedStartDate}T${selectPickupTime}`,
        "DD/MM/YYYYTHH:mm"
      );
      const datetimeEnd = moment(
        `${selectedEndDate}T${selectReturnTime}`,
        "DD/MM/YYYYTHH:mm"
      );

      const diff = datetimeEnd.diff(datetimeStart, "days");
      const diffHours = datetimeEnd.diff(datetimeStart, "hours");
      let allDay = diff;

      if (diffHours - diff * 24 > 5) {
        allDay += 1;
      }
      setRentalDay(allDay);
    }
  }, [selectedStartDate, selectedEndDate, selectReturnTime, selectPickupTime]);
  useEffect(() => {
    if (closeModalBooking) {
      setCloseModalBooking(false);
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate("HiddenScreen", { screen: "MyTrip" });
      }, 500);
    }
  }, [modalAddress, modalBooking, closeModalBooking]);
  useEffect(() => {
    // Check if map is ready
    if (isMapReady && mapRef.current) {
      // Perform actions that depend on map's dimensions, e.g., setting bounds
      const initialRegion = {
        latitude: JSON.parse(item?.location)?.lat,
        longitude: JSON.parse(item?.location)?.lon,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      };
      mapRef?.current?.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }
  }, [isMapReady]);
  const IMAGE_HEIGHT = 300;
  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [-IMAGE_HEIGHT / 2, 0, IMAGE_HEIGHT * 0, 75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });
  const headerAnimated = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollOffset.value,
        [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
        ["transparent", "transparent", "#fff"]
      ),

      borderBottomColor: interpolateColor(
        scrollOffset.value,
        [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
        ["transparent", "transparent", "#ddd"]
      ),
      borderBottomWidth: interpolate(
        scrollOffset.value,
        [0, IMAGE_HEIGHT],
        [1, 1]
      ),
    };
  });
  const titleAnimated = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMAGE_HEIGHT], [0, 1]),
    };
  });
  const shareCar = async()=>{
    try {
      await Share.share({
        title: item?.name,
        url: `https://tlcn-fe-tran-tien-thanhs-projects.vercel.app/car-single/${item?._id}`
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {data && (
        <>
          <Animated.View
            className="flex-row fixed z-[1000] bg-white h-[100px] "
            style={[headerAnimated]}
          >
            <>
              {handleClick && (
                <View className="bg-[#0d0d0d80] absolute top-12 right-2 p-3 rounded-full">
                  <TouchableOpacity
                    onPress={() => {
                      handleClick();
                    }}
                  >
                    <Icon
                      type="font-awesome"
                      name={fav ? "heart" : "heart-o"}
                      color={fav ? "#1ecb15" : "#ffffff"}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              )}
              <Animated.View
                className="absolute top-12 left-16 p-3 rounded-full w-[240px]"
                style={[titleAnimated]}
              >
                <Text
                  className="text-[18px] font-[800] text-[#000] w-fit"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item?.name}
                </Text>
              </Animated.View>
              <View className="bg-[#0d0d0d80] absolute top-12 right-16 p-3 rounded-full w-[45px] h-[45px]">
                <TouchableOpacity
                  onPress={() => {
                    shareCar();
                  }}
                >
                  <Icon
                    type="font-awesome"
                    name="share"
                    color="#ffffff"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View className="bg-[#0d0d0d80] absolute top-12 p-3 rounded-full left-2 w-[45px] h-[45px]">
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon
                    type="font-awesome"
                    name="close"
                    color="#ffffff"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </>
          </Animated.View>
          <Animated.ScrollView
            className="bg-white -mt-[100px]"
            ref={scrollRef}
            contentContainerStyle={{ paddingBottom: 120 }}
            scrollEventThrottle={16}
          >
            <View className="bg-white relative pb-[95px]">
              <View className="rounded-[6px] shadow-[0_3px_3px_9px_rgba(164,164,186,.2)]">
                <View>
                  <View className="flex relative">
                    <Swiper
                      className="flex h-[300px]"
                      showsButtons={false}
                      loop={false}
                      dotStyle={{ backgroundColor: "#ddd" }}
                      activeDotStyle={{ backgroundColor: "#fff" }}
                    >
                      {item?.photos?.map((photo, index) => (
                        <Animated.Image
                          key={index + photo}
                          className="w-[100%] h-[300px]"
                          contentFit="cover"
                          source={{ uri: photo }}
                          style={[imageAnimated]}
                        />
                      ))}
                    </Swiper>
                  </View>
                  <View className="relative p-2">
                    <View className="pt-2">
                      <View className="flex flex-row">
                        <TouchableOpacity className="flex flex-row items-center gap-1">
                          <Text
                            className="text-[18px] font-[800] text-[#000] w-fit"
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {item?.name}
                          </Text>
                          <Svg
                            width="24"
                            height="24"
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
                        </TouchableOpacity>
                      </View>
                      <View className="flex pb-2 mt-2">
                        <View className="flex flex-row gap-2">
                          <Text className="text-[#262626] font-[500] text-[14px] inline-block">
                            <Icon
                              type="font-awesome"
                              name="star"
                              color="#ffc634"
                              size={13}
                              className="w-[15px]"
                            />{" "}
                            {Rating(item)}
                          </Text>
                          <Text className="text-[#262626] font-[500] text-[14px] inline-block">
                            <Icon
                              type="font-awesome"
                              name="car"
                              color="#262626"
                              size={13}
                              className="w-[15px]"
                            />{" "}
                            {item?.rentalQuantity} trips
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View className="bg-[#f7fbff] border-[#ddd] rounded-2xl mx-2 flex-1">
                <Text className="text-[18px] text-black font-bold mx-4 mt-4 mb-4">
                  Vehicle rental period
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    // navigation.navigate("HiddenScreen", {
                    //   screen: "DatePicker",
                    // })
                    setModalDatePicker(true)
                  }
                >
                  <Animated.View
                    entering={FadeInLeft.delay(200)}
                    className="flex-row py-2 border-[1px] border-[#ddd] bg-white mx-4 mb-2 rounded-lg justify-between"
                  >
                    <View className="m-2">
                      <Text className="text-[14px] text-black font-regular">
                        Pick up
                      </Text>
                      <Text className="text-[16px] text-black font-bold mt-2">
                        {selectPickupTime ? selectPickupTime : "21:00"},{" "}
                        {selectedStartDate}
                      </Text>
                    </View>
                    <View className="m-2">
                      <Text className="text-[14px] text-black font-regular">
                        Return
                      </Text>
                      <Text className="text-[16px] text-black font-bold mt-2">
                        {selectReturnTime ? selectReturnTime : "21:00"},{" "}
                        {selectedEndDate ? selectedEndDate : selectedStartDate}
                      </Text>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
                {/* <View className="flex flex-row m-4 justify-start">
                  <View className="flex flex-row gap-2">
                    <Text className="text-[#FF2D2D] font-[500] text-[13px] inline-block">
                      <Icon
                        type="font-awesome"
                        name="exclamation-triangle"
                        color="#FF2D2D"
                        size={13}
                        className="w-[15px]"
                      />{" "}
                      The car was rented from 23/08 to 24/08
                    </Text>
                  </View>
                </View> */}
                <Text className="text-[18px] text-black font-bold mx-4 mb-4">
                  Pick up / Return location
                </Text>
                <RadioForm formHorizontal={false} animation={true}>
                  {/* To create radio buttons, loop through your array of options */}
                  {pick.map((obj, i) => (
                    <Animated.View
                      entering={FadeInRight.delay(600)}
                      className="flex-row py-2 border-[1px] border-[#ddd] mx-4 mb-4 rounded-lg bg-white"
                    >
                      <View className="mt-2">
                        <RadioButton labelHorizontal={true} key={i}>
                          {/* You can set RadioButtonLabel before RadioButtonInput */}
                          <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={pickvalue === obj.pickvalue}
                            onPress={handlePickPress}
                            borderWidth={1}
                            buttonInnerColor={"#5fcf86"}
                            buttonOuterColor={"#5fcf86"}
                            buttonSize={10}
                            buttonOuterSize={20}
                            buttonStyle={{}}
                            buttonWrapStyle={{ marginLeft: 10 }}
                          />
                          <RadioButtonLabel
                            obj={obj}
                            index={i}
                            labelHorizontal={true}
                            onPress={handlePickPress}
                            labelStyle={{ fontSize: 14, color: "#000" }}
                            labelWrapStyle={{}}
                          />
                        </RadioButton>
                        <View className="ml-10 pr-2">
                          <Text className="text-[14px] text-black font-bold ">
                            {item?.location !== ""
                              ? JSON.parse(item?.location)?.address
                              : ""}
                          </Text>
                        </View>
                      </View>
                      <View className="my-2  ml-auto mr-2">
                        <Text className="text-[14px] text-[#5fcf86] font-bold">
                          Free
                        </Text>
                      </View>
                    </Animated.View>
                  ))}

                  {retu.map((obj, i) => (
                    <Animated.View
                      entering={FadeInRight.delay(800)
                        .duration(1000)
                        .springify()}
                      className="flex-row py-2 border-[1px] border-[#ddd] mx-4 mb-4 rounded-lg bg-white"
                    >
                      <View className="mt-2">
                        <TouchableOpacity onPress={handleReturnPress}>
                          <RadioButton labelHorizontal={true} key={i}>
                            <RadioButtonInput
                              obj={obj}
                              index={i}
                              isSelected={
                                returnvalue === obj.pickvalue &&
                                obj.pickvalue === pickvalue
                              }
                              onPress={handleReturnPress}
                              borderWidth={1}
                              buttonInnerColor={"#5fcf86"}
                              buttonOuterColor={"#5fcf86"}
                              buttonSize={10}
                              buttonOuterSize={20}
                              buttonStyle={{}}
                              buttonWrapStyle={{ marginLeft: 10 }}
                            />
                            <RadioButtonLabel
                              obj={obj}
                              index={i}
                              labelHorizontal={true}
                              onPress={handleReturnPress}
                              labelStyle={{ fontSize: 14, color: "#000" }}
                              labelWrapStyle={{}}
                            />
                          </RadioButton>
                          <View className="flex-row">
                            <View className="ml-10 w-[81%]">
                              <Text className="text-[14px] text-black font-bold ">
                                {destination
                                  ? destination?.description
                                  : "Select address"}
                              </Text>
                            </View>
                            <View className="px-2">
                              <Icon
                                type="font-awesome"
                                name="chevron-right"
                                color="#000"
                                size={14}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View className="my-2  ml-auto mr-2">
                        {distanceKM ? (
                          <>
                            {item?.deliveryRadiusFree &&
                            distanceKM <= item?.deliveryRadiusFree ? (
                              <Text className="text-[14px] text-[#5fcf86] font-bold">
                                Free
                              </Text>
                            ) : distanceKM <= item?.deliveryRadius ? (
                              <>
                                <Text className="text-[14px] text-[#5fcf86] font-bold">
                                  {formatPrice(
                                    distanceKM * item?.deliveryPrice
                                  )}
                                </Text>
                              </>
                            ) : (
                              <Text className="text-[14px] text-[#f04949] font-bold">
                                {/* {formatPrice(distanceKM * item?.deliveryPrice)} */}
                                Over {item?.deliveryRadius}KM
                              </Text>
                            )}
                          </>
                        ) : (
                          <>
                            <Text className="text-[14px] text-[#5fcf86] font-bold">
                              Loading...
                            </Text>
                          </>
                        )}
                      </View>
                    </Animated.View>
                  ))}
                </RadioForm>
              </View>
              <View className="flex-row mx-2 mt-4 ">
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
                <View className="ml-2 my-3">
                  <Text className="text-[16px] text-[#5fcf86] font-bold">
                    MIC car rental insurance
                  </Text>
                </View>
              </View>
              <View className="mx-2">
                <Text className="text-[13px] text-black font-regular">
                  The trip is insured. Car renters compensate up to 2,000,000
                  VND in case of unexpected incidents.
                </Text>
              </View>
              <TouchableOpacity>
                <View className="mx-2 mb-4 flex flex-row border-b-[1px] border-[#ddd] mt-2">
                  
                </View>
              </TouchableOpacity>
              <View className=" mx-2 mb-2">
                <Text className="text-[18px] text-black font-bold">
                  Featured
                </Text>
              </View>
              <View className="m-2 flex flex-row justify-around border-b-[1px] border-[#ddd] space-x-8">
                {item?.specifications.flat().map((item, index) => (
                  <>
                    <View className="mx-2 items-center mb-2" key={item._id}>
                      {item.name == "Số ghế" && <SeatSvg />}
                      {item.name == "Tiêu thụ năng lượng" && <EnergySvg />}
                      {item.name == "Nhiên liệu" && <FuelSvg />}
                      {item.name == "Truyền động" && <TransmissionSvg />}
                      <Text className="text-[13px] text-black font-regular mt-2">
                        {item.name}
                      </Text>
                      <Text className="text-[13px] text-black font-bold">
                        {item.value}
                        {item.name == "Tiêu thụ năng lượng" && (
                          <Text className="text-[13px] text-black">
                            liters/100km
                          </Text>
                        )}
                      </Text>
                    </View>
                  </>
                ))}
              </View>
              <View className="flex mx-2">
                <View className="my-2">
                  <Text className="text-[18px] text-black font-bold">
                    Description
                  </Text>
                </View>
                <View className="">
                  <Text className="text-[13px] text-gray-500 font-regular">
                    {item?.sortDesc}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <View className="mx-2 mb-4 flex flex-row border-b-[1px] border-[#ddd] mt-2">
                
                </View>
              </TouchableOpacity>
              <View className="flex mx-2 border-b-[1px] border-[#ddd]">
                <View className="mb-2">
                  <Text className="text-[18px] text-black font-bold">
                    Specifications
                  </Text>
                </View>
                <View className="flex flex-row flex-wrap mx-3">
                  {item?.features.flat().map((item, index) => (
                    <>
                      <View className="gap-2 my-2 flex w-[50%] flex-row items-center h-[35px]">
                        {item?.logo ? (
                          <View>
                            <Image
                              className="w-[30px] h-[30px]"
                              source={{ uri: item.logo }}
                            />
                          </View>
                        ) : (
                          <Icon
                            type="font-awesome"
                            name="map-o"
                            color="#000000"
                            size={18}
                            className=""
                          />
                        )}
                        <Text className="text-gray-500 font-[400] text-[16px]">
                          {item.value}
                        </Text>
                      </View>
                    </>
                  ))}
                </View>
              </View>
              <View className="flex m-2">
                <View className="my-2">
                  <Text className="text-[16px] text-black font-bold">
                    Car location
                  </Text>
                </View>
                <View className="flex pb-2">
                  <Text className="text-[#767676] font-[500] text-[16px] inline-block">
                    <Icon
                      type="font-awesome"
                      name="map-marker"
                      color="#262626"
                      size={20}
                      className="w-[15px]"
                    />
                    {""}{" "}
                    {item?.location !== ""
                      ? JSON.parse(item?.location)?.address
                      : ""}
                  </Text>
                </View>
                <View className="h-[200px] rounded-[10px]">
                  <MapView
                    ref={mapRef}
                    // mapType="mutedStandard"
                    initialRegion={{
                      latitude: JSON.parse(item?.location)?.lat,
                      longitude: JSON.parse(item?.location)?.lon,
                      latitudeDelta: 0.009,
                      longitudeDelta: 0.009,
                    }}
                    onLayout={() => setIsMapReady(true)} // Set isMapReady to true when layout occurs
                    style={{ flex: 1 }} // Ensure the map takes up the entire space available
                    zoomEnabled={true}
                  >
                    {JSON.parse(item?.location) && (
                      <Marker
                        coordinate={{
                          latitude: JSON.parse(item?.location).lat,
                          longitude: JSON.parse(item?.location).lon,
                        }}
                        title="Vehicle location"
                        description={JSON.parse(item?.location).address}
                        identifier="origin"
                      />
                    )}
                  </MapView>
                </View>
              </View>
              {item?.store && (
                <View className="bg-gray-200">
                  <View className="m-4">
                    <Text className="text-[18px] text-black font-bold">
                      Car owner
                    </Text>
                  </View>
                  <View className=" flex m-2 rounded-3xl bg-white">
                    <TouchableOpacity onPress={() => setOpenModal(true)}>
                      <View className="flex flex-row">
                        <Image
                          className=" w-16 h-16 rounded-full my-4 ml-4 mr-2"
                          source={{ uri: item?.store?.photos }}
                        />
                        <View className=" flex mt-4 justify-start">
                          <Text className="text-[16px] text-black font-bold mt-2">
                            {item?.store?.storeName}
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
                                {Rating(item)}
                              </Text> */}
                            <Text className="text-[#262626] font-[500] text-[13px] inline-block">
                              <Icon
                                type="font-awesome"
                                name="car"
                                color="#262626"
                                size={13}
                                className="w-[15px]"
                              />{" "}
                              {item?.rentalQuantity} trips
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <Modal visible={openModal} animationType="slide">
                      <CarOwner
                        data={item?.store}
                        setOpenModal={setOpenModal}
                      />
                    </Modal>
                    {/* <View className=" flex mx-4 my-2 bg-blue-100 rounded-lg justify-center">
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
                    </View> */}
                  </View>
                </View>
              )}
              <View className="bg-white ">
                <Text className="text-[18px] text-black font-bold mx-4 mt-4 mb-4">
                  Review
                </Text>
                <View className="flex py-2 border-b-[1px] border-[#ddd]  mx-4 mb-2 rounded-lg">
                  <View className=" mr-auto">
                    <AirbnbRating
                      count={5}
                      defaultRating={rating}
                      size={18}
                      showRating={false}
                      onFinishRating={(value) => {
                        setRating(value);
                      }}
                    />
                  </View>
                  <View className="border-[1px] border-[#ddd] py-6 px-4 rounded-lg w-full my-2 ">
                    <TextInput
                      placeholder="Share your thought..."
                      placeholderTextColor={"gray"}
                      clearButtonMode="while-editing"
                      editable={!checkAvailAbleComment}
                      onChangeText={(text) => setComment(text)}
                    />
                    <TouchableOpacity
                      className={
                        !checkAvailAbleComment
                          ? "absolute right-0 mt-2 mr-2 bg-[#1ecb15] rounded-xl w-[50px] h-[50px] justify-center items-center"
                          : "absolute right-0 mt-2 mr-2 bg-[#ddd] rounded-xl w-[50px] h-[50px] justify-center items-center"
                      }
                      onPress={() => handleComment()}
                    >
                      <View>
                        <Icon
                          type="font-awesome"
                          name="arrow-right"
                          color="#fff"
                          size={20}
                          className="w-[15px]"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                {newComment?.listComment.length > 0 && (
                  <>
                    {newComment.listComment.map((item, index) => (
                      <View className="flex py-2 border-[1px] border-[#ddd]  mx-4 mb-2 rounded-lg justify-start">
                        <TouchableOpacity>
                          <View className="flex flex-row items-center justify-between p-2">
                            <View className="flex flex-row">
                              <Image
                                className=" w-16 h-16 rounded-full"
                                source={{
                                  uri: item.user.photos
                                    ? item.user.photos
                                    : "https://img.freepik.com/premium-vector/man-character-driving-his-eco-car_99413-107.jpg",
                                }}
                              />
                              <View className=" flex justify-start ml-2">
                                <Text className="text-[16px] text-black font-regular mt-2">
                                  {item.user?.fullName}
                                </Text>
                                <View className="flex flex-row gap-2 mt-0">
                                  <Text className="text-gray-500 font-[500] text-[13px] inline-block">
                                    {convertTimestampToFormat(item.date)}
                                  </Text>
                                </View>
                              </View>
                            </View>

                            <View className="flex ">
                              <View className="flex flex-row gap-2">
                                <Text className="text-[#262626] font-[500] text-[13px] inline-block">
                                  <Icon
                                    type="font-awesome"
                                    name="star"
                                    color="#ffc634"
                                    size={14}
                                    className="w-[15px]"
                                  />{" "}
                                  {item.rating}.0
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                        <View className="flex gap-2 mx-2 mb-2">
                          <Text className="text-gray-500 font-[500] text-[13px] inline-block">
                            {item.comment}
                          </Text>
                        </View>
                      </View>
                    ))}

                    {newComment.countComment >
                      newComment.listComment.length && (
                      <>
                        <View className="flex py-2 border-[2px] border-[#000]  mx-4 mb-2 rounded-lg justify-start">
                          <TouchableOpacity
                            onPress={() => {
                              setPage((prevPage) => prevPage + 1);
                            }}
                          >
                          
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </>
                )}

                <View className=" my-2 mx-2 border-[#ddd] border-b-[1px]"></View>
                <View className="flex mx-2">
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
                      GPLX & CCCD (Compared)
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
                      GPLX (Compared) & Passport (Kept)
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
                <View className="flex m-2">
                  <Text className="text-[18px] text-black font-bold">
                    Clause
                  </Text>
                </View>
                <View className=" m-2">
                  <Text className="text-[13px] text-gray-500 font-regular mb-2">
                  Pay immediately upon vehicle delivery
                  </Text>
                  <Text className="text-[13px] text-gray-500 font-regular mb-2">
                  Other rule:
                  </Text>
                  <Text className="text-[13px] text-gray-500 font-regular mb-2">
                  ◦ Use the vehicle for its intended purpose.
                  </Text>
                  <Text className="text-[13px] text-gray-500 font-regular mb-2">
                  ◦ Do not use the rental car for illegal or illegal purposes the law.
                  </Text>
                  <Text className="text-[13px] text-gray-500 font-regular mb-2">
                  ◦ Do not use a rented car to pledge or mortgage.
                  </Text>
                  <Text className="text-[13px] text-gray-500 font-regular mb-2">
                  ◦ Do not smoke, chew gum, or litter in the car.
                  </Text>
                </View>
                <TouchableOpacity>
                  <View className="mx-2 mb-4 flex flex-row border-b-[1px] border-[#ddd]">
                  
                  </View>
                </TouchableOpacity>
                <View className="flex mx-2">
                  <View className="my-2">
                    <Text className="text-[18px] text-black font-bold">
                      Costs that may be incurred
                    </Text>
                  </View>
                  <View className=" flex flex-row justify-between items-center mt-2">
                    <View>
                      <Text className="text-[16px] text-black font-bold">
                        Over limit fee
                      </Text>
                    </View>
                    <View className="ml-auto">
                      <Text className="text-[16px] text-black font-bold">
                        {item?.limitPrice}đ/1km
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row">
                    <View>
                      <Text className="text-[13px] text-gray-500 font-regular mt-2">
                        Surcharge is incurred if the travel route exceeds{" "}
                        {item?.limitKM}km when renting a car for 1 day.
                      </Text>
                    </View>
                  </View>
                  <View className=" flex flex-row items-center justify-between mt-2">
                    <View>
                      <Text className="text-[16px] text-black font-bold">
                        Over time fee
                      </Text>
                    </View>
                    <View className="ml-auto">
                      <Text className="text-[16px] text-black font-bold">
                        {item?.overTimePrice}đ/1h
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row">
                    <View>
                      <Text className="text-[13px] text-gray-500 font-regular mt-2">
                        Surcharge is incurred if the renter lately return the car. km when renting a car for 1 day. In case of delay more than 5 hours, there will be an additional fee of 1 day of car rental.
                      </Text>
                    </View>
                  </View>
                  <View className=" flex flex-row items-centerjustify-between  mt-2">
                    <View>
                      <Text className="text-[16px] text-black font-bold">
                        Cleaning fee
                      </Text>
                    </View>
                    <View className="ml-auto">
                      <Text className="text-[16px] text-black font-bold">
                        {item?.washingPrice}đ
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row">
                    <View>
                      <Text className="text-[13px] text-gray-500 font-regular mt-2">
                       Surcharge is incurred when the returned vehicle is not hygienic (lots of stains, sand, mud, mud,...)
                      </Text>
                    </View>
                  </View>
                  <View className=" flex flex-row items-center justify-between mt-2">
                    <View>
                      <Text className="text-[16px] text-black font-bold">
                      Deodorization fee
                      </Text>
                    </View>
                    <View className="ml-auto">
                      <Text className="text-[16px] text-black font-bold">
                        {item?.deodorisePrice}đ
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row">
                    <View>
                      <Text className="text-[13px] text-gray-500 font-regular mt-2">
                        Surcharge is incurred when the returned vehicle is stained with an unpleasant odor (smell of cigarettes, strong-smelling food,...)
                      </Text>
                    </View>
                  </View>
                  <View className=" flex mt-2">
                    <View>
                      <Text className="text-[16px] text-black font-bold">
                        Other surcharges
                      </Text>
                    </View>
                  </View>
                  <View className="flex mb-2">
                    <View>
                      <Text className="text-[13px] text-gray-500 font-regular mt-2">
                        Surcharges are incurred if the car is late, the car is
                        unhygienic or smelly.
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity>
                  <View className="mx-2 mb-4 flex flex-row border-b-[1px] border-[#ddd]">
                   
                  </View>
                </TouchableOpacity>
                <View className="flex mx-2">
                  <View className="my-2">
                    <Text className="text-[18px] text-black font-bold">
                      <Icon
                        type="font-awesome"
                        name="flag-o"
                        color="#000000"
                        size={20}
                        className="w-[25px]"
                      />{" "}
                      {"  "}Report this car
                    </Text>
                  </View>
                </View>
                {/* <View className="mt-2 border-b-[1px] border-[#ddd]"></View> */}
              </View>
            </View>
          </Animated.ScrollView>
          <Animated.View
            entering={SlideInDown.duration(1000)}
            className="flex px-2 py-4 absolute bg-white w-[100%] h-[100px] bottom-[100px] border-[#ddd] border-t-[1px]"
          >
            <View>
              {/* <Text className="text-[#767676] font-[800] text-[14px]">
                Daily rate from
              </Text> */}
              <View className="flex flex-row items-baseline">
                <Text className="text-[#c6c6c6]  text-[18px] line-through">
                  {formatPrice(item?.costPrice)}
                </Text>
                <Text className="text-[#1ecb15] font-[500] text-[18px]">
                  {" "}
                  {formatPrice(item?.salePrice)}
                </Text>
                <Text className="text-[#c6c6c6]  text-[14px]">/day</Text>
              </View>
              <View>
                <Text className="text-[#000000] text-[16px] font-[500]">
                  Total:{" "}
                  {formatPrice(
                    (item.salePrice + item.salePrice * 0.1) * rentalDay +
                      (distanceKM > item?.deliveryRadiusFree
                        ? distanceKM * item.deliveryPrice
                        : 0)
                  )}
                  (+10% price service)
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                // navigation.navigate("HiddenScreen", {
                //   screen: "Booking",
                //   params: { data: item },
                // })
                handleBookNow()
              }
            >
              <View className="absolute right-0 bottom-[10px]  bg-[#1ecb15] rounded-[3px]">
                <Text className="text-[#fff] pt-2 pb-2 pr-[15px] pl-[15px]">
                  Rent Now
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalDatePicker}
            onRequestClose={() => {
              setModalDatePicker(!modalDatePicker);
            }}
          >
            <SafeAreaView className="bg-white">
              <View className=" flex relative pt-[5px] bg-[#fff]">
                <Text className="text-center font-bold text-[18px] pb-[10px]">
                  Pick up / Return time
                </Text>
                <View className="border-[1px] border-[#ddd] p-2 rounded-full absolute w-[35px] h-[35px] left-0 px-2 mx-3">
                  <TouchableOpacity onPress={() => setModalDatePicker(false)}>
                    <Icon
                      type="font-awesome"
                      name="close"
                      color="#000"
                      size={16}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <DatePicker
                selectReturnTime={selectReturnTime}
                selectPickupTime={selectPickupTime}
                selectedEndDate={selectedEndDate}
                selectedStartDate={selectedStartDate}
                setSelectedEndDate={setSelectedEndDate}
                setSelectedStartDate={setSelectedStartDate}
                setSelectPickupTime={setSelectPickupTime}
                setSelectReturnTime={setSelectReturnTime}
                setModalVisible={setModalDatePicker}
                data={carDetail}
              />
            </SafeAreaView>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalAddress}
            onRequestClose={() => {
              setModalAddress(!modalAddress);
            }}
          >
            <AddressDeliver
              item={item}
              distanceKM={distanceKM}
              setModalAddress={setModalAddress}
              destination={destination}
            />
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalBooking}
            onRequestClose={() => {
              setModalBooking(!modalBooking);
            }}
          >
            <Booking
              setModalBooking={setModalBooking}
              setCloseModalBooking={setCloseModalBooking}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default CarDetails;
