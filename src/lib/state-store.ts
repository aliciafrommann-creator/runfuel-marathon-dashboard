import { ensureDashboardSchema, getSql } from "@/lib/db";

export type DashboardState = Record<string, unknown>;

export async function getDashboardState(userId: string) {
  await ensureDashboardSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT state, updated_at
    FROM dashboard_states
    WHERE user_id = ${userId}
    LIMIT 1
  `;
  return rows[0] ? { state: rows[0].state as DashboardState, updatedAt: rows[0].updated_at as string } : null;
}

export async function saveDashboardState(userId: string, state: DashboardState) {
  await ensureDashboardSchema();
  const sql = getSql();
  await sql`
    INSERT INTO dashboard_states (user_id, state, updated_at)
    VALUES (${userId}, ${JSON.stringify(state)}::jsonb, now())
    ON CONFLICT (user_id)
    DO UPDATE SET state = EXCLUDED.state, updated_at = now()
  `;
}
