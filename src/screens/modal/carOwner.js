import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { rentalService } from "../../services/service";
import CarItem from "../../common/carItem/carItem";
import { useAppSelector } from "../../store";
import { user } from "../../store/slices/user";

const CarOwner = ({ data, setOpenModal }) => {
  const userLogin = useAppSelector(user);
  const [store, setStore] = useState(null);
  const [checkFav, setCheckFav] = useState(false);
  const [listFav, setListFav] = useState(null);
  const [loading, setLoading] = useState(false);
  const getStoreDetails = async () => {
    await rentalService.getStore(data._id, setStore);
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
    getStoreDetails();
  }, [data]);
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="bg-gray-100 h-full">
          <View className="mt-4">
            <View className="flex-row justify-center items-center">
              <View className=" absolute top-[0px] left-[20px] ">
                <Icon
                  type="font-awesome"
                  name="angle-left"
                  color="#000000"
                  size={28}
                  onPress={() => setOpenModal(false)}
                />
              </View>
              <View>
                <Text className="font-[400] text-[20px] text-black text-center">
                  Car Owner
                </Text>
              </View>
            </View>
          </View>
          {store && (
            <>
              <View className=" bg-white mt-8 mx-4 border-[1px] border-[#ddd] justify-center items-center rounded-xl">
                <View className=" my-4">
                  <Image
                    className=" w-28 h-28 rounded-full border-[#1ecb15] border-[2px]"
                    source={
                      store?.photos
                        ? { uri: store.photos }
                        : require("../../assets/images/avatar/user.webp")
                    }
                  />
                </View>
                <Text className="font-[700] text-[20px] text-black">
                  {store.storeName}
                </Text>
                <Text className="font-[500] text-[18px] text-gray-700 mt-2 mb-4">
                  {store.email}
                </Text>
              </View>
              <View className=" my-4 mx-4 flex-row space-x-2 justify-between">
                <View className=" bg-white mt-2 border-[1px] border-[#ddd] justify-center items-center rounded-xl w-[48%]">
                  <View className=" my-4 px-10">
                    <Icon
                      type="font-awesome"
                      name="car"
                      color="#1ecb15"
                      size={30}
                    />
                  </View>
                  <Text className="font-[700] text-[30px] text-gray-700 mb-2">
                    {store?.car?.length}
                  </Text>

                  <Text className=" text-[18px] text-gray-400 mb-2">
                    Total car
                  </Text>
                </View>
                <View className=" bg-white mt-2 border-[1px] border-[#ddd] justify-center items-center rounded-xl w-[48%]">
                  <View className=" my-4 px-10">
                    <Icon
                      type="font-awesome"
                      name="calendar"
                      color="#1ecb15"
                      size={30}
                    />
                  </View>
                  <Text className="font-[700] text-[30px] text-gray-700 mb-2">
                    {store?.car?.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue?.rentalQuantity,
                      0
                    )}
                  </Text>

                  <Text className=" text-[18px] text-gray-400 mb-2">
                    Total rental
                  </Text>
                </View>
                {/* <View className=" bg-white mt-2 border-[1px] border-[#ddd] justify-center items-center rounded-xl">
                  <View className=" my-4 px-10">
                    <Icon
                      type="font-awesome"
                      name="star"
                      color="#1ecb15"
                      size={30}
                    />
                  </View>
                  <Text className="font-[700] text-[30px] text-gray-700 mb-2">
                    5
                  </Text>
                  <Text className=" text-[18px] text-gray-400 mb-2">
                    Rating
                  </Text>
                </View> */}
              </View>
              <View className=" bg-white mx-4 my-2 border-[1px] border-[#ddd] rounded-xl">
                <Text className=" m-4 font-[700] text-[18px] text-gray-700">
                  Car list
                </Text>
                {/* <View className="border-[1px] border-[#ddd] p-4 rounded-lg m-2 mx-3 ">
                  <TextInput
                    placeholder="Search car"
                    placeholderTextColor={"gray"}
                    clearButtonMode="while-editing"
                  />
                  <TouchableOpacity className="absolute right-0 top-2.5 mr-2 justify-center items-center">
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
                </View>

                <Text> insert car item of car owner here</Text> */}
                <View>
                  {store?.car?.map((item, index) => (
                    <View key={index} className="mx-2">
                      <CarItem
                        item={item}
                        setCheckFav={setCheckFav}
                        checkFav={checkFav}
                        listFav={listFav}
                      />
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CarOwner;
