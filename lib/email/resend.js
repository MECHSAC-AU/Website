import { Resend } from "resend";
import { siteConfig } from "@/data/siteConfig";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const fromEmail = process.env.RESEND_FROM_EMAIL || "MECHSAC <onboarding@resend.dev>";
const fallbackAdminEmail = process.env.AUTHORIZED_ADMIN_EMAIL || "mechsac.au@gmail.com";

/**
 * Internal helper to send email with automatic sandbox 403 fallback.
 * Resend's free test sender (onboarding@resend.dev) only allows delivery to the account email.
 * If sending to an external recipient returns 403, we safely forward a preview to the admin inbox
 * so testing continues uninterrupted while advising the user to verify a domain for production.
 */
async function dispatchEmail({ to, subject, html }) {
  if (!resend) {
    console.warn("Resend API key not configured. Skipping email dispatch.");
    return { success: false, reason: "No API key configured" };
  }

  try {
    const res = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
    });

    if (res.error) {
      // Check if Resend blocked due to unverified domain sandbox policy (statusCode 403)
      if (res.error.statusCode === 403 && to !== fallbackAdminEmail) {
        console.warn(
          `Resend 403 sandbox restriction: Cannot send to ${to} using unverified sender ${fromEmail}. Forwarding test email to account admin ${fallbackAdminEmail}.`
        );

        const testingHtml = `
          <div style="background: #2a1215; border: 1px solid #e11d48; color: #fecdd3; padding: 12px 16px; border-radius: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; line-height: 1.5; margin-bottom: 24px;">
            <strong style="color: #ffffff; text-transform: uppercase;">[Resend Test Mode — Domain Notice]</strong><br/>
            Intended Recipient: <span style="font-family: monospace; color: #fb7185;">${to}</span><br/>
            <span style="font-size: 11px; color: #fda4af;">
              Notice: Resend's free test sender (<code>onboarding@resend.dev</code>) restricts direct delivery to unverified external domains. This preview was delivered to your admin inbox so you can verify the email content. To send directly to applicants and attendees, verify your domain at <a href="https://resend.com/domains" style="color: #ffffff; text-decoration: underline;" target="_blank">resend.com/domains</a> and set <code>RESEND_FROM_EMAIL</code> in your <code>.env.local</code>.
            </span>
          </div>
          ${html}
        `;

        const fallbackRes = await resend.emails.send({
          from: fromEmail,
          to: fallbackAdminEmail,
          subject: `[TEST PREVIEW for ${to}] ${subject}`,
          html: testingHtml,
        });

        if (fallbackRes.error) {
          return {
            success: false,
            error: fallbackRes.error.message,
            statusCode: fallbackRes.error.statusCode,
          };
        }

        return {
          success: true,
          data: fallbackRes.data,
          forwardedToAdmin: true,
          originalRecipient: to,
        };
      }

      return {
        success: false,
        error: res.error.message,
        statusCode: res.error.statusCode,
      };
    }

    return { success: true, data: res.data };
  } catch (err) {
    console.error("Resend dispatch unexpected exception:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Send membership application approval email
 */
export async function sendApplicationApprovalEmail({ to, name, interest = "Student Recruitment" }) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08090C; color: #f1f5f9; padding: 24px; margin: 0; }
          .container { max-width: 580px; margin: 0 auto; background: #0f1118; border: 1px solid #212638; border-radius: 6px; padding: 32px; }
          .header { border-bottom: 2px solid #e11d48; padding-bottom: 16px; margin-bottom: 24px; }
          .logo { color: #e11d48; font-size: 24px; font-weight: 900; letter-spacing: 2px; }
          .sub { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; }
          h2 { color: #ffffff; font-size: 20px; text-transform: uppercase; margin-top: 0; }
          p { color: #cbd5e1; font-size: 14px; line-height: 1.6; }
          .badge { display: inline-block; background: #1e131b; color: #f43f5e; border: 1px solid #e11d48; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; }
          .card { background: #141724; border: 1px solid #23283c; border-radius: 4px; padding: 16px; margin: 20px 0; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #1e2335; font-size: 11px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">MECHSAC</div>
            <div class="sub">${siteConfig.departmentName} • ${siteConfig.universityName}</div>
          </div>
          <div class="badge">APPLICATION APPROVED // STATUS: CONFIRMED</div>
          <h2>Welcome to the Team, ${name}!</h2>
          <p>
            We are pleased to inform you that your application to join <strong>MECHSAC</strong> has been reviewed and officially <strong>APPROVED</strong> by the Executive Board and Faculty Coordination.
          </p>
          <div class="card">
            <p style="margin: 0; font-size: 13px; color: #94a3b8;"><strong>Division / Track:</strong> ${interest}</p>
            <p style="margin: 6px 0 0; font-size: 13px; color: #94a3b8;"><strong>Venue:</strong> ${siteConfig.location.workshop}</p>
            <p style="margin: 6px 0 0; font-size: 13px; color: #94a3b8;"><strong>Official Contact:</strong> ${siteConfig.contactEmail}</p>
          </div>
          <p>
            Our squad will reach out via email shortly with orientation schedules, laboratory bay access passes, and initial technical briefing packets.
          </p>
          <p>Engineering Motion. Designing The Future.</p>
          <div class="footer">
            &copy; ${siteConfig.establishedYear} ${siteConfig.clubName} — ${siteConfig.departmentName}, ${siteConfig.universityName}.
          </div>
        </div>
      </body>
    </html>
  `;

  return dispatchEmail({
    to,
    subject: `Welcome to MECHSAC! Your Membership Application Has Been Approved`,
    html,
  });
}

/**
 * Send membership application rejection / waitlist email
 */
export async function sendApplicationRejectionEmail({ to, name }) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08090C; color: #f1f5f9; padding: 24px; margin: 0; }
          .container { max-width: 580px; margin: 0 auto; background: #0f1118; border: 1px solid #212638; border-radius: 6px; padding: 32px; }
          .header { border-bottom: 2px solid #e11d48; padding-bottom: 16px; margin-bottom: 24px; }
          .logo { color: #e11d48; font-size: 24px; font-weight: 900; letter-spacing: 2px; }
          .sub { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; }
          h2 { color: #ffffff; font-size: 20px; text-transform: uppercase; margin-top: 0; }
          p { color: #cbd5e1; font-size: 14px; line-height: 1.6; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #1e2335; font-size: 11px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">MECHSAC</div>
            <div class="sub">${siteConfig.departmentName} • ${siteConfig.universityName}</div>
          </div>
          <h2>Update Regarding Your MECHSAC Application</h2>
          <p>Dear ${name},</p>
          <p>
            Thank you for your enthusiasm and interest in joining <strong>MECHSAC</strong> for the ${siteConfig.establishedYear} season.
          </p>
          <p>
            Due to workstation capacity and machine tool limits in our current fabrication bays, we are unable to accept your membership application for this intake.
          </p>
          <p>
            We have retained your details for future recruitment cycles and workshop masterclasses. You are warmly welcome to attend all our open technical symposiums and public webinars.
          </p>
          <div class="footer">
            &copy; ${siteConfig.establishedYear} ${siteConfig.clubName} — ${siteConfig.departmentName}, ${siteConfig.universityName}.
          </div>
        </div>
      </body>
    </html>
  `;

  return dispatchEmail({
    to,
    subject: `Update on your MECHSAC Membership Application`,
    html,
  });
}

/**
 * Send event registration confirmation email
 */
export async function sendEventRegistrationApprovalEmail({
  to,
  name,
  eventTitle,
  eventDate,
  eventLocation,
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08090C; color: #f1f5f9; padding: 24px; margin: 0; }
          .container { max-width: 580px; margin: 0 auto; background: #0f1118; border: 1px solid #212638; border-radius: 6px; padding: 32px; }
          .header { border-bottom: 2px solid #e11d48; padding-bottom: 16px; margin-bottom: 24px; }
          .logo { color: #e11d48; font-size: 24px; font-weight: 900; letter-spacing: 2px; }
          .sub { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; }
          h2 { color: #ffffff; font-size: 20px; text-transform: uppercase; margin-top: 0; }
          p { color: #cbd5e1; font-size: 14px; line-height: 1.6; }
          .badge { display: inline-block; background: #1e131b; color: #f43f5e; border: 1px solid #e11d48; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; }
          .card { background: #141724; border: 1px solid #23283c; border-radius: 4px; padding: 16px; margin: 20px 0; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #1e2335; font-size: 11px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">MECHSAC</div>
            <div class="sub">${siteConfig.departmentName} • ${siteConfig.universityName}</div>
          </div>
          <div class="badge">SEAT CONFIRMED // REGISTRATION APPROVED</div>
          <h2>Registration Confirmed for ${name}</h2>
          <p>
            Your pass for <strong>${eventTitle}</strong> has been officially confirmed by event coordinators.
          </p>
          <div class="card">
            <p style="margin: 0; font-size: 13px; color: #94a3b8;"><strong>Event:</strong> ${eventTitle}</p>
            <p style="margin: 6px 0 0; font-size: 13px; color: #94a3b8;"><strong>Date & Time:</strong> ${eventDate || "Dates will be announced"}</p>
            <p style="margin: 6px 0 0; font-size: 13px; color: #94a3b8;"><strong>Venue:</strong> ${eventLocation || "Aliah University"}</p>
          </div>
          <p>Please present this confirmation email at the registration desk upon arrival.</p>
          <div class="footer">
            &copy; ${siteConfig.establishedYear} ${siteConfig.clubName} — ${siteConfig.departmentName}, ${siteConfig.universityName}.
          </div>
        </div>
      </body>
    </html>
  `;

  return dispatchEmail({
    to,
    subject: `Seat Confirmed: ${eventTitle} - MECHSAC`,
    html,
  });
}

/**
 * Send event registration rejection email
 */
export async function sendEventRegistrationRejectionEmail({ to, name, eventTitle }) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08090C; color: #f1f5f9; padding: 24px; margin: 0; }
          .container { max-width: 580px; margin: 0 auto; background: #0f1118; border: 1px solid #212638; border-radius: 6px; padding: 32px; }
          .header { border-bottom: 2px solid #e11d48; padding-bottom: 16px; margin-bottom: 24px; }
          .logo { color: #e11d48; font-size: 24px; font-weight: 900; letter-spacing: 2px; }
          .sub { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; }
          h2 { color: #ffffff; font-size: 20px; text-transform: uppercase; margin-top: 0; }
          p { color: #cbd5e1; font-size: 14px; line-height: 1.6; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #1e2335; font-size: 11px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">MECHSAC</div>
            <div class="sub">${siteConfig.departmentName} • ${siteConfig.universityName}</div>
          </div>
          <h2>Registration Update: ${eventTitle}</h2>
          <p>Dear ${name},</p>
          <p>
            Thank you for registering for <strong>${eventTitle}</strong>. Unfortunately, all available seats have reached maximum hall capacity, and we are unable to accommodate additional registrations at this time.
          </p>
          <p>
            We will inform you if additional sessions or streaming links become available.
          </p>
          <div class="footer">
            &copy; ${siteConfig.establishedYear} ${siteConfig.clubName} — ${siteConfig.departmentName}, ${siteConfig.universityName}.
          </div>
        </div>
      </body>
    </html>
  `;

  return dispatchEmail({
    to,
    subject: `Event Registration Update: ${eventTitle}`,
    html,
  });
}
