import * as Yup from "yup";

export const contactValidationSchema = Yup.object().shape({
  Tel: Yup.string()
    .required("Telefone é obrigatório")
    .matches(
      /^(\(\d{2}\) \d{5}-\d{4}|\(\d{2}\) \d{4}-\d{4})$/,
      "Telefone deve ter o formato (00) 00000-0000 ou (00) 0000-0000"
    ),
  Email: Yup.string()
    .required("Email é obrigatório")
    .email("Email inválido"),
  LinkFace: Yup.string().url("URL inválida").nullable(),
  LinkInsta: Yup.string().url("URL inválida").nullable(),
  LinkLinkedin: Yup.string().url("URL inválida").nullable(),
});
