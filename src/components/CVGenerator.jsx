import { useState, useRef } from 'react'

const CV_PWD = btoa('@T5yak12')

function PasswordGate({ onSuccess, onClose }) {
  const [val, setVal] = useState('')
  const [err, setErr] = useState(false)
  const [show, setShow] = useState(false)
  const inputRef = useRef(null)

  const check = () => {
    if (btoa(val) === CV_PWD) {
      setErr(false)
      onSuccess()
    } else {
      setErr(true)
      setVal('')
      inputRef.current?.focus()
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="rounded-2xl p-7 w-full max-w-sm shadow-2xl"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <div className="text-center mb-5">
          <div className="text-4xl mb-3">🔐</div>
          <h3 className="font-black text-lg t-h mb-1">Accès protégé</h3>
          <p className="text-xs t-muted">Entrez le mot de passe pour télécharger le CV</p>
        </div>
        <div className="relative mb-3">
          <input
            ref={inputRef}
            type={show ? 'text' : 'password'}
            value={val}
            onChange={e => { setVal(e.target.value); setErr(false) }}
            onKeyDown={e => e.key === 'Enter' && check()}
            placeholder="Mot de passe"
            autoFocus
            className="w-full px-4 py-3 rounded-xl text-sm outline-none pr-10"
            style={{
              background: 'var(--bg-hover)',
              border: `1.5px solid ${err ? '#ef4444' : 'var(--border)'}`,
              color: 'var(--text-h)',
            }}
          />
          <button onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-base t-muted hover:t-h transition-colors">
            {show ? '🙈' : '👁️'}
          </button>
        </div>
        {err && <p className="text-xs text-red-400 mb-3 text-center">❌ Mot de passe incorrect</p>}
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium t-muted transition-all hover:opacity-80"
            style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)' }}>
            Annuler
          </button>
          <button onClick={check}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--accent)' }}>
            Confirmer →
          </button>
        </div>
      </div>
    </div>
  )
}
import { jsPDF } from 'jspdf'
import {
  Document, Packer, Paragraph, TextRun,
  BorderStyle, HeadingLevel
} from 'docx'
import { saveAs } from 'file-saver'

