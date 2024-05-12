import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import Svg, { Path } from "react-native-svg";
import { Rating, formatPrice } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import CarDetail from "../../screens/carDetails";
import { Modal } from "react-native";
import { user } from "../../store/slices/user";
import { useAppSelector } from "../../store";
import { rentalService } from "../../services/service";
const CarItem = ({ item, setCheckFav, checkFav, listFav, photoStore=null }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const userLogin = useAppSelector(user);
  const [fav, setFav] = useState(false);
  const handleClick = async () => {
    try {
      if (!userLogin?.fullName) {
        alert("You must login to add favorite car!");
        return;
      }
      var newFav = {
        userId: userLogin.id,
        carId: item._id,
        storeId: item.storeId,
        // car: item,
      };
      await rentalService.updateListFav(newFav, setCheckFav, checkFav);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (listFav) {
      const list = listFav.filter((fav) => {
        return fav?.carId?._id === item?._id && fav?.userId === userLogin.id;
      });
      if (list.length > 0) {
        setFav(true);
      } else {
        setFav(false);
      }
    }
  }, [checkFav, listFav]);
  return (
    <View
      key={item._id}
      className="mb-[30px] p-2 rounded-[6px] border-[#ddd] border shadow-[0_3px_3px_9px_rgba(164,164,186,.2)]"
    >
      <TouchableOpacity
        onPress={() =>
          // navigation.navigate("HiddenScreen", {
          //   screen: "CarDetail",
          //   params: { data: item },
          // })
          setModalVisible(true)
        }
      >
        <View>
          <View className="flex relative pb-5">
            <Image
              className="w-[100%] h-[300px] rounded-[6px]"
              contentFit="cover"
              source={{ uri: item?.photos[0] }}
            />
            <View className="bg-[#0d0d0d80] absolute top-2 right-2 p-3 rounded-full">
              <TouchableOpacity onPress={() => handleClick()}>
                <Icon
                  type="font-awesome"
                  name={fav ? "heart" : "heart-o"}
                  color={fav ? "#1ecb15" : "#ffffff"}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <View className="absolute top-2 left-2 gap-[8px]">
              <View className="flex-row items-center bg-[#0d0d0d80] rounded-[100px] text-[#ffffff] w-32 p-2">
                <View>
                  <Text className="text-white text-[13px]">Mortgage free </Text>
                </View>
                <View className="ml-2">
                  <Svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/S"
                  >
                    <Path
                      d="M2.06654 3.41201L3.30916 4.68289C3.50222 4.88033 3.81878 4.88389 4.01622 4.69084C4.21367 4.49778 4.21723 4.18122 4.02417 3.98378L2.73171 2.66192C4.08658 1.32458 5.9467 0.5 7.99999 0.5C12.1421 0.5 15.5 3.8579 15.5 8.00004C15.5 10.0709 14.6612 11.9454 13.3035 13.3031L11.9871 11.9806C11.7923 11.7849 11.4757 11.7842 11.28 11.979C11.0843 12.1738 11.0836 12.4904 11.2784 12.6861L12.5495 13.9631C11.2875 14.9276 9.71111 15.5001 7.99999 15.5001C3.85785 15.5001 0.5 12.1422 0.5 8.00004C0.5 6.27151 1.08422 4.68039 2.06654 3.41201Z"
                      stroke="#5FCF86"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></Path>
                    <Path
                      d="M10.3364 5.92398H10.1909C10.0678 5.21142 9.48584 4.66675 8.78821 4.66675H5.12098C4.65092 4.66675 4.26666 5.07712 4.26666 5.57703C4.26666 5.6106 4.27412 5.64045 4.27785 5.67402C4.27412 5.68895 4.26666 5.70387 4.26666 5.72252V9.93815C4.26666 10.7067 4.89341 11.3334 5.65819 11.3334H10.3364C11.1012 11.3334 11.728 10.7067 11.728 9.93815V7.31551C11.728 6.547 11.1012 5.92398 10.3364 5.92398ZM10.1275 9.09876C9.87009 9.09876 9.65745 8.88984 9.65745 8.6287C9.65745 8.36755 9.87009 8.1549 10.1275 8.1549C10.3887 8.1549 10.6013 8.36755 10.6013 8.6287C10.6013 8.88984 10.3887 9.09876 10.1275 9.09876ZM5.12098 5.22635H8.78821C9.17992 5.22635 9.50822 5.52107 9.61641 5.92398H5.12098C4.95683 5.92398 4.82626 5.76729 4.82626 5.57703C4.82626 5.38303 4.95683 5.22635 5.12098 5.22635Z"
                      fill="#5FCF86"
                    ></Path>
                  </Svg>
                </View>
              </View>
              <View className="flex-row items-center bg-[#0d0d0d80] rounded-[100px] text-[#ffffff] w-36 p-2">
                <View>
                  <Text className="text-white text-[13px]">
                    Book a car quickly
                  </Text>
                </View>
                <View className="ml-2">
                  <Icon
                    type="font-awesome"
                    name="bolt"
                    color="#FFC634"
                    size={14}
                    className="w-[12px] h-[12px]"
                  />
                </View>
              </View>
            </View>
            <View className="absolute border-1 border-[#ffffff] w-[60px] h-[60px] bottom-[0px] left-[16px] rounded-full">
              <Image
                className="w-[100%] h-[58px] rounded-full"
                contentFit="cover"
                source={{ uri: photoStore? photoStore:item?.store?.photos }}
              />
              <View className="absolute bg-[#ffc634] w-[26px] h-[14px] flex items-center justify-center left-[50%] translate-x-[-13px] bottom-[0px] rounded-[100px]">
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="mdl-js"
                >
                  <Path
                    d="M11.333 14.666H4.666a.504.504 0 01-.5-.5c0-.273.227-.5.5-.5h6.667c.274 0 .5.227.5.5s-.226.5-.5.5zM13.567 3.68L10.9 5.585a.671.671 0 01-1.013-.307l-1.26-3.36a.664.664 0 00-1.247 0L6.113 5.273a.657.657 0 01-1.006.306L2.44 3.673c-.533-.374-1.24.153-1.02.773l2.773 7.767c.094.266.347.44.627.44h6.354a.67.67 0 00.626-.44l2.773-7.767c.227-.62-.48-1.147-1.006-.767zm-3.9 6.153H6.333a.504.504 0 01-.5-.5c0-.274.227-.5.5-.5h3.334c.273 0 .5.226.5.5 0 .273-.227.5-.5.5z"
                    fill="#fff"
                  />
                </Svg>
              </View>
            </View>
            <Text className="absolute bg-[#f26a2b] text-[#ffffff] font-[500] text-[13px] pt-2 pb-2 pr-3 pl-3 rounded-[100px] bottom-2 right-2">
              Discount{" "}
              {((1 - item?.salePrice / item?.costPrice) * 100).toFixed(0)}%
            </Text>
          </View>
          <View className="relative p-2">
            <View className="bg-[#fce0d3] rounded-[100px] pt-1 pb-1 w-[60%] flex">
              <Text className="text-[#262626] font-[500] text-[13px] rounded-[100px] text-center">
                Car delivery to your location
              </Text>
            </View>
            <View className="pt-2">
              <View className="flex flex-row">
                <TouchableOpacity className="flex flex-row items-center gap-1">
                  <Text
                    className="text-[16px] font-[800] text-[#000] w-fit"
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
              <View className="flex pb-2 border-b-[1px] border-[#ddd]">
                <Text className="text-[#767676] font-[500] text-[13px] inline-block">
                  <Icon
                    type="font-awesome"
                    name="map-marker"
                    color="#262626"
                    size={13}
                    className="w-[15px]"
                  />
                  {item?.location !== ""
                    ? JSON.parse(item?.location)?.address
                    : ""}
                </Text>
                <View className="flex flex-row gap-2">
                  <Text className="text-[#262626] font-[500] text-[13px] inline-block">
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
                    {item?.rentalQuantity}
                  </Text>
                </View>
              </View>
              <View className="flex pt-2">
                <Text className="text-[#767676] font-[800] text-[14px]">
                  Daily rate from
                </Text>
                <View className="flex flex-row items-baseline">
                  <Text className="text-[#262626] font-[800] text-[26px]">
                    {formatPrice(item?.salePrice)}
                  </Text>
                  <Text className="text-[#c6c6c6] font-[800] text-[16px] line-through">
                    {formatPrice(item?.costPrice)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    // navigation.navigate("HiddenScreen", {
                    //   screen: "CarDetail",
                    //   params: { data: item },
                    // })
                    setModalVisible(true)
                  }
                >
                  <View className="absolute right-0 bottom-0  bg-[#1ecb15] rounded-[3px]">
                    <Text className="text-[#fff] pt-2 pb-2 pr-[15px] pl-[15px]">
                      Rent Now
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <CarDetail
            data={item}
            setModalVisible={setModalVisible}
            handleClick={handleClick}
            fav={fav}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CarItem;
