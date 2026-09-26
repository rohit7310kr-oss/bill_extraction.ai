import cv2

image = cv2.imread("bills/bill1.jpeg")

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

_, binary = cv2.threshold(
    gray,
    180,
    255,
    cv2.THRESH_BINARY_INV
)

horizontal_kernel = cv2.getStructuringElement(
    cv2.MORPH_RECT,
    (40, 1)
)

horizontal_lines = cv2.morphologyEx(
    binary,
    cv2.MORPH_OPEN,
    horizontal_kernel
)

contours, _ = cv2.findContours(
    horizontal_lines,
    cv2.RETR_EXTERNAL,
    cv2.CHAIN_APPROX_SIMPLE
)

lines = []

for contour in contours:

    x, y, w, h = cv2.boundingRect(contour)

    if w > 100:
        lines.append((x, y, w, h))


# Keep only likely table row lines
table_lines = []

for x, y, w, h in lines:

    if 400 <= y <= 720 and w > 600:
        table_lines.append((x, y, w, h))


table_lines.sort(key=lambda line: line[1])

print("\nLikely table row lines:\n")

for x, y, w, h in table_lines:
    print(f"y={y:3}  width={w:3}")
