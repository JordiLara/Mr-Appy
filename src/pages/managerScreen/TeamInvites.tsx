import React, { useState } from "react";
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

interface TeamData {
  companyName: string;
  teamName: string;
}

interface ShareOption {
  name: string;
  icon: React.ElementType;
  color: string;
  onClick: (link: string) => void;
}

export default function TeamInvites() {
  const [teamData, setTeamData] = useState<TeamData>({
    companyName: "Example Company",
    teamName: "Development Team",
  });
  const [inviteLink, setInviteLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
        window.open(`mailto:?body=${encodeURIComponent(link)}`),
    },
  ];

  const handleTeamDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamData({
      ...teamData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateInvite = () => {
    setInviteLink(
      `https://mrappy.com/invite/${Math.random().toString(36).substring(7)}`
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Set Up Your Team</h1>
        <p className="mt-2 text-gray-600">
          Review your team details and share the invite link
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            Team Details
          </h2>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={teamData.companyName}
                  onChange={handleTeamDataChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Name
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={teamData.teamName}
                  onChange={handleTeamDataChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Company Name</p>
                  <p className="font-medium">{teamData.companyName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Team Name</p>
                  <p className="font-medium">{teamData.teamName}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Share Invite Link
          </h2>

          {!inviteLink ? (
            <button
              onClick={handleGenerateInvite}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate Invite Link
            </button>
          ) : (
            <div className="space-y-6">
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
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Share via:
                </h3>
                <div className="grid grid-cols-4 gap-3">
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
          )}
        </div>
      </div>
    </div>
  );
}
