import os
import json

os.environ["FLAGS_use_mkldnn"] = "0"

from paddleocr import PaddleOCR


ocr = PaddleOCR(
    use_doc_orientation_classify=False,
    use_doc_unwarping=False,
    use_textline_orientation=False,
    device="cpu",
)


def extract_ocr(image_path):
    result = ocr.predict(image_path)

    output = []

    for res in result:
        data = res.json
        output.append(data)

    return output