// ─── Données CV ──────────────────────────────────────────────────────────────
const CV = {
  nom: 'FRANCK JEREMIE GORI',
  titre: 'Technicien Support Informatique',
  sousTitre: 'Maintenance Systèmes & Réseaux | En formation Google IT Support',
  tel: '+225 07 59 09 98 25 / 05 45 49 47 51',
  email: 'jeremyironsgori@gmail.com',
  adresse: "lac pavé San Pédro, Côte d'Ivoire",
  linkedin: 'linkedin.com/in/franck-jérémie-gori-65845a24b',
  divers: 'Permis de conduire / Passeport',

  objectif: `Technicien informatique avec plus de trois ans d'expérience en support utilisateurs, maintenance des systèmes, installation de postes, gestion du parc informatique et résolution d'incidents.
Actuellement en formation Google IT Support Professional Certificate, SAP Technology Consultant, Oracle Cloud & AI et en initiation Microsoft Azure Cloud, avec des bases en réseaux, Active Directory, sécurité et infrastructures TI.
Motivé, autonome et capable d'apprentissage rapide, je souhaite intégrer une équipe IT et évoluer vers un poste d'administrateur systèmes ou technicien cloud.`,

  competences: [
    {
      titre: 'Support Informatique & Maintenance',
      items: [
        'Dépannage matériel et logiciel (Windows)',
        'Support utilisateurs niveau 1 et 2',
        'Installation, configuration et mise à jour de postes de travail',
        'Gestion du parc informatique et documentation',
        'Outils de ticketing (en formation – Google IT Support)',
      ],
    },
    {
      titre: 'Cloud Computing',
      items: [
        'Microsoft Azure (AZ-900 – en cours)',
        'Modèles cloud : IaaS, SaaS, PaaS',
        'Sécurité et gouvernance Azure (bases)',
        'Oracle Cloud Infrastructure (en cours)',
        'SAP Cloud Solutions (en cours)',
      ],
    },
    {
      titre: 'Virtualisation',
      items: [
        'Hyper-V (en apprentissage)',
        'VMware Workstation (en apprentissage)',
      ],
    },
    {
      titre: 'Systèmes & Réseaux',
      items: [
        'Windows Server (bases)',
        'Active Directory : gestion utilisateurs, mots de passe, groupes',
        'Linux (débutant – en formation)',
        'Réseaux : TCP/IP, DNS, DHCP, Wi-Fi, dépannage réseau',
      ],
    },
    {
      titre: 'Outils & Technologies',
      items: [
        'Suite Microsoft 365 (Outlook, Teams, SharePoint)',
        'PowerShell & Bash (débutant)',
        "Switchs & Points d'accès Wi-Fi (installation + diagnostic)",
        'Vibe Coding : Flutter, FastAPI, Agents IA, React',
      ],
    },
  ],

  langues: [
    { langue: 'Français', niveau: 'Courant' },
    { langue: 'Anglais', niveau: 'En cours de perfectionnement' },
  ],

  experiences: [
    {
      periode: 'Juin 2023 – Aujourd\'hui',
      lieu: 'San Pédro, Côte d\'Ivoire',
      role: 'IT Support / Assistant Administrateur Systèmes et Réseaux (RSI)',
      entreprise: 'Ivory Cocoa Products',
      type: 'CDI',
      taches: [
        'Supervision de l\'infrastructure réseau et matérielle.',
        'Participation à l\'acquisition et à la configuration d\'équipements informatiques.',
        'Formation des employés sur l\'utilisation des outils bureautiques.',
        'Création de logiciels adéquat pour le besoin de la société.',
        'Analyse des Systèmes d\'informations.',
        'Participation à la migration vers le cloud avec Azure et Office 365.',
        'Support technique avancé aux utilisateurs et formation sur les outils internes.',
      ],
    },
    {
      periode: 'Sept 2022 – Juin 2023',
      lieu: 'San Pédro, Côte d\'Ivoire',
      role: 'Stage perfectionnement – Assistant Administrateur Systèmes et Réseaux (RSI)',
      entreprise: 'Ivory Cocoa Products',
      type: 'Stage',
      taches: [
        'Supervision des infrastructures IT, incluant la maintenance des systèmes et des réseaux.',
        'Gestion et configuration des serveurs, pare-feu et équipements réseaux.',
      ],
    },
    {
      periode: 'Sept 2020 – Juil 2021',
      lieu: 'Boulevard de Marseille, Abidjan, Côte d\'Ivoire',
      role: 'Technicien en Informatique et Assistant en gestion du stock',
      entreprise: 'Nouvelle Pharmacie de Santé Publique (NPSP)',
      type: 'Contrat',
      taches: [
        'Vérifier la recevabilité des produits et des réclamations du client.',
        'Négocier, gérer les commandes et la prise de rendez-vous avec les clients.',
      ],
    },
    {
      periode: 'Avr 2018 – Sept 2020',
      lieu: 'Abidjan, Côte d\'Ivoire',
      role: 'Stage en Informatique',
      entreprise: 'Institut de Cardiologie d\'Abidjan',
      type: 'Stage',
      taches: [
        'Analyser les besoins des utilisateurs et réaliser une analyse fonctionnelle.',
        'Apporter une expertise conseil auprès des équipes chargées de l\'application des processus système.',
        'Maintenance des systèmes et création d\'applications.',
        'Support technique pour le déploiement d\'équipements informatiques.',
      ],
    },
  ],

  formations: [
    {
      periode: 'En cours',
      lieu: 'San Pédro, Côte d\'Ivoire',
      titre: 'SAP TECHNOLOGY CONSULTANT (En cours – Coursera)',
      items: [
        'SAP Professional Fundamentals',
        'Understanding the Enterprise Systems Environment',
        'SAP Customer Engagement and Discovery',
        'Designing & Implementing an SAP Solution',
        'SAP Technology Consultant Hands-on Project',
      ],
    },
    {
      periode: 'En cours',
      lieu: 'San Pédro, Côte d\'Ivoire',
      titre: 'ORACLE CLOUD AND AI (En cours – Coursera)',
      items: [
        'Introduction to Oracle Cloud Essentials',
        'Oracle Cloud Infrastructure AI Foundations',
        'Oracle Cloud Infrastructure Generative AI Professional',
      ],
    },
    {
      periode: 'Nov. 2025',
      lieu: 'San Pédro, Côte d\'Ivoire',
      titre: 'GOOGLE IT SUPPORT PROFESSIONAL CERTIFICATE (En cours – Coursera)',
      items: [
        'Fondamentaux du support informatique',
        'Les bases du réseau informatique',
        "Systèmes d'exploitation et vous : devenir un utilisateur avancé",
        "Administration système et services d'infrastructure TI",
        'Sécurité informatique : défense contre les menaces numériques',
      ],
    },
    {
      periode: 'Nov. 2025',
      lieu: 'San Pédro, Côte d\'Ivoire',
      titre: 'INTRODUCTION TO MICROSOFT AZURE CLOUD SERVICES (En cours)',
      items: ['Concepts du cloud', 'Services Azure', 'Politiques, sécurité et gouvernance'],
    },
    {
      periode: '08 Sep 2025 – 11 Nov. 2025',
      lieu: 'San Pédro, Côte d\'Ivoire',
      titre: 'INTRODUCTION TO DEVOPS (IBM / Coursera – Obtenu)',
      items: [
        'Compréhension des principes DevOps',
        'Automatisation, CI/CD, collaboration et méthodes agiles',
        'ID certificat : N2FFLTD651SQ (Coursera)',
      ],
    },
    {
      periode: '2017 – 2018',
      lieu: "Abidjan, Côte d'Ivoire",
      titre: "LICENCE 2 Technologies de l'Information BTS (Équivalent Baccalauréat TI)",
      items: ["Université privée (Groupe Intellect Afrique)"],
    },
    {
      periode: '2013 – 2014',
      lieu: "San Pédro, Côte d'Ivoire",
      titre: 'BACCALAURÉAT D (SÉRIE SCIENTIFIQUE)',
      items: ['Collège le Classique San Pedro'],
    },
  ],

  competencesHumaines: [
    'Autonomie & initiative',
    'Communication',
    'Organisation & gestion des priorités',
    'Analyse des problèmes',
    'Travail en équipe',
  ],

  interets: ['Sports : football, handball'],
  references: 'Référence disponible à la demande',
}

