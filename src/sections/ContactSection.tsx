import { ContactCta } from "../components/ContactCta";
import { profile } from "../data/coreContent";

type ContactSectionProps = {
  sectionId?: string;
  className?: string;
  as?: "section" | "div";
};

export const ContactSection = ({
  sectionId = "contact",
  className = "section",
  as,
}: ContactSectionProps) => {
  return <ContactCta profile={profile} sectionId={sectionId} className={className} as={as} />;
};
