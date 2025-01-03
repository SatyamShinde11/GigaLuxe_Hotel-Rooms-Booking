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
