import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Instagram,
  Laptop,
  LineChart,
  MapPin,
  Pill,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
} from "lucide-react";

const COURSE_OPTIONS = ["Marketing Digital", "Farmácia", "Administração", "Informática"];
const CITY_OPTIONS = ["Palmares - PE", "Escada - PE", "Vitória de Santo Antão - PE"];

function prefillEnrollment(data: { course?: string; city?: string }) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("prefill-enrollment", { detail: data }));
  const el = document.getElementById("matricula");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

import logoAvance from "@/assets/logo-avance.webp";
import estr01 from "@/assets/estrutura_01.webp";
import estr04 from "@/assets/Estrutura_04.webp";
import estr06 from "@/assets/Estrutura_06.webp";
import estr08 from "@/assets/Estrutura_08.webp";
import estr09 from "@/assets/Estrutura_09.webp";
import estrClass2 from "@/assets/class-2.webp";
import exp1 from "@/assets/IMG_7383.webp";
import exp2 from "@/assets/IMG_7384.webp";
import exp3 from "@/assets/IMG_7385.webp";
import exp4 from "@/assets/IMG_7386.webp";
import emojiHeader from "@/assets/emoji-header.webp";
import emojiFarm from "@/assets/emoji-farmacia.webp";
import emojiInfo from "@/assets/emoji-informatica.webp";
import emojiAdmin from "@/assets/emoji-admin.webp";
import emojiGames from "@/assets/emoji-games.webp";

const COSMIC_PARTICLES = [
  { top: "9%", left: "10%", size: 2, delay: "0s", dur: "18s" },
  { top: "18%", left: "78%", size: 3, delay: "2s", dur: "22s" },
  { top: "31%", left: "42%", size: 2, delay: "1s", dur: "20s" },
  { top: "47%", left: "88%", size: 4, delay: "3s", dur: "24s" },
  { top: "63%", left: "16%", size: 3, delay: "1.6s", dur: "21s" },
  { top: "78%", left: "70%", size: 2, delay: "0.8s", dur: "19s" },
  { top: "88%", left: "34%", size: 4, delay: "2.6s", dur: "23s" },
] as const;

const COSMIC_ORBITS = [
  { top: "15%", left: "7%", size: 170, delay: "0s", dur: "34s" },
  { top: "48%", left: "76%", size: 220, delay: "5s", dur: "42s" },
  { top: "74%", left: "11%", size: 130, delay: "9s", dur: "38s" },
] as const;

type CosmicParticleStyle = CSSProperties &
  Record<"--star-size" | "--dur" | "--delay", string>;

type CosmicOrbitStyle = CSSProperties &
  Record<"--orbit-size" | "--dur" | "--delay", string>;

function CosmicBackground() {
  return (
    <div aria-hidden className="cosmic-background">
      <div className="cosmic-veil" />
      {COSMIC_PARTICLES.map((particle, i) => (
        <span
          key={`particle-${i}`}
          className="cosmic-star"
          style={{
            top: particle.top,
            left: particle.left,
            "--star-size": `${particle.size}px`,
            "--dur": particle.dur,
            "--delay": particle.delay,
          } satisfies CosmicParticleStyle}
        />
      ))}
      {COSMIC_ORBITS.map((orbit, i) => (
        <span
          key={`orbit-${i}`}
          className="cosmic-orbit"
          style={{
            top: orbit.top,
            left: orbit.left,
            "--orbit-size": `${orbit.size}px`,
            "--dur": orbit.dur,
            "--delay": orbit.delay,
          } satisfies CosmicOrbitStyle}
        />
      ))}
    </div>
  );
}

const STRUCTURE_IMAGES = [
  { src: estr08, alt: "Recepção da Avance Cursos" },
  { src: estr01, alt: "Alunos praticando no laboratório de informática" },
  { src: estr06, alt: "Sala de aula do curso de saúde com equipamentos" },
  { src: estr04, alt: "Área de recepção e espera dos alunos" },
  { src: estr09, alt: "Sala de aula climatizada com quadro branco" },
  { src: estrClass2, alt: "Turma em aula prática de informática" },
];

