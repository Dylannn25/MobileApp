import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import SvgUri from "react-native-svg";
import SVGEmptyCar from "../common/svg/emtyCar";
import { user } from "../store/slices/user";
import { useAppSelector } from "../store";
import { rentalService } from "../services/service";
import { FlatList } from "react-native";
import CarItem from "../common/carItem/carItem";
import Animated, { FadeInDown } from "react-native-reanimated";
const FavCar = () => {
  const userLogin = useAppSelector(user);
  const navigation = useNavigation();
  const [listFav, setListFav] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkFav, setCheckFav] = useState(false);
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
  return (
    <SafeAreaView className="bg-white">
      <View className="bg-white h-[100vh]">
        <View className="flex-row justify-center items-center mb-6">
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
              Favorite Cars
            </Text>
          </View>
        </View>
        {listFav && listFav?.length > 0 ? (
          <>
            <FlatList
              className="mb-[120px] mx-4"
              data={listFav}
              renderItem={({ item, index }) => (
                <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} key={item._id + "-" + index}>
                  <CarItem
                    item={item?.carId}
                    setCheckFav={setCheckFav}
                    checkFav={checkFav}
                    listFav={listFav}
                    photoStore={item?.storeId.photos}
                  />
                </Animated.View>
              )}
              keyExtractor={(item, index) => item._id}
              // onEndReached={() => {
              //   handleEndReached();
              // }}
              // onEndReachedThreshold={0.9} // Adjust the threshold as needed
              // ListFooterComponent={loading && loadingItem()}
              // initialNumToRender={11}
              // maxToRenderPerBatch={12}
            />
          </>
        ) : (
          <View className="flex justify-center items-center h-[90vh]">
            <Text className="text-[#1ecb15] font-bold text-[20px] text-center opacity-100">
              No favorite cars
            </Text>
            <SVGEmptyCar />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavCar;
