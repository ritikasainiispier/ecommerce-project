export default function RitikaPage() {
  const skills = [
    "Python",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Tableau",
    "Power BI",
    "Digital Marketing",
  ];

  const projects = [
    {
      title: "Calculator",
      description:
        "A simple calculator project created to practice programming logic, user input handling and basic application structure.",
    },
    {
      title: "E-Book Tracker",
      description:
        "A project designed to organize and track e-books, reading progress and book-related information in one place.",
    },
    {
      title: "E-Commerce Website",
      description:
        "A complete test e-commerce website built with Next.js and Supabase, including products, variants, cart, checkout, order management and deployment on Vercel.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">

          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
              Digital Marketing • Technology • Learning
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Hi, I&apos;m
              <span className="block text-indigo-400">
                Ritika Saini.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              I&apos;m a B.Tech graduate currently working at
              Ispier Tech Private Limited, Kurukshetra.
              My professional background is in digital marketing, and
              I&apos;m also expanding my technical skills by learning
              programming, data analysis and web development.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <a
                href="mailto:ritikasaini.ispier@gmail.com"
                className="rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
              >
                Contact Me
              </a>

              <a
                href="#projects"
                className="rounded-lg border border-slate-600 px-6 py-3 font-semibold text-slate-200 transition hover:border-indigo-400 hover:text-indigo-300"
              >
                View Projects
              </a>

            </div>
          </div>

          {/* INITIALS CARD */}
          <div className="flex justify-center md:justify-end">
            <div className="flex h-72 w-72 items-center justify-center rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 shadow-2xl shadow-indigo-950">
              <div className="flex h-48 w-48 items-center justify-center rounded-full border border-indigo-400/40 bg-slate-900 text-7xl font-bold text-indigo-300">
                RS
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-400">
              01 / About Me
            </p>

            <h2 className="text-4xl font-bold">
              Marketing background.
              <span className="block text-slate-400">
                Growing technical skills.
              </span>
            </h2>
          </div>

          <div className="space-y-5 text-lg leading-8 text-slate-300">
            <p>
              I completed my B.Tech and currently work at
              Ispier Tech Private Limited in Kurukshetra.
            </p>

            <p>
              My primary professional background is in digital marketing,
              where I work with online visibility, content, audience
              research and digital platforms.
            </p>

            <p>
              Alongside marketing, I&apos;m actively learning programming,
              data analysis and website development. I prefer learning by
              building practical projects instead of only studying theory.
            </p>

            <p>
              My goal is to develop a combination of marketing,
              analytical and technical skills that can help me understand
              digital products from both a business and technology perspective.
            </p>
          </div>

        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="bg-slate-900 px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            02 / Experience
          </p>

          <h2 className="mb-10 text-4xl font-bold">
            Digital Marketing
          </h2>

          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-8">

            <div className="flex flex-col justify-between gap-3 md:flex-row">
              <div>
                <h3 className="text-2xl font-bold">
                  Ispier Tech Private Limited
                </h3>

                <p className="mt-2 text-indigo-300">
                  Digital Marketing
                </p>
              </div>

              <p className="text-slate-400">
                Kurukshetra
              </p>
            </div>

            <p className="mt-6 max-w-4xl leading-7 text-slate-300">
              My work involves understanding digital audiences,
              improving online visibility, researching opportunities,
              working with content and studying how brands can build
              a stronger presence across digital platforms.
            </p>

          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-400">
            03 / Skills
          </p>

          <h2 className="mb-10 text-4xl font-bold">
            Skills & Tools
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {skills.map((skill) => (
              <div
                key={skill}
                className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-6 transition hover:-translate-y-1 hover:border-indigo-400"
              >
                <p className="text-lg font-semibold">
                  {skill}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            04 / Projects
          </p>

          <h2 className="mb-10 text-4xl font-bold">
            Things I&apos;ve Built
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            {projects.map((project, index) => (
              <div
                key={project.title}
                className="rounded-2xl border border-slate-700 bg-slate-900 p-7 transition hover:border-indigo-400"
              >
                <p className="mb-5 text-sm font-bold text-indigo-400">
                  0{index + 1}
                </p>

                <h3 className="text-2xl font-bold">
                  {project.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {project.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CURRENT LEARNING */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950 to-slate-900 p-8 md:p-12">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
              05 / Currently Learning
            </p>

            <h2 className="text-4xl font-bold">
              Learning by building.
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              I&apos;m currently improving my knowledge of Python,
              data analysis, visualization, website development,
              databases and modern deployment tools.
              I believe consistent practice and real projects are
              the best way to improve.
            </p>

          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="border-t border-slate-800 px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-400">
            06 / Contact
          </p>

          <h2 className="text-4xl font-bold">
            Let&apos;s Connect
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-slate-400">
            Want to connect regarding digital marketing,
            technology or projects? Feel free to reach out.
          </p>

          <a
            href="mailto:ritikasaini.ispier@gmail.com"
            className="mt-8 inline-block rounded-lg bg-indigo-500 px-7 py-4 font-semibold transition hover:bg-indigo-400"
          >
            ritikasaini.ispier@gmail.com
          </a>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-sm text-slate-500 md:flex-row">

          <p>
            © 2026 Ritika Saini
          </p>

          <p>
            Digital Marketing • Data • Technology
          </p>

        </div>
      </footer>

    </main>
  );
}