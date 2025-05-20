const PDFDocument = require('pdfkit');
const axios = require('axios');

async function gerarRelatorioLaboratorios(laboratorios, res) {
  const doc = new PDFDocument();

  // Configura o cabeçalho de resposta HTTP
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=relatorio_laboratorios.pdf');

  // Envia o PDF diretamente no response
  doc.pipe(res);

  // Conteúdo do PDF
  doc.fontSize(20).text('Relatório de Laboratórios', { align: 'center' });
  doc.moveDown();

  for (const lab of laboratorios) {
    doc.fontSize(14).text(`Nome: ${lab.nome}`);
    doc.text(`Descrição: ${lab.descricao}`);
    doc.text(`Capacidade: ${lab.capacidade}`);
    doc.moveDown(0.5);

    if (lab.foto) {
      try {
        const response = await axios.get(lab.foto, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        doc.image(buffer, { width: 200, height: 200, align: 'center' });
      } catch (err) {
        doc.text('[Erro ao carregar imagem]');
      }
    }

    doc.moveDown(1);
    doc.moveTo(doc.x, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
    doc.moveDown();
  }

  doc.end(); // Finaliza o PDF
}

module.exports = gerarRelatorioLaboratorios;
