import os
import json
import base64

from google import genai


client = genai.Client(
    api_key=os.environ["GEMINI_API_KEY"]
)


def extract_bill_with_gemini(image_path, ocr_data):

    ocr_text = json.dumps(
        ocr_data,
        ensure_ascii=False,
        indent=2
    )

    with open(image_path, "rb") as f:
        image_data = f.read()

    image_base64 = base64.b64encode(image_data).decode("utf-8")

    prompt = f"""
You are extracting structured data from a purchase/service bill.

You have TWO sources of information:

1. The original bill image.
2. OCR results containing text, confidence scores, and bounding boxes.

Use the ORIGINAL IMAGE as the primary source for understanding what is actually
written on the bill.

Use the OCR data to help locate text and reconstruct table rows and columns.

IMPORTANT:
- Do not blindly trust OCR.
- OCR contains errors.
- Do not invent information.
- Preserve information that is actually visible in the bill.
- The table starts around the headers:
  List | Description | Quantity | Unit Price | Total
- Multiple lines belonging to the same description should be combined into
  the same item.
- Do not merge separate numbered rows into one item.
- Ignore headers, contact information, payment information, footer text,
  and other non-item information.
- If a field is genuinely unreadable or absent, return an empty string.
- Keep the original wording as much as possible.

Return ONLY valid JSON.

Required format:

{{
  "items": [
    {{
      "description": "",
      "quantity": "",
      "unit_price": "",
      "total": "",
      "confidence": 0.0
    }}
  ]
}}

For each item:
- confidence must be a number between 0 and 1.
- Give a high confidence only when the item is clearly supported by the image and OCR.
- Give a lower confidence when text, row boundaries, quantity, price, or total is ambiguous.
- Do not invent missing values.
- Use an empty string when a field is absent or cannot be reliably determined.

OCR DATA:

{ocr_text}
"""

    response = client.interactions.create(
        model="gemini-3.8-flash",
        input=[
            {
                "type": "text",
                "text": prompt
            },
            {
                "type": "image",
                "data": image_base64,
                "mime_type": "image/jpeg"
            }
        ]
    )

    result_text = response.output_text.strip()

    if result_text.startswith("```"):
        result_text = result_text.replace("```json", "", 1)
        result_text = result_text.replace("```", "", 1)
        result_text = result_text.strip()

    result = json.loads(result_text)

    return result
