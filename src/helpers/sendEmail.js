import nodemailer from 'nodemailer';

export const sendEmail = async ({ fullname, username, email, address, nationality, zipcode, occupation, about, gender }) => {
    try {

        const emailTemplate = `
            <html>
            <body>
                <h1>Welcome to QuanticEdge Solution</h1>
                <p>Hi <b>${fullname}</b>,</p>
                <p>Thank you for joining QuanticEdge Solution. Here are your details:</p>
                <table>
                    <tr>
                        <td>Username:</td>
                        <td>${username}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>${email}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>${address}</td>
                    </tr>
                    <tr>
                        <td>Nationality:</td>
                        <td>${nationality}</td>
                    </tr>
                    <tr>
                        <td>Zipcode:</td>
                        <td>${zipcode}</td>
                    </tr>
                    <tr>
                        <td>Occupation:</td>
                        <td>${occupation}</td>
                    </tr>
                    <tr>
                        <td>About:</td>
                        <td>${about}</td>
                    </tr>
                    <tr>
                        <td>Gender:</td>
                        <td>${gender}</td>
                    </tr>
                </table>
                <p>Thank you for joining us!</p>
            </body>
            </html>
        `;


        const defaultEmailTemplate = `

        <html>
            <body>
                <h1>QuanticEdge Solution</h1>
                <p>Hi <b>Admin</b>,</p>
                <p>The New Form is Submitted:</p>
                <table>
                    <tr>
                        <td>Username:</td>
                        <td>${username}</td>
                    </tr>
                    <tr>
                        <td>Username:</td>
                        <td>${username}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>${email}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>${address}</td>
                    </tr>
                    <tr>
                        <td>Nationality:</td>
                        <td>${nationality}</td>
                    </tr>
                    <tr>
                        <td>Zipcode:</td>
                        <td>${zipcode}</td>
                    </tr>
                    <tr>
                        <td>Occupation:</td>
                        <td>${occupation}</td>
                    </tr>
                    <tr>
                        <td>About:</td>
                        <td>${about}</td>
                    </tr>
                    <tr>
                        <td>Gender:</td>
                        <td>${gender}</td>
                    </tr>
                </table>
                <p>Thank you!</p>
            </body>
            </html>

        `;

        const adminEmail = 'tejas.kumbhani@quanticedge.co.in';

        const adminTranspoter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const emailBodies = [
            { email: email, body: emailTemplate },
            { email: adminEmail, body: defaultEmailTemplate }
        ];


        for (const emailBody of emailBodies) {
            const emailnew = emailBody.email;
            const emailBodyHtml = emailBody.body;

            const mailOptions = {
                from: 'quanticedge07@gmail.com',
                to: emailnew,
                subject: 'Welcome to QuanticEdge Solution',
                html: emailBodyHtml
            };

            adminTranspoter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

        console.log("Email send successfully");

    } catch (error) {
        if (error.code === 11000 && error.keyPattern.email) {
            res.status(400).json({ message: 'Email is already in Use' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Email sending failed' });
        }
    }
}