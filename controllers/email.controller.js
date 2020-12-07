const nodemailer = require("nodemailer");

exports.notificarCambioEstado = function (req, res) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gespedati@gmail.com",
      pass: "GespedG_6", // naturally, replace both with your real credentials or an application-specific password
    },
  });

  const dateNow = new Date();
  const day = dateNow.getDate();
  const month = dateNow.getMonth() + 1;
  const year = dateNow.getFullYear();
  const date = day + "-" + month + "-" + year;
  const body = req.body;

  const mailOptions = {
    from: "gespedati@gmail.com",
    to: "matuarea@gmail.com, tincholeon10@gmail.com, ivanchiabrera@hotmail.com",
    subject: "Cambio de estado",
    text: `El pedido N°${body.numero} paso a estado ${body.estado} el dia ${date}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({
        message: "Email enviado con exito",
      });
    }
  });
};
