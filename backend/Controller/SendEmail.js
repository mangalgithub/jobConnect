const nodemailer = require('nodemailer');

const SendEmail = async ({ userEmail, jobTitle, jobSalary, jobDuration }) => {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bhukarmanish923@gmail.com',
            pass: 'hxvh dgjg lofl wtgq'
        }
    });

    const mailOptions = {
        from: 'mbhukar363@gmail.com',
        to: userEmail,
        subject: 'Job Application Confirmation',
        text: `You have successfully applied for the job: ${jobTitle}.\n\nSalary: ${jobSalary}\nDuration: ${jobDuration}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

module.exports = SendEmail;
