import { getTeamById } from "@/functions/db/team"

const MULTIPLIER_2028 = 1.20
const MULTIPLIER_2027 = 1.15
const MULTIPLIER_2026 = 1.10
const MULTIPLIER_2025 = 1.00
const MULTIPLIER_2024 = 1.00
const MULTIPLIER_MASTERS = 1.00

export async function weigh(teamId: string, score: number) {
  const team = await getTeamById(teamId)
  if (!team)
    return null

  const multiplier = team.participants.reduce((acc, participant) => {
    switch (participant.graduatingClass) {
      case "CO2028":
        return acc + MULTIPLIER_2028
      case "CO2027":
        return acc + MULTIPLIER_2027
      case "CO2026":
        return acc + MULTIPLIER_2026
      case "CO2025":
        return acc + MULTIPLIER_2025
      case "CO2024":
        return acc + MULTIPLIER_2024
      case "MASTERS":
        return acc + MULTIPLIER_MASTERS
      default:
        return acc
    }
  }, 0) / team.participants.length

  return score * multiplier
}
