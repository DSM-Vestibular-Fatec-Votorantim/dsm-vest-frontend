"use client";

import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { getFaleConosco, FaleConosco } from "../../services/talkToUsService";

const ContactSection = () => {
  const [dados, setDados] = useState<FaleConosco[]>([]);

  useEffect(() => {
    getFaleConosco().then(setDados);
  }, []);

  const info = dados[0]; // Sempre terá apenas 1 registro

  return (
    <section className="bg-[#c4161c] py-10 flex justify-center">
      <div className="bg-[#ececec] w-[90%] max-w-4xl p-6 rounded shadow">

        <h2 className="bg-[#f58c47] text-white font-semibold text-xl px-4 py-2 rounded">
          Fale Conosco
        </h2>

        <h3 className="mt-4 font-semibold text-[#1c4173] text-lg">
          Faculdade de Tecnologia de Votorantim Benedito Paliato
        </h3>

        <p className="text-sm text-gray-700 mb-4">
          Você pode entrar em contato através dos seguintes canais:
        </p>

        {info ? (
            <>
                <div className="space-y-3 text-sm text-gray-800">
                <p className="flex items-center gap-2">
                    <Phone size={18} /> {info.Tel}
                </p>

                <a href={`mailto:${info.Email}`} className="flex items-center gap-2">
                    <Mail size={18} /> {info.Email}
                </a>

                <p className="flex items-center gap-2">
                    <MapPin size={18} /> {info.End}
                </p>

                <div className="flex gap-4 pt-3">
                    <a href={info.LinkFace} target="_blank"><Facebook size={20} /></a>
                    <a href={info.LinkInsta} target="_blank"><Instagram size={20} /></a>
                    <a href={info.LinkLinkedin} target="_blank"><Linkedin size={20} /></a>
                </div>
                </div>

                {/* MAPA */}
                {info.Localizacao && (
                <div className="mt-6 w-full h-64 rounded overflow-hidden shadow">
                    <iframe
                    src={info.Localizacao}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    style={{ border: 0 }}
                    allowFullScreen
                    ></iframe>
                </div>
                )}
            </>
            ) : (
            <p>Carregando...</p>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
