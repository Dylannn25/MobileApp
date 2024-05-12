import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rentalRequester, { setAxiosToken } from "../services/request";
import { useAppDispatch } from ".";
import { setUser } from "./slices/user";
import { rentalService } from "../services/service";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [message, setMessage] = useState(null);
  const dispatch = useAppDispatch();
  const setUserLogin = (value) => {
    dispatch(setUser(value));
    AsyncStorage.setItem("userApp", JSON.stringify(value));
    setMessage(null);
  };
  const login = async (userLogin) => {
    setIsLoading(true);
    const newUser = { ...userLogin };
    rentalRequester.post(`/users/loginApp`, newUser).then((response) => {
      if (response?.success != false) {
        setUserToken(response?.refreshToken);
        AsyncStorage.setItem("accessToken", response?.refreshToken);
        setAxiosToken(response?.refreshToken);
        rentalService.getUserByEmail(response?.email, setUserLogin);
        // handleLogin(newUser, loginUser, navigate,setLoading);
      } else {
        setIsLoading(false);
        setMessage(response?.message);
      }
    });
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("accessToken");
    dispatch(setUser({}));
    setIsLoading(false);
  };
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("accessToken");
      let userApp = await AsyncStorage.getItem("userApp");
      setAxiosToken(userToken);
      if(userApp){
        const data = (value)=>{
          if(value?.refreshToken === userToken){
            setUserLogin(value);
          }
          else{
            logout();
          }
        }
        await rentalService.getUserByEmail(JSON.parse(userApp).email, data);
        // setUserLogin(JSON.parse(userApp));
      }
      setUserToken(userToken);
      setIsLoading(false);
    } catch (error) {
      console.log("Login error: ", error);
    }
  };
  useEffect(() => {
    // setUserToken(null);
    // AsyncStorage.removeItem("accessToken");
    // dispatch(setUser({}));
    isLoggedIn();
  }, []);
  return (
    <>
      <AuthContext.Provider
        value={{ login, logout, isLoading, userToken, message }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
