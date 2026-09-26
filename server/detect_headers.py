import json

with open("ocr_result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

result = data[0]["res"]

texts = result["rec_texts"]
boxes = result["rec_boxes"]

header_words = [
    "list",
    "description",
    "quantity",
    "unit price",
    "total"
]

print("\nDetected table headers:\n")

for text, box in zip(texts, boxes):
    clean = text.strip().lower()

    if clean in header_words:
        x1, y1, x2, y2 = box

        print(
            f"{text:15} "
            f"x={x1:3} y={y1:3} "
            f"x2={x2:3} y2={y2:3}"
        )
