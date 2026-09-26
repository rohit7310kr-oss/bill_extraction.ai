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

headers = []

for text, box in zip(texts, boxes):
    clean = text.strip().lower()

    if clean in header_words:
        x1, y1, x2, y2 = box

        headers.append({
            "text": text.strip(),
            "x1": x1,
            "y1": y1,
            "x2": x2,
            "y2": y2
        })

if not headers:
    print("No table headers detected.")
    exit()

header_bottom = max(h["y2"] for h in headers)

print("\nTable detected")
print("----------------")
print("Header bottom Y:", header_bottom)

print("\nHeaders:")

for h in sorted(headers, key=lambda h: h["x1"]):
    print(
        f"{h['text']:15} "
        f"x={h['x1']:3} "
        f"y={h['y1']:3} "
        f"x2={h['x2']:3} "
        f"y2={h['y2']:3}"
    )
