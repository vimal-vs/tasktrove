import schedule from 'node-schedule';
import prisma from "../../../../lib/prisma";
import { Resend } from "resend";
import RemainderEmailCard from '../../../../emails/RemainderEmailCard';
import { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
export const revalidate = 0;

export async function GET(request: NextRequest) {

    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    const rule = new schedule.RecurrenceRule();
    rule.hour = 9;
    rule.minute = 0;
    rule.tz = 'Asia/Kolkata';

    const getData = async (): Promise<any[]> => {
        try {
            const tasks = await prisma.task.findMany({
                include: {
                    Collection: true
                },
            });
            return tasks;
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
        return [];
    };

    const allTasks: any[] = await getData();
    const today = new Date();

    const filteredTasks = allTasks.filter((item: any) => {
        const expirationDate = new Date(item.expiresAt);
        return expirationDate.getFullYear() === today.getFullYear() &&
            expirationDate.getMonth() === today.getMonth() &&
            expirationDate.getDate() === today.getDate();
    });

    const sendRemainders = async () => {
        filteredTasks.forEach(async (item: any) => {
            try {
                await resend.emails.send({
                    from: 'TaskTrove <noreply@vimalvs.site>',
                    to: item.userId,
                    subject: 'Remainder for your task',
                    text: item.content,
                    react: RemainderEmailCard(item)
                });
                console.log('Email sent successfully for:', item.userId);
            } catch (error) {
                console.error('Error sending remainder email', error);
            }
        });
        return Response.json({ success: true, data: filteredTasks });
    };

    console.log("Cron started :", today + " for " + filteredTasks.length + " tasks");
    if (filteredTasks.length) {
        await sendRemainders();
    }
    return Response.json({ success: false, data: filteredTasks });
}