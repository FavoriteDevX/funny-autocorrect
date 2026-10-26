import sys
import time
import json
import threading
import os
from pynput import keyboard

CONTROL_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".face_state")

class PersistentAutoCorrectDaemon:
    def __init__(self):
        self.controller = keyboard.Controller()
        self.current_buffer = []
        self.rules = self.load_dictionary()
        self.initialize_state()

    def initialize_state(self):
        with open(CONTROL_FILE, "w", encoding="utf-8") as f:
            f.write("active")

    def load_dictionary(self):
        # Localized fast parsing mapping dictionary
        return {
            "hello": "greetings carbon-based lifeform",
            "meeting": "ritualistic corporate gathering",
            "coffee": "liquid legal speed dependency fluid",
            "trabalho": "tortura medieval remunerada"
        }

    def check_runtime_status(self):
        try:
            if os.path.exists(CONTROL_FILE):
                with open(CONTROL_FILE, "r", encoding="utf-8") as f:
                    return f.read().strip() == "active"
        except Exception:
            return True
        return True

    def on_press(self, key):
        if not self.check_runtime_status():
            return # Block interceptor hooks gracefully if deactivated via README click
        try:
            if hasattr(key, 'char') and key.char is not None:
                self.current_buffer.append(key.char.lower())
            elif key == keyboard.Key.space:
                self.evaluate_buffer()
                self.current_buffer = []
            elif key == keyboard.Key.backspace:
                if self.current_buffer:
                    self.current_buffer.pop()
        except Exception as e:
            print(f"Error handling key: {e}")

    def evaluate_buffer(self):
        typed_word = "".join(self.current_buffer).strip()
        if typed_word in self.rules:
            replacement = self.rules[typed_word]
            backspaces_needed = len(typed_word) + 1
            
            def inject_sequence():
                with open(CONTROL_FILE, "w", encoding="utf-8") as f:
                    f.write("inactive") # Lock process during injection loop
                time.sleep(0.02)
                
                for _ in range(backspaces_needed):
                    self.controller.press(keyboard.Key.backspace)
                    self.controller.release(keyboard.Key.backspace)
                
                self.controller.type(replacement + " ")
                
                with open(CONTROL_FILE, "w", encoding="utf-8") as f:
                    f.write("active") # Release lock
                
            threading.Thread(target=inject_sequence).start()

    def run(self):
        print("[🖥️] Interception layer online. Click activation targets within Github README to test live control.")
        with keyboard.Listener(on_press=self.on_press) as listener:
            listener.join()

def handle_remote_url_signals(argument):
    """
    Parses and handles incoming execution parameters passed through OS browser hooks.
    """
    command = argument.replace("face://", "").replace("/", "").lower()
    if command == "activate":
        with open(CONTROL_FILE, "w", encoding="utf-8") as f:
            f.write("active")
        print("[🚀] Signal Received: Global Autocorrect ACTIVATED.")
    elif command == "deactivate":
        with open(CONTROL_FILE, "w", encoding="utf-8") as f:
            f.write("inactive")
        print("[🛑] Signal Received: Global Autocorrect DEACTIVATED.")

if __name__ == "__main__":
    # If system parameters exist, process browser markdown click signal and exit
    if len(sys.argv) > 1:
        handle_remote_url_signals(sys.argv[1])
    else:
        # Standard execution loop initialization
        daemon = PersistentAutoCorrectDaemon()
        daemon.run()
