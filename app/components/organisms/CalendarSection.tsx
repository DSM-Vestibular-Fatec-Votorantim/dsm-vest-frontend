"use client";

import { useEffect, useState } from "react";
import { getCalendar, CalendarItem } from "../../services/calendarService";


export default function CalendarSection() {
    const [calendar, setCalendar] = useState<CalendarItem[]>([]);


    useEffect(() => {
        getCalendar().then((data) => {
        setCalendar(data);
        });
    }, []);


    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString("pt-BR");
    }


    return (
    <section className="w-full bg-[#c4161c] py-10 flex justify-center">
        <div className="bg-[#ececec] w-[90%] max-w-4xl p-6 rounded shadow">
            <h2 className="text-white font-semibold text-xl bg-[#c4161c] px-4 py-2 rounded">
                Calendário
            </h2>


            <p className="mt-4 text-sm text-gray-700">
                Encontre aqui a programação para o processo seletivo do vestibular
            </p>


            <div className="mt-6 border-2 border-[#c4161c] rounded p-4 space-y-4 text-sm">
                {calendar.map((item) => (
                <p key={item.IdCalendario}>
                    📅 De {formatDate(item.DataInicio)} até {formatDate(item.DataFim)} — {item.Descricao}
                </p>
                ))}
            </div>
        </div>
    </section>
    );
}