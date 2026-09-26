import json
import os

os.environ["FLAGS_use_mkldnn"] = "0"

from paddleocr import PaddleOCR

ocr = PaddleOCR(
    use_doc_orientation_classify=False,
    use_doc_unwarping=False,
    use_textline_orientation=False,
    device="cpu",
)

result = ocr.predict("bills/bill1.jpeg")

output = []

for res in result:
    data = res.json
    output.append(data)

with open("ocr_result.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("OCR result saved to ocr_result.json")
