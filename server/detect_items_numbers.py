import json

with open("ocr_result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

result = data[0]["res"]

texts = result["rec_texts"]
boxes = result["rec_boxes"]

print("\nDetected item numbers:\n")

for text, box in zip(texts, boxes):

    text = text.strip()

    if text.isdigit() and 1 <= int(text) <= 12:

        x1, y1, x2, y2 = box

        print(
            f"item={text:2} "
            f"x={x1:3} "
            f"y={y1:3} "
            f"x2={x2:3} "
            f"y2={y2:3}"
        )
