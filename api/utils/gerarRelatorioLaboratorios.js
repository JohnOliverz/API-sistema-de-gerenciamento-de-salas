const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function gerarRelatorioLaboratorios(laboratorios, outputPath) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outputPath));

  doc.fontSize(20).text('Relatório de Laboratórios', { align: 'center' });
  doc.moveDown();

  for (const lab of laboratorios) {
    doc.fontSize(14).text(`Nome: ${lab.nome}`);
    doc.text(`Descrição: ${lab.descricao}`);
    doc.text(`Capacidade: ${lab.capacidade}`);

    if (lab.foto) {
      try {
        const response = await axios.get(lab.foto, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'base64');
        const tempPath = path.join(__dirname, `temp_${Date.now()}.jpg`);
        fs.writeFileSync(tempPath, buffer);
        doc.image(tempPath, { width: 200 });
        fs.unlinkSync(tempPath);
      } catch (err) {
        doc.text('[Erro ao carregar imagem]');
      }
    }

    doc.moveDown();
  }

  doc.end();
}

module.exports = gerarRelatorioLaboratorios;