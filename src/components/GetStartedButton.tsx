"use client";

import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

export default function GetStartedButton() {
    return (
        <Button
            variant={"secondary"}
            className="text-base"
            onClick={() => signIn('google', {
                callbackUrl: `${window.location.origin}`
            })}
        >
            Get Started
        </Button>
    )
}