// ─── PDF ─────────────────────────────────────────────────────────────────────
function generatePDF() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = 210, ML = 15, MR = 15, CW = W - ML - MR
  const purple = [88, 28, 135]
  const black = [15, 15, 15]
  const gray = [80, 80, 80]
  const lightGray = [120, 120, 120]
  let y = 0

  const newPage = () => { doc.addPage(); y = 15 }
  const checkPage = (need = 8) => { if (y + need > 285) newPage() }

  // ── HEADER ──────────────────────────────────────────────────────────────
  // Nom
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(26)
  doc.setTextColor(...black)
  doc.text(CV.nom, ML, 18)

  // Titre
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...gray)
  doc.text(CV.titre, ML, 25)

  // Sous-titre
  doc.setFontSize(8.5)
  doc.setTextColor(...lightGray)
  doc.text(CV.sousTitre, ML, 30)

  // Contacts à droite
  const contacts = [
    `☎ ${CV.tel}`,
    `✉ ${CV.email}`,
    `⚲ ${CV.adresse}`,
    `in ${CV.linkedin}`,
    CV.divers,
  ]
  doc.setFontSize(7.8)
  doc.setTextColor(...gray)
  contacts.forEach((c, i) => {
    doc.text(c, W - MR, 12 + i * 5.5, { align: 'right' })
  })

  // Ligne violette
  doc.setDrawColor(...purple)
  doc.setLineWidth(1.2)
  doc.line(ML, 35, W - MR, 35)
  y = 42

  // ── Section helper ───────────────────────────────────────────────────────
  const sectionTitle = (title) => {
    checkPage(12)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(...black)
    doc.text(title, ML, y)
    doc.setDrawColor(...purple)
    doc.setLineWidth(0.4)
    doc.line(ML, y + 1.5, W - MR, y + 1.5)
    y += 7
  }

  const bullet = (text, indent = ML + 4, maxW = CW - 8) => {
    checkPage(6)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...black)
    doc.setFillColor(...purple)
    doc.circle(indent - 1.5, y - 0.8, 0.7, 'F')
    const lines = doc.splitTextToSize(text, maxW)
    doc.text(lines, indent, y)
    y += lines.length * 4.8
  }

  // ── OBJECTIF ────────────────────────────────────────────────────────────
  sectionTitle('OBJECTIF')
  const objLines = doc.splitTextToSize(CV.objectif, CW)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.8)
  doc.setTextColor(...gray)
  doc.text(objLines, ML, y)
  y += objLines.length * 4.8 + 6

  // ── COMPÉTENCES ─────────────────────────────────────────────────────────
  sectionTitle('COMPÉTENCES')
  const colW = CW / 2 - 4
  const leftCols = CV.competences.slice(0, 3)
  const rightCols = CV.competences.slice(3)

  let yLeft = y, yRight = y

  leftCols.forEach((cat) => {
    checkPage(10)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.8)
    doc.setTextColor(...black)
    doc.text(`• ${cat.titre}`, ML, yLeft)
    yLeft += 5
    cat.items.forEach((item) => {
      const lines = doc.splitTextToSize(item, colW - 2)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(...gray)
      doc.text(lines, ML + 2, yLeft)
      yLeft += lines.length * 4.5
    })
    yLeft += 3
  })

  const col2X = ML + colW + 8
  rightCols.forEach((cat) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.8)
    doc.setTextColor(...black)
    doc.text(`• ${cat.titre}`, col2X, yRight)
    yRight += 5
    cat.items.forEach((item) => {
      const lines = doc.splitTextToSize(item, colW - 2)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(...gray)
      doc.text(lines, col2X + 2, yRight)
      yRight += lines.length * 4.5
    })
    yRight += 3
  })

  y = Math.max(yLeft, yRight) + 4

  // ── LANGUES ─────────────────────────────────────────────────────────────
  sectionTitle('LANGUES')
  const langX2 = ML + CW / 2
  CV.langues.forEach((l, i) => {
    const x = i === 0 ? ML : langX2
    const baseY = y
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...black)
    doc.text(l.langue, x, baseY)
    // bar
    doc.setFillColor(200, 200, 200)
    doc.rect(x + doc.getTextWidth(l.langue) + 3, baseY - 3, 25, 3, 'F')
    if (i === 0) {
      doc.setFillColor(...purple)
      doc.rect(x + doc.getTextWidth(l.langue) + 3, baseY - 3, 20, 3, 'F')
    } else {
      doc.setFillColor(...purple)
      doc.rect(x + doc.getTextWidth(l.langue) + 3, baseY - 3, 8, 3, 'F')
    }
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...lightGray)
    doc.text(`(${l.niveau})`, x, baseY + 4)
  })
  y += 10

  // ── EXPÉRIENCE ──────────────────────────────────────────────────────────
  sectionTitle('EXPÉRIENCE PROFESSIONNELLE')
  const dateColW = 38, contentX = ML + dateColW + 4, contentW = CW - dateColW - 4

  CV.experiences.forEach((exp) => {
    checkPage(20)
    const expY = y

    // Période + lieu (colonne gauche)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...lightGray)
    doc.text(exp.periode, ML, expY)
    doc.text(exp.lieu, ML, expY + 4.5)

    // Rôle (colonne droite)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.8)
    doc.setTextColor(...black)
    const roleLines = doc.splitTextToSize(`${exp.role}`, contentW)
    doc.text(roleLines, contentX, expY)
    let ry = expY + roleLines.length * 4.8

    // Entreprise en italique violet
    doc.setFont('helvetica', 'bolditalic')
    doc.setFontSize(8.2)
    doc.setTextColor(...purple)
    doc.text(exp.entreprise, contentX, ry)
    ry += 5

    // Tâches
    exp.taches.forEach((t) => {
      checkPage(6)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(...gray)
      doc.setFillColor(...purple)
      doc.circle(contentX + 1, ry - 0.8, 0.7, 'F')
      const lines = doc.splitTextToSize(t, contentW - 5)
      doc.text(lines, contentX + 4, ry)
      ry += lines.length * 4.5
    })

    y = Math.max(expY + 10, ry) + 5
  })

  // ── FORMATION ───────────────────────────────────────────────────────────
  sectionTitle('FORMATION')

  CV.formations.forEach((f) => {
    checkPage(18)
    const fY = y

    // Période + lieu (gauche)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.8)
    doc.setTextColor(...lightGray)
    doc.text(f.periode, ML, fY)
    doc.text(f.lieu, ML, fY + 4.5)

    // Titre (droite, gras)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(...black)
    const tLines = doc.splitTextToSize(f.titre, contentW)
    doc.text(tLines, contentX, fY)
    let fy = fY + tLines.length * 4.8

    // items en italique
    f.items.forEach((item) => {
      checkPage(5)
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(8)
      doc.setTextColor(...gray)
      const iLines = doc.splitTextToSize(item, contentW - 4)
      doc.text(iLines, contentX + 2, fy)
      fy += iLines.length * 4.5
    })

    y = Math.max(fY + 10, fy) + 4
  })

  // ── COMPÉTENCES HUMAINES ────────────────────────────────────────────────
  checkPage(30)
  sectionTitle('COMPÉTENCES HUMAINES')
  CV.competencesHumaines.forEach((c) => bullet(c))
  y += 4

  // ── CENTRE D'INTÉRÊTS ───────────────────────────────────────────────────
  checkPage(15)
  sectionTitle("CENTRE D'INTÉRÊTS")
  CV.interets.forEach((i) => bullet(i))
  y += 4

  // ── RÉFÉRENCES ──────────────────────────────────────────────────────────
  checkPage(12)
  sectionTitle('RÉFÉRENCES')
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8.5)
  doc.setTextColor(...gray)
  doc.text(CV.references, ML, y)

  // ── Footer ───────────────────────────────────────────────────────────────
  const total = doc.getNumberOfPages()
  for (let p = 1; p <= total; p++) {
    doc.setPage(p)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(180, 180, 180)
    doc.text(`${CV.nom} · ${CV.email} · ${CV.tel}`, W / 2, 295, { align: 'center' })
  }

  doc.save('CV_Franck_Jeremie_Gori.pdf')
}

