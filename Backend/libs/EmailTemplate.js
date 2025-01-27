export const Verification_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #6A0DAD; /* Purple theme */
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              color: #333;
              line-height: 1.8;
          }
          .verification-code {
              display: block;
              margin: 20px 0;
              font-size: 22px;
              color: #6A0DAD; /* Purple theme */
              background: #F3E5F5; /* Light purple background */
              border: 1px dashed #6A0DAD;
              padding: 10px;
              text-align: center;
              border-radius: 5px;
              font-weight: bold;
              letter-spacing: 2px;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Verify Your Email</div>
          <div class="content">
              <p>Hello User,</p>
              <p>Thank you for signing up with <strong>Gigaluxe</strong>! Please verify your email by entering the code below:</p>
              <span class="verification-code">{verificationCode}</span>
              <p>If you did not create an account, no further action is required. If you have any questions, contact our support team.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Gigaluxe. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;
export const Welcome_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Gigaluxe</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #6A0DAD; /* Purple theme */
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              line-height: 1.8;
          }
          .welcome-message {
              font-size: 18px;
              margin: 20px 0;
          }
          .button {
              display: inline-block;
              padding: 12px 25px;
              margin: 20px 0;
              background-color: #6A0DAD; /* Purple theme */
              color: white;
              text-decoration: none;
              border-radius: 5px;
              text-align: center;
              font-size: 16px;
              font-weight: bold;
              transition: background-color 0.3s;
          }
          .button:hover {
              background-color: #4A0072; /* Darker purple */
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Welcome to Gigaluxe!</div>
          <div class="content">
              <p class="welcome-message">Hello {name},</p>
              <p>We’re thrilled to have you on board! Gigaluxe offers the finest hotel booking experience, tailored just for you.</p>
              <p>Here’s how to get started:</p>
              <ul>
                  <li>Explore our luxurious hotel listings.</li>
                  <li>Save your favorites and plan your next getaway.</li>
                  <li>Reach out to our concierge for personalized assistance.</li>
              </ul>
              <a href="https://gigaluxe.com" class="button">Explore Now</a>
              <p>If you have any questions, our support team is here to assist you.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Gigaluxe. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;

export const Invoice = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #f7fafc;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 1024px;
      margin: 0 auto;
      padding: 20px;
    }
    .invoice-box {
      padding: 40px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #e3e4e8;
      padding-bottom: 20px;
      margin-bottom: 20px;
    }
    .header .logo {
        gap: 0;
      display: flex;
      flex-direction: column;
    }
    .header .logo h1 {
      margin: 0;
      font-size: 28px;
      color: #7f5fff;
    }
    .header .logo p {
      margin: 5px 0;
      font-size: 14px;
      color: #4a5568;
    }
    .header .company-details {
      text-align: right;
    }
    .header .company-details h2 {
      margin: 0;
      font-size: 24px;
      color: #7f5fff;
    }
    .header .company-details p {
      margin: 5px 0;
      font-size: 14px;
      color: #4a5568;
    }
    .invoice-details, .room-details {
      margin-bottom: 20px;
    }
    .invoice-details h3, .room-details h3 {
      font-size: 18px;
      color: #7f5fff;
      margin-bottom: 10px;
    }
    .invoice-details p, .room-details p {
      font-size: 14px;
      color: #4a5568;
    }
    .invoice-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .invoice-table th, .invoice-table td {
      padding: 10px;
      text-align: left;
      border: 1px solid #e3e4e8;
    }
    .invoice-table th {
      background-color: #f3f4f6;
      color: #7f5fff;
    }
    .total {
      text-align: right;
      font-size: 20px;
      font-weight: bold;
      color: #7f5fff;
    }
    footer {
      font-size: 12px;
      color: #4a5568;
      text-align: center;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="invoice-box">
      <div class="header">
        <div class="logo">
          <h1>Giga Luxe</h1>
          <p>Payment ID: {RazorpayPaymentId}</p>
          <p>Order ID: {RazorpayOrderId}</p>
        </div>
        <div class="company-details">
          <h2>Giga Luxe</h2>
          <p>123 Luxury Street</p>
          <p>Pune, Maharashtra, 411001</p>
          <p>Phone: +1 (999)-999-9999</p>
          <p>Email: gigaluxe@support.com</p>
        </div>
      </div>

      <div class="invoice-details">
        <h3>Billed To:</h3>
        <p>User Name: {UserName}</p>
        <p>Email: {Email}</p>
        <p>Phone: {Phone}</p>
      </div>

      <div class="room-details">
        <h3>Room Details:</h3>
        <p>Room Type: {RoomName}</p>
        <p>Check-in Date: {CheckIn}</p>
        <p>Check-out Date: {CheckOut}</p>
        <p>Amount: ₹{Price}</p>
      </div>

      <table class="invoice-table">
        <thead>
          <tr>
            <th>Room Type</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{RoomName}</td>
            <td>{CheckIn}</td>
            <td>{CheckOut}</td>
            <td>₹{Price}</td>
          </tr>
        </tbody>
      </table>

      <div class="total">
        <p>Total: ₹{Price}</p>
      </div>

      <footer>
        <p>Terms: Payment is due within 30 days from the invoice date. Late payments may incur additional charges.</p>
        <p>We hope you enjoyed your stay at Giga Luxe. Thank you for choosing us!</p>
      </footer>
    </div>
  </div>
</body>
</html>
`;

