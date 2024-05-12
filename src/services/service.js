import { set } from "react-hook-form";
import rentalRequester from "./request";

export const rentalService = {
  login: (userLogin) => {
    const newUser = { ...userLogin };
    rentalRequester.post(`/users/login`, newUser);
  },
  register: (userRegister, registerSuccess) => {
    const newUser = { ...userRegister };
    rentalRequester.post(`/users/createUserApp`, newUser).then((rs) => {
      registerSuccess(rs);
    });
  },
  verifyEmail: (email, success) => {
    rentalRequester.get(`/users/verify/${email}/emailApp`).then((rs) => {
      success(rs);
    });
  },
  resetPasswordSendEmailApp: (email, success) => {
    rentalRequester.get(`/users/resetEmailApp/${email}`).then((rs) => {
      success(rs);
    });
  },
  getUserByEmail: (email, setUser = null) => {
    rentalRequester.get(`/users/get/${email}`).then((response) => {
      setUser(response);
    });
  },
  getAllCarHasLimit: (limit, setListCar, setLoading) => {
    const limitCar = {
      limit: limit,
    };
    rentalRequester.post(`/car/allCarHasLimit`, limitCar).then((response) => {
      if (response) {
        setListCar(response);
        setLoading(false);
      }
    });
  },
  getAllCar: () => rentalRequester.get("/car/allCar"),
  getCarByFilter: (data, setListCar, setLoading) => {
    rentalRequester.post(`/car/getCarByFilter`, data).then((response) => {
      if (response) {
        if(data.pageCar>1){
          setListCar((prevList) => ({
            ...prevList,
            listCar: [...prevList.listCar, ...response?.listCar],
          }));
        }
        else{
          setListCar(response);
        }
        setLoading(false);
      }
    });
  },
  getListAllCarsAppForMap: (data, setListCar , setLoading) => {
    rentalRequester.post(`/car/getListAllCarsAppForMap`, data).then((response) => {
      if (response) {
        setListCar(response);
      }
    });
  },
  getAllCategories: (setListCate, setLoading) => {
    rentalRequester.get(`/categories/getAll`).then((response) => {
      if (response) {
        setListCate(response);
        setLoading(false);
      }
    });
  },
  getCarDetails: (id, setCarDetails, setLoading) => {
    rentalRequester.get(`/car/getCar/${id}`).then((response) => {
      if (response) {
        setCarDetails(response);
        setLoading(false);
      }
    });
  },
  updateListFav: (data,setCheckFav, checkFav)=>{
    rentalRequester.post(`/fav/addCarToFav`, data).then((response) => {
      setCheckFav(!checkFav);
    })
  },
  getListFav: (data, setList, setLoading)=>{
    rentalRequester.post(`/fav/myfav`, data).then((response) => {
      if(response){
        setList(response);
        setLoading(false);
      }
    })
  },
  getPageBookingOfUser: (data, setDataBooking,setLoading = null)=>{
    rentalRequester.post(`/booking/getPageBookingOfUserApp/`, data).then((response) => {
      if(response){
        if(data.page>1){
          setDataBooking((prevList) => ({
            ...prevList,
            allBookings: [...prevList.allBookings, ...response?.allBookings],
          }));
        }
        else{
          setDataBooking(response);
        }
        
        if(setLoading){
          setLoading(false)
        }
      }
    })
  },
  getCommentOfCar: (carId,page, setListComment)=>{
    const data = {
      carId: carId,
      page: page
    }
    rentalRequester.post(`/comment/getCommentOfCar`, data).then((response) => {
      setListComment(response);
    })
  },
  getCarDetail: (id, setCarDetail)=>{
    rentalRequester.get(`/car/getCar/${id}`).then((response) => {
      if(response){
        setCarDetail(response);
      }
    })  
  },
  CheckAvailableComment: (data, setCheck)=>{
    rentalRequester.post(`/comment/checkAvailAbleComment`,data).then((response) => {
      setCheck(response);
    })
  },
  createComment: (data, setNewComment)=>{
    rentalRequester.post(`/comment/createComment`, data).then((response) => {
      setNewComment(response);
    })
  },
  createBooking: (data, setDataBooking)=>{
    rentalRequester.post(`/booking/`, data).then((response) => {
      setDataBooking(response);
    })
  },
  getBookingOfSeller : (sellerId, setDataBooking, data) => {
    rentalRequester.post(`/booking/getAllBookingOfSeller/${sellerId}`, data).then((response) => {
      setDataBooking(response);
    })
  },
  getListCars: (data, setListCar, setLoading)=>{
    rentalRequester.post(`car/getListCarsApp`, data).then((response) => {
      if(data.page>1){
        setListCar((prevList) => ({
          ...prevList,
          listCarFilter: [...prevList.listCarFilter.splice(0,12*data.page > prevList.listCarFilter.length ? 12*(data.page - 1) : 12*data.page), ...response?.listCarFilter],
        }));
      }
      else{
        setListCar(response);
      }
      setLoading(false);
    })
  },
  deleteCar: (data) => {
    rentalRequester.post(`/car/deleteCar`, data)
  },
  getListBookingOfSeller: (data, setDataBooking)=>{
    rentalRequester.post(`/booking/getListBookingsApp`, data).then((response) => {
      if(data.page>1){
        setDataBooking((prevList) => ({
          ...prevList,
          listFilterBooking: [...prevList.listFilterBooking, ...response?.listFilterBooking],
        }));
      }
      else{
        setDataBooking(response);
      }
    })
  },
  getFilterListCommentOfSeller: (data, setListComment)=>{
    rentalRequester.post(`/comment/getFilterListCommentOfSellerApp`, data).then((response) => {
      setListComment(response);
      if(data.page>1){
        setListComment((prevList) => ({
          ...prevList,
          listFilterComment: [...prevList.listFilterComment, ...response?.listFilterComment],
        }));
      }
      else{
        setListComment(response);
      }
    })
  },
  getStore: (id, setStore)=>{
    rentalRequester.get(`/store/getStore/${id}`).then((response) => {
      setStore(response);
    })
  },
  replyComment: (data, setNewComment)=>{
    rentalRequester.post(`/comment/replyComment`, data).then((response) => {
      setNewComment(response);
    })
  },
  getFeature : (setFeature)=>{
    rentalRequester.get(`/feature/getFeature`).then((response) => {
      setFeature(response);
    })
  },
  addCarAdmin: (newCar, navigate) =>{
    rentalRequester.post(`/car/app`, newCar).then((response) => {
      // if(response){
      //   navigate('/admin/cars')
      // }
    })
  },
  updateCarApp: (data, setModalEditCar) =>{
    rentalRequester.post(`/car/updateCarApp`, data)
    .then((response) => {
      if(response){
        setModalEditCar(false);
      }
    })
  },
  updateBooking: (bookingId, data, setDataBooking)=>{
    rentalRequester.put(`/booking/updateBooking/${bookingId}`, data).then((response) => {
      setDataBooking(response);
    })
  },
  updateUserId: (data, setData)=>{
    rentalRequester.post(`/users/update/${data.id}`, data).then((response) => {
      if(response){
        setData(response);
      }
    })
  },
  changePasswordUser: (data, resultChange)=>{
    rentalRequester.put(`/users/changePasswordApp/${data.id}`, data).then((response) => {
      if(response){
        resultChange(response);
      }
    })
  },
  createDriveLicense: (data, setData)=>{
    rentalRequester.post(`/driveLicense/createDriveLicense`, data).then((response) => {
      if(response){
        setData(response);
      }
    })
  },
  getDriveLicense: ( setData, setHaveData)=>{
    rentalRequester.get(`/driveLicense/getDriveLicense`).then((response) => {
      if(response){
        setHaveData(true);
        setData(response);
      }
    })
  },
  updateDriveLicense: (data, setData)=>{
    rentalRequester.put(`/driveLicense/updateDriveLicense`, data).then((response) => {
      if(response){
        setData(response);
      }
    })
  },
  //store
  updateProfile: (data, setData)=>{
    rentalRequester.post(`/seller/update/${data.id}`, data).then((response) => {
      if(response){
        setData(response);
      }
    })
  },
  requestBecomeSeller: (data, setData)=>{
    rentalRequester.post(`/store/`, data).then((response) => {
      if(response){
        setData(response);
      }
    })
  }
};