// ─── WORD ────────────────────────────────────────────────────────────────────
async function generateWord() {
  const purple = '581C87', black = '0F0F0F', gray = '505050', light = '888888'

  const hr = () => new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: purple } },
    spacing: { after: 100 },
  })

  const secTitle = (text) => new Paragraph({
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 22, color: black })],
    spacing: { before: 260, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: purple } },
  })

  const bul = (text, indent = false) => new Paragraph({
    children: [new TextRun({ text, size: 18, color: gray })],
    bullet: { level: indent ? 1 : 0 },
    spacing: { after: 40 },
  })

  const doc = new Document({
    styles: { default: { document: { run: { font: 'Calibri', size: 20, color: black } } } },
    sections: [{
      properties: { page: { margin: { top: 700, bottom: 700, left: 850, right: 850 } } },
      children: [
        // Nom
        new Paragraph({
          children: [new TextRun({ text: CV.nom, bold: true, size: 44, color: black })],
          spacing: { after: 60 },
        }),
        // Titre
        new Paragraph({
          children: [new TextRun({ text: CV.titre, size: 24, color: gray })],
          spacing: { after: 30 },
        }),
        new Paragraph({
          children: [new TextRun({ text: CV.sousTitre, size: 18, color: light, italics: true })],
          spacing: { after: 60 },
        }),
        // Contacts
        new Paragraph({
          children: [new TextRun({ text: `☎ ${CV.tel}   ✉ ${CV.email}`, size: 17, color: gray })],
          spacing: { after: 30 },
        }),
        new Paragraph({
          children: [new TextRun({ text: `⚲ ${CV.adresse}   in ${CV.linkedin}`, size: 17, color: gray })],
          spacing: { after: 30 },
        }),
        new Paragraph({
          children: [new TextRun({ text: CV.divers, size: 17, color: light })],
          spacing: { after: 160 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: purple } },
        }),

        // Objectif
        secTitle('Objectif'),
        new Paragraph({
          children: [new TextRun({ text: CV.objectif, size: 19, color: gray })],
          spacing: { after: 160 },
        }),

        // Compétences
        secTitle('Compétences'),
        ...CV.competences.flatMap(cat => [
          new Paragraph({
            children: [new TextRun({ text: `• ${cat.titre}`, bold: true, size: 19, color: black })],
            spacing: { before: 100, after: 40 },
          }),
          ...cat.items.map(item => new Paragraph({
            children: [new TextRun({ text: item, size: 17, color: gray })],
            indent: { left: 360 },
            spacing: { after: 30 },
          })),
        ]),

        // Langues
        secTitle('Langues'),
        ...CV.langues.map(l => new Paragraph({
          children: [
            new TextRun({ text: l.langue, bold: true, size: 19, color: black }),
            new TextRun({ text: `  (${l.niveau})`, size: 17, color: gray }),
          ],
          spacing: { after: 40 },
        })),

        // Expérience
        secTitle('Expérience Professionnelle'),
        ...CV.experiences.flatMap(exp => [
          new Paragraph({
            children: [
              new TextRun({ text: exp.periode, bold: true, size: 17, color: purple }),
              new TextRun({ text: `   ${exp.lieu}`, size: 16, color: light }),
            ],
            spacing: { before: 160, after: 40 },
          }),
          new Paragraph({
            children: [new TextRun({ text: exp.role, bold: true, size: 20, color: black })],
            spacing: { after: 30 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: exp.entreprise, bold: true, italics: true, size: 18, color: purple }),
              new TextRun({ text: `  (${exp.type})`, size: 16, color: light }),
            ],
            spacing: { after: 60 },
          }),
          ...exp.taches.map(t => bul(t)),
        ]),

        // Formation
        secTitle('Formation'),
        ...CV.formations.flatMap(f => [
          new Paragraph({
            children: [
              new TextRun({ text: f.periode, bold: true, size: 17, color: purple }),
              new TextRun({ text: `   ${f.lieu}`, size: 16, color: light }),
            ],
            spacing: { before: 140, after: 30 },
          }),
          new Paragraph({
            children: [new TextRun({ text: f.titre, bold: true, size: 19, color: black })],
            spacing: { after: 40 },
          }),
          ...f.items.map(item => new Paragraph({
            children: [new TextRun({ text: item, italics: true, size: 17, color: gray })],
            indent: { left: 360 },
            spacing: { after: 30 },
          })),
        ]),

        // Compétences humaines
        secTitle('Compétences Humaines'),
        ...CV.competencesHumaines.map(c => bul(c)),

        // Centres d'intérêts
        secTitle("Centre d'Intérêts"),
        ...CV.interets.map(i => bul(i)),

        // Références
        secTitle('Références'),
        new Paragraph({
          children: [new TextRun({ text: CV.references, italics: true, size: 18, color: gray })],
        }),
      ],
    }],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, 'CV_Franck_Jeremie_Gori.docx')
}

