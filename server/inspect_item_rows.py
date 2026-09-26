import json

with open("ocr_result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

result = data[0]["res"]

texts = result["rec_texts"]
boxes = result["rec_boxes"]

items = []

for text, box in zip(texts, boxes):

    text = text.strip()

    if text.isdigit() and 1 <= int(text) <= 12:

        x1, y1, x2, y2 = box

        items.append({
            "number": int(text),
            "y": y1
        })


items.sort(key=lambda item: item["y"])

print("\nOCR item positions:\n")

for item in items:
    print(
        f"Item {item['number']:2} "
        f"starts around y={item['y']}"
    )
