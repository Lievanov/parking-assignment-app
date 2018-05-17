const keys = require("./keys");
const sgMail = require('@sendgrid/mail');

module.exports.sendEmail = (user, request) => {
  sgMail.setApiKey(keys.emailAPI);
  const msg = {
    to: user.email,
    from: 'no-reply@rulesware.com',
    subject: '[Action required] Spot available',
    html: `<div style="background-color: #f2f2f2;">
<br />
<div style="background-color: #B42529; width: 100%; height: 80px;text-align: center; color: #FFFFFF;"><p style="padding-top: 25px; font-size: 20px;">Rulesware - Parking Assignment</p></div>
<div style="text-align: center;">
  <p>Hello <strong>${user.name}</strong>,</p>
  <p>You have been selected to use an available parking spot in <strong>${request.location}</strong>.</p>
  <p>From: <strong>${request.startDate}</strong></p>
  <p>To: <strong>${request.endDate}</strong></p>
  <p>Please, confirm if you want the parking spot with the following link:</p>
</div>
<div style="height: 50px; padding-top: 30px; text-align: center;"><button style="margin-right: 20px; background-color: #008CBA; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block;font-size: 16px; border-radius: 8px;">Confirm</button><button style="margin-left: 20px; background-color: #BE6161; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block;font-size: 16px; border-radius: 8px;">Decline</button></div>


<div style="background-color: #B42529; width: 100%; height: 80px;text-align: right; color: #FFFFFF;"><p style="padding-top: 25px; padding-right:10px; font-size: 15px;">Rulesware - 2018</p></div>
</div>`,
  };
  sgMail.send(msg);
  return true;
}
