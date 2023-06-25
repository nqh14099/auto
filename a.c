
#include <windows.h>

int main()
{
    HWND desktop = GetDesktopWindow();
    HDC desktopDC = GetDC(desktop);

    COLORREF color = GetPixel(desktopDC, 145, 243);

    if (GetRValue(color) == 234 && GetGValue(color) == 234 && GetBValue(color) == 234) {
        POINT point = {145, 243};
		HWND window = WindowFromPoint(point);
        HDC windowDC = GetDC(window);

        mouse_event(MOUSEEVENTF_LEFTDOWN | MOUSEEVENTF_LEFTUP, 145, 243, 0, 0);

        keybd_event(VK_MENU, 0x38, 0, 0);
        keybd_event(0x31, 0x02, 0, 0);
        keybd_event(0x31, 0x02, KEYEVENTF_KEYUP, 0);
        keybd_event(VK_MENU, 0x38, KEYEVENTF_KEYUP, 0);

        ReleaseDC(desktop, desktopDC);
        ReleaseDC(window, windowDC);
    }

    return 0;
}

