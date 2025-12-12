import React from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="Contatos" className="bg-[#c4161c] py-10 flex justify-center">
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

        <div className="space-y-3 text-sm text-gray-800">
          <p className="flex items-center gap-2">
            <Phone size={18} /> (15) 3247-3910
          </p>

          <p className="flex items-center gap-2">
            <Mail size={18} /> faleconosco@fatecvotorantim.edu.br
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={18} /> Av. Juscelino Kubitschek de Oliveira, 279 - Votorantim - SP
          </p>

          <div className="flex gap-4 pt-3">
            <Facebook size={20} className="cursor-pointer" />
            <Instagram size={20} className="cursor-pointer" />
            <Linkedin size={20} className="cursor-pointer" />
          </div>
        </div>

        <textarea
          placeholder="Sua mensagem..."
          className="w-full h-32 bg-white p-3 rounded shadow mt-6 border border-gray-300"
        ></textarea>
      </div>
    </section>
  );
};

export default ContactSection;
