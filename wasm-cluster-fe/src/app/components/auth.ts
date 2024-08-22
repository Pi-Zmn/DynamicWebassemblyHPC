import 'server-only'
import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";


const secretKey = process.env.SECRET_KEY
const encodedKey = new TextEncoder().encode(secretKey)
const userCredentials: string = 'AdminUser-Masterarbeit-FBI-Hda'

export enum UserRole {
    User,
    Admin
}

export interface User {
    name: string,
    role: UserRole
}

export interface SessionPayload {
    user: User,
    expires: Date
}

export async function validateUser(formData: FormData) {
    /* Verify User Credentials */
    const name = formData.get('name')
    const password = formData.get('password')

    if (name === password && name === userCredentials) {
        /* Create User Object */
        const user: User = { name: 'AdminUser', role: UserRole.Admin }

        /* Create Session Object */
        const expires = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // now + 2 days
        const sessionPayload: SessionPayload = { user, expires }
        const session = await encrypt(sessionPayload)

        /* Save Sesssion in a Cookie */
        cookies().set('session', session, { expires, httpOnly: true })
        return true;
    } else {
        return false;
    }
}

export async function encrypt(payload: any) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload as unknown as SessionPayload
    } catch (error) {
        console.log('Failed to verify session')
    }
}

export async function getSession() {
    const session = cookies().get('session')?.value
    if (!session) {
        return null
    } else {
        return await decrypt(session)
    }
}

export async function logout() {
    /* Delete Session */
    cookies().set('session', '', {expires: new Date(0)})
}
