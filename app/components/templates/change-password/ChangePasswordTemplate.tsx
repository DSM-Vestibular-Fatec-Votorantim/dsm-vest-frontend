import React from "react";
import { useFormik } from "formik";
import Navbar from "../Navbar";
import { changePasswordValidationSchema } from "@/app/validators/changePasswordValidation";

interface Props {
  onSubmit: (values: {
    senhaAtual: string;
    novaSenha: string;
    confirmaNovaSenha: string;
  }) => Promise<void>;
  mensagem: string;
  setMensagem: (msg: string) => void;
}

const ChangePasswordTemplate: React.FC<Props> = ({ onSubmit, mensagem, setMensagem }) => {
  const formik = useFormik({
    initialValues: {
      senhaAtual: "",
      novaSenha: "",
      confirmaNovaSenha: "",
    },
    validationSchema: changePasswordValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      await onSubmit(values);
      // Limpa os campos após a alteração
      resetForm();
    },
  });

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto pt-28 mb-14">
        <div className="w-full bg-white rounded-lg shadow-2xl sm:max-w-md">
          <div className="p-6 space-y-6">
            <h1 className="text-lg font-bold md:text-2xl">Alterar senha</h1>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Senha atual */}
              <div>
                <label className="block text-sm font-medium">Senha atual</label>
                <input
                  type="password"
                  name="senhaAtual"
                  value={formik.values.senhaAtual}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-gray-50 border rounded-lg w-full p-2.5 ${
                    formik.touched.senhaAtual && formik.errors.senhaAtual
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.senhaAtual && formik.errors.senhaAtual && (
                  <p className="text-sm text-red-600">{formik.errors.senhaAtual}</p>
                )}
              </div>

              {/* Nova senha */}
              <div>
                <label className="block text-sm font-medium">Nova senha</label>
                <input
                  type="password"
                  name="novaSenha"
                  value={formik.values.novaSenha}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-gray-50 border rounded-lg w-full p-2.5 ${
                    formik.touched.novaSenha && formik.errors.novaSenha
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.novaSenha && formik.errors.novaSenha && (
                  <p className="text-sm text-red-600">{formik.errors.novaSenha}</p>
                )}
              </div>

              {/* Confirmação */}
              <div>
                <label className="block text-sm font-medium">Confirmar nova senha</label>
                <input
                  type="password"
                  name="confirmaNovaSenha"
                  value={formik.values.confirmaNovaSenha}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-gray-50 border rounded-lg w-full p-2.5 ${
                    formik.touched.confirmaNovaSenha &&
                    formik.errors.confirmaNovaSenha
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.confirmaNovaSenha &&
                  formik.errors.confirmaNovaSenha && (
                    <p className="text-sm text-red-600">{formik.errors.confirmaNovaSenha}</p>
                  )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700"
              >
                Alterar senha
              </button>

              {mensagem && (
                <p className="text-center text-sm mt-2 text-green-600 font-medium">
                  {mensagem}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordTemplate;