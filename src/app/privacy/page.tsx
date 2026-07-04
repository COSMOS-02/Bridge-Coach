import { Header, Footer } from "@/components/Header";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-950 text-slate-200">
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold text-white">Privacy Policy</h1>
        <p className="mt-4 text-slate-400">
          Bridge Coach collects account details, assessment answers, and optional profile information to provide personalized career guidance.
        </p>
        <div className="mt-8 space-y-4 text-sm leading-7 text-slate-300">
          <p>We use your information to create and maintain your account, save your assessment progress, and personalize recommendations.</p>
          <p>We do not sell your personal information. We store data securely and limit access to authorized systems only.</p>
          <p>You may request account deletion or data export by contacting support at hello@bridge-coach.app.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
