import ollama

image_path = "bills/bill1.jpeg"

prompt = """
Look at this bill image.

Extract only the products/services from the table.

Return ONLY valid JSON in this exact format:
[
  {
    "description": "",
    "quantity": "",
    "unit_price": "",
    "total": ""
  }
]

If a value is unclear, use an empty string.
Do not explain anything.
"""
print("Sending image to Qwen...")
response = ollama.chat(
    model="qwen3-vl:2b",
    messages=[
        {
            "role": "user",
            "content": prompt,
            "images": [image_path]
        }
    ],
    options={
        "num_predict": 500
    }
)

print("FULL RESPONSE:")
print(response)

