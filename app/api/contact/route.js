// app/api/contact/route.js

import { Resend } from 'resend';
import { SALES_CONTACT } from '@/app/software/plans';

const resend = new Resend(process.env.RESEND_API_KEY);

// Everything typed in the form is shown as plain text in the e-mail (never as HTML).
const clean = (v, max = 2000) =>
  String(v ?? '')
    .slice(0, max)
    .replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const OFFICE = 'info@championsecuritysystem.com';

export async function POST(req) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, phone, inquiryType, message, topic, plan } = body;

    // Enquiries that come from the /software page also go to the person who sells it.
    const software = topic === 'software';
    const name = `${String(firstName ?? '').slice(0, 100)} ${String(lastName ?? '').slice(0, 100)}`.trim();
    const replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email ?? '')) ? [String(email)] : undefined;

    const data = await resend.emails.send({
      // ✅ STEP 1: Use your VERIFIED Hostinger email here
      from: OFFICE,

      // ✅ STEP 2: Send to your admin/support email (and the software contact for software enquiries)
      to: software ? [OFFICE, SALES_CONTACT.email] : [OFFICE],

      subject: software
        ? `Software enquiry${plan ? ` (${String(plan).slice(0, 60)})` : ''} from ${name}`
        : `New Inquiry from ${name}`,
      reply_to: replyTo, // ✅ STEP 3: So you can reply back directly

      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>${software ? 'New software enquiry' : 'New Contact Inquiry'}</h2>
          <p><strong>Name:</strong> ${clean(name, 200)}</p>
          <p><strong>Email:</strong> ${clean(email, 200)}</p>
          <p><strong>Phone:</strong> ${clean(phone, 50)}</p>
          <p><strong>Inquiry Type:</strong> ${clean(inquiryType, 50)}</p>
          ${software ? `<p><strong>Plan:</strong> ${clean(plan, 100)}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${clean(message)}</p>
        </div>
      `,
    });

    return Response.json({ success: true, data });

  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
