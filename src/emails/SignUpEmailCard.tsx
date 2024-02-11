import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
    ? `${process.env.VERCEL_URL}`
    : "";

export const WelcomeEmail = (userEmail: any, userName: any) => (
    <Html>
        <Head />
        <Preview>
            The platform that helps you streamline task management and set reminders for a stress-free schedule.
        </Preview>
        <Tailwind>
            <Body className="bg-gray-100 py-10">
                <Container className="bg-white border border-neutral-800 my-10 px-10 py-4 rounded-md">
                    <Img
                        src={`${baseUrl}/logo.png`}
                        width="150"
                        height="150"
                        alt="logo"
                        className="m-auto"
                    />
                    <Text className="text-base leading-6 font-semibold">
                        Hi {userName},
                    </Text>
                    <Text className="text-base leading-6">
                        Welcome to TaskTrove, the platform that helps you
                        streamline task management and set reminders for a stress-free schedule.
                    </Text>
                    <Section className="text-center py-8">
                        <Button href={baseUrl} className="bg-purple-600 rounded-md text-white text-base py-2 px-6 block">
                            Get started
                        </Button>
                    </Section>
                    <Text className="text-base leading-6 ">
                        Best,<br />
                        TaskTrove
                    </Text>
                    <Hr className="border-t border-gray-300 my-5" />
                    <Text className="text-sm text-gray-500">
                        @ 2024 All Rights Reserved.
                    </Text>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default WelcomeEmail;