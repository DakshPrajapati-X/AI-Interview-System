const fs = require('fs');

function generateSimplePDF() {
  const textContent = "John Doe Resume. Skills: React, Node.js, Express, JavaScript, SQL. Experience: Senior Software Engineer at Tech Corp. Education: BS in CS.";
  
  // A minimal valid PDF structure with our text
  const pdfHeader = "%PDF-1.4\n";
  
  const obj1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
  const obj2 = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
  const obj3 = "3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n";
  const obj4 = "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";
  
  // The stream containing text
  const streamContent = `BT\n/F1 12 Tf\n50 700 Td\n(${textContent}) Tj\nET\n`;
  const obj5 = `5 0 obj\n<< /Length ${streamContent.length} >>\nstream\n${streamContent}endstream\nendobj\n`;
  
  const body = pdfHeader + obj1 + obj2 + obj3 + obj4 + obj5;
  
  // Simple trailer
  const startxref = body.length;
  const trailer = `xref\n0 6\n0000000000 65535 f \n` +
                  `0000000009 00000 n \n` +
                  `0000000054 00000 n \n` +
                  `0000000109 00000 n \n` +
                  `0000000201 00000 n \n` +
                  `0000000282 00000 n \n` +
                  `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;
  
  const pdfContent = body + trailer;
  fs.writeFileSync('test-files/sample_pdf.pdf', pdfContent, 'binary');
  console.log("Successfully generated test-files/sample_pdf.pdf");
}

generateSimplePDF();
