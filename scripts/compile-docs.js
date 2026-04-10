const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const docsDir = path.join(__dirname, '..', 'public', 'docs');

async function compileDocs() {
  const files = fs.readdirSync(docsDir).filter(file => file.endsWith('.docx'));

  for (const file of files) {
    const docPath = path.join(docsDir, file);
    const htmlPath = path.join(docsDir, file.replace('.docx', '.html'));

    console.log(`Processing ${file}...`);
    try {
      const result = await mammoth.convertToHtml({ path: docPath });
      let html = result.value; // The generated HTML
      // Add a bit of styling to the HTML inline so it looks somewhat like a document if needed
      fs.writeFileSync(htmlPath, html);
      console.log(`Successfully compiled ${file} to HTML.`);
      if (result.messages.length > 0) {
        console.log('Messages:', result.messages);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

compileDocs();
