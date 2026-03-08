import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Instagram,
  LayoutPanelLeft,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Palette,
  Phone,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { PropertyType } from "./backend.d";
import { useSubmitInquiry } from "./hooks/useQueries";

/* ─── Variants ───────────────────────────────────────────────────────── */
const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* ─── Ornament Divider ───────────────────────────────────────────────── */
function OrnamentDivider({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`ornament-divider ${dark ? "on-dark" : ""}`}>
      <div
        className="ornament-diamond"
        style={{ background: dark ? "oklch(0.75 0.13 78 / 0.5)" : undefined }}
      />
    </div>
  );
}

/* ─── Navigation ─────────────────────────────────────────────────────── */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-cream/98 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="flex items-baseline gap-1.5 group"
          data-ocid="nav.link"
        >
          <span className="font-display text-xl font-semibold tracking-tight text-leather-dark leading-none">
            Loma Vista Design
          </span>
          <span className="font-serif text-base text-muted-foreground leading-none">
            by Ana
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: "Services", id: "services" },
            { label: "Portfolio", id: "portfolio" },
            { label: "About", id: "about" },
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="nav-link font-sans text-sm font-medium text-foreground/80 hover:text-leather transition-colors"
              data-ocid={`nav.${item.id}.link`}
            >
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => scrollTo("booking")}
            size="sm"
            className="rounded-full bg-leather hover:bg-leather-dark text-cream px-5 font-sans text-sm font-medium transition-all shadow-warm hover:shadow-warm-lg"
            data-ocid="nav.book_call.button"
          >
            Book a Call
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-foreground/80"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.mobile_menu.toggle"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-border/40 bg-cream"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              {[
                { label: "Services", id: "services" },
                { label: "Portfolio", id: "portfolio" },
                { label: "About", id: "about" },
                { label: "Book a Call", id: "booking" },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left px-3 py-2.5 text-sm font-medium rounded-md hover:bg-parchment transition-colors text-foreground/80"
                  data-ocid={`nav.mobile.${item.id}.link`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────────── */
function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/generated/hero-staged-living-room.dim_1600x900.jpg')`,
        }}
      />
      {/* Warm dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.15 0.03 50 / 0.88) 0%, oklch(0.2 0.04 50 / 0.75) 60%, oklch(0.22 0.05 52 / 0.65) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUpVariants}
            custom={0}
            className="flex items-center gap-4 mb-7"
          >
            <div className="w-8 h-px bg-gold/50" />
            <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-gold opacity-90">
              Central Texas Real Estate Staging
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUpVariants}
            custom={1}
            className="font-display font-semibold text-cream leading-[1.08] tracking-tight mb-6"
          >
            <span className="block text-4xl sm:text-5xl lg:text-[3.75rem]">
              Your Listings Deserve
            </span>
            <span className="block font-serif font-normal italic text-gold-muted text-5xl sm:text-6xl lg:text-7xl -mt-1 lg:-mt-2">
              to Compete
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-[3.75rem]">
              at the Highest Level.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUpVariants}
            custom={2}
            className="font-sans text-lg text-cream max-w-xl mb-10 leading-relaxed"
          >
            Loma Vista Design partners with Central Texas realtors to stage,
            style, and sell — faster and for more.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpVariants}
            custom={3}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => scrollTo("booking")}
              size="lg"
              className="rounded-full bg-leather hover:bg-leather-dark text-cream font-sans font-medium px-8 py-6 text-base shadow-warm-xl transition-all hover:scale-[1.02]"
              data-ocid="hero.book_call.primary_button"
            >
              Book a Property Strategy Call
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button
              onClick={() => scrollTo("portfolio")}
              variant="outline"
              size="lg"
              className="rounded-full border-cream/40 text-cream hover:bg-cream/10 font-sans font-medium px-8 py-6 text-base backdrop-blur-sm bg-transparent transition-all"
              data-ocid="hero.view_work.secondary_button"
            >
              View Our Work
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

/* ─── Stats Bar ──────────────────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    {
      value: "2-Hour Strategic Audit",
      label: "Identifies top ROI changes before photos",
    },
    {
      value: "Staged Homes Sell Faster",
      label: "Outperforming neighborhood averages in Central Texas",
    },
    {
      value: "5 Specialized Services",
      label: "From consultation to full luxury staging",
    },
  ];

  return (
    <section className="section-dark py-16 relative overflow-hidden">
      {/* Atmospheric radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 50%, oklch(0.28 0.05 52 / 0.55) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Top ornament */}
        <div className="mb-10">
          <OrnamentDivider dark />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x divide-cream/10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              variants={fadeUpVariants}
              custom={i}
              className="text-center px-8"
            >
              <p className="font-display text-xl font-semibold text-gold mb-2.5 leading-tight">
                {stat.value}
              </p>
              <p className="font-sans text-sm text-cream/80 leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
        {/* Bottom ornament */}
        <div className="mt-10">
          <OrnamentDivider dark />
        </div>
      </div>
    </section>
  );
}

