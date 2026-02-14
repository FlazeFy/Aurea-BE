import { templateStyle } from "./style"

export const createProductAndInventoryEmailTemplate = (
    username: string, product_name: string, brand: string, product_category: string, product_type: string, alcohol_free: boolean, fragrance_free: boolean, 
    paraben_free: boolean, qty: number, inventory_note?: string | null, recommended_for?: string | null, suitable_skin?: string | null, usage_instruction?: string | null) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Product & Inventory Created</title>
            ${templateStyle()}
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 Product & Inventory Successfully Created</h1>
                </div>
                <div class="content">
                    <p>Hello <strong>${username}</strong>,</p>
                    <p>Your new care product and inventory have been successfully added.</p>
                    <h3>🧴 Product Details</h3>
                    <table class="info-table">
                        <tr><td><strong>Product Name</strong></td><td>${product_name}</td></tr>
                        <tr><td><strong>Brand</strong></td><td>${brand}</td></tr>
                        <tr><td><strong>Category</strong></td><td>${product_category}</td></tr>
                        <tr><td><strong>Type</strong></td><td>${product_type}</td></tr>
                        <tr><td><strong>Alcohol Free</strong></td><td>${alcohol_free ? "Yes" : "No"}</td></tr>
                        <tr><td><strong>Fragrance Free</strong></td><td>${fragrance_free ? "Yes" : "No"}</td></tr>
                        <tr><td><strong>Paraben Free</strong></td><td>${paraben_free ? "Yes" : "No"}</td></tr>
                        <tr><td><strong>Recommended For</strong></td><td>${recommended_for ?? "-"}</td></tr>
                        <tr><td><strong>Suitable Skin</strong></td><td>${suitable_skin ?? "-"}</td></tr>
                    </table>
                    ${
                        usage_instruction && `
                            <h3>📄 Usage Instruction</h3>
                            <p>${usage_instruction}</p>
                        `
                    }
                    <h3 style="margin-top: 30px;">📦 Inventory Details</h3>
                    <table class="info-table">
                        <tr><td><strong>Quantity Added</strong></td><td>${qty}</td></tr>
                        <tr><td><strong>Note</strong></td><td>${inventory_note ?? "-"}</td></tr>
                    </table>
                    <p style="margin-top: 20px;">Your skincare management is now updated ✨</p>
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
