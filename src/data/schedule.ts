/** Faixa etária e chaves de modalidade usadas no fluxo do chat. */

export type AgeBand = "3-7" | "8-11" | "12-13" | "14-15" | "16-17" | "18+";

export type ModalityKey =
  | "ballet"
  | "jazz"
  | "contemporary"
  | "breaking"
  | "jazzfunk_soph"
  | "jazzfunk_ph";

export const AGE_OPTIONS: { id: AgeBand; label: string }[] = [
  { id: "3-7", label: "3 a 7 anos" },
  { id: "8-11", label: "8 a 11 anos" },
  { id: "12-13", label: "12 a 13 anos" },
  { id: "14-15", label: "14 a 15 anos" },
  { id: "16-17", label: "16 a 17 anos" },
  { id: "18+", label: "18+" },
];

const MODALITY_LABEL: Record<ModalityKey, string> = {
  ballet: "Ballet Clássico",
  jazz: "Jazz Dance",
  contemporary: "Dança Contemporânea",
  breaking: "Breaking",
  jazzfunk_soph: "Jazz Funk (Soph)",
  jazzfunk_ph: "Jazz Funk (PH)",
};

const SCHEDULES: Record<AgeBand, Partial<Record<ModalityKey, string[]>>> = {
  "3-7": {
    ballet: [
      "Ter e Qui — 18h30 às 19h15 (Baby Class)",
      "Ter e Qui — 19h20 às 20h10 (Preliminar)",
    ],
  },
  "8-11": {
    ballet: ["Seg e Qua — 19h30 às 20h20 (Preliminar II)"],
    jazz: ["Seg e Qua — 18h às 18h50 (Teen)"],
    contemporary: ["Ter e Qui — 17h30 às 18h20 (Teen)"],
    breaking: ["Sexta — 17h30 às 19h"],
  },
  "12-13": {
    ballet: [
      "Ter e Qui — 16h30 às 17h20 (Básico II)",
      "Seg e Qua — 14h30 às 16h (Intermediário I)",
      "Ter e Qui — 19h30 às 21h (Intermediário II)",
    ],
    jazz: [
      "Seg e Qua — 18h às 18h50 (Teen)",
      "Ter e Qui — 18h30 às 19h20 (Iniciante)",
      "Seg e Qua — 19h30 às 20h20 (Intermediário)",
    ],
    contemporary: [
      "Ter e Qui — 17h30 às 18h20 (Teen)",
      "Seg e Qua — 20h30 às 21h20 (Intermediário)",
    ],
    breaking: ["Sexta — 17h30 às 19h"],
  },
  "14-15": {
    ballet: [
      "Ter e Qui — 16h30 às 17h20 (Básico II)",
      "Seg e Qua — 14h30 às 16h (Intermediário I)",
      "Ter e Qui — 19h30 às 21h (Intermediário II)",
    ],
    jazz: [
      "Seg e Qua — 18h às 18h50 (Teen)",
      "Ter e Qui — 18h30 às 19h20 (Iniciante)",
      "Seg e Qua — 19h30 às 20h20 (Intermediário)",
    ],
    contemporary: [
      "Ter e Qui — 17h30 às 18h20 (Teen)",
      "Seg e Qua — 20h30 às 21h20 (Intermediário)",
    ],
    jazzfunk_soph: ["Sexta — 18h às 19h30"],
  },
  "16-17": {
    ballet: [
      "Ter e Qui — 16h30 às 17h20 (Básico II)",
      "Seg e Qua — 14h30 às 16h (Intermediário I)",
      "Ter e Qui — 19h30 às 21h (Intermediário II)",
    ],
    jazz: [
      "Seg e Qua — 18h às 18h50 (Teen)",
      "Ter e Qui — 18h30 às 19h20 (Iniciante)",
      "Seg e Qua — 19h30 às 20h20 (Intermediário)",
    ],
    contemporary: [
      "Ter e Qui — 17h30 às 18h20 (Teen)",
      "Seg e Qua — 20h30 às 21h20 (Intermediário)",
    ],
    jazzfunk_soph: ["Sexta — 18h às 19h30"],
    jazzfunk_ph: ["Sexta — 19h30 às 21h"],
  },
  "18+": {
    ballet: [
      "Ter e Qui — 19h30 às 20h20 (Básico I)",
      "Ter e Qui — 20h30 às 21h20 (Básico II)",
      "Seg e Qua — 16h às 16h50 (Básico II)",
      "Seg e Qua — 17h às 17h50 (Básico III)",
    ],
    jazz: [
      "Ter e Qui — 18h30 às 19h20 (Iniciante)",
      "Seg e Qua — 19h30 às 20h20 (Intermediário)",
      "Seg e Qua — 20h30 às 21h20 (Avançado)",
    ],
    contemporary: [
      "Seg e Qua — 20h30 às 21h20 (Intermediário)",
      "Ter e Qui — 18h30 às 19h30 (Avançado)",
    ],
    jazzfunk_soph: ["Sexta — 18h às 19h30"],
    jazzfunk_ph: ["Sexta — 19h30 às 21h"],
  },
};

const MODALITIES_BY_AGE: Record<AgeBand, ModalityKey[]> = {
  "3-7": ["ballet"],
  "8-11": ["ballet", "jazz", "contemporary", "breaking"],
  "12-13": ["ballet", "jazz", "contemporary", "breaking"],
  "14-15": ["ballet", "jazz", "contemporary", "jazzfunk_soph"],
  "16-17": [
    "ballet",
    "jazz",
    "contemporary",
    "jazzfunk_soph",
    "jazzfunk_ph",
  ],
  "18+": [
    "ballet",
    "jazz",
    "contemporary",
    "jazzfunk_soph",
    "jazzfunk_ph",
  ],
};

export function modalitiesForAge(band: AgeBand): { key: ModalityKey; label: string }[] {
  return MODALITIES_BY_AGE[band].map((key) => ({
    key,
    label: MODALITY_LABEL[key],
  }));
}

export function schedulesFor(
  band: AgeBand,
  modality: ModalityKey,
): string[] {
  return SCHEDULES[band]?.[modality] ?? [];
}
