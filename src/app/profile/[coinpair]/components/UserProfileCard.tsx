/**
 * User profile card component
 */
"use client";

import { FC } from "react";
import { Card } from "@/components/ui/card";

/**
 * Props for UserProfileCard component
 */
export interface UserProfileCardProps {
  /** User's name */
  name?: string | null;
  /** User's email */
  email?: string | null;
  /** Additional class names */
  className?: string;
}

/**
 * Displays the user's profile information in a card
 */
export const UserProfileCard: FC<UserProfileCardProps> = ({
  name,
  email,
  className = "",
}) => {
  return (
    <Card className={`mb-8 p-6 bg-background-secondary/40 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-primary p-0.5">
          <div className="w-full h-full rounded-full bg-background-primary p-0.5">
            <div className="w-full h-full rounded-full bg-gradient-primary" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">
            {name || "Anonymous User"}
          </h2>
          <p className="text-slate-100/70">{email}</p>
        </div>
      </div>
    </Card>
  );
};
