import { templateStyle } from "./style"

export const announcementEmailTemplate = (username: string, context: string) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Announcement</title>
            ${templateStyle()}
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📢 Announcement</h1>
                </div>
                <div class="content">
                    <p>Hello <strong>${username}</strong>,</p>
                    <p>We would like to inform you that:</p>
                    <div class="context-box">
                        ${context}
                    </div>
                    <p>If you have any questions, feel free to reach out to us.</p>
                    <p>Best regards,<br/><strong>Aurea</strong></p>
                </div>
                <div class="footer">
                    © ${new Date().getFullYear()} Aurea. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `
}
