import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";


const Contract = () => {
  return (
    <View className="bg-white h-full items-center">
      <View>
        <Image
          className=" mt-10"
          contentFit="cover"
          source={require("../../assets/images/background/constract.png")}
        />
      </View>
      <Text className=" mt-2 text-[14px] font-[700] text-gray-400">
        Select the type of contract you want to view
      </Text>
      <View className=" flex-row mt-10">
        <TouchableOpacity 
          onPress={()=>
            Linking.openURL("https://ngoquyenhighschooleduvn-my.sharepoint.com/:w:/g/personal/tienthanh_ngoquyenhighschool_edu_vn/EQsgNRxt7cBAizbQ43vJaLAB4POEDTJoy_OL_1xv8gwgIA?e=rVE29B")
          }
        >
          <Animated.View entering={FadeInRight.delay(200).duration(1000).springify()} className=" border-[1px] border-[#ddd]  rounded-lg mr-4 justify-center items-center">
            <View className="m-4">
              <Svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Circle cx="40" cy="40" r="40" fill="#00A550"></Circle>
                <Path
                  d="M21.25 59.375H36.25C36.4158 59.375 36.5747 59.3092 36.6919 59.1919C36.8092 59.0747 36.875 58.9158 36.875 58.75V53.125H35.625V58.125H21.875V38.75H35.625V41.875H36.875V38.125C36.875 37.9592 36.8092 37.8003 36.6919 37.6831C36.5747 37.5658 36.4158 37.5 36.25 37.5H21.25C21.0842 37.5 20.9253 37.5658 20.8081 37.6831C20.6908 37.8003 20.625 37.9592 20.625 38.125V58.75C20.625 58.9158 20.6908 59.0747 20.8081 59.1919C20.9253 59.3092 21.0842 59.375 21.25 59.375Z"
                  fill="white"
                ></Path>
                <Path
                  d="M50.3125 43.125C48.8909 43.125 47.5013 43.5465 46.3193 44.3363C45.1374 45.1261 44.2161 46.2486 43.6721 47.562C43.1281 48.8753 42.9858 50.3205 43.2631 51.7147C43.5404 53.109 44.225 54.3896 45.2302 55.3948C46.2354 56.4 47.5161 57.0846 48.9103 57.3619C50.3045 57.6392 51.7497 57.4969 53.063 56.9529C54.3764 56.4089 55.4989 55.4876 56.2887 54.3057C57.0785 53.1237 57.5 51.7341 57.5 50.3125C57.4983 48.4068 56.7406 46.5796 55.393 45.232C54.0454 43.8844 52.2182 43.1267 50.3125 43.125V43.125ZM50.3125 56.25C49.1382 56.25 47.9902 55.9018 47.0138 55.2494C46.0374 54.5969 45.2764 53.6696 44.827 52.5847C44.3776 51.4997 44.26 50.3059 44.4891 49.1542C44.7182 48.0024 45.2837 46.9444 46.1141 46.1141C46.9444 45.2837 48.0024 44.7182 49.1542 44.4891C50.3059 44.26 51.4998 44.3776 52.5847 44.827C53.6696 45.2764 54.5969 46.0374 55.2494 47.0138C55.9018 47.9902 56.25 49.1382 56.25 50.3125C56.2483 51.8867 55.6223 53.396 54.5091 54.5091C53.396 55.6223 51.8867 56.2483 50.3125 56.25Z"
                  fill="white"
                ></Path>
                <Path
                  d="M54.3749 49.375H49.2624C49.115 48.958 48.8249 48.6065 48.4433 48.3827C48.0618 48.1589 47.6135 48.0772 47.1776 48.152C46.7416 48.2268 46.3462 48.4533 46.0611 48.7915C45.776 49.1296 45.6196 49.5577 45.6196 50C45.6196 50.4423 45.776 50.8704 46.0611 51.2085C46.3462 51.5467 46.7416 51.7732 47.1776 51.848C47.6135 51.9228 48.0618 51.8411 48.4433 51.6173C48.8249 51.3935 49.115 51.042 49.2624 50.625H51.2499V51.875H52.4999V50.625H53.7499V51.875H54.9999V50C54.9999 49.8342 54.934 49.6753 54.8168 49.5581C54.6996 49.4408 54.5407 49.375 54.3749 49.375ZM47.4999 50.625C47.3763 50.625 47.2554 50.5883 47.1527 50.5197C47.0499 50.451 46.9698 50.3534 46.9225 50.2392C46.8752 50.125 46.8628 49.9993 46.8869 49.8781C46.911 49.7568 46.9705 49.6455 47.058 49.5581C47.1454 49.4706 47.2567 49.4111 47.378 49.387C47.4992 49.3629 47.6249 49.3753 47.7391 49.4226C47.8533 49.4699 47.9509 49.55 48.0196 49.6528C48.0882 49.7555 48.1249 49.8764 48.1249 50C48.1249 50.1658 48.059 50.3247 47.9418 50.4419C47.8246 50.5591 47.6657 50.625 47.4999 50.625Z"
                  fill="white"
                ></Path>
                <Path
                  d="M22.5 41.875H23.75V43.125H22.5V41.875Z"
                  fill="white"
                ></Path>
                <Path
                  d="M25 41.875H34.375V43.125H25V41.875Z"
                  fill="white"
                ></Path>
                <Path
                  d="M25 54.375H34.375V55.625H25V54.375Z"
                  fill="white"
                ></Path>
                <Path
                  d="M22.5 45.625H23.75V46.875H22.5V45.625Z"
                  fill="white"
                ></Path>
                <Path
                  d="M25 45.625H33.125V46.875H25V45.625Z"
                  fill="white"
                ></Path>
                <Path d="M22.5 50H23.75V51.25H22.5V50Z" fill="white"></Path>
                <Path
                  d="M22.5 54.375H23.75V55.625H22.5V54.375Z"
                  fill="white"
                ></Path>
                <Path d="M25 50H33.125V51.25H25V50Z" fill="white"></Path>
                <Path
                  d="M42.2126 39.5442L41.1251 38.9192C40.8383 38.7537 40.4975 38.7088 40.1776 38.7944C39.8577 38.8799 39.5848 39.0889 39.4189 39.3754L34.7314 47.5004C34.3564 48.1254 33.9689 50.8067 33.8626 51.6004C33.8459 51.7232 33.8662 51.8482 33.9207 51.9595C33.9752 52.0708 34.0616 52.1634 34.1689 52.2254C34.2635 52.2816 34.3713 52.3118 34.4814 52.3129C34.6195 52.3125 34.7535 52.2664 34.8626 52.1817C35.4876 51.6879 37.6001 50.0317 37.9876 49.3754L42.6564 41.2567C42.7398 41.1151 42.7945 40.9585 42.8173 40.7958C42.8402 40.6331 42.8307 40.4675 42.7895 40.3084C42.7483 40.1494 42.6761 40 42.5771 39.8689C42.4781 39.7377 42.3543 39.6274 42.2126 39.5442ZM40.5001 40.0004L41.5876 40.6254L41.2751 41.1692L40.1876 40.5442L40.5001 40.0004ZM35.6251 48.7504L36.4501 49.2317C36.1689 49.5004 35.7751 49.8567 35.3376 50.2067C35.4376 49.6254 35.5376 49.1192 35.6251 48.7504ZM37.2064 48.2192L36.1189 47.5942L39.5564 41.6442L40.6439 42.2692L37.2064 48.2192Z"
                  fill="white"
                ></Path>
                <Path
                  d="M55.4814 26.9492C55.2113 26.9479 54.9478 26.8656 54.7249 26.713C54.5021 26.5603 54.3302 26.3444 54.2314 26.093L53.1939 23.593C52.8383 22.7231 52.2329 21.9781 51.4543 21.452C50.6757 20.9258 49.7586 20.6422 48.8189 20.6367H44.3314C43.3911 20.6397 42.473 20.9224 41.6939 21.4488C40.9148 21.9753 40.3099 22.7217 39.9564 23.593L38.9126 26.093C38.813 26.3471 38.6387 26.565 38.4126 26.718C38.189 26.8681 37.9258 26.9486 37.6564 26.9492C37.1412 26.9509 36.6315 27.054 36.1563 27.2529C35.681 27.4517 35.2497 27.7423 34.8869 28.108C34.524 28.4737 34.2369 28.9074 34.0419 29.3842C33.8468 29.861 33.7477 30.3716 33.7501 30.8867V32.8117C33.7468 33.0967 33.7999 33.3796 33.9063 33.6441C34.0128 33.9085 34.1704 34.1493 34.3702 34.3526C34.57 34.5559 34.8081 34.7177 35.0706 34.8286C35.3332 34.9396 35.6151 34.9976 35.9001 34.9992H38.3001C38.4009 35.6731 38.7402 36.2884 39.2564 36.7331C39.7726 37.1779 40.4313 37.4225 41.1126 37.4225C41.794 37.4225 42.4527 37.1779 42.9689 36.7331C43.4851 36.2884 43.8244 35.6731 43.9251 34.9992H48.7501C48.8594 35.6663 49.2023 36.2728 49.7175 36.7105C50.2327 37.1481 50.8867 37.3884 51.5626 37.3884C52.2386 37.3884 52.8926 37.1481 53.4078 36.7105C53.923 36.2728 54.2658 35.6663 54.3751 34.9992H57.2001C57.4873 35.0009 57.7719 34.9454 58.0374 34.8359C58.3028 34.7264 58.5438 34.5651 58.7463 34.3615C58.9487 34.1579 59.1086 33.9159 59.2166 33.6499C59.3246 33.3838 59.3785 33.0988 59.3751 32.8117V30.8867C59.3743 29.8521 58.9656 28.8595 58.2376 28.1242C57.8803 27.7538 57.4522 27.4589 56.9787 27.2571C56.5053 27.0553 55.9961 26.9506 55.4814 26.9492V26.9492ZM35.1626 29.9992H35.6251V31.2492H35.0001V30.8867C35.0028 30.5837 35.0578 30.2835 35.1626 29.9992ZM41.1251 36.2492C40.7988 36.2554 40.478 36.1643 40.2036 35.9875C39.9292 35.8107 39.7136 35.5562 39.5844 35.2565C39.4552 34.9567 39.4182 34.6253 39.478 34.3044C39.5379 33.9835 39.6919 33.6877 39.9205 33.4547C40.1491 33.2216 40.4419 33.062 40.7615 32.996C41.0812 32.93 41.4133 32.9606 41.7155 33.0841C42.0177 33.2075 42.2763 33.4181 42.4583 33.6891C42.6403 33.96 42.7376 34.279 42.7376 34.6055C42.741 35.037 42.5732 35.4523 42.2709 35.7604C41.9687 36.0685 41.5567 36.2443 41.1251 36.2492V36.2492ZM51.5751 36.2492C51.2488 36.2554 50.928 36.1643 50.6536 35.9875C50.3792 35.8107 50.1636 35.5562 50.0344 35.2565C49.9052 34.9567 49.8682 34.6253 49.928 34.3044C49.9879 33.9835 50.1419 33.6877 50.3705 33.4547C50.5991 33.2216 50.8919 33.062 51.2115 32.996C51.5312 32.93 51.8633 32.9606 52.1655 33.0841C52.4677 33.2075 52.7263 33.4181 52.9083 33.6891C53.0903 33.96 53.1876 34.279 53.1876 34.6055C53.191 35.037 53.0232 35.4523 52.7209 35.7604C52.4187 36.0685 52.0067 36.2443 51.5751 36.2492V36.2492ZM58.1251 32.8117C58.1293 32.9328 58.1092 33.0535 58.0659 33.1667C58.0226 33.2798 57.9571 33.3832 57.8732 33.4706C57.7893 33.558 57.6887 33.6277 57.5774 33.6755C57.4661 33.7234 57.3463 33.7485 57.2251 33.7492H54.2876C54.1111 33.1664 53.7518 32.6559 53.2627 32.2931C52.7737 31.9303 52.1809 31.7344 51.572 31.7344C50.9631 31.7344 50.3703 31.9303 49.8813 32.2931C49.3923 32.6559 49.0329 33.1664 48.8564 33.7492H43.8564C43.6818 33.1655 43.3235 32.6537 42.8349 32.2898C42.3462 31.9259 41.7532 31.7293 41.1439 31.7293C40.5346 31.7293 39.9416 31.9259 39.4529 32.2898C38.9642 32.6537 38.606 33.1655 38.4314 33.7492H35.9314C35.8076 33.7527 35.6844 33.7308 35.5695 33.6848C35.4545 33.6389 35.3502 33.5698 35.2629 33.482C35.1756 33.3941 35.1073 33.2893 35.0621 33.1741C35.0169 33.0588 34.9958 32.9355 35.0001 32.8117V32.4992H35.6251C35.9567 32.4992 36.2746 32.3675 36.509 32.1331C36.7434 31.8987 36.8751 31.5807 36.8751 31.2492V29.9992C36.8733 29.7325 36.7861 29.4734 36.6264 29.2597C36.4668 29.046 36.2429 28.8891 35.9876 28.8117C36.4496 28.4161 37.0357 28.1949 37.6439 28.1867C38.1628 28.1878 38.67 28.0332 39.1001 27.743C39.5281 27.4518 39.8608 27.041 40.0564 26.5617L41.0939 24.0617C41.3556 23.417 41.8032 22.8648 42.3797 22.4752C42.9562 22.0857 43.6356 21.8765 44.3314 21.8742H48.7939C49.4899 21.8756 50.1696 22.0845 50.7463 22.4741C51.323 22.8638 51.7704 23.4165 52.0314 24.0617L53.0689 26.5617C53.2633 27.0422 53.5968 27.4536 54.0266 27.7431C54.4565 28.0327 54.9631 28.1872 55.4814 28.1867C55.8301 28.1862 56.1754 28.255 56.4973 28.3891C56.8192 28.5232 57.1112 28.72 57.3564 28.968C57.6048 29.2212 57.8007 29.5212 57.9326 29.8505C58.0646 30.1798 58.13 30.532 58.1251 30.8867V32.8117Z"
                  fill="white"
                ></Path>
                <Path
                  d="M50.9562 23.6992C50.6993 23.2338 50.3243 22.8444 49.869 22.5701C49.4136 22.2958 48.894 22.1463 48.3625 22.1367H44.8313C44.2997 22.1463 43.7801 22.2958 43.3248 22.5701C42.8694 22.8444 42.4944 23.2338 42.2375 23.6992L40.925 26.0055C40.8097 26.2038 40.749 26.4292 40.749 26.6586C40.749 26.888 40.8097 27.1134 40.925 27.3117C41.0275 27.4981 41.1774 27.6541 41.3596 27.7639C41.5418 27.8736 41.7498 27.9333 41.9625 27.9367H51.25C51.4627 27.9333 51.6707 27.8736 51.8529 27.7639C52.0351 27.6541 52.185 27.4981 52.2875 27.3117C52.4009 27.1127 52.4606 26.8876 52.4606 26.6586C52.4606 26.4295 52.4009 26.2045 52.2875 26.0055L50.9562 23.6992ZM42.0062 26.6242L43.325 24.318C43.47 24.0424 43.6862 23.8107 43.9511 23.6469C44.216 23.4831 44.5199 23.3933 44.8313 23.3867H46.7063V26.6805H42C41.997 26.6712 41.996 26.6614 41.9971 26.6517C41.9981 26.642 42.0013 26.6326 42.0062 26.6242V26.6242ZM47.9688 26.6805V23.3867H48.3625C48.6739 23.3933 48.9778 23.4831 49.2426 23.6469C49.5075 23.8107 49.7237 24.0424 49.8688 24.318L51.1875 26.6242C51.1875 26.6242 51.1875 26.668 51.1875 26.6742L47.9688 26.6805Z"
                  fill="white"
                ></Path>
              </Svg>
            </View>
            <Text className="text-[16px] font-[700] text-black text-center mb-4 mx-2">
              RENTAL AGREEMENT
            </Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity 
           onPress={()=>
            Linking.openURL("https://ngoquyenhighschooleduvn-my.sharepoint.com/:w:/g/personal/tienthanh_ngoquyenhighschool_edu_vn/Ec89dXfwslJCkFRPO4TGhUMBqgax0X8yNlYIFAhoBCwp3Q?e=No6CmR")
          }
        >
          <Animated.View entering={FadeInLeft.delay(200).duration(1000).springify()} className=" border-[1px] border-[#ddd]  rounded-lg justify-center items-center">
            <View className="m-4">
              <Svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Circle cx="40" cy="40" r="40" fill="#00A550"></Circle>
                <Path
                  d="M44.0365 31.7285H26.9761C26.5447 31.7285 26.1948 32.0784 26.1948 32.5098C26.1948 32.9412 26.5447 33.291 26.9761 33.291H44.0365C44.4679 33.291 44.8177 32.9412 44.8177 32.5098C44.8177 32.0784 44.4679 31.7285 44.0365 31.7285Z"
                  fill="white"
                ></Path>
                <Path
                  d="M40.0097 28.916C40.4411 28.916 40.791 28.5662 40.791 28.1348C40.791 27.7034 40.4411 27.3535 40.0097 27.3535H31.0024C30.571 27.3535 30.2212 27.7034 30.2212 28.1348C30.2212 28.5662 30.571 28.916 31.0024 28.916H40.0097Z"
                  fill="white"
                ></Path>
                <Path
                  d="M44.0365 37.666C44.4679 37.666 44.8177 37.3162 44.8177 36.8848C44.8177 36.4534 44.4679 36.1035 44.0365 36.1035H39.8683H31.1441H26.9761C26.5447 36.1035 26.1948 36.4534 26.1948 36.8848C26.1948 37.3162 26.5447 37.666 26.9761 37.666H31.1442H39.8684H44.0365Z"
                  fill="white"
                ></Path>
                <Path
                  d="M28.7862 46.2692C29.3535 46.2692 29.815 46.6556 29.815 47.1306C29.815 47.562 30.1648 47.9119 30.5962 47.9119C31.0276 47.9119 31.3775 47.562 31.3775 47.1306C31.3775 46.0487 30.6156 45.1302 29.5674 44.8195V44.7109C29.5674 44.2795 29.2176 43.9297 28.7862 43.9297C28.3547 43.9297 28.0049 44.2795 28.0049 44.7109V44.8195C26.9567 45.1302 26.1948 46.0487 26.1948 47.1306C26.1948 48.4672 27.3573 49.5546 28.7862 49.5546C29.3535 49.5546 29.815 49.941 29.815 50.416C29.815 50.891 29.3535 51.2775 28.7862 51.2775C28.2188 51.2775 27.7573 50.891 27.7573 50.416C27.7573 49.9846 27.4075 49.6348 26.9761 49.6348C26.5447 49.6348 26.1948 49.9846 26.1948 50.416C26.1948 51.498 26.9567 52.4165 28.0049 52.7272V52.8358C28.0049 53.2672 28.3547 53.617 28.7862 53.617C29.2176 53.617 29.5674 53.2672 29.5674 52.8358V52.7272C30.6156 52.4164 31.3775 51.498 31.3775 50.416C31.3775 49.0795 30.215 47.9921 28.7862 47.9921C28.2188 47.9921 27.7573 47.6056 27.7573 47.1306C27.7573 46.6556 28.2188 46.2692 28.7862 46.2692Z"
                  fill="white"
                ></Path>
                <Path
                  d="M36.2875 41.2598C36.2875 40.8284 35.9376 40.4785 35.5062 40.4785H26.9761C26.5447 40.4785 26.1948 40.8284 26.1948 41.2598C26.1948 41.6912 26.5447 42.041 26.9761 42.041H35.5062C35.9377 42.041 36.2875 41.6912 36.2875 41.2598Z"
                  fill="white"
                ></Path>
                <Path
                  d="M57.755 46.1928L55.5052 40.7934C55.3839 40.5022 55.0995 40.3126 54.7841 40.3126H50.7812V34.6876C50.7812 34.2562 50.4314 33.9063 50 33.9063C49.5686 33.9063 49.2188 34.2562 49.2188 34.6876V40.3126H43.0284C42.713 40.3126 42.4286 40.5023 42.3073 40.7934L40.0576 46.1928C38.7435 46.7195 37.8126 48.0053 37.8126 49.5052V56.0938C37.8126 56.5252 38.1624 56.875 38.5938 56.875H39.2188V57.3438C39.2188 57.7336 39.3039 58.1037 39.4554 58.4375H21.5625V21.5625H49.2188V27.6562C49.2188 28.0877 49.5686 28.4375 50 28.4375C50.4314 28.4375 50.7812 28.0877 50.7812 27.6562V20.7812C50.7812 20.3498 50.4314 20 50 20H20.7812C20.3498 20 20 20.3498 20 20.7812V59.2188C20 59.6502 20.3498 60 20.7812 60H50C50.4314 60 50.7812 59.6502 50.7812 59.2188V56.875H52.6562V57.3438C52.6562 58.8084 53.8478 60 55.3125 60C56.7772 60 57.9688 58.8084 57.9688 57.3438V56.875H59.2188C59.6502 56.875 60 56.5252 60 56.0938V49.5052C60 48.0052 59.0691 46.7195 57.755 46.1928ZM43.5493 41.875H54.2633L55.956 45.9375H41.8566L43.5493 41.875ZM40.7812 57.3438V56.875H42.9688V57.3438C42.9688 57.9469 42.4781 58.4375 41.875 58.4375C41.2719 58.4375 40.7812 57.9469 40.7812 57.3438ZM49.2188 58.4375H44.2947C44.4462 58.1037 44.5312 57.7336 44.5312 57.3438V56.875H49.2188V58.4375ZM56.4062 57.3438C56.4062 57.9469 55.9156 58.4375 55.3125 58.4375C54.7094 58.4375 54.2188 57.9469 54.2188 57.3438V56.875H56.4062V57.3438ZM58.4375 55.3125H39.375V49.5052C39.375 48.3996 40.2746 47.5 41.3802 47.5H56.4323C57.5379 47.5 58.4375 48.3996 58.4375 49.5052V55.3125Z"
                  fill="white"
                ></Path>
                <Path
                  d="M43.2812 49.0625C41.9889 49.0625 40.9375 50.1139 40.9375 51.4062C40.9375 52.6986 41.9889 53.75 43.2812 53.75C44.5736 53.75 45.625 52.6986 45.625 51.4062C45.625 50.1139 44.5736 49.0625 43.2812 49.0625ZM43.2812 52.1875C42.8505 52.1875 42.5 51.837 42.5 51.4062C42.5 50.9755 42.8505 50.625 43.2812 50.625C43.712 50.625 44.0625 50.9755 44.0625 51.4062C44.0625 51.837 43.712 52.1875 43.2812 52.1875Z"
                  fill="white"
                ></Path>
                <Path
                  d="M54.2969 49.0625C53.0045 49.0625 51.9531 50.1139 51.9531 51.4062C51.9531 52.6986 53.0045 53.75 54.2969 53.75C55.5892 53.75 56.6406 52.6986 56.6406 51.4062C56.6406 50.1139 55.5892 49.0625 54.2969 49.0625ZM54.2969 52.1875C53.8661 52.1875 53.5156 51.837 53.5156 51.4062C53.5156 50.9755 53.8661 50.625 54.2969 50.625C54.7277 50.625 55.0781 50.9755 55.0781 51.4062C55.0781 51.837 54.7277 52.1875 54.2969 52.1875Z"
                  fill="white"
                ></Path>
                <Path
                  d="M49.6092 50.625H47.9385C47.5071 50.625 47.1572 50.9748 47.1572 51.4062C47.1572 51.8377 47.5071 52.1875 47.9385 52.1875H49.6092C50.0406 52.1875 50.3904 51.8377 50.3904 51.4062C50.3904 50.9748 50.0406 50.625 49.6092 50.625Z"
                  fill="white"
                ></Path>
                <Path
                  d="M50 30.3906C49.7937 30.3906 49.593 30.4741 49.4477 30.6195C49.3023 30.7649 49.2188 30.9664 49.2188 31.1719C49.2188 31.3773 49.3023 31.5789 49.4477 31.7241C49.593 31.8695 49.7945 31.9531 50 31.9531C50.2055 31.9531 50.407 31.8695 50.5523 31.7241C50.6977 31.5789 50.7812 31.3773 50.7812 31.1719C50.7812 30.9664 50.6977 30.7648 50.5523 30.6195C50.407 30.4741 50.2055 30.3906 50 30.3906Z"
                  fill="white"
                ></Path>
              </Svg>
            </View>
            <Text className="text-[16px] font-[700] text-black text-center mb-4 mx-2">
              HANDOVER RECORD
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Contract;
