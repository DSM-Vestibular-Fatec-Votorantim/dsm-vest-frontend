// calendarService.ts
export interface CalendarItem {
  IdCalendario: number;
  DataInicio: string;
  DataFim: string;
  Descricao: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_BASEURL + "/calendario";

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

export async function getCalendar(): Promise<CalendarItem[]> {
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error("Erro ao buscar calendário");
  return res.json();
}

export async function createEvent(data: {
  DataInicio: string;
  DataFim: string;
  Descricao: string;
}) {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar evento");
  return res.json();
}

export async function updateEvent(id: number, data: {
  DataInicio: string;
  DataFim: string;
  Descricao: string;
}) {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar evento");
  return res.json();
}

export async function deleteEvent(id: number) {
  const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar evento");
  return res.json();
}
