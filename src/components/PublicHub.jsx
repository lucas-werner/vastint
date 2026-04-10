import { ChevronRight, Shield, Globe, FileCheck, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PublicHub() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#23282d]">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-vastintPrimary" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-vastintPrimary" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <img src="/logo_vastint_white.svg" alt="Vastint" className="h-10 mb-8" />
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
              <Shield className="h-4 w-4 text-vastintPrimary" />
              Privacy &amp; Data Protection
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              The global home of{' '}
              <span className="text-vastintPrimary">privacy compliance</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl">
              Manage Data Protection Impact Assessments, Transfer Impact Assessments,
              global privacy policies, and data breach severity assessments — all from
              one platform.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-vastintPrimary px-7 py-3.5 font-semibold text-white shadow-lg shadow-vastintPrimary/20 transition-all hover:bg-vastintPrimary/90 hover:shadow-xl hover:shadow-vastintPrimary/25 active:scale-[0.98]"
              >
                Access Dashboard
                <ChevronRight className="h-5 w-5" />
              </Link>
              <a
                href="https://vastint.eu"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-7 py-3.5 font-semibold text-white transition-all hover:border-white/30 hover:bg-white/5"
              >
                About Vastint
              </a>
            </div>
          </div>
        </div>

        {/* Bottom separator line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vastintPrimary/30 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="bg-[#23282d] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-vastintPrimary">
              Platform capabilities
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Everything you need for privacy management
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: FileCheck,
                title: 'DPIA',
                description: 'Conduct and manage Data Protection Impact Assessments with structured workflows.',
              },
              {
                icon: Globe,
                title: 'TIA',
                description: 'Evaluate Transfer Impact Assessments for international data transfers.',
              },
              {
                icon: Shield,
                title: 'Policies',
                description: 'Maintain and distribute global privacy policies across your organisation.',
              },
              {
                icon: AlertTriangle,
                title: 'Data Breach',
                description: 'Assess breach severity using the ENISA methodology and generate reports.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-white/10 bg-[#2c3338] p-6 transition-all hover:border-vastintPrimary/30"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-vastintPrimary/10 text-vastintPrimary transition-colors group-hover:bg-vastintPrimary group-hover:text-white">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#2c3338] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/40 md:flex-row">
          <div className="flex items-center gap-3">
            <img src="/logo_vastint_white.svg" alt="Vastint" className="h-5" />
            <span className="text-white/40">Privacy Hub</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Vastint. All rights reserved.</p>
          <p className="text-white/40 text-sm">
            Developed by{' '}
            <a
              href="https://www.linkedin.com/in/noronha-lucas/"
              target="_blank"
              rel="noreferrer"
              className="text-vastintPrimary hover:underline"
            >
              Lucas Noronha
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
