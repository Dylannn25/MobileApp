import { View, Text, FlatList } from "react-native";
import React from "react";
import { dataFilterTypeTrip } from "../../data/filterItemData";
import { TouchableOpacity } from "react-native";
import Animated ,{ FadeInLeft } from "react-native-reanimated";
const FilterItemTypeTrip = ({
  isSelected,
  toggleValue,
}) => {
  return (
    <>
      <Animated.View entering={FadeInLeft.delay(200).duration(1000).springify()} className="flex-row">
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
      </Animated.View>
    </>
  );
};

export default FilterItemTypeTrip;
