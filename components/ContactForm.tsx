"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Mesaj iletilemedi.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    }
  }

  const fieldClass =
    "w-full rounded-2xl border border-coffee/10 bg-cream-soft/80 px-4 py-3.5 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] placeholder:text-ink-mute focus:outline-none focus:border-coffee focus:ring-2 focus:ring-gold/30 transition";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-coffee-deep mb-1.5">
            Ad Soyad
          </label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            className={fieldClass}
            placeholder="Adınız Soyadınız"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-coffee-deep mb-1.5">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={fieldClass}
            placeholder="+90 5xx xxx xx xx"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-coffee-deep mb-1.5">
          E-posta
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
          placeholder="ornek@eposta.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-coffee-deep mb-1.5">
          Konu
        </label>
        <input
          id="subject"
          name="subject"
          required
          maxLength={200}
          className={fieldClass}
          placeholder="Kısaca konunuz"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-coffee-deep mb-1.5">
          Mesajınız
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          className={fieldClass + " resize-y"}
          placeholder="Dosyanız ya da sorunuz hakkında kısa bir bilgi paylaşın..."
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          name="kvkk"
          required
          className="mt-1 w-4 h-4 accent-coffee-dark"
        />
        <span>
          Kişisel verilerimin{" "}
          <a href="/kvkk" className="text-coffee-deep underline underline-offset-2">
            KVKK Aydınlatma Metni
          </a>{" "}
          kapsamında işlenmesini kabul ediyorum.
        </span>
      </label>

      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Gönderiliyor..." : "Mesajı Gönder"}
        <Send className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 rounded-xl bg-gold/15 border border-gold/40 px-4 py-3 text-sm text-coffee-deep"
          >
            <Check className="w-5 h-5 mt-0.5 shrink-0" />
            <span>
              Mesajınız bize ulaştı. En geç bir iş günü içinde dönüş yapacağız.
            </span>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800"
          >
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <span>
              {error ?? "Mesajınız gönderilemedi."} Lütfen birkaç dakika sonra tekrar
              deneyin veya doğrudan e-posta ile yazın.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
