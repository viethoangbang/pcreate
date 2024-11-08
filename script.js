function generatePassword() {
    // Lấy giá trị từ form
    const username = document.getElementById("username").value;
    const website = document.getElementById("website").value;
    const specialChar = document.getElementById("specialChar").checked ? "#" : "";
    const outputDiv = document.getElementById("output");
    
    // Xử lý lỗi nhập liệu
    try {
        if (!username || /\s/.test(username) || /[^\w]/.test(username)) {
            throw new Error("Tên cá nhân phải không dấu, không khoảng cách!");
        }

        if (!website || !/^https?:\/\/(www\.)?.+\.[a-z]+$|^[a-z]+\.[a-z]+$/.test(website)) {
            throw new Error("Tên website không hợp lệ!");
        }
        
        // Lấy tên website từ URL
        const domain = website.replace(/^https?:\/\/(www\.)?/, "").split(".")[0];
        const firstLastChar = domain[0] + domain[domain.length - 1];

        // Tạo 4 số ngẫu nhiên
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        
        // Tạo mật khẩu
        const password = `${specialChar}Password${firstLastChar}${randomNum}${username}@`;
        
        // Xuất kết quả với animation
        outputDiv.innerHTML = "";
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            outputDiv.innerHTML = `Đang tạo mật khẩu: ${progress}%`;
            if (progress >= 100) {
                clearInterval(progressInterval);
                outputDiv.innerHTML = `Mật khẩu của bạn: <b>${password}</b>`;
            }
        }, 100);
    } catch (error) {
        outputDiv.innerHTML = `<span style="color:red">${error.message}</span>`;
    }
}
