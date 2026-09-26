import json
import re

with open("ocr_result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

result = data[0]["res"]

texts = result["rec_texts"]
boxes = result["rec_boxes"]

ignored = {
    "Total Sales (VAT Inclusive)",
    "Amount",
    "Price",
    "ARTICLES",
}

print("\nProduct candidates:\n")

for text, box in zip(texts, boxes):
    x1, y1, x2, y2 = box
    text = text.strip()

    # Middle product-description column
    in_product_column = 130 <= x1 <= 360

    # Ignore headers / totals
    not_ignored = text not in ignored

    # Ignore pure numbers
    is_number = bool(re.fullmatch(r"[\d.,\-]+", text))

    # Ignore very short OCR noise
    long_enough = len(text) >= 4

    if (
        in_product_column
        and not_ignored
        and not is_number
        and long_enough
    ):
        print(
            f"{text:<35} "
            f"x={x1:3} y={y1:3}"
        )