// ─── Données ATS ─────────────────────────────────────────────────────────────
const ATS = {
  nom: 'FRANCK JEREMIE GORI',
  email: 'jeremyironsgori@gmail.com',
  linkedin: 'linkedin.com/in/franck-jeremie-gori-65845a24b',
  localisation: "San Pedro, Cote d'Ivoire",
  passeport: 'Passeport valide – En recherche de visa de travail / sponsoring (Canada, Luxembourg)',

  profil: `Technicien Support Informatique avec plus de 3 ans d'experience en gestion des services IT (approche ITIL), resolution d'incidents Niveau 1 & 2 et administration des infrastructures systemes & reseaux. Competences validees en Microsoft Azure, Active Directory, Office 365 et automatisation de taches avec Python/FastAPI et Flutter. Actuellement en formation certifiante Google IT Support, SAP Technology Consultant et Oracle Cloud AI. Passeport valide. En recherche d'un employeur pouvant soutenir une demande de visa de travail au Canada (Quebec) ou au Luxembourg.`,

  competencesTech: [
    'Gestion des incidents Niveau 1 & 2 (ITIL)',
    'Gestion des demandes de services',
    'Support de proximite et Support a distance',
    'Active Directory : creation de comptes, groupes, GPO, reinitialisation mots de passe',
    'Office 365 : administration Exchange, Teams, SharePoint, OneDrive',
    'Microsoft Azure : machines virtuelles, Azure AD, services cloud (AZ-900 en cours)',
    'Oracle Cloud Infrastructure (en cours)',
    'Supervision reseau : TCP/IP, DNS, DHCP, VPN, Wi-Fi',
    'Diagnostic materiel & logiciel (Windows 10/11, Windows Server)',
    'Virtualisation : Hyper-V, VMware Workstation (apprentissage)',
    'Automatisation : Python, FastAPI, Flutter/Dart, React',
    'Outils : PowerShell, Bash, Git, GitHub',
    'Gestion du parc materiel (Assets) : inventaire, configuration, deploiement',
    'Documentation IT et outils de ticketing',
  ],

  certifications: [
    {
      titre: 'Introduction to DevOps',
      org: 'IBM / Coursera',
      periode: '08/2025 – 11/2025',
      statut: 'OBTENU',
      id: 'ID certificat : N2FFLTD651SQ',
    },
    {
      titre: 'Introduction to Cloud Computing',
      org: 'IBM / Coursera',
      periode: '2025 – En cours',
      statut: 'En cours',
    },
    {
      titre: 'Google IT Support Professional Certificate',
      org: 'Google / Coursera',
      periode: '11/2025 – En cours',
      statut: 'En cours (31% complete)',
    },
    {
      titre: 'SAP Technology Consultant',
      org: 'SAP / Coursera',
      periode: '2025 – En cours',
      statut: 'En cours',
    },
    {
      titre: 'Oracle Cloud and AI (OCI AI Foundations + Generative AI Professional)',
      org: 'Oracle / Coursera',
      periode: '2025 – En cours',
      statut: 'En cours',
    },
    {
      titre: 'Microsoft Azure Fundamentals AZ-900',
      org: 'Microsoft',
      periode: 'En cours',
      statut: 'En cours',
    },
  ],

  experiences: [
    {
      titre: 'Technicien Support Informatique / Administrateur Systemes & Reseaux',
      entreprise: 'Ivory Cocoa Products',
      lieu: 'San Pedro, Cote d\'Ivoire',
      periode: '06/2023 – Aujourd\'hui',
      type: 'CDI',
      taches: [
        'Gestion des incidents (Niveau 1 & 2) : diagnostic, resolution et escalade des incidents materiels et logiciels pour assurer la continuite de service.',
        'Gestion des demandes de services : traitement structure des requetes utilisateurs selon les priorites definies.',
        "Administration Active Directory : creation/suppression de comptes, gestion des groupes et des politiques (GPO), reinitialisation des mots de passe.",
        "Administration Office 365 : gestion des boites mail Exchange, configuration Teams et SharePoint.",
        "Gestion du parc materiel (Assets) : inventaire, configuration, deploiement et suivi des equipements informatiques.",
        "Supervision reseau : monitoring de l'infrastructure TCP/IP, DNS, DHCP, Wi-Fi et VPN.",
        "Participation a la migration cloud Azure et Office 365 : contribution a la transition vers les services cloud Microsoft.",
        "Amelioration continue du service : formation des utilisateurs aux outils bureautiques, documentation des procedures IT.",
        "Automatisation et developpement : creation d'outils et d'applications internes avec Python/FastAPI et Flutter pour optimiser les processus IT.",
      ],
    },
    {
      titre: 'Stagiaire – Assistant Administrateur Systemes & Reseaux (Stage Perfectionnement)',
      entreprise: 'Ivory Cocoa Products',
      lieu: 'San Pedro, Cote d\'Ivoire',
      periode: '09/2022 – 06/2023',
      type: 'Stage',
      taches: [
        "Support de proximite : gestion des incidents Niveau 1 et des demandes de services utilisateurs.",
        "Configuration et maintenance des serveurs Windows Server et des equipements reseaux (pare-feu, switchs, points d'acces Wi-Fi).",
        "Supervision des infrastructures IT : surveillance du reseau et resolution des pannes.",
      ],
    },
    {
      titre: 'Technicien Informatique & Assistant Gestion de Stock',
      entreprise: 'Nouvelle Pharmacie de Sante Publique (NPSP)',
      lieu: 'Abidjan, Cote d\'Ivoire',
      periode: '09/2020 – 07/2021',
      type: 'Contrat',
      taches: [
        "Maintenance du parc informatique et support utilisateurs de proximite.",
        "Gestion des demandes clients et coordination des commandes et rendez-vous.",
        "Verification et reception des produits (gestion des stocks).",
      ],
    },
    {
      titre: 'Stagiaire Informaticien',
      entreprise: "Institut de Cardiologie d'Abidjan",
      lieu: 'Abidjan, Cote d\'Ivoire',
      periode: '04/2018 – 09/2020',
      type: 'Stage',
      taches: [
        "Analyse des besoins utilisateurs et realisation d'analyses fonctionnelles.",
        "Maintenance des systemes, creation d'applications et support technique.",
        "Deploiement et configuration d'equipements informatiques.",
      ],
    },
  ],

  formations: [
    {
      titre: "Licence 2 Technologies de l'Information (BTS – Equivalent Baccalaureat TI)",
      org: "Universite privee – Groupe Intellect Afrique, Abidjan",
      periode: '2017 – 2018',
    },
    {
      titre: 'Baccalaureat D – Serie Scientifique',
      org: 'College le Classique San Pedro',
      periode: '2013 – 2014',
    },
  ],

  softSkills: [
    'Autonomie et prise d\'initiative',
    'Communication claire avec les utilisateurs non techniques',
    'Organisation et gestion des priorites sous pression',
    'Esprit d\'analyse et resolution de problemes',
    'Capacite d\'apprentissage rapide et adaptation aux nouveaux outils',
    'Travail en equipe et collaboration transversale',
  ],

  langues: [
    'Francais : courant (langue maternelle)',
    'Anglais : niveau intermediaire, en cours de perfectionnement',
  ],
}

