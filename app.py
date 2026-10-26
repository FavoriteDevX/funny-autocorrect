import sys
import time

def chaotic_autocorrect_live_engine():
    # Production-grade mapping database for look-alike English words
    look_alike_dictionary = {
        "think": "thing",
        "thought": "taught",
        "thank": "tank",
        "thanks": "tanks",
        "please": "fleas",
        "could": "cold",
        "would": "wood",
        "should": "shout",
        "going": "gong",
        "want": "wart",
        "need": "knee",
        "people": "purple",
        "friend": "fried",
        "friends": "fries",
        "house": "horse",
        "home": "honed",
        "life": "lime",
        "time": "dime",
        "world": "worm",
        "work": "pork",
        "boss": "bass",
        "coffee": "coffin",
        "water": "waiter",
        "phone": "prawn",
        "money": "monkey",
        "happy": "hippo",
        "sorry": "safari",
        "tired": "tried",
        "busy": "busty"
    }

    print("\n" + "="*60)
    print("🤪 FACE - INSTANT ONE-LINE AUTOCORRECT PIPELINE ONLINE")
    print("="*60)
    print("Engine active for user: FavoriteDevX")
    print("Type sentences using common words like: please, boss, coffee, money, house, friends...")
    print("Type 'exit' to shut down the engine matrix.\n")

    while True:
        try:
            # Handle interactive command line piping entry points
            user_input = input("✏️ Type here: ")
            if user_input.strip().lower() == "exit":
                print("\n🛑 Shutting down engine matrix gracefully...")
                break
                
            input_tokens = user_input.split(" ")
            modified_tokens = []
            has_changes = False

            for token in input_tokens:
                # Strip basic syntax and grammar signs dynamically for precise checks
                clean_token = token.lower().strip(".,!?\"'")
                
                if clean_token in look_alike_dictionary:
                    replacement = look_alike_dictionary[clean_token]
                    fixed_word = token.lower().replace(clean_token, replacement)
                    modified_tokens.append(fixed_word)
                    has_changes = True
                else:
                    modified_tokens.append(token)

            if has_changes:
                # Output yellow highlighted text for visual clarity
                print("🔄 AutoCorrected to: \033[93m" + " ".join(modified_tokens) + "\033[0m\n")
            else:
                print("✨ Passed validation: " + " ".join(modified_tokens) + "\n")
                
        except (KeyboardInterrupt, EOFError):
            print("\n🛑 Shutting down engine matrix gracefully...")
            break

if __name__ == "__main__":
    chaotic_autocorrect_live_engine()
