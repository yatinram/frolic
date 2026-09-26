const nodemailer = require('nodemailer');
const config = require('../config/env');
const logger = require('../utils/logger');

let transporter = null;

if (config.SMTP.USER && config.SMTP.PASS) {
  transporter = nodemailer.createTransport({
    host: config.SMTP.HOST,
    port: config.SMTP.PORT,
    secure: config.SMTP.PORT === 465,
    auth: {
      user: config.SMTP.USER,
      pass: config.SMTP.PASS,
    },
  });
}

const sendAdmissionNotification = async (admission) => {
  logger.info(`[NOTIFICATION] New Admission Enquiry Received for ${admission.childName} (Parent: ${admission.parentName}, Phone: ${admission.phone})`);

  const subject = `🎒 New Admission Enquiry: ${admission.childName} (${admission.program})`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #F5821F; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #F5821F, #FDB913); padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">Frolic Kids Edu Labs</h1>
        <p style="margin: 5px 0 0;">New Admission Lead Alert</p>
      </div>
      <div style="padding: 24px; background: #FFF8EF; color: #3A3A3A;">
        <h3 style="color: #F5821F;">Enquiry Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">Child's Name:</td><td style="padding: 8px;">${admission.childName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Date of Birth:</td><td style="padding: 8px;">${admission.dob || 'Not provided'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Parent's Name:</td><td style="padding: 8px;">${admission.parentName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;"><a href="tel:${admission.phone}">${admission.phone}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${admission.email || 'Not provided'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Selected Program:</td><td style="padding: 8px;"><span style="background: #F5821F; color: white; padding: 4px 8px; border-radius: 4px;">${admission.program}</span></td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Preferred Center:</td><td style="padding: 8px;">${admission.preferredCenter}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Message/Notes:</td><td style="padding: 8px;">${admission.message || 'None'}</td></tr>
        </table>
      </div>
      <div style="background: #3A3A3A; color: white; text-align: center; padding: 12px; font-size: 12px;">
        Frolic Kids Edu Labs • Sargasan, Gandhinagar • Contact: 7575008820
      </div>
    </div>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Frolic Edu Leads" <${config.SMTP.USER}>`,
        to: config.ADMIN_EMAIL,
        subject,
        html: htmlContent,
      });
      logger.info(`[EMAIL SENT] Lead email dispatched to ${config.ADMIN_EMAIL}`);
    } catch (err) {
      logger.warn(`[EMAIL FAILED] Could not send lead email via SMTP: ${err.message}`);
    }
  }
};

const sendFranchiseNotification = async (franchise) => {
  logger.info(`[NOTIFICATION] New Franchise Enquiry from ${franchise.name} in ${franchise.city} (Phone: ${franchise.phone})`);

  const subject = `🏢 New Franchise Partner Enquiry: ${franchise.name} (${franchise.city})`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #2E9BD6; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #2E9BD6, #4CAF3D); padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">Frolic Kids Edu Labs</h1>
        <p style="margin: 5px 0 0;">Franchise Partnership Application</p>
      </div>
      <div style="padding: 24px; background: #FFF8EF; color: #3A3A3A;">
        <h3 style="color: #2E9BD6;">Investor & Location Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">Applicant Name:</td><td style="padding: 8px;">${franchise.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;"><a href="tel:${franchise.phone}">${franchise.phone}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${franchise.email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">City / State:</td><td style="padding: 8px;">${franchise.city}, ${franchise.state}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Available Space:</td><td style="padding: 8px;">${franchise.spaceAvailableSqft || 'Not specified'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Investment Capacity:</td><td style="padding: 8px;"><span style="background: #4CAF3D; color: white; padding: 4px 8px; border-radius: 4px;">${franchise.investmentCapacity || 'Flexible'}</span></td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">${franchise.message || 'None'}</td></tr>
        </table>
      </div>
      <div style="background: #3A3A3A; color: white; text-align: center; padding: 12px; font-size: 12px;">
        Frolic Education Pvt. Ltd. • Corporate: 406 Athena Avenue, Gota, Ahmedabad
      </div>
    </div>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Frolic Franchise Portal" <${config.SMTP.USER}>`,
        to: config.ADMIN_EMAIL,
        subject,
        html: htmlContent,
      });
      logger.info(`[EMAIL SENT] Franchise lead email dispatched to ${config.ADMIN_EMAIL}`);
    } catch (err) {
      logger.warn(`[EMAIL FAILED] Could not send franchise email via SMTP: ${err.message}`);
    }
  }
};

module.exports = {
  sendAdmissionNotification,
  sendFranchiseNotification,
};
