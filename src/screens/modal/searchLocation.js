import { View, Text, StyleSheet, Button, Modal, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_MAPS_API_KEY5 } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "../../common/Calendarpicker/datePicker";
import { TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { BlurView } from "expo-blur";
import {
  selectDestination,
  setDestination,
} from "../../store/slices/destination";
import { SafeAreaView } from "react-native";
const SearchLocation = ({
  selectReturnTime = null,
  selectPickupTime = null,
  selectedEndDate = null,
  selectedStartDate = null,
  setSelectedEndDate = null,
  setSelectedStartDate = null,
  setSelectPickupTime = null,
  setSelectReturnTime = null,
  handleFilters = null,
  setShowModal = null,
  messageTime = null,
  setMessageTime = null,
}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const destination = useSelector(selectDestination);
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
  }, []);
  return (
    <SafeAreaView>
      <View className=" flex justify-center">
        <View className=" flex border-b-[1px] border-[#ddd] relative mt-[5px]">
          <Text className="text-center font-bold text-[18px] pb-[10px]">
            Search location
          </Text>
          {/* <View className="border-[1px] border-[#ddd] p-2 rounded-full absolute w-[35px] h-[35px] right-0 -top-[5px] px-2 mx-3">
          <TouchableOpacity onPress={() => setShowModal()}>
            <Icon type="font-awesome" name="close" color="#000" size={16} />
          </TouchableOpacity>
        </View> */}
        </View>
        <View className=" px-2 mt-3 mx-3 border-b-[1px] border-[#ddd]">
          <View className="flex items-end- flex-row w-full">
            <View className="mr-2 w-[30px]">
              <Icon
                type="font-awesome"
                name="map-marker"
                color="#000"
                size={35}
              />
            </View>
            <View className="w-full ">
              <Text className="font-[500] text-[16px] text-[#767676]">
                Search location
              </Text>
              <View className="-ml-2">
                <GooglePlacesAutocomplete
                  styles={toInputBoxStyles}
                  placeholder={
                    destination ? destination?.description : "Hồ Chí Minh"
                  }
                  nearbyPlacesAPI="GooglePlacesSearch"
                  returnKeyType={"search"}
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    dispatch(
                      setDestination({
                        location: details.geometry.location,
                        description: data.description,
                      })
                    );
                  }}
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
                ></GooglePlacesAutocomplete>
              </View>
            </View>
          </View>
        </View>
        <View className=" px-2 mt-3 mx-3">
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <View className="flex items-end- flex-row w-full">
              <View className="mr-2">
                <Icon
                  type="font-awesome"
                  name="calendar"
                  color="#000"
                  size={30}
                />
              </View>
              <View className="w-full ">
                <Text className="font-[500] text-[16px] text-[#767676]">
                  Pick up/ Return time
                </Text>
                <View className="py-2">
                  <Text className="font-[500] text-[16px] text-[#000]">
                    {selectPickupTime ? selectPickupTime : "21:00"},{" "}
                    {selectedStartDate} -{" "}
                    {selectReturnTime ? selectReturnTime : "21:00"},{" "}
                    {selectedEndDate ? selectedEndDate : selectedStartDate}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View className="px-2 mt-3 mx-3">
          {messageTime && (
            <Text className="text-center text-[#fa4f4f]">{messageTime}</Text>
          )}

          <TouchableOpacity
            className="w-fit px-4 py-3 rounded-xl mb-1 bg-[#1ecb15]"
            onPress={() => {
              handleFilters("submitLocation");
              if (messageTime === null) {
                // setMessageTime(null);
                setShowModal();
              }
            }}
          >
            <Text className="text-[#fff] font-bold text-center">Search</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <SafeAreaView className="bg-white">
            <View className=" flex  relative pt-[5px] bg-[#fff]">
              <Text className="text-center font-bold text-[18px] pb-[10px]">
                Pick up/ Return time
              </Text>
              <View className="border-[1px] border-[#ddd] p-2 rounded-full absolute w-[35px] h-[35px] left-0 px-2 mx-3">
                <TouchableOpacity onPress={() => setModalVisible(false)}>
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
              setModalVisible={setModalVisible}
            />
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default SearchLocation;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 0,
  },
});
