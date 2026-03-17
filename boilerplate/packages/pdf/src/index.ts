import { renderToBuffer } from "@react-pdf/renderer";

// PDF service
export interface PDFGenerationOptions {
  filename?: string;
}

export async function generatePDFBuffer(
  element: React.ReactElement,
  options?: PDFGenerationOptions
): Promise<Buffer> {
  try {
    const buffer = await renderToBuffer(element);
    return buffer;
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    throw new Error("PDF generation failed");
  }
}

// Re-export templates
export * from "./templates/ticket-pdf";
