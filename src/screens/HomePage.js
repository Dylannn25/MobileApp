import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Pressable,
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  StatusBar
} from "react-native";
import React, { useEffect, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { HomeStyles } from "../theme/home";
import { TouchableOpacity } from "react-native";
import { Marquee } from "@animatereactnative/marquee";
import MarqueeList from "../common/marquee";
import Carousel from "react-native-snap-carousel";
import CarItem from "../common/carItem/carItem";
import Footer from "../common/footer/footer";
import { rentalService } from "../services/service";
import axios from "axios";
import { useAppSelector } from "../store";
import {user} from "../store/slices/user";
import { useNavigation } from "@react-navigation/native";
import { selectDestination, setDestination } from "../store/slices/destination";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { GOOGLE_MAPS_API_KEY5 } from "@env";
const HomePage = () => {
  const navigation = useNavigation();
  const userLogin = useAppSelector(user);
  const [listNewCar, setListNewCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkFav, setCheckFav] = useState(false);
  const [listFav, setListFav] = useState(null);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState(null);
  const renderItem = ({ item, index }) => (
    <CarItem
      item={item}
      setCheckFav={setCheckFav}
      checkFav={checkFav}
      listFav={listFav}
    />
  );
  const getAllCarHasLimitAPI = async (limit, setListNewCar, setLoading) => {
    await rentalService.getAllCarHasLimit(limit, setListNewCar, setLoading);
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
  useEffect(() => {
    getListFavCars();
  }, [checkFav]);
  useEffect(() => {
    if (!destination) {
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
    }
    getAllCarHasLimitAPI(10, setListNewCar, setLoading);
  }, []);
  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="black-content" />
      <ScrollView>
        <View className="relative h-[auto]">
          <Image
            className="absolute h-full w-full"
            contentFit="cover"
            source={require("../assets/images/background/background.jpg")}
          />
          <View className="pt-20 h-[420px]">
            <View className="relative px-2 mx-3 h-[300px] w-[400px]">
              <Image
                className="absolute w-[100%] h-[340px] rounded-3xl"
                contentFit="cover"
                source={require("../assets/images/background/background2.jpg")}
              />
              <Image
                className="absolute h-[140px] w-[40%] rounded-3xl bottom-[-80] right-0"
                contentFit="cover"
                source={require("../assets/images/background/background1.jpg")}
              />
            </View>
          </View>

          <View className=" flex justify-center px-2 mx-3 ">
            <Text className="text-2xl font-bold text-white pb-10">
              We Are Rentaly
            </Text>
            <Text className="text-5xl font-bold text-white pb-10">
              We are the
              <Text className="text-5xl font-bold text-[#1ecb15]">
                {" "}
                largest{" "}
              </Text>
              leading commercial and luxury cars rental.
            </Text>
            <Text className="text-2xl text-white pb-10">
              Embark on unforgettable adventures and discover the world in
              unparalleled comfort and style with our fleet of exceptionally
              comfortable cars.
            </Text>
            <TouchableOpacity className="mb-10 bg-[#1ecb15] w-[145px] h-[40px] rounded-md items-center justify-center"
              onPress={() => {
                navigation.navigate("Car");
              }}
            >
              <Text className="text-white font-bold">Choose a car</Text>
              {/* <Pressable className=" ">
              </Pressable> */}
            </TouchableOpacity>
            <View className="pb-10">
              <View className="mb-10">
                <View className="p-10 bg-[#ffffff26]">
                  <Text className="text-[#1ecb15] text-3xl font-bold">10+</Text>
                  <Text className="text-white text-xl ">Cars available</Text>
                </View>
              </View>
              <View className="mb-10">
                <View className="p-10 bg-[#ffffff26]">
                  <Text className="text-[#1ecb15] text-3xl font-bold">1K</Text>
                  <Text className="text-white text-xl ">Happy customer</Text>
                </View>
              </View>
              <View className="mb-10">
                <View className="p-10 bg-[#ffffff26]">
                  <Text className="text-[#1ecb15] text-3xl font-bold">1</Text>
                  <Text className="text-white text-xl ">Year experiences</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="pt-10 pb-10 bg-[#111111]">
            <Marquee>
              <MarqueeList />
            </Marquee>
          </View>
        </View>
        <View className="pt-[90px] pb-[90px]">
          <View className="px-2 mx-3">
            <View className="flex w-[100%] mb-[36px]">
              <Text className="flex items-center text-center text-2xl font-bold text-[#111111]">
                Featured
              </Text>
              <Text className="flex items-center text-center text-[16px] text-[#636578]">
                Discover a world of convenience, safety, and customization,
                paving the way for unforgettable adventures and seamless
                mobility solutions.
              </Text>
            </View>
            <View>
              <View className="mb-[20px] relative">
                <View className="absolute">
                  <Icon
                    type="font-awesome"
                    name="trophy"
                    color="#ffffff"
                    size={24}
                    className="p-5 bg-[#1ecb15] rounded-xl w-[64px] h-[64px] "
                  />
                </View>
                <View className="ml-[84px]">
                  <Text className="text-[#111111] text-[18px] font-bold">
                    First class service
                  </Text>
                  <Text className="text-[16px] text-[#636578]">
                    Where luxury meets exceptional care, creating unforgettable
                    moments and exceeding your every expectation.
                  </Text>
                </View>
              </View>
              <View className="mb-[20px] relative">
                <View className="absolute">
                  <Icon
                    type="font-awesome"
                    name="road"
                    color="#ffffff"
                    size={24}
                    className="p-5 bg-[#1ecb15] rounded-xl w-[64px] h-[64px] "
                  />
                </View>
                <View className="ml-[84px]">
                  <Text className="text-[#111111] text-[18px] font-bold">
                    24/7 road assitance
                  </Text>
                  <Text className="text-[16px] text-[#636578]">
                    Reliable support when you need it most, keeping you on the
                    move with confidence and peace of mind.
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Image
                className="flex w-[100%] h-[182px] rounded-3xl"
                contentFit="contain"
                source={require("../assets/images/background/carFeature.png")}
              />
            </View>
            <View>
              <View className="mb-[20px] relative">
                <View className="mr-[84px] ">
                  <Text className="text-[#111111] text-[18px] font-bold text-right">
                    Quality at Minimum Expense
                  </Text>
                  <Text className="text-[16px] text-[#636578] text-right">
                    Unlocking affordable brilliance with elevating quality while
                    minimizing costs for maximum value.
                  </Text>
                </View>
                <View className="absolute right-0">
                  <Icon
                    type="font-awesome"
                    name="tag"
                    color="#ffffff"
                    size={24}
                    className="p-5 bg-[#1ecb15] rounded-xl w-[64px] h-[64px] "
                  />
                </View>
              </View>
              <View className="mb-[20px] relative">
                <View className="mr-[84px] ">
                  <Text className="text-[#111111] text-[18px] font-bold text-right">
                    Free Pick-Up
                  </Text>
                  <Text className="text-[16px] text-[#636578] text-right">
                    Enjoy free pickup and drop-off services, adding an extra
                    layer of ease to your car rental experience.
                  </Text>
                </View>
                <View className="absolute right-0">
                  <Icon
                    type="font-awesome"
                    name="map"
                    color="#ffffff"
                    size={24}
                    className="p-5 bg-[#1ecb15] rounded-xl w-[64px] h-[64px] "
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          <ImageBackground
            resizeMode="stretch"
            source={{
              uri: "https://tlcn-fe-tran-tien-thanhs-projects.vercel.app/static/media/2.1a66adac6e903adbea5d.jpg",
            }}
            className="w-[100%] h-[auto] flex"
          >
            <View className="flex px-2 mx-3 pt-[90px] pb-[90px]">
              <View>
                <Text className="text-[20px] font-bold text-white">
                  We offer customers a wide range of
                  <Text className="text-[#1ecb15] text-[20px] font-bold">
                    {" "}
                    commercial cars{" "}
                  </Text>
                  and
                  <Text className="text-[#1ecb15] text-[20px] font-bold">
                    {" "}
                    luxury cars{" "}
                  </Text>
                  for any occasion.
                </Text>
              </View>
              <View className="mt-[48px] mb-[48px]">
                <Text className="text-[16px]  text-white">
                  At our car rental agency, we believe that everyone deserves to
                  experience the pleasure of driving a reliable and comfortable
                  vehicle, regardless of their budget. We have curated a diverse
                  fleet of well-maintained cars, ranging from sleek sedans to
                  spacious SUVs, all at competitive prices. With our streamlined
                  rental process, you can quickly and conveniently reserve your
                  desired vehicle. Whether you need transportation for a
                  business trip, family vacation, or simply want to enjoy a
                  weekend getaway, we have flexible rental options to
                  accommodate your schedule.
                </Text>
              </View>
              <View>
                <View className="mb-10">
                  <View className="p-10 bg-[#ffffff26]">
                    <Text className="text-[#1ecb15] text-3xl font-bold text-center">
                      15425
                    </Text>
                    <Text className="text-white text-xl text-center">
                      Hours of Work
                    </Text>
                  </View>
                </View>
                <View className="mb-10">
                  <View className="p-10 bg-[#ffffff26]">
                    <Text className="text-[#1ecb15] text-3xl font-bold text-center">
                      8745
                    </Text>
                    <Text className="text-white text-xl text-center">
                      Clients Supported
                    </Text>
                  </View>
                </View>
                <View className="mb-10">
                  <View className="p-10 bg-[#ffffff26]">
                    <Text className="text-[#1ecb15] text-3xl font-bold text-center">
                      235
                    </Text>
                    <Text className="text-white text-xl text-center">
                      Awards Winning
                    </Text>
                  </View>
                </View>
                <View className="mb-10">
                  <View className="p-10 bg-[#ffffff26]">
                    <Text className="text-[#1ecb15] text-3xl font-bold text-center">
                      15
                    </Text>
                    <Text className="text-white text-xl text-center">
                      Years Experience
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View className="pt-[90px] pb-[90px]">
          <View className="px-2 mx-3">
            <View className="flex w-[100%] mb-[36px]">
              <Text className="flex items-center text-center text-2xl font-bold text-[#111111]">
                Our Vehicle Fleet
              </Text>
              <Text className="flex items-center text-center text-[16px] text-[#636578]">
                Driving your dreams to reality with an exquisite fleet of
                versatile vehicles for unforgettable journeys.
              </Text>
            </View>
            {listNewCar && (
              <View className="flex">
                <Carousel
                  layout="default"
                  data={listNewCar}
                  renderItem={renderItem}
                  sliderWidth={375}
                  itemWidth={375}
                />
              </View>
            )}
          </View>
        </View>
        <View>
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: "https://tlcn-fe-tran-tien-thanhs-projects.vercel.app/static/media/3.2e6c54ff463ea6b78f9d.jpg",
            }}
            className="w-[100%] h-[auto] flex"
          >
            <View className="flex px-2 mx-3 pt-[90px] pb-[90px]">
              <View>
                <Text className="text-[27px] text-[#fff] font-[500] pb-[20px]">
                  Let's Your Adventure Begin
                </Text>
              </View>

              <View className="mb-[20px] relative">
                <View className="absolute">
                  <Icon
                    type="font-awesome"
                    name="trophy"
                    color="#ffffff"
                    size={24}
                    className="p-5 bg-[#1ecb15] rounded-xl w-[64px] h-[64px] "
                  />
                </View>
                <View className="ml-[84px]">
                  <Text className="text-[20px] text-[#fff] font-[500]">
                    First class service
                  </Text>
                  <Text className="text-[16px] text-[#fff] mb-3">
                    Where luxury meets exceptional care, creating unforgettable
                    moments and exceeding your every expectation.
                  </Text>
                </View>
              </View>
              <View className="mb-[20px] relative">
                <View className="absolute">
                  <Icon
                    type="font-awesome"
                    name="road"
                    color="#ffffff"
                    size={24}
                    className="p-5 bg-[#1ecb15] rounded-xl w-[64px] h-[64px] "
                  />
                </View>
                <View className="ml-[84px]">
                  <Text className="text-[20px] text-[#fff] font-[500]">
                    24/7 road assitance
                  </Text>
                  <Text className="text-[16px] text-[#fff] mb-3">
                    Reliable support when you need it most, keeping you on the
                    move with confidence and peace of mind.
                  </Text>
                </View>
              </View>
              <View className="mb-[20px] relative">
                <View className="absolute">
                  <Icon
                    type="font-awesome"
                    name="map"
                    color="#ffffff"
                    size={24}
                    className="p-5 bg-[#1ecb15] rounded-xl w-[64px] h-[64px] "
                  />
                </View>
                <View className="ml-[84px]">
                  <Text className="text-[20px] text-[#fff] font-[500]">
                    Free Pick-Up
                  </Text>
                  <Text className="text-[16px] text-[#fff] mb-3">
                    Enjoy free pickup and drop-off services, adding an extra
                    layer of ease to your car rental experience.
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* <View className="pt-[90px] pb-[90px] bg-[#179510]">
          <View className="px-2 mx-3">
            <Text className="text-[20px] text-[#fff] font-[500] mb-3 text-center">
              Call us for further information. Rentaly customer care is here to
              help you anytime.
            </Text>
            <View>
              <View>
                <Icon
                  type="font-awesome"
                  name="phone"
                  color="#ffffff"
                  size={48}
                  className=""
                />
                <Text className="text-[16px] text-[#fff] mb-3 text-center">
                  CALL US NOW
                </Text>
                <Text className="text-[27px] text-[#fff] font-bold mb-3 text-center">
                  0388 004 519
                </Text>
              </View>
              <View className=" flex justify-center items-center">
                <Text className="text-[16px] text-[#fff] font-bold text-center py-4 px-[30px] w-[150px] bg-[#1ecb15] rounded-xl">Contact Us</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="pt-[90px] pb-[90px] bg-[#111]">
            <Footer/>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
