import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { client } from '@/sanity/lib/client'
import { settingsQuery } from '@/sanity/lib/queries'

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    const { nombre, email, telefono, tipo, mensaje } = await request.json()

    if (!nombre || !email || !tipo || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    if (!resend) {
      console.error('La API Key de Resend no está configurada en .env.local')
      return NextResponse.json({ error: 'Configuración de correo incompleta en el servidor' }, { status: 500 })
    }

    // Fetch settings to get the PQR email configured in Sanity
    const settings = await client.fetch(settingsQuery)
    const emailPqr = settings?.emailPqr
    
    if (!emailPqr) {
      console.error('No hay correo PQR configurado en Sanity')
      return NextResponse.json({ error: 'Configuración de correo PQR faltante en Sanity' }, { status: 500 })
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'info@fangantech.com.co'

    // 1. Send email to admin (the email configured in Sanity)
    await resend.emails.send({
      from: `Fangan Tech Web <${fromEmail}>`,
      to: [emailPqr],
      subject: `Nueva ${tipo.toUpperCase()} de ${nombre}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; padding: 40px 20px; color: #0a0a0a;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 2px solid #0a0a0a; box-shadow: 6px 6px 0px #0a0a0a; border-radius: 4px; overflow: hidden;">
            <div style="background-color: #0a0a0a; color: #ffffff; padding: 24px; text-align: center;">
              <h2 style="margin: 0; font-size: 24px; letter-spacing: -0.02em; text-transform: uppercase;">Nueva Solicitud PQR</h2>
            </div>
            <div style="padding: 32px;">
              <div style="margin-bottom: 24px;">
                <span style="display: inline-block; padding: 6px 12px; background-color: #f5f5f5; border: 1px solid #d4d4d4; border-radius: 4px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #404040;">${tipo.toUpperCase()}</span>
              </div>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; width: 120px; color: #737373; font-weight: 600; font-size: 14px;">Nombre:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: 500; font-size: 14px;">${nombre}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #737373; font-weight: 600; font-size: 14px;">Email:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: 500; font-size: 14px;">
                    <a href="mailto:${email}" style="color: #0a0a0a; text-decoration: underline;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #737373; font-weight: 600; font-size: 14px;">Teléfono:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: 500; font-size: 14px;">${telefono || 'No proporcionado'}</td>
                </tr>
              </table>
              <div style="background-color: #fafafa; border: 1px solid #e5e5e5; padding: 20px; border-radius: 4px;">
                <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; color: #737373; letter-spacing: 0.05em;">Mensaje:</h3>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #262626; white-space: pre-wrap;">${mensaje}</p>
              </div>
            </div>
            <div style="background-color: #fafafa; border-top: 1px solid #e5e5e5; padding: 16px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #737373;">Fangan Tech S.A.S. - Sistema de Notificaciones</p>
            </div>
          </div>
        </div>
      `
    })

    // 2. Send confirmation email to the user
    await resend.emails.send({
      from: `Fangan Tech <${fromEmail}>`,
      to: [email],
      subject: `Hemos recibido tu ${tipo.toUpperCase()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; padding: 40px 20px; color: #0a0a0a;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 2px solid #0a0a0a; box-shadow: 6px 6px 0px #0a0a0a; border-radius: 4px; overflow: hidden;">
            <div style="background-color: #0a0a0a; color: #ffffff; padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0 0 8px 0; font-size: 28px; letter-spacing: -0.02em;">¡Hola, ${nombre}!</h1>
              <p style="margin: 0; font-size: 16px; color: #d4d4d4;">Hemos recibido tu solicitud.</p>
            </div>
            <div style="padding: 32px;">
              <p style="font-size: 16px; line-height: 1.6; margin-top: 0; margin-bottom: 24px;">Hemos registrado correctamente tu <strong>${tipo.toUpperCase()}</strong> en nuestro sistema. Nuestro equipo revisará tu caso y se pondrá en contacto contigo dentro de las próximas 24 horas hábiles.</p>
              
              <div style="background-color: #fafafa; border: 1px solid #e5e5e5; border-left: 4px solid #0a0a0a; padding: 20px; margin-bottom: 32px;">
                <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; color: #737373; letter-spacing: 0.05em;">Resumen de tu mensaje:</h3>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #404040; font-style: italic; white-space: pre-wrap;">"${mensaje}"</p>
              </div>
              
              <p style="font-size: 16px; margin-bottom: 8px;">Gracias por contactarnos,</p>
              <p style="font-size: 16px; font-weight: 700; margin: 0;">El equipo de Fangan Tech</p>
            </div>
            <div style="background-color: #fafafa; border-top: 1px solid #e5e5e5; padding: 20px; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Fangan Tech S.A.S.</p>
              <p style="margin: 0; font-size: 12px; color: #a3a3a3;">Tecnología que Transforma</p>
            </div>
          </div>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending PQR email:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
