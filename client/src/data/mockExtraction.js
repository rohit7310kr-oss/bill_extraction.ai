export const mockExtractionData = [
  {
    description: "Rigid elast. Paint (white)",
    quantity: "5",
    unit_price: "600-",
    total: "3,000.00",
    confidence: 0.95,
  },
  {
    description: "B/S Sanding Sealer",
    quantity: "1",
    unit_price: "600-",
    total: "600.00",
    confidence: 0.9,
  },
  {
    description: "Clear gloss lacq.",
    quantity: "1",
    unit_price: "630-",
    total: "630.00",
    confidence: 0.95,
  },
  {
    description: "Brush cleaning solvent",
    quantity: "2",
    unit_price: "220-",
    total: "440.00",
    confidence: 0.72,
  },
];

export function getMockExtractionData() {
  return mockExtractionData.map((item) => ({ ...item }));
}
