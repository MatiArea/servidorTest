const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

exports.createPDF = async function (req, res) {
  var dataBinding = req.body.data
  console.log(dataBinding)

  var templateHtml = fs.readFileSync(
    path.join(process.cwd(), './views/pedidoDetalle.html'),
    "utf8"
  );
  var template = handlebars.compile(templateHtml);
  var finalHtml = template(dataBinding);
  var options = {
    format: "A4",
    headerTemplate: "<p></p>",
    footerTemplate: "<p></p>",
    displayHeaderFooter: false,
    margin: {
      top: "40px",
      bottom: "100px",
    },
    printBackground: true,
    path: `./pdf/Detalle pedido N° ${dataBinding.numeroPedido}.pdf`,
  };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(finalHtml);
  await page.emulateMedia("screen");
  await page.pdf(options);
  await browser.close();
  console.log("PDF creado con exito!");
  let file = path.join(__dirname, `Detalle pedido N° ${dataBinding.numeroPedido}.pdf`);
  console.log(file);
  res.download(file, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.unlinkSync(file);
  });
};
