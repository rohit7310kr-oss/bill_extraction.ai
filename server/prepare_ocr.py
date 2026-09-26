import json

with open("ocr_result.json", "r") as f:
    data = json.load(f)

if isinstance(data, list):
    data = data[0]

res = data["res"]

records = []

for text, score, box in zip(
    res["rec_texts"],
    res["rec_scores"],
    res["rec_boxes"]
):
    records.append({
        "text": text,
        "confidence": round(float(score), 3),
        "box": box
    })

with open("ocr_compact.json", "w") as f:
    json.dump(records, f, indent=2)

print(f"Saved {len(records)} OCR records to ocr_compact.json")
