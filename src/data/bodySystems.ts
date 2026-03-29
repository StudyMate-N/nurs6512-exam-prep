export interface BodySystem {
  id: string;
  abbreviation: string;
  name: string;
  points: string;
  inspect: string;
  verbalize: string;
  specialNote?: string;
}

export const bodySystems: BodySystem[] = [
  {
    id: 'general-survey',
    abbreviation: 'GS',
    name: 'General Survey',
    points: 'Foundational (unscored)',
    inspect:
      'Overall appearance, level of distress, body habitus, hygiene and grooming, affect and mood, posture, gait on entry, speech quality.',
    verbalize:
      '"Patient appears well-nourished, well-developed, in no acute distress. Alert and oriented. Neat appearance. Appropriate affect. Gait steady on entry."',
  },
  {
    id: 'skin',
    abbreviation: 'SK',
    name: 'Skin',
    points: '2 pts',
    inspect:
      'All body surfaces systematically, especially feet. Check for lesions, color changes (pallor, erythema, jaundice, cyanosis), rashes, turgor, moisture, temperature. Inspect nails for clubbing, cyanosis, capillary refill.',
    verbalize:
      '"Inspecting skin from head to toe — noting color, texture, moisture, and lesions. Checking feet especially for breakdown or ulceration. Skin is warm, dry, intact. No rashes, lesions, or areas of breakdown noted. Nails without clubbing or cyanosis."',
  },
  {
    id: 'head-neck',
    abbreviation: 'HN',
    name: 'Head & Neck',
    points: '6 pts',
    inspect:
      'Skull (shape, tenderness), facial symmetry. Lymph nodes — full cervical chain: preauricular, postauricular, occipital, submandibular, submental, anterior cervical, posterior cervical, supraclavicular. Thyroid — ask patient to swallow water while palpating. Tracheal midline placement.',
    verbalize:
      '"Inspecting and palpating skull — normocephalic, atraumatic, no tenderness. Palpating cervical lymph nodes systematically — no adenopathy. Palpating thyroid — please take a sip of water and swallow. Thyroid — no enlargement, no nodules. Trachea midline, no deviation."',
  },
  {
    id: 'eyes',
    abbreviation: 'EY',
    name: 'Eyes',
    points: '12 pts',
    inspect:
      'Visual acuity (Snellen chart — each eye separately). Peripheral visual fields (confrontation test — each quadrant). Extraocular movements (H-pattern — 6 cardinal positions of gaze). Conjunctiva and sclera (pull down lower lid). Pupillary reaction (PERRLA — direct AND consensual). Ophthalmoscopic exam: disc margins, cup-to-disc ratio, AV nicking, hemorrhages, microaneurysms, neovascularization, macula.',
    verbalize:
      '"Testing visual acuity — 20/20 bilateral. Visual fields intact by confrontation. EOMs intact, no nystagmus. Conjunctiva pink, no pallor. Pupils equal, round, reactive to light — PERRLA, direct and consensual intact. Ophthalmoscopic exam: sharp disc margin, cup-to-disc ratio 0.3, no AV nicking, no hemorrhages, no microaneurysms, no neovascularization."',
    specialNote:
      'CRITICAL: Always describe what you see on ophthalmoscopy aloud — "sharp disc margin, no hemorrhages." Simply performing the exam without narrating scores 0 for those items.',
  },
  {
    id: 'ears-nose',
    abbreviation: 'EN',
    name: 'Ears, Nose, Sinuses & Mouth',
    points: '8 pts',
    inspect:
      "Gross hearing — whisper test at 2 feet, occlude opposite ear. Otoscopic exam: describe tympanic membrane (pearly gray, intact), light reflex position (right ear 5 o'clock, left ear 7 o'clock), bony landmarks (malleus), presence of effusion. Inspect nares for patency, mucosa, septal deviation. Palpate then percuss frontal and maxillary sinuses. Mouth: mucosa, teeth, tongue (midline), uvula (rises midline on phonation 'ahh'), no lesions or exudate.",
    verbalize:
      "\"Whisper test — patient correctly identifies bilateral. Gross hearing intact. Otoscopic exam — right ear: TM pearly gray, intact, light reflex at 5 o'clock, bony landmarks visible. Left ear — TM pearly gray, intact, light reflex at 7 o'clock, no effusion. Nares patent bilaterally. Sinuses — non-tender. Oral mucosa moist, teeth intact, tongue midline, uvula rises midline.\"",
  },
  {
    id: 'thorax-lungs',
    abbreviation: 'TL',
    name: 'Thorax & Lungs',
    points: '~10 pts',
    inspect:
      'Posterior chest first: inspect (chest shape/symmetry, respiratory rate, pattern, use of accessory muscles), palpate (tactile fremitus — compare bilateral), percuss (systematic pattern side-to-side — resonant vs dull), auscultate (all lung fields, bilateral comparison — vesicular, bronchovesicular, bronchial sounds; listen for adventitious sounds). Repeat sequence anteriorly.',
    verbalize:
      '"Inspecting posterior chest — symmetric expansion, no deformities, respiratory rate regular. Palpating for tactile fremitus — symmetric bilaterally. Percussing — resonant throughout bilateral lung fields. Auscultating — clear vesicular breath sounds bilaterally, no adventitious sounds — no wheezes, crackles, or rhonchi. Anterior chest assessed — findings the same."',
    specialNote:
      'Always assess BOTH posterior AND anterior lung fields. Many students forget to move to the anterior chest. Both are required for full points.',
  },
  {
    id: 'cardiovascular',
    abbreviation: 'CV',
    name: 'Cardiovascular',
    points: '~10 pts',
    inspect:
      'Inspect precordium for heaves, lifts, or visible pulsations. Palpate PMI (point of maximal impulse) at 5th ICS, midclavicular line. Auscultate all 4 valve areas with diaphragm then bell: Aortic (2nd R ICS), Pulmonic (2nd L ICS), Tricuspid (4th L ICS), Mitral (5th ICS MCL). Assess JVD (30-degree angle). Auscultate carotid arteries for bruits. Peripheral vascular: inspect lower extremities, palpate dorsalis pedis and posterior tibial pulses.',
    verbalize:
      '"Inspecting precordium — no heaves or lifts visible. PMI palpable at 5th ICS midclavicular line. Auscultating aortic area — S1 S2, regular rate and rhythm, no murmurs. Pulmonic area — no murmurs. Tricuspid area — no murmurs, no rubs. Mitral area — no murmurs, no S3 or S4. No carotid bruits. No JVD. Dorsalis pedis and posterior tibial pulses 2+ bilaterally."',
    specialNote:
      'CRITICAL: Auscultate all FOUR valve areas by name and location — aortic, pulmonic, tricuspid, mitral. Missing one area loses the points for that valve site.',
  },
  {
    id: 'abdomen',
    abbreviation: 'AB',
    name: 'Abdomen',
    points: '~10 pts',
    inspect:
      'Inspect (contour, symmetry, skin, visible pulsations, distension). AUSCULTATE BEFORE PALPATING — bowel sounds all 4 quadrants (listen 30 seconds each), aortic and renal bruits. Percuss (tympany throughout, liver span — MCL 6-12cm, spleen). Light palpation all quadrants. Deep palpation (masses, organomegaly). Liver edge (deep palpation RUQ). Spleen. CVA tenderness bilateral.',
    verbalize:
      '"Inspecting abdomen — flat, symmetric, no visible pulsations. Auscultating before palpating — bowel sounds present all quadrants, no aortic or renal bruits. Percussing — tympany throughout, liver span approximately 9cm at MCL. Light palpation — no tenderness. Deep palpation — no masses, no organomegaly. CVA tenderness — none bilaterally."',
    specialNote:
      'CRITICAL: Always auscultate BEFORE palpating the abdomen. Palpation alters bowel sounds and invalidates findings. This is a frequently failed step — do NOT skip it.',
  },
  {
    id: 'musculoskeletal',
    abbreviation: 'MS',
    name: 'Musculoskeletal',
    points: '~8 pts',
    inspect:
      'Inspect and palpate all accessible joints: hands, wrists, elbows, shoulders, hips, knees, ankles, feet. Assess spinal ROM: flexion (touch toes), extension, lateral flexion bilateral, rotation bilateral. Upper extremity strength against resistance: grip, deltoid, bicep, tricep (0-5 scale). Lower extremity strength: hip flexion, knee extension/flexion, dorsiflexion, plantarflexion.',
    verbalize:
      '"Inspecting joints — no swelling, erythema, or deformity in any joint. Spinal ROM — flexion, extension, lateral flexion, and rotation all within normal limits. Upper extremity strength 5/5 bilaterally — grip, deltoid, bicep, tricep. Lower extremity strength 5/5 bilaterally — hip flexion, knee extension and flexion, dorsiflexion, plantarflexion."',
  },
  {
    id: 'neurological',
    abbreviation: 'NR',
    name: 'Neurological',
    points: '~20 pts',
    inspect:
      'Cranial nerves I-XII (all must be named by name AND number). Sensory: sharp-dull discrimination (broken tongue depressor), vibration sense (tuning fork at bony prominences — great toes, wrists), position sense. Cerebellar: Romberg test, finger-to-nose, rapid alternating movements. Deep tendon reflexes: biceps (C5-C6), triceps (C7), brachioradialis (C6), patellar (L3-L4), Achilles (S1) — rate 0-4+. Gait assessment.',
    verbalize:
      '"Cranial nerves I through XII assessed — all intact as previously demonstrated. Sensory: sharp-dull discrimination intact, vibration and position sense intact bilaterally. Romberg negative. Finger-to-nose smooth, no dysmetria. Rapid alternating movements intact bilaterally. DTRs 2+ throughout. Gait — steady, smooth, coordinated, no ataxia."',
    specialNote:
      'CRITICAL: You MUST state each cranial nerve by both name AND number — "Cranial Nerve Seven — Facial" not just "CN 7". Omitting either the name or number loses the point for that nerve. The 20-point Overall Approach score is also heavily dependent on neurological fluency.',
  },
];
