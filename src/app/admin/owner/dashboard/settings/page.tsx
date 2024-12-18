
'use client';
import { withRole } from "@/app/utils/withRole";

function SettingsPage() {
    return (
        <h1>settings</h1>
    )
}

export default withRole(SettingsPage, "owner");
