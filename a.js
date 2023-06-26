
function checkColor(x, y, r, g, b) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var width = window.innerWidth;
  var height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  context.drawImage(document.documentElement, 0, 0, width, height);
  // Lấy giá trị màu sắc của pixel tại vị trí (x, y)
  var pixel = context.getImageData(126, 165).data;
  // So sánh giá trị màu sắc của pixel với giá trị màu sắc mong muốn
  return (pixel[0] === r && pixel[1] === g && pixel[2] === b);
}

// Định nghĩa một hàm để thực hiện các hành động click và ấn phím
function performActions(x, y) {
  // Lấy đối tượng tab hiện tại
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    // Thực hiện các hành động của bạn trên tab này
    // Ví dụ: click vào điểm (x, y) và ấn phím Alt+1
    chrome.tabs.executeScript(tab.id, {code: "document.elementFromPoint(" + x + ", " + y + ").click();" +
                                             "document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 18}));" +
                                             "document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 49}));" +
                                             "document.dispatchEvent(new KeyboardEvent('keyup', {keyCode: 49}));" +
                                             "document.dispatchEvent(new KeyboardEvent('keyup', {keyCode: 18}));"});
  });
}

// Đăng ký một sự kiện click chuột trên trang web
document.addEventListener('click', function(event) {
  // Kiểm tra màu sắc của pixel tại vị trí click
  if (checkColor(event.clientX, event.clientY, 234, 234, 234)) {
    // Nếu màu sắc của pixel khớp với giá trị mong muốn, thực hiện các hành động click và ấn phím
    performActions(event.clientX, event.clientY);
  }
});

