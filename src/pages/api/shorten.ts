import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const url = data.get("url");
    
    if (!url || url === "") {
        return new Response(
            JSON.stringify({
                message: "Please add a link"
            }),
            { status: 400 }
        );
    }
    
    const response = await fetch("https://cleanuri.com/api/v1/shorten", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    });

    if (!response.ok) {
        return new Response(
            JSON.stringify({
                message: "Error while shortening the URL"
            }),
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({
            result: await response.json(),
            message: "URL shortened successfully"
        }),
        { status: 200 }
    );
};