import { Client, Collection, User } from "discord.js";

export function notifyAdmins(client: Collection<string, User>, message: unknown) {
    const admins = process.env.ADMINS?.split(",") || [];

    console.error(message);

    for(const admin of admins) {
        const msg = `\`\`\`\n${typeof message === "string" ? message : JSON.stringify(message, null, 2)}\n\`\`\``
        client.get(admin)?.send(msg).catch((error) => 
            console.error(`Failed to notify admin ${admin}:`, error))
    }
}