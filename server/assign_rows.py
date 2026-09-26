import json

with open("ocr_result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

result = data[0]["res"]

texts = result["rec_texts"]
boxes = result["rec_boxes"]

START_Y = 419
ROW_HEIGHT = 37

print("\nOCR text assigned to rows:\n")

for text, box in zip(texts, boxes):

    x1, y1, x2, y2 = box

    # Ignore everything above the table
    if y2 < START_Y:
        continue

    # Ignore everything after the table
    if y1 >= START_Y + (12 * ROW_HEIGHT):
        continue

    # Use the center of the OCR box
    center_y = (y1 + y2) / 2

    row_number = int((center_y - START_Y) // ROW_HEIGHT) + 1

    if 1 <= row_number <= 12:
        print(
            f"Row {row_number:2} | "
            f"x={x1:3}-{x2:3} | "
            f"y={y1:3}-{y2:3} | "
            f"{text.strip()}"
        )
