import json

with open("ocr_result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

result = data[0]["res"]

texts = result["rec_texts"]
boxes = result["rec_boxes"]

items = []

for text, box in zip(texts, boxes):
    x1, y1, x2, y2 = box

    # Product table only
    if 295 <= y1 <= 750:
        items.append({
            "text": text.strip(),
            "x": x1,
            "y": y1,
            "y2": y2
        })

# Sort top-to-bottom
items.sort(key=lambda item: item["y"])

rows = []

TOLERANCE = 15

for item in items:

    placed = False

    for row in rows:

        # Compare with the average Y position of the row
        avg_y = sum(x["y"] for x in row) / len(row)

        if abs(item["y"] - avg_y) <= TOLERANCE:
            row.append(item)
            placed = True
            break

    if not placed:
        rows.append([item])


print("\nGrouped rows:\n")

for i, row in enumerate(rows, start=1):

    # Sort each row from left to right
    row.sort(key=lambda item: item["x"])

    print(f"\nROW {i}")

    for item in row:
        print(
            f"  x={item['x']:3} "
            f"y={item['y']:3} "
            f"{item['text']}"
        )
