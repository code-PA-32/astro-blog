import type {APIRoute} from "astro";
import {supabase} from "@/lib/supabase.ts";

export const POST: APIRoute = async ({request, redirect}) => {
  const formData = await request.formData();
  const provider = formData.get("provider")?.toString();

  const validProviders = ["github"];

  if (provider && validProviders.includes(provider)) {
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: {
        redirectTo: "https://astro-blog-five-cyan.vercel.app/api/auth/callback"
      },
    });

    if (error) {
      return new Response(error.message, {status: 500});
    }

    return redirect(data.url);
  }

  return redirect("/singin");
};