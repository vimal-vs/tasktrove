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

export const RemainderEmailCard = (data: any) => (
    <Html>
        <Head />
        <Preview>
            Remainder for your task
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
                    <Text className="text-xl leading-6">
                        Your task <strong>{data.content}</strong> from <strong>{data.Collection.name}</strong> is on due today.
                    </Text>
                    <Section className="text-center py-8">
                        <Button href={baseUrl} className="bg-purple-600 rounded-md text-white text-base py-2 px-6 block">
                            View Task
                        </Button>
                    </Section>
                    <Text className="text-base leading-6 ">
                        Best,<br />
                        TaskTrove
                    </Text>
                    <Hr className="border-t border-gray-300 my-5" />
                    <Text className="text-sm text-gray-500">
                        @ 2024 All Rights Reserved. | <Button href={baseUrl} className="text-gray-500">Unsubscribe</Button>
                    </Text>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default RemainderEmailCard;