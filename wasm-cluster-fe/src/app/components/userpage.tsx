'use server'

import {getSession} from "@/app/components/auth";
import {redirect} from "next/navigation";
import React from "react";

/* Component Checks for Session or Redirects to Login Page */
export default async function UserPage(props: any) {
    const session = await getSession();
    if(!session) {
        redirect('/login')
    }
    return (
        <>
            {props.children}
        </>
    )
}
