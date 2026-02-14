export const templateStyle = () => {
    return `
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #f4f6f8;
                font-family: Arial, Helvetica, sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            }
            .header {
                padding: 20px;
            }
            .header h1 {
                margin: 0;
                font-size: 22px;
            }
            h6 {
                font-size: 14px;
            }
            .content {
                padding: 24px;
                color: #333333;
                line-height: 1.6;
            }
            .content p {
                margin: 0 0 16px;
            }
            .context-box {
                background-color: #f1f5f9;
                border-left: 4px solid #00c2a8;
                padding: 16px;
                border-radius: 4px;
                margin: 20px 0;
            }
            .header, .footer {
                background-color: #D95888;
                color: #ffffff;
                text-align: center;
            }
            .footer {
                padding: 16px;
                font-size: 12px;
            }
            table { 
                text-align: center;
                border: 1.25px solid grey;
                border-collapse: collapse; 
            }
            th, td { 
                border: 1px solid grey;
                padding: 4px;
            }
            table p, table h6 {
                margin: 0 !important;
            }
        </style>
    `
}