// ─── PDF ATS ──────────────────────────────────────────────────────────────────
function generatePDF_ATS() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = 210, ML = 20, MR = 20, CW = W - ML - MR
  const black = [10, 10, 10]
  const dark = [40, 40, 40]
  const mid = [90, 90, 90]
  let y = 20

  const newPage = () => { doc.addPage(); y = 20 }
  const check = (n = 10) => { if (y + n > 280) newPage() }

  const sec = (title) => {
    check(12)
    y += 4
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(...black)
    doc.text(title.toUpperCase(), ML, y)
    doc.setDrawColor(...black)
    doc.setLineWidth(0.5)
    doc.line(ML, y + 1.5, W - MR, y + 1.5)
    y += 7
  }

  const line = (text, size = 9, bold = false, indent = 0) => {
    check(6)
    doc.setFont('helvetica', bold ? 'bold' : 'normal')
    doc.setFontSize(size)
    doc.setTextColor(...dark)
    const lines = doc.splitTextToSize(text, CW - indent)
    doc.text(lines, ML + indent, y)
    y += lines.length * 5
  }

  const bul = (text) => {
    check(6)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.8)
    doc.setTextColor(...dark)
    const lines = doc.splitTextToSize(text, CW - 6)
    doc.text('-', ML + 1, y)
    doc.text(lines, ML + 5, y)
    y += lines.length * 4.8
  }

  // ── Nom
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(...black)
  doc.text(ATS.nom, ML, y)
  y += 8

  // ── Contacts
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.8)
  doc.setTextColor(...mid)
  doc.text(`Email : ${ATS.email}   |   LinkedIn : ${ATS.linkedin}`, ML, y)
  y += 5
  doc.text(`Localisation : ${ATS.localisation}   |   ${ATS.passeport}`, ML, y)
  y += 3
  doc.setDrawColor(...black)
  doc.setLineWidth(0.6)
  doc.line(ML, y + 2, W - MR, y + 2)
  y += 8

  // ── Profil
  sec('Profil Professionnel')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...dark)
  const pLines = doc.splitTextToSize(ATS.profil, CW)
  doc.text(pLines, ML, y)
  y += pLines.length * 5 + 4

  // ── Compétences
  sec('Competences Techniques')
  ATS.competencesTech.forEach(c => bul(c))
  y += 3

  // ── Certifications
  sec('Certifications')
  ATS.certifications.forEach(c => {
    check(14)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...black)
    doc.text(`${c.titre}  [${c.statut}]`, ML, y)
    y += 4.8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...mid)
    doc.text(`${c.org}  –  ${c.periode}`, ML + 3, y)
    y += 4.2
    if (c.id) {
      doc.text(c.id, ML + 3, y)
      y += 4.2
    }
    y += 1
  })

  // ── Expérience
  sec('Experience Professionnelle')
  ATS.experiences.forEach(exp => {
    check(25)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...black)
    doc.text(exp.titre, ML, y)
    y += 5
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text(exp.entreprise, ML, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...mid)
    doc.text(`  –  ${exp.lieu}  |  ${exp.periode}  |  ${exp.type}`, ML + doc.getTextWidth(exp.entreprise), y)
    y += 5
    doc.setTextColor(...dark)
    exp.taches.forEach(t => bul(t))
    y += 3
  })

  // ── Formation
  sec('Formation')
  ATS.formations.forEach(f => {
    check(12)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...black)
    doc.text(f.titre, ML, y)
    y += 4.8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...mid)
    doc.text(`${f.org}  –  ${f.periode}`, ML + 3, y)
    y += 5.5
  })

  // ── Soft Skills
  sec('Competences Comportementales')
  ATS.softSkills.forEach(s => bul(s))
  y += 3

  // ── Langues
  sec('Langues')
  ATS.langues.forEach(l => bul(l))

  doc.save('CV_ATS_Canada_Luxembourg_Franck_Gori.pdf')
}

