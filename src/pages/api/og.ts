import type { APIRoute } from 'astro';

// For now, we'll redirect to a static OG image
// In production, you can use @vercel/og in a separate serverless function
export const GET: APIRoute = async () => {
  // Return a simple redirect to a static OG image
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/og-default.svg'
    }
  });
}; 