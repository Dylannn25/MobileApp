import moment from "moment";

export function formatPrice(price) {
  return Math.round(price / 1000) + "K";
}

export const Rating = (data) => {
  // Lấy danh sách đánh giá từ data
  const reviews = data.reviews;

  if (reviews.length === 0) {
    return 0; // Trả về 0 nếu không có đánh giá
  }

  // Tính tổng điểm đánh giá
  const totalRating = reviews.reduce((total, review) => {
    return total + review.rating;
  }, 0);

  // Tính điểm đánh giá trung bình
  const averageRating = totalRating / reviews.length;

  return averageRating;
};

export const handleDatetime = (
  selectStartDate,
  selectEndDate,
  selectPickupTime,
  selectReturnTime,
  carDetail,
  setMessageTime
) => {
  if (
    moment(selectEndDate, "DD/MM/YYYY").isSame(
      moment(selectStartDate, "DD/MM/YYYY")
    )
  ) {
    setMessageTime("Select two different dates, please!");
    return false;
  } else if (
    moment(selectEndDate, "DD/MM/YYYY").isBefore(
      moment(selectStartDate, "DD/MM/YYYY")
    )
  ) {
    setMessageTime("Select date invalid, please!");
    return false;
  }
  const startTime = carDetail?.timeStart; // Giờ bắt đầu
  const endTime = carDetail?.endTime; // Giờ kết thúc
  if (selectPickupTime === null) {
    setMessageTime("Select time pick up, please!");
    return false;
  } else {
    if (isOutsideTimeRange(selectPickupTime, startTime, endTime)) {
      setMessageTime(
        `Select time from ${startTime} - ${endTime}(h), please!`,
        "Booking"
      );
      return false;
    }
  }
  if (selectReturnTime === null) {
    setMessageTime("Select time return, please!", "Booking");

    return false;
  } else {
    if (isOutsideTimeRange(selectReturnTime, startTime, endTime)) {
      setMessageTime(
        `Select time from ${startTime} - ${endTime}(h), please!`,
        "Booking"
      );
      return false;
    }
  }
  var datetimeStart = moment(
    selectStartDate + "T" + selectPickupTime,
    "DD/MM/YYYYTHH:mm"
  );
  var datetimeEnd = moment(
    selectEndDate + "T" + selectReturnTime,
    "DD/MM/YYYYTHH:mm"
  );
  var currentDateTime = moment();
  if (datetimeStart.isBefore(currentDateTime)) {
    setMessageTime("The time is less than the current time!");
    return false;
  }
  var diff = datetimeEnd.diff(datetimeStart, "hours");
  // Tính khoảng cách giờ giữa hai thời điểm
  if (!(diff >= 24)) {
    setMessageTime("Min date rental is once day!");
    return false;
  }
  if (carDetail) {
    var date = [];
    carDetail.booking.forEach((item) => {
      if (!item?.cancel?.status) {
        date.push({
          startDate: moment(item.dateStart, "DD/MM/YYYY"),
          endDate: moment(item.dateEnd, "DD/MM/YYYY"),
        });
      }
    });
    for (var i = 0; i < date.length; i++) {
      if (moment(selectStartDate, "DD/MM/YYYY").isSame(date[i].startDate)) {
        setMessageTime("Choose  other day start, please!");
        return false; // Nếu ngày nằm trong khoảng thời gian không hợp lệ
      }
      if (moment(selectEndDate, "DD/MM/YYYY").isSame(date[i].endDate)) {
        setMessageTime("Choose  other day return, please!");
        return false; // Nếu ngày nằm trong khoảng thời gian không hợp lệ
      }
      if (
        moment(selectStartDate, "DD/MM/YYYY").isSameOrBefore(date[i].endDate) &&
        moment(selectEndDate, "DD/MM/YYYY").isSameOrAfter(date[i].startDate)
      ) {
        setMessageTime("Choose  other days, please!");
        return false;
      }
    }
  }
  return true;
};

function isOutsideTimeRange(timeToCheck, startTime, endTime) {
  if (startTime && endTime) {
    const timeParts = timeToCheck.split(":");
    const hours = parseInt(timeParts[0], 10);

    return hours < startTime || hours > endTime;
  }
  return false;
}

// export const convertTimestampToFormat = (timestamp) => {
//   const utcDate = new Date(timestamp);
//   const localDate = new Date(
//     utcDate.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
//   ); // Change 'Asia/Ho_Chi_Minh' for Vietnam time
//   const formattedDate = localDate.toLocaleString("en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return formattedDate;
// };
export const convertTimestampToFormat = (timestamp) => {
  return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
};

