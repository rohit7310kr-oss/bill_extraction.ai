import json

with open("ocr_result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

result = data[0]["res"]

texts = result["rec_texts"]
boxes = result["rec_boxes"]

# Dynamically detected column boundaries
boundaries = [
    ("list", 0.0, 95.5),
    ("description", 95.5, 292.5),
    ("quantity", 292.5, 494.5),
    ("unit price", 494.5, 590.2),
    ("total", 590.2, 736.0)
]

HEADER_BOTTOM = 380

print("\nOCR elements assigned to columns:\n")

for text, box in zip(texts, boxes):

    x1, y1, x2, y2 = box

    if y1 <= HEADER_BOTTOM:
        continue

    center_x = (x1 + x2) / 2

    column = None

    for name, left, right in boundaries:
        if left <= center_x < right:
            column = name
            break

    if column:
        print(
            f"{column:12} "
            f"x={x1:3}-{x2:3} "
            f"y={y1:3} "
            f"{text.strip()}"
        )
