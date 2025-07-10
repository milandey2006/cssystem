// app/api/contact/route.js

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, phone, inquiryType, message } = body;

    const data = await resend.emails.send({
      // ✅ STEP 1: Use your VERIFIED Hostinger email here
      from: 'info@championsecuritysystem.com',

      // ✅ STEP 2: Send to your admin/support email (same or diff)
      to: ['info@championsecuritysystem.com'],

      subject: `New Inquiry from ${firstName} ${lastName}`,
      reply_to: [email], // ✅ STEP 3: So you can reply back directly

      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
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
