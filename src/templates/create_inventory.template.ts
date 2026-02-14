import { templateStyle } from "./style"

export const createInventoryEmailTemplate = (
    username: string, product_name: string, brand: string, product_category: string, product_type: string, qty: number, inventory_note?: string | null) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Inventory Added</title>
            ${templateStyle()}
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📦 Inventory Successfully Added</h1>
                </div>
                <div class="content">
                    <p>Hello <strong>${username}</strong>,</p>
                    <p>Your inventory has been successfully updated.</p>
                    <table class="info-table">
                        <tr><td><strong>Product</strong></td><td>${product_name} (${brand})</td></tr>
                        <tr><td><strong>Category</strong></td><td>${product_category}</td></tr>
                        <tr><td><strong>Type</strong></td><td>${product_type}</td></tr>
                        <tr><td><strong>Quantity Added</strong></td><td>${qty}</td></tr>
                        <tr><td><strong>Note</strong></td><td>${inventory_note ?? "-"}</td></tr>
                    </table>
                    <p style="margin-top: 20px;">Your skincare inventory is now up to date ✨</p>
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
