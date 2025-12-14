import { AdminCard } from "../../molecules/AdminCard";
import  Button  from "../../atoms/button";
import { Plus } from "lucide-react";
import Navbar from "../Navbar";
import { useAuth } from "@/app/contexts/AuthContext";

interface Admin {
  id: number;
  name: string;
}

interface AdminPageTemplateProps {
  admins: Admin[];
  onAdd: () => void;
  onDelete: (id: number) => void;
  onChangePassword: () => void;
}

export const AdminPageTemplate = ({
  admins,
  onAdd,
  onDelete,
  onChangePassword,
}: AdminPageTemplateProps) => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col bg-gray-50 pt-26 px-4 sm:px-6 lg:px-8">
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
                  onChangePassword={onChangePassword}
                  onDelete={() => onDelete(admin.id)}
                  isOwner={user?.Id === admin.id}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
};