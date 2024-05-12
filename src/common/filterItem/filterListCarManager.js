import { View, Text, FlatList } from "react-native";
import React from "react";
import { dataFilterTypeTrip } from "../../data/filterItemData";
import { TouchableOpacity } from "react-native";
const FilterListCarManager = ({
  isSelected,
  toggleValue,
}) => {
  return (
    <>
      <View className="flex-row">
        <FlatList
          data={dataFilterTypeTrip}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row"
              onPress={() => toggleValue(item.id, item.value)}
            >
              <View
                key={item.id + item.name}
                className={
                    isSelected(item.id)
                      ? "mx-2 border-2  px-2 py-1 rounded-3xl flex-row items-center w-fit border-[#1ecb15] bg-[#effaf3]"
                      : "mx-2 border-2 border-[#ddd] px-2 py-1 rounded-3xl flex-row items-center w-fit"
                  }
              >
                {item.icon}
                <Text className="ml-2 text-[#111111] font-[500] text-[14px]">
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default FilterListCarManager;