//booking chart
function calculateLatestStatus(transactions) {
  const latestStatusTimes = {};

  transactions.forEach((transaction) => {
    const { codeBooking, delivery, confirmed, cancel, returnCar } = transaction;

    // Xác định thời gian của từng trạng thái
    const deliveryTime =
      delivery.time !== "" ? new Date(delivery.time) : undefined;
    const confirmTime =
      confirmed.time !== "" ? new Date(confirmed.time) : undefined;
    const cancelTime = cancel.time !== "" ? new Date(cancel.time) : undefined;
    const returnCarTime =
      returnCar.time !== "" ? new Date(returnCar.time) : undefined;

    // Loại bỏ các giá trị không xác định và không hợp lệ
    const validTimes = [
      deliveryTime,
      confirmTime,
      cancelTime,
      returnCarTime,
    ].filter((time) => time instanceof Date && !isNaN(time));

    // Tìm trạng thái muộn nhất
    const latestStatusTime =
      validTimes.length > 0
        ? new Date(Math.max(...validTimes.map((time) => time.getTime())))
        : undefined;

    // Kiểm tra và cập nhật trạng thái muộn nhất cho mỗi booking
    latestStatusTimes[codeBooking] = {
      deliveryTotal: deliveryTime
        ? deliveryTime.getTime() === latestStatusTime.getTime()
          ? 1
          : 0
        : 0,
      confirmTotal:confirmTime?
        confirmTime.getTime() === latestStatusTime.getTime() ? 1 : 0:0,
      cancelTotal:cancelTime? cancelTime.getTime() === latestStatusTime.getTime() ? 1 : 0:0,
      returnCarTotal:returnCarTime?
        returnCarTime.getTime() === latestStatusTime.getTime() ? 1 : 0:0,
    };
  });

  return latestStatusTimes;
}

export function calculateLateStatusTotals(transactions) {
  const latestStatusTimes = calculateLatestStatus(transactions);
  const lateStatusCounts = [];
  if(transactions.length===0){
    const data ={
      deliveryTotal:0,
      confirmTotal:0,
      cancelTotal:0,
      returnCarTotal:0,
    };
    lateStatusCounts[0]=(data);
  }
  else{

    Object.values(latestStatusTimes).forEach((status) => {
      const { deliveryTotal, confirmTotal, cancelTotal, returnCarTotal } = status;
      if (lateStatusCounts.length === 0) {
        lateStatusCounts[0] = {
          deliveryTotal,
          confirmTotal,
          cancelTotal,
          returnCarTotal,
        };
      } else {
        lateStatusCounts[0].deliveryTotal += deliveryTotal;
        lateStatusCounts[0].confirmTotal += confirmTotal;
        lateStatusCounts[0].cancelTotal += cancelTotal;
        lateStatusCounts[0].returnCarTotal += returnCarTotal;
      }
    });
  }
  return Object.values(lateStatusCounts);
}

function createSeriesObjectsFromBookings(bookings) {
  const carSeries = {};

  bookings.forEach((booking) => {
    const carId = booking.car.carId;
    const carName = booking.car.carName;

    if (!carSeries[carId]) {
      carSeries[carId] = {
        seriesName: carName,
        type: "line",
        data: Array(12).fill(0), // Khởi tạo mảng 12 tháng ban đầu
      };
    }
  });

  return Object.values(carSeries);
}

function calculateMonthlyRevenue(bookings) {
  const monthlyRevenue = {};

  bookings.forEach((booking) => {
    const carId = booking.car.carId;
    const month = new Date(booking.returnCar.time).getMonth();
    if (!monthlyRevenue[carId]) {
      monthlyRevenue[carId] = Array(12).fill(0);
    }
    if (month) {
      monthlyRevenue[carId][month - 1] += booking.priceTotal;
    }
  });
  return monthlyRevenue;
}
function calculateMonthlyTotalRevenue(bookings) {
  const monthlyTotalRevenue = Array(12).fill(0); // Khởi tạo mảng 12 tháng ban đầu

  bookings.forEach((booking) => {
    const month = new Date(booking.returnCar.time).getMonth();
    monthlyTotalRevenue[month - 1] += booking.priceTotal;
  });

  return monthlyTotalRevenue;
}
function generateColorPalette(numColors) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 137.508) % 360; // Tạo màu sắc khác nhau dựa trên góc Hue trong không gian màu HSL
    const color = `hsl(${hue}, 70%, 50%)`; // Sử dụng màu sắc trong không gian màu HSL
    colors.push(color);
  }
  return colors;
}
// function generateColorPalette(numColors) {
//   const colors = [];
//   const hexCharacters = '0123456789abcdef'; // Các ký tự hex hợp lệ

