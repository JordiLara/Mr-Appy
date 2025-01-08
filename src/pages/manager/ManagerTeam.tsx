import React, { useState } from "react";
import { BarChart2, Mail, Phone, MapPin } from "lucide-react";

// Mock data - replace with real data when backend its done
const teamMembers = [
  {
    id: 1,
    name: "Ana García",
    role: "Frontend Developer",
    email: "ana.garcia@example.com",
    phone: "+34 666 777 888",
    location: "Madrid",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    happinessScore: 4.2,
    lastActive: "2025-01-09",
    entries: 15,
    topMoods: ["Happy", "Productive", "Energetic"],
    concerns: ["Workload", "Deadlines"],
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    role: "Backend Developer",
    email: "carlos.ruiz@example.com",
    phone: "+34 666 999 000",
    location: "Barcelona",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    happinessScore: 3.8,
    lastActive: "2025-01-13",
    entries: 12,
    topMoods: ["Focused", "Calm", "Tired"],
    concerns: ["Technical Debt", "Communication"],
  },
  // Add more team members as needed
];

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  happinessScore: number;
  lastActive: string;
  entries: number;
  topMoods: string[];
  concerns: string[];
}

interface MemberModalProps {
  member: TeamMember;
  onClose: () => void;
}

const MemberModal: React.FC<MemberModalProps> = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {member.name}
                </h2>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{member.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{member.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{member.location}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600 mb-1">Happiness Score</div>
              <div className="text-2xl font-bold">
                {member.happinessScore}/5
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-600 mb-1">Entries</div>
              <div className="text-2xl font-bold">{member.entries}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-purple-600 mb-1">Last Active</div>
              <div className="text-2xl font-bold">
                {new Date(member.lastActive).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Moods & Concerns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Top Moods</h3>
              <div className="flex flex-wrap gap-2">
                {member.topMoods.map((mood) => (
                  <span
                    key={mood}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {mood}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Main Concerns</h3>
              <div className="flex flex-wrap gap-2">
                {member.concerns.map((concern) => (
                  <span
                    key={concern}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                  >
                    {concern}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ManagerTeam() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const teamHappinessAverage =
    teamMembers.reduce((acc, member) => acc + member.happinessScore, 0) /
    teamMembers.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-600">
            Manage and monitor your team's well-being
          </p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-lg">
          <div className="text-sm text-blue-600">Team Happiness</div>
          <div className="text-2xl font-bold text-blue-700">
            {teamHappinessAverage.toFixed(1)}/5
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <button
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <div className="mt-2 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-700">
                    {member.happinessScore}/5 happiness score
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
