start_y = 419
row_height = 37

print("\nExpected table row boundaries:\n")

for i in range(13):
    y = start_y + (i * row_height)
    print(f"Boundary {i:2}: y={y}")
