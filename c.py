import ctypes
import win32api
import win32gui
import win32con

# Tạo một đối tượng WinDLL với tên của thư viện user32.dll
user32 = ctypes.WinDLL('user32')

# Tạo một đối tượng WinDLL với tên của thư viện gdi32.dll
gdi32 = ctypes.WinDLL('gdi32')

# Lấy handle của màn hình desktop
hdc = user32.GetDC(0)

# Lấy màu tại điểm (1, 2)
color = gdi32.GetPixel(hdc, 145, 243)

# Nếu màu là (234, 234, s234), ấn phím Alt và phím 1 cùng một lúc
if color == 0xEAEAEA:
    user32.mouse_event(0x0002, 145, 243, 0, 0)  # Ấn nút trái chuột
    user32.mouse_event(0x0004, 145, 243, 0, 0)  # Thả nút trái chuột
    user32.keybd_event(0x12, 0, 0, 0)  # Ấn phím Alt
    user32.keybd_event(0x31, 0, 0, 0)  # Ấn phím 1
    user32.keybd_event(0x31, 0, 2, 0)  # Thả phím 1
    user32.keybd_event(0x12, 0, 2, 0)  # Thả phím Alt

# Giải phóng handle của màn hình desktop
user32.ReleaseDC(0, hdc)
