export const BILL_EXTRACTION_API_URL =
  "https://bill-extraction-ai.onrender.com/extract-bill";

export async function extractBillItems(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(BILL_EXTRACTION_API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(
      "The bill could not be processed right now. Please try again.",
    );
  }

  let data;

  try {
    data = await response.json();
  } catch (error) {
    throw new Error(
      "The server returned an invalid response. Please try again.",
    );
  }

  if (!data || !Array.isArray(data.items)) {
    throw new Error("The response did not include any bill items.");
  }

  if (data.items.length === 0) {
    throw new Error("No items were found in this bill image.");
  }

  return data.items;
}
