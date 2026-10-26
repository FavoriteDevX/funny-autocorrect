import sys
import winreg
import os

def register_face_protocol():
    """
    Registers the custom 'face://' URI protocol scheme into the OS kernel architecture.
    This links Markdown action payloads directly to the background daemon hooks.
    """
    if sys.platform != "win32":
        print("[!] Automated installer currently targets Windows Registry architecture natively.")
        print("[!] For macOS/Linux, please map 'face://' protocol via manual plist/mime settings.")
        return

    python_executable = sys.executable
    script_path = os.path.abspath("app.py")
    
    # Target execution parameters routing incoming web link queries into core daemon
    command_payload = f'"{python_executable}" "{script_path}" "%1"'

    try:
        # Create core class root bindings for system protocol routing
        key_path = r"Software\Classes\face"
        with winreg.CreateKey(winreg.HKEY_CURRENT_USER, key_path) as key:
            winreg.SetValueEx(key, "", 0, winreg.REG_SZ, "URL:FACE Protocol")
            winreg.SetValueEx(key, "URL Protocol", 0, winreg.REG_SZ, "")
            
        command_key_path = rf"{key_path}\shell\open\command"
        with winreg.CreateKey(winreg.HKEY_CURRENT_USER, command_key_path) as key:
            winreg.SetValueEx(key, "", 0, winreg.REG_SZ, command_payload)
            
        print("[🚀] FACE System Protocol Bindings Registered Successfully.")
        print("[🚀] URL commands matching 'face://' will now target local runtime threads directly.")
    except Exception as e:
        print(f"[❌] Fatal Exception writing to system registry hives: {e}")

if __name__ == "__main__":
    register_face_protocol()
