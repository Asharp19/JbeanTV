import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textShadow: {
        lg: "0 0 8px rgba(255, 255, 255, 0.5)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui"],
      },
      colors: {
        content: {
          primary: "#FFFFFF",
          secondary: "rgba(255, 255, 255, 0.85)",
          tertiary: "rgba(255, 255, 255, 0.65)",
          quaternary: "rgba(255, 255, 255, 0.45)",
        },
        background: {
          primary: "#060B18",
          secondary: "#0A1020",
          tertiary: "#0F1629",
        },
        brand: {
          start: "#3B82F6", // Vibrant blue
          end: "#00D1FF", // Electric cyan
          accent: "#FF6B3D", // Warm orange
          purple: "#A78BFA", // Soft purple
          pink: "#EC4899", // Vibrant pink
          green: "#10B981", // Emerald green
        },
        surface: {
          primary: "rgba(6, 11, 24, 0.75)",
          secondary: "rgba(10, 16, 32, 0.65)",
          tertiary: "rgba(15, 22, 41, 0.55)",
          glass: "rgba(255, 255, 255, 0.12)",
          overlay: "rgba(0, 0, 0, 0.15)",
          start: "#1c1b36",
          end: "#121027",
        },
        border: {
          primary: "rgba(59, 130, 246, 0.2)", // Blue tint
          secondary: "rgba(0, 209, 255, 0.2)", // Cyan tint
          tertiary: "rgba(255, 255, 255, 0.08)", // White tint
          accent: "rgba(255, 107, 61, 0.2)", // Orange tint
          purple: "rgba(167, 139, 250, 0.2)", // Purple tint
        },
        status: {
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#3B82F6",
        },
        accent: {
          start: "#3b6bdc",
          end: "#4f46e5",
        },
        overlay: {
          start: "rgb(59, 130, 246)",
          "mid-1": "rgb(16, 185, 129)",
          "mid-2": "rgb(217, 70, 239)",
          end: "rgb(14, 116, 144)",
        },
        glow: {
          primary: "rgba(100, 200, 255, 0.4)",
        },
      },
      backgroundImage: {
        // Core gradients - Lighter and more vibrant
        "gradient-page":
          "radial-gradient(circle at top right, rgba(59, 130, 246, 0.25), rgba(0, 209, 255, 0.25), rgba(255, 107, 61, 0.25), rgba(167, 139, 250, 0.25)), linear-gradient(180deg, rgba(13, 22, 47, 0.8), rgba(19, 32, 66, 0.8))",

        // UI Gradients - More vibrant
        "gradient-primary": "linear-gradient(135deg, #3B82F6 0%, #00D1FF 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #A78BFA 0%, #EC4899 100%)",
        "gradient-accent": "linear-gradient(135deg, #FF6B3D 0%, #F59E0B 100%)",
        "gradient-success": "linear-gradient(135deg, #10B981 0%, #34D399 100%)",

        // Card & Container Gradients - Lighter and more transparent
        "gradient-card":
          "linear-gradient(180deg, rgba(15, 22, 41, 0.85) 0%, rgba(10, 16, 32, 0.85) 100%)",
        "gradient-glass":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)",

        // Interactive Elements - More variety
        "gradient-button-primary":
          "linear-gradient(135deg, #3B82F6 0%, #00D1FF 100%)",
        "gradient-button-secondary":
          "linear-gradient(135deg, #A78BFA 0%, #EC4899 100%)",
        "gradient-button-accent":
          "linear-gradient(135deg, #FF6B3D 0%, #F59E0B 100%)",
        "gradient-button-success":
          "linear-gradient(135deg, #10B981 0%, #34D399 100%)",

        // Special Effects - Enhanced and more visible
        "gradient-glow":
          "radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
        "gradient-highlight":
          "linear-gradient(to right, rgba(59, 130, 246, 0.15), rgba(0, 209, 255, 0.15))",
        "gradient-divider":
          "linear-gradient(to right, transparent, rgba(167, 139, 250, 0.2), transparent)",
        "gradient-shimmer":
          "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent)",

        // Chart & Data Visualization - More transparent
        "gradient-chart":
          "linear-gradient(180deg, rgba(10, 16, 32, 0.85) 0%, rgba(6, 11, 24, 0.85) 100%)",
        "gradient-data":
          "linear-gradient(180deg, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0) 100%)",
        "gradient-stats":
          "linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
      },
      boxShadow: {
        // Elevation Shadows - Lighter
        sm: "0 2px 4px rgba(0, 0, 0, 0.15)",
        DEFAULT: "0 4px 6px rgba(0, 0, 0, 0.2)",
        md: "0 6px 12px rgba(0, 0, 0, 0.25)",
        lg: "0 8px 16px rgba(0, 0, 0, 0.3)",
        xl: "0 12px 24px rgba(0, 0, 0, 0.35)",

        // Special Effects - More colorful
        glass: "0 8px 32px rgba(0, 0, 0, 0.25)",
        card: "0 4px 24px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px rgba(0, 0, 0, 0.15)",

        // Glow Effects - Enhanced with colors
        glow: "0 0 20px 2px var(--tw-shadow-color)",
        "glow-strong": "0 0 30px rgba(59, 130, 246, 0.45)",
        "glow-accent": "0 0 20px rgba(255, 107, 61, 0.35)",
        "glow-purple": "0 0 20px rgba(167, 139, 250, 0.35)",
        "glow-success": "0 0 20px rgba(16, 185, 129, 0.35)",

        // Combined Effects - Enhanced
        highlight: "inset 0 1px 1px rgba(255, 255, 255, 0.15)",
        "card-hover":
          "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.25)",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
      },
      opacity: {
        15: "0.15",
        35: "0.35",
        45: "0.45",
        65: "0.65",
        85: "0.85",
      },
      transitionProperty: {
        DEFAULT: "all",
        transform: "transform",
        opacity: "opacity",
        colors: "background-color, border-color, color, fill, stroke",
        shadow: "box-shadow",
      },
      transitionDuration: {
        DEFAULT: "200ms",
        fast: "150ms",
        slow: "300ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        rainbow: "rainbow 40s linear infinite",
        colorChange: "colorChange 5s linear infinite",
        beanAnimation: "beanAnimation 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shine: "shine 2s linear infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        rainbow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        colorChange: {
          "0%, 100%": { color: "#3B82F6" }, // brand.start
          "20%": { color: "#00D1FF" }, // brand.end
          "40%": { color: "#FF6B3D" }, // brand.accent
          "60%": { color: "#A78BFA" }, // brand.purple
          "80%": { color: "#10B981" }, // brand.green
        },
        beanAnimation: {
          "0%": {
            transform: "translateY(0)",
            color: "#FF6B3D", // brand.accent
          },
          "50%": {
            transform: "translateY(-25%)",
            color: "#A78BFA", // brand.purple
          },
          "100%": {
            transform: "translateY(0)",
            color: "#00D1FF", // brand.end
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
