
const nodemailer =  require("nodemailer")
const {google} =  require("googleapis")

const oauth_link = "https://developers.google.com/oauthplayground";

const { OAuth2 } = google.auth;


const auth = new OAuth2(
    process.env.MAILING_ID,
    process.env.MAILING_SECRET,
    process.env.MAILING_REFRESH,
    oauth_link
)
const sendVerificationEmail = async (email, name, url) => {
    auth.setCredentials({
        refresh_token: process.env.MAILING_REFRESH,
    });
  
    const accessToken = await auth.getAccessToken();
    const stmp = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.MAILING_ID,
        clientSecret: process.env.MAILING_SECRET,
        refreshToken: process.env.MAILING_REFRESH,
        accessToken,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "ColorMedia email verification",
      html: `<div style=" max-width: 700px; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; font-family: Roboto; font-weight: 600; color: #3b5998; " > <img src="https://colormedia.vn/public/upload/frontend/01%20Logo%20Mockup%20-%20by%20PuneDesign%20copy.png" alt="some error" style="width: 30px" /><span >Action require : Activate your colorMedia account</span > </div> <div style=" padding: 1rem 0; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; color: #141823; font-size: 17px; font-family: Roboto; " > <span>Hello ${name}</span> <div style="padding: 20px 0"> <span style="padding: 1.5rem 0" >You recently created an account on colorMedia. To complete your registration, please confirm your account.</span > </div> <div style="width: 100%;position: relative;"> <a style=" padding: 10px 15px; color: black; text-decoration: none; font-weight: 600; border-radius: 100px; position: absolute; left: 50%; transform: translate(-50%,-50%); margin: 10px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; transition:all .2s;" href="${url}" >Confirm your account</a ></div> <br /> <div style="padding-top: 20px"> <span style="margin: 1.5rem 0;" >colorMedia allows you to stay in touch with all your friends, once refistered on colorMedia,you can share photos,videos and much more. 😊</span > </div> </div>`,
    };
    stmp.sendMail(mailOptions, (err, res) => {
      if (err) return err;
      return res;
    });
  };
  
  module.exports = sendVerificationEmail
  