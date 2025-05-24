import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Booking request received:', {
      name: data.name,
      email: data.email,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      kakaoId: data.kakaoId,
      message: data.message
    });
    
    // Try to send email if Resend is configured
    const resendApiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
    const fromEmail = import.meta.env.FROM_EMAIL || process.env.FROM_EMAIL || 'nami@euphoria-tattoo.com';
    const toEmail = import.meta.env.TO_EMAIL || process.env.TO_EMAIL || 'admin@euphoria-tattoo.com';
    
    if (resendApiKey) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(resendApiKey);
        
        await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          subject: 'New Tattoo Booking Request',
          html: `
            <h2>New Booking Request</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Preferred Date:</strong> ${data.preferredDate || 'Not specified'}</p>
            <p><strong>Preferred Time:</strong> ${data.preferredTime || 'Not specified'}</p>
            <p><strong>KakaoTalk ID:</strong> ${data.kakaoId || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message}</p>
          `
        });
        
        console.log('Email sent successfully via Resend');
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Continue anyway - we still want to return success to the user
      }
    } else {
      console.log('Resend not configured - booking logged to console only');
    }
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        status: 'ok', 
        message: 'Booking request received successfully!' 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Booking API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}; 