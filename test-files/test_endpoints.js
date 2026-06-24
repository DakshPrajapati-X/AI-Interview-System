const fs = require('fs');
const path = require('path');

async function testUpload() {
  console.log("=== Testing Valid Resume Upload (.txt) ===");
  try {
    const resumePath = path.join(__dirname, 'resume.txt');
    const fileContent = fs.readFileSync(resumePath);
    const blob = new Blob([fileContent], { type: 'text/plain' });
    
    const formData = new FormData();
    formData.append('resume', blob, 'resume.txt');

    const res = await fetch('http://localhost:5000/api/interview/resume', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log("Response:", JSON.stringify(data, null, 2).substring(0, 500));
  } catch (err) {
    console.error("Error during valid upload test:", err);
  }

  console.log("\n=== Testing Valid PDF Resume Upload (.pdf) ===");
  try {
    const resumePath = path.join(__dirname, 'sample_pdf.pdf');
    const fileContent = fs.readFileSync(resumePath);
    const blob = new Blob([fileContent], { type: 'application/pdf' });
    
    const formData = new FormData();
    formData.append('resume', blob, 'sample_pdf.pdf');

    const res = await fetch('http://localhost:5000/api/interview/resume', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log("Response:", JSON.stringify(data, null, 2).substring(0, 500));
  } catch (err) {
    console.error("Error during PDF upload test:", err);
  }

  console.log("\n=== Testing Invalid File Format Upload (.js) ===");
  try {
    const blob = new Blob(["const x = 1;"], { type: 'application/javascript' });
    const formData = new FormData();
    formData.append('resume', blob, 'test.js');

    const res = await fetch('http://localhost:5000/api/interview/resume', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log("Response:", data);
  } catch (err) {
    console.error("Error during invalid upload test:", err);
  }

  console.log("\n=== Testing Empty File Upload ===");
  try {
    const blob = new Blob([""], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('resume', blob, 'empty.txt');

    const res = await fetch('http://localhost:5000/api/interview/resume', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log("Response:", data);
  } catch (err) {
    console.error("Error during empty upload test:", err);
  }
}

testUpload();
