import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    role: "Backend Engineer",
    company: "Cognitive Techware Private Limited",
    duration: "Jun 2021 - Nov 2023",
    description: "Scaled enterprise APIs in Python and Go for 50K+ users.",
  },
  {
    role: "Master of Science, Computer Science",
    company: "University of Central Missouri",
    duration: "Jan 2024 - Dec 2025",
    description: "Graduate studies in CS — focused on AI, ML, and distributed systems.",
  },
  {
    role: "Backend Engineer Intern",
    company: "ReplyQuickAI",
    duration: "Jan 2026 - Apr 2026",
    description: "Built HIPAA-compliant QR routing and cryptographic security middleware.",
  },
  {
    role: "Full Stack Engineer Intern",
    company: "SmileSyncAI",
    duration: "May 2026 - Present",
    description: "Optimized Next.js app — PageSpeed 46 to 91+ across production.",
  },
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const isAbove = idx % 2 === 0;
  const cardY = useTransform(scrollYProgress, [start, end], [isAbove ? 30 : -30, 0]);
  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if (layout === "desktop") {
    return (
      <div
        className="relative flex-1 flex justify-center items-center min-w-0"
        key={`${exp.company}-${exp.role}-${idx}`}
      >
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
        <motion.div
          className={`absolute ${isAbove ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
          style={{ height: 40, opacity: cardOpacity }}
        />
        <motion.article
          className={`absolute ${isAbove ? "bottom-12" : "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
          style={{ opacity: cardOpacity, y: cardY, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400 mb-3">
            {exp.company} | {exp.duration}
          </p>
          <p className="text-md text-gray-300 break-words">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  // Mobile layout
  return (
    <div
      key={`${exp.company}-${exp.role}-m-${idx}`}
      className="relative flex items-start"
    >
      <motion.div
        className="absolute -left-[22px] top-3 z-10 w-5 h-5 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.1)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />
      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-4 w-full shadow-lg"
        style={{ opacity: cardOpacity, x: cardX }}
      >
        <h3 className="text-base font-semibold break-words">{exp.role}</h3>
        <p className="text-xs text-gray-400 mb-1 break-words">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-xs text-gray-300 break-words">{exp.description}</p>
      </motion.article>
    </div>
  );
}

const Experience = () => {
  const sceneRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile
    ? experiences.length * 120
    : 100 * experiences.length * 1.2;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const numExperiences = experiences.length;
  const thresholds = React.useMemo(
    () =>
      Array.from({ length: numExperiences }, (_, i) => (i + 1) / numExperiences),
    [numExperiences]
  );

  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "100vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

          {/* Title */}
          <div className="shrink-0 px-6 pt-8 pb-4">
            <h2 className="text-4xl sm:text-5xl font-semibold text-center">
              Experience
            </h2>
          </div>

          {/* Desktop */}
          <div className="flex-1 items-center justify-center px-6 pb-10 hidden md:flex">
            <div className="relative w-full max-w-7xl">
              <div className="relative h-[6px] bg-white/15 rounded">
                <motion.div
                  className="absolute left-0 top-0 h-[6px] bg-white rounded origin-left"
                  style={{ width: lineWidth }}
                />
              </div>
              <div className="relative flex justify-between mt-0">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex-1 flex flex-col md:hidden overflow-hidden">
            <div className="relative h-full px-6">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-[3px] bg-white/15">
                <motion.div
                  className="absolute top-0 left-0 w-[3px] bg-white origin-top"
                  style={{ height: lineHeight }}
                />
              </div>
              {/* Cards */}
              <div className="relative h-full flex flex-col justify-around pl-10 py-4">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-m-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;