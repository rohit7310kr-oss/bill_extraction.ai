import json

with open("ocr_result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

result = data[0]["res"]

texts = result["rec_texts"]
boxes = result["rec_boxes"]

summary_words = [
    "amount paid",
    "payment method",
    "authorized by",
    "total amount",
    "amount due",
    "vat",
    "subtotal",
    "grand total"
]

print("\nPossible table-ending markers:\n")

for text, box in zip(texts, boxes):

    clean = text.strip().lower()

    for word in summary_words:
        if word in clean:
            x1, y1, x2, y2 = box

            print(
                f"{text.strip():30} "
                f"x={x1:3} y={y1:3} "
                f"x2={x2:3} y2={y2:3}"
            )
            break
