import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type TestRidePayload = {
  fullName: string;
  email: string;
  phone: string;
  bike?: string;
  date?: string;
  time?: string;
  message?: string;
};

function formatValue(value?: string) {
  return value?.trim() ? value : "Not provided";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Shared bulletproof shell: 600px table, white body, black header bar, red underline. */
function emailShell(opts: { eyebrow: string; title: string; bodyHtml: string }) {
  const { eyebrow, title, bodyHtml } = opts;
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f3f3f4; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f3f4; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:100%; background-color:#ffffff; border-radius:8px; overflow:hidden;">

            <!-- header -->
            <tr>
              <td style="background-color:#0b0b0c; padding:24px 32px;">
                <span style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; letter-spacing:2px; color:#ffffff; text-transform:uppercase;">
                  Lencar
                </span>
              </td>
            </tr>
            <tr>
              <td style="background-color:#e30613; padding:0; line-height:4px; font-size:4px;">&nbsp;</td>
            </tr>

            <!-- eyebrow + title -->
            <tr>
              <td style="padding:36px 32px 0 32px;">
                <span style="display:block; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase; color:#e30613;">
                  ${escapeHtml(eyebrow)}
                </span>
                <h1 style="margin:10px 0 0 0; font-family:Arial, Helvetica, sans-serif; font-size:24px; font-weight:800; color:#0b0b0c; line-height:1.25;">
                  ${title}
                </h1>
              </td>
            </tr>

            <!-- body -->
            <tr>
              <td style="padding:20px 32px 8px 32px;">
                ${bodyHtml}
              </td>
            </tr>

            <!-- footer -->
            <tr>
              <td style="padding:32px; border-top:1px solid #ececec;">
                <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:12px; line-height:1.6; color:#8a8a8e;">
                  Lencar Electric Fleet Systems &middot; Colombo, Sri Lanka<br />
                  This is an automated message regarding a test ride request submitted on lencar.lk.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#0b0b0c; padding:0; line-height:4px; font-size:4px;">&nbsp;</td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Label/value row for the details table used in both emails. */
function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 16px; border-bottom:1px solid #ececec; font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#8a8a8e; width:140px; vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:12px 16px; border-bottom:1px solid #ececec; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#0b0b0c; font-weight:600; vertical-align:top;">
        ${escapeHtml(value)}
      </td>
    </tr>`;
}

/** Bulletproof button (table-based, works in Outlook). */
function ctaButton(label: string, href: string) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
      <tr>
        <td style="background-color:#e30613; border-radius:4px;">
          <a href="${href}" style="display:inline-block; padding:13px 26px; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; color:#ffffff; text-decoration:none;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>`;
}

function buildCustomerHtml(payload: TestRidePayload) {
  const { fullName, bike, date, time, message } = payload;

  const details = [
    detailRow("Preferred bike", formatValue(bike)),
    detailRow("Preferred date", formatValue(date)),
    detailRow("Preferred time", formatValue(time)),
    detailRow("Your message", formatValue(message)),
  ].join("");

  const bodyHtml = `
    <p style="margin:0 0 16px 0; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.6; color:#3a3a3d;">
      Hi ${escapeHtml(fullName)},
    </p>
    <p style="margin:0 0 24px 0; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.6; color:#3a3a3d;">
      Thanks for your interest in Lencar. We've received your test ride request and one of our team members will call you shortly to confirm the booking.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #ececec; border-radius:6px; overflow:hidden;">
      ${details}
    </table>

    <p style="margin:24px 0 0 0; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:1.6; color:#8a8a8e;">
      If any of these details are wrong, just reply to this email and we'll update your request before we call.
    </p>
  `;

  return emailShell({
    eyebrow: "Test Ride Requested",
    title: "We've got your request.",
    bodyHtml,
  });
}

function buildTeamHtml(payload: TestRidePayload) {
  const { fullName, email, phone, bike, date, time, message } = payload;

  const contactBlock = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7f7f8; border-radius:6px; margin-bottom:20px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 4px 0; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:800; color:#0b0b0c;">
            ${escapeHtml(fullName)}
          </p>
          <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#3a3a3d;">
            <a href="mailto:${email}" style="color:#e30613; text-decoration:none;">${escapeHtml(email)}</a>
            &nbsp;&middot;&nbsp;
            <a href="tel:${phone}" style="color:#e30613; text-decoration:none;">${escapeHtml(phone)}</a>
          </p>
        </td>
      </tr>
    </table>`;

  const details = [
    detailRow("Preferred bike", formatValue(bike)),
    detailRow("Preferred date", formatValue(date)),
    detailRow("Preferred time", formatValue(time)),
    detailRow("Message", formatValue(message)),
  ].join("");

  const bodyHtml = `
    ${contactBlock}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #ececec; border-radius:6px; overflow:hidden;">
      ${details}
    </table>
    ${ctaButton("Reply to Customer", `mailto:${email}`)}
  `;

  return emailShell({
    eyebrow: "New Lead",
    title: "New test ride request.",
    bodyHtml,
  });
}

export async function POST(request: Request) {
  try {
    const body: TestRidePayload = await request.json();
    const { fullName, email, phone, bike, date, time, message } = body;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromAddress = process.env.SMTP_FROM || smtpUser || "udara@lencar.lk";
    const teamRecipients = (process.env.TEAM_EMAILS || process.env.TEAM_EMAIL || "")
      .split(/[\n,;]+/)
      .map((entry) => entry.trim())
      .filter(Boolean);

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        { message: "Email delivery is not configured yet." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const customerHtml = buildCustomerHtml({ fullName, email, phone, bike, date, time, message });
    const teamHtml = buildTeamHtml({ fullName, email, phone, bike, date, time, message });

    await transporter.sendMail({
      from: fromAddress,
      to: email,
      replyTo: fromAddress,
      subject: "Your Lencar test ride request has been received",
      html: customerHtml,
    });

    if (teamRecipients.length > 0) {
      await transporter.sendMail({
        from: fromAddress,
        to: teamRecipients,
        replyTo: email,
        subject: `New test ride request from ${fullName}`,
        html: teamHtml,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Test ride email submission failed", error);
    return NextResponse.json(
      { message: "Unable to send the request right now. Please try again later." },
      { status: 500 }
    );
  }
}