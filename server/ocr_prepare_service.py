def prepare_ocr(data):
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

    return records
