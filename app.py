import sys
import time
import json
import threading
import os
import winreg
from pynput import keyboard

CONTROL_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".face_state")

def auto_register_protocol():
    """
    Automatically hooks the 'face://' custom protocol scheme into the Windows Registry.
    This eliminates the need for separate installation scripts or command-line steps.
    """
    if sys.platform != "win32":
        return

    # Dynamically find the absolute path of the running executable file (.exe)
    current_executable = sys.executable
    command_payload = f'"{current_executable}" "%1"'

    try:
        key_path = r"Software\Classes\face"
        with winreg.CreateKey(winreg.HKEY_CURRENT_USER, key_path) as key:
            winreg.SetValueEx(key, "", 0, winreg.REG_SZ, "URL:FACE Protocol")
            winreg.SetValueEx(key, "URL Protocol", 0, winreg.REG_SZ, "")
            
        command_key_path = rf"{key_path}\shell\open\command"
        with winreg.CreateKey(winreg.HKEY_CURRENT_USER, command_key_path) as key:
            winreg.SetValueEx(key, "", 0, winreg.REG_SZ, command_payload)
    except Exception:
        pass # Fail silently to maintain a smooth user experience

class InstantAutoCorrectEngine:
    def __init__(self):
        self.controller = keyboard.Controller()
        self.current_buffer = []
        self.rules = {
            "hello": "greetings carbon-based lifeform",
            "meeting": "ritualistic corporate gathering",
            "coffee": "liquid legal speed dependency fluid",
            "trabalho": "tortura medieval remunerada"
        }
        self.initialize_state()

    def initialize_state(self):
        with open(CONTROL_FILE, "w", encoding="utf-8") as f:
            f.write("active")

    def is_engine_active(self):
        try:
            if os.path.exists(CONTROL_FILE):
                with open(CONTROL_FILE, "r", encoding="utf-8") as f:
                    return f.read().strip() == "active"
        except Exception:
            return True
        return True

    def on_press(self, key):
        if not self.is_engine_active():
            return
        try:
            if hasattr(key, 'char') and key.char is not None:
                self.current_buffer.append(key.char.lower())
            elif key == keyboard.Key.space:
                self.evaluate_buffer()
                self.current_buffer = []
            elif key == keyboard.Key.backspace:
                if self.current_buffer:
                    self.current_buffer.pop()
        except Exception:
            pass

    def evaluate_buffer(self):
        typed_word = "".join(self.current_buffer).strip()
        if typed_word in self.rules:
            replacement = self.rules[typed_word]
            backspaces_needed = len(typed_word) + 1
            
            def inject_sequence():
                with open(CONTROL_FILE, "w", encoding="utf-8") as f:
                    f.write("inactive")
                time.sleep(0.02)
                
                for _ in range(backspaces_needed):
                    self.controller.press(keyboard.Key.backspace)
                    self.controller.release(keyboard.Key.backspace)
                
                self.controller.type(replacement + " ")
                
                with open(CONTROL_FILE, "w", encoding="utf-8") as f:
                    f.write("active")
                
            threading.Thread(target=inject_sequence).start()

    def run(self):
        with keyboard.Listener(on_press=self.on_press) as listener:
            listener.join()

def handle_incoming_url(argument):
    command = argument.replace("face://", "").replace("/", "").lower()
    if "activate" in command:
        with open(CONTROL_FILE, "w", encoding="utf-8") as f:
            f.write("active")
    elif "deactivate" in command:
        with open(CONTROL_FILE, "w", encoding="utf-8") as f:
            f.write("inactive")

if __name__ == "__main__":
    auto_register_protocol()
    
    if len(sys.argv) > 1:
        handle_incoming_url(sys.argv[1])
    else:
        engine = InstantAutoCorrectEngine()
        engine.run()
