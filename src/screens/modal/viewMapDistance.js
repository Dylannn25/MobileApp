import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY5 } from "@env";
import { useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
} from "../../store/slices/destination";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
const ViewMapDistance = ({ item, setModalMap, destination }) => {
  // const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const origin = JSON.parse(item?.location ? item.location : item.locationCar);
  // useEffect(()=>{
  //   if(!origin || !destination) return;
  //   mapRef?.current?.fitToSuppliedMarkers(['origin', 'destination'],
  //   {
  //     edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
  //   })
  // },[
  //   origin,
  //   destination
  // ])
  const [isMapReady, setIsMapReady] = useState(false);
  useEffect(() => {
    // Check if map is ready
    if (isMapReady && mapRef.current) {
      // Perform actions that depend on map's dimensions, e.g., setting bounds
      const initialRegion = {
        latitude: origin?.lat,
        longitude: origin?.lon,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      };
      mapRef?.current?.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });

      //   mapRef.current.fitToCoordinates(
      //     [
      //       {
      //         latitude: initialRegion.latitude,
      //         longitude: initialRegion.longitude,
      //       },
      //       {
      //         latitude: initialRegion.latitude + initialRegion.latitudeDelta,
      //         longitude: initialRegion.longitude + initialRegion.longitudeDelta,
      //       },
      //     ],
      //     {
      //       edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      //       animated: true,
      //     }
      //   );
    }
  }, [isMapReady]);
  return (
    <>
      <SafeAreaView className="bg-white h-full">
        <View className="flex h-[100%] w-[100%] relative">
          <View className=" flex relative pt-[5px] bg-[#fff]">
            <Text className="text-center font-bold text-[18px] pb-[10px]">
              Map
            </Text>
            <View className="border-[1px] border-[#ddd] p-2 rounded-full absolute w-[35px] h-[35px] left-0 top-[3px] px-2 mx-3">
              <TouchableOpacity
                onPress={() => {
                  setModalMap(false);
                }}
              >
                <Icon type="font-awesome" name="close" color="#000" size={16} />
              </TouchableOpacity>
            </View>
          </View>
          <MapView
            ref={mapRef}
            mapType="mutedStandard"
            initialRegion={{
              latitude: origin?.lat,
              longitude: origin?.lon,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            }}
            onLayout={() => setIsMapReady(true)} // Set isMapReady to true when layout occurs
            style={{ flex: 1 }} // Ensure the map takes up the entire space available
          >
            {origin && destination && (
              <MapViewDirections
                origin={origin.address}
                destination={destination.description}
                apikey={GOOGLE_MAPS_API_KEY5}
                strokeWidth={3}
                strokeColor="#1ecb15"
              />
            )}
            {origin && (
              <Marker
                coordinate={{
                  latitude: origin.lat,
                  longitude: origin.lon,
                }}
                title="Vehicle location"
                description={origin.address}
                identifier="origin"
              />
            )}
            {destination?.location && (
              <Marker
                coordinate={{
                  latitude: destination.location.lat,
                  longitude: destination.location.lng,
                }}
                title="Vehicle delivery point"
                description={destination.description}
                identifier="destination"
              />
            )}
          </MapView>
          <View className="bg-[#fff] ">
            <View className=" px-2 py-3 mx-3 border-b-[1px] border-[#ddd]">
              <View className="flex items-end- flex-row w-full ">
                <View className="mr-2">
                  <Icon
                    type="font-awesome"
                    name="map-marker"
                    color="#000"
                    size={30}
                  />
                </View>
                <View className="w-full ">
                  <Text className=" text-[16px] text-[#767676]">
                    Vehicle location
                  </Text>
                  <View className="pb-2 w-[92%]">
                    <Text className="font-[500] text-[16px] text-[#000]">
                      {origin?.address}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className=" px-2 py-3 mx-3 ">
              <View className="flex items-end- flex-row w-full">
                <View className="mr-2">
                  <Icon
                    type="font-awesome"
                    name="map-marker"
                    color="#000"
                    size={30}
                  />
                </View>
                <View className="w-full ">
                  <Text className=" text-[16px] text-[#767676]">
                    Vehicle delivery point
                  </Text>
                  <View className="pb-2 w-[92%]">
                    <Text className="font-[500] text-[16px] text-[#000]">
                      {destination.description}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ViewMapDistance;
