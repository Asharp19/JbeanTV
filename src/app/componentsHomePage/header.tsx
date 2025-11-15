"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  LogoIcon,
  PredictionIcon,
  RobotIcon,
  SettingsIcon,
  LogoutIcon,
  ProfileIcon,
} from "@/components/ui/icons";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const pathname = usePathname() || "";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";

  const isActive = (path: string) => pathname.includes(path);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="w-full fixed bg-surface-primary/40 backdrop-blur-xl top-0 z-50 border-b border-border-tertiary shadow-glass">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-content-primary"
          >
            <Image
              src="/JBEANHeading.svg"
              alt="JBEAN Logo"
              width={100}
              height={100}
            />
          </Link>

          {/* Navigation and User Menu */}
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-2">
              <Link
                href="/predictions/BTCUSD"
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive("/predictions")
                    ? "bg-gradient-button-primary text-content-primary shadow-glow"
                    : "bg-surface-glass hover:bg-surface-glass/80 text-content-secondary hover:text-content-primary"
                }`}
              >
                <PredictionIcon className="w-4 h-4" />
                <span>Predictions</span>
              </Link>
              <Link
                href="/agentconsensus/BTCUSD"
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive("/agentconsensus")
                    ? "bg-gradient-accent text-content-primary shadow-glow-accent"
                    : "bg-surface-glass hover:bg-surface-glass/80 text-content-secondary hover:text-content-primary"
                }`}
              >
                <RobotIcon className="w-4 h-4" />
                <span>Agent Consensus</span>
              </Link>
              <Link
                href="/leaderboards"
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive("/leaderboards")
                    ? "bg-gradient-secondary text-content-primary shadow-glow"
                    : "bg-surface-glass hover:bg-surface-glass/80 text-content-secondary hover:text-content-primary"
                }`}
              >
                <span>Leaderboards</span>
              </Link>
              <Link
                href="/about"
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive("/about")
                    ? "bg-gradient-button-primary text-content-primary shadow-glow"
                    : "bg-surface-glass hover:bg-surface-glass/80 text-content-secondary hover:text-content-primary"
                }`}
              >
                <span>About</span>
              </Link>
            </nav>

            {/* User Menu - Only show when authenticated */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-primary p-0.5 transition-transform hover:scale-105 shadow-glow">
                    <div className="w-full h-full rounded-full bg-background-primary p-0.5">
                      <div className="w-full h-full rounded-full bg-gradient-glow overflow-hidden animate-pulse" />
                    </div>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-surface-primary/95 backdrop-blur-xl border border-border-primary shadow-card-hover">
                    <div className="p-2">
                      {/* User Info */}
                      <div className="px-3 py-2 border-b border-border-tertiary">
                        <p className="text-sm font-medium text-content-primary bg-gradient-primary bg-clip-text text-transparent">
                          {session?.user?.name ||
                            session?.user?.email?.split("@")[0] ||
                            "User"}
                        </p>
                        <p className="text-xs text-content-tertiary">
                          {session?.user?.email || ""}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-content-secondary hover:text-content-primary hover:bg-surface-glass rounded-lg transition-colors"
                        >
                          <ProfileIcon className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-content-secondary hover:text-content-primary hover:bg-surface-glass rounded-lg transition-colors">
                          <SettingsIcon className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-content-secondary hover:text-content-primary hover:bg-surface-glass rounded-lg transition-colors"
                        >
                          <LogoutIcon className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Sign In Button (alternative to the nav link, only one will be used)
              <Link
                href="/login"
                className="w-9 h-9 rounded-full bg-surface-glass flex items-center justify-center hover:bg-surface-glass/80 transition-all"
              >
                <ProfileIcon className="w-5 h-5 text-content-secondary" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
