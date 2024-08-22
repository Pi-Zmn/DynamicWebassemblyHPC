import UserPage from "@/app/components/userpage";
import Client from "@/app/client/client";

export default function ClientWrapper() {
    return (
        <UserPage>
            <Client />
        </UserPage>
    )
}
