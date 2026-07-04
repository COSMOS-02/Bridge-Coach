import { Header, Footer } from "@/components/Header";

export default function TermsPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-950 text-slate-200">
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold text-white">Terms of Service</h1>
        <p className="mt-4 text-slate-400">
          Bridge Coach provides career guidance and educational recommendations for informational purposes only.
        </p>
        <div className="mt-8 space-y-4 text-sm leading-7 text-slate-300">
          <p>Users must provide accurate account information and keep credentials secure.</p>
          <p>Bridge Coach is not responsible for decisions made solely based on recommendations or third-party services.</p>
          <p>We may update these terms as the platform evolves.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
