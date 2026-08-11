import { Resend } from 'resend';
import { client } from '@/sanity/lib/client';
import { settingsQuery } from '@/sanity/lib/queries';

const resend = new Resend(process.env.RESEND_API_KEY);

const BRUTALIST_STYLE = `
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #000;
  line-height: 1.5;
`;

const CARD_STYLE = `
  border: 4px solid #000;
  padding: 30px;
  background-color: #fff;
  margin-bottom: 20px;
`;

const BUTTON_STYLE = `
  display: inline-block;
  background-color: #000;
  color: #fff;
  padding: 15px 30px;
  text-decoration: none;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 4px solid #000;
`;

export const sendAdminNotification = async (data: any) => {
  const { x_ref_payco, x_amount, x_currency_code, x_description } = data;

  try {
    let adminEmail = process.env.ADMIN_EMAIL;
    try {
      const settings = await client.fetch(settingsQuery);
      if (settings?.emailAdmin) {
        adminEmail = settings.emailAdmin;
      }
    } catch (err) {
      console.warn('No se pudo consultar el correo de admin en Sanity, usando fallback:', err);
    }

    const recipient = adminEmail || 'ventas@fangantech.com.co';

    await resend.emails.send({
      from: 'Fangan Tech <notificaciones@fangantech.com.co>',
      to: recipient,
      subject: `🔔 NUEVO PEDIDO CONFIRMADO: #${x_ref_payco}`,
      html: `
        <div style="${BRUTALIST_STYLE}">
          <h1 style="font-size: 40px; font-weight: 900; text-transform: uppercase; letter-spacing: -2px; margin-bottom: 30px; border-bottom: 8px solid #000; padding-bottom: 10px;">
            NUEVA VENTA
          </h1>
          <div style="${CARD_STYLE}">
            <p style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #666; margin-bottom: 5px;">Referencia del Pago</p>
            <p style="font-size: 24px; font-weight: 900; margin: 0 0 20px 0;">#${x_ref_payco}</p>
            
            <p style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #666; margin-bottom: 5px;">Monto Total</p>
            <p style="font-size: 24px; font-weight: 900; color: #10b981; margin: 0 0 20px 0;">$${new Intl.NumberFormat('es-CO').format(x_amount)} ${x_currency_code}</p>
            
            <p style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #666; margin-bottom: 5px;">Descripción</p>
            <p style="font-size: 16px; font-weight: 500; margin: 0;">${x_description}</p>
          </div>
          <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #999;">
            Este es un correo automático generado por el sistema de pagos de Fangan Tech.
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error enviando correo al admin:', error);
  }
};

export const sendUserNotification = async (email: string, data: any) => {
  const { x_ref_payco, x_amount, x_currency_code } = data;

  try {
    await resend.emails.send({
      from: 'Fangan Tech <ventas@fangantech.com.co>',
      to: email,
      subject: `✅ PAGO CONFIRMADO: Tu pedido #${x_ref_payco} está en camino`,
      html: `
        <div style="${BRUTALIST_STYLE}">
          <h1 style="font-size: 32px; font-weight: 900; text-transform: uppercase; letter-spacing: -1px; margin-bottom: 30px; border-bottom: 6px solid #000; padding-bottom: 10px;">
            ¡PAGO CONFIRMADO!
          </h1>
          <p style="font-size: 18px; font-weight: 500; margin-bottom: 30px;">
            Hola, hemos recibido tu pago correctamente. Tu pedido ya está siendo preparado por nuestro equipo técnico.
          </p>
          
          <div style="${CARD_STYLE}">
            <h2 style="font-size: 20px; font-weight: 900; text-transform: uppercase; margin-bottom: 20px;">Detalles de tu Compra</h2>
            <p style="font-size: 14px; margin-bottom: 10px;"><strong>Orden:</strong> #${x_ref_payco}</p>
            <p style="font-size: 14px; margin-bottom: 10px;"><strong>Total:</strong> $${new Intl.NumberFormat('es-CO').format(x_amount)} ${x_currency_code}</p>
            <p style="font-size: 14px; margin-bottom: 0;"><strong>Estado:</strong> LISTO PARA ENVÍO</p>
          </div>

          <p style="font-size: 16px; font-weight: 500; margin-bottom: 30px;">
            En las próximas 24 horas hábiles recibirás un mensaje con tu número de guía para que puedas rastrear tu paquete.
          </p>

          <a href="https://fangantech.com.co/tienda" style="${BUTTON_STYLE}">
            Seguir Comprando
          </a>

          <div style="margin-top: 50px; border-top: 2px solid #eee; pt: 20px;">
            <p style="font-size: 12px; color: #666;">
              © ${new Date().getFullYear()} FANGAN TECH S.A.S. - Tecnología que Transforma.<br>
              Si tienes dudas, escríbenos a ventas@fangantech.com.co
            </p>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error('Error enviando correo al usuario:', error);
  }
};
