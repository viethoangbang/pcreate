function generatePassword() {
    // Lấy giá trị từ form
    const username = document.getElementById("username").value;
    const website = document.getElementById("website").value;
    const specialChar = document.getElementById("specialChar").checked ? "#" : "";
    const outputDiv = document.getElementById("output");
    const copyButton = document.getElementById("copyButton");

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

        // Xuất kết quả với thanh loading và animation
        outputDiv.innerHTML = `
            <div class="progress-6"></div>
            <p id="loadingText">Đang tạo mật khẩu: 0%</p>
        `;
        copyButton.style.display = "none"; // Ẩn nút copy trong khi đang tải
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            document.getElementById("loadingText").innerText = `Đang tạo mật khẩu: ${progress}%`;
            if (progress >= 100) {
                clearInterval(progressInterval);
                outputDiv.innerHTML = `Mật khẩu của bạn: <b>${password}</b>`;
                copyButton.style.display = "block"; // Hiển thị nút copy sau khi tạo mật khẩu
            }
        }, 100);
    } catch (error) {
        outputDiv.innerHTML = `<span style="color:red">${error.message}</span>`;
        copyButton.style.display = "none"; // Ẩn nút copy nếu có lỗi
    }
}

// Hàm sao chép mật khẩu vào clipboard
function copyPassword() {
    const passwordText = document.querySelector("#output b");
    if (passwordText) {
        navigator.clipboard.writeText(passwordText.innerText)
            .then(() => {
                alert("Mật khẩu đã được sao chép vào clipboard!");
            })
            .catch((err) => {
                console.error("Lỗi sao chép mật khẩu: ", err);
            });
    }
}
