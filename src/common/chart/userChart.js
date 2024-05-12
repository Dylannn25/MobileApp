import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const UserChart = () => {
  const userData = [{ value: 5 }, { value: 3 }, { value: 4 }, { value: 3 }];
  return (
    <View className="flex items-center mt-8 justify-center">
      <Text className="text-[16px] text-black text-center">User Analytics</Text>
      <View>
        <BarChart data={userData} />
      </View>
    </View>
  );
};

export default UserChart;
