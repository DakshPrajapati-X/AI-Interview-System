const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

async function testPDFParsing() {
  try {
    const pdfPath = path.join(__dirname, 'sample_pdf.pdf');
    const buffer = fs.readFileSync(pdfPath);
    
    console.log("PDF file read, size:", buffer.length);
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    console.log("Text extraction result:", result.text);
    await parser.destroy();
  } catch (err) {
    console.error("PDF Parsing failed:", err);
  }
}

testPDFParsing();
