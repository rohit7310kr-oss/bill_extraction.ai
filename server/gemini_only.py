import os
import json
import base64
from google import genai

IMAGE_PATH = "bills/bill1.jpeg"

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

with open(IMAGE_PATH, "rb") as f:
    image_base64 = base64.b64encode(f.read()).decode("utf-8")

prompt = """
Analyze this invoice image and extract every product/service line item.

Return ONLY valid JSON in this exact structure:

{
  "items": [
    {
      "description": "",
      "quantity": "",
      "unit_price": "",
      "total": "",
      "confidence": 0.0
    }
  ]
}

Rules:
- Identify every separate item/medicine row.
- Do not include customer details, invoice number, GST number,
  HSN codes, batch numbers, tax summaries, or other non-item information.
- Preserve the item's description as accurately as possible.
- Preserve quantities and prices exactly as shown.
- Do not perform calculations or invent missing values.
- If a field is unclear or absent, use "".
- confidence must be a number from 0 to 1 representing your confidence
  in the extraction of that item.
- Return ONLY the JSON. No markdown or explanation.
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

print("\n===== GEMINI ONLY RESULT =====\n")
print(response.output_text)

try:
    result = json.loads(response.output_text)

    with open("gemini_only_result.json", "w") as f:
        json.dump(result, f, indent=2)

    print("\nSaved to gemini_only_result.json")

except json.JSONDecodeError:
    print("\nGemini did not return valid JSON.")
