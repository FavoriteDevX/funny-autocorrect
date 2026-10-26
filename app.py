import time
import json
import threading
from pynput import keyboard

class FunnyAutoCorrectEngine:
    def __init__(self, dictionary_path="dictionary.json"):
        self.controller = keyboard.Controller()
        self.current_buffer = []
        self.load_dictionary(dictionary_path)
        self.is_active = True
        print("[🚀] FACE Engine Initialized. Type freely... at your own risk.")

    def load_dictionary(self, path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                self.rules = json.load(f)
        except Exception:
            # High-fidelity multi-language fallback logic if JSON is unreadable
            self.rules = {
                "en": {
                    "hello": "salutations, mortal peasant",
                    "meeting": "ritualistic corporate gathering",
                    "boss": "Supreme Overlord of my Misery",
                    "deadline": "moment of imminent doom"
                },
                "pt": {
                    "bom dia": "que o apocalipse seja leve hoje",
                    "trabalho": "tortura medieval assalariada",
                    "chefe": "ditador supremo do meu rebanho"
                }
            }

    def flatten_rules(self):
        flat = {}
        for lang, words in self.rules.items():
            for k, v in words.items():
                flat[k.lower()] = v
        return flat

    def on_press(self, key):
        if not self.is_active:
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
        except Exception as e:
            print(f"Error logging key: {e}")

    def evaluate_buffer(self):
        typed_word = "".join(self.current_buffer).strip()
        flat_rules = self.flatten_rules()
        
        if typed_word in flat_rules:
            replacement = flat_rules[typed_word]
            backspaces_needed = len(typed_word) + 1
            
            def inject():
                self.is_active = False
                time.sleep(0.05)
                for _ in range(backspaces_needed):
                    self.controller.press(keyboard.Key.backspace)
                    self.controller.release(keyboard.Key.backspace)
                
                self.controller.type(replacement + " ")
                self.is_active = True
                
            threading.Thread(target=inject).start()

    def run(self):
        with keyboard.Listener(on_press=self.on_press) as listener:
            listener.join()

if __name__ == "__main__":
    engine = FunnyAutoCorrectEngine()
    engine.run()
