import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import { useAppSelector } from "../../store";
import { user } from "../../store/slices/user";
import { rentalService } from "../../services/service";
import { Rating } from "../../utils";
import { Modal } from "react-native";
import CarDetail from "../../screens/carDetails";
import { Alert } from "react-native";
import EditCar from "./editCar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import ReloadData from "../../common/svg/reloadData";
const ListCar = ({ selectStatus = null, setSelectStatus = null }) => {
  const userLogin = useAppSelector(user);
  const [keySearch, setKeySearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusCar, setStatusCar] = useState("");
  const [modelCar, setModelCar] = useState("");
  const [sortCarName, setSortCarName] = useState("");
  const [sortRentalQuantity, setSortRentalQuantity] = useState("");
  const [sortRentalPrice, setSortRentalPrice] = useState("");
  const [listCar, setListCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewCar, setViewCar] = useState(null);
  const [modalEditCar, setModalEditCar] = useState(false);
  const [carEdit, setCarEdit] = useState(null);
  const handleFilter = async () => {
    try {
      const listCar = {
        storeId: userLogin.store,
        page: page,
        limit: 12,
        key: keySearch,
        status: statusCar,
        model: modelCar,
        sortCarName: sortCarName,
        sortRentalQuantity: sortRentalQuantity,
        sortRentalPrice: sortRentalPrice,
        selectStore: null,
        admin: false,
      };
      setTimeout(async () => {
        await rentalService.getListCars(listCar, setListCar, setLoading);
      }, 1000);
    } catch (err) {
      console.log("search :", err.message);
    }
  };
  const handleSort = (setSort, sort) => {
    if (sort === "") {
      setSort(false);
    } else if (sort) {
      setSort(false);
    } else setSort(true);
  };
  const handleSearchCar = (value) => {
    try {
      setPage(1);
      setKeySearch(value);
    } catch (err) {
      alert("search :", err.message);
    }
  };
  const handleDeleteCars = async (item) => {
    try {
      const data = {
        carId: item._id,
        storeId: userLogin.store,
      };
      await rentalService.deleteCar(data);

      // handleFilter();
      const listCarNew = listCar.listCarFilter.filter(
        (car) => car._id !== item._id
      );
      setListCar({ ...listCar, listCarFilter: listCarNew });
      alert("Delete car successfully!");
      // setDeleteCars(false);
    } catch (error) {
      alert("Delete car failed!");
    }
  };
  const handleEndReached = () => {
    if (!loadingMore) {
      loadProducts();
    }
  };
  const loadProducts = async () => {
    setLoadingMore(true);
    try {
      if (listCar?.listCarCount <= listCar?.listCarFilter?.length) {
        setLoadingMore(true);
        return;
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      alert("Error loading car!");
    } finally {
      setLoadingMore(false);
    }
  };
  const showPopupConfirmDeleteCar = (value) => {
    Alert.alert("Delete", "Delete this car!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => handleDeleteCars(value) },
    ]);
  };
  const showPopupEditCar = (value) => {
    Alert.alert("Update", "Update this car!", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setCarEdit(value);
          setModalEditCar(true);
        },
      },
    ]);
  };
  useEffect(() => {
    if (!loadingMore) {
      handleFilter();
    }
  }, [
    page,
    keySearch,
    statusCar,
    modelCar,
    sortCarName,
    sortRentalQuantity,
    sortRentalPrice,
    modalEditCar,
  ]);
  const reloadDataS = () => {
    
    if (page !== 1 && keySearch !== "") {
      setListCar([]);
      setPage(1);
      setKeySearch("");
    } else {
      setListCar([]);
      handleFilter();
    }
  };
  return (
    <SafeAreaView>
      <View className="bg-white h-full">
        <Animated.View className="flex-row w-[100%] mx-3">
          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify()}
            className="border-[1px] border-[#ddd] p-4 rounded-lg  my-2  w-[80%]"
          >
            <TextInput
              placeholder="Search car"
              placeholderTextColor={"gray"}
              clearButtonMode="while-editing"
              onChangeText={handleSearchCar}
            />
            <TouchableOpacity className="absolute right-0 top-3 mr-2 justify-center items-center">
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
          <Animated.View className="border-[1px] border-[#ddd] rounded-lg my-2 w-[14%] ml-[1%] justify-center items-center">
            <TouchableOpacity
              className=" flex justify-center items-center "
              onPress={() => reloadDataS()}
            >
              <ReloadData />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        <FlatList
          data={listCar?.listCarFilter}
          refreshing={true}
          renderItem={({ item }) => (
            <>
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                className=" mx-3 mt-4 rounded-lg shadow-inner border-[1px] border-[#ddd]"
              >
                <View className="flex-relative mt-4 ml-4 flex-row ">
                  <View className="mr-2">
                    <Image
                      className="w-[150px] h-[100px] rounded-[10px]"
                      contentFit="cover"
                      source={{ uri: item.photos[0] }}
                    />
                  </View>
                  <View className=" justify-center space-y-2">
                    <TouchableOpacity
                      onPress={() => {
                        setViewCar(item);
                        setModalVisible(true);
                      }}
                    >
                      <Text
                        className="text-[16px] font-[800] text-[#000] w-[190px]"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>

                    <Text className="text-[#262626] font-[500] text-[13px] inline-block my-1">
                      <Icon
                        type="font-awesome"
                        name="star"
                        color="#ffc634"
                        size={13}
                        className="w-[15px]"
                      />{" "}
                      {Rating(item)}
                    </Text>
                    <Text className="text-[#262626] font-[500] text-[13px] inline-block">
                      <Icon
                        type="font-awesome"
                        name="car"
                        color="#262626"
                        size={13}
                        className="w-[15px]"
                      />{" "}
                      {item.rentalQuantity}
                    </Text>
                  </View>
                </View>

                <View className="flex-row mx-2 mt-2 justify-between">
                  <View className="my-2">
                    <View className="flex-row">
                      <Text className="text-[14px] text-black font-regular">
                        Price
                      </Text>
                    </View>
                    <Text className="text-[18px] text-black font-bold mt-2">
                      {item.salePrice / 1000}K
                    </Text>
                  </View>
                  <View className="my-2 mx-4">
                    <View className="flex-row">
                      <Text className="text-[14px] text-black font-regular">
                        Category
                      </Text>
                    </View>

                    <Text className="text-[18px] text-black font-bold mt-2">
                      {JSON.parse(item.model)?.name}
                    </Text>
                  </View>
                  <View className="my-2">
                    <Text className="text-[14px] text-black font-regular">
                      Action
                    </Text>
                    <View className="flex-row">
                      <TouchableOpacity onPress={() => showPopupEditCar(item)}>
                        <Icon
                          type="font-awesome"
                          name="pencil-square-o"
                          color="#1ecb15"
                          size={20}
                          className="w-[18px] mr-2 mt-2"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => showPopupConfirmDeleteCar(item)}
                      >
                        <Icon
                          type="font-awesome"
                          name="trash-o"
                          color="#ff4d49"
                          size={20}
                          className="w-[18px] mr-2 mt-2"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Animated.View>
            </>
          )}
          keyExtractor={(item) => item._id}
          onEndReachedThreshold={0.2}
          initialNumToRender={11}
          maxToRenderPerBatch={12}
          onEndReached={() => {
            handleEndReached();
          }}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <CarDetail data={viewCar} setModalVisible={setModalVisible} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditCar}
        onRequestClose={() => {
          setModalEditCar(!modalEditCar);
        }}
      >
        <View>
          <EditCar car={carEdit} setModalEditCar={setModalEditCar} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ListCar;
