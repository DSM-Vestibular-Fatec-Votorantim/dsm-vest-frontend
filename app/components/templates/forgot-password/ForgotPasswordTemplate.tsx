"use client";

import React from "react";
import Navbar from "../Navbar";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "@/app/validators/forgotPasswordValidation";
import { resetPasswordSchema } from "@/app/validators/resetPasswordValidation";

interface Props {
  step: number;
  setStep: (value: number) => void;
  mensagem: string;
  erro: string;
  handleSendEmail: (email: string) => void;
  handleResetPassword: (data: {
    email: string;
    codigo: string;
    novaSenha: string;
    confirmarSenha: string;
  }) => void;
  email: string;
}

const ForgotPasswordTemplate: React.FC<Props> = ({
  step,
  mensagem,
  erro,
  handleSendEmail,
  handleResetPassword,
  email,
}) => {
  // ======================
  // STEP 1 - EMAIL
  // ======================
  const formikEmail = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      handleSendEmail(values.email);
    },
  });

  // ======================
  // STEP 2 - RESET
  // ======================
  const formikReset = useFormik({
    initialValues: {
      codigo: "",
      novaSenha: "",
      confirmarSenha: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      handleResetPassword({
        email,
        ...values,
      });
    },
  });

  return (
    <>
      <Navbar />
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/fatecBg.png')" }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xs"></div>

        <div className="relative z-10 px-6 py-8 pt-28 mb-14 w-full max-w-md">
          <div className="bg-white rounded-lg shadow-2xl p-6 space-y-4">
            <h1 className="text-xl font-bold text-gray-900">
              {step === 1 && "Esqueci a senha"}
              {step === 2 && "Redefina a senha"}
              {step === 3 && "Senha alterada com sucesso"}
            </h1>

            {erro && <p className="text-red-500 text-sm">{erro}</p>}
            {mensagem && <p className="text-green-600 text-sm">{mensagem}</p>}

            {/* ===================== STEP 1 ===================== */}
            {step === 1 && (
              <form
                onSubmit={formikEmail.handleSubmit}
                className="space-y-4"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Digite seu email"
                  value={formikEmail.values.email}
                  onChange={formikEmail.handleChange}
                  onBlur={formikEmail.handleBlur}
                  className={`border rounded-lg w-full p-2 ${
                    formikEmail.errors.email && formikEmail.touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {formikEmail.touched.email &&
                  formikEmail.errors.email && (
                    <p className="text-red-500 text-sm">
                      {formikEmail.errors.email}
                    </p>
                  )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2"
                >
                  Enviar código
                </button>
                <p className="text-center text-sm text-gray-600 mt-4">
                    <a
                        href="/pages/login"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Voltar para o login
                    </a>
                </p>
              </form>
            )}

            {/* ===================== STEP 2 ===================== */}
            {step === 2 && (
              <form
                onSubmit={formikReset.handleSubmit}
                className="space-y-4"
              >
                <input
                  type="email"
                  value={email}
                  disabled
                  className="border border-gray-300 rounded-lg w-full p-2 bg-gray-100"
                />

                <input
                    type="text"
                    name="codigo"
                    placeholder="Código recebido"
                    inputMode="numeric"
                    maxLength={6}
                    value={formikReset.values.codigo}
                    onChange={formikReset.handleChange}
                    onBlur={formikReset.handleBlur}
                    className={`border rounded-lg w-full p-2 ${
                        formikReset.errors.codigo && formikReset.touched.codigo
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                />
                {formikReset.touched.codigo && formikReset.errors.codigo && (
                    <p className="text-red-500 text-sm">
                        {formikReset.errors.codigo}
                    </p>
                )}

                <input
                    type="password"
                    name="novaSenha"
                    placeholder="Nova senha"
                    value={formikReset.values.novaSenha}
                    onChange={formikReset.handleChange}
                    onBlur={formikReset.handleBlur}
                    className={`border rounded-lg w-full p-2 ${
                        formikReset.errors.novaSenha && formikReset.touched.novaSenha
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                />
                {formikReset.touched.novaSenha && formikReset.errors.novaSenha && (
                    <p className="text-red-500 text-sm">
                        {formikReset.errors.novaSenha}
                    </p>
                )}


                <input
                    type="password"
                    name="confirmarSenha"
                    placeholder="Confirmar nova senha"
                    value={formikReset.values.confirmarSenha}
                    onChange={formikReset.handleChange}
                    onBlur={formikReset.handleBlur}
                    className={`border rounded-lg w-full p-2 ${
                        formikReset.errors.confirmarSenha &&
                        formikReset.touched.confirmarSenha
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                />
                {formikReset.touched.confirmarSenha &&
                formikReset.errors.confirmarSenha && (
                    <p className="text-red-500 text-sm">
                    {formikReset.errors.confirmarSenha}
                    </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2"
                >
                  Redefinir senha
                </button>
              </form>
            )}

            {/* ===================== STEP 3 ===================== */}
            {step === 3 && (
              <p className="text-center text-green-700 font-medium">
                <a
                  href="login"
                  className="text-blue-700 hover:underline text-sm"
                >
                  Volte para o login
                </a>{" "}
                e entre com sua nova senha!
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPasswordTemplate;
