// ─── Glossary Data ──────────────────────────────────────────
// ~100+ looksmaxxing / aesthetics community terms
// Each term has a category, definition, and optional aliases for search

export type GlossaryCategory =
  | 'slang'
  | 'archetypes'
  | 'rating'
  | 'community'
  | 'lifestyle'
  | 'anatomy'
  | 'culture';

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: GlossaryCategory;
  aliases?: string[];
}

export interface GlossaryCategoryMeta {
  key: GlossaryCategory;
  label: string;
  icon: string;
  color: string;
}

export const GLOSSARY_CATEGORIES: GlossaryCategoryMeta[] = [
  { key: 'slang', label: 'Slang', icon: '\uD83D\uDCAC', color: '#3B82F6' },
  { key: 'archetypes', label: 'Archetypes', icon: '\uD83D\uDC64', color: '#A78BFA' },
  { key: 'rating', label: 'Rating Systems', icon: '\uD83D\uDCCA', color: '#F59E0B' },
  { key: 'community', label: 'Community', icon: '\uD83C\uDF10', color: '#EC4899' },
  { key: 'lifestyle', label: 'Lifestyle', icon: '\uD83D\uDCAA', color: '#22C55E' },
  { key: 'anatomy', label: 'Anatomy', icon: '\uD83E\uDDB4', color: '#EF4444' },
  { key: 'culture', label: 'Culture & Memes', icon: '\uD83C\uDFAD', color: '#F97316' },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ─── ARCHETYPES ────────────────────────────────────────────
  {
    id: 'alpha-male',
    term: 'Alpha (Male)',
    definition:
      'The opposite of a beta male. Refers to a man who is confident, takes on risk and confrontation, and naturally assumes a leadership role in social dynamics.',
    category: 'archetypes',
  },
  {
    id: 'beta-male',
    term: 'Beta (Male)',
    definition:
      'An unremarkable, risk-averse man who avoids confrontation. Beta males are perceived as lacking the physical presence, charisma, and confidence of the alpha male.',
    category: 'archetypes',
  },
  {
    id: 'becky',
    term: 'Becky',
    definition:
      'An average-looking female. The female equivalent of a Brad. Not considered unattractive, but not a Stacy either.',
    category: 'archetypes',
  },
  {
    id: 'brad',
    term: 'Brad',
    definition:
      'An average-looking male. The male equivalent of Becky. Above incel-tier but below Chad in the looks hierarchy.',
    category: 'archetypes',
  },
  {
    id: 'chad',
    term: 'Chad',
    definition:
      'The stereotypical alpha male archetype. Very attractive, masculine, confident, and socially dominant. Variations exist for different ethnic backgrounds: Tyrone, Chang, Chadpreet, Chaddam, etc.',
    category: 'archetypes',
    aliases: ['Tyrone', 'Chang', 'Jamaal', 'Chadpreet', 'Chaddam'],
  },
  {
    id: 'chadlet',
    term: 'Chadlet',
    definition:
      'A Chad who happens to be short (a manlet). Has Chad-tier facial aesthetics and physique but is held back by height.',
    category: 'archetypes',
    aliases: ['manlet chad'],
  },
  {
    id: 'chadlite',
    term: 'Chadlite',
    definition:
      'Someone who is almost a Chad but not quite. Ranked above a normie in the looks hierarchy but missing one or two features to reach full Chad status.',
    category: 'archetypes',
  },
  {
    id: 'normie',
    term: 'Normie',
    definition:
      'Anyone who falls between incel and Chad/Stacy on the looks scale. A regular, average person who is neither particularly attractive nor unattractive.',
    category: 'archetypes',
  },
  {
    id: 'stacy',
    term: 'Stacy',
    definition:
      'A very attractive, popular woman. The female counterpart to Chad. Considered the top tier of female attractiveness in the looks hierarchy.',
    category: 'archetypes',
    aliases: ['Stacie'],
  },

  // ─── SLANG ─────────────────────────────────────────────────
  {
    id: 'ascend',
    term: 'Ascend',
    definition:
      'When someone moves on from incel status by entering a relationship or finding a partner. Considered a positive outcome in the community.',
    category: 'slang',
  },
  {
    id: 'awalt',
    term: 'AWALT',
    definition:
      '"All Women Are Like That." An acronym used to generalize female behavior. Often used to dismiss individual differences among women.',
    category: 'slang',
    aliases: ['all women are like that'],
  },
  {
    id: 'amalt',
    term: 'AMALT',
    definition:
      '"All Men Are Like That." The femcel counterpart of AWALT. Used in femcel communities to generalize male behavior.',
    category: 'slang',
    aliases: ['all men are like that'],
  },
  {
    id: 'based',
    term: 'Based',
    definition:
      'When someone is focused on spreading what they believe to be the truth, without concern for how others might react. Used broadly across internet culture, not just in looksmaxxing.',
    category: 'slang',
  },
  {
    id: 'betabux',
    term: 'Betabux',
    definition:
      'A beta male who is primarily valued for his financial resources rather than his attractiveness. The theory suggests women settle for these men after their prime years for stability rather than attraction.',
    category: 'slang',
    aliases: ['beta bux', 'beta bucks'],
  },
  {
    id: 'babebux',
    term: 'Babebux',
    definition:
      'The femcel counterpart of Betabux. A beta female who is valued primarily for her financial resources in a relationship, financing her partner\'s lifestyle.',
    category: 'slang',
  },
  {
    id: 'btfo',
    term: 'BTFO',
    definition:
      '"Blown The Fuck Out." Used when a comment or event is demoralizing to a group or individual. Also used to describe someone who lost an argument badly.',
    category: 'slang',
    aliases: ['blown the fuck out'],
  },
  {
    id: 'cope',
    term: 'Cope',
    definition:
      'Anything someone does to deal with their situation. Can be used as a noun ("that\'s a cope") or to indicate disagreement with a stated point. Essentially calling something a delusion or rationalization.',
    category: 'slang',
    aliases: ['coping', 'copium'],
  },
  {
    id: 'cuck',
    term: 'Cuck',
    definition:
      'Originally referred to "cuckold." Now used as a general-purpose insult for anything the community dislikes. Used broadly across internet culture.',
    category: 'slang',
    aliases: ['cucked', 'cuckold'],
  },
  {
    id: 'fuel',
    term: '-fuel',
    definition:
      'A suffix meaning "motivation for something." Lifefuel means something positive or motivating. Suifuel means something so demoralizing it could push someone toward dark thoughts.',
    category: 'slang',
    aliases: ['lifefuel', 'ragefuel', 'suifuel'],
  },
  {
    id: 'gtfih',
    term: 'GTFIH',
    definition:
      '"Get The Fuck In Here." Used as a headline to draw attention to a post. Essentially means "you need to read this."',
    category: 'slang',
    aliases: ['get the fuck in here'],
  },
  {
    id: 'high-iq',
    term: 'High IQ',
    definition:
      'Used to indicate strong agreement with a previously stated point. The opposite of "Low IQ." Has nothing to do with actual intelligence.',
    category: 'slang',
  },
  {
    id: 'low-iq',
    term: 'Low IQ',
    definition:
      'Used to indicate strong disagreement with a previously stated point. The opposite of "High IQ." Has nothing to do with actual intelligence.',
    category: 'slang',
  },
  {
    id: 'its-over',
    term: "It's Over",
    definition:
      'A general greeting or statement of defeat in the community. The traditional response is "It never began." Used both seriously and as a meme.',
    category: 'slang',
    aliases: ['it never began'],
  },
  {
    id: 'jfl',
    term: 'JFL',
    definition:
      '"Just Fucking Lol." An expression of disbelief or mockery, similar to "you can\'t make this up."',
    category: 'slang',
    aliases: ['just fucking lol'],
  },
  {
    id: 'kek',
    term: 'KEK',
    definition:
      'An alternative form of "lol." Originated from World of Warcraft, where Horde players typing "lol" would appear as "kek" to Alliance players. Used broadly across internet culture.',
    category: 'slang',
  },
  {
    id: 'legit',
    term: 'Legit',
    definition:
      'Used to indicate agreement with a previously stated point. Similar to "High IQ" but less emphatic.',
    category: 'slang',
  },
  {
    id: 'mog',
    term: 'Mog',
    definition:
      'To overshadow or dominate someone, especially in personal aesthetic attributes. Often combined with a descriptor to form compounds like "heightmog," "jawmog," or "framemog." The core concept of this entire platform.',
    category: 'slang',
    aliases: ['mogged', 'mogging', 'mogger', 'heightmog', 'jawmog'],
  },
  {
    id: 'monkey-branching',
    term: 'Monkey Branching',
    definition:
      'When someone transitions from one relationship to the next without ever being single, often not letting go of the first partner until securing the next. The new partner is often disguised as "just a friend."',
    category: 'slang',
  },
  {
    id: 'npc',
    term: 'NPC',
    definition:
      '"Non-Player Character." Someone who repeats group ideas without original thought, like a scripted character in a video game. Used broadly across internet culture.',
    category: 'slang',
    aliases: ['non-player character'],
  },
  {
    id: 'reeee',
    term: 'Reeee',
    definition:
      'An onomatopoeic expression of intense rage or frustration, associated with the Angry Pepe meme. Meant to represent the croak produced by agitated frogs. Used broadly across internet culture.',
    category: 'slang',
  },
  {
    id: 'rope',
    term: 'Rope',
    definition:
      'A term referencing self-harm by hanging. Used in the community to express extreme despair. This is a harmful term that normalizes suicidal ideation. If you or someone you know is struggling, contact the 988 Suicide & Crisis Lifeline.',
    category: 'slang',
    aliases: ['sui'],
  },
  {
    id: 'sour-grapes',
    term: 'Sour Grapes',
    definition:
      'The rationalization that if you can\'t have something, it wasn\'t worth having anyway. From Aesop\'s fable. Used to call out cope.',
    category: 'slang',
  },
  {
    id: 'the-wall',
    term: 'The Wall',
    definition:
      'The concept that women lose their physical attractiveness as they age, particularly after their 20s. A controversial and reductive view that reduces women\'s worth to their youthful appearance.',
    category: 'slang',
  },
  {
    id: 'white-knight',
    term: 'White Knight',
    definition:
      'A male who excessively and performatively defends women online, often making an issue out of nothing. Exhibits "Nice Guy" behavior. Used broadly across internet culture.',
    category: 'slang',
  },
  {
    id: 'foid',
    term: 'Foid / Femoid',
    definition:
      'Abbreviated form of "female humanoid." A derogatory and dehumanizing term for women used primarily in incel communities.',
    category: 'slang',
    aliases: ['femoid', 'foid', 'hole', 'toilet'],
  },
  {
    id: 'moid',
    term: 'Moid',
    definition:
      'The femcel counterpart to foid. Short for "male humanoid." In femcel communities, it\'s often used more playfully as a mild insult rather than with the same level of hostility as foid.',
    category: 'slang',
  },
  {
    id: 'nice-guy',
    term: 'Nice Guy',
    definition:
      'A man who acts nice to women specifically to get romantic or sexual attention, then becomes resentful when it doesn\'t work. "Women go for assholes and ignore nice guys like me."',
    category: 'slang',
  },
  {
    id: 'numale',
    term: 'Nu-male',
    definition:
      'Men perceived as lacking masculinity and self-respect, who performatively support feminist causes online in hopes of social approval or romantic interest.',
    category: 'slang',
  },
  {
    id: 'oneitis',
    term: 'Oneitis',
    definition:
      'An obsessive fixation on one specific person as your "one true love," often unrequited. Used to describe unhealthy romantic attachment. Used broadly in dating communities, not just by incels.',
    category: 'slang',
  },
  {
    id: 'orbiter',
    term: 'Orbiter',
    definition:
      'A guy who hangs around a woman in a needy way, hoping to eventually get into a relationship with her. He "orbits" her social circle without ever making progress.',
    category: 'slang',
    aliases: ['beta orbiter'],
  },
  {
    id: 'roastie',
    term: 'Roastie',
    definition:
      'A derogatory term for a woman who has had multiple sexual partners. Combines body-shaming with slut-shaming. A harmful and degrading term.',
    category: 'slang',
  },
  {
    id: 'soy',
    term: 'Soy',
    definition:
      'Used to suggest someone is low-testosterone or lacking masculinity. Based on contested studies suggesting soy consumption might lower testosterone. "Soy face" refers to an open-mouth excited expression.',
    category: 'slang',
    aliases: ['soyboy', 'soyjak', 'soy face'],
  },
  {
    id: 'turbo',
    term: 'Turbo',
    definition:
      'A prefix meaning "extreme case." For example, turbomanlet (extremely short man) or turbochad (the most Chad possible).',
    category: 'slang',
    aliases: ['turbomanlet', 'turbochad'],
  },
  {
    id: 'wagecuck',
    term: 'Wagecuck',
    definition:
      'Someone who works a traditional job (a "wageslave") while not being in a relationship and having no prospects for one. Combines financial drudgery with romantic failure.',
    category: 'slang',
    aliases: ['wageslave', 'wagie'],
  },
  {
    id: 'jbw',
    term: 'JBW',
    definition:
      '"Just Be White." The theory that being white alone is enough to resolve dating difficulties, regardless of other attributes. A controversial oversimplification.',
    category: 'slang',
    aliases: ['just be white'],
  },
  {
    id: 'cock-carousel',
    term: 'Cock Carousel',
    definition:
      'A derogatory concept describing a period in a woman\'s life (typically ages 16-25) where she supposedly has many sexual partners. A reductive and misogynistic framework for viewing women\'s dating lives.',
    category: 'slang',
  },
  {
    id: 'fuckzoned',
    term: 'Fuckzoned',
    definition:
      'When a woman is used in a relationship solely for sex, similar to how "friendzoned" describes being valued only as a friend. The femcel equivalent of friendzoning.',
    category: 'slang',
  },
  {
    id: 'personality-detector',
    term: 'Personality Detector',
    definition:
      'A sarcastic term used to mock women who stay with abusive partners. The idea being their "personality detector" failed to warn them. Used to argue that personality matters less than looks.',
    category: 'slang',
  },
  {
    id: 'juggernaut-law',
    term: 'Juggernaut Law',
    definition:
      'A theory that conventionally unattractive women actually receive more male attention than very attractive women, because men assume beautiful women are out of their league or already taken.',
    category: 'slang',
  },

  // ─── COMMUNITY ─────────────────────────────────────────────
  {
    id: 'incel',
    term: 'Incel',
    definition:
      'Involuntary celibate. A person who is unable to find romantic or sexual partners despite wanting them. The term has evolved from a support community origin to being associated with hostile online subcultures.',
    category: 'community',
    aliases: ['inkwell'],
  },
  {
    id: 'femcel',
    term: 'Femcel',
    definition:
      'A female incel. A woman who cannot obtain commitment in the form of a long-term relationship. May or may not be able to get casual attention. Has its own distinct subculture and terminology.',
    category: 'community',
  },
  {
    id: 'volcel',
    term: 'Volcel',
    definition:
      'Voluntary celibate. Someone whose celibacy is by choice rather than circumstance. Used as an accusation: "fatcels are volcels" implies that overweight incels could ascend if they lost weight.',
    category: 'community',
  },
  {
    id: 'fakecel',
    term: 'Fakecel',
    definition:
      'Someone who claims to be an incel but isn\'t actually unattractive enough to qualify. Essentially incel gatekeeping \u2014 "you\'re not ugly enough to be one of us."',
    category: 'community',
  },
  {
    id: 'truecel',
    term: 'Truecel',
    definition:
      'The opposite of volcel and fakecel. Someone considered genuinely and irredeemably unattractive with no realistic path to finding a partner. The most extreme self-identification in incel communities.',
    category: 'community',
  },
  {
    id: 'cel-suffix',
    term: '-cel',
    definition:
      'A suffix denoting the specific reason someone is involuntarily celibate. Examples: heightcel (too short), ethniccel (ethnic background), mentalcel (mental health issues), wristcel (thin wrists).',
    category: 'community',
    aliases: ['heightcel', 'ethniccel', 'wristcel', 'mentalcel', 'currycel', 'ricecel'],
  },
  {
    id: 'escortcel',
    term: 'Escortcel',
    definition:
      'An incel who uses the services of sex workers to have sexual experiences. Considered by some in the community as not truly "ascending" since it\'s transactional.',
    category: 'community',
  },
  {
    id: 'gymcel',
    term: 'Gymcel',
    definition:
      'An incel who works out extensively, either as a cope or in an attempt to ascend. The implication is that no amount of muscle can compensate for facial aesthetics.',
    category: 'community',
  },
  {
    id: 'mentalcel',
    term: 'Mentalcel',
    definition:
      'Someone who is involuntarily celibate primarily due to mental health issues (anxiety, depression, autism, etc.) rather than physical appearance. Some argue mentalcels are actually volcels.',
    category: 'community',
  },
  {
    id: 'mgtow',
    term: 'MGTOW',
    definition:
      '"Men Going Their Own Way." A movement of men who believe women are toxic and choose to disengage from romantic relationships. While the principle isn\'t inherently toxic, the community often focuses on complaining about women.',
    category: 'community',
    aliases: ['men going their own way'],
  },
  {
    id: 'loveshy',
    term: 'LoveShy',
    definition:
      'One of the original incel communities. Started as a supportive group but gradually devolved into blaming women for members\' problems. Loose moderation helped the movement spiral into its current form.',
    category: 'community',
  },
  {
    id: 'khhv',
    term: 'KHHV',
    definition:
      '"Kissless, Handholdless, Hugless Virgin." The most extreme level of romantic inexperience. Used as a self-identifier to convey complete lack of intimate contact.',
    category: 'community',
    aliases: ['kv', 'kissless virgin'],
  },
  {
    id: 'neet',
    term: 'NEET',
    definition:
      '"Not in Education, Employment, or Training." Someone who is completely disengaged from productive activity. Not specific to incels but comes up frequently in these communities.',
    category: 'community',
  },
  {
    id: 'tfl',
    term: 'TFL',
    definition:
      '"True Forced Loneliness." An older term similar to incel, used by people who feel genuinely forced into isolation by circumstances beyond their control.',
    category: 'community',
    aliases: ['true forced loneliness'],
  },
  {
    id: 'wizard',
    term: 'Wizard',
    definition:
      'An incel who is still a virgin at age 30 or above. The joke being that maintaining virginity to 30 grants magical powers, originating from the "30-year-old wizard" meme.',
    category: 'community',
  },
  {
    id: 'nt',
    term: 'NT',
    definition:
      'Short for "neurotypical" \u2014 someone not on the autism spectrum. Being NT is considered an advantage in dating. Not unique to incels but used heavily in these spaces.',
    category: 'community',
    aliases: ['neurotypical'],
  },
  {
    id: 'it',
    term: 'IT',
    definition:
      'Refers to IncelTear (formerly IncelTears), a subreddit that mocks and critiques incel content. Sometimes derogatorily called "CuckTears" by incels.',
    category: 'community',
    aliases: ['IncelTear', 'IncelTears', 'CuckTears'],
  },
  {
    id: 'wmaf',
    term: 'WMAF',
    definition:
      '"White Male / Asian Female." Refers to interracial relationships between white men and Asian women, which are frequently discussed and debated in looksmaxxing communities.',
    category: 'community',
  },

  // ─── RATING SYSTEMS ────────────────────────────────────────
  {
    id: 'psl-scale',
    term: 'PSL Scale',
    definition:
      '"PUAHate/Sluthate/Lookism" Scale. A 1-10 rating system for physical attractiveness used by the lookism community. Considered more "objective" and harsher than mainstream ratings \u2014 a PSL 7 is essentially model-tier.',
    category: 'rating',
    aliases: ['PSL', 'psl rating'],
  },
  {
    id: 'smv',
    term: 'SMV',
    definition:
      '"Sexual Market Value." A numerical rating of someone\'s overall desirability as a partner, factoring in looks, status, wealth, and personality. Treats dating as an economic marketplace.',
    category: 'rating',
    aliases: ['sexual market value'],
  },
  {
    id: 'looksmatch',
    term: 'Looksmatch',
    definition:
      'Someone who is at a similar level of physical attractiveness. If you\'re a 6/10, your looksmatch is another 6/10. The idea that people should date within their attractiveness tier.',
    category: 'rating',
  },
  {
    id: 'pill-suffix',
    term: '-pill',
    definition:
      'A suffix for any "realization" or ideology in the community. Racepill (race determines dating success), agepill (getting older is a death sentence), heightpill (height is everything), etc.',
    category: 'rating',
    aliases: ['pilled', 'racepill', 'agepill', 'heightpill', 'dogpill'],
  },

  // ─── ANATOMY & FEATURES ────────────────────────────────────
  {
    id: 'canthal-tilt',
    term: 'Canthal Tilt',
    definition:
      'The angle of the outer corner of the eye relative to the inner corner. Positive canthal tilt (outer corner higher) is considered attractive and masculine. Negative canthal tilt (outer corner lower) is considered a flaw.',
    category: 'anatomy',
    aliases: ['PCT', 'NCT', 'positive canthal tilt', 'negative canthal tilt'],
  },
  {
    id: 'hunter-eyes',
    term: 'Hunter Eyes',
    definition:
      'Squinty, hooded eyes with a positive canthal tilt and deep-set appearance. Considered the ideal eye shape for men. Think Sean O\'Pry or Francisco Lachowski. The opposite is "prey eyes."',
    category: 'anatomy',
    aliases: ['prey eyes'],
  },
  {
    id: 'fwhr',
    term: 'FWHR',
    definition:
      '"Face Width-to-Height Ratio." A measurement believed to indicate masculinity and dominance. A higher ratio is considered more attractive in men. Part of the obsessive facial analysis culture.',
    category: 'anatomy',
    aliases: ['face width height ratio'],
  },
  {
    id: 'norwood',
    term: 'Norwood / NW',
    definition:
      'The Norwood scale measures male pattern baldness from NW1 (full head of hair) to NW7 (extensive baldness). Used in lookism communities as a key metric. "Norwooding" means losing hair.',
    category: 'anatomy',
    aliases: ['NW', 'norwooding', 'Norwood scale', 'norwoodcel'],
  },
  {
    id: 'manlet',
    term: 'Manlet',
    definition:
      'A short man. The exact height threshold varies by community, but generally refers to men under 5\'8" (173cm). Height is considered one of the most important factors in the lookism hierarchy.',
    category: 'anatomy',
    aliases: ['manlets', 'heightcel'],
  },
  {
    id: 'lanklet',
    term: 'Lanklet',
    definition:
      'A tall but very skinny man, considered unattractive due to lack of frame and muscle mass. Height without frame is seen as a disadvantage.',
    category: 'anatomy',
  },
  {
    id: 'tallfag',
    term: 'Tallfag',
    definition:
      'A tall man, often used derogatorily by shorter men in the community. Being tall is considered a significant advantage in the looks hierarchy.',
    category: 'anatomy',
  },
  {
    id: 'landwhale',
    term: 'Landwhale',
    definition:
      'A derogatory term for an overweight woman. Incels often have extremely narrow definitions of what constitutes "overweight." Used broadly across toxic internet spaces.',
    category: 'anatomy',
  },

  // ─── LIFESTYLE & STRATEGIES ────────────────────────────────
  {
    id: 'maxx',
    term: '-maxx / -maxxing',
    definition:
      'A suffix meaning to maximize or improve something to its fullest extent. Looksmaxxing (maximizing appearance), gymmaxxing (maximizing fitness), moneymaxxing (maximizing wealth), statusmaxxing, etc.',
    category: 'lifestyle',
    aliases: ['looksmaxxing', 'gymmaxxing', 'moneymaxxing', 'statusmaxxing', 'softmaxxing', 'hardmaxxing'],
  },
  {
    id: 'ldar',
    term: 'LDAR',
    definition:
      '"Lay Down And Rot." Giving up completely on self-improvement and life goals. An expression of total resignation and hopelessness.',
    category: 'lifestyle',
    aliases: ['lay down and rot', 'rotting'],
  },
  {
    id: 'lowinhibmaxx',
    term: 'Lowinhibmaxx',
    definition:
      'The effort to become less inhibited and more socially confident. Involves methods like NoFap, cold approaches, or anything to increase boldness when interacting with others.',
    category: 'lifestyle',
  },
  {
    id: 'seamaxx',
    term: 'SEAmaxx',
    definition:
      'The practice of traveling to South East Asia to improve dating prospects. Based on the theory that being Western, taller, or wealthier relative to the local population confers a significant advantage.',
    category: 'lifestyle',
    aliases: ['SEA maxxing', 'geomaxxing'],
  },
  {
    id: 'inhibition',
    term: 'Inhibition (Inhib)',
    definition:
      'Low inhibition ("low inhib") means not caring what others think, projecting confidence. High inhibition ("high inhib") means being passive and constrained by concern about others\' opinions. Low inhib is considered alpha.',
    category: 'lifestyle',
    aliases: ['low inhib', 'high inhib'],
  },

  // ─── CULTURE & PHILOSOPHY ──────────────────────────────────
  {
    id: 'blackpill',
    term: 'Blackpill',
    definition:
      'The core incel philosophy. The belief that physical appearance almost entirely determines romantic and social success, and that personality, self-improvement, and effort are largely irrelevant. A fatalistic worldview.',
    category: 'culture',
  },
  {
    id: 'bluepill',
    term: 'Bluepill',
    definition:
      'Used to describe someone who is "blissfully and willfully ignorant" about the supposed truths of dating dynamics and lookism. From The Matrix. Believing that personality and kindness matter more than looks.',
    category: 'culture',
  },
  {
    id: 'redpill',
    term: 'Redpill',
    definition:
      'A "difficult truth that can\'t be unlearned." A less extreme version of the blackpill. Generally refers to accepting uncomfortable realities about dating dynamics, gender relations, and social hierarchies. Used broadly beyond incel communities.',
    category: 'culture',
  },
  {
    id: 'pinkpill',
    term: 'Pinkpill',
    definition:
      'The femcel brand of philosophy. Focuses on the lookism and beauty standards that women face, and the societal pressure to conform to impossible aesthetic ideals. Used by women who are not necessarily femcels.',
    category: 'culture',
  },
  {
    id: 'st-blackops2cel',
    term: 'St. Blackops2cel',
    definition:
      'A random person from a gaming forum whose photo became a sort of ironic religious icon in incel communities due to his unconventional appearance. "Saint" status in the incel pantheon.',
    category: 'culture',
  },
  {
    id: 'elliot-rodger',
    term: 'Elliot Rodger (ER)',
    definition:
      'A perpetrator of a 2014 mass killing in Isla Vista, California, motivated by resentment toward women. His manifesto became foundational text in toxic incel communities. "Going ER" is used to reference mass violence. This glorification of violence is dangerous and condemned.',
    category: 'culture',
    aliases: ['ER', 'supreme gentleman'],
  },
  {
    id: 'personality',
    term: 'Personality (meme)',
    definition:
      'Used ironically in incel spaces. The community believes "personality" is a euphemism used by mainstream society for physical attractiveness and social status. "Just have a good personality, bro" is used sarcastically.',
    category: 'culture',
  },
  {
    id: 'agecuck',
    term: 'Agecuck',
    definition:
      'A term used in certain extreme communities to describe someone who is against pedophilia. The fact that opposing child exploitation is framed negatively reveals how dangerous some corners of these communities have become.',
    category: 'culture',
  },
  {
    id: 'jb',
    term: 'JB',
    definition:
      '"Jailbait." Refers to underage individuals discussed in a sexual context. Some in the community use coded language like "jumping bananas" to avoid detection. This content is illegal and predatory.',
    category: 'culture',
    aliases: ['jailbait', 'jumping bananas'],
  },
  {
    id: 'loli',
    term: 'Loli',
    definition:
      'A term from anime culture referring to young-looking or underage female characters. Derives from "Lolita." When used in incel contexts, it often has deeply troubling implications regarding the sexualization of minors.',
    category: 'culture',
  },
  {
    id: 'sergeant-incel',
    term: 'SergeantIncel',
    definition:
      'The creator and owner of the largest incel forum, incels.is. Real name Diego Joaquin Galante, based in Montevideo, Uruguay. Also runs other controversial forums. A central figure in the organized incel movement.',
    category: 'culture',
  },
  {
    id: 'noodlewhore',
    term: 'Noodlewhore',
    definition:
      'A derogatory and racist term for Asian women. Reflects the intersection of misogyny and racism prevalent in some corners of the lookism community.',
    category: 'culture',
    aliases: ['curry-', 'rice-'],
  },

  // ─── ADDITIONAL TERMS ──────────────────────────────────────
  {
    id: 'mogger-term',
    term: 'Mogger',
    definition:
      'Someone who consistently mogs (dominates) others in terms of appearance. A person so good-looking they make everyone around them look worse by comparison. Also an archetype on this very platform.',
    category: 'archetypes',
  },
  {
    id: 'psl-god',
    term: 'PSL God',
    definition:
      'Someone who scores extremely high on the PSL scale (8+/10). Essentially a person with near-perfect facial aesthetics by lookism standards. Model-tier or above. An archetype on this platform.',
    category: 'archetypes',
    aliases: ['PSL god tier'],
  },
  {
    id: 'pretty-boy',
    term: 'Pretty Boy',
    definition:
      'A male archetype characterized by soft, symmetrical, conventionally beautiful facial features rather than rugged masculinity. Think young Leonardo DiCaprio or Francisco Lachowski. An archetype on this platform.',
    category: 'archetypes',
  },
  {
    id: 'giga-chad',
    term: 'Giga Chad',
    definition:
      'The ultimate Chad. Originally refers to Ernest Khalimov, a model whose hyper-masculine, almost surreal jawline photos became a viral meme. Now used to describe anyone at the absolute peak of masculine aesthetics.',
    category: 'archetypes',
    aliases: ['gigachad', 'Ernest Khalimov'],
  },
];