//   for (let i = 0; i < numColors; i++) {
//     let color = '#'; // Chuỗi màu hex bắt đầu bằng '#'

//     // Tạo một chuỗi màu hex ngẫu nhiên bằng cách thêm các ký tự hex ngẫu nhiên
//     for (let j = 0; j < 6; j++) {
//       color += hexCharacters[Math.floor(Math.random() * 16)]; // Chọn ngẫu nhiên một ký tự hex từ hexCharacters
//     }

//     colors.push(color);
//   }
//   return colors;
// }

// Sử dụng hàm để tạo các đối tượng series từ dữ liệu booking
export const listSeries = (bookings) => {
  const seriesObjects = createSeriesObjectsFromBookings(bookings);

  // Tính doanh thu hàng tháng từ dữ liệu booking
  const monthlyRevenue = calculateMonthlyRevenue(bookings);
  const colorPalette = generateColorPalette(seriesObjects.length + 1);
  // Tạo mảng series với dữ liệu doanh thu hàng tháng từ priceTotal
  const series = seriesObjects.map((seriesObj, index) => ({
    name: seriesObj.seriesName,
    type: "column",
    data: monthlyRevenue[Object.keys(monthlyRevenue)[index]], // Dữ liệu từ calculateMonthlyRevenue
    color: colorPalette[index],
  }));
  const monthlyTotalRevenue = calculateMonthlyTotalRevenue(bookings);

  // Thêm series mới cho tổng doanh thu của tất cả các xe trong mỗi tháng
  const totalRevenueSeries = {
    name: "Revenue",
    type: "line",
    data: monthlyTotalRevenue,
    color: colorPalette[seriesObjects.length],
  };
  // Thêm series mới vào mảng series
  series.push(totalRevenueSeries);

  return series; // Đây là mảng series với doanh thu hàng tháng của mỗi xe
};

export const listYaxis = (series) => {
  const colorPalette = generateColorPalette(series.length);
  const yaxis = series.map((serie, index) => {
    const colorIndex = index < series.length ? index : 0; // Lấy màu từ mảng màu sắc với index tương ứng

    const axis = {
      show: false,
      seriesName: serie.name || "",
      opposite: true,
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: colorPalette[colorIndex],
      },
      labels: {
        style: {
          colors: colorPalette[colorIndex],
        },
      },
      // title: {
      //     text: serie.name || "",
      //     style: {
      //         color: colorPalette[colorIndex],
      //     },
      // },
      
    };

    return axis;
  });
  yaxis[0].opposite = false;
  yaxis[0].show = true;
  yaxis[0].title = {
    text: "Price total(VND)",
    style: {
      color: "#000",
    },
  };
  yaxis[yaxis.length - 1].show = true
  yaxis[yaxis.length - 1].title = {
    text: "Revenue (VND)",
    style: {
      color: colorPalette[colorPalette.length],
    },
  };

  return yaxis;
};


export function filterBookingsByYear(bookings, yearToFilter) {
  const bookingsFilteredByYear = bookings.filter((booking) => {
    const bookYear = new Date(booking.createdAt).getFullYear();
      return bookYear.toString() === yearToFilter;
  });
  return bookingsFilteredByYear;
}

function calculateTotalRevenueForYear(bookings, yearToFilter) {
  const bookingsFilteredByYear = filterBookingsByYear(bookings, yearToFilter);

  // Tính tổng doanh thu từ các booking đã lọc
  const totalRevenueForYear = bookingsFilteredByYear.reduce((total, booking) => {
    return total + booking.priceTotal;
  }, 0);

  return totalRevenueForYear;
}

export const isValidDate = (dateString) => {
  // Kiểm tra xem dateString có phải là một ngày hợp lệ không
  // Đây là một ví dụ đơn giản, bạn có thể cải tiến để phù hợp với nhu cầu của bạn
  const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!regex.test(dateString)) {
    return false;
  }

  const [day, month, year] = dateString.split('/');
  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === parseInt(day, 10) &&
    date.getMonth() + 1 === parseInt(month, 10) &&
    date.getFullYear() === parseInt(year, 10)
  );
};