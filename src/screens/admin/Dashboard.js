import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import AdminChart from "../../common/chart/adminChart";
import UserChart from "../../common/chart/userChart";
import { ScrollView } from "react-native-gesture-handler";
import { rentalService } from "../../services/service";
import { useAppSelector } from "../../store";
import { user } from "../../store/slices/user";
import { calculateLateStatusTotals, listSeries, listYaxis } from "../../utils";
import Animated, { FadeInDown } from "react-native-reanimated";
const Dashboard = () => {
  const [dataBooking, setDataBooking] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [cancel, setCancel] = useState(null);
  const [returnCar, setReturnCar] = useState(null);
  const [series, setSeries] = useState(null);
  const [dataYaxis, setDataYaxis] = useState(null);
  const [dataOption, setDataOption] = useState(null);
  const [revenue, setRevenue] = useState("0");
  const [selectedYear, setSelectedYear] = useState("2023");
  const userLogin = useAppSelector(user);
  const getBookingOfSeller = async (data) => {
    await rentalService.getBookingOfSeller(
      userLogin.store,
      setDataBooking,
      data
    );
  };
  useEffect(() => {
    if (dataBooking === null) {
      const data = {
        key: "",
        year: "2023",
      };
      getBookingOfSeller(data);
    }
  }, []);
  useEffect(() => {
    if (dataBooking && dataBooking.length >= 0) {
      const { deliveryTotal, confirmTotal, cancelTotal, returnCarTotal } =
        calculateLateStatusTotals(dataBooking)[0];
      setDelivery(deliveryTotal);
      setConfirm(confirmTotal);
      setCancel(cancelTotal);
      setReturnCar(returnCarTotal);
      const dataSeries = listSeries(dataBooking);
      if (dataSeries) {
        setSeries(dataSeries);
        const yaxisList = listYaxis(dataSeries);
        if (yaxisList) {
          setDataYaxis(yaxisList);
        }
      }
      const totalRevenueForYear = dataBooking?.reduce((total, booking) => {
        if (booking.returnCar.status) {
          return total + booking.priceTotal;
        }
        return total;
      }, 0);
      setRevenue(totalRevenueForYear);
    }
  }, [dataBooking]);
  useEffect(() => {
    if (dataBooking && dataBooking?.length >= 0) {
      const data = {
        key: "",
        year: selectedYear,
      };
      getBookingOfSeller(data);
    }
  }, [selectedYear]);
  return (
    <ScrollView>
      <View className="bg-white h-[100vh]">
        <View className=" items-center">
          <AdminChart
            revenue={revenue}
            series={series}
            dataBooking={dataBooking}
            dataYaxis={dataYaxis}
            dataOption={dataOption}
            setDataOption={setDataOption}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </View>
        {/* <View className=" items-center">
          <UserChart />
        </View> */}
        <View className="mx-3 border-[1px] border-[#ddd] rounded-lg">
          <View className="m-2">
            <Text className="text-[18px] font-regular"> Booking overview</Text>
            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}ew className="flex-row my-4 border-b-[1px] border-[#ddd]">
              <View className="w-[200px]">
                <View className=" items-center flex-row ">
                  <Icon
                    type="font-awesome"
                    name="truck"
                    color="#39c0ed"
                    size={16}
                    className="w-[20px]"
                  />
                  <Text className="text-[#39c0ed] font-[500] text-[16px] inline-block ml-2">
                    Delivery
                  </Text>
                </View>
              </View>
              <View className="w-[105px]">
                <View>
                  <Text className="text-[#39c0ed] font-[500] text-[16px] inline-block">
                    {delivery} (Booking)
                  </Text>
                </View>
              </View>
              <View className="w-[50px]">
                <View>
                  <Text className="text-[#39c0ed] font-[500] text-[16px] inline-block ">
                    {((delivery / dataBooking?.length) * 100).toFixed(1) | 0}%
                  </Text>
                </View>
                <View className="mb-2" />
              </View>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="flex-row my-2 border-b-[1px] border-[#ddd]">
              <View className="w-[200px]">
                <View className=" items-center flex-row ">
                  <Icon
                    type="font-awesome"
                    name="undo"
                    color="#666cff"
                    size={16}
                    className="w-[20px]"
                  />
                  <Text className="text-[#666cff] font-[500] text-[16px] inline-block ml-2">
                    Return
                  </Text>
                </View>
              </View>
              <View className="w-[105px]">
                <View>
                  <Text className="text-[#666cff] font-[500] text-[16px] inline-block">
                    {returnCar} (Booking)
                  </Text>
                </View>
              </View>
              <View className="w-[50px]">
                <View>
                  <Text className="text-[#666cff] font-[500] text-[16px] inline-block ">
                    {((returnCar / dataBooking?.length) * 100).toFixed(1) | 0}%
                  </Text>
                </View>
                <View className="mb-2" />
              </View>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="flex-row my-4 border-b-[1px] border-[#ddd]">
              <View className="w-[200px]">
                <View className=" items-center flex-row ">
                  <Icon
                    type="font-awesome"
                    name="check-circle-o"
                    color="#00b74a"
                    size={16}
                    className="w-[20px]"
                  />
                  <Text className="text-[#00b74a] font-[500] text-[16px] inline-block ml-2">
                    Confirm
                  </Text>
                </View>
              </View>
              <View className="w-[105px]">
                <View>
                  <Text className="text-[#00b74a] font-[500] text-[16px] inline-block">
                    {confirm} (Booking)
                  </Text>
                </View>
              </View>
              <View className="w-[50px]">
                <View>
                  <Text className="text-[#00b74a] font-[500] text-[16px] inline-block ">
                    {((confirm / dataBooking?.length) * 100).toFixed(1) | 0}%
                  </Text>
                </View>
                <View className="mb-2" />
              </View>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="flex-row my-2 border-b-[1px] border-[#ddd]">
              <View className="w-[200px]">
                <View className=" items-center flex-row ">
                  <Icon
                    type="font-awesome"
                    name="clock-o"
                    color="#ffa900"
                    size={16}
                    className="w-[20px]"
                  />
                  <Text className="text-[#ffa900] font-[500] text-[16px] inline-block ml-2">
                    Waiting
                  </Text>
                </View>
              </View>
              <View className="w-[105px]">
                <View>
                  <Text className="text-[#ffa900] font-[500] text-[16px] inline-block">
                    {dataBooking?.length -
                      cancel -
                      confirm -
                      delivery -
                      returnCar}{" "}
                    (Booking)
                  </Text>
                </View>
              </View>
              <View className="w-[50px]">
                <View>
                  <Text className="text-[#ffa900] font-[500] text-[16px] inline-block ">
                    {(
                      ((dataBooking?.length -
                        cancel -
                        confirm -
                        delivery -
                        returnCar) /
                        dataBooking?.length) *
                      100
                    ).toFixed(1) | 0}
                    %
                  </Text>
                </View>
                <View className="mb-2" />
              </View>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="flex-row my-2">
              <View className="w-[200px]">
                <View className=" items-center flex-row ">
                  <Icon
                    type="font-awesome"
                    name="ban"
                    color="#ff4d49"
                    size={16}
                    className="w-[20px]"
                  />
                  <Text className="text-[#ff4d49] font-[500] text-[16px] inline-block ml-2">
                    Cancel
                  </Text>
                </View>
              </View>
              <View className="w-[105px]">
                <View>
                  <Text className="text-[#ff4d49] font-[500] text-[16px] inline-block">
                    {cancel} (Booking)
                  </Text>
                </View>
              </View>
              <View className="w-[50px]">
                <View>
                  <Text className="text-[#ff4d49] font-[500] text-[16px] inline-block ">
                    {((cancel / dataBooking?.length) * 100).toFixed(1) | 0}%
                  </Text>
                </View>
              </View>
            </Animated.View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