// ─── WORD ATS ─────────────────────────────────────────────────────────────────
async function generateWord_ATS() {
  const black = '0A0A0A', dark = '282828', mid = '5A5A5A'

  const sec = (text) => new Paragraph({
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 22, color: black })],
    spacing: { before: 280, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: black } },
  })

  const bul = (text) => new Paragraph({
    children: [new TextRun({ text, size: 18, color: dark })],
    bullet: { level: 0 },
    spacing: { after: 40 },
  })

  const doc = new Document({
    styles: { default: { document: { run: { font: 'Calibri', size: 20, color: dark } } } },
    sections: [{
      properties: { page: { margin: { top: 800, bottom: 800, left: 1000, right: 1000 } } },
      children: [
        // Nom
        new Paragraph({
          children: [new TextRun({ text: ATS.nom, bold: true, size: 42, color: black })],
          spacing: { after: 60 },
        }),
        // Contacts
        new Paragraph({
          children: [new TextRun({ text: `Email : ${ATS.email}`, size: 18, color: mid })],
          spacing: { after: 30 },
        }),
        new Paragraph({
          children: [new TextRun({ text: `LinkedIn : ${ATS.linkedin}`, size: 18, color: mid })],
          spacing: { after: 30 },
        }),
        new Paragraph({
          children: [new TextRun({ text: `Localisation : ${ATS.localisation}`, size: 18, color: mid })],
          spacing: { after: 30 },
        }),
        new Paragraph({
          children: [new TextRun({ text: ATS.passeport, size: 18, color: mid })],
          spacing: { after: 160 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: black } },
        }),

        // Profil
        sec('Profil Professionnel'),
        new Paragraph({
          children: [new TextRun({ text: ATS.profil, size: 19, color: dark })],
          spacing: { after: 160 },
        }),

        // Compétences
        sec('Competences Techniques'),
        ...ATS.competencesTech.map(c => bul(c)),

        // Certifications
        sec('Certifications'),
        ...ATS.certifications.flatMap(c => [
          new Paragraph({
            children: [
              new TextRun({ text: `${c.titre}`, bold: true, size: 20, color: black }),
              new TextRun({ text: `  [${c.statut}]`, bold: true, size: 18, color: c.statut === 'OBTENU' ? '166534' : mid }),
            ],
            spacing: { before: 120, after: 30 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `${c.org}  –  ${c.periode}`, size: 17, color: mid }),
              ...(c.id ? [new TextRun({ text: `  –  ${c.id}`, size: 17, color: mid, italics: true })] : []),
            ],
            indent: { left: 360 },
            spacing: { after: 60 },
          }),
        ]),

        // Expérience
        sec('Experience Professionnelle'),
        ...ATS.experiences.flatMap(exp => [
          new Paragraph({
            children: [new TextRun({ text: exp.titre, bold: true, size: 21, color: black })],
            spacing: { before: 180, after: 40 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: exp.entreprise, bold: true, size: 19, color: black }),
              new TextRun({ text: `  –  ${exp.lieu}  |  ${exp.periode}  |  ${exp.type}`, size: 17, color: mid }),
            ],
            spacing: { after: 80 },
          }),
          ...exp.taches.map(t => bul(t)),
        ]),

        // Formation
        sec('Formation'),
        ...ATS.formations.flatMap(f => [
          new Paragraph({
            children: [new TextRun({ text: f.titre, bold: true, size: 20, color: black })],
            spacing: { before: 120, after: 30 },
          }),
          new Paragraph({
            children: [new TextRun({ text: `${f.org}  –  ${f.periode}`, size: 17, color: mid })],
            indent: { left: 360 },
            spacing: { after: 60 },
          }),
        ]),

        // Soft skills
        sec('Competences Comportementales'),
        ...ATS.softSkills.map(s => bul(s)),

        // Langues
        sec('Langues'),
        ...ATS.langues.map(l => bul(l)),
      ],
    }],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, 'CV_ATS_Canada_Luxembourg_Franck_Gori.docx')
}

