import ChatWidget from "@/components/ChatWidget";
import Reveal from "@/components/Reveal";

const benefits = [
  "Отвечает мгновенно 24/7",
  "Собирает данные и фильтрует пустые заявки",
  "Отправляет счет/ссылку на оплату или записывает на встречу",
];

const steps = [
  {
    title: "Клиент пишет вам",
    text: "AI отвечает мгновенно и уточняет детали.",
  },
  {
    title: "AI собирает данные",
    text: "Адрес, тип работ, сроки, фото — всё в одном месте.",
  },
  {
    title: "Вы получаете готовую заявку",
    text: "Оплата/счет или встреча — автоматически.",
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40" />
      <div className="soft-glow -left-28 top-8 h-72 w-72" />
      <div className="soft-glow right-10 top-[38vh] h-72 w-72" />

      <section className="relative flex min-h-screen items-center px-6 py-16 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="animate-fadeUp space-y-8">
            <span className="inline-flex rounded-full border border-accent/20 bg-accent/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              24/7 AI-ассистент для заявок и оплаты
            </span>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-slate-900 md:text-6xl">
                Перестаньте терять клиентов, пока вы на объекте
              </h1>
              <p className="max-w-xl text-lg text-slate-600">
                AI-ассистент отвечает клиентам, собирает данные по проекту и доводит до оплаты или встречи — без вашего участия.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {benefits.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a href="#chat" className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-95">
                Попробовать в чате →
              </a>
              <a href="#how" className="text-sm font-semibold text-slate-600 hover:text-accent">
                Как это работает ↓
              </a>
            </div>
          </div>

          <div id="chat" className="space-y-3 lg:pl-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Демо: попробуйте прямо сейчас</p>
            <ChatWidget />
          </div>
        </div>
      </section>

      <section id="how" className="relative flex min-h-screen items-center px-6 py-16 lg:px-12">
        <div className="mx-auto w-full max-w-6xl space-y-10">
          <Reveal>
            <h2 className="text-3xl font-semibold md:text-5xl">Как это работает</h2>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.title}>
                <article className="h-full rounded-xl2 border border-slate-200 bg-white/95 p-6 shadow-soft" style={{ animationDelay: `${index * 120}ms` }}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">Шаг {index + 1}</p>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-slate-600">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <a href="#chat" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-accent/40 hover:text-accent">
              Вернуться в чат ↑
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
