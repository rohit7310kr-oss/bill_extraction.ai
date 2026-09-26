import json

with open("ocr_compact.json", "r") as f:
    data = json.load(f)

# List column is approximately x = 30–70
list_candidates = []

for item in data:
    x1, y1, x2, y2 = item["box"]

    text = item["text"].strip()

    # Only look near the List column
    if x1 <= 70 and x2 <= 70:
        if text.isdigit():
            list_candidates.append({
                "number": int(text),
                "y": y1,
                "box": item["box"],
                "confidence": item["confidence"]
            })

print("Detected list numbers:\n")

for item in list_candidates:
    print(
        f'List={item["number"]:>2} '
        f'y={item["y"]:>3} '
        f'confidence={item["confidence"]:.3f}'
    )
