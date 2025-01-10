import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactAdminNotificationEmail } from "@/components/emails/ContactAdminNotificationEmail";
import { ContactConfirmationEmail } from "@/components/emails/ContactConfirmationEmail";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

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
      react: ContactConfirmationEmail({ name, email, message }),
    });

    // Send notification email to yourself
    await resend.emails.send({
      from: "Adam Scott <contact@adamscott.info>",
      to: ["adam404@gmail.com"], // Replace with your email
      subject: "New Contact Form Submission",
      react: ContactAdminNotificationEmail({ name, email, message }),
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
