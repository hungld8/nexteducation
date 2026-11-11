'use strict';

const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT || 465);
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Logs on startup whether the mail account can log in (see Render/Hostinger logs)
async function verifyMail() {
  const tx = getTransporter();
  if (!tx) return console.log('[mail] SMTP not configured: contact form enquiries are only written to the log.');
  try {
    await tx.verify();
    console.log(`[mail] SMTP login OK as ${process.env.SMTP_USER}. Enquiries go to ${process.env.MAIL_TO || 'dos@next.edu.vn'}.`);
  } catch (err) {
    console.error(`[mail] SMTP login FAILED for ${process.env.SMTP_USER}: ${err.message}`);
  }
}

async function sendContact(data) {
  const tx = getTransporter();
  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone / WhatsApp', data.phone],
    ['Organization', data.organization],
    ['Country', data.country],
    ['Program', data.program],
    ['Participants', data.participants],
    ['Language', data.lang],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v || '-'}`).join('\n') + `\n\nMessage:\n${data.message}`;

  if (!tx) {
    // No SMTP configured: log so the enquiry is not silently lost.
    console.log('[contact] SMTP not configured. Enquiry received:\n' + text);
    return;
  }

  const html =
    `<h2>New enquiry from next.edu.vn</h2><table cellpadding="6" style="border-collapse:collapse">` +
    rows.map(([k, v]) => `<tr><td style="color:#555"><b>${k}</b></td><td>${esc(v || '-')}</td></tr>`).join('') +
    `</table><p><b>Message</b></p><p style="white-space:pre-wrap">${esc(data.message)}</p>`;

  await tx.sendMail({
    from: process.env.MAIL_FROM || `NEXT Website <${process.env.SMTP_USER}>`,
    to: process.env.MAIL_TO || 'dos@next.edu.vn',
    replyTo: `${data.name} <${data.email}>`,
    subject: `[Website] ${data.program || 'Enquiry'} – ${data.name}`,
    text,
    html,
  });
}

module.exports = { sendContact, verifyMail };
