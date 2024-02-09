"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail(email: any) {
    // resend.emails.send({
    //     from: 'TaskTrove <onboarding@resend.dev>',
    //     to: email,
    //     subject: 'Hello',
    //     text: 'Hello',
    // })
}
