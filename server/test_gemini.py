from google import genai
import os
import base64

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

with open("bills/bill1.jpeg", "rb") as f:
    image_data = f.read()

image_base64 = base64.b64encode(image_data).decode("utf-8")

response = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {
            "type": "text",
            "text": """
Look at this purchase bill carefully.

Extract ONLY the products/services from the table.

Return ONLY valid JSON in exactly this format:

{
  "items": [
    {
      "description": "",
      "quantity": "",
      "unit_price": "",
      "total": ""
    }
  ]
}

Rules:
- Do not invent information.
- If a value is unclear, use an empty string.
- Do not include explanations.
"""
        },
        {
            "type": "image",
            "data": image_base64,
            "mime_type": "image/jpeg"
        }
    ]
)

print(response.output_text)
