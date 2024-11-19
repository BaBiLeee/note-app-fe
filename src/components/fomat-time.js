export function formatDateTime(timestamp) {
    // Chuyển đổi chuỗi thời gian ISO 8601 thành đối tượng Date
    const date = new Date(timestamp);
    
    // Lấy các thành phần của ngày và giờ
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    // Định dạng lại thời gian
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  // Ví dụ sử dụng
  const timestamp = "2024-11-18T08:10:11.406709Z";
  console.log(formatDateTime(timestamp)); // Output: 2024-11-18 08:10:11
  