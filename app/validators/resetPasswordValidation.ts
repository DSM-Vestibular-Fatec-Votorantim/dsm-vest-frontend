import * as yup from "yup";

export const resetPasswordSchema = yup.object({
  codigo: yup
    .string()
    .matches(/^[0-9]+$/, "O código deve conter apenas números")
    .length(6, "O código deve ter 6 dígitos")
    .required("Código é obrigatório"),

  novaSenha: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
    ),

  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("novaSenha")], "As senhas não conferem")
    .required("Confirmação obrigatória"),
});
