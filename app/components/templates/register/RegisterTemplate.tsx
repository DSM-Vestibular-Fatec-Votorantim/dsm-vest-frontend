import React from "react";
import { useFormik } from "formik";
import { registerValidationSchema } from "../../../../app/validators/registerValidation";
import Navbar from "../Navbar";

const RegisterTemplate: React.FC<{
  onRegister: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  errorMessages: string[];
}> = ({ onRegister, errorMessages }) => {
  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      onRegister(
        values.nome,
        values.email,
        values.senha,
        values.confirmarSenha
      );
    },
  });

  return (
    <>
      <Navbar />
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/fatecBg.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xs"></div>
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 mx-auto pt-28 mb-14 w-full">
          <div className="bg-white rounded-lg shadow-2xl md:mt-0 w-[90%] max-w-[450px] xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Adicione um Administardor
              </h1>

              <div className="flex flex-col">
                <div className="w-full max-w-md">
                  <form
                    onSubmit={formik.handleSubmit}
                    className="space-y-4 md:space-y-6"
                  >
                    {errorMessages.length > 0 && (
                      <div className="text-red-500 text-sm mb-2">
                        {errorMessages.map((message, index) => (
                          <p key={index}>{message}</p>
                        ))}
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Nome
                      </label>
                      <input
                        type="text"
                        name="nome"
                        id="name"
                        data-testid="nome"
                        placeholder="Nome completo"
                        value={formik.values.nome}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                          formik.errors.nome && formik.touched.nome
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.touched.nome && formik.errors.nome && (
                        <p className="mt-1 text-sm text-red-600">
                          {formik.errors.nome}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        data-testid="email"
                        placeholder="usuario@email.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                          formik.errors.email && formik.touched.email
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Senha
                      </label>
                      <input
                        type="password"
                        name="senha"
                        id="senha"
                        data-testid="password"
                        placeholder="••••••••"
                        value={formik.values.senha}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                          formik.errors.senha && formik.touched.senha
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.touched.senha && formik.errors.senha && (
                        <p className="mt-1 text-sm text-red-600">
                          {formik.errors.senha}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Confirmar senha
                      </label>
                      <input
                        type="password"
                        name="confirmarSenha"
                        id="confirmarSenha"
                        data-testid="confirmPassword"
                        placeholder="••••••••"
                        value={formik.values.confirmarSenha}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 ${
                          formik.errors.confirmarSenha &&
                          formik.touched.confirmarSenha
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.touched.confirmarSenha &&
                        formik.errors.confirmarSenha && (
                          <p className="mt-1 text-sm text-red-600">
                            {formik.errors.confirmarSenha}
                          </p>
                        )}
                    </div>

                    <button
                      type="submit"
                      data-testid="btnRegister"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Criar conta
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                      Voltar para{" "}
                      <a
                        href="login"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Administradores
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterTemplate;