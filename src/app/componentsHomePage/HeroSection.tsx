"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  useGSAP(
    () => {
      gsap.from(".hero-title", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.to(".hero-tagline", {
        opacity: 1,
        x: 0,
        duration: 3,
        delay: 0.5,
        ease: "power3.out",
      });
    },
    {
      scope: heroRef,
      revertOnUpdate: false,
    }
  );

  return (
    <section className="relative overflow-hidden pt-8">
      <div className="grid grid-cols-1 text-white lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="relative z-10">
            <div className="mb-8">
              <Image
                src="/JBEANHeading.svg"
                alt="JBEAN Logo"
                width={250}
                height={100}
                priority
                className="mb-4"
              />
              <h1 className="text-4xl md:text-5xl font-bold text-gradient-heading leading-tight">
                Predict & Earn
              </h1>
            </div>
            <p className="text-lg text-content-secondary mb-8 max-w-xl">
              Join our community a be part of catching the next
              &apos;Black-Swan&apos; with help of AI, all the while learning and
              earning.
            </p>

            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/register"
                  className="px-8 py-3 text-center font-medium rounded-full bg-gradient-primary  hover:opacity-90 transition-all shadow-highlight"
                >
                  Sign Up Now
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-3 text-center font-medium rounded-full border border-accent-primary  hover:bg-accent-primary/10 transition-all"
                >
                  Sign In
                </Link>
              </div>
            ) : (
              <div className="mb-8">
                <Link
                  href="/predictions/BTCUSD"
                  className="px-8 py-3 text-center font-medium rounded-full bg-gradient-primary text-white hover:opacity-90 transition-all shadow-highlight"
                >
                  Start Predicting
                </Link>
              </div>
            )}

            <div className="flex gap-4 items-center text-content-tertiary text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background-primary bg-surface-tertiary flex items-center justify-center overflow-hidden"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 text-content-quaternary"
                    >
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                ))}
              </div>
              <span>
                <strong>2,500+</strong> predictors have joined
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative z-10">
            <Image
              src="/JBEANMascot.png"
              alt="JBEAN Mascot"
              width={300}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
