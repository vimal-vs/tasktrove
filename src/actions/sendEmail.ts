"use server";

import { Resend } from "resend";
import prisma from "../lib/prisma";
import SignUpEmailCard from "../emails/SignUpEmailCard";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail(session: any, status: any) {
    if (status === "unauthenticated") {
        console.error('unauthenticated access');
        return;
    }
    const email = session.user?.email;

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user || user.signUpEmail === true) return;

    try {
        await resend.emails.send({
            from: 'TaskTrove <noreply@vimalvs.site>',
            to: email,
            subject: 'Welcome to TaskTrove',
            text: 'Thank you for signing up',
            react: SignUpEmailCard(session.user.email, session.user.name)
        });
        console.log('Email sent successfully:', email);
        await prisma.$transaction([
            prisma.user.update({
                where: { email: session.user.email },
                data: { signUpEmail: true }
            })
        ]);
        console.log('User signUpEmail status updated:', email);
    } catch (error) {
        console.error('Error sending email or updating user:', error);
    }
}
