import { NextResponse } from "next/server"
import { Resend } from "resend"

// Email templates for Café-Bar Noir
const emailTemplates = {
  confirmation: (reservation: {
    name: string
    date: string
    time: string
    guests: string
  }) => ({
    subject: "Reservation Confirmed - Café-Bar Noir",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e5e5e5; padding: 40px;">
        <div style="text-align: center; border-bottom: 1px solid #c9a962; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #c9a962; font-size: 28px; margin: 0;">Café-Bar Noir</h1>
          <p style="color: #a3a3a3; margin: 5px 0 0;">Accra's Premier Lounge Experience</p>
        </div>
        
        <h2 style="color: #ffffff; font-size: 22px;">Your Reservation is Confirmed</h2>
        
        <p style="line-height: 1.8; color: #d4d4d4;">
          Dear ${reservation.name},
        </p>
        
        <p style="line-height: 1.8; color: #d4d4d4;">
          Thank you for choosing Café-Bar Noir. We're delighted to confirm your reservation. 
          We look forward to hosting you and creating a memorable experience.
        </p>
        
        <div style="background: #171717; padding: 20px; margin: 25px 0; border-left: 3px solid #c9a962;">
          <h3 style="color: #c9a962; margin: 0 0 15px; font-size: 16px;">Reservation Details</h3>
          <p style="margin: 8px 0; color: #e5e5e5;"><strong>Date:</strong> ${reservation.date}</p>
          <p style="margin: 8px 0; color: #e5e5e5;"><strong>Time:</strong> ${reservation.time}</p>
          <p style="margin: 8px 0; color: #e5e5e5;"><strong>Party Size:</strong> ${reservation.guests} guest(s)</p>
        </div>
        
        <p style="line-height: 1.8; color: #d4d4d4;">
          Please arrive within 15 minutes of your reservation time. If your plans change, 
          kindly let us know as soon as possible.
        </p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #262626;">
          <p style="color: #a3a3a3; font-size: 14px; margin: 5px 0;">East Legon, Accra, Ghana</p>
          <p style="color: #a3a3a3; font-size: 14px; margin: 5px 0;">+233 20 123 4567</p>
          <p style="color: #c9a962; font-size: 14px; margin: 10px 0;">www.cafebarnoir.com</p>
        </div>
      </div>
    `,
  }),

  rejection: (reservation: {
    name: string
    date: string
    time: string
    guests: string
    reason: string
  }) => ({
    subject: "Reservation Update - Café-Bar Noir",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e5e5e5; padding: 40px;">
        <div style="text-align: center; border-bottom: 1px solid #c9a962; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #c9a962; font-size: 28px; margin: 0;">Café-Bar Noir</h1>
          <p style="color: #a3a3a3; margin: 5px 0 0;">Accra's Premier Lounge Experience</p>
        </div>
        
        <h2 style="color: #ffffff; font-size: 22px;">Reservation Update</h2>
        
        <p style="line-height: 1.8; color: #d4d4d4;">
          Dear ${reservation.name},
        </p>
        
        <p style="line-height: 1.8; color: #d4d4d4;">
          Thank you for your interest in Café-Bar Noir. We sincerely appreciate you considering us 
          for your upcoming occasion.
        </p>
        
        <p style="line-height: 1.8; color: #d4d4d4;">
          Unfortunately, we're unable to accommodate your reservation at the selected time.
        </p>
        
        <div style="background: #171717; padding: 20px; margin: 25px 0; border-left: 3px solid #c9a962;">
          <h3 style="color: #c9a962; margin: 0 0 15px; font-size: 16px;">Requested Reservation</h3>
          <p style="margin: 8px 0; color: #e5e5e5;"><strong>Date:</strong> ${reservation.date}</p>
          <p style="margin: 8px 0; color: #e5e5e5;"><strong>Time:</strong> ${reservation.time}</p>
          <p style="margin: 8px 0; color: #e5e5e5;"><strong>Party Size:</strong> ${reservation.guests} guest(s)</p>
          <p style="margin: 12px 0 0; color: #a3a3a3;"><strong>Reason:</strong> ${reservation.reason}</p>
        </div>
        
        <p style="line-height: 1.8; color: #d4d4d4;">
          We would love to welcome you at another time. Please feel free to submit a new reservation 
          request or contact us directly, and we'll do our best to accommodate you.
        </p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #262626;">
          <p style="color: #a3a3a3; font-size: 14px; margin: 5px 0;">East Legon, Accra, Ghana</p>
          <p style="color: #a3a3a3; font-size: 14px; margin: 5px 0;">+233 20 123 4567</p>
          <p style="color: #c9a962; font-size: 14px; margin: 10px 0;">www.cafebarnoir.com</p>
        </div>
      </div>
    `,
  }),

  newReservation: (reservation: {
    name: string
    email: string
    phone: string
    date: string
    time: string
    guests: string
    occasion?: string
    notes?: string
  }) => ({
    subject: `New Reservation Request - ${reservation.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #c9a962;">New Reservation Request</h2>
        
        <div style="background: #f5f5f5; padding: 20px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Guest Details</h3>
          <p><strong>Name:</strong> ${reservation.name}</p>
          <p><strong>Email:</strong> ${reservation.email}</p>
          <p><strong>Phone:</strong> ${reservation.phone}</p>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Reservation Details</h3>
          <p><strong>Date:</strong> ${reservation.date}</p>
          <p><strong>Time:</strong> ${reservation.time}</p>
          <p><strong>Guests:</strong> ${reservation.guests}</p>
          ${reservation.occasion ? `<p><strong>Occasion:</strong> ${reservation.occasion}</p>` : ""}
          ${reservation.notes ? `<p><strong>Special Requests:</strong> ${reservation.notes}</p>` : ""}
        </div>
        
        <p>Please review and respond to this reservation request in the admin panel.</p>
      </div>
    `,
  }),
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, reservation, reason } = body

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing")
      return NextResponse.json({ error: "Server configuration error: Missing API Key" }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Default to the verified sender for testing (onboarding@resend.dev)
    // In production, this should be your verified domain email
    const fromEmail = "Café-Bar Noir <onboarding@resend.dev>"

    // In a real app, you'd want this to be the restaurant's email
    // For now, we fallback to the reservation email so replying to the restaurant notification goes to the customer? 
    // Wait, if it's a notification TO the restaurant, the Reply-To should be the CUSTOMER.
    // If it's a confirmation TO the customer, the Reply-To should be the RESTAURANT.

    // However, the user request specifically asked to use their own email as the "professional" email.
    // So let's use process.env.RESTAURANT_EMAIL for restaurant's email.

    const restaurantEmail = process.env.RESTAURANT_EMAIL || "delivered@resend.dev"

    let emailData
    let sentEmail
    let recipient
    let replyTo

    switch (type) {
      case "new_reservation":
        emailData = emailTemplates.newReservation(reservation)
        // Send TO the restaurant
        recipient = restaurantEmail
        // Reply-To the customer so the restaurant can just hit reply
        replyTo = reservation.email

        sentEmail = await resend.emails.send({
          from: fromEmail,
          to: [recipient],
          subject: emailData.subject,
          html: emailData.html,
          replyTo: replyTo,
        })
        break

      case "confirmation":
        emailData = emailTemplates.confirmation(reservation)
        // Send TO the customer
        recipient = reservation.email
        // Reply-To the restaurant
        replyTo = restaurantEmail

        sentEmail = await resend.emails.send({
          from: fromEmail,
          to: [recipient],
          subject: emailData.subject,
          html: emailData.html,
          replyTo: replyTo,
        })
        break

      case "rejection":
        emailData = emailTemplates.rejection({ ...reservation, reason })
        // Send TO the customer
        recipient = reservation.email
        // Reply-To the restaurant
        replyTo = restaurantEmail

        sentEmail = await resend.emails.send({
          from: fromEmail,
          to: [recipient],
          subject: emailData.subject,
          html: emailData.html,
          replyTo: replyTo,
        })
        break

      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 })
    }

    if (sentEmail.error) {
      console.error("Resend API Error:", sentEmail.error)
      return NextResponse.json({ error: "Failed to send email via provider: " + sentEmail.error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Email notification processed",
      data: sentEmail.data,
    })
  } catch (error) {
    console.error("Email notification error:", error)
    return NextResponse.json({ error: "Failed to process email notification" }, { status: 500 })
  }
}
