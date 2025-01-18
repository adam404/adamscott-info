import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

function createUserEmailContent(name: string, message: string) {
  return `
Dear ${name},

Thank you for your message. I have received it and will get back to you as soon as possible.

Your message:
${message}

Best regards,
Adam Scott
`;
}

function createAdminEmailContent(name: string, email: string, message: string) {
  return `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message:
${message}
`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate the request body
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: "Adam Scott <contact@adamscott.info>",
      to: [email],
      subject: "Thank you for your message",
      text: createUserEmailContent(name, message),
    });

    // Send notification email to yourself
    await resend.emails.send({
      from: "Adam Scott <contact@adamscott.info>",
      to: ["adam404@gmail.com"],
      subject: "New Contact Form Submission",
      text: createAdminEmailContent(name, email, message),
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Error sending email",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
