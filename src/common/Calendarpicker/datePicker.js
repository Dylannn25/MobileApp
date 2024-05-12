import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { Icon } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { formatDate } from "date-fns";
import { Picker } from "@react-native-picker/picker";
const DatePicker = ({
  item,
  selectReturnTime = null,
  selectPickupTime = null,
  selectedEndDate = null,
  selectedStartDate = null,
  setSelectedEndDate = null,
  setSelectedStartDate = null,
  setSelectPickupTime = null,
  setSelectReturnTime = null,
  setModalVisible = null,
  data = null,
}) => {
  const minDate = new Date(); // Today
  const maxDate = new Date(2025, 6, 3);
  const [rentalDay, setRentalDay] = useState(1);
  const [rangeDisableDates, setRangeDisableDates] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigation = useNavigation();
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerReturnTime, setShowPickerReturnTime] = useState(false);
  const timeOptions = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];
  const isAnyDateInRangeDisabled = (dayStart, dayEnd) => {
    const disabledDatesSet = new Set(rangeDisableDates);
    let currentDate = new Date(dayStart);
    let dayEnds = new Date(dayEnd);
    if (currentDate > dayEnds) {
      currentDate = dayEnds;
      dayEnds = dayStart;
    }
    while (currentDate <= dayEnds) {
      const dateString = formatDate(currentDate, "yyyy-MM-dd");
      if (disabledDatesSet.has(dateString)) {
        return true;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return false;
  };

  const onDateChange = (date, type) => {
    const newDate = JSON.stringify(date);
    const newDate1 = newDate.substring(1, newDate.length - 1);
    const dates = newDate1.split("T");
    const date1 = dates[0].split("-");
    const day = date1[2];
    const month = date1[1];
    const year = date1[0];

    if (type == "END_DATE") {
      if (day == undefined) {
        setSelectedEndDate(null);
        setEndDate(null);
      } else {
        setSelectedEndDate(day + "/" + month + "/" + year);
        setEndDate(year + "-" + month + "-" + day);
      }
    } else {
      setSelectedStartDate(day + "/" + month + "/" + year);
      setStartDate(year + "-" + month + "-" + day);
      setEndDate(null);
      setSelectedEndDate(null);
    }
  };
  useEffect(() => {
    if (selectedEndDate && selectedStartDate) {
      if (isAnyDateInRangeDisabled(startDate, endDate)) {
        alert("Please choose another date!");
        setSelectedStartDate(null);
        setStartDate(null);
        setEndDate(null);
        setSelectedEndDate(null);
        return;
      }
    }
    if (
      selectedEndDate &&
      selectedStartDate &&
      selectReturnTime &&
      selectPickupTime
    ) {
      const datetimeStart = moment(
        `${selectedStartDate}T${selectPickupTime}`,
        "DD/MM/YYYYTHH:mm"
      );
      const datetimeEnd = moment(
        `${selectedEndDate}T${selectReturnTime}`,
        "DD/MM/YYYYTHH:mm"
      );

      const diff = datetimeEnd.diff(datetimeStart, "days");
      const diffHours = datetimeEnd.diff(datetimeStart, "hours");
      let allDay = diff;

      if (diffHours - diff * 24 > 5) {
        allDay += 1;
      }
      setRentalDay(allDay);
    }
  }, [selectedStartDate, selectedEndDate, selectReturnTime, selectPickupTime]);
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`; // Lưu ý: month - 1 vì các tháng bắt đầu từ 0
  };
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    let endDates = new Date(endDate);

    // Thêm ngày vào mảng cho đến khi currentDate lớn hơn endDate
    while (currentDate <= endDates) {
      dates.push(formatDate(currentDate, "yyyy-MM-dd"));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const getDisabledDates = () => {
    if (!data?.booking) return [];

    const disabledDates = [];
    data.booking.forEach((item) => {
      const startDate = parseDate(item.dateStart);
      const endDate = parseDate(item.dateEnd);
      disabledDates.push(...getDatesInRange(startDate, endDate));
    });
    return disabledDates;
  };

  useEffect(() => {
    const disabledDates = getDisabledDates();
    if (JSON.stringify(disabledDates) !== JSON.stringify(rangeDisableDates)) {
      setRangeDisableDates(disabledDates);
    }
  }, [data]);
  return (
    <SafeAreaView className="bg-white">
      <View className="bg-white h-full">
        {/* <TouchableOpacity>
          <View className=" absolute top-[15px] left-[20px] ">
            <Icon
              type="font-awesome"
              name="angle-left"
              color="#000000"
              size={28}
            />
          </View>
        </TouchableOpacity>
        <View className=" flex justify-center mt-4 mb-2 items-center">
          <Text className="font-[400] text-[20px] text-black text-center">
            Time
          </Text>
        </View> */}
        <View className="mt-[10px] rounded-lg bg-white mx-2 ">
          <CalendarPicker
            // startFromMonday={true}
            allowRangeSelection={true}
            minDate={minDate}
            maxDate={maxDate}
            todayBackgroundColor="#afe7c2"
            allowBackwardRangeSelect={true}
            selectedDayColor="#1ecb15"
            selectedDayTextColor="#FFFFFF"
            onDateChange={onDateChange}
            selectedRangeStyle={{
              backgroundColor: "#afe7c2",
            }}
            selectedRangeStartStyle={{
              backgroundColor: "#1ecb15",
            }}
            selectedRangeStartTextStyle={{
              color: "#fff",
            }}
            selectedRangeEndStyle={{
              backgroundColor: "#1ecb15",
            }}
            selectedRangeEndTextStyle={{
              color: "#fff",
            }}
            previousTitle={
              <Icon
                type="font-awesome"
                name="chevron-left"
                color="#1ecb15"
                size={18}
              />
            }
            nextTitle={
              <Icon
                type="font-awesome"
                name="chevron-right"
                color="#1ecb15"
                size={18}
              />
            }
            minRangeDuration={1}
            scrollable
            disabledDates={rangeDisableDates}
            selectedDisabledDatesTextStyle={{
              color: "#767676",
              fontWeight: "bold",
              fontSize: 16,
            }}
          />
        </View>
        <View className="px-2 mx-3 flex flex-row items-center justify-between">
          <View className="w-[50%]">
            <TouchableOpacity
              onPress={() => {
                setShowPicker(true);
              }}
            >
              <View className="flex border-[1px] border-[#ddd] w-[98%] p-[10px] rounded-lg">
                <Text className=" font-[400] text-[16px] text-[#767676]">
                  Pick up
                </Text>
                <View className="flex justify-between w-[100%]">
                  <Text className="text-[18px] font-[600]">
                    {selectPickupTime ? selectPickupTime : "21:00"}
                    <Icon
                      type="font-awesome"
                      name={showPicker ? "chevron-up" : "chevron-down"}
                      color={"#444"}
                      size={18}
                      className="ml-2"
                    />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View className="w-[50%]">
          <TouchableOpacity
              onPress={() => {
                setShowPickerReturnTime(true);
              }}
            >
              <View className="flex border-[1px] border-[#ddd] w-[98%] p-[10px] rounded-lg">
                <Text className=" font-[400] text-[16px] text-[#767676]">
                  Return
                </Text>
                <View className="flex justify-between w-[100%]">
                  <Text className="text-[18px] font-[600]">
                    {selectReturnTime ? selectReturnTime : "21:00"}
                    <Icon
                      type="font-awesome"
                      name={showPickerReturnTime ? "chevron-up" : "chevron-down"}
                      color={"#444"}
                      size={18}
                      className="ml-2"
                    />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="absolute bottom-[30px] w-full border-t-[1px] border-[#ddd]">
          <View className="flex p-2 m-3 flex-row justify-between">
            <View>
              <Text className="font-bold">
                {selectPickupTime ? selectPickupTime : "21:00"},{" "}
                {selectedStartDate} -{" "}
                {selectReturnTime ? selectReturnTime : "21:00"},{" "}
                {selectedEndDate ? selectedEndDate : selectedStartDate}
              </Text>
              <Text>
                Subtotal:{" "}
                <Text className="font-bold text-[#000]">{rentalDay}</Text> day
              </Text>
            </View>
            <View className="flex-row">
              <TouchableOpacity
                className="w-fit px-4 py-3 rounded-xl mb-1 bg-[#1ecb15]"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-[#fff] font-bold">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View>
        {showPicker && (
          <View className="absolute bottom-[50px] w-full bg-white h-[170px] border-[#ddd] border-t-[1px]">
            <Picker
              selectedValue={selectPickupTime}
              onValueChange={(itemValue, itemIndex) => {
                setSelectPickupTime(itemValue);
                setShowPicker(false);
              }}
              style={{
                height: 0,
                width: "100%",
                borderWidth: 1,
                borderColor: "#1ecb15",
              }}
              mode="dialog"
              selectionColor="#1ecb15"
              itemStyle={{
                fontSize: 22,
                color: "#1ecb15",
                fontWeight: "500",
              }}
            >
              {timeOptions.map(
                (item, index) =>
                  !item.check && (
                    <Picker.Item
                      key={index}
                      label={item}
                      value={item}
                      // color={item.color}
                    />
                  )
              )}
            </Picker>
          </View>
        )}
        {showPickerReturnTime && (
          <View className="absolute bottom-[50px] w-full bg-white h-[170px] border-[#ddd] border-t-[1px]">
            <Picker
              selectedValue={selectReturnTime}
              onValueChange={(itemValue, itemIndex) => {
                setSelectReturnTime(itemValue);
                setShowPickerReturnTime(false);
              }}
              style={{
                height: 0,
                width: "100%",
                borderWidth: 1,
                borderColor: "#1ecb15",
              }}
              mode="dialog"
              selectionColor="#1ecb15"
              itemStyle={{
                fontSize: 22,
                color: "#1ecb15",
                fontWeight: "500",
              }}
            >
              {timeOptions.map(
                (item, index) =>
                  !item.check && (
                    <Picker.Item
                      key={index}
                      label={item}
                      value={item}
                      // color={item.color}
                    />
                  )
              )}
            </Picker>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DatePicker;
