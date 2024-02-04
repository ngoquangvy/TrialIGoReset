
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('updateRegistryButton');
    const notificationDiv = document.getElementById('notification');
    button?.addEventListener('click', () => {
        // Sử dụng `electron` object được expose trong renderer process
        electron.send('updateRegistry');
    });

    // Lắng nghe sự kiện từ main process và hiển thị thông báo
    electron.receive('updateRegistrySuccess', ({ message, err, success }) => {
        // Hàm để hiển thị thông báo
        if (success) {
            // Thông báo thành công (màu xanh)
            notificationDiv.textContent = message;
            notificationDiv.style.color = 'green';
            notificationDiv.style.display = 'block';
        } else {
            // Thông báo thất bại (màu đỏ)
            notificationDiv.textContent = message;
            notificationDiv.style.color = "red";
            notificationDiv.style.display = 'block';
            console.log(err)
        }
        setTimeout(() => {
            notificationDiv.style.display = 'none';
        }, 10000);
    });
});
