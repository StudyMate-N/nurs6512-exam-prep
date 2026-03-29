export interface CranialNerve {
  number: number;
  name: string;
  type: 'Sensory' | 'Motor' | 'Both';
  function: string;
  testMethod: string;
  abnormalFinding: string;
}

export const cranialNerves: CranialNerve[] = [
  {
    number: 1,
    name: 'Olfactory',
    type: 'Sensory',
    function: 'Smell',
    testMethod:
      'Ask patient to identify a familiar scent (coffee or mint) with each nostril occluded. One nostril at a time.',
    abnormalFinding:
      'Anosmia — inability to smell. May indicate frontal lobe lesion, head trauma, or early Parkinson\'s disease.',
  },
  {
    number: 2,
    name: 'Optic',
    type: 'Sensory',
    function: 'Vision — visual acuity and visual fields',
    testMethod:
      'Snellen chart for visual acuity (cover one eye at a time). Confrontation test for visual fields — wiggle fingers in each quadrant while patient focuses on your nose.',
    abnormalFinding:
      'Decreased visual acuity, visual field defects (hemianopia, quadrantanopia, scotoma). Unilateral blindness suggests ipsilateral optic nerve lesion.',
  },
  {
    number: 3,
    name: 'Oculomotor',
    type: 'Motor',
    function:
      'Eyelid elevation (levator palpebrae), most eye movements (superior, inferior, medial rectus; inferior oblique), pupil constriction and lens accommodation',
    testMethod:
      'H-pattern EOM test — ask patient to follow your finger without moving head. Pupillary light reflex — shine penlight, check direct and consensual response (PERRLA).',
    abnormalFinding:
      'Ptosis (drooping eyelid), dilated fixed pupil ("blown pupil"), eye deviated down and out. CN III palsy = ptosis + mydriasis + down-and-out gaze.',
  },
  {
    number: 4,
    name: 'Trochlear',
    type: 'Motor',
    function: 'Downward and inward eye movement — innervates superior oblique muscle',
    testMethod:
      'H-pattern EOM test — look specifically for deficit when patient looks down and in (e.g., reading or going down stairs).',
    abnormalFinding:
      'Vertical diplopia on downward gaze. Patient often tilts head away from affected side to compensate. Most commonly injured CN in head trauma.',
  },
  {
    number: 5,
    name: 'Trigeminal',
    type: 'Both',
    function:
      'Facial sensation (3 divisions: V1 ophthalmic — forehead; V2 maxillary — cheek; V3 mandibular — jaw). Motor: mastication (masseter, temporalis muscles).',
    testMethod:
      'Sensory: Touch forehead, cheek, and jaw with cotton wisp — compare sides. Corneal reflex (afferent limb). Motor: Ask patient to clench teeth; palpate masseter and temporalis.',
    abnormalFinding:
      'Facial numbness in one or more divisions; loss of corneal reflex (afferent limb — CN VII is efferent); jaw weakness or deviation toward affected side. Trigeminal neuralgia = severe episodic facial pain.',
  },
  {
    number: 6,
    name: 'Abducens',
    type: 'Motor',
    function: 'Lateral gaze — innervates lateral rectus muscle',
    testMethod:
      'H-pattern EOM test — look for inability to move eye laterally. Most commonly affected CN in increased intracranial pressure.',
    abnormalFinding:
      'Cannot abduct eye; eye deviates medially at rest. Diplopia on lateral gaze to affected side. CN VI palsy is a non-localizing sign in elevated ICP.',
  },
  {
    number: 7,
    name: 'Facial',
    type: 'Both',
    function:
      'Motor: facial expression muscles. Sensory: taste anterior 2/3 of tongue; sensation to external ear. Autonomic: lacrimation and salivation.',
    testMethod:
      'Ask patient to raise eyebrows, close eyes tightly (resist your attempt to open), smile showing teeth, and puff out cheeks. Observe for asymmetry.',
    abnormalFinding:
      'Bell\'s palsy (LMN lesion) — unilateral paralysis including forehead (cannot wrinkle brow). Central (UMN) lesion — forehead spared because it has bilateral cortical representation. Asymmetric smile.',
  },
  {
    number: 8,
    name: 'Vestibulocochlear',
    type: 'Sensory',
    function: 'Hearing (cochlear division) and balance/equilibrium (vestibular division)',
    testMethod:
      'Whisper test for gross hearing (2 feet away, occlude opposite ear). Rinne test: tuning fork on mastoid then near ear canal (AC > BC = normal). Weber test: tuning fork on forehead (should lateralize to midline).',
    abnormalFinding:
      'Sensorineural loss: Rinne AC > BC but reduced; Weber lateralizes AWAY from affected ear. Conductive loss: Rinne BC > AC; Weber lateralizes TOWARD affected ear. Tinnitus, vertigo, nystagmus with vestibular lesions.',
  },
  {
    number: 9,
    name: 'Glossopharyngeal',
    type: 'Both',
    function:
      'Sensory: pharynx, posterior tongue (taste), carotid body/sinus. Motor: stylopharyngeus (pharyngeal elevation). Autonomic: parotid gland.',
    testMethod:
      'Gag reflex (tested together with CN X — CN IX is afferent, CN X is efferent). Taste on posterior 1/3 of tongue. Assess swallowing.',
    abnormalFinding:
      'Absent gag reflex; difficulty swallowing; loss of taste on posterior tongue. CN IX and X are almost always tested and injured together.',
  },
  {
    number: 10,
    name: 'Vagus',
    type: 'Both',
    function:
      'Motor: soft palate, pharynx, larynx (voice). Sensory: pharynx, larynx, thoracic and abdominal viscera. Autonomic: parasympathetic to thorax and abdomen (heart rate, digestion).',
    testMethod:
      'Ask patient to say \'ahh\' — observe uvula rise midline and palate elevate symmetrically. Assess voice quality (hoarseness = possible CN X lesion). Gag reflex (efferent limb).',
    abnormalFinding:
      'Uvula deviates AWAY from side of lesion. Hoarseness or aphonia (vocal cord paralysis). Dysphagia. Unilateral soft palate droop toward affected side.',
  },
  {
    number: 11,
    name: 'Accessory',
    type: 'Motor',
    function:
      'Sternocleidomastoid muscle (head rotation to opposite side) and trapezius muscle (shoulder elevation and scapular rotation)',
    testMethod:
      'Shoulder shrug against resistance — hands on shoulders, patient shrugs up while you push down (trapezius). Head rotation against resistance — patient turns head against your hand (SCM).',
    abnormalFinding:
      'Weakness or inability to shrug shoulder on affected side; shoulder drop. Weakness turning head away from affected side. SCM atrophy visible on inspection.',
  },
  {
    number: 12,
    name: 'Hypoglossal',
    type: 'Motor',
    function: 'All intrinsic and most extrinsic tongue muscles — tongue movement and protrusion',
    testMethod:
      'Ask patient to protrude tongue — observe for deviation. Ask patient to move tongue rapidly side to side and push tongue into cheek against your finger resistance.',
    abnormalFinding:
      'Tongue deviates TOWARD the side of the lesion (lower motor neuron). With UMN lesion, tongue deviates away from lesion. Atrophy and fasciculations with LMN lesions.',
  },
];
