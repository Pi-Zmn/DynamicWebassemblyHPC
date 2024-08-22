import {getSession, validateUser} from "@/app/components/auth";
import {redirect} from "next/navigation";

export async function AuthForm() {
    const session = getSession()
    return (
        <>
            <form action={async (formData) => {
                'use server'
                if (await validateUser(formData)) {
                    redirect("/")
                }
            }}>
                <div>
                    <label htmlFor="name">Name</label>
                    <br/>
                    <input id="name" name="name" placeholder="Name" style={{width: '100%'}}/>
                </div>
                <br/>
                <div>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input id="password" name="password" type="password" style={{width: '100%'}}/>
                </div>
                <br/>
                <button type="submit">Login</button>
            </form>
        </>
    )
}
