import haziqPortrait from '../assets/haziq.png'
import mujahirPortrait from '../assets/mujahir.png'

export const NAV_LINKS = [
  { id: 'practice', label: 'Practice' },
  { id: 'people', label: 'People' },
  { id: 'contact', label: 'Contact' },
]

export const FIRM = {
  name: 'Haziq Azhari & Co.',
  shortName: 'Hazicolaw',
  designation: 'Advocates & Solicitors',
  city: 'Kuala Lumpur',
  email: 'general.hazicolaw@outlook.com',
  address:
    'B2-3, Solaris Dutamas, No 1 Jalan Dutamas 1, 50480 Kuala Lumpur, Malaysia',
  area: 'Solaris Dutamas, W.P. Kuala Lumpur',
  instagram: 'https://www.instagram.com/hazicolaw/',
  year: 2026,
}

export const PRACTICE_AREAS = [
  {
    index: '01',
    title: 'Business Development',
    summary: 'Advisory for growth, commercial arrangements, and new ventures.',
  },
  {
    index: '02',
    title: 'Corporate Liability & Risk Management',
    summary: 'Governance, exposure, and risk across corporate operations.',
  },
  {
    index: '03',
    title: 'Trusts',
    summary: 'Establishing, administering, and advising on trusts.',
  },
  {
    index: '04',
    title: 'Estate Planning, Wills (Wasiat & Hibah)',
    summary: 'Wills, wasiat, hibah, and the orderly transfer of wealth.',
  },
  {
    index: '05',
    title: 'Family Law',
    summary: 'Matrimonial, family, and related personal matters.',
  },
  {
    index: '06',
    title: 'Conveyancing & Real Estate',
    summary: 'Property transactions, transfers, and real estate advisory.',
  },
  {
    index: '07',
    title: 'Litigation',
    summary: 'Representation in court and tribunal proceedings.',
  },
  {
    index: '08',
    title: 'Project & Corporate Advisory',
    summary: 'Structuring and advisory for projects and corporate transactions.',
  },
  {
    index: '09',
    title: 'Banking & Finance',
    summary: 'Financing, security documentation, and banking matters.',
  },
  {
    index: '10',
    title: 'Debt Recovery & Bankruptcy',
    summary: 'Recovery actions, insolvency, and bankruptcy.',
  },
]

export const PARTNERS = [
  {
    id: 'haziq-azhari',
    name: 'Haziq Azhari',
    role: 'Managing Partner',
    phone: '+60 13-370 6402',
    phoneHref: 'tel:+60133706402',
    whatsapp: 'https://wa.me/60133706402',
    monogram: 'HA',
    portrait: haziqPortrait,
  },
  {
    id: 'muhajir-wazinie',
    name: 'Muhajir Wazinie bin Morchseinie',
    role: 'Partner',
    phone: '+60 12-858 3561',
    phoneHref: 'tel:+60128583561',
    whatsapp: 'https://wa.me/60128583561',
    monogram: 'MW',
    portrait: mujahirPortrait,
  },
]

export const SERVICES = [
  {
    index: '01',
    title: 'Employment',
    summary:
      'Advice for workplace decisions, contracts, policies, and employment disputes.',
  },
  {
    index: '02',
    title: 'Private wealth',
    summary:
      'Structuring and protecting personal wealth with clarity and discretion.',
  },
  {
    index: '03',
    title: 'Estate & inheritance',
    summary:
      'Guidance through planning, administration, and inheritance-related concerns.',
  },
  {
    index: '04',
    title: 'Litigation',
    summary: 'Strategic representation when negotiation is no longer enough.',
  },
]

export const CAPABILITIES = [
  {
    title: 'Clear by design',
    summary: 'Plain-language advice and defined next steps.',
  },
  {
    title: 'Close to the matter',
    summary: 'Direct access to experienced partners.',
  },
  {
    title: 'Built for the long view',
    summary: 'Counsel that considers what follows the immediate decision.',
  },
]

export const PROCESS_STAGES = [
  {
    key: 'listen',
    title: 'Listen',
    body: 'The first conversation is for understanding your matter: the facts, the people involved, and what a good outcome looks like to you.',
  },
  {
    key: 'assess',
    title: 'Assess',
    body: 'We review the position carefully and determine whether the firm is the appropriate fit for the matter before anything moves forward.',
  },
  {
    key: 'advise',
    title: 'Advise',
    body: 'You receive a considered view in plain language: the options, the trade-offs, and the next step we would take.',
  },
  {
    key: 'act',
    title: 'Act',
    body: 'Once instructions are settled, the agreed course is carried out deliberately, with communication at each turn.',
  },
]

export const FAQ_ITEMS = [
  {
    id: 'faq-timing',
    question: 'How quickly can we arrange a consultation?',
    answer:
      'Reach us through the form, by email, or by phone and we will respond to arrange a suitable time. Timing depends on the partners’ schedule and the nature of the matter.',
  },
  {
    id: 'faq-who',
    question: 'Who will I speak with?',
    answer:
      'You will speak with a partner. The firm is partner-led by design, so the people you meet are the people responsible for understanding and guiding the matter.',
  },
  {
    id: 'faq-prepare',
    question: 'What should I bring to the first conversation?',
    answer:
      'Any documents central to the matter: contracts, correspondence, or notices, together with a short chronology of events. If you are unsure, bring what you have and we will work through it together.',
  },
  {
    id: 'faq-scope',
    question: 'Can you advise on both personal and business matters?',
    answer:
      'The practice spans employment, private wealth, estate and inheritance, and litigation. Many matters touch both personal and business concerns, and the first conversation helps establish the scope.',
  },
  {
    id: 'faq-litigation',
    question: 'Do you take on disputes and litigation?',
    answer:
      'Yes, litigation is part of the practice. Representation in any specific matter is subject to consultation and conflict checks.',
  },
  {
    id: 'faq-inheritance',
    question: 'Can I contact the firm about an inheritance matter?',
    answer:
      'Yes. Estate and inheritance matters, including planning, administration, and related concerns, are part of the practice.',
  },
  {
    id: 'faq-fit',
    question: 'How do I know whether Hazicolaw is the right fit?',
    answer:
      'The first consultation exists for exactly that purpose. We will be direct about whether the firm suits the matter, and you are under no obligation to proceed.',
  },
]

export const MATTER_TYPES = [
  'Employment',
  'Private Wealth',
  'Estate',
  'Inheritance',
  'Litigation',
  'Other',
]
