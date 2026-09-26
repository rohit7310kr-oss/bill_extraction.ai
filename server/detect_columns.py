import json

with open("ocr_result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

result = data[0]["res"]

texts = result["rec_texts"]
boxes = result["rec_boxes"]

header_words = {
    "list",
    "description",
    "quantity",
    "unit price",
    "total"
}

columns = {}

for text, box in zip(texts, boxes):
    clean = text.strip().lower()

    if clean in header_words:
        x1, y1, x2, y2 = box
        center_x = (x1 + x2) / 2

        columns[clean] = {
            "left": x1,
            "right": x2,
            "center": center_x
        }

print("\nDetected columns:\n")

for name, col in sorted(columns.items(), key=lambda item: item[1]["center"]):
    print(
        f"{name:12} "
        f"left={col['left']:3} "
        f"right={col['right']:3} "
        f"center={col['center']:.1f}"
    )
