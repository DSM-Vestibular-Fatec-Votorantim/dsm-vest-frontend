import { Card } from "../atoms/card";
import  Button  from "../atoms/button";
import { Title } from "../atoms/title";
import { Edit, Trash2 } from "lucide-react";

interface AdminCardProps {
  name: string;
  onChangePassword: () => void;
  onDelete: () => void;
}

export const AdminCard = ({ name, onChangePassword, onDelete }: AdminCardProps) => (
  <Card>
    <Title>{name}</Title>
    <div className="flex gap-4">
      <Button onClick={onChangePassword}>
        <Edit size={16} /> Trocar Senha
      </Button>
      <Button variant="red" onClick={onDelete}>
        <Trash2 size={16} /> Deletar Administrador
      </Button>
    </div>
  </Card>
);
