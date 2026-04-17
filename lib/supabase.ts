import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const LOCAL_DEMO_REQUESTS_KEY = "sharwi_demo_requests_backup"

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export interface DemoRequest {
  fullName: string
  role: string
  company: string
  workEmail: string
  companySize: string
  problemToSolve: string
  notes?: string
  source?: string
}

export interface DemoRequestResult {
  success: boolean
  error?: string
  storage: "supabase" | "supabase_legacy" | "local_backup"
}

function buildLegacyMessage(data: DemoRequest) {
  const lines = [
    `Company size: ${data.companySize}`,
    `Problem to solve: ${data.problemToSolve}`,
  ]

  if (data.notes?.trim()) {
    lines.push(`Notes: ${data.notes.trim()}`)
  }

  return lines.join("\n")
}

function getSource(data: DemoRequest) {
  if (data.source) {
    return data.source
  }

  if (typeof document !== "undefined") {
    return document.referrer || "direct"
  }

  return "direct"
}

function saveToLocalBackup(
  data: DemoRequest,
  reason: string
): DemoRequestResult {
  if (typeof window === "undefined") {
    return {
      success: false,
      error: reason,
      storage: "local_backup",
    }
  }

  try {
    const raw = window.localStorage.getItem(LOCAL_DEMO_REQUESTS_KEY)
    const existing = raw ? (JSON.parse(raw) as Array<Record<string, string>>) : []
    const next = [
      ...existing,
      {
        full_name: data.fullName,
        company: data.company,
        role: data.role,
        work_email: data.workEmail,
        company_size: data.companySize,
        problem_to_solve: data.problemToSolve,
        notes: data.notes || "",
        source: getSource(data),
        saved_at: new Date().toISOString(),
        reason,
      },
    ].slice(-25)

    window.localStorage.setItem(LOCAL_DEMO_REQUESTS_KEY, JSON.stringify(next))

    return {
      success: true,
      storage: "local_backup",
    }
  } catch (err) {
    console.error("Unexpected local backup error:", err)
    return {
      success: false,
      error: reason,
      storage: "local_backup",
    }
  }
}

export async function saveDemoRequest(
  data: DemoRequest
): Promise<DemoRequestResult> {
  const source = getSource(data)
  const legacyMessage = buildLegacyMessage(data)

  try {
    if (!supabase) {
      return saveToLocalBackup(data, "Supabase is not configured")
    }

    const expandedInsert = await supabase.from("demo_requests").insert([
      {
        name: data.fullName,
        role: data.role,
        company: data.company,
        email: data.workEmail,
        company_size: data.companySize,
        problem_to_solve: data.problemToSolve,
        notes: data.notes || "",
        message: legacyMessage,
        source,
      },
    ])

    if (!expandedInsert.error) {
      return { success: true, storage: "supabase" }
    }

    const expandedError = expandedInsert.error.message
    console.warn("Expanded demo request insert failed, retrying legacy payload:", expandedError)

    const legacyInsert = await supabase.from("demo_requests").insert([
      {
        name: data.fullName,
        role: data.role,
        company: data.company,
        email: data.workEmail,
        message: legacyMessage,
        source,
      },
    ])

    if (!legacyInsert.error) {
      return { success: true, storage: "supabase_legacy" }
    }

    console.error("Supabase legacy insert failed:", legacyInsert.error)
    return saveToLocalBackup(data, legacyInsert.error.message)
  } catch (err) {
    console.error("Unexpected error saving lead:", err)
    return saveToLocalBackup(data, "Unexpected error")
  }
}
