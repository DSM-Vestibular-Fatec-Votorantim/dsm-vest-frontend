import * as Yup from "yup";

export const changePasswordValidationSchema = Yup.object().shape({
  senhaAtual: Yup.string().required("A senha atual é obrigatória"),

  novaSenha: Yup.string()
      .min(6, "A nova senha deve ter pelo menos 6 caracteres")
      .required("A nova senha é obrigatória")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
      ),

  confirmaNovaSenha: Yup.string()
    .oneOf([Yup.ref("novaSenha"), undefined], "As novas senhas não correspondem")
    .required("A confirmação de nova senha é obrigatória"),
});