import { transporter } from "./Email.config.js";
import { Verification_Email_Template, Welcome_Email_Template } from "./EmailTemplate.js";

export const SendVerificationCode = async (email, VerificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"Giga Luxe 👻" <satyamshinde067@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Verify Your Email", // Subject line
            text: "Verify Your Email", // plain text body
            html: Verification_Email_Template.replace("{verificationCode}", VerificationCode)


            , // html body
        });
        console.log('Email Send Successfully ', response);
    } catch (error) {
        console.log("Email error");

    }
}

export const WelcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: '"Giga Luxe 👻" <satyamshinde067@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Welcome Email", // Subject line
            text: "Welcome Email", // plain text body
            html: Welcome_Email_Template.replace("{name}", name)


            , // html body
        });
        console.log('Email Send Successfully ', response);
    } catch (error) {
        console.log("Email error");

    }
}