"use client";

import { FormEvent, useMemo, useState } from "react";
import { QUICK_REPLIES, STARTER_MESSAGES } from "@/lib/chatConfig";

type Role = "assistant" | "user";
type Stage = "questions" | "cta" | "form" | "done";
type CtaType = "meeting" | "invoice" | "estimate";

type Message = {
  role: Role;
  content: string;
};

const QUESTIONS = [
  "Чем вы занимаетесь? (стройка / вышки / сервис / другое)",
  "Как сейчас приходят заявки?",
  "Что чаще всего теряется: скорость ответа, сбор данных, счета/оплата, найм сотрудников?",
  "Какие услуги/работы самые прибыльные?",
  "В каком городе/штате вы работаете?",
];

const CTA_LABELS: Record<CtaType, string> = {
  meeting: "Назначить встречу на 15 минут",
  invoice: "Получить счет на запуск",
  estimate: "Быстрый расчет",
};

const initialMessages = (): Message[] => [
  { role: "assistant", content: STARTER_MESSAGES[0] },
  { role: "assistant", content: STARTER_MESSAGES[1] },
];

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<Stage>("questions");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedCta, setSelectedCta] = useState<CtaType | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const canShowQuickReplies = stage === "questions" && questionIndex === 0 && answers.length === 0;

  const pushAssistant = (content: string) =>
    setMessages((prev) => [...prev, { role: "assistant", content }]);

  const pushUser = (content: string) =>
    setMessages((prev) => [...prev, { role: "user", content }]);

  const proceedQuestionFlow = (value: string) => {
    const nextAnswers = [...answers, value];
    setAnswers(nextAnswers);

    if (questionIndex < QUESTIONS.length - 1) {
      const nextQuestion = QUESTIONS[questionIndex + 1];
      setQuestionIndex((prev) => prev + 1);
      setTimeout(() => pushAssistant(nextQuestion), 220);
      return;
    }

    setStage("cta");
    const summary = `Я понял: вы хотите быстрее обрабатывать заявки и меньше терять клиентов.\nЯдро задачи: автоматизировать ответы, сбор данных и следующий шаг к оплате/встрече.`;
    setTimeout(() => {
      pushAssistant(summary);
      pushAssistant(
        "Минимальный сценарий: ставим ассистента на сайт → он собирает данные → отправляет вам готовую заявку → клиент получает оплату/встречу.",
      );
      pushAssistant("Выберите удобный следующий шаг:");
    }, 220);
  };

  const submitUserText = (value: string) => {
    if (!value.trim()) return;
    const normalized = value.trim();
    pushUser(normalized);
    setInput("");

    if (stage === "questions") {
      proceedQuestionFlow(normalized);
    }
  };

  const onQuickReply = (value: string) => submitUserText(value);

  const chooseCta = (type: CtaType) => {
    setSelectedCta(type);
    setStage("form");
    pushUser(CTA_LABELS[type]);

    if (type === "meeting") {
      pushAssistant("Отлично. Оставьте имя, email/телефон и удобное время — и мы зафиксируем встречу.");
    }
    if (type === "invoice") {
      pushAssistant("Хорошо. Укажите имя, email и компанию — счет отправим на email (демо).");
    }
    if (type === "estimate") {
      pushAssistant("Супер. Нужны 4 пункта: тип бизнеса, где заявки, интеграции (календарь/оплата), объем заявок в месяц.");
    }
  };

  const formFields = useMemo(() => {
    if (selectedCta === "meeting") {
      return [
        { key: "name", label: "Имя" },
        { key: "contact", label: "Email или телефон" },
        { key: "time", label: "Удобное время" },
      ];
    }
    if (selectedCta === "invoice") {
      return [
        { key: "name", label: "Имя" },
        { key: "email", label: "Email" },
        { key: "company", label: "Компания" },
      ];
    }
    if (selectedCta === "estimate") {
      return [
        { key: "business", label: "Тип бизнеса" },
        { key: "source", label: "Где приходят заявки" },
        { key: "integrations", label: "Нужные интеграции" },
        { key: "volume", label: "Заявок в месяц" },
      ];
    }
    return [];
  }, [selectedCta]);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedCta) return;

    const filled = formFields.every((field) => formData[field.key]?.trim());
    if (!filled) return;

    setStage("done");
    pushAssistant("Запрос принят ✅ Это демо-версия, реальных отправок пока нет. Хотите начать заново?");
  };

  const resetChat = () => {
    setMessages(initialMessages());
    setInput("");
    setStage("questions");
    setQuestionIndex(0);
    setAnswers([]);
    setSelectedCta(null);
    setFormData({});
  };

  return (
    <div className="rounded-xl2 border border-slate-200 bg-white/95 p-4 shadow-soft backdrop-blur animate-fadeUp [animation-delay:180ms]">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Демо-ассистент</p>
        <button onClick={resetChat} className="text-xs font-medium text-accent hover:opacity-80">
          Начать заново
        </button>
      </div>

      <div className="h-[460px] space-y-3 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
        {messages.map((message, idx) => (
          <div key={`${message.role}-${idx}`} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed whitespace-pre-line ${
                message.role === "assistant"
                  ? "border border-slate-200 bg-white text-slate-700"
                  : "bg-accent text-white"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {canShowQuickReplies && (
          <div className="flex flex-wrap gap-2">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => onQuickReply(reply)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 transition hover:border-accent/40 hover:text-accent"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {stage === "cta" && (
          <div className="grid gap-2">
            {(Object.keys(CTA_LABELS) as CtaType[]).map((type) => (
              <button
                key={type}
                onClick={() => chooseCta(type)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-700 transition hover:border-accent/40 hover:text-accent"
              >
                {CTA_LABELS[type]}
              </button>
            ))}
          </div>
        )}

        {stage === "form" && selectedCta && (
          <form onSubmit={submitForm} className="space-y-2 rounded-2xl border border-slate-200 bg-white p-3">
            {formFields.map((field) => (
              <label key={field.key} className="block">
                <span className="mb-1 block text-xs text-slate-500">{field.label}</span>
                <input
                  value={formData[field.key] ?? ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-accent/20 focus:ring"
                />
              </label>
            ))}
            <button type="submit" className="w-full rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-white">
              Отправить (демо)
            </button>
          </form>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitUserText(input);
        }}
        className="mt-3 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
          className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-accent/20 focus:ring"
        />
        <button type="submit" className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white">
          Отправить
        </button>
      </form>
    </div>
  );
}
