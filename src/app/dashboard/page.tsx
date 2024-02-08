import { currentUser } from '@clerk/nextjs'
import React from 'react'

export default function page() {

    const user = currentUser();
    if (!user) return;
    return (
        <div>
            alsjbf
        </div>
    )
}
