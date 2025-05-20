const PDFDocument = require('pdfkit');
const axios = require('axios');

async function gerarRelatorioLaboratorios(laboratorios, res) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="relatorio_laboratorios.pdf"');

  doc.pipe(res);

  doc.fontSize(22).text('Relatório de Laboratórios', { align: 'center' });
  doc.moveDown(2);

  for (const lab of laboratorios) {
    doc
      .fontSize(16)
      .fillColor('#333')
      .text(`📌 Nome: `, { continued: true })
      .font('Helvetica-Bold')
      .text(lab.nome);

    doc
      .font('Helvetica')
      .fontSize(14)
      .text(`📝 Descrição: ${lab.descricao}`);

    doc.text(`👥 Capacidade: ${lab.capacidade}`);

    if (lab.foto) {
      try {
        const response = await axios.get(lab.foto, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'base64');
        doc.image(buffer, { width: 200, align: 'center' });
      } catch (err) {
        doc.fontSize(12).fillColor('red').text('[Erro ao carregar imagem]');
      }
    }

    doc
      .moveDown()
      .strokeColor('#cccccc')
      .lineWidth(1)
      .moveTo(doc.x, doc.y)
      .lineTo(doc.page.width - doc.page.margins.right, doc.y)
      .stroke()
      .moveDown(2);
  }

  doc.end(); // Finaliza o PDF
}

module.exports = gerarRelatorioLaboratorios;
