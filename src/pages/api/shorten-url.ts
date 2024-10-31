// src/pages/api/shorten-url.ts
import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
    try {
        const { url } = await request.json();

        const response = await fetch('https://cleanuri.com/api/v1/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            throw new Error('Error al acortar la URL');
        }

        const data = await response.json();
        return new Response(JSON.stringify({ shortUrl: data.result_url }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
