import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon, Input } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  selectDestination,
  setDestination,
} from "../../store/slices/destination";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_MAPS_API_KEY5 } from "@env";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
const SearchAddress = ({ setModalChangeAddress = null, setValue=null }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [listAddress, setListAddress] = useState(null);
  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);
  };
  useEffect(() => {
    fetchCurrentLocation();
  }, []);
  const fetchAddress = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_MAPS_API_KEY5}`
      );
      const data = await response.json();
      if (data && data.results && data.results.length > 0) {
        // setLocationAddress(data.results[0].formatted_address);
        if(setValue){
          setValue(data.results[0]);
        }
        else{
          dispatch(
            setDestination({
              location: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
              },
              description: data.results[0].formatted_address,
            })
          );

        }
        if(setModalChangeAddress){
          setModalChangeAddress(false);
        }
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      alert("Error", "Failed to fetch address.");
    }
  };
  const fetchDetails = async (item) => {
    const firstPrediction = item;
    // Lấy địa chỉ cụ thể từ thông tin gợi ý
    const placeId = firstPrediction.place_id;

    // Sử dụng Place Details API để lấy thông tin chi tiết về địa chỉ
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${GOOGLE_MAPS_API_KEY5}`;

    fetch(detailsUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((details) => {
        // Lấy vĩ độ và kinh độ từ thông tin chi tiết về địa chỉ
        const location = details.result.geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;
        if(setValue){
          setValue({
            formatted_address: item.description,
            geometry: {
              location: {
                lat: latitude,
                lng: longitude,
              },
            },
          });
        }
        else{
          dispatch(
            setDestination({
              location: {
                lat: latitude,
                lng: longitude,
              },
              description: item.description,
            })
          );

        }
        if(setModalChangeAddress){
          setModalChangeAddress(false);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const searchLocation = async (location) => {
    if(!location) return;
    const sessionToken = new Date().getTime();
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      location
    )}&types=geocode&language=en&components=country:VN&location=${
      currentLocation?.latitude
    },${
      currentLocation?.longitude
    }&sessiontoken=${sessionToken}&key=${GOOGLE_MAPS_API_KEY5}`;

    await fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const predictions = data.predictions;
        if (predictions && predictions.length > 0) {
          setListAddress(predictions);
        } else {
          console.log("No predictions found");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  return (
    <SafeAreaView className="bg-white h-[100vh] flex z-50">
      <View className=" flex justify-center">
        <View className=" flex relative mt-[5px]">
          <Text className="text-center font-bold text-[18px] py-[10px]">
            Address
          </Text>
          <View className="border-[1px] border-[#ddd] py-2 rounded-full absolute w-[40px] h-[40px] left-0 top-[10px] mx-3">
            <TouchableOpacity onPress={() => setModalChangeAddress(false)}>
              <Icon type="font-awesome" name="close" color="#000" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-5 z-50 flex">
          <View className="flex-row relative mx-3 border-[1px] border-[#ddd] rounded-lg bg-[#fff]">
            <View className="flex-row items-center justify-center">
              <View className="flex w-[10%] bg-white">
                <Icon
                  type="font-awesome"
                  name="map-marker"
                  color="#000"
                  size={25}
                />
              </View>
              {/* <GooglePlacesAutocomplete
                styles={toInputBoxStyles}
                placeholder={"Search address"}
                nearbyPlacesAPI="GooglePlacesSearch"
                returnKeyType={"search"}
                fetchDetails={true}
                onPress={(data, details = null) => {
                  console.log(data, details);
                  dispatch(
                    setDestination({
                      location: details.geometry.location,
                      description: data.description,
                    })
                  );
                }}
                renderDescription={(data) => data.description}
                debounce={400}
                enablePoweredByContainer={false}
                minLength={1}
                query={{
                  key: GOOGLE_MAPS_API_KEY5,
                  language: "en",
                  location: currentLocation
                    ? `${currentLocation.latitude},${currentLocation.longitude}`
                    : null,
                  radius: 10000,
                }}
              /> */}
              <View className="py-[20px] flex w-[90%]">
                <TextInput
                  // value={value}
                  onChangeText={searchLocation}
                  // onBlur={onBlur}
                  className="text-[16px] text-[#000]"
                  placeholder="Search address"
                  placeholderTextColor={"gray"}
                  clearButtonMode="while-editing"
                />
              </View>
            </View>
          </View>
        </View>
        <View className="mt-5 mx-3">
          {listAddress && listAddress.length > 0 ? (
            <>
              {
                <FlatList
                  data={listAddress}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="flex-row items-center justify-center py-2"
                      onPress={() => {
                        fetchDetails(item);
                      }}
                    >
                      <View className="flex w-[10%]">
                        <Icon
                          type="font-awesome"
                          name="map-marker"
                          color="#000"
                          size={25}
                        />
                      </View>
                      <View className="flex w-[90%]">
                        <Text className="text-[16px] ">{item.description}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.place_id}
                  showsVerticalScrollIndicator={false}
                />
              }
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => fetchAddress()}>
                <View className="flex-row items-center justify-center">
                  <View className="flex w-[10%]">
                    <Icon
                      type="font-awesome"
                      name="map-marker"
                      color="#000"
                      size={25}
                    />
                  </View>
                  <View className="flex w-[90%]">
                    <Text className="text-[16px] ">Location currently</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchAddress;
const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 0,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: "90%",
    height: "90%",
    color: "black",
  },
  //   listView: {
  //     position: "absolute",
  //     zIndex: 100000000000000000000000,
  //     top: 80,
  //     height: "100vh",
  //     width: "100vh",
  //   },
});
