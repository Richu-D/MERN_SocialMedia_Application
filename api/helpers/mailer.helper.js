
const nodemailer =  require("nodemailer")

try {
  
const sendVerificationEmail = async (email, name, url) => {
  let transporter = nodemailer.createTransport({
    service:"hotmail", 
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD, 
    },
  });

  transporter.sendMail({
    from: process.env.MAIL_ADDRESS,
    to: `${email}`, 
    subject: "ColorMedia email verification ✔", 
    text: "verify your account by clicking the button below", 
    html: `<div style=" max-width: 700px; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; font-family: Roboto; font-weight: 600; color: #3b5998; " > <img src="https://firebasestorage.googleapis.com/v0/b/colormedia-b59a3.appspot.com/o/icon%2Flogo.png?alt=media&token=58cce1ca-18fb-4d99-9a78-53fdd7c5dbbd" alt="some error" style="width: 30px" /><span >Action require : Activate your colorMedia account</span > </div> <div style=" padding: 1rem 0; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; color: #141823; font-size: 17px; font-family: Roboto; " > <span>Hello ${name} </span> <div style="padding: 20px 0"> <span style="padding: 1.5rem 0" >You recently created an account on colorMedia. To complete your registration, please confirm your account.</span > </div> <div style="width: 100%;position: relative;"> <a style=" padding: 10px 15px; color: black; text-decoration: none; font-weight: 600; border-radius: 100px; position: absolute; left: 50%; transform: translate(-50%,-50%); margin: 10px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; transition:all .2s;" href=${url} >Confirm your account</a ></div> <br /> <div style="padding-top: 20px"> <span style="margin: 1.5rem 0;" >colorMedia allows you to stay in touch with all your friends, once refistered on colorMedia,you can share photos,videos and much more. 😊</span > </div> </div>`,
  });

  };
  module.exports = sendVerificationEmail
} catch (error) {
  console.log(error,"mailer.helpers Error");
}
  
  