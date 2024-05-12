import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../src/store";
import Navigator from "../src/navigator/navigation";
import { AuthContextProvider } from "../src/store/auth";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const LoadFonts = async () => {
      await Font.loadAsync({
        "Roboto-Regular": require("../src/assets/fonts/Roboto/Roboto-Regular.ttf"),
        "Roboto-Bold": require("../src/assets/fonts/Roboto/Roboto-Bold.ttf"),
        "Roboto-Medium": require("../src/assets/fonts/Roboto/Roboto-Medium.ttf"),
        "OpenSans-Regular": require("../src/assets/fonts/OpenSans/OpenSans-Regular.ttf"),
        "SF Pro": require("../src/assets/fonts/SFPro/SF-Pro-Display-Regular.otf"),
      });
      SplashScreen.hideAsync();
      setFontsLoaded(true);
    };

    LoadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Return null while fonts are loading
  }

  return (
    <Provider store={store}>
      <AuthContextProvider>
        <Navigator />
      </AuthContextProvider>
    </Provider>
  );
}
