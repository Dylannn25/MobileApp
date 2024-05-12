import { View, Text } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
const PickerComponent = ({setShowPicker, selectedOption, setSelectedOption, items,setValue=null}) => {
  return (
    <View className="absolute bottom-[80px] w-full bg-white border-[#ddd] border-t-[1px]">
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedOption(itemValue);
          setShowPicker(false);
          setValue('gender', itemValue)
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
        {items.map(
          (item, index) =>
            !item.check && (
              <Picker.Item
                key={index}
                label={item.label}
                value={item.value}
                color={item.color}
              />
            )
        )}
      </Picker>
    </View>
  );
};

export default PickerComponent;
