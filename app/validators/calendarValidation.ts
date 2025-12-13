import * as Yup from "yup";

export const calendarValidationSchema = Yup.object().shape({
  DataInicio: Yup.date()
    .required("Data de início é obrigatória")
    .typeError("Data de início inválida"),
  DataFim: Yup.date()
    .required("Data de fim é obrigatória")
    .min(Yup.ref("DataInicio"), "Data de fim não pode ser anterior à data de início")
    .typeError("Data de fim inválida"),
  Descricao: Yup.string()
    .required("Descrição é obrigatória")
    .min(3, "Descrição deve ter no mínimo 3 caracteres"),
});
