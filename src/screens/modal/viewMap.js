import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { GOOGLE_MAPS_API_KEY5 } from "@env";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { useSelector } from "react-redux";
import { selectDestination } from "../../store/slices/destination";
import { SafeAreaView } from "react-native";
import { Path, Svg } from "react-native-svg";
import Carousel from "react-native-snap-carousel";
import { Image } from "react-native";
import { Icon } from "react-native-elements";
import { Rating, formatPrice } from "../../utils";
import { Modal } from "react-native";
import CarDetails from "../carDetails";
import { rentalService } from "../../services/service";
import { user } from "../../store/slices/user";
import { useAppSelector } from "../../store";
const ViewMap = ({ setViewMap, data }) => {
  const mapRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const destination = useSelector(selectDestination);
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectCurrentItem, setSelectCurrentItem] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: destination?.location?.lat,
    longitude: destination?.location?.lng
  });
  const [modalVisible, setModalVisible] = useState(false);
  const userLogin = useAppSelector(user);
  const [checkFav, setCheckFav] = useState(false);
  const [fav, setFav] = useState(false);
  const handleClick = async () => {
    try {
      if (!userLogin?.fullName) {
        alert("You must login to add favorite car!");
        return;
      }
      var newFav = {
        userId: userLogin.id,
        carId: selectCurrentItem._id,
        storeId: selectCurrentItem.storeId,
        // car: item,
      };
      await rentalService.updateListFav(newFav, setCheckFav, checkFav);
    } catch (error) {
      console.log(error);
    }
  };
  
  const renderCluster = (cluster) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;
    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
      >
        <TouchableOpacity onPress={() => handleClusterPress(geometry, id)}>
          <View className="bg-white p-2 rounded-full border-[#1ecb15] border-[1px] flex-row items-center">
            <Svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M19.15 15.7199H19.6C20.51 15.7199 21.24 14.8599 21.24 13.8399V12.4499C21.24 11.7199 20.86 11.0399 20.27 10.7399L18.79 9.96995L17.47 7.59994C17.09 6.90994 16.42 6.49994 15.71 6.50994H10.12C9.47 6.50994 8.86 6.84995 8.47 7.42995L6.77 9.93994L3.96 10.7999C3.24 11.0199 2.75 11.7599 2.75 12.5999V13.8299C2.75 14.8499 3.48 15.7099 4.39 15.7099H4.63"
                stroke="#1ecb15"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></Path>
              <Path
                d="M8.87 15.7197H14.77"
                stroke="#1ecb15"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></Path>
              <Path
                d="M6.69 17.4598C7.83322 17.4598 8.76 16.5331 8.76 15.3898C8.76 14.2466 7.83322 13.3198 6.69 13.3198C5.54677 13.3198 4.62 14.2466 4.62 15.3898C4.62 16.5331 5.54677 17.4598 6.69 17.4598Z"
                stroke="#1ecb15"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></Path>
              <Path
                d="M17.08 17.4598C18.2232 17.4598 19.15 16.5331 19.15 15.3898C19.15 14.2466 18.2232 13.3198 17.08 13.3198C15.9368 13.3198 15.01 14.2466 15.01 15.3898C15.01 16.5331 15.9368 17.4598 17.08 17.4598Z"
                stroke="#1ecb15"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></Path>
            </Svg>
            <Text className="font-[500] ml-1">{points} Car</Text>
          </View>
        </TouchableOpacity>
      </Marker>
    );
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
            onPress={()=>{
                setSelectCurrentItem(item);
                setModalVisible(true)}
            }
        >

        <View className="flex-row">
          <Image
            borderRadius={8}
            width={130}
            height={130}
            source={{ uri: item.photos.length > 0 ? item.photos[0] : "" }}
          />
          <View className="flex ml-2 w-[190px]">
            <Text
              className="text-[18px] font-[500] h-[50px] "
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
            <View className="flex flex-row gap-2">
              <Text className="text-[#727272] font-[500] text-[13px] inline-block">
                <Icon
                  type="font-awesome"
                  name="star"
                  color="#ffc634"
                  size={13}
                  className="w-[15px]"
                />{" "}
                {Rating(item)}
              </Text>
              <Text className="text-[#727272] font-[500] text-[13px] inline-block">
                <Icon
                  type="font-awesome"
                  name="car"
                  color="#262626"
                  size={13}
                  className="w-[15px]"
                />{" "}
                {item?.rentalQuantity}
              </Text>
            </View>
            <Text
              className="text-[#767676] font-[500] text-[13px] inline-block "
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              <Icon
                type="font-awesome"
                name="map-marker"
                color="#262626"
                size={13}
                className="w-[15px]"
              />
              {item?.location !== "" ? JSON.parse(item?.location)?.address : ""}
            </Text>
            <View className="flex flex-row items-baseline mt-2">
              <Text className="text-[#262626] font-[500] text-[16px] text-right w-[100%]">
                {formatPrice(item?.salePrice)}/Daily
              </Text>
              {/* {item?.costPrice > item?.salePrice && (
                <Text className="text-[#c6c6c6] font-[800] text-[13px] line-through">
                  {formatPrice(item?.costPrice)}
                </Text>
              )} */}
            </View>
          </View>
        </View>
        </TouchableOpacity>
        {/* <Image style={styles.cardImage} source={item.image} /> */}
      </View>
    );
  };
  const handleClusterPress = (geometry, id) => {
    const threshold = 0.001;
    const dataClick = data?.filter(
      (item) =>
        Math.abs(geometry.coordinates[0] - JSON.parse(item.location).lon) <
          threshold &&
        Math.abs(geometry.coordinates[1] - JSON.parse(item.location).lat) <
          threshold
    );
    setSelectedItem(dataClick); // Cập nhật selectedItem
    setShowCarousel(true); // Hiển thị Carousel`
  };
  useEffect(() => {
    // Check if map is ready
    if (isMapReady && mapRef.current) {
      // Perform actions that depend on map's dimensions, e.g., setting bounds
      const initialRegion = {
        latitude: destination?.location?.lat,
        longitude: destination?.location?.lng,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      };
      mapRef?.current?.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }
  }, [isMapReady, destination]);
  const handlePressOutsideCarousel = () => {
    setShowCarousel(false); // Hide the Carousel
    setSelectedItem(null);
    setSelectedItemIndex(null);
  };
  return (
    <>
      {destination && (
        <>
          <View className="w-full h-[82%]">
            <MapView
              onTouchStart={handlePressOutsideCarousel}
              ref={mapRef}
            //   mapType="mutedStandard"
              initialRegion={{
                latitude: destination?.location?.lat,
                longitude: destination?.location?.lng,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
              }}
              onLayout={() => setIsMapReady(true)} // Set isMapReady to true when layout occurs
              style={{ flex: 1 }} // Ensure the map takes up the entire space available
              showsUserLocation
              showsMyLocationButton
              animationEnabled={false}
              clusterColor="#fff"
              clusterTextColor="#000"
              renderCluster={renderCluster}
            >
              {data?.map((item, index) => (
                <Marker
                  animateMarkerToCoordinate={initialRegion}
                  key={item._id}
                  onPress={() => {
                    setSelectedItem([item]);
                    setShowCarousel(true);
                    setSelectedItemIndex(index);
                  }}
                  coordinate={{
                    latitude: JSON.parse(item.location).lat,
                    longitude: JSON.parse(item.location).lon,
                  }}
                >
                  <View
                    className={
                      selectedItemIndex === index
                        ? "bg-[#1ecb15] p-2 rounded-full border-[#fff] border-[1px]"
                        : "bg-white p-2 rounded-full border-[#1ecb15] border-[1px]"
                    }
                  >
                    <Text
                      className={
                        selectedItemIndex === index
                          ? "text-white"
                          : "text-[#1ecb15]"
                      }
                    >
                      {item.salePrice / 1000}K
                    </Text>
                  </View>
                </Marker>
              ))}
            </MapView>
            {showCarousel && (
              <Carousel
                ref={(c) => {
                  this._carousel = c;
                }}
                data={selectedItem}
                containerCustomStyle={styles.carousel}
                renderItem={renderItem}
                sliderWidth={Dimensions.get("window").width}
                itemWidth={355}
                removeClippedSubviews={false}
                loop={true}
                onSnapToItem={(index) => {
                  const currentItem = selectedItem[index]; // Lấy giá trị của item hiện tại
                  setInitialRegion({
                    latitude: JSON.parse(currentItem.location).lat,
                    longitude: JSON.parse(currentItem.location).lon
                  });
                  setSelectCurrentItem(currentItem);
                  setSelectedItemIndex(index);
                }}
                // scrollInterpolator={(index, carousel)=>console.log(index, carousel)}
              />
            )}
          </View>
        </>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <CarDetails
            data={selectCurrentItem}
            setModalVisible={setModalVisible}
            handleClick={handleClick}
            checkFav={checkFav}
            fav={fav}
            setFav={setFav}
          />
        </View>
      </Modal>
    </>
  );
};

export default ViewMap;
const styles = StyleSheet.create({
  carousel: {
    position: "absolute",
    bottom: 0,
    marginBottom: 48,
  },
  cardContainer: {
    backgroundColor: "#fff",
    height: 150,
    width: 350,
    padding: 10,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  cardImage: {
    height: 120,
    width: 300,
    bottom: 0,
    position: "absolute",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardTitle: {
    color: "#000",
    fontSize: 22,
    alignSelf: "center",
  },
});
