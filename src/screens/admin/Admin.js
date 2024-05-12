import React, { useEffect } from "react";
import { Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "./Dashboard";
import Booking from "./Booking";
import ListCar from "./listCar";
import AddCar from "./addCar";
import Review from "./Review";
import Contract from "./Contract";
import { useAppSelector } from "../../store";
import { user } from "../../store/slices/user";
import { rentalService } from "../../services/service";
import { useDispatch } from "react-redux";
import { setStore } from "../../store/slices/store";
import BookingDetails from "./bookingDetails";
import StoreProfile from "./storeProfile";
const Drawer = createDrawerNavigator();
const Admin = () => {
  const dispatch = useDispatch();
  const userLogin = useAppSelector(user);
  const setData = (value)=>{
    dispatch(setStore(value))
  }
  const getDataStore = async()=>{
    await rentalService.getStore(userLogin.store, setData);
  }
  useEffect(() => {
    getDataStore()
  }, []);
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250,
          },
          headerStyle: {
            backgroundColor: "#fff",
          },
          // headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: 400,
            fontSize: 20,
          },
          drawerActiveTintColor: "black",
          drawerLabelStyle: {
            color: "#111",
          },
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          options={{
            drawerLabel: "Dashboard",
            title: "Dashboard",
            drawerIcon: () => (
              <Icon type="font-awesome" name="pie-chart" color="#000000" />
            ),
          }}
          component={Dashboard}
        />
        <Drawer.Screen
          name="StoreProfile"
          options={{
            drawerLabel: "Store Profile",
            title: "Store Profile",
            drawerIcon: () => (
              <Icon type="font-awesome" name="user" color="#000000" />
            ),
          }}
          component={StoreProfile}
        />
        <Drawer.Screen
          name="ListCar"
          options={{
            drawerLabel: "Cars",
            title: "List Car",
           
            drawerIcon: () => (
              <Icon type="font-awesome" name="car" color="#000000" />
            ),
          }}
          component={ListCar}
        />
        <Drawer.Screen
          name="AddCar"
          options={{
            drawerLabel: "Add Car",
            title: "Add Car",
           
            drawerIcon: () => (
              <Icon type="font-awesome" name="plus" color="#000000" />
            ),
          }}
          component={AddCar}
        />
        <Drawer.Screen
          name="Booking"
          options={{
            drawerLabel: "Booking",
            title: "Booking",
            drawerIcon: () => (
              <Icon type="font-awesome" name="pencil" color="#000000" />
            ),
          }}
          component={Booking}
        />
        <Drawer.Screen
          name="Review"
          options={{
            drawerLabel: "Review",
            title: "Review",
            drawerIcon: () => (
              <Icon type="font-awesome" name="comments-o" color="#000000" />
            ),
          }}
          component={Review}
        />
        <Drawer.Screen
          name="Contract"
          options={{
            drawerLabel: "Contract",
            title: "Contract",
            drawerIcon: () => (
              <Icon type="font-awesome" name="file-text-o" color="#000000" />
            ),
          }}
          component={Contract}
        />
        {/* <Drawer.Screen
          name="Booking Details"
          options={{
            drawerLabel: "Booking Details",
            title: "Booking Details",
            drawerIcon: () => (
              <Icon type="font-awesome" name="file-text-o" color="#000000" />
            ),
          }}
          component={BookingDetails}
        /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Admin;
