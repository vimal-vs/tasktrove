import schedule from 'node-schedule';
import prisma from "../../../lib/prisma";
import { Resend } from "resend";
import RemainderEmailCard from '../../../emails/RemainderEmailCard';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
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

    console.log("Cron started :", today + "for" + filteredTasks.length);
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

    return Response.json({ success: true });
}