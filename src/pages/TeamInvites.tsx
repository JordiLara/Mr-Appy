import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Building2, Users, Copy, CheckCircle } from "lucide-react";

interface TeamData {
  companyName: string;
  teamName: string;
}

export default function TeamInvites() {
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState<TeamData>({
    companyName: "Example Company", // This would come from registration
    teamName: "Development Team", // This would come from registration
  });
  const [emails, setEmails] = useState<string>("");
  const [inviteLink, setInviteLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleTeamDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamData({
      ...teamData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateInvite = () => {
    // This would actually generate a real invite link
    setInviteLink(
      `https://mrappy.com/invite/${Math.random().toString(36).substring(7)}`
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvites = () => {
    // This would actually send the invites
    console.log(
      "Sending invites to:",
      emails.split(",").map((email) => email.trim())
    );
    navigate("/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Set Up Your Team</h1>
        <p className="mt-2 text-gray-600">
          Review your team details and invite team members
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
            Invite Team Members
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Addresses
            </label>
            <textarea
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="Enter email addresses separated by commas"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          {!inviteLink && (
            <button
              onClick={handleGenerateInvite}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate Invite Link
            </button>
          )}

          {inviteLink && (
            <div className="space-y-4">
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

              <button
                onClick={handleSendInvites}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Send Invites & Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
