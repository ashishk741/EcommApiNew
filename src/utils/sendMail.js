const SibApiV3Sdk = require("sib-api-v3-sdk");


const client = SibApiV3Sdk.ApiClient.instance;


client.authentications["api-key"].apiKey =
    process.env.BREVO_API_KEY;



const sendOTPEmail = async (email, name, otp) => {

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();


    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();


    sendSmtpEmail.subject = "Email Verification OTP";


    sendSmtpEmail.sender = {
        name: "techwallah21@gmail.com",
        email: process.env.EMAIL_FROM
    };


    sendSmtpEmail.to = [
        {
            email: email,
            name: name
        }
    ];


    sendSmtpEmail.htmlContent = `
        <h2>Hello ${name}</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
    `;


    await apiInstance.sendTransacEmail(sendSmtpEmail);


    console.log("OTP Email Sent Successfully");

};
console.log(
  "BREVO KEY:",
  process.env.BREVO_API_KEY?.substring(0,10)
);

module.exports = sendOTPEmail;


//Forgot.......
const brevo = require("@getbrevo/brevo");

const sendForgotPasswordOTP = async (email, otp) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  apiInstance.setApiKey(
    apiInstance.TransactionalEmailsApikeys.apiKey,
    process.env.BREVO_API_KEY
  );

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.sender = {
    name: "EcommApi",
    email: process.env.EMAIL_FROM
  };

  sendSmtpEmail.to = [
    {
      email: email
    }
  ];

  sendSmtpEmail.subject = "Password Reset OTP";

  sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Password Reset</h2>

      <p>Your OTP for resetting your password is:</p>

      <h1 style="letter-spacing: 5px;">
        ${otp}
      </h1>

      <p>This OTP will expire in <b>10 minutes</b>.</p>

      <p>If you did not request a password reset, please ignore this email.</p>
    </div>
  `;

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

module.exports = {
  sendForgotPasswordOTP
};