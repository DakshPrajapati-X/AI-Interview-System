try {
  const pdfParseExports = require('pdf-parse');
  console.log("pdf-parse exports:", Object.keys(pdfParseExports));
  console.log("pdf-parse exports direct typeof:", typeof pdfParseExports);
} catch (err) {
  console.error("Error loading pdf-parse:", err);
}
