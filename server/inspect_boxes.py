import json

with open("ocr_result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

result = data[0]["res"]

texts = result["rec_texts"]
boxes = result["rec_boxes"]
scores = result["rec_scores"]

for i, (text, box, score) in enumerate(
    zip(texts, boxes, scores), start=1
):
    x1, y1, x2, y2 = box

    print(
        f"{i:02}. "
        f"{text:<35} "
        f"x={x1:4}, y={y1:4}, "
        f"x2={x2:4}, y2={y2:4}, "
        f"conf={score:.2f}"
    )
