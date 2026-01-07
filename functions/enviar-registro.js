const URL_GOOGLE_SCRIPT = "https://script.google.com/macros/s/AKfycbw3NzOE4VqHDgGVh_AQgOdev-0LkKbK39PEmOnn1zuDDkayTHfO2f4_mC3OA5EKh944/exec";

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" })
    };
  }

  try {
    const body = JSON.parse(event.body);

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
