import { Resend } from 'resend';

export async function POST({ request }) {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Email inválido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Enviar email de confirmación al usuario
    await resend.emails.send({
      from: 'El Jardín de Iris <newsletter@' + (import.meta.env.RESEND_DOMAIN || 'resend.dev') + '>',
      to: [email],
      subject: '¡Bienvenido a El Jardín de Iris! 🌸',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ec4899;">¡Bienvenido a El Jardín de Iris! 🌸</h1>
          <p>Gracias por suscribirte a nuestro boletín. Recibirás:</p>
          <ul>
            <li>Consejos sobre el cuidado de flores</li>
            <li>Ofertas exclusivas</li>
            <li>Novedades de temporada</li>
          </ul>
          <p style="margin-top: 30px; color: #666;">Si tienes alguna consulta, no dudes en contactarnos por WhatsApp.</p>
          <p style="color: #999; font-size: 12px;">Si no te interesa recibir estos correos, puedes darte de baja en cualquier momento.</p>
        </div>
      `,
    });

    // Notificar al negocio
    await resend.emails.send({
      from: 'Newsletter <newsletter@' + (import.meta.env.RESEND_DOMAIN || 'resend.dev') + '>',
      to: [import.meta.env.BUSINESS_EMAIL || 'tu@email.com'],
      subject: '🌸 Nueva suscripción al newsletter',
      html: `
        <p><strong>Nuevo suscriptor:</strong> ${email}</p>
        <p>Se ha enviado un email de bienvenida al suscriptor.</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: '¡Suscripción exitosa!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: 'Error al procesar la suscripción' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
