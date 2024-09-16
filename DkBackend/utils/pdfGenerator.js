const PDFDocument = require("pdfkit");

function generatePDF(content) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        let buffers = [];
        
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });
        doc.on('error', reject); // Handle errors

        doc.text(content);
        doc.end();
    });
}

module.exports = { generatePDF };