/* ─── Services Section ───────────────────────────────────────────────── */
const serviceData = [
  {
    icon: Search,
    title: "Staging Consultation",
    subtitle: "The Strategic Audit",
    description:
      "A high-impact 2-hour walk-and-talk. Ana identifies the Top 5 high-ROI changes — paint, lighting, decluttering — to execute before professional photos hit the MLS.",
    price: "Starting at $250",
    accentClass: "text-leather",
  },
  {
    icon: Sparkles,
    title: "Full Home Staging",
    subtitle: "The Luxury Experience",
    description:
      "For vacant or high-end properties. We bring in a curated collection of King Ranch leathers, crisp linens, and bespoke furniture to create a lifestyle buyers will pay a premium for.",
    price: "Request a Quote",
    accentClass: "text-sage",
  },
  {
    icon: Monitor,
    title: "Virtual Staging",
    subtitle: "Nationwide Scale",
    description:
      "Expertly rendered digital designs for empty listings. Perfect for out-of-state investors who need high-end visuals without the overhead of physical furniture rental.",
    price: "Starting at $75/room",
    accentClass: "text-leather-light",
  },
  {
    icon: LayoutPanelLeft,
    title: "Redesign for Listings",
    subtitle: "The Refresh",
    description:
      "We reimagine your seller's existing space — editing the layout, neutralizing distractions, and broadening market appeal without moving a single item out.",
    price: "Starting at $350",
    accentClass: "text-gold",
  },
  {
    icon: Palette,
    title: "Color Consultations",
    subtitle: "Texas Light Science",
    description:
      "Science-based palette selection tuned to Texas light. We choose whites, tans, and neutrals that make rooms feel expansive and expensive to buyers walking through the door.",
    price: "Starting at $150",
    accentClass: "text-sage",
  },
];

