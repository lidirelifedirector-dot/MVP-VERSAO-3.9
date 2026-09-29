export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return handleApi(request, env, url);
    }

    return env.ASSETS.fetch(request);
  }
};

async function handleApi(request, env, url) {
  if (request.method === "GET" && url.pathname === "/api/health") {
    return Response.json({
      ok: true,
      app: "LiDire MVP 1.0",
      database: !!env.DB
    });
  }

  if (request.method === "GET" && url.pathname === "/api/profile") {
    if (!env.DB) {
      return Response.json({
        user: null,
        database: false,
        message: "Banco D1 ainda não configurado."
      });
    }

    const user = await env.DB
      .prepare(
        "SELECT id, name, email, age, phone FROM users ORDER BY created_at LIMIT 1"
      )
      .first();

    return Response.json({
      user,
      database: true
    });
  }

  return Response.json(
    {
      error: "Endpoint não implementado.",
      path: url.pathname
    },
    { status: 404 }
  );
}
