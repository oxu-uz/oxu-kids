import {
  ArrowUpRight,
  CalendarX2,
  Clock3,
  Facebook,
  Instagram,
  LocateFixed,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import PageHero from "../components/PageHero";
import { MAP_EMBED_URL, MAP_LINK, getContactInfo } from "../data/contactInfo";
import { useLanguage } from "../hooks/useLanguage";
import { getUiTranslations } from "../i18n/ui";

function ContactPage() {
  const { locale } = useLanguage();
  const copy = getUiTranslations(locale);
  const contactDetails = getContactInfo(locale);
  const icons = {
    address: MapPin,
    landmark: LocateFixed,
    phone: Phone,
    telegram: Send,
    email: Mail,
    hours: Clock3,
    dayOff: CalendarX2,
    instagram: Instagram,
    facebook: Facebook,
  };

  return (
    <>
      <PageHero
        badge={copy.contact.hero.badge}
        title={copy.contact.hero.title}
        description={copy.contact.hero.description}
      />

      <section className="page-shell mt-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            {contactDetails.cards.map((item) => {
              const Icon = icons[item.key];
              const externalLink =
                item.href && !item.href.startsWith("tel:") && !item.href.startsWith("mailto:");

              return (
                <div key={item.key} className="premium-card p-6">
                  <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-primary">{item.title}</h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={externalLink ? "_blank" : undefined}
                      rel={externalLink ? "noreferrer" : undefined}
                      className="mt-3 inline-flex items-center gap-2 text-sm leading-7 text-slate-600 transition hover:text-primary"
                    >
                      <span>{item.value}</span>
                      {externalLink ? <ArrowUpRight size={16} /> : null}
                    </a>
                  ) : (
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.value}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid gap-6">
            <div className="premium-card p-8">
              <span className="inline-flex rounded-full border border-secondary/25 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                OXU KIDS
              </span>
              <h3 className="mt-5 text-3xl font-semibold text-primary">{contactDetails.noteTitle}</h3>
              <p className="mt-4 text-sm leading-8 text-slate-600">{contactDetails.noteText}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="tel:+998553050009"
                  className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-midnight"
                >
                  +998 55 305 00 09
                </a>
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-secondary/35 hover:text-secondary"
                >
                  {contactDetails.mapButton}
                </a>
              </div>
            </div>

            <div className="premium-card overflow-hidden p-3">
              <iframe
                title={contactDetails.mapTitle}
                src={MAP_EMBED_URL}
                className="h-[520px] w-full rounded-[24px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
