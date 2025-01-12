import React, { useState, useEffect } from "react";
import {
  Building2,
  Users,
  Copy,
  CheckCircle,
  MessageSquare,
  Video,
  Slack,
  Mail,
  MessageCircle,
} from "lucide-react";
import { teamService } from "../../services/api";
import { Team } from "../../types/team";

interface ShareOption {
  name: string;
  icon: React.ElementType;
  color: string;
  onClick: (link: string) => void;
}

export default function TeamInvites() {
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [inviteLink, setInviteLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const team = await teamService.getCurrentTeam();
        setTeamData(team);

        const baseUrl = window.location.origin;
        setInviteLink(`${baseUrl}/team/join/${team.id}`);
      } catch (err) {
        setError("Error al cargar la información del equipo");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const shareOptions: ShareOption[] = [
    {
      name: "Discord",
      icon: MessageSquare,
      color: "bg-indigo-500 hover:bg-indigo-600",
      onClick: (link) =>
        window.open(
          `https://discord.com/share?url=${encodeURIComponent(link)}`
        ),
    },
    {
      name: "Slack",
      icon: Slack,
      color: "bg-green-600 hover:bg-green-700",
      onClick: (link) =>
        window.open(`https://slack.com/share?url=${encodeURIComponent(link)}`),
    },
    {
      name: "Google Meet",
      icon: Video,
      color: "bg-red-500 hover:bg-red-600",
      onClick: (link) =>
        window.open(
          `https://meet.google.com/new?url=${encodeURIComponent(link)}`
        ),
    },
    {
      name: "Teams",
      icon: MessageCircle,
      color: "bg-blue-600 hover:bg-blue-700",
      onClick: (link) =>
        window.open(
          `https://teams.microsoft.com/share?url=${encodeURIComponent(link)}`
        ),
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      onClick: (link) =>
        window.open(
          `mailto:?subject=Únete a nuestro equipo&body=${encodeURIComponent(
            `Te invito a unirte a nuestro equipo en MrAppy.\n\nHaz clic en el siguiente enlace para registrarte:\n${link}`
          )}`
        ),
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Cargando información del equipo...</p>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="text-center py-8 text-red-600">
        {error || "No se pudo cargar la información del equipo"}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Invitar al Equipo</h1>
        <p className="mt-2 text-gray-600">
          Comparte el enlace de invitación con los miembros de tu equipo
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            Información del Equipo
          </h2>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Empresa</p>
                <p className="font-medium">{teamData.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Equipo</p>
                <p className="font-medium">{teamData.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Enlace de Invitación
          </h2>

          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
            <input
              type="text"
              value={inviteLink}
              readOnly
              className="flex-1 bg-transparent border-none focus:ring-0"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
              {copied ? "¡Copiado!" : "Copiar"}
            </button>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Compartir vía:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => option.onClick(inviteLink)}
                  className={`${option.color} text-white p-3 rounded-lg transition-colors
                    flex flex-col items-center gap-2`}
                >
                  <option.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
