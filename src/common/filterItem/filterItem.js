import { View, Text, FlatList } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { dataFilter } from "../../data/filterItemData";
import { TouchableOpacity } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
const FilterItem = ({
  handlePresentCarCompanyModal,
  handlePresentCarTypeModal,
  handlePresentFilterModal,
  reloadData,
}) => {
  return (
    <>
      <Animated.View
        entering={FadeInLeft.delay(200).duration(1000).springify()}
        className="flex-row"
      >
        <FlatList
          data={dataFilter}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row"
              onPress={() => {
                if (item.id === 3) {
                  handlePresentCarCompanyModal();
                } else if (item.id === 1) {
                  handlePresentCarTypeModal();
                } else if (item.id === 2) {
                  handlePresentFilterModal();
                }
                else if(item.id === 0){
                  reloadData()
                }
              }}
            >
              <View
                key={item.id + item.name}
                className="mx-2 border-2 border-[#ddd] px-2 rounded-3xl flex-row items-center w-fit"
              >
                {item.icon}
                {item.name && (
                  <Text className="ml-2 text-[#111111] font-[500] text-[14px]">
                    {item.name}
                  </Text>
                )}
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

export default FilterItem;
