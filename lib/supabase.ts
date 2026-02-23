import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface DemoRequest {
  name: string
  role: string
  company: string
  email: string
  message?: string
  source?: string
}

export async function saveDemoRequest(data: DemoRequest): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("demo_requests").insert([
      {
        name: data.name,
        role: data.role,
        company: data.company,
        email: data.email,
        message: data.message || "",
        source: data.source || (typeof document !== "undefined" ? document.referrer || "direct" : "direct"),
      },
    ])

    if (error) {
      console.error("Supabase error:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error("Unexpected error saving lead:", err)
    return { success: false, error: "Unexpected error" }
  }
}
