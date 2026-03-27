import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

const DESKTOP_SEQUENCE = {
  delay: 0.42,
  takeoff: 1.18,
  hold: 3,
  peakSettle: 0.54,
  return: 1.14,
  scale: 5,
  glowScale: 2.8,
  glowPeakScale: 4.1,
  glowOpacity: 1,
  glowPeakOpacity: 1,
  rayScale: 3.8,
  rayPeakScale: 5,
  rayOpacity: 0.98,
  rayPeakOpacity: 1,
  rayRotate: 28,
  rayPeakRotate: 52,
};

const MOBILE_SEQUENCE = {
  delay: 0.32,
  takeoff: 0.94,
  hold: 2.2,
  peakSettle: 0.42,
  return: 0.88,
  scale: 3.35,
  glowScale: 2.05,
  glowPeakScale: 2.75,
  glowOpacity: 0.92,
  glowPeakOpacity: 1,
  rayScale: 2.5,
  rayPeakScale: 3.2,
  rayOpacity: 0.86,
  rayPeakOpacity: 0.96,
  rayRotate: 18,
  rayPeakRotate: 30,
};

const REDUCED_SEQUENCE = {
  delay: 0.16,
  takeoff: 0.46,
  hold: 0.18,
  peakSettle: 0.2,
  return: 0.5,
  scale: 1.12,
  glowScale: 1.08,
  glowPeakScale: 1.12,
  glowOpacity: 0.16,
  glowPeakOpacity: 0.22,
  rayScale: 1,
  rayPeakScale: 1,
  rayOpacity: 0,
  rayPeakOpacity: 0,
  rayRotate: 0,
  rayPeakRotate: 0,
};

function sleep(seconds) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, seconds * 1000);
  });
}

function getSequence(prefersReducedMotion) {
  if (prefersReducedMotion) {
    return REDUCED_SEQUENCE;
  }

  return window.innerWidth < 768 ? MOBILE_SEQUENCE : DESKTOP_SEQUENCE;
}

const LIGHT_RISE_EASE = [0.16, 0.84, 0.24, 1];
const LIGHT_SETTLE_EASE = [0.28, 0.08, 0.18, 1];
const LIGHT_RETURN_EASE = [0.24, 0.72, 0.18, 1];

function AnimatedLogoIntro({ src, alt, play, className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  const logoControls = useAnimationControls();
  const glowControls = useAnimationControls();
  const raysControls = useAnimationControls();

  useEffect(() => {
    if (!play) {
      logoControls.set({ scale: 1, rotate: 0 });
      glowControls.set({ opacity: 0, scale: 0.76 });
      raysControls.set({ opacity: 0, scale: 0.8, rotate: 0 });
      return undefined;
    }

    let alive = true;

    const runSequence = async () => {
      const sequence = getSequence(prefersReducedMotion);
      const lightTakeoff = sequence.takeoff + (prefersReducedMotion ? 0 : 0.24);
      const lightPeakSettle = sequence.peakSettle + (prefersReducedMotion ? 0 : 0.18);
      const lightReturn = sequence.return + (prefersReducedMotion ? 0 : 0.28);

      logoControls.set({ scale: 1, rotate: 0 });
      glowControls.set({ opacity: 0, scale: 0.76 });
      raysControls.set({ opacity: 0, scale: 0.8, rotate: 0 });

      await sleep(sequence.delay);

      if (!alive) {
        return;
      }

      glowControls.start({
        opacity: sequence.glowOpacity,
        scale: sequence.glowScale,
        transition: {
          duration: lightTakeoff,
          ease: LIGHT_RISE_EASE,
        },
      });

      raysControls.start({
        opacity: sequence.rayOpacity,
        scale: sequence.rayScale,
        rotate: sequence.rayRotate,
        transition: {
          duration: lightTakeoff,
          ease: LIGHT_RISE_EASE,
        },
      });

      await logoControls.start({
        scale: sequence.scale,
        rotate: prefersReducedMotion ? 0 : 10,
        transition: {
          duration: sequence.takeoff,
          ease: [0.22, 1, 0.36, 1],
        },
      });

      if (!alive) {
        return;
      }

      await Promise.all([
        logoControls.start({
          scale: sequence.scale,
          rotate: prefersReducedMotion ? 0 : 6,
          transition: {
            duration: sequence.peakSettle,
            ease: "easeInOut",
          },
        }),
        glowControls.start({
          opacity: sequence.glowPeakOpacity,
          scale: sequence.glowPeakScale,
          transition: {
            duration: lightPeakSettle,
            ease: LIGHT_SETTLE_EASE,
          },
        }),
        raysControls.start({
          opacity: sequence.rayPeakOpacity,
          scale: sequence.rayPeakScale,
          rotate: sequence.rayPeakRotate,
          transition: {
            duration: lightPeakSettle,
            ease: LIGHT_SETTLE_EASE,
          },
        }),
      ]);

      if (!alive) {
        return;
      }

      await sleep(sequence.hold);

      if (!alive) {
        return;
      }

      glowControls.start({
        opacity: 0,
        scale: sequence.glowScale + 0.12,
        transition: {
          duration: lightReturn,
          ease: LIGHT_RETURN_EASE,
        },
      });

      raysControls.start({
        opacity: 0,
        scale: sequence.rayScale + 0.08,
        rotate: sequence.rayRotate + 14,
        transition: {
          duration: lightReturn,
          ease: LIGHT_RETURN_EASE,
        },
      });

      await logoControls.start({
        scale: 1,
        rotate: 0,
        transition: {
          duration: sequence.return,
          ease: [0.18, 0.88, 0.28, 1],
        },
      });
    };

    runSequence();

    return () => {
      alive = false;
      logoControls.stop();
      glowControls.stop();
      raysControls.stop();
    };
  }, [glowControls, logoControls, play, prefersReducedMotion, raysControls]);

  return (
    <span className={`logo-sun-root ${className}`} aria-hidden="true">
      <motion.span
        className="logo-sun-halo"
        initial={false}
        animate={glowControls}
      />
      <motion.span
        className="logo-sun-glow"
        initial={false}
        animate={glowControls}
      />
      <motion.span
        className="logo-sun-rays"
        initial={false}
        animate={raysControls}
      />
      <motion.span
        className="logo-sun-motion"
        initial={false}
        animate={logoControls}
      >
        <span className="logo-sun-frame">
          <img src={src} alt={alt} className="brand-crest logo-sun-image" />
        </span>
      </motion.span>
    </span>
  );
}

export default AnimatedLogoIntro;