const EXPERIENCES = [
  { src: exp1, alt: "Workshop prático de montagem e manutenção de computadores", tag: "Workshop" },
  { src: exp2, alt: "Palestra de empregabilidade e departamento pessoal", tag: "Palestra" },
  { src: exp3, alt: "Ação prática dos alunos de saúde em evento na praça", tag: "Evento" },
  { src: exp4, alt: "Oficina prática dos alunos da área da saúde", tag: "Oficina" },
];


export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

/* ---------- primitives ---------- */

function Section({
  id,
  eyebrow,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-24 sm:py-32 ${className}`}>
      <div className="container-x">
        {eyebrow && (
          <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-6 bg-gold/60" />
            {eyebrow}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function FadeIn({
  children,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- header ---------- */

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img
            src={logoAvance}
            alt="Avance Cursos - Formação Profissional"
            className="h-9 w-auto"
            width={160}
            height={36}
          />
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#cursos" className="transition hover:text-foreground">Cursos</a>
          <a href="#estrutura" className="transition hover:text-foreground">Estrutura</a>
          <a href="#depoimentos" className="transition hover:text-foreground">Depoimentos</a>
          <a href="#unidades" className="transition hover:text-foreground">Unidades</a>
          <a href="#faq" className="transition hover:text-foreground">Perguntas</a>
        </nav>
        <button
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
        >
          <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="container-x flex flex-col py-4 text-sm">
            {[
              ["Cursos", "#cursos"],
              ["Estrutura", "#estrutura"],
              ["Depoimentos", "#depoimentos"],
              ["Unidades", "#unidades"],
              ["Perguntas", "#faq"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-3 text-muted-foreground transition hover:text-foreground"
              >
                {label}
              </a>
            ))}
            <a
              href="#matricula"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-gold px-4 py-3 font-medium text-gold-foreground"
            >
              Matricular-se <ArrowRight className="size-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-15%] mx-auto h-[520px] max-w-5xl blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, color-mix(in oklab, var(--gold) 25%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="container-x relative pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <FadeIn>
              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur lg:mx-0">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-gold" />
                </span>
                Matrículas abertas · Turmas 2026
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div className="flex items-center justify-center gap-4 lg:justify-start lg:gap-6">
                <h1 className="text-display text-balance text-4xl text-foreground sm:text-6xl lg:text-7xl">
                  Sua próxima carreira
                  <br />
                  começa na&nbsp;<span className="italic text-gold">Avance</span>.
                </h1>
                <img
                  src={emojiHeader}
                  alt=""
                  aria-hidden
                  decoding="async"
                  className="w-20 shrink-0 rotate-6 drop-shadow-[0_16px_34px_rgba(0,0,0,0.4)] sm:w-28 lg:w-36"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
                Cursos profissionalizantes com prática real, professores atuantes no
                mercado e estrutura de ponta em <strong className="font-medium text-foreground">Palmares</strong>,{" "}
                <strong className="font-medium text-foreground">Escada</strong> e{" "}
                <strong className="font-medium text-foreground">Vitória de Santo Antão</strong>.
              </p>
            </FadeIn>


            <FadeIn delay={0.35}>
              <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-8 text-sm sm:grid-cols-4 lg:mt-14">
                {[
                  ["+2.500", "Alunos formados"],
                  ["+ de 10", "Áreas em alta"],
                  ["3", "Unidades em PE"],
                  ["98%", "Satisfação dos alunos"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="text-display text-3xl text-foreground sm:text-4xl">{n}</div>
                    <div className="mt-1 text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <EnrollmentForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ---------- enrollment form ---------- */

function EnrollmentForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [course, setCourse] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent).detail as { course?: string; city?: string };
      if (detail?.course) setCourse(detail.course);
      if (detail?.city) setCity(detail.city);
    };
    window.addEventListener("prefill-enrollment", onPrefill);
    return () => window.removeEventListener("prefill-enrollment", onPrefill);
  }, []);

  return (
    <form
      id="matricula"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className={`scroll-mt-24 rounded-3xl border border-border bg-background/70 backdrop-blur ${compact ? "p-5" : "p-6 sm:p-8"}`}
    >
      {submitted ? (
        <div className="py-8 text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-gold text-gold-foreground">
            <Check className="size-6" strokeWidth={3} />
          </div>
          <h3 className="mt-6 text-xl font-medium text-foreground">
            Inscrição recebida!
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Nossa equipe entrará em contato em até 24 horas úteis.
          </p>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-medium text-foreground">Solicite contato</h3>
          <div className="mt-6 grid gap-4">
            <Field label="Nome completo" name="name" placeholder="Como devemos te chamar?" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Telefone / WhatsApp" name="phone" placeholder="(81) 99999-9999" type="tel" />
              <Field label="Idade" name="age" placeholder="Sua idade" type="number" />
            </div>
            <Select label="Cidade" name="city" options={CITY_OPTIONS} value={city} onChange={setCity} />
            <Select label="Curso de interesse" name="course" options={COURSE_OPTIONS} value={course} onChange={setCourse} />
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-medium text-gold-foreground shadow-glow transition hover:opacity-90"
            >
              Quero garantir minha vaga
              <ArrowRight className="size-4" />
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Seus dados estão seguros. Sem spam.
            </p>
          </div>
        </>
      )}
    </form>
  );
}

/* ---------- logos / trust ---------- */

function TrustBar() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="container-x flex flex-wrap items-center justify-between gap-x-10 gap-y-6 py-8 text-sm text-muted-foreground">
        <span className="uppercase tracking-[0.2em] text-xs">Reconhecidos por</span>
        {["Parceria Empresas Locais", "Estágio Garantido", "Metodologia Ativa"].map((t) => (
          <span key={t} className="font-medium text-foreground/80">{t}</span>
        ))}
      </div>
    </section>
  );
}

/* ---------- courses ---------- */

const COURSES = [
  {
    icon: LineChart,
    emoji: emojiGames,
    emojiAlt: "Emoji de marketing digital",
    name: "Marketing Digital",
    lede: "Domine redes sociais, tráfego pago e o playbook das marcas que estão vendendo mais em 2026.",
    bullets: ["Meta e Google Ads", "Conteúdo e IA", "Portfólio real"],
  },
  {
    icon: Pill,
    emoji: emojiFarm,
    emojiAlt: "Emoji de farmácia",
    name: "Farmácia",
    lede: "Formação técnica para atuar em farmácias, drogarias, clínicas e hospitais com segurança.",
    bullets: ["Assistência farmacêutica", "Aulas em laboratório", "Estágio orientado"],
  },
  {
    icon: GraduationCap,
    emoji: emojiAdmin,
    emojiAlt: "Emoji de administração",
    name: "Administração",
    lede: "Gestão, finanças, liderança e processos — o essencial para crescer em qualquer empresa.",
    bullets: ["Gestão financeira", "Rotinas administrativas", "Soft skills"],
  },
  {
    icon: Laptop,
    emoji: emojiInfo,
    emojiAlt: "Emoji de informática",
    name: "Informática",
    lede: "Do zero ao Office avançado. Habilidade que abre portas em toda vaga do mercado.",
    bullets: ["Windows + Office", "Internet e IA", "Prática guiada"],
  },
];

function Courses() {
  return (
    <Section id="cursos" eyebrow="Cursos">
      <FadeIn>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-display max-w-2xl text-balance text-4xl text-foreground sm:text-6xl">
            Escolha a carreira. Nós cuidamos do resto.
          </h2>
          <p className="max-w-md text-muted-foreground">
            Grades atualizadas junto ao mercado. Aulas com professores que vivem
            a profissão. Certificação ao final do curso.
          </p>
        </div>
      </FadeIn>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {COURSES.map((c, i) => (
          <FadeIn key={c.name} delay={i * 0.05}>
            <article
              onClick={() => prefillEnrollment({ course: c.name })}
              className="group relative h-full min-h-[23rem] cursor-pointer overflow-hidden rounded-3xl border border-border bg-surface/85 p-6 transition hover:border-gold/40 hover:bg-surface-elevated sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                style={{ background: "color-mix(in oklab, var(--gold) 60%, transparent)" }}
              />
              <img
                src={c.emoji}
                alt={c.emojiAlt}
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute right-4 top-5 w-24 rotate-6 opacity-95 drop-shadow-[0_16px_34px_rgba(0,0,0,0.35)] transition duration-500 group-hover:-translate-y-1 group-hover:rotate-3 sm:right-6 sm:top-6 sm:w-32 lg:w-36"
              />
              <div className="relative flex items-start justify-between">
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent text-gold">
                  <c.icon className="size-5" />
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
              </div>
              <div className="relative max-w-[78%] pt-8 sm:max-w-[72%]">
                <h3 className="text-2xl font-medium tracking-tight text-foreground">{c.name}</h3>
                <p className="mt-3 text-muted-foreground">{c.lede}</p>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2 text-xs">
                {c.bullets.map((b) => (
                  <li key={b} className="rounded-full border border-border bg-background/60 px-3 py-1 text-muted-foreground">
                    {b}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => prefillEnrollment({ course: c.name })}
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition hover:text-gold"
              >
                Inscrever-se em {c.name}
                <ArrowRight className="size-4" />
              </button>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ---------- benefits ---------- */

const BENEFITS = [
  { icon: Users, title: "Aulas Presenciais", body: "Turmas pequenas com professores qualificados e acompanhamento próximo." },
  { icon: Wifi, title: "Ensino EAD", body: "Estude no seu ritmo, com o suporte da equipe Avance sempre por perto." },
  { icon: Sparkles, title: "Prática desde o dia 1", body: "Laboratórios equipados e projetos reais alinhados ao mercado." },
  { icon: ShieldCheck, title: "Certificado reconhecido", body: "Documento oficial ao concluir, pronto para valorizar seu currículo." },
];

function Benefits() {
  return (
    <Section eyebrow="Por que Avance">
      <FadeIn>
        <h2 className="text-display max-w-3xl text-balance text-4xl text-foreground sm:text-6xl">
          Uma escola pensada para o profissional que o mercado procura.
        </h2>
      </FadeIn>
      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b, i) => (
          <FadeIn key={b.title} delay={i * 0.05}>
            <div className="h-full bg-background p-8">
              <b.icon className="size-6 text-gold" />
              <h3 className="mt-6 text-lg font-medium text-foreground">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ---------- structure ---------- */

function Structure() {
  return (
    <Section id="estrutura" eyebrow="Estrutura">
      <FadeIn>
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <h2 className="text-display text-balance text-4xl text-foreground sm:text-6xl">
            Salas que inspiram.
            <br />
            <span className="italic text-gold">Laboratórios que preparam.</span>
          </h2>
          <p className="text-muted-foreground">
            Ambientes climatizados, computadores de última geração e laboratórios
            com insumos de alta qualidade — para você aprender teoria e prática
            no melhor ambiente de Pernambuco.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div
          className="mt-14 relative overflow-hidden rounded-3xl border border-border"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex w-max gap-4 py-4 animate-marquee">
            {[...STRUCTURE_IMAGES, ...STRUCTURE_IMAGES].map((img, i) => (
              <div
                key={i}
                className="relative h-64 w-[22rem] shrink-0 overflow-hidden rounded-2xl border border-border sm:h-80 sm:w-[28rem]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ---------- testimonial ---------- */

const TESTIMONIALS = [
  {
    name: "Marcos da Silva",
    role: "Administração",
    quote:
      "“Fazer o curso na Avance mudou minha rotina. Em três meses eu já estava apto — e o suporte da equipe foi decisivo.”",
    initials: "MS",
  },
  {
    name: "Juliana Rocha",
    role: "Marketing Digital",
    quote:
      "As aulas práticas de tráfego pago me deram segurança para gerenciar campanhas reais. Hoje trabalho com o que aprendi.",
    initials: "JR",
  },
  {
    name: "Ricardo Fontes",
    role: "Farmácia",
    quote:
      "“O laboratório equipado e orientado foram decisivos para eu começar a trabalhar na área tão rápido.”",
    initials: "RF",
  },
  {
    name: "Bárbara Costa",
    role: "Informática",
    quote:
      "Saí do zero e hoje lido sozinha com planilhas, apresentações e rotinas administrativas. Aulas claras e diretas.",
    initials: "BC",
  },
  {
    name: "Ana Paula Mendes",
    role: "Administração",
    quote:
      "A equipe da Avance me acompanhou do início ao fim. Me senti preparada para o mercado antes mesmo de concluir.",
    initials: "AM",
  },
];

/* ---------- experiences ---------- */

function Experiences() {
  return (
    <Section id="experiencias" eyebrow="Mais que aulas">
      <FadeIn>
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <h2 className="text-display text-balance text-4xl text-foreground sm:text-6xl">
            Oficinas, workshops,
            <br />
            <span className="italic text-gold">palestras e eventos.</span>
          </h2>
          <p className="text-muted-foreground">
            Na Avance Cursos, aprendizado passa da sala de aula. Promovemos
            oficinas práticas, workshops técnicos, palestras com profissionais
            do mercado e eventos comunitários — para você viver a profissão
            antes mesmo de se formar.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div
          className="mt-14 relative overflow-hidden rounded-3xl border border-border"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex w-max gap-4 py-4 animate-marquee-reverse">
            {[...EXPERIENCES, ...EXPERIENCES].map((img, i) => (
              <div
                key={i}
                className="group relative h-64 w-[22rem] shrink-0 overflow-hidden rounded-2xl border border-border sm:h-80 sm:w-[28rem]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-background/60 px-3 py-1 text-xs font-medium text-gold backdrop-blur">
                  {img.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}



function Testimonial() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    if (!card) return;
    const gap = 24;
    const step = card.offsetWidth + gap;
    const maxIndex = Math.max(0, TESTIMONIALS.length - Math.floor(track.offsetWidth / step));
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setActiveIndex(clamped);
    track.scrollTo({ left: clamped * step, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.firstElementChild as HTMLElement | null;
      if (!card) return;
      const gap = 24;
      const step = card.offsetWidth + gap;
      const idx = Math.round(track.scrollLeft / step);
      setActiveIndex(idx);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Section id="depoimentos" eyebrow="Depoimentos">
      <FadeIn>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-display text-balance text-4xl text-foreground sm:text-5xl lg:text-6xl">
              Vozes de <span className="italic text-gold">sucesso</span>.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A experiência real de quem transformou a carreira com a gente.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Depoimento anterior"
              onClick={() => scrollToIndex(activeIndex - 1)}
              className="grid size-12 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Próximo depoimento"
              onClick={() => scrollToIndex(activeIndex + 1)}
              className="grid size-12 place-items-center rounded-full border border-gold text-gold transition hover:bg-gold hover:text-gold-foreground"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="relative mt-14">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-12 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className="group min-w-[300px] flex-1 snap-start rounded-3xl border border-border/60 bg-surface/40 p-7 transition hover:border-gold/40 hover:bg-surface-elevated/60 sm:min-w-[340px] sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <div className="grid size-12 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{t.name}</h4>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-gold">
                      {t.role}
                    </p>
                  </div>
                </div>
                <p className="mt-7 text-base leading-relaxed text-muted-foreground italic">
                  <span className="text-gold">“</span>
                  {t.quote}
                  <span className="text-gold">”</span>
                </p>
              </article>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para depoimento ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-1 rounded-full transition-all ${
                  i === activeIndex ? "w-10 bg-gold" : "w-2 bg-border hover:bg-gold/50"
                }`}
              />
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-16 grid grid-cols-3 gap-6 border-t border-border pt-10">
          {[
            ["4,9/5", "Avaliação média"],
            ["93%", "Empregabilidade"],
            ["12+", "Anos de história"],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-display text-3xl text-foreground sm:text-4xl">{n}</div>
              <div className="mt-1 text-xs text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

/* ---------- guarantee ---------- */

function Guarantee() {
  return (
    <Section>
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 sm:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "color-mix(in oklab, var(--gold) 30%, transparent)" }}
          />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                <ShieldCheck className="size-3.5" /> Melhor escola de Cursos Profissionalizantes
              </div>
              <h2 className="text-display mt-6 text-balance text-4xl text-foreground sm:text-5xl">
                Matricule-se sem medo.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Experimente sua primeira aula antes de se matricular. Você vai
                amar! — sem burocracia.
              </p>
            </div>
            <ul className="space-y-4">
              {[
                "Aula experimental no 1º primeiro dia",
                "Material didático incluso desde o dia 1",
                "Suporte pedagógico e financeiro dedicado",
                "Certificado ao concluir o curso",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-foreground">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gold text-gold-foreground">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ---------- units ---------- */

const UNITS = [
  { city: "Palmares", state: "PE", note: "Turmas presenciais e EAD", instagram: "https://www.instagram.com/avance.cursospalmares?igsh=MXRlNjNtcWJmcWV3Nw==" },
  { city: "Escada", state: "PE", note: "Turmas presenciais e EAD", instagram: "https://www.instagram.com/avancecursosescada?igsh=NHc4MHE0bWRmc3Ju" },
  { city: "Vitória de Santo Antão", state: "PE", note: "Turmas presenciais e EAD", instagram: "https://www.instagram.com/avancecursosvitoria?igsh=MWx1Y21zcTB6aTRydg==" },
];

function Units() {
  return (
    <Section id="unidades" eyebrow="Unidades">
      <FadeIn>
        <h2 className="text-display max-w-2xl text-balance text-4xl text-foreground sm:text-6xl">
          Perto de você, no interior de Pernambuco.
        </h2>
      </FadeIn>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {UNITS.map((u, i) => (
          <FadeIn key={u.city} delay={i * 0.05}>
            <button
              type="button"
              onClick={() => prefillEnrollment({ city: `${u.city} - ${u.state}` })}
              className="group h-full w-full cursor-pointer rounded-3xl border border-border bg-surface p-8 text-left transition hover:border-gold/40"
            >
              <MapPin className="size-5 text-gold" />
              <h3 className="mt-6 text-xl font-medium text-foreground">
                {u.city} <span className="text-muted-foreground">— {u.state}</span>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{u.note}</p>
              <a
                href={u.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold transition hover:underline"
              >
                <Instagram className="size-4" />
                Siga no Instagram
              </a>
            </button>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ---------- faq ---------- */

const FAQ_ITEMS = [
  {
    q: "Como funciona a matrícula?",
    a: "Preencha o formulário abaixo e nossa equipe entra em contato em até 24 horas úteis para confirmar sua vaga e tirar dúvidas.",
  },
  {
    q: "Vocês oferecem certificado reconhecido?",
    a: "Sim. Todos os alunos recebem um certificado oficial da Avance Cursos ao concluir o curso, válido em todo o território nacional.",
  },
  {
    q: "As aulas são presenciais ou online?",
    a: "Você escolhe: temos turmas 100% presenciais em nossas três unidades e também a modalidade EAD com suporte da nossa equipe.",
  },
  {
    q: "Existe algum pré-requisito?",
    a: "Não. Nossos cursos foram desenhados para iniciantes e para quem quer se profissionalizar rapidamente. O importante é a vontade de aprender.",
  },
  {
    q: "Posso parcelar o valor?",
    a: "Sim. Trabalhamos com condições facilitadas e você pode parcelar em várias vezes no cartão ou boleto.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" eyebrow="Perguntas frequentes">
      <FadeIn>
        <h2 className="text-display max-w-2xl text-balance text-4xl text-foreground sm:text-6xl">
          Tudo que você precisa saber antes de começar.
        </h2>
      </FadeIn>
      <div className="mx-auto mt-14 max-w-3xl divide-y divide-border rounded-3xl border border-border bg-surface">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition hover:bg-surface-elevated sm:px-8"
              >
                <span className="text-base font-medium text-foreground sm:text-lg">{item.q}</span>
                <ChevronDown
                  className={`size-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180 text-gold" : ""}`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 text-muted-foreground sm:px-8">{item.a}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- final CTA ---------- */

function FinalCta() {
  return (
    <Section className="pb-32">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-surface-elevated via-surface to-background p-8 sm:p-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 20% 0%, color-mix(in oklab, var(--gold) 22%, transparent) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              <Sparkles className="size-3.5" /> Turmas 2026 · Vagas limitadas
            </div>
            <h2 className="text-display mt-6 text-balance text-4xl text-foreground sm:text-6xl">
              Dê o próximo passo na sua carreira agora.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Preencha o formulário no topo da página e um consultor da Avance
              vai te ajudar a escolher o curso ideal com condição especial.
            </p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              {["Retorno em até 24h", "Sem compromisso", "Condição especial para inscritos hoje"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="size-4 text-gold" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <a
                href="#top"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-medium text-gold-foreground shadow-glow transition hover:opacity-90"
              >
                Quero garantir minha vaga
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        required
        type={type}
        name={name}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
}) {
  const controlled = value !== undefined && onChange !== undefined;
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <select
        required
        name={name}
        {...(controlled
          ? { value, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onChange!(e.target.value) }
          : { defaultValue: "" })}
        className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
      >
        <option value="" disabled>Selecione…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <a href="#top" aria-label="Voltar ao topo" className="inline-block">
              <img
                src={logoAvance}
                alt="Avance Cursos - Formação Profissional"
                className="h-12 w-auto transition hover:opacity-80"
                width={220}
                height={48}
                loading="lazy"
              />
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Formação profissional prática, moderna e acessível em Pernambuco.
              Aprenda o que o mercado realmente pede.
            </p>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Cursos</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {COURSE_OPTIONS.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => prefillEnrollment({ course: name })}
                    className="text-left transition hover:text-foreground"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Unidades</div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {UNITS.map((u) => (
                <li key={u.city} className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => prefillEnrollment({ city: `${u.city} - ${u.state}` })}
                    className="text-left transition hover:text-foreground"
                  >
                    {u.city} — {u.state}
                  </button>
                  <a
                    href={u.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram de Avance Cursos ${u.city}`}
                    className="grid size-7 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-gold hover:text-gold"
                  >
                    <Instagram className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Avance Cursos. Todos os direitos reservados.</span>
          <span>Feito com cuidado em Pernambuco.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- scroll to top ---------- */

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Voltar ao topo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full bg-gold text-gold-foreground shadow-glow transition hover:opacity-90 sm:size-14"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ---------- page ---------- */

function LandingPage() {
  return (
    <main className="relative min-h-dvh overflow-x-clip bg-background text-foreground">
      <CosmicBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
        <TrustBar />
        <Courses />
        <Benefits />
        <Structure />
        <Experiences />

        <Testimonial />
        <Guarantee />
        <Units />
        <Faq />
        <FinalCta />
        <Footer />
        <ScrollToTop />
      </div>
    </main>
  );
}
