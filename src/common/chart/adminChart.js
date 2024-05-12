import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { BarChart } from "react-native-gifted-charts";
import SelectDropdown from "react-native-select-dropdown";
import Animated, { SlideInLeft, SlideInRight, ZoomIn } from "react-native-reanimated";

const AdminChart = ({
  revenue,
  series,
  dataBooking,
  dataYaxis,
  dataOption,
  setDataOption,
  selectedYear,
  setSelectedYear,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [dataStatistics, setDataStatistics] = useState(null);
  const startYear = 2023;
  const endYear = 2030;
  const arrayYears = [];
  const arrayMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  for (let year = startYear; year <= endYear; year++) {
    arrayYears.push(String(year));
  }
  const statistics = () => {
    const dataTemp = series.map((item) => {
      return {
        value: (item.data[selectedMonth - 1]/1000),
        label: item.name,
        frontColor: item.color,
      };
    });
    setDataStatistics(dataTemp);
  };
  useEffect(() => {
    if (series) {
      statistics();
    }
  }, [series, selectedMonth]);
  return (
    <View className="mx-3 flex items-center mt-8 justify-center">
      <View className="flex-row justify-between w-[100%]">
        <Animated.View entering={SlideInLeft} className="w-[48%] flex border-[1px] border-[#ddd]  p-[10px] rounded-lg">
          <Text className=" font-[400] text-[16px] text-[#767676]">
            Revenue by year
          </Text>
          <SelectDropdown
            data={arrayYears}
            onSelect={(selectedItem, index) => {
              setSelectedYear(selectedItem);
            }}
            defaultButtonText={selectedYear}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <>
                  <Icon
                    type="font-awesome"
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={18}
                  />
                </>
              );
            }}
            dropdownIconPosition={"right"}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            buttonStyle={{
              width: "100%",
              height: "auto",
              backgroundColor: "#FFF",
            }}
            buttonTextStyle={{
              color: "#444",
              textAlign: "left",
              marginLeft: -7,
              fontSize: 18,
              fontWeight: "600",
            }}
          />
        </Animated.View>
        <Animated.View entering={SlideInRight} className="w-[48%] flex border-[1px] border-[#ddd]  p-[10px] rounded-lg">
          <Text className=" font-[400] text-[16px] text-[#767676]">
            Revenue by month
          </Text>
          <SelectDropdown
            data={arrayMonth}
            onSelect={(selectedItem, index) => {
              setSelectedMonth(selectedItem);
            }}
            defaultButtonText={selectedMonth}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <>
                  <Icon
                    type="font-awesome"
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={18}
                  />
                </>
              );
            }}
            dropdownIconPosition={"right"}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            buttonStyle={{
              width: "100%",
              height: "auto",
              backgroundColor: "#FFF",
            }}
            buttonTextStyle={{
              color: "#444",
              textAlign: "left",
              marginLeft: -7,
              fontSize: 18,
              fontWeight: "600",
            }}
          />
        </Animated.View>
      </View>
      <View className="m-3 flex items-center justify-center">
        <Text className="text-[16px] text-black text-center font-bold">
          Business Analytics(K)
        </Text>
        <Animated.View entering={ZoomIn.delay(200).duration(1000).springify()} className="mt-3 flex">
          {dataStatistics && (
            <BarChart
              data={dataStatistics}
              width={Dimensions.get("window").width-70}
              barWidth={100}
              noOfSections={3}
              barBorderRadius={4}
              spacing={10}
              showLine
              isAnimated
              // frontColor="lightgray"
              // yAxisThickness={0}
              // xAxisThickness={0}
              // hideRules
              showReferenceLine1
              referenceLine3Position={revenue}
              referenceLine1Config={{
                color: "#1ecb15",
                dashWidth: 2,
                dashGap: 3,
              }}
              lineConfig={{
                color: '#1ecb15',
                thickness: 3,
                curved: true,
                // hideDataPoints: true,
                // shiftY: 20,
                // initialSpacing: -30,
              }}
              yAxisTextStyle={{textAlign: 'center', width: 100, marginRight: 30}}
            />
          )}
        </Animated.View>
        <View>
          <Text className="text-[16px] text-[#ff2d2d] text-center mt-3">
            Revenue: {revenue}VND
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AdminChart;
