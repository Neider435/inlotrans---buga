// functions/enviar-registro.js
const URL_GOOGLE_SCRIPT = "https://script.google.com/macros/s/AKfycbyGjqu8Z4-UIu5igTeY02DPTSyqQY65KsYw38ujRm149NLTzZiVDe0UB7T3f4VbmJQr/exec";

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" })
    };
  }

  try {
    const body = JSON.parse(event.body);

    // 👇 Agregar logging para ver qué datos llegan
    console.log("Datos recibidos:", body);

    const response = await fetch(URL_GOOGLE_SCRIPT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error en Google Apps Script:", errorText);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Error al guardar en Google Sheets" })
      };
    }

    // Redirigir a accesses.html
    return {
      statusCode: 302,
      headers: {
        Location: "/accesses.html"
      },
      body: ""
    };

  } catch (error) {
    console.error("Error en la función de Netlify:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno del servidor" })
    };
  }
};