// ─── Bouton CV Standard ───────────────────────────────────────────────────────
export default function CVGenerator() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(null)
  const [pending, setPending] = useState(null)

  const request = (type) => { setOpen(false); setPending(type) }

  const handle = async (type) => {
    setLoading(type)
    try {
      if (type === 'pdf') generatePDF()
      else await generateWord()
    } finally {
      setLoading(null)
      setPending(null)
    }
  }

  return (
    <>
      {pending && <PasswordGate onSuccess={() => handle(pending)} onClose={() => setPending(null)} />}
      <div className="relative inline-block">
        <button
          onClick={() => setOpen(o => !o)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
          style={{ background: 'var(--accent)', color: '#fff', boxShadow: 'var(--glow-sm)' }}
        >
          <span>📄</span> Télécharger CV
          <span style={{ fontSize: '10px', opacity: 0.8 }}>▾</span>
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute left-0 mt-2 z-50 rounded-xl overflow-hidden shadow-2xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', minWidth: '190px' }}>
              <button onClick={() => request('pdf')} disabled={loading === 'pdf'}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-150 hover:opacity-80"
                style={{ color: 'var(--text-h)' }}>
                <span className="text-lg">📕</span>
                {loading === 'pdf' ? 'Génération...' : 'Télécharger PDF'}
              </button>
              <div style={{ height: '1px', background: 'var(--border)' }} />
              <button onClick={() => request('word')} disabled={loading === 'word'}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-150 hover:opacity-80"
                style={{ color: 'var(--text-h)' }}>
                <span className="text-lg">📘</span>
                {loading === 'word' ? 'Génération...' : 'Télécharger Word'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

// ─── Point bleu ATS ───────────────────────────────────────────────────────────
export function ATSButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(null)
  const [pending, setPending] = useState(null)

  const request = (type) => setPending(type)

  const handle = async (type) => {
    setLoading(type)
    try {
      if (type === 'pdf') generatePDF_ATS()
      else await generateWord_ATS()
    } finally {
      setLoading(null)
      setPending(null)
    }
  }

  return (
    <>
      {pending && <PasswordGate onSuccess={() => handle(pending)} onClose={() => setPending(null)} />}

      {/* Point bleu cliquable */}
      <div className="relative">
        <button
          onClick={() => setOpen(true)}
          title="CV ATS · Canada / Luxembourg"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 hover:scale-110"
          style={{ background: '#2563eb22', border: '1.5px solid #2563eb', color: '#2563eb' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          ATS
        </button>
      </div>

      {/* Modale */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
          onClick={() => setOpen(false)}>
          <div
            className="relative rounded-2xl p-6 w-full max-w-md shadow-2xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header modale */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                  <h3 className="font-black text-lg t-h">CV ATS Optimisé</h3>
                </div>
                <p className="text-xs t-muted">Format texte simple · Passe 100% des logiciels ATS</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#ef444420', color: '#ef4444', border: '1px solid #ef444440' }}>🇨🇦 Canada (Québec)</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#3b82f620', color: '#3b82f6', border: '1px solid #3b82f640' }}>🇱🇺 Luxembourg</span>
                </div>
              </div>
              <button onClick={() => setOpen(false)}
                className="text-xl t-muted hover:t-h transition-colors w-8 h-8 flex items-center justify-center rounded-lg"
                style={{ background: 'var(--bg-hover)' }}>×</button>
            </div>

            {/* Infos */}
            <div className="rounded-xl p-4 mb-5 space-y-1.5"
              style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)' }}>
              {[
                '✓ Vocabulaire ITIL (Gestion incidents, Assets, ITSM)',
                '✓ Mots-clés : Active Directory, Azure, Office 365, VPN',
                '✓ Vibe Coding valorisé : Python, FastAPI, Flutter',
                '✓ Sans photo · Sans état civil · Passeport valide (visa de travail à obtenir)',
                '✓ Certifications : IBM DevOps obtenu en premier',
              ].map((item, i) => (
                <p key={i} className="text-xs t-body">{item}</p>
              ))}
            </div>

            {/* Boutons téléchargement */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => request('pdf')}
                disabled={loading === 'pdf'}
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.03]"
                style={{ background: '#ef444415', border: '1.5px solid #ef444440', color: '#ef4444' }}
              >
                <span className="text-2xl">📕</span>
                {loading === 'pdf' ? 'Génération...' : 'PDF ATS'}
                <span className="text-xs opacity-70">Idéal pour postuler</span>
              </button>
              <button
                onClick={() => request('word')}
                disabled={loading === 'word'}
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.03]"
                style={{ background: '#3b82f615', border: '1.5px solid #3b82f640', color: '#3b82f6' }}
              >
                <span className="text-2xl">📘</span>
                {loading === 'word' ? 'Génération...' : 'Word ATS'}
                <span className="text-xs opacity-70">Modifiable</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
