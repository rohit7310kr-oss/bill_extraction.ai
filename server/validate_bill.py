import json
import re
from decimal import Decimal


def extract_number(value):
    if not value:
        return None

    value = str(value).replace(",", "")

    match = re.search(r"\d+(?:\.\d+)?", value)

    if not match:
        return None

    return Decimal(match.group())


def validate_item(item):
    quantity = extract_number(item.get("quantity"))
    unit_price = extract_number(item.get("unit_price"))
    total = extract_number(item.get("total"))

    result = {
        "description": item.get("description", ""),
        "status": "UNVERIFIABLE",
        "message": ""
    }

    # Not enough information for mathematical validation
    if quantity is None or unit_price is None or total is None:
        result["message"] = "Not enough numeric data to validate"
        return result

    calculated_total = quantity * unit_price

    # Allow tiny decimal differences
    if abs(calculated_total - total) < Decimal("0.01"):
        result["status"] = "VALID"
        result["message"] = "Quantity × unit price = total"
    else:
        result["status"] = "INVALID"
        result["message"] = (
            f"Mismatch: expected {calculated_total}, "
            f"but Gemini returned {total}"
        )

    return result


with open("gemini_result.json", "r") as f:
    data = json.load(f)


print("\n===== VALIDATION RESULT =====\n")

for i, item in enumerate(data["items"], 1):

    result = validate_item(item)

    print(f"Item {i}: {result['description']}")
    print(f"Status: {result['status']}")
    print(f"Message: {result['message']}")
    print()
