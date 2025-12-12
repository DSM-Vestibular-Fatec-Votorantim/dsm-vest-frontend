import { AdminCard } from "../../molecules/AdminCard";
import  Button  from "../../atoms/button";
import { Plus } from "lucide-react";
import SideBar from "../../molecules/SideBar";
import Navbar from "../Navbar";

interface Admin {
  id: number;
  name: string;
}

interface AdminPageTemplateProps {
  admins: Admin[];
  onAdd: () => void;
  onDelete: (id: number) => void;
  onChangePassword: (id: number) => void;
}

export const AdminPageTemplate = ({
  admins,
  onAdd,
  onDelete,
  onChangePassword,
}: AdminPageTemplateProps) => {
  return (
    <>
      <Navbar />
      <SideBar />
      <main className="min-h-screen min-h-[100svh] flex flex-col bg-gray-50 pt-24 py-8 px-4 sm:px-6 lg:px-8 sm:ml-64">
        <div className="max-w-4xl w-full mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Administradores</h1>
            <Button onClick={onAdd} variant="primary">
              <Plus size={16} className="inline mr-2" />
              Adicionar Admin
            </Button>
          </div>

          <div className="space-y-4">
            {admins.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nenhum administrador cadastrado
              </p>
            ) : (
              admins.map((admin) => (
                <AdminCard
                  key={admin.id}
                  name={admin.name}
                  onChangePassword={() => onChangePassword(admin.id)}
                  onDelete={() => onDelete(admin.id)}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
};