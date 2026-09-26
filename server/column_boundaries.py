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
            "name": clean,
            "center": (x1 + x2) / 2
        })

headers.sort(key=lambda h: h["center"])

print("\nColumn boundaries:\n")

for i, header in enumerate(headers):
    if i == 0:
        left = 0
    else:
        left = (headers[i - 1]["center"] + header["center"]) / 2

    if i == len(headers) - 1:
        right = 736
    else:
        right = (header["center"] + headers[i + 1]["center"]) / 2

    print(
        f"{header['name']:12} "
        f"{left:6.1f} → {right:6.1f}"
    )
