'use server'

import {getSession} from "@/app/components/auth";
import {redirect} from "next/navigation";
import React from "react";
import {UserRole} from "@/app/components/entities/user.entity";

/* Component Checks for Session and User Role or Redirects to Login Page */
export default async function AdminPage(props: any) {
    const session = await getSession();
    if(!session) {
        redirect('/login')
    }
    if (UserRole[session.user.role] === 'Admin') {
        return (
            <>
                {props.children}
            </>
        )
    } else {
        return (
            <div>
                <h1>This Page is only available for User with Role: <i>Admin</i></h1>
            </div>
        )
    }
}
