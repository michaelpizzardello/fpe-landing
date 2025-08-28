"use client";
/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useState, useRef } from "react";

// Minimal, WakingUp-inspired landing page
// - TailwindCSS classes for styling
// - Anchored sections and sticky header
// - Fully responsive, clean typography, generous whitespace

export default function EducationLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Replace with your asset path (or signed URL)
  const remoteCourseBg = "https://imgur.com/undefined";
  const fallbackCourseBg = "/images/flagship-compass.png";

  // Background image state with remote->fallback (used for About preload as well if needed)
  const [bgUrl, setBgUrl] = useState(remoteCourseBg);

  // Testimonials horizontal scroller
  const tRef = useRef<HTMLDivElement>(null);

  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    setReveal(true);
  }, []);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10); // adjust threshold if needed
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Smooth scroll for in-page anchors
    document.documentElement.classList.add("scroll-smooth");
  }, []);

  // Preload course background; fall back if remote fails
  useEffect(() => {
    const img = new Image();
    img.src = remoteCourseBg;
    img.onload = () => setBgUrl(remoteCourseBg);
    img.onerror = () => setBgUrl(fallbackCourseBg);
  }, []);

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a
      href={href}
      onClick={() => setMenuOpen(false)}
      className="block px-4 py-2 text-sm md:text-base text-neutral-700 hover:text-black"
    >
      {children}
    </a>
  );

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top)] ${
          scrolled
            ? "border-b border-neutral-200 bg-white/80 backdrop-blur"
            : "border-b-0 bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Height shrinks on scroll */}
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-16 py-0" : "h-24 sm:h-28 py-2"
            }`}
          >
            <a
              href="#home"
              className="flex items-center"
              aria-label="Go to home"
            >
              {/* Logo text scales down on scroll */}
              <span
                className={`font-medium tracking-wide transition-all duration-300 ${
                  scrolled ? "text-base" : "text-lg sm:text-xl"
                }`}
              >
                First Principles Education
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#course">Course</NavLink>
              <NavLink href="#contact">Contact</NavLink>
              <a
                href="#contact"
                className="ml-2 inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Book consultation
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              aria-label="Toggle menu"
              className="md:hidden inline-flex items-center justify-center rounded-md border border-neutral-300 px-3 py-2 text-sm"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">Menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                {menuOpen ? (
                  <path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z" />
                ) : (
                  <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white">
            <div className="mx-auto max-w-6xl px-2 py-2">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#course">Course</NavLink>
              <NavLink href="#contact">Contact</NavLink>
              <a
                href="#contact"
                className="mx-2 my-2 block rounded-md bg-black px-4 py-3 text-center text-sm font-medium text-white"
              >
                Book consultation
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-start"
      >
        <div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          {/* Blue sky behind */}
          <div className="absolute inset-0 hero-sky" />
          {/* Lifting clouds (one-time reveal) */}
          <div className="hero-cloud hero-cloud--near"></div>
          <div className="hero-cloud hero-cloud--far"></div>
          {/* Persistent white wisps drifting */}
          <div className="hero-wisp hero-wisp--a"></div>
          <div className="hero-wisp hero-wisp--b"></div>
          {/* Bottom fade into next section color */}
          <div className="absolute inset-0 hero-fade-into-next" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-20 sm:py-28">
            <div
              className={`max-w-3xl mr-auto text-left transform-gpu transition-all duration-[8500ms] ease-out ${
                reveal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <h1 className="text-4xl/tight sm:text-5xl font-semibold tracking-tight">
                From Chaos to Clarity
              </h1>
              <p className="mt-5 max-w-2xl text-base sm:text-lg text-neutral-600">
                Blending modern insights with ancient wisdom to create lasting
                personal change.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-md bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
                >
                  Book consultation
                </a>
                <a
                  href="#course"
                  className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-800 hover:border-neutral-400"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course */}
      <section id="course" className="scroll-mt-24  relative bg-neutral-50">
        {/* Section banner image (full-bleed on mobile/tablet, constrained on desktop) */}
        <div className="-mx-4 sm:-mx-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <img
            src={remoteCourseBg}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = fallbackCourseBg;
            }}
            alt="Compass section banner"
            className="block w-full h-auto"
          />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 -mt-20 sm:-mt-40 lg:-mt-60">
          <div className="py-16 sm:py-24">
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              Flagship Course
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
              The Compass Within
            </h2>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left: Overview */}
              <div className="lg:col-span-5 max-w-3xl lg:pr-6">
                <p className="mt-0 text-neutral-700">
                  Screen addiction, anxiety, distractibility, loss of meaning,
                  burnout, the endless comparison culture of social media.
                </p>
                <p className="mt-3 text-neutral-700">
                  While schools lag behind, today’s students face psychological,
                  emotional, and structural battles — and they demand new tools.
                </p>
                <p className="mt-3 text-neutral-700">
                  <span className="font-medium">The Compass Within</span> is a
                  The Compass Within is a 6-week foundational course that
                  teaches the self-management skills schools don&rsquo;t.
                  Grounded in psychology, neuroscience, and philosophy, it
                  offers a powerful toolkit for building lifelong focus,
                  direction, emotional resilience, good habits and mental
                  health.
                </p>
                <h4 className="mt-8 text-base font-semibold text-neutral-900">
                  What’s Included
                </h4>
                <p className="mt-2 text-neutral-800">
                  A roadmap on how to sculpt your life and wake up from the grip
                  of habitual forces.
                </p>
                <ul className="mt-3 flex flex-wrap gap-3 text-sm text-neutral-600">
                  {[
                    "Six life‑changing modules",
                    "Extensive weekly notes",
                    "20+ guided exercises",
                  ].map((m) => (
                    <li
                      key={m}
                      className="border border-neutral-300 rounded-full px-3 py-1"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-6 sm:mt-8 lg:mt-12 inline-flex items-center justify-center rounded-md bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
                >
                  Book your free consultation
                </a>
              </div>

              {/* Right: Modules */}
              <div className="lg:col-span-7">
                <h3 className="text-lg font-semibold">Modules</h3>
                <div className="mt-4 grid grid-cols-1 gap-3">
                  {[
                    {
                      n: "01",
                      title: "Living Intentionally",
                      desc: "Practice the process of building value-aligned personal visions and motivations.",
                    },
                    {
                      n: "02",
                      title: "Transcending Impulsivity",
                      desc: "Distil visions into concrete goals and key actions to create focus.",
                    },
                    {
                      n: "03",
                      title: "Automating Success",
                      desc: "Use scientific strategies to build and break habits for consistent action.",
                    },
                    {
                      n: "04",
                      title: "Training The Mind",
                      desc: "Recognise and replace limiting beliefs and patterns of negative self-talk.",
                    },
                    {
                      n: "05",
                      title: "Breaking Cycles",
                      desc: "Disrupt avoidant and self-destructive cycles with reflection, mindfulness, self-compassion and direct action.",
                    },
                    {
                      n: "06",
                      title: "Being Present",
                      desc: "Lay the foundations for lifelong presence through mindfulness and meditation practices.",
                    },
                  ].map((m) => (
                    <div
                      key={m.n}
                      className="relative rounded-lg border border-neutral-200 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 text-[10px] font-medium text-neutral-600">
                          {m.n}
                        </div>
                        <div className="font-medium">{m.title}</div>
                      </div>
                      <p className="mt-1 text-sm leading-snug text-neutral-600">
                        {m.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mt-16">
              <h3 className="text-lg font-semibold">Testimonials</h3>
              <div className="mt-6 relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent"
                ></div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent"
                ></div>
                <div
                  ref={tRef}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
                >
                  {[
                    {
                      quote:
                        "Every single topic significantly changed my life. I now have a genuine realistic schedule, I am able to feel happy and have good sleep. I have come out of this dopamine and pleasure trap of cyclical patterns and now genuinely feel purely happy for the first time in my life. I feel in the present, I stopped watching porn, I have a clean room and I feel energised. I genuinely feel energised.",
                      name: "Anonymous",
                      school: "Cranbrook School",
                    },
                    {
                      quote:
                        "I learned how to solve problems within my life and direct myself towards a person I want to be. It has also helped me be a better friend and brother for my close ones.",
                      name: "Noah",
                      school: "Cranbrook School",
                    },
                    {
                      quote:
                        "Eye opening and engaging course that will steer you back on track no matter how far off it you are.",
                      name: "Hugo",
                      school: "Cranbrook School",
                    },
                    {
                      quote:
                        "Honestly made me understand how to become a better person, being kind not just to others but also myself.",
                      name: "Thomas",
                      school: "Cranbrook School",
                    },
                    {
                      quote: "Screen time lowered.",
                      name: "Anonymous",
                      school: "Cranbrook School",
                    },
                  ].map((t) => (
                    <figure
                      key={t.name + t.quote.slice(0, 12)}
                      className="min-w-[85%] sm:min-w-[60%] lg:min-w-[40%] snap-start rounded-lg border border-neutral-200 p-4 bg-white/80 backdrop-blur"
                    >
                      <blockquote className="text-neutral-800">
                        “{t.quote}”
                      </blockquote>
                      <figcaption className="mt-4 text-sm text-neutral-500">
                        <div className="font-medium text-neutral-700">
                          {t.name}
                        </div>
                        {t.school && <div>{t.school}</div>}
                      </figcaption>
                    </figure>
                  ))}
                </div>
                {/* Arrows */}
                <button
                  type="button"
                  aria-label="Previous"
                  className="hidden md:flex absolute inset-y-0 left-2 my-auto h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white/80 hover:bg-white"
                  onClick={() =>
                    tRef.current?.scrollBy({ left: -400, behavior: "smooth" })
                  }
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  className="hidden md:flex absolute inset-y-0 right-2 my-auto h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white/80 hover:bg-white"
                  onClick={() =>
                    tRef.current?.scrollBy({ left: 400, behavior: "smooth" })
                  }
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-24 border-t border-neutral-200"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Get in touch
              </h2>
              <p className="mt-4 text-neutral-700">
                Book a free 15‑minute consultation or ask a question. We’ll
                reply within one business day.
              </p>
              <div className="mt-6 text-sm text-neutral-600">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  hello@firstprinciples.education
                </p>
                <p className="mt-1">
                  <span className="font-medium">Hours:</span> Mon–Fri, 9am–5pm
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "Thanks! This is a demo form — wire it to your backend."
                  );
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="sm:col-span-1">
                  <label
                    htmlFor="firstName"
                    className="block text-sm text-neutral-700"
                  >
                    First name*
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                    placeholder="Jane"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm text-neutral-700"
                  >
                    Last name*
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                    placeholder="Doe"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="phone"
                    className="block text-sm text-neutral-700"
                  >
                    Phone*
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                    placeholder="+61 400 000 000"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="email"
                    className="block text-sm text-neutral-700"
                  >
                    Email*
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="role"
                    className="block text-sm text-neutral-700"
                  >
                    I am a...*
                  </label>
                  <select
                    id="role"
                    required
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Select...</option>
                    <option value="Student">Student</option>
                    <option value="Parent">Parent</option>
                    <option value="Teacher">Teacher</option>
                    <option value="School Administrator">
                      School Administrator
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm text-neutral-700"
                  >
                    Enquiry
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                    placeholder="Tell us a bit about what you’re looking for…"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="scroll-mt-24 border-t border-neutral-200 lg:flex-1"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                About Us
              </h2>
              <p className="mt-5 text-neutral-700 leading-relaxed">
                First Principles Education is dedicated to filling the gaps of
                modern education.
              </p>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                We help students escape traps of endless distraction and toxic
                stress by teaching them how to break unwanted patterns, find
                value-alignment and be present.
              </p>
            </div>
            <div>
              <div className="relative w-full overflow-hidden rounded-lg border border-neutral-200">
                {/* 16:9 responsive video embed */}
                <div className="relative pt-[56.25%]">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/cl93xw5F3cI?start=4"
                    title="About video"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} First Principles Education. All
              rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <a href="#about" className="hover:text-black">
                About
              </a>
              <a href="#course" className="hover:text-black">
                Course
              </a>
              <a href="#contact" className="hover:text-black">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
