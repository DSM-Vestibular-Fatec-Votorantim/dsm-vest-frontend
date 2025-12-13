import * as Yup from "yup";

const secoesValidas = ["Geral", "Isenção e Redução", "Inscrição", "Prova", "Classificação"];

export const faqValidationSchema = Yup.object().shape({
  Titulo: Yup.string()
    .required("Título é obrigatório")
    .min(3, "Título deve ter no mínimo 3 caracteres"),
  Descricao: Yup.string()
    .required("Descrição é obrigatória")
    .min(5, "Descrição deve ter no mínimo 5 caracteres"),
  Secao: Yup.string()
    .required("Seção é obrigatória")
    .oneOf(secoesValidas, "Seção inválida"),
});
