import json

with open("ocr_result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

result = data[0]["res"]

texts = result["rec_texts"]
scores = result["rec_scores"]

for i, (text, score) in enumerate(zip(texts, scores), start=1):
    print(f"{i:02}. {text}  [{score:.2f}]")
