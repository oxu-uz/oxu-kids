import { BookOpen, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import crestLogo from "../assets/oxu-kids-crest.png";
import { getContactInfo } from "../data/contactInfo";
import { useLanguage } from "../hooks/useLanguage";
import { getUiTranslations } from "../i18n/ui";

function Footer() {
  const { locale } = useLanguage();
  const copy = getUiTranslations(locale);
  const footerContact = getContactInfo(locale);

  return (
    <footer className="mt-20 border-t border-primary/10 bg-white/70">
      <div className="page-shell py-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr,1fr]">
          <div className="flex gap-4">
            <img
              src={crestLogo}
              alt={copy.common.crestAlt}
              className="brand-crest h-20 w-20 shrink-0 object-contain"
            />
            <div>
              <h3 className="font-display text-3xl font-semibold text-primary">OXU KIDS</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
                {copy.footer.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              {copy.footer.quickLinks}
            </h4>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {copy.nav.links.slice(1).map((link) => (
                <Link key={link.to} to={link.to} className="block transition hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              {copy.footer.contactTitle}
            </h4>
            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-primary" size={18} />
                <span>{footerContact.footerAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary" size={18} />
                <span>{footerContact.footerPhone}</span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="text-primary" size={18} />
                <span>{footerContact.footerHours}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary/10 pt-6 text-sm text-slate-500">
          {copy.footer.copyright}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
