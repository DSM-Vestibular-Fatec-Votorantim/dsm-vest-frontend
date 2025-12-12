// app/services/calendarService.ts

export interface CalendarItem {
  IdCalendario: number;
  DataInicio: string;
  DataFim: string;
  Descricao: string;
}

// --- Função para formatar a data ---
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

// --- Função que busca o calendário na API ---
export async function getCalendar(): Promise<CalendarItem[]> {
  const response = await fetch("http://localhost:4000/api/calendario");
  if (!response.ok) {
    throw new Error("Erro ao buscar calendário");
  }

  return await response.json();
}
