const PDFDocument = require('pdfkit');
const axios = require('axios');

async function gerarRelatorioLaboratorios(laboratorios) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Cabeçalho
      doc.fontSize(22).fillColor('#333').text('Relatório de Laboratórios', {
        align: 'center',
        underline: true
      });

      doc.moveDown(1.5);

      for (const lab of laboratorios) {
        // Caixa para cada laboratório
        doc.roundedRect(doc.x, doc.y, doc.page.width - 100, 180, 10)
          .strokeColor('#cccccc')
          .lineWidth(1)
          .stroke();

        const boxX = doc.x + 10;
        let boxY = doc.y + 10;

        doc.fontSize(14).fillColor('#000').text(`🧪 Nome: ${lab.nome}`, boxX, boxY);
        boxY += 20;
        doc.fontSize(12).fillColor('#333').text(`📋 Descrição: ${lab.descricao}`, boxX, boxY);
        boxY += 20;
        doc.text(`👥 Capacidade: ${lab.capacidade}`, boxX, boxY);
        boxY += 20;

        if (lab.foto) {
          try {
            const response = await axios.get(lab.foto, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(response.data);

            // Centraliza a imagem horizontalmente
            const imageWidth = 100;
            const imageX = doc.page.width / 2 - imageWidth / 2;
            doc.image(imageBuffer, imageX, boxY, { width: imageWidth, height: imageWidth, fit: [100, 100] });
          } catch (err) {
            doc.fillColor('red').text('[Erro ao carregar imagem]', boxX, boxY);
          }
        }

        doc.moveDown(10);
        doc.moveDown(); // Espaço entre laboratórios
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = gerarRelatorioLaboratorios;
