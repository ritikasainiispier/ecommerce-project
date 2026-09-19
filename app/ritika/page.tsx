export default function RitikaPage() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* Hero */}
      <section className="border-b border-black px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em]">
            Hello, I&apos;m
          </p>

          <h1 className="text-6xl font-bold md:text-8xl">
            Ritika
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-600">
            I work in digital marketing and I&apos;m currently learning
            web development by building real projects with Next.js,
            Supabase, GitHub and Vercel.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest">
              01 / About Me
            </p>

            <h2 className="text-4xl font-bold">
              A little about me
            </h2>
          </div>

          <div className="space-y-5 text-lg leading-8 text-gray-600">
            <p>
              I&apos;m Ritika. My background is in digital marketing,
              and I enjoy learning how online businesses, websites and
              digital platforms work.
            </p>

            <p>
              Along with marketing, I&apos;m now learning website
              development and deployment by working on practical
              projects instead of only studying theory.
            </p>

            <p>
              This website is one of those projects.
            </p>
          </div>

        </div>
      </section>

      {/* Skills */}
      <section className="bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">

          <p className="mb-3 text-sm font-bold uppercase tracking-widest">
            02 / Skills & Interests
          </p>

          <h2 className="mb-10 text-4xl font-bold">
            What I&apos;m working with
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">

            {[
              "Digital Marketing",
              "SEO",
              "Content Marketing",
              "Next.js",
              "Supabase",
              "GitHub",
              "Vercel",
              "HTML & CSS",
              "Website Development",
            ].map((skill) => (
              <div
                key={skill}
                className="border border-gray-600 px-5 py-5 text-lg"
              >
                {skill}
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Current Project */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">

          <p className="mb-3 text-sm font-bold uppercase tracking-widest">
            03 / Current Project
          </p>

          <h2 className="text-4xl font-bold">
            Learning by building
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            I recently built a test e-commerce website using Next.js
            and Supabase. The project includes products, categories,
            product variants, cart functionality, checkout, order
            management, GitHub deployment and a custom domain.
          </p>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-3 md:flex-row">
          <p className="font-semibold">
            Ritika
          </p>

          <p className="text-sm text-gray-500">
            Learning. Building. Improving.
          </p>
        </div>
      </footer>

    </main>
  );
}