function ServiceCard({
  service,
  index,
  featured = false,
}: {
  service: (typeof serviceData)[number];
  index: number;
  featured?: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <motion.div
      variants={fadeUpVariants}
      custom={index}
      className={`group relative rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
        featured
          ? "service-card-featured shadow-warm-xl hover:shadow-warm-xl"
          : "bg-card border-border shadow-warm hover:shadow-warm-lg hover:border-leather/20"
      }`}
      data-ocid={`services.item.${index + 1}`}
    >
      {/* Large number mark */}
      <span className="service-num">{num}</span>

      {/* Header row */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3
            className={`service-title font-display text-lg font-semibold mb-0.5 ${featured ? "text-cream" : "text-foreground"}`}
          >
            {service.title}
          </h3>
          <p
            className={`service-subtitle font-serif italic text-sm ${featured ? "text-gold" : "text-muted-foreground"}`}
          >
            {service.subtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <p
        className={`service-desc font-sans text-sm leading-relaxed mb-6 ${featured ? "text-cream/85" : "text-foreground/80"}`}
      >
        {service.description}
      </p>

      {/* Price tag */}
      <div
        className={`service-divider pt-4 border-t ${featured ? "border-cream/15" : "border-border"}`}
      >
        <span
          className={`service-price font-sans text-sm font-semibold ${featured ? "text-gold" : "text-leather"}`}
        >
          {service.price}
        </span>
      </div>
    </motion.div>
  );
}

function ServicesSection() {
  const [featured, ...rest] = serviceData;
  return (
    <section id="services" className="py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div
            variants={fadeUpVariants}
            custom={0}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-6 h-px bg-leather/50" />
            <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-leather">
              What We Offer
            </p>
          </motion.div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <motion.h2
              variants={fadeUpVariants}
              custom={1}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight"
            >
              The Profit-Driven Menu
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              custom={2}
              className="font-sans text-base text-foreground/75 max-w-sm lg:text-right"
            >
              Every service is designed to protect your commission and maximize
              your seller's net.
            </motion.p>
          </div>
          <motion.div variants={fadeUpVariants} custom={3} className="mt-8">
            <OrnamentDivider />
          </motion.div>
        </motion.div>

        {/* Featured card — full width */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mb-6"
        >
          <ServiceCard service={featured} index={0} featured />
        </motion.div>

        {/* Remaining 4 cards — 2×2 grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {rest.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i + 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Portfolio Section ──────────────────────────────────────────────── */
const portfolioData = [
  {
    image: "/assets/generated/portfolio-luxury-bedroom.dim_800x600.jpg",
    badge: "Luxury Residential",
    badgeColor: "bg-leather/10 text-leather-dark border-leather/20",
    title: "Westlake Hills Vacant Estate",
    narrative:
      "A 4,200 sq ft vacant home sat on the market for 47 days with no offers. After a full luxury staging with curated King Ranch leather accents and bespoke linen furnishings, the property received two competing offers within 9 days and closed at 98% of asking price.",
    stat: "47 days → 9 days",
  },
  {
    image: "/assets/generated/portfolio-fixflip-kitchen.dim_800x600.jpg",
    badge: "Fix & Flip",
    badgeColor: "bg-sage/10 text-sage border-sage/20",
    title: "South Austin Investor Flip",
    narrative:
      "An investor needed to move quickly on a renovated South Austin bungalow. A targeted Staging Consultation identified 5 high-ROI changes under $800 total. The home listed on a Thursday, went under contract on Sunday, and sold for $12,000 over asking.",
    stat: "$12,000 over asking",
  },
  {
    image: "/assets/generated/portfolio-str-living.dim_800x600.jpg",
    badge: "Short-Term Rental",
    badgeColor: "bg-gold/10 text-leather-dark border-gold/30",
    title: "Hill Country Airbnb Redesign",
    narrative:
      "A Hill Country property owner wanted to convert their second home into a premium short-term rental. A full redesign using existing furniture — supplemented with targeted Texas-inspired accents — resulted in a 4.9-star rating and 94% occupancy in its first quarter.",
    stat: "4.9 ★ · 94% occupancy",
  },
];

function PortfolioSection() {
  return (
    <section id="portfolio" className="py-28 bg-parchment">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div
            variants={fadeUpVariants}
            custom={0}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-6 h-px bg-leather/50" />
            <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-leather">
              Case Studies
            </p>
          </motion.div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <motion.h2
              variants={fadeUpVariants}
              custom={1}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight"
            >
              Proof in Every Property
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              custom={2}
              className="font-sans text-base text-foreground/75 max-w-sm lg:text-right"
            >
              Real results for real estate professionals across Central Texas.
            </motion.p>
          </div>
          <motion.div variants={fadeUpVariants} custom={3} className="mt-8">
            <OrnamentDivider />
          </motion.div>
        </motion.div>

        {/* Portfolio Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {portfolioData.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUpVariants}
              custom={i}
              className="group bg-card rounded-2xl overflow-hidden border border-border shadow-warm hover:shadow-warm-xl transition-all duration-400 hover:-translate-y-1.5"
              data-ocid={`portfolio.item.${i + 1}`}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-60">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-warm-darker/80 via-warm-dark/20 to-transparent" />
                {/* Stat badge on image */}
                <div className="absolute bottom-4 left-4">
                  <span className="font-display text-sm font-semibold text-cream">
                    {item.stat}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <Badge
                  variant="outline"
                  className={`mb-4 font-sans text-xs ${item.badgeColor}`}
                >
                  {item.badge}
                </Badge>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                  {item.narrative}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── About Section ──────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" className="py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Decorative frame */}
              <div className="absolute -inset-3 rounded-3xl border border-leather/20 -rotate-2 opacity-60" />
              <div className="absolute -inset-3 rounded-3xl border border-gold/15 rotate-1 opacity-40" />

              {/* Photo */}
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-warm-xl">
                <img
                  src="/assets/uploads/IMG_4577-1.jpeg"
                  alt="Ana — Loma Vista Design"
                  className="w-full h-full object-cover object-top"
                />
                {/* Warm overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/20 to-transparent pointer-events-none" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 lg:right-[-2.5rem] bg-leather text-cream rounded-2xl px-5 py-3 shadow-warm-lg">
                <p className="font-sans text-xs font-medium text-cream/70 uppercase tracking-wider mb-0.5">
                  Central Texas
                </p>
                <p className="font-display text-sm font-semibold">
                  Listings Strategist
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeUpVariants}
              custom={0}
              className="font-sans text-sm font-medium tracking-widest uppercase text-leather mb-3"
            >
              Your Strategic Partner
            </motion.p>
            <motion.h2
              variants={fadeUpVariants}
              custom={1}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight"
            >
              Ana Knows
              <br />
              <span className="font-serif font-normal italic text-leather">
                What Sells.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              custom={2}
              className="font-sans text-base text-foreground/80 leading-relaxed mb-6"
            >
              Ana built Loma Vista Design on a single principle: a well-staged
              home isn't just prettier — it's worth more. With deep roots in the
              Central Texas market and a trained eye for what buyers respond to,
              she works directly with realtors and sellers to identify the exact
              changes that move the needle on price and days on market.
            </motion.p>
            <motion.p
              variants={fadeUpVariants}
              custom={3}
              className="font-sans text-base text-foreground/80 leading-relaxed mb-8"
            >
              She isn't a decorator. She's a listings strategist.
            </motion.p>

            {/* Quote block */}
            <motion.blockquote
              variants={fadeUpVariants}
              custom={4}
              className="quote-block"
            >
              <p className="font-serif text-lg italic text-foreground/80 leading-relaxed mb-3">
                "My job isn't to make a house beautiful. It's to make your
                listing irresistible to the buyer who will pay the most for it."
              </p>
              <footer className="font-sans text-sm font-semibold text-leather">
                — Ana, Loma Vista Design
              </footer>
            </motion.blockquote>

            {/* Key points */}
            <motion.div
              variants={fadeUpVariants}
              custom={5}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              {[
                "Central Texas Market Expert",
                "Data-Driven Staging Strategy",
                "Realtor-First Approach",
                "ROI-Focused Decisions",
              ].map((point) => (
                <div key={point} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-leather shrink-0" />
                  <span className="font-sans text-sm text-foreground/70">
                    {point}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Project Discovery Quiz ─────────────────────────────────────────── */
const TOTAL_STEPS = 3;

type QuizData = {
  projectGoal: string;
  timeline: string;
  name: string;
  email: string;
  address: string;
};

function QuizCard({
  value,
  selected,
  title,
  description,
  onChange,
  ocid,
}: {
  value: string;
  selected: boolean;
  title: string;
  description: string;
  onChange: (v: string) => void;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      data-ocid={ocid}
      className={`w-full text-left rounded-xl border-2 p-5 transition-all duration-200 cursor-pointer group
        ${
          selected
            ? "border-leather bg-[#FDF9F5] shadow-warm-lg"
            : "border-[#E0DCD3] bg-[#F9F8F6] hover:border-leather/60 hover:-translate-y-0.5 hover:shadow-warm"
        }`}
    >
      <strong className="block font-display text-base font-semibold text-[#2C3539] mb-1">
        {title}
      </strong>
      <span className="font-sans text-sm text-[#666]">{description}</span>
    </button>
  );
}

/* ─── Booking / Contact Section ──────────────────────────────────────── */
function BookingSection() {
  const submitInquiry = useSubmitInquiry();

  const [step, setStep] = useState(1);
  const [quiz, setQuiz] = useState<QuizData>({
    projectGoal: "",
    timeline: "",
    name: "",
    email: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const progress = (step / TOTAL_STEPS) * 100;

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Map quiz goal to PropertyType
    const typeMap: Record<string, PropertyType> = {
      Selling: PropertyType.luxuryResidential,
      Investment: PropertyType.shortTermRental,
      "Post-Purchase": PropertyType.other,
    };
    const propertyType = typeMap[quiz.projectGoal] ?? PropertyType.other;

    try {
      await submitInquiry.mutateAsync({
        name: quiz.name,
        email: quiz.email,
        phone: "",
        address: quiz.address,
        propertyType,
        message: `Goal: ${quiz.projectGoal} | Timeline: ${quiz.timeline}`,
      });
      setSubmitted(true);
    } catch {
      // Error shown via submitInquiry.isError
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setQuiz({
      projectGoal: "",
      timeline: "",
      name: "",
      email: "",
      address: "",
    });
    setSubmitted(false);
  };

  return (
    <section
      id="booking"
      className="py-24 section-darker relative overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, oklch(0.75 0.13 78) 0%, transparent 50%), radial-gradient(circle at 75% 75%, oklch(0.48 0.11 52) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div
            variants={fadeUpVariants}
            custom={0}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-6 h-px bg-gold/50" />
            <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Ready to Elevate Your Listings?
            </p>
            <div className="w-6 h-px bg-gold/50" />
          </motion.div>
          <motion.h2
            variants={fadeUpVariants}
            custom={1}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cream mb-4 leading-tight"
          >
            Secure Your Listing's Spot.
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            custom={2}
            className="font-sans text-base text-cream/90 max-w-xl mx-auto"
          >
            Realtors are busy. Skip the phone tag. Book a free 15-minute
            Property Strategy Call and let's discuss your property's potential.
          </motion.p>
        </motion.div>

        {/* Calendly CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="booking.calendly.primary_button"
          >
            <Button
              size="lg"
              className="rounded-full bg-gold hover:bg-leather text-warm-darker font-sans font-semibold px-10 py-7 text-base shadow-warm-xl transition-all hover:scale-[1.02] hover:text-cream"
            >
              Book a 15-Minute Property Strategy Call
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </a>
        </motion.div>

        {/* Divider */}
        <div className="divider-ornament max-w-xl mx-auto mb-12">
          <span className="font-sans text-sm text-cream/50 whitespace-nowrap px-4">
            Or start your project discovery below
          </span>
        </div>
        <style>{`
          .divider-ornament::before,
          .divider-ornament::after {
            background: oklch(1 0 0 / 0.12);
          }
        `}</style>

        {/* Quiz Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-[#FFFFFF] rounded-2xl p-8 lg:p-10 shadow-warm-xl border border-[#E0DCD3]">
            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── Success State ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8"
                  data-ocid="booking.form.success_state"
                >
                  <CheckCircle2
                    size={48}
                    className="text-leather mx-auto mb-4"
                  />
                  <h3 className="font-display text-2xl font-semibold text-[#2C3539] mb-2">
                    Inquiry Received
                  </h3>
                  <p className="font-sans text-[#555] mb-1">
                    Thank you — Ana will be in touch within 1 business day.
                  </p>
                  <p className="font-sans text-sm text-[#888]">
                    You'll be redirected to her booking calendar shortly.
                  </p>
                  <Button
                    variant="ghost"
                    className="mt-6 text-leather hover:text-leather-dark font-sans"
                    onClick={resetQuiz}
                    data-ocid="booking.form.reset.button"
                  >
                    Submit Another Inquiry
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Quiz Header */}
                  <div className="text-center mb-8">
                    <h2 className="font-display text-2xl font-semibold text-[#2C3539] mb-2">
                      Project Discovery
                    </h2>
                    <p className="font-sans text-sm text-[#666]">
                      Let's maximize your property's potential. Tell us about
                      your goals.
                    </p>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-[#F9F8F6] rounded-full mt-5 overflow-hidden">
                      <motion.div
                        className="h-full bg-leather rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        data-ocid="booking.quiz.progress"
                      />
                    </div>
                    <p className="font-sans text-xs text-[#999] mt-2">
                      Step {step} of {TOTAL_STEPS}
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    {/* ── Step 1: Goal ── */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-display text-lg font-semibold text-[#2C3539] mb-5">
                          1. What is the primary goal for this property?
                        </h3>
                        <div className="flex flex-col gap-3 mb-7">
                          {[
                            {
                              value: "Selling",
                              title: "Preparing to Sell",
                              description:
                                "Maximize final sale price and decrease days on market.",
                            },
                            {
                              value: "Investment",
                              title: "Investment / Rental",
                              description:
                                "Design for durability and premium nightly rates.",
                            },
                            {
                              value: "Post-Purchase",
                              title: "Recently Purchased",
                              description:
                                "Build equity and make the space feel like home.",
                            },
                          ].map((opt, i) => (
                            <QuizCard
                              key={opt.value}
                              value={opt.value}
                              selected={quiz.projectGoal === opt.value}
                              title={opt.title}
                              description={opt.description}
                              onChange={(v) =>
                                setQuiz((prev) => ({ ...prev, projectGoal: v }))
                              }
                              ocid={`booking.quiz.goal.item.${i + 1}`}
                            />
                          ))}
                        </div>
                        <Button
                          type="button"
                          disabled={!quiz.projectGoal}
                          onClick={() => setStep(2)}
                          size="lg"
                          className="w-full rounded-xl bg-leather hover:bg-leather-dark text-cream font-sans font-semibold py-6 text-base transition-all shadow-warm-lg disabled:opacity-40"
                          data-ocid="booking.quiz.step1.next.button"
                        >
                          Next Step
                          <ArrowRight size={18} className="ml-2" />
                        </Button>
                      </motion.div>
                    )}

                    {/* ── Step 2: Timeline ── */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-display text-lg font-semibold text-[#2C3539] mb-5">
                          2. What is your ideal timeline?
                        </h3>
                        <div className="flex flex-col gap-3 mb-7">
                          {[
                            {
                              value: "ASAP",
                              title: "Immediately",
                              description:
                                "Listing soon or need a fast turnaround.",
                            },
                            {
                              value: "1-3 Months",
                              title: "1 – 3 Months",
                              description:
                                "Planning ahead for an upcoming project.",
                            },
                            {
                              value: "3+ Months",
                              title: "3+ Months Out",
                              description:
                                "Early-stage planning — just scoping options.",
                            },
                          ].map((opt, i) => (
                            <QuizCard
                              key={opt.value}
                              value={opt.value}
                              selected={quiz.timeline === opt.value}
                              title={opt.title}
                              description={opt.description}
                              onChange={(v) =>
                                setQuiz((prev) => ({ ...prev, timeline: v }))
                              }
                              ocid={`booking.quiz.timeline.item.${i + 1}`}
                            />
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(1)}
                            size="lg"
                            className="rounded-xl border-[#E0DCD3] text-[#2C3539] hover:bg-[#F9F8F6] font-sans font-medium py-6 px-6 text-base"
                            data-ocid="booking.quiz.step2.back.button"
                          >
                            Back
                          </Button>
                          <Button
                            type="button"
                            disabled={!quiz.timeline}
                            onClick={() => setStep(3)}
                            size="lg"
                            className="flex-1 rounded-xl bg-leather hover:bg-leather-dark text-cream font-sans font-semibold py-6 text-base transition-all shadow-warm-lg disabled:opacity-40"
                            data-ocid="booking.quiz.step2.next.button"
                          >
                            Next Step
                            <ArrowRight size={18} className="ml-2" />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Step 3: Contact ── */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-display text-lg font-semibold text-[#2C3539] mb-1">
                          3. Let's look at the numbers together.
                        </h3>
                        <p className="font-sans text-sm text-[#666] mb-6">
                          Enter your details to schedule your strategic property
                          consultation.
                        </p>
                        <form
                          onSubmit={handleFinalSubmit}
                          className="space-y-4"
                        >
                          <Input
                            required
                            value={quiz.name}
                            onChange={(e) =>
                              setQuiz((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            placeholder="First & Last Name"
                            className="bg-[#F9F8F6] border-[#E0DCD3] text-[#2C3539] placeholder:text-[#aaa] focus-visible:ring-leather focus-visible:border-leather/50 py-6 text-base"
                            data-ocid="booking.form.name.input"
                          />
                          <Input
                            type="email"
                            required
                            value={quiz.email}
                            onChange={(e) =>
                              setQuiz((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            placeholder="Email Address"
                            className="bg-[#F9F8F6] border-[#E0DCD3] text-[#2C3539] placeholder:text-[#aaa] focus-visible:ring-leather focus-visible:border-leather/50 py-6 text-base"
                            data-ocid="booking.form.email.input"
                          />
                          <Input
                            value={quiz.address}
                            onChange={(e) =>
                              setQuiz((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                            placeholder="Property Address or ZIP Code"
                            className="bg-[#F9F8F6] border-[#E0DCD3] text-[#2C3539] placeholder:text-[#aaa] focus-visible:ring-leather focus-visible:border-leather/50 py-6 text-base"
                            data-ocid="booking.form.address.input"
                          />

                          {/* Error state */}
                          {submitInquiry.isError && (
                            <div
                              className="flex items-center gap-2.5 text-destructive text-sm font-sans bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"
                              data-ocid="booking.form.error_state"
                            >
                              <AlertCircle size={16} className="shrink-0" />
                              <span>
                                Something went wrong. Please try again or email
                                us directly.
                              </span>
                            </div>
                          )}

                          <div className="flex gap-3 pt-1">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setStep(2)}
                              size="lg"
                              className="rounded-xl border-[#E0DCD3] text-[#2C3539] hover:bg-[#F9F8F6] font-sans font-medium py-6 px-6 text-base"
                              data-ocid="booking.quiz.step3.back.button"
                            >
                              Back
                            </Button>
                            <Button
                              type="submit"
                              disabled={submitInquiry.isPending}
                              size="lg"
                              className="flex-1 rounded-xl bg-leather hover:bg-leather-dark text-cream font-sans font-semibold py-6 text-base transition-all shadow-warm-lg disabled:opacity-60"
                              data-ocid="booking.form.submit_button"
                            >
                              {submitInquiry.isPending ? (
                                <>
                                  <Loader2
                                    size={18}
                                    className="mr-2 animate-spin"
                                  />
                                  Sending…
                                </>
                              ) : (
                                "Book My Strategy Call"
                              )}
                            </Button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────── */
function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`;

  return (
    <footer className="section-dark border-t border-cream/10 pt-14 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand column */}
          <div>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="font-display text-lg font-semibold text-cream leading-none">
                Loma Vista Design
              </span>
              <span className="font-serif italic text-base text-cream/50 leading-none">
                by Ana
              </span>
            </div>
            <p className="font-sans text-sm text-cream/55 leading-relaxed mb-5">
              Staging Central Texas Listings for Maximum Return.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center text-cream/50 hover:text-cream hover:border-cream/40 transition-colors"
                data-ocid="footer.instagram.link"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center text-cream/50 hover:text-cream hover:border-cream/40 transition-colors"
                data-ocid="footer.linkedin.link"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-cream/40 mb-4">
              Services
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                "Staging Consultation",
                "Full Home Staging",
                "Virtual Staging",
                "Redesign for Listings",
                "Color Consultations",
              ].map((svc, i) => (
                <button
                  type="button"
                  key={svc}
                  onClick={() => scrollTo("services")}
                  className="text-left font-sans text-sm text-cream/60 hover:text-cream transition-colors"
                  data-ocid={`footer.services.item.${i + 1}`}
                >
                  {svc}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-cream/40 mb-4">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3.5">
              <a
                href="mailto:hello@lomavistadesign.com"
                className="flex items-center gap-3 font-sans text-sm text-cream/60 hover:text-cream transition-colors group"
                data-ocid="footer.email.link"
              >
                <Mail
                  size={15}
                  className="shrink-0 text-leather-light group-hover:text-gold transition-colors"
                />
                hello@lomavistadesign.com
              </a>
              <a
                href="tel:+15120000000"
                className="flex items-center gap-3 font-sans text-sm text-cream/60 hover:text-cream transition-colors group"
                data-ocid="footer.phone.link"
              >
                <Phone
                  size={15}
                  className="shrink-0 text-leather-light group-hover:text-gold transition-colors"
                />
                (512) 000-0000
              </a>
              <div className="flex items-center gap-3 font-sans text-sm text-cream/60">
                <MapPin size={15} className="shrink-0 text-leather-light" />
                Austin &amp; Central Texas
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-cream/35">
            © {year} Loma Vista Design by Ana. All rights reserved.
          </p>
          <p className="font-sans text-xs text-cream/35">
            Built with ♥ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/50 hover:text-cream/70 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <ServicesSection />
        <PortfolioSection />
        <AboutSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
