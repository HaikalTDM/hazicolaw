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

export const FEATURED_AREAS = [
  {
    id: 'employment',
    index: '01',
    title: 'Industrial Relations & Employment Law',
    summary:
      'Advice and representation across the full employment lifecycle, from contracts and workplace policies to disciplinary processes, dismissals, and disputes before the Industrial Court.',
    partner: 'Muhajir Wazinie',
    points: [
      'Misconduct & domestic inquiry advisory',
      'Constructive dismissal claims',
      'Retrenchment & workforce restructuring',
      'Labour court proceedings',
    ],
  },
  {
    id: 'estate',
    index: '02',
    title: 'Estate Planning, Wills (Wasiat & Hibah)',
    summary:
      'Syariah-compliant estate planning that keeps wealth moving the way you intend, covering wills, wasiat, hibah, faraid, and estate administration.',
    partner: 'Haziq Azhari',
    points: [
      'Wills & wasiat drafting',
      'Hibah structuring',
      'Faraid & Syariah-compliant planning',
      'Probate & estate administration',
    ],
  },
]

export const OTHER_AREAS = [
  {
    index: '03',
    title: 'Business Development',
    summary: 'Advisory for growth, commercial arrangements, and new ventures.',
  },
  {
    index: '04',
    title: 'Corporate Liability & Risk Management',
    summary: 'Governance, exposure, and risk across corporate operations.',
  },
  {
    index: '05',
    title: 'Trusts',
    summary: 'Establishing, administering, and advising on trusts.',
  },
  {
    index: '06',
    title: 'Family Law',
    summary: 'Matrimonial, family, and related personal matters.',
  },
  {
    index: '07',
    title: 'Conveyancing & Real Estate',
    summary: 'Property transactions, transfers, and real estate advisory.',
  },
  {
    index: '08',
    title: 'Litigation',
    summary: 'Representation in court and tribunal proceedings.',
  },
  {
    index: '09',
    title: 'Project & Corporate Advisory',
    summary: 'Structuring and advisory for projects and corporate transactions.',
  },
  {
    index: '10',
    title: 'Banking, Finance & Debt Recovery',
    summary: 'Financing, security documentation, debt recovery, and bankruptcy.',
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
    teaser:
      'Licensed Islamic Estate Planner; advises on estate planning, corporate structuring, and civil litigation.',
    bio: {
      education: [
        'Bachelor of Laws (Honours), LL.B (Hons), UiTM',
        'Postgraduate Diploma in Syariah Law and Practice (DLSA), UiTM',
      ],
      focus: [
        'Licensed Islamic Estate Planner at As-Salihin Trustee Berhad (2021–present), specialising in Syariah-compliant estate planning including hibah, wasiat, and faraid',
        'General Civil Litigation',
        'Project and Corporate Advisory',
        'Business Development and Risk Management',
        'Conveyancing',
        'Debt Recovery and Execution Proceedings',
      ],
      highlightsLabel: 'Selected experience',
      highlights: [
        'Advised on the incorporation and structuring of companies, SMEs, and partnerships across Kuala Lumpur, Selangor, and Melaka, particularly within the F&B, consultancy services, and sports centre industries.',
        'Advised clients in mediation proceedings on debt recovery and settlement structuring, with a focus on commercially practical and cost-efficient outcomes.',
        'Advised on the incorporation and regulatory compliance of non-governmental organisations with the Registrar of Societies (ROS), including constitution drafting, governance structuring, and regulatory documentation.',
        'Drafted and advised on 1,041 wasiat and hibah instruments, ensuring compliance with applicable civil and Syariah principles.',
      ],
      journey:
        'Developed a strong foundation in civil and Syariah law through UiTM, followed by pupillage at Messrs. Bhadarul Baharain & Partners, focusing on probate, estate administration, and corporate matters.',
      aspiration:
        'Committed to bridging Islamic legal principles with modern financial and legal frameworks, delivering Syariah-compliant advisory, estate management, and strategic legal services for individuals and corporate entities.',
    },
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
    teaser:
      'Industrial relations and employment specialist with a record of reported decisions in the Industrial Court.',
    bio: {
      education: [
        'Bachelor of Laws (Honours), LL.B (Hons), UiTM',
        'Diploma in Public Administration (DPA), UiTM',
      ],
      focus: [
        'Industrial Relations and Employment Law',
        'General Civil Litigation and Commercial Litigation',
        'Misconduct & Domestic Inquiry Advisory',
        'Constructive Dismissal Claims',
        'Retrenchment & Workforce Restructuring',
      ],
      highlightsLabel: 'Reported decisions',
      highlights: [
        'S Ravichandran M Sinniah v. IGC Industrial Galvanizers Corporation (M) Sdn Bhd [2025] ILRU 0097',
        'Tan Jin Hui v. Lafarge Concrete (Malaysia) Sdn Bhd [2025] CLU 557',
        'Adnan Osup v. Empire Manufacturing Sdn Bhd [2025] 1 ILR 118',
        'Nur Haniza Mohd Azhar v. Mizznina Productions [2025] ILRU 1401',
        'Riza Feizal Sham v. Sapura Research Sdn Bhd [2025] ILRU 0317',
        'Chang Shen Yun v. Robert Bosch Sdn Bhd [2025] ILRU 0755',
        'Poh Kwei Wah v. Dindings Poultry Development Centre Sdn Bhd [2024] ILRU 1638',
        'Tan Jin Hui v. Lafarge Concrete (Malaysia) Sdn Bhd [2024] ILRU 0540',
        'Nedunchelian Raman v. Genesys Laboratories Sdn Bhd [2024] ILRU 0050',
        'Rajendran Balakrishnan v. Associated Pan Malaysia Cement Sendirian Berhad [2025] ILRU 1696',
        'Mohd Saifuddin Abdullah v. Campbell Cheong Chan (Malaysia) Sdn Bhd [2023] ILRU 1482',
        'Maarziana Nasser Ali Khan v. Zurich General Insurance Malaysia Berhad [2023] ILRU 1611',
      ],
      journey:
        'Combines a strong foundation in governance and regulatory systems with an LL.B (Hons), advising employers on disciplinary processes, domestic inquiries, termination procedures, and retrenchment planning, and representing employers in dismissal, retrenchment, and disciplinary disputes.',
      aspiration:
        'Committed to practical, commercially minded legal solutions across employment, industrial relations, and litigation matters.',
    },
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
