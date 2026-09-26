import json

with open("ocr_result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

result = data[0]["res"]

texts = result["rec_texts"]
boxes = result["rec_boxes"]

HEADER_BOTTOM = 380

print("\nElements below table header:\n")

for text, box in zip(texts, boxes):

    x1, y1, x2, y2 = box

    if y1 > HEADER_BOTTOM:
        print(
            f"x={x1:3} "
            f"y={y1:3} "
            f"x2={x2:3} "
            f"y2={y2:3} "
            f"{text.strip()}"
        )

