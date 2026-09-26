import json
from PIL import Image, ImageDraw, ImageFont

with open("ocr_result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

result = data[0]["res"]

texts = result["rec_texts"]
boxes = result["rec_boxes"]

image = Image.open("bills/bill1.jpeg").convert("RGB")
draw = ImageDraw.Draw(image)

for text, box in zip(texts, boxes):

    x1, y1, x2, y2 = box

    draw.rectangle(
        [x1, y1, x2, y2],
        outline="red",
        width=2
    )

    draw.text(
        (x1, max(0, y1 - 15)),
        text.strip(),
        fill="red"
    )

image.save("ocr_debug.jpeg")

print("Saved OCR visualization to ocr_debug.jpeg")
