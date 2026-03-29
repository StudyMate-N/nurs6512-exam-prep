export type BlockType = 'say' | 'do' | 'check';

export interface ScriptBlock {
  type: BlockType;
  content: string;
}

export interface ScriptSection {
  id: string;
  number: number;
  title: string;
  blocks: ScriptBlock[];
}

export const examScript: ScriptSection[] = [
  {
    id: 'entering',
    number: 1,
    title: 'Entering the Room',
    blocks: [
      {
        type: 'do',
        content:
          'Set up all equipment on the table. Ensure volunteer is seated comfortably. Confirm video connection is working and faculty can see you clearly.',
      },
      {
        type: 'check',
        content:
          'Equipment checklist: stethoscope, otoscope, ophthalmoscope, Snellen chart, reflex hammer, tuning forks (500–1000 Hz), tape measure. All present and accessible.',
      },
      {
        type: 'say',
        content:
          "Hello, my name is Leanne. I'm a nurse practitioner student at Walden University. Today I'll be performing a comprehensive head-to-toe physical examination. I'll be explaining each step as I go. Do you have any questions before we begin?",
      },
    ],
  },
  {
    id: 'general-survey',
    number: 2,
    title: 'General Survey',
    blocks: [
      {
        type: 'say',
        content: "I'll begin with a general survey.",
      },
      {
        type: 'do',
        content:
          'Step back and observe patient from a distance. Take a full 5–10 seconds of silent observation before speaking.',
      },
      {
        type: 'check',
        content:
          'General appearance: level of distress, body habitus, nutritional status, hygiene and grooming, affect and mood, speech quality, gait (if they walked in).',
      },
      {
        type: 'say',
        content:
          'Patient appears well-nourished, well-developed, in no acute distress. Alert and oriented. Appropriate affect. No obvious asymmetry or abnormality on general inspection.',
      },
    ],
  },
  {
    id: 'skin',
    number: 3,
    title: 'Skin',
    blocks: [
      {
        type: 'say',
        content: "I'll now assess the skin.",
      },
      {
        type: 'do',
        content:
          'Inspect all accessible skin surfaces systematically — scalp (lift hair), face, neck, arms, trunk, legs. Check between fingers and toes. Inspect feet carefully for breakdown.',
      },
      {
        type: 'check',
        content:
          'Color (pallor, erythema, jaundice, cyanosis), texture, moisture, temperature, lesions (note size/shape/color/distribution if present), turgor, edema.',
      },
      {
        type: 'say',
        content:
          'Skin is warm, dry, intact. Color even throughout — no pallor, jaundice, or cyanosis. No rashes, lesions, or areas of breakdown noted. Checking feet — no ulcerations, no breakdown. Nails without clubbing or cyanosis. Capillary refill less than 2 seconds bilaterally.',
      },
    ],
  },
  {
    id: 'head-neck',
    number: 4,
    title: 'Head and Neck',
    blocks: [
      {
        type: 'say',
        content: 'Moving to head and neck assessment.',
      },
      {
        type: 'do',
        content:
          'Palpate skull with fingertips in circular motion — systematically cover all surfaces.',
      },
      {
        type: 'say',
        content:
          'Skull is normocephalic, atraumatic. No tenderness, masses, or depressions palpated.',
      },
      {
        type: 'do',
        content:
          'Palpate full cervical lymph node chain: preauricular, postauricular, occipital, submandibular, submental, anterior cervical chain, posterior cervical chain, supraclavicular. Use pads of fingers, gentle circular motion.',
      },
      {
        type: 'say',
        content:
          'Palpating cervical lymph nodes — anterior chain, posterior chain, submandibular, submental, preauricular, postauricular, occipital, and supraclavicular. No lymphadenopathy — no palpable nodes.',
      },
      {
        type: 'do',
        content:
          'Ask patient to take a sip of water and hold it in their mouth. Place fingertips on thyroid. Ask patient to swallow. Feel the thyroid move upward under your fingers.',
      },
      {
        type: 'say',
        content:
          "Please take a sip of water and swallow when I say so. [pause] Now. Thyroid — no enlargement, no nodules felt, no tenderness. Thyroid moves symmetrically with swallowing.",
      },
      {
        type: 'do',
        content:
          'Palpate trachea — place fingertip in sternal notch, feel for midline position.',
      },
      {
        type: 'say',
        content: 'Trachea midline. No deviation noted.',
      },
    ],
  },
  {
    id: 'eyes',
    number: 5,
    title: 'Eyes',
    blocks: [
      {
        type: 'say',
        content: "Now I'll assess your eyes.",
      },
      {
        type: 'do',
        content: 'Position Snellen chart at appropriate distance (20 feet or scaled equivalent).',
      },
      {
        type: 'say',
        content:
          "I'm checking visual acuity. Please cover your left eye and read the lowest line you can see clearly.",
      },
      {
        type: 'check',
        content: 'Record right eye result. Then switch — cover right eye, test left.',
      },
      {
        type: 'say',
        content:
          'Visual acuity — 20/20 right eye, 20/20 left eye. Visual acuity intact bilaterally.',
      },
      {
        type: 'do',
        content:
          'Confrontation visual fields — sit facing patient, close your own corresponding eye, hold fingers out in each of the 4 quadrants equidistant between you. Wiggle fingers, ask patient to say "now" when they see movement while keeping eyes on your nose.',
      },
      {
        type: 'say',
        content:
          'Checking peripheral visual fields by confrontation — superior, inferior, temporal, nasal fields bilaterally. Visual fields intact in all quadrants bilaterally.',
      },
      {
        type: 'do',
        content:
          'Hold finger 12–18 inches from patient\'s face. Move slowly in H-pattern: left, left-up, left-down, right, right-up, right-down. Then center and test convergence. Watch for smooth tracking, nystagmus, lid lag.',
      },
      {
        type: 'say',
        content:
          'Testing extraocular movements — please follow my finger without moving your head. EOMs intact through all 6 cardinal positions of gaze. No nystagmus. No ptosis.',
      },
      {
        type: 'do',
        content:
          'Pull down lower lid to expose conjunctiva and sclera. Inspect color of conjunctiva and sclera.',
      },
      {
        type: 'say',
        content: 'Conjunctiva pink — no pallor, no injection. Sclera white — no icterus.',
      },
      {
        type: 'do',
        content:
          'Pupillary reflex — darken room if possible. Shine penlight from lateral approach into one eye while watching for direct response (same eye) and consensual response (opposite eye). Repeat on other side. Test accommodation — ask patient to focus on distant object then on your finger close to their nose.',
      },
      {
        type: 'say',
        content:
          'Pupils equal, round, and reactive to light — PERRLA. Direct and consensual response intact bilaterally. Accommodation intact.',
      },
      {
        type: 'do',
        content:
          'Ophthalmoscope — set to 0 diopters. Approach right eye from right side at 15 degrees lateral. Ask patient to focus on a distant point. Identify the disc, follow vessels outward, examine macula last (ask patient to look at light briefly).',
      },
      {
        type: 'say',
        content:
          "Performing ophthalmoscopic exam — right eye: I see a sharp disc margin, cup-to-disc ratio approximately 0.3, no arteriovenous nicking, no flame hemorrhages, no microaneurysms, no neovascularization, macula appears normal. Left eye — same findings. Ophthalmoscopic exam complete.",
      },
    ],
  },
  {
    id: 'ears-nose',
    number: 6,
    title: 'Ears, Nose, Sinuses, and Mouth',
    blocks: [
      {
        type: 'say',
        content: "Now ears, nose, sinuses, and mouth.",
      },
      {
        type: 'do',
        content:
          'Stand approximately 2 feet from patient. Occlude one ear with your finger. Whisper a two-syllable word. Repeat on opposite side.',
      },
      {
        type: 'say',
        content:
          'Whisper test — patient correctly identifies bilateral. Gross hearing intact bilaterally.',
      },
      {
        type: 'do',
        content:
          'Otoscope — for adults, pull auricle UP and BACK to straighten canal. Examine right ear first, then left. Describe all landmarks.',
      },
      {
        type: 'say',
        content:
          "Otoscopic exam — right ear: tympanic membrane pearly gray, intact, light reflex present at 5 o'clock, bony landmarks visible — malleus clearly seen, no effusion or erythema. Left ear — tympanic membrane pearly gray, intact, light reflex at 5 o'clock, bony landmarks visible, no effusion.",
      },
      {
        type: 'do',
        content: 'Inspect nares — use otoscope or penlight. Look into each naris.',
      },
      {
        type: 'say',
        content:
          'Nares patent bilaterally. Nasal mucosa pink and moist. No polyps. No septal deviation.',
      },
      {
        type: 'do',
        content:
          'Palpate frontal sinuses — thumbs above orbital rim. Then percuss. Palpate maxillary sinuses — thumbs on cheekbones below orbital rim. Then percuss.',
      },
      {
        type: 'say',
        content:
          'Frontal sinuses — no tenderness to palpation or percussion. Maxillary sinuses — non-tender to palpation and percussion.',
      },
      {
        type: 'do',
        content:
          'Use tongue depressor and penlight — inspect oral mucosa, teeth, tongue, hard and soft palate. Ask patient to say "ahh" — observe uvula and palate.',
      },
      {
        type: 'say',
        content:
          "Oral mucosa moist and pink. Teeth intact, good dentition. Tongue midline, no lesions. Uvula rises midline on phonation — please say 'ahh.' Soft palate elevates symmetrically. No lesions, no exudate, no tonsillar hypertrophy.",
      },
    ],
  },
  {
    id: 'cranial-nerves',
    number: 7,
    title: 'Cranial Nerves I–XII',
    blocks: [
      {
        type: 'say',
        content: 'I will now test all 12 cranial nerves.',
      },
      {
        type: 'say',
        content:
          "Cranial Nerve I — Olfactory — sensory — tests smell. I would test by asking the patient to identify a familiar scent such as coffee or mint with each nostril occluded. Patient reports intact smell bilaterally. CN I — intact.",
      },
      {
        type: 'say',
        content:
          "Cranial Nerve II — Optic — sensory — tests vision and visual fields. Already assessed with Snellen chart and confrontation visual fields. Visual acuity 20/20 bilateral, fields intact in all quadrants. CN II — intact.",
      },
      {
        type: 'say',
        content:
          "Cranial Nerve III — Oculomotor — motor — controls eyelid elevation, most eye movements, and pupil constriction. Already assessed with EOMs and pupillary light reflex. EOMs intact, PERRLA confirmed. CN III — intact.",
      },
      {
        type: 'say',
        content:
          "Cranial Nerve IV — Trochlear — motor — controls downward and inward eye movement via superior oblique muscle. Tested in H-pattern EOM exam — downward and inward gaze intact bilaterally. No deficits. CN IV — intact.",
      },
      {
        type: 'say',
        content:
          "Cranial Nerve V — Trigeminal — both sensory and motor. Sensory: facial sensation in three divisions — V1 ophthalmic, V2 maxillary, V3 mandibular.",
      },
      {
        type: 'do',
        content:
          'Light touch with cotton wisp on forehead (V1), cheek (V2), and jaw (V3) — compare bilateral response.',
      },
      {
        type: 'say',
        content:
          "Light touch sensation intact bilaterally in all three divisions. Motor — mastication: please clench your teeth.",
      },
      {
        type: 'do',
        content: 'Palpate masseter and temporalis muscles as patient clenches jaw.',
      },
      {
        type: 'say',
        content: 'Masseter and temporalis strength intact bilaterally. CN V — intact.',
      },
      {
        type: 'say',
        content:
          "Cranial Nerve VI — Abducens — motor — controls lateral gaze via lateral rectus muscle. Tested in H-pattern EOM exam — lateral gaze intact bilaterally. CN VI — intact.",
      },
      {
        type: 'say',
        content:
          "Cranial Nerve VII — Facial — both sensory and motor. Motor: facial expression muscles.",
      },
      {
        type: 'do',
        content:
          "Ask patient to raise eyebrows, close eyes tightly (test by trying to open them), smile showing teeth, and puff out cheeks.",
      },
      {
        type: 'say',
        content:
          "Please raise your eyebrows — symmetric. Close your eyes tight — symmetric resistance. Smile showing your teeth — symmetric. Puff out your cheeks — symmetric. No facial asymmetry. CN VII — intact.",
      },
      {
        type: 'say',
        content:
          "Cranial Nerve VIII — Vestibulocochlear — sensory — hearing and balance. Cochlear division tested with whisper test — intact bilaterally. Rinne and Weber testing would confirm type of any hearing loss if present. Vestibular division tested with Romberg — will assess during cerebellar exam. CN VIII — intact.",
      },
      {
        type: 'say',
        content:
          "Cranial Nerve IX — Glossopharyngeal — both sensory and motor. Sensory: pharyngeal sensation, taste posterior tongue. Motor: stylopharyngeus. Tested together with CN X via gag reflex. CN IX — intact.",
      },
      {
        type: 'say',
        content:
          "Cranial Nerve X — Vagus — both sensory and motor. Motor: soft palate elevation, larynx.",
      },
      {
        type: 'do',
        content: "Ask patient to say 'ahh' — already assessed. Observe uvula and palate.",
      },
      {
        type: 'say',
        content:
          "Uvula rises midline, palate elevates symmetrically — already demonstrated. Voice quality normal, no hoarseness. CN X — intact.",
      },
      {
        type: 'say',
        content: "Cranial Nerve XI — Accessory — motor — sternocleidomastoid and trapezius.",
      },
      {
        type: 'do',
        content:
          'Test trapezius: place hands on patient\'s shoulders, ask patient to shrug up against resistance. Test SCM: place hand on patient\'s jaw, ask patient to turn head against resistance — test each side.',
      },
      {
        type: 'say',
        content:
          "Please shrug your shoulders up against my hands — strength 5/5 bilaterally. Please turn your head to the right against my hand — 5/5. To the left — 5/5. CN XI — intact.",
      },
      {
        type: 'say',
        content: 'Cranial Nerve XII — Hypoglossal — motor — all tongue movements.',
      },
      {
        type: 'do',
        content: 'Ask patient to stick tongue straight out. Observe for deviation.',
      },
      {
        type: 'say',
        content:
          "Please stick your tongue straight out. Tongue protrudes midline — no deviation, no atrophy, no fasciculations. Please move your tongue to the right — and to the left. Tongue movement full and equal bilaterally. CN XII — intact.",
      },
      {
        type: 'check',
        content:
          'All 12 cranial nerves assessed and intact: I Olfactory, II Optic, III Oculomotor, IV Trochlear, V Trigeminal, VI Abducens, VII Facial, VIII Vestibulocochlear, IX Glossopharyngeal, X Vagus, XI Accessory, XII Hypoglossal.',
      },
    ],
  },
  {
    id: 'thorax-lungs',
    number: 8,
    title: 'Thorax and Lungs',
    blocks: [
      {
        type: 'say',
        content: "Now I'll assess the thorax and lungs. I'll begin with the posterior chest.",
      },
      {
        type: 'do',
        content:
          'Position patient seated, leaning slightly forward. Expose posterior chest. Stand behind patient.',
      },
      {
        type: 'say',
        content:
          'Inspecting posterior chest — shape and symmetry normal, no deformities. Chest expansion appears equal bilaterally. Respiratory rate regular, unlabored. No use of accessory muscles.',
      },
      {
        type: 'do',
        content:
          "Palpate for tactile fremitus — place ulnar aspect of both hands on posterior chest, ask patient to say '99'. Move hands down symmetrically, comparing bilateral fields.",
      },
      {
        type: 'say',
        content:
          "Palpating for tactile fremitus — please say '99.' Fremitus equal and symmetric bilaterally. No increased or decreased fremitus.",
      },
      {
        type: 'do',
        content:
          'Percuss posterior chest systematically — side to side, top to bottom. Cover upper, middle, and lower lung fields. Compare bilateral sounds.',
      },
      {
        type: 'say',
        content:
          'Percussing — resonant throughout bilateral lung fields. No dullness suggesting consolidation, no hyperresonance.',
      },
      {
        type: 'do',
        content:
          'Auscultate posterior chest with stethoscope diaphragm — systematically, side to side, apex to base. Ask patient to breathe deeply through mouth.',
      },
      {
        type: 'say',
        content:
          "Please breathe deeply through your mouth. Auscultating posterior chest — vesicular breath sounds throughout bilateral lung fields. No adventitious sounds — no wheezes, no crackles, no rhonchi.",
      },
      {
        type: 'do',
        content: 'Move patient to face you. Assess anterior chest with same 4-step sequence.',
      },
      {
        type: 'say',
        content:
          "Now the anterior chest — inspection, palpation, percussion, and auscultation. Anterior chest — symmetric expansion. Tactile fremitus equal bilaterally. Percussion resonant throughout. Breath sounds clear bilaterally, no adventitious sounds. Thorax and lungs assessment complete.",
      },
    ],
  },
  {
    id: 'cardiovascular',
    number: 9,
    title: 'Cardiovascular',
    blocks: [
      {
        type: 'say',
        content: "Now the cardiovascular exam.",
      },
      {
        type: 'do',
        content:
          'Position patient supine (or at 30–45 degrees). Stand to the right side. Inspect precordium visually.',
      },
      {
        type: 'say',
        content:
          'Inspecting precordium — no visible heaves, lifts, or abnormal pulsations.',
      },
      {
        type: 'do',
        content:
          'Palpate PMI — use fingertip pads at 5th intercostal space, midclavicular line. Note size, location, duration.',
      },
      {
        type: 'say',
        content:
          'PMI palpable at 5th intercostal space, midclavicular line — normal location, non-displaced, non-sustained.',
      },
      {
        type: 'do',
        content:
          'Auscultate all 4 valve areas — use both diaphragm (high-pitched: S1, S2, murmurs) and bell (low-pitched: S3, S4, mitral stenosis). Aortic: 2nd right ICS. Pulmonic: 2nd left ICS. Tricuspid: 4th left ICS. Mitral (apex): 5th ICS MCL.',
      },
      {
        type: 'say',
        content:
          'Auscultating cardiac valve areas — aortic area: S1 S2, regular rate and rhythm, no murmurs. Pulmonic area: clear, no murmurs. Tricuspid area: clear, no murmurs, no rubs. Mitral area: clear, no murmurs, no S3 or S4 gallop.',
      },
      {
        type: 'do',
        content:
          'Auscultate bilateral carotid arteries with bell — ask patient to hold breath briefly.',
      },
      {
        type: 'say',
        content: 'Carotid auscultation — no bruits bilaterally.',
      },
      {
        type: 'do',
        content:
          'Assess JVD — elevate HOB to 30–45 degrees. Look for internal jugular vein distension above clavicle.',
      },
      {
        type: 'say',
        content:
          'Jugular venous distension — not present at 30-degree elevation. Cardiovascular exam complete.',
      },
    ],
  },
  {
    id: 'abdomen',
    number: 10,
    title: 'Abdomen',
    blocks: [
      {
        type: 'say',
        content: "Now the abdominal exam. I will always auscultate before palpating.",
      },
      {
        type: 'do',
        content: 'Position patient supine, arms at sides. Expose abdomen. Stand to right side.',
      },
      {
        type: 'say',
        content:
          'Inspecting abdomen — flat and symmetric contour, skin intact, no visible pulsations, no distension, no visible peristalsis.',
      },
      {
        type: 'do',
        content:
          'AUSCULTATE FIRST — before any palpation. Use diaphragm. Listen in all 4 quadrants for bowel sounds (at least 30 seconds each). Then use bell at epigastrium for aortic bruits, at RUQ/LUQ for renal bruits.',
      },
      {
        type: 'say',
        content:
          'Auscultating before palpating — bowel sounds present in all four quadrants, normoactive. No aortic or renal bruits heard.',
      },
      {
        type: 'do',
        content:
          'Percuss all 4 quadrants. Assess liver span at MCL — start in RUQ, percuss down from resonance to dullness (upper liver border), then up from below costal margin until dullness (lower liver border). Measure span.',
      },
      {
        type: 'say',
        content:
          'Percussing — tympany throughout, consistent with air-filled bowel. Liver span approximately 9 centimeters at right MCL — normal.',
      },
      {
        type: 'do',
        content:
          'Light palpation — all 4 quadrants, watch patient\'s face for grimacing. Then deep palpation — each quadrant. Palpate for liver edge at RCM. Palpate for spleen at LCM.',
      },
      {
        type: 'say',
        content:
          'Light palpation — no tenderness, no guarding, no rigidity in any quadrant. Deep palpation — no masses, no organomegaly. Liver edge not palpable below costal margin. Spleen not palpable.',
      },
      {
        type: 'do',
        content:
          'CVA tenderness — ask patient to sit forward. Use fist to deliver firm blows to bilateral costovertebral angles.',
      },
      {
        type: 'say',
        content:
          'CVA tenderness — none bilaterally. No tenderness over kidneys. Abdominal exam complete.',
      },
    ],
  },
  {
    id: 'musculoskeletal',
    number: 11,
    title: 'Musculoskeletal',
    blocks: [
      {
        type: 'say',
        content: "Now the musculoskeletal assessment.",
      },
      {
        type: 'do',
        content:
          'Inspect all accessible joints systematically: hands, wrists, elbows, shoulders, hips, knees, ankles, feet. Look for swelling, erythema, deformity, atrophy.',
      },
      {
        type: 'say',
        content:
          'Inspecting joints — no swelling, erythema, warmth, or deformity noted in any joint. No muscle atrophy visible.',
      },
      {
        type: 'say',
        content:
          "Now spinal range of motion. Please touch your toes.",
      },
      {
        type: 'do',
        content:
          'Ask patient to perform each spinal movement: forward flexion (touch toes), extension (lean back), lateral flexion (lean right and left), rotation (twist right and left).',
      },
      {
        type: 'say',
        content:
          'Good flexion. Please lean backward. Good extension. Please lean to your right — and your left. Good lateral flexion bilaterally. Please twist to your right — and your left. Good rotation bilaterally. Spinal ROM full in all planes.',
      },
      {
        type: 'do',
        content:
          'Test upper extremity strength against resistance — grip (squeeze fingers), deltoid (elevate arms against downward pressure), bicep (flex arm against extension), tricep (extend arm against flexion). Grade 0–5.',
      },
      {
        type: 'say',
        content:
          'Upper extremity strength — grip strength 5/5 bilaterally. Deltoid 5/5. Bicep 5/5. Tricep 5/5.',
      },
      {
        type: 'do',
        content:
          'Test lower extremity strength — hip flexion (raise knee against downward pressure), knee extension (kick out against resistance), knee flexion (bend knee against extension), dorsiflexion (pull foot up against resistance), plantarflexion (push foot down against resistance).',
      },
      {
        type: 'say',
        content:
          'Lower extremity strength — hip flexion 5/5 bilaterally. Knee extension 5/5. Knee flexion 5/5. Dorsiflexion 5/5. Plantarflexion 5/5. Musculoskeletal assessment complete.',
      },
    ],
  },
  {
    id: 'neurological',
    number: 12,
    title: 'Neurological',
    blocks: [
      {
        type: 'say',
        content:
          'Neurological assessment. Cranial nerves have been assessed — all 12 intact as previously demonstrated. Proceeding with sensory, cerebellar, reflexes, and gait.',
      },
      {
        type: 'do',
        content:
          'Sensory exam — sharp/dull: use broken tongue depressor or safety pin cap. Test bilateral upper extremities (hands, arms) and lower extremities (feet, legs). Compare sides.',
      },
      {
        type: 'say',
        content:
          'Sensory exam — sharp-dull discrimination intact bilaterally in upper and lower extremities. Patient correctly identifies sharp versus dull in all areas tested.',
      },
      {
        type: 'do',
        content:
          'Vibration sense — strike tuning fork, place on bony prominences: bilateral great toes, then bilateral wrists. Ask patient to say "now" when they stop feeling vibration.',
      },
      {
        type: 'say',
        content:
          'Vibration sense — intact at bilateral great toes and bilateral wrists.',
      },
      {
        type: 'do',
        content:
          'Position sense — hold patient\'s great toe on sides (not top/bottom), move up or down with eyes closed. Ask patient which direction. Repeat other side.',
      },
      {
        type: 'say',
        content:
          'Position sense — intact bilaterally. Motor strength was assessed during musculoskeletal exam — 5/5 throughout.',
      },
      {
        type: 'say',
        content: 'Now cerebellar function. First, the Romberg test.',
      },
      {
        type: 'do',
        content:
          'Romberg — ask patient to stand with feet together, arms at sides. Patient is stable with eyes open. Now ask patient to close eyes. Stand close, ready to catch. Observe for 20–30 seconds.',
      },
      {
        type: 'say',
        content:
          "Please stand with your feet together, arms at your sides. Good. Now close your eyes — I'll stand close for safety. Romberg — negative. No sway with eyes closed. Vestibular and proprioceptive function intact.",
      },
      {
        type: 'do',
        content:
          'Finger-to-nose — extend your finger, ask patient to alternately touch their nose and your finger. Move your finger to different positions. Test both hands.',
      },
      {
        type: 'say',
        content:
          'Finger-to-nose — smooth, accurate, no dysmetria or intention tremor bilaterally.',
      },
      {
        type: 'do',
        content:
          'Rapid alternating movements — ask patient to rapidly alternate palm-up and palm-down on their thigh. Then finger tapping. Test both hands.',
      },
      {
        type: 'say',
        content: 'Rapid alternating movements — smooth and rhythmic bilaterally. No dysdiadochokinesia.',
      },
      {
        type: 'say',
        content: 'Now deep tendon reflexes.',
      },
      {
        type: 'do',
        content:
          'Use reflex hammer — brisk wrist flick. Biceps: support arm, thumb on tendon, strike thumb. Triceps: let arm hang, strike triceps tendon above elbow. Brachioradialis: arm supported, strike 2–3 cm above wrist. Patellar: legs hanging, strike just below patella. Achilles: foot slightly dorsiflexed, strike Achilles tendon. Grade 0–4+ (2+ is normal).',
      },
      {
        type: 'say',
        content:
          'Biceps reflex — 2+ bilaterally, C5-C6. Triceps reflex — 2+ bilaterally, C7. Brachioradialis — 2+ bilaterally, C6. Patellar reflex — 2+ bilaterally, L3-L4. Achilles reflex — 2+ bilaterally, S1. Deep tendon reflexes symmetric and normal throughout.',
      },
      {
        type: 'do',
        content:
          'Gait assessment — ask patient to walk across room normally, turn, and return. Then tandem gait (heel-to-toe in a straight line).',
      },
      {
        type: 'say',
        content:
          'Gait — steady, smooth, coordinated, appropriate arm swing, no ataxia. Tandem gait intact — no difficulty with heel-to-toe walking. Neurological assessment complete.',
      },
    ],
  },
  {
    id: 'closing',
    number: 13,
    title: 'Closing',
    blocks: [
      {
        type: 'do',
        content: 'Step back from patient. Maintain professional posture. Face faculty camera.',
      },
      {
        type: 'say',
        content:
          'That completes the comprehensive head-to-toe physical examination. Thank you for your cooperation. Do you have any questions?',
      },
      {
        type: 'say',
        content:
          "Summary of findings — all 9 body systems assessed in head-to-toe order. All cranial nerves I through XII assessed individually by name and number. General examination unremarkable. All findings within normal limits for this patient.",
      },
      {
        type: 'check',
        content:
          'Verify all systems covered: Skin, Head & Neck, Eyes, Ears/Nose/Sinuses/Mouth, Cranial Nerves, Thorax & Lungs, Cardiovascular, Abdomen, Musculoskeletal, Neurological. Equipment used: stethoscope, otoscope, ophthalmoscope, Snellen chart, reflex hammer, tuning forks, tape measure.',
      },
    ],
  },
];
