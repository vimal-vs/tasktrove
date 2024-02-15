"use server";

import { Resend } from "resend";
import LoginEmail from "../emails/LoginEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendVerificationEmail(url: any, host: any, email: any) {
    try {
        await resend.emails.send({
            from: 'TaskTrove <noreply@vimalvs.site>',
            to: email,
            subject: 'TaskTrove - Login',
            text: 'Login to TaskTrove',
            react: LoginEmail(url, email)
        });
        console.log('Email sent successfully:', email);
    } catch (error) {
        console.error('Error sending email', error);
    }
}