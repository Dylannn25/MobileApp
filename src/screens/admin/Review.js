import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
// import Modal from "react-native-modal";
import { useAppSelector } from "../../store";
import { user } from "../../store/slices/user";
import { rentalService } from "../../services/service";
import { AirbnbRating } from "react-native-ratings";
import { convertTimestampToFormat } from "../../utils";
import { store } from "../../store/slices/store";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const Review = () => {
  const userLogin = useAppSelector(user);
  const storeData = useAppSelector(store);
  const [openModal, setOpenModal] = useState(false);
  const [listComment, setListComment] = useState(null);
  const [comment, setComment] = useState(null);
  const [ratingQuantity, setRaingQuantity] = useState(null);
  const [numberRa, setNumberRa] = useState(0);
  const [review, setReview] = useState("");
  const [keySearch, setKeySearch] = useState("");
  const [sortCarName, setSortCarName] = useState("");
  const [sortDate, setSortDate] = useState("");
  const [sortUserName, setSortUserName] = useState("");
  const [sortReview, setSortReview] = useState("");
  const [sortStatus, setSortStatus] = useState("");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const currentDate = new Date(); // Lấy ngày hiện tại
  const formattedDate = currentDate.toISOString();
  const handleFilter = (value) => {
    let data = {
      sellerId: userLogin.store,
      page: page,
      limit: 12,
      key: keySearch,
      sortCar: sortCarName,
      sortDate: sortDate,
      sortReviewer: sortUserName,
      sortStatus: sortStatus,
      sortReview: sortReview,
    };
    if (value) {
      data = {
        ...data,
        key: value,
      };
    }
    setTimeout(async () => {
      await rentalService.getFilterListCommentOfSeller(data, setListComment);
    }, 1000);
  };

  const loadProducts = async () => {
    setLoadingMore(true);
    try {
      if (listComment?.countComment <= listComment?.listFilterComment?.length) {
        setLoadingMore(true);
        return;
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoadingMore(false);
    }
  };
  const handleEndReached = () => {
    if (!loadingMore) {
      loadProducts();
    }
  };
  const handleSearchComment = async (value) => {
    try {
      setPage(1);
      setKeySearch(value);
    } catch (err) {
      alert("search error!");
    }
  };
  const handleReplyComment = async (commentId) => {
    try {
      const data = {
        ...comment,
        user: {
          photos: storeData?.photos,
          fullName: storeData?.storeName,
        },
        date: formattedDate,
        comment: review,
        commentId: commentId,
        page: page,
      };
      const replyComment = (value) => {
        setComment(value.listComment[0]);
      };
      await rentalService.replyComment(data, replyComment);
      alert("Reply comment successfully!");
    } catch (error) {
      alert("Reply comment fail!");
    }
  };
  useEffect(() => {
    handleFilter();
  }, [
    keySearch,
    sortCarName,
    sortDate,
    sortUserName,
    sortReview,
    sortStatus,
    page,
  ]);
  return (
    <>
      <SafeAreaView>
        <View className="bg-white h-full">
          <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} className="border-[1px] border-[#ddd] p-3 rounded-lg  m-2">
            <TextInput
              placeholder="Search review"
              placeholderTextColor={"gray"}
              clearButtonMode="while-editing"
              onChangeText={handleSearchComment}
            />
            <TouchableOpacity className="absolute right-0 mt-3 mr-2 justify-center items-center">
              <View>
                <Icon
                  type="font-awesome"
                  name="search"
                  color="#000"
                  size={20}
                  className="w-[20px]"
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
          <FlatList
            data={listComment?.listFilterComment}
            renderItem={({ item }) => (
              <View>
                <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className=" mx-3 mt-4 rounded-lg shadow-inner border-[1px] border-[#ddd]">
                  <View className="flex-row w-fit border-b-[1px] border-[#ddd]">
                    <View className="flex-relative mt-4 ml-4 flex-row border-r-[1px] border-[#ddd] mb-2">
                      <View className="mr-2">
                        <Image
                          className="w-[50px] h-[50px] rounded-[10px]"
                          source={{ uri: item?.carPhoto }}
                        />
                      </View>
                      <View className=" justify-center w-[130px]">
                        <Text className="text-[13px] font-[500] text-[#000] w-fit mr-1">
                          {item.carName}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-relative mt-4 ml-2 flex-row ">
                      <View className="mr-2">
                        <Image
                          className="w-[50px] h-[50px] rounded-full"
                          source={require("../../assets/images/avatar/user.webp")}
                        />
                      </View>
                      <View className=" justify-center w-[90px]">
                        <Text className="text-[13px] font-[500] text-[#000] w-fit mr-1">
                          {item.user?.fullName}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row mx-2 mt-2 justify-between">
                    <View className="my-2">
                      <View className="flex-row">
                        <Text className="text-[14px] text-black font-regular">
                          Rating
                        </Text>
                      </View>
                      <View className="flex-row mt-2">
                        <AirbnbRating
                          count={5}
                          defaultRating={item.rating}
                          size={10}
                          showRating={false}
                          isDisabled
                        />
                      </View>
                    </View>
                    <View className="my-2">
                      <Text className="text-[14px] text-black font-regular">
                        Comment
                      </Text>
                      <View className="w-[150px]">
                        <Text className="text-[14px] text-gray-400 font-regular mt-2">
                          {convertTimestampToFormat(item.date)}
                        </Text>
                        <Text className="text-[14px] text-black font-regular mt-2">
                          {item.comment}
                        </Text>
                      </View>
                    </View>
                    <View className="my-2">
                      <Text className="text-[14px] text-black font-regular">
                        Action
                      </Text>
                      <View className="flex-row">
                        <Icon
                          type="font-awesome"
                          name="pencil-square-o"
                          color="#1ecb15"
                          size={20}
                          className="w-[18px] mr-2 mt-2"
                          onPress={() => {
                            setComment(item);
                            setOpenModal(true);
                          }}
                        />
                        <Icon
                          type="font-awesome"
                          name="eye-slash"
                          color="#ff4d49"
                          size={20}
                          className="w-[18px] mr-2 mt-2"
                        />
                      </View>
                    </View>
                  </View>
                </Animated.View>
              </View>
            )}
            keyExtractor={(item) => item._id}
            // refreshing={false}
            // onRefresh={() => handleFilter()}
            onEndReached={() => handleEndReached()}
            onEndReachedThreshold={0.2}
            initialNumToRender={11}
            maxToRenderPerBatch={12}
            // showsVerticalScrollIndicator={false}
            className="bg-white"
            // contentContainerStyle={{ flexGrow: 1 }}
            // ListHeaderComponent={() => (
            //   <View className="flex-row justify-center items-center">
            //     <View className=" absolute top-[0px] left-[20px] ">
            //       <Icon
            //         type="font-awesome"
            //         name="angle-left"
            //         color="#000000"
            //         size={28}
            //       />
            //     </View>
            //     <View className=" mb-2">
            //       <Text className="font-[400] text-[20px] text-black text-center">
            //         Review                </Text>
            //     </View>
            //   </View>
            // )}
            // ListFooterComponent={() => <View className="h-10" />}
            // ListFooterComponentStyle={{ backgroundColor: "white" }}
            // ListHeaderComponentStyle={{ backgroundColor: "white" }}
            // stickyHeaderIndices={[0]}
            // ListEmptyComponent={() => <Text className="text-center">No data</Text>}
          />
        </View>
      </SafeAreaView>
      <Modal
        visible={openModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setOpenModal(!openModal)}
        // hasBackdrop={true}
        // backdropColor="black"
        // backdropOpacity={0.6}
        // onBackdropPress={() => setModalVisible(false)}
        // coverScreen
      >
        <SafeAreaView>
          <View
            // style={styles.modalContent}
            className="bg-white mx-3"
          >
            <View className>
              <View className="flex-row justify-center items-center">
                <View className=" absolute top-[0px] left-[20px] ">
                  <Icon
                    type="font-awesome"
                    name="close"
                    color="#000000"
                    size={28}
                    onPress={() => setOpenModal(false)}
                  />
                </View>
                <View className>
                  <Text className="font-[400] text-[20px] text-black text-center pb-4">
                    Reply comment
                  </Text>
                </View>
              </View>
            </View>
            {comment && (
              <View>
                <View className="flex-relative mt-4 flex-row ">
                  <View className="mr-2">
                    <Image
                      className="w-[50px] h-[50px] rounded-full"
                      source={{ uri: comment?.carPhoto }}
                    />
                  </View>
                  <View className=" justify-center">
                    <Text className="text-[13px] font-[500] text-[#000] w-fit mr-1">
                      {comment.user?.fullName}
                    </Text>
                    <View className="w-[150px]">
                      <Text className="text-[14px] text-gray-400 font-regular mt-2">
                        {convertTimestampToFormat(comment.date)}
                      </Text>
                      <Text className="text-[14px] text-black font-regular mt-2">
                        {comment.comment}
                      </Text>
                    </View>
                  </View>
                  <View className="ml-auto">
                    <AirbnbRating
                      count={5}
                      defaultRating={comment.rating}
                      size={14}
                      showRating={false}
                      isDisabled
                    />
                  </View>
                </View>
                <View className="border-[1px] border-[#ddd] py-4 px-3 rounded-lg w-full my-2">
                  <TextInput
                    placeholder="Share your thought..."
                    placeholderTextColor={"gray"}
                    clearButtonMode="while-editing"
                    onChangeText={setReview}
                    className="text-[16px]"
                  />
                </View>
                <TouchableOpacity
                  className=" bg-[#1ecb15] rounded-lg justify-center items-center ml-auto h-[40px] w-[80px]"
                  onPress={() => {
                    handleReplyComment(comment._id);
                  }}
                >
                  <View className="flex-row">
                    <Text className="text-[16px] text-white font-[700] font-regular m-2">
                      Sent
                    </Text>
                    <Icon
                      type="font-awesome"
                      name="arrow-right"
                      color="#fff"
                      size={15}
                      className="w-[15px] mr-2 my-2"
                    />
                  </View>
                </TouchableOpacity>
                {comment?.replyComment?.length > 0 && (
                  <>
                    <FlatList
                      data={comment?.replyComment}
                      keyExtractor={(item) => item._id}
                      renderItem={({ item }) => (
                        <View className="flex-relative mt-4 flex-row pb-4 border-b-[1px] border-[#ddd]">
                          <View className="mr-2">
                            <Image
                              className="w-[50px] h-[50px] rounded-full"
                              source={require("../../assets/images/avatar/user.webp")}
                            />
                          </View>
                          <View className=" justify-center">
                            <Text className="text-[13px] font-[500] text-[#000] w-fit mr-1">
                            {item.user?.fullName}
                            </Text>
                            <View className="w-[150px]">
                              <Text className="text-[14px] text-gray-400 font-regular mt-2">
                              {convertTimestampToFormat(item.date)}
                              </Text>
                              <Text className="text-[14px] text-black font-regular mt-2">
                              {item.comment}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    />
                  </>
                )}
              </View>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default Review;
