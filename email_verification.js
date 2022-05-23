const nodemailer = require('nodemailer')

const sendEmail = async (email, uniqueString) => {
    try {
      // create reusable transporter object using the default SMTP transport
      console.log('send email')
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "k181052@nu.edu.pk",
          pass: "hello", // naturally, replace both with your real credentials or an application-specific password
        },
      });
  
      const options = () => {
        return {
          from: "xyz",
          to: email,
          subject: "Email Confirmation",
          html: `press <a href=http://localhost:3000/verify/${uniqueString}> here </a> to verify your email thanks.`,
        };
      };
  
      // Send email
      transporter.sendMail(options(), (error, info) => {
        if (error) {
          return error;
        } else {
          console.log('success')
          return res.status(200).json({
            success: true,
          });
        }
      });
    } catch (error) {
      return error;
    }
  };

module.exports=sendEmail  