import json

with open("ocr_result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

result = data[0]["res"]

texts = result["rec_texts"]
boxes = result["rec_boxes"]

print("\nDescription-column OCR:\n")

for text, box in zip(texts, boxes):

    x1, y1, x2, y2 = box

    # Description column
    if 70 <= x1 <= 300:

        # Only table area
        if 380 <= y1 <= 850:

            print(
                f"x={x1:3}-{x2:3} "
                f"y={y1:3}-{y2:3} "
                f"{text.strip()}"
            )
