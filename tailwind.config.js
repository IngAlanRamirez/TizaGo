/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        accent: {
          50: "#fefbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "fade-in-down": "fadeInDown 0.8s ease-out",
        "fade-in-left": "fadeInLeft 0.8s ease-out",
        "fade-in-right": "fadeInRight 0.8s ease-out",
        "slide-in": "slideIn 0.8s ease-out",
        "slide-in-up": "slideInUp 0.8s ease-out",
        "slide-in-down": "slideInDown 0.8s ease-out",
        "slide-in-left": "slideInLeft 0.8s ease-out",
        "slide-in-right": "slideInRight 0.8s ease-out",
        float: "float 3s ease-in-out infinite",
        "float-gentle": "floatGentle 4s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "float-up": "floatUp 15s linear infinite",
        "float-particle": "floatParticle 8s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "glow-strong": "glowStrong 3s ease-in-out infinite",
        "pulse-gentle": "pulseGentle 3s ease-in-out infinite",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        "bounce-soft": "bounceSoft 3s ease-in-out infinite",
        "spin-slow": "spinSlow 20s linear infinite",
        "spin-reverse": "spinReverse 20s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        shine: "shine 2s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        wave: "wave 4s ease-in-out infinite",
        ripple: "ripple 0.6s ease-out",
        "zoom-in": "zoomIn 0.5s ease-out",
        "zoom-out": "zoomOut 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "scale-out": "scaleOut 0.3s ease-out",
        "rotate-in": "rotateIn 0.5s ease-out",
        "rotate-out": "rotateOut 0.5s ease-out",
        "flip-in": "flipIn 0.6s ease-out",
        "flip-out": "flipOut 0.6s ease-out",
        morph: "morph 4s ease-in-out infinite",
        breathe: "breathe 4s ease-in-out infinite",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
        typewriter: "typewriter 3s steps(20) 1s both",
        blink: "blink 1s step-end infinite",
        reveal: "reveal 0.8s ease-out",
        "blur-in": "blurIn 0.6s ease-out",
        "blur-out": "blurOut 0.6s ease-out",
        "slide-reveal": "slideReveal 1s ease-out",
        "gradient-shift": "gradientShift 4s ease-in-out infinite",
        "color-cycle": "colorCycle 6s ease-in-out infinite",
        "border-dance": "borderDance 3s ease-in-out infinite",
        "shadow-pulse": "shadowPulse 2s ease-in-out infinite",
        "text-shadow": "textShadow 3s ease-in-out infinite",
        aurora: "aurora 8s ease-in-out infinite",
        parallax: "parallax 1s ease-out",
        tilt: "tilt 0.3s ease-out",
        "hover-lift": "hoverLift 0.3s ease-out",
        "click-bounce": "clickBounce 0.3s ease-out",
        magnetic: "magnetic 0.3s ease-out",
        elastic: "elastic 0.6s ease-out",
        rubber: "rubber 0.8s ease-out",
        jello: "jello 0.9s ease-out",
        tada: "tada 1s ease-out",
        flash: "flash 1s ease-out",
        wobble: "wobble 1s ease-out",
        swing: "swing 1s ease-out",
        "roll-in": "rollIn 0.8s ease-out",
        "roll-out": "rollOut 0.8s ease-out",
        "light-speed": "lightSpeed 0.5s ease-out",
        hinge: "hinge 2s ease-out",
        "jack-in-box": "jackInBox 1s ease-out",
        entrance: "entrance 1s ease-out",
        attention: "attention 1s ease-out",
        exit: "exit 1s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(1deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        floatUp: {
          "0%": { transform: "translateY(100vh) scale(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100vh) scale(1)", opacity: "0" },
        },
        floatParticle: {
          "0%, 100%": {
            transform: "translateY(0px) translateX(0px) rotate(0deg)",
          },
          "25%": {
            transform: "translateY(-10px) translateX(5px) rotate(90deg)",
          },
          "50%": {
            transform: "translateY(-5px) translateX(-5px) rotate(180deg)",
          },
          "75%": {
            transform: "translateY(-15px) translateX(3px) rotate(270deg)",
          },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(220, 38, 38, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(220, 38, 38, 0.8)" },
        },
        glowStrong: {
          "0%, 100%": {
            boxShadow:
              "0 0 30px rgba(220, 38, 38, 0.3), 0 0 60px rgba(245, 158, 11, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 50px rgba(220, 38, 38, 0.5), 0 0 100px rgba(245, 158, 11, 0.3)",
          },
        },
        pulseGentle: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.8", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.02)", opacity: "1" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spinReverse: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(3deg)" },
          "75%": { transform: "rotate(-3deg)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1) rotate(180deg)" },
        },
        shine: {
          "0%": { transform: "translateX(-100%) rotate(45deg)" },
          "100%": { transform: "translateX(100%) rotate(45deg)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%) skewX(-15deg)" },
          "100%": { transform: "translateX(200%) skewX(-15deg)" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(-100%) skewX(-15deg)" },
          "50%": { transform: "translateX(100%) skewX(-15deg)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        zoomIn: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        zoomOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0)", opacity: "0" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.8)", opacity: "0" },
        },
        rotateIn: {
          "0%": { transform: "rotate(-90deg)", opacity: "0" },
          "100%": { transform: "rotate(0deg)", opacity: "1" },
        },
        rotateOut: {
          "0%": { transform: "rotate(0deg)", opacity: "1" },
          "100%": { transform: "rotate(90deg)", opacity: "0" },
        },
        flipIn: {
          "0%": { transform: "rotateY(-90deg)", opacity: "0" },
          "100%": { transform: "rotateY(0deg)", opacity: "1" },
        },
        flipOut: {
          "0%": { transform: "rotateY(0deg)", opacity: "1" },
          "100%": { transform: "rotateY(90deg)", opacity: "0" },
        },
        morph: {
          "0%, 100%": { borderRadius: "50%" },
          "50%": { borderRadius: "0%" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "20%": { transform: "scale(1.1)" },
          "40%": { transform: "scale(1)" },
          "60%": { transform: "scale(1.1)" },
          "80%": { transform: "scale(1)" },
        },
        typewriter: {
          "0%": { width: "0", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { width: "100%", opacity: "1" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        reveal: {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },
        blurIn: {
          "0%": { filter: "blur(10px)", opacity: "0" },
          "100%": { filter: "blur(0px)", opacity: "1" },
        },
        blurOut: {
          "0%": { filter: "blur(0px)", opacity: "1" },
          "100%": { filter: "blur(10px)", opacity: "0" },
        },
        slideReveal: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        colorCycle: {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
        borderDance: {
          "0%": { borderColor: "#dc2626" },
          "25%": { borderColor: "#f59e0b" },
          "50%": { borderColor: "#10b981" },
          "75%": { borderColor: "#3b82f6" },
          "100%": { borderColor: "#dc2626" },
        },
        shadowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 0, 0, 0.6)" },
        },
        textShadow: {
          "0%, 100%": { textShadow: "0 0 10px rgba(220, 38, 38, 0.5)" },
          "50%": { textShadow: "0 0 20px rgba(220, 38, 38, 0.8)" },
        },
        aurora: {
          "0%, 100%": {
            background:
              "linear-gradient(45deg, #dc2626, #f59e0b, #10b981, #3b82f6)",
            backgroundSize: "400% 400%",
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        parallax: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-50px)" },
        },
        tilt: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(5deg)" },
        },
        hoverLift: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-10px)" },
        },
        clickBounce: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        magnetic: {
          "0%": { transform: "translateX(0px) translateY(0px)" },
          "100%": { transform: "translateX(5px) translateY(-5px)" },
        },
        elastic: {
          "0%": { transform: "scaleX(1)" },
          "40%": { transform: "scaleX(1.4)" },
          "60%": { transform: "scaleX(0.8)" },
          "80%": { transform: "scaleX(1.1)" },
          "100%": { transform: "scaleX(1)" },
        },
        rubber: {
          "0%": { transform: "scale3d(1, 1, 1)" },
          "30%": { transform: "scale3d(1.25, 0.75, 1)" },
          "40%": { transform: "scale3d(0.75, 1.25, 1)" },
          "50%": { transform: "scale3d(1.15, 0.85, 1)" },
          "65%": { transform: "scale3d(0.95, 1.05, 1)" },
          "75%": { transform: "scale3d(1.05, 0.95, 1)" },
          "100%": { transform: "scale3d(1, 1, 1)" },
        },
        jello: {
          "11.1%": { transform: "skewX(-12.5deg) skewY(-12.5deg)" },
          "22.2%": { transform: "skewX(6.25deg) skewY(6.25deg)" },
          "33.3%": { transform: "skewX(-3.125deg) skewY(-3.125deg)" },
          "44.4%": { transform: "skewX(1.5625deg) skewY(1.5625deg)" },
          "55.5%": { transform: "skewX(-0.78125deg) skewY(-0.78125deg)" },
          "66.6%": { transform: "skewX(0.390625deg) skewY(0.390625deg)" },
          "77.7%": { transform: "skewX(-0.1953125deg) skewY(-0.1953125deg)" },
          "88.8%": { transform: "skewX(0.09765625deg) skewY(0.09765625deg)" },
          "100%": { transform: "skewX(0deg) skewY(0deg)" },
        },
        tada: {
          "0%": { transform: "scale3d(1, 1, 1)" },
          "10%, 20%": {
            transform: "scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)",
          },
          "30%, 50%, 70%, 90%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)",
          },
          "40%, 60%, 80%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)",
          },
          "100%": { transform: "scale3d(1, 1, 1)" },
        },
        flash: {
          "0%, 50%, 100%": { opacity: "1" },
          "25%, 75%": { opacity: "0" },
        },
        wobble: {
          "0%": { transform: "translateX(0%)" },
          "15%": { transform: "translateX(-25%) rotate(-5deg)" },
          "30%": { transform: "translateX(20%) rotate(3deg)" },
          "45%": { transform: "translateX(-15%) rotate(-3deg)" },
          "60%": { transform: "translateX(10%) rotate(2deg)" },
          "75%": { transform: "translateX(-5%) rotate(-1deg)" },
          "100%": { transform: "translateX(0%)" },
        },
        swing: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(10deg)" },
          "30%": { transform: "rotate(-8deg)" },
          "50%": { transform: "rotate(6deg)" },
          "70%": { transform: "rotate(-4deg)" },
          "90%": { transform: "rotate(2deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        rollIn: {
          "0%": {
            opacity: "0",
            transform: "translateX(-100%) rotate(-120deg)",
          },
          "100%": { opacity: "1", transform: "translateX(0px) rotate(0deg)" },
        },
        rollOut: {
          "0%": { opacity: "1", transform: "translateX(0px) rotate(0deg)" },
          "100%": {
            opacity: "0",
            transform: "translateX(100%) rotate(120deg)",
          },
        },
        lightSpeed: {
          "0%": { transform: "translateX(100%) skewX(-30deg)", opacity: "0" },
          "60%": { transform: "skewX(20deg)", opacity: "1" },
          "80%": { transform: "skewX(-5deg)", opacity: "1" },
          "100%": { transform: "translateX(0%) skewX(0deg)", opacity: "1" },
        },
        hinge: {
          "0%": { transformOrigin: "top left" },
          "20%, 60%": {
            transform: "rotate(80deg)",
            transformOrigin: "top left",
          },
          "40%, 80%": {
            transform: "rotate(60deg)",
            transformOrigin: "top left",
            opacity: "1",
          },
          "100%": { transform: "translateY(700px)", opacity: "0" },
        },
        jackInBox: {
          "0%": {
            opacity: "0",
            transform: "scale(0.1) rotate(30deg)",
            transformOrigin: "center bottom",
          },
          "50%": { transform: "rotate(-10deg)" },
          "70%": { transform: "rotate(3deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        entrance: {
          "0%": { opacity: "0", transform: "scale(0.3) rotate(6deg)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        attention: {
          "0%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.3)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.3)" },
          "70%": { transform: "scale(1)" },
        },
        exit: {
          "0%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
          "100%": { opacity: "0", transform: "scale(0.3) rotate(-6deg)" },
        },
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
        "5xl": "3rem",
      },
      boxShadow: {
        glow: "0 0 20px rgba(220, 38, 38, 0.5)",
        "glow-strong": "0 0 40px rgba(220, 38, 38, 0.8)",
        "glow-accent": "0 0 20px rgba(245, 158, 11, 0.5)",
        "glow-white": "0 0 20px rgba(255, 255, 255, 0.5)",
        glass: "0 8px 32px rgba(31, 38, 135, 0.37)",
        "glass-dark": "0 8px 32px rgba(0, 0, 0, 0.37)",
        "inner-glow": "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
        hover:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        active: "0 1px 2px rgba(0, 0, 0, 0.05)",
        outline: "0 0 0 3px rgba(59, 130, 246, 0.5)",
        none: "none",
      },
      filter: {
        glow: "drop-shadow(0 0 20px rgba(220, 38, 38, 0.5))",
        "blur-xs": "blur(2px)",
        "blur-sm": "blur(4px)",
        "blur-md": "blur(8px)",
        "blur-lg": "blur(12px)",
        "blur-xl": "blur(16px)",
        "blur-2xl": "blur(24px)",
        "blur-3xl": "blur(32px)",
      },
      scale: {
        102: "1.02",
        103: "1.03",
        104: "1.04",
        115: "1.15",
      },
      rotate: {
        15: "15deg",
        30: "30deg",
        60: "60deg",
        270: "270deg",
      },
      skew: {
        15: "15deg",
        30: "30deg",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
        size: "width, height",
        position: "top, right, bottom, left",
        background: "background-color, background-image, background-position",
        border: "border-color, border-width, border-style",
        text: "color, font-size, font-weight, line-height, letter-spacing",
        shadow: "box-shadow",
        filter: "filter",
        backdrop: "backdrop-filter",
      },
      transitionDuration: {
        2000: "2000ms",
        3000: "3000ms",
        4000: "4000ms",
        5000: "5000ms",
      },
      transitionDelay: {
        2000: "2000ms",
        3000: "3000ms",
        4000: "4000ms",
        5000: "5000ms",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        // Glassmorphism utilities
        ".glass": {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
        },
        ".glass-dark": {
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
        },
        ".glass-strong": {
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.5)",
        },
        ".glass-subtle": {
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 16px rgba(31, 38, 135, 0.2)",
        },
        // Hover effects
        ".hover-glow": {
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 0 30px rgba(220, 38, 38, 0.6)",
            transform: "scale(1.05)",
          },
        },
        ".hover-lift": {
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          },
        },
        ".hover-tilt": {
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "rotate(3deg) scale(1.05)",
          },
        },
        ".hover-bounce": {
          transition: "all 0.3s ease",
          "&:hover": {
            animation: "bounce 0.6s ease",
          },
        },
        // Text effects
        ".text-glow": {
          textShadow: "0 0 20px rgba(220, 38, 38, 0.5)",
        },
        ".text-glow-strong": {
          textShadow: "0 0 30px rgba(220, 38, 38, 0.8)",
        },
        ".text-glow-accent": {
          textShadow: "0 0 20px rgba(245, 158, 11, 0.5)",
        },
        ".text-glow-white": {
          textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
        },
        // Gradient text
        ".gradient-text": {
          background: "linear-gradient(45deg, #dc2626, #f59e0b)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
        ".gradient-text-animated": {
          background:
            "linear-gradient(45deg, #dc2626, #f59e0b, #10b981, #3b82f6)",
          backgroundSize: "400% 400%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "gradientShift 4s ease-in-out infinite",
        },
        // Morphing effects
        ".morphing-bg": {
          background:
            "linear-gradient(45deg, #dc2626, #f59e0b, #10b981, #3b82f6)",
          backgroundSize: "400% 400%",
          animation: "aurora 8s ease-in-out infinite",
        },
        // Button effects
        ".btn-magnetic": {
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateX(5px) translateY(-5px)",
          },
        },
        ".btn-elastic": {
          transition: "all 0.3s ease",
          "&:hover": {
            animation: "elastic 0.6s ease",
          },
        },
        ".btn-pulse": {
          "&:hover": {
            animation: "pulse 1s infinite",
          },
        },
        // Scroll effects
        ".scroll-reveal": {
          opacity: "0",
          transform: "translateY(30px)",
          transition: "all 0.8s ease",
          "&.revealed": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        ".scroll-fade": {
          opacity: "0",
          transition: "opacity 0.8s ease",
          "&.revealed": {
            opacity: "1",
          },
        },
        // Parallax
        ".parallax-slow": {
          transform: "translateY(0px)",
          transition: "transform 0.1s ease-out",
        },
        ".parallax-fast": {
          transform: "translateY(0px)",
          transition: "transform 0.05s ease-out",
        },
        // Loading effects
        ".loading-shimmer": {
          background:
            "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2s infinite",
        },
        ".loading-pulse": {
          animation: "pulse 2s infinite",
        },
        ".loading-spin": {
          animation: "spin 2s linear infinite",
        },
        // Interactive elements
        ".interactive-scale": {
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        },
        ".interactive-glow": {
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 0 25px rgba(220, 38, 38, 0.5)",
          },
        },
        ".interactive-tilt": {
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "perspective(1000px) rotateX(10deg) rotateY(10deg)",
          },
        },
        // Utility classes
        ".center-absolute": {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
        ".center-flex": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".full-screen": {
          width: "100vw",
          height: "100vh",
        },
        ".aspect-golden": {
          aspectRatio: "1.618",
        },
        ".aspect-video": {
          aspectRatio: "16/9",
        },
        ".aspect-square": {
          aspectRatio: "1/1",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
