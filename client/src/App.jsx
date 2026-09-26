import { useRef, useState } from "react";
import BillUploader from "./components/BillUploader";
import EmptyState from "./components/EmptyState";
import ErrorState from "./components/ErrorState";
import ExtractionResults from "./components/ExtractionResults";
import ImagePreview from "./components/ImagePreview";
import ProcessingState from "./components/ProcessingState";
import { extractBillItems } from "./services/billApi";

const processingStages = [
  "Reading bill...",
  "Understanding items...",
  "Preparing results...",
];

function App() {
  const fileInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [extractionItems, setExtractionItems] = useState([]);
  const [submittedHistory, setSubmittedHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showEmptyState, setShowEmptyState] = useState(true);
  const [isEditingMode, setIsEditingMode] = useState(false);

  const handleFileSelect = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!file) return;

    if (!validTypes.includes(file.type)) {
      setErrorMessage(
        "Only JPG, JPEG, PNG, and WEBP files are supported in this prototype.",
      );
      setIsProcessing(false);
      setShowEmptyState(false);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(previewUrl);
    setSelectedFile(file);
    setImageFileName(file.name);
    setErrorMessage("");
    setShowEmptyState(false);
    setIsEditingMode(false);
    setCurrentStage(0);
    setExtractionItems([]);

    handleExtractBill(file);
  };

  const handleExtractBill = async (incomingFile) => {
    const file =
      incomingFile || selectedFile || fileInputRef.current?.files?.[0];

    if (!file) {
      setErrorMessage(
        "No file was selected. Please choose a bill image first.",
      );
      setShowEmptyState(false);
      return;
    }

    setErrorMessage("");
    setIsProcessing(true);
    setCurrentStage(0);
    setIsEditingMode(false);

    const stageTimer = setInterval(() => {
      setCurrentStage((previous) => {
        if (previous >= processingStages.length - 1) {
          clearInterval(stageTimer);
          return previous;
        }

        return previous + 1;
      });
    }, 1100);

    try {
      const items = await extractBillItems(file);
      clearInterval(stageTimer);
      setExtractionItems(items);
      setIsProcessing(false);
      setCurrentStage(processingStages.length - 1);
    } catch (error) {
      clearInterval(stageTimer);
      setIsProcessing(false);
      setCurrentStage(processingStages.length - 1);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while extracting the bill.",
      );
      setShowEmptyState(false);
      setExtractionItems([]);
    }
  };

  const handleRetry = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsProcessing(false);
    setShowEmptyState(false);
    if (selectedImage) {
      handleExtractBill();
    }
  };

  const handleSubmitExtractedItems = () => {
    if (!extractionItems.length) {
      setErrorMessage("There are no extracted items to submit yet.");
      setSuccessMessage("");
      return;
    }

    const newEntry = {
      id: Date.now(),
      fileName: imageFileName || "Uploaded bill",
      itemCount: extractionItems.length,
      submittedAt: new Date().toLocaleString(),
      items: extractionItems,
    };

    setSubmittedHistory((previous) => [newEntry, ...previous]);
    setSuccessMessage("Extracted items saved to history.");
    setErrorMessage("");
  };

  const handleUploadAnother = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setImageFileName("");
    setExtractionItems([]);
    setSubmittedHistory([]);
    setErrorMessage("");
    setSuccessMessage("");
    setIsProcessing(false);
    setCurrentStage(0);
    setShowEmptyState(true);
    setIsEditingMode(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const updateItem = (index, field, value) => {
    setExtractionItems((currentItems) =>
      currentItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const addItem = () => {
    setExtractionItems((currentItems) => [
      ...currentItems,
      {
        description: "New item",
        quantity: "1",
        unit_price: "0.00",
        total: "0.00",
        confidence: 0.8,
      },
    ]);
  };

  const removeItem = (index) => {
    setExtractionItems((currentItems) =>
      currentItems.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f8fbff,#f4f7fb_40%,#eef3f9_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
              AI
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Chat2Bill
              </p>
              <h1 className="text-base font-semibold text-slate-800">
                Invoice extractor
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExtractBill}
              disabled={!selectedImage || isProcessing}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedImage && !isProcessing
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "pointer-events-none bg-slate-200 text-slate-500"
              }`}
            >
              {isProcessing ? "Analyzing bill..." : "Extract Bill"}
            </button>
            <button
              type="button"
              onClick={handleUploadAnother}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Upload Another
            </button>
            {extractionItems.length > 0 && (
              <button
                type="button"
                onClick={() => setIsEditingMode((value) => !value)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                {isEditingMode ? "Done Editing" : "Edit Results"}
              </button>
            )}
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Save / Download
            </button>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[1.02fr_1.38fr]">
          <section className="space-y-5">
            {showEmptyState && !selectedImage && !errorMessage ? (
              <EmptyState onUpload={() => fileInputRef.current?.click()} />
            ) : selectedImage ? (
              <ImagePreview
                imageSrc={selectedImage}
                fileName={imageFileName}
                onRemove={() => {
                  setSelectedImage(null);
                  setSelectedFile(null);
                  setImageFileName("");
                  setExtractionItems([]);
                  setErrorMessage("");
                  setShowEmptyState(true);
                  setIsEditingMode(false);
                }}
                onChange={() => fileInputRef.current?.click()}
              />
            ) : (
              <BillUploader
                onFileSelect={handleFileSelect}
                isProcessing={isProcessing}
              />
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              capture="environment"
              className="hidden"
              onChange={(event) => handleFileSelect(event.target.files?.[0])}
            />

            {errorMessage && (
              <ErrorState
                message={errorMessage}
                onRetry={handleRetry}
                onUploadAnother={handleUploadAnother}
              />
            )}

            {!selectedImage && !showEmptyState && !errorMessage && (
              <BillUploader
                onFileSelect={handleFileSelect}
                isProcessing={isProcessing}
              />
            )}
          </section>

          <section>
            {isProcessing ? (
              <ProcessingState
                stages={processingStages}
                currentStage={currentStage}
              />
            ) : extractionItems.length > 0 ? (
              <div className="space-y-5">
                <ExtractionResults
                  items={extractionItems}
                  onChange={updateItem}
                  onDelete={removeItem}
                  onAddItem={addItem}
                />

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleSubmitExtractedItems}
                    className="rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-500"
                  >
                    Submit Extracted Items
                  </button>
                  <button
                    type="button"
                    onClick={handleUploadAnother}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Re-upload New Bill
                  </button>
                </div>

                {successMessage && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {successMessage}
                  </div>
                )}

                {submittedHistory.length > 0 && (
                  <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      History
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">
                      Submitted bills
                    </h3>

                    <div className="mt-4 space-y-3">
                      {submittedHistory.map((entry) => (
                        <div
                          key={entry.id}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {entry.fileName}
                              </p>
                              <p className="text-xs text-slate-500">
                                {entry.submittedAt}
                              </p>
                            </div>
                            <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">
                              {entry.itemCount} items
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Awaiting upload
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                  No extracted items yet
                </h2>
                <p className="mt-2 max-w-lg text-sm text-slate-600">
                  Upload a bill image and click Extract Bill to preview the mock
                  extraction workflow.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
