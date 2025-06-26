// app/api/ask-price/route.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, mobile, productName, productId } = body;

    // Admin Email
const adminEmail = await resend.emails.send({
  from: 'Champion Security System <onboarding@resend.dev>',
  to: ['csscctvcam@gmail.com'],
  replyTo: [email], // OPTIONAL: makes replies go to customer
  subject: `Price Request - ${productName}`,
  html: `
    <h2>New Price Inquiry</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mobile:</strong> ${mobile}</p>
    <p><strong>Product Name:</strong> ${productName}</p>
    <p><strong>Product ID:</strong> ${productId}</p>
  `,
});

    // Customer Email
    const customerEmail = await resend.emails.send({
      from: 'Champion Security System <onboarding@resend.dev>',
      to: [email],
      subject: `We Received Your Price Request - ${productName}`,
      html: `
        <h2>Thank you for your interest in ${productName}!</h2>
        <p>Hi ${name},</p>
        <p>We've received your request for pricing details on <strong>${productName}</strong> (ID: ${productId}).</p>
        <p>Our team will reach out to you within <strong>24 hours</strong> with a quote and any available discounts.</p>
        <hr>
        <h3>Need Help?</h3>
        <p>📞 Sales: +91 8080806288<br>
        🛠️ Support: +91 8080808109<br>
        📧 Email: info@championsecuritysystem.com</p>
        <p>Best regards,<br>The Champion Security Team</p>
      `,
    });

    return Response.json({
      success: true,
      message: 'Price request sent successfully',
      adminId: adminEmail.data?.id,
      customerId: customerEmail.data?.id,
    });

  } catch (error) {
    console.error('Ask Price Error:', error);
    return Response.json({ success: false, error: 'Something went wrong!' }, { status: 500 });
  }
}
