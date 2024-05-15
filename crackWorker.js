// Lắng nghe sự kiện từ trang chính
self.addEventListener('message', async function(event) {
    // Nhận dữ liệu từ trang chính
    var formDataObject = event.data;
    
    try {
        // Tạo FormData từ plain object
        var formData = new FormData();
        for (var key in formDataObject) {
            formData.append(key, formDataObject[key]);
        }
        
        // Gửi dữ liệu đến máy chủ và đợi phản hồi
        var response = await sendData(formData);
        
        // Gửi kết quả trở lại trang chính thông qua Web Worker
        self.postMessage(response.message);
    } catch (error) {
        // Gửi lỗi về cho trang chính thông qua Web Worker
        self.postMessage({ error: error.message });
    }
});

// Hàm gửi dữ liệu đến máy chủ và đợi phản hồi
async function sendData(formData) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var response = JSON.parse(xhr.responseText);
            resolve(response);
        };
        xhr.onerror = function () {
            reject(new Error('Đã xảy ra lỗi khi gửi dữ liệu đến máy chủ'));
        };
        xhr.open("POST", 'http://127.0.0.1:5000/crack', true);
        xhr.send(formData);
    });
}
