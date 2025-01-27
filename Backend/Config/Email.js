import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer';
import { transporter } from "./Email.config.js";
import { Verification_Email_Template, Welcome_Email_Template, Invoice } from "../libs/EmailTemplate.js";

const generatePDF = async (htmlContent) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
    });
    await browser.close();
    return pdfBuffer;
};

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

export const SendInvoice = async (email, invoiceData) => {
    try {
        console.log("from sender Email", + invoiceData);

        const { UserName, RoomName, CheckIn, CheckOut, Price, RazorpayPaymentId, RazorpayOrderId, UserEmail, UserPhone } = invoiceData;
        console.log(UserName, RoomName, CheckIn, CheckOut, Price, RazorpayPaymentId, RazorpayOrderId, UserEmail, UserPhone);

        const invoiceHtml = Invoice
            .replace("{UserName}", UserName)
            .replace("{RoomName}", RoomName)
            .replace("{CheckIn}", CheckIn)
            .replace("{CheckOut}", CheckOut)
            .replace("{Price}", Price)
            .replace("{UserName}", UserName)
            .replace("{RoomName}", RoomName)
            .replace("{CheckIn}", CheckIn)
            .replace("{CheckOut}", CheckOut)
            .replace("{Price}", Price)
            .replace("{Price}", Price)
            .replace("{RazorpayPaymentId}", RazorpayPaymentId)
            .replace("{RazorpayOrderId}", RazorpayOrderId)
            .replace("{Email}", UserEmail)
            .replace("{Phone}", UserPhone);
        ;

        console.log("Invoice HTML:", invoiceHtml);

        const pdfBuffer = await generatePDF(invoiceHtml);

        const response = await transporter.sendMail({
            from: '"Giga Luxe 👻" <your-email@gmail.com>',
            to: email,
            subject: "Your Invoice from Giga Luxe",
            text: "Here is your invoice from Giga Luxe.",
            html: "<h1>Invoice</h1>",
            attachments: [
                {
                    filename: `Invoice_${UserName}.pdf`,
                    content: pdfBuffer,
                    encoding: 'base64',
                },
            ],
        });


        console.log('Email sent successfully:', response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};