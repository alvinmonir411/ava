export interface GoogleReview {
  id: string;
  author_name: string;
  author_badge?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  original_language?: string;
  category: string;
  highlight?: string;
  owner_response?: {
    text: string;
    relative_time_description: string;
  };
  verified: boolean;
}

export const GOOGLE_REVIEWS_META = {
  business_name: 'LWCCO Messrs. Low Wah Chin & Co. Advocates & Solicitors (Virtual Office)',
  rating: 5.0,
  total_reviews: 34,
  address: 'Level 1, Colony Coworking Space - KLCC, 6, Jalan Kia Peng, Kuala Lumpur, 50450 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia',
  review_url: 'https://share.google/4f6BOdPxefdpTafG3',
  google_maps_url: 'https://share.google/4f6BOdPxefdpTafG3',
  categories: [
    'All Reviews',
    'Visa Application & Immigration',
    'Wills & Estate Distribution',
    'Accident & Personal Injury',
    'Commercial & Letter Writing',
    'Fraud & Legal Advice',
    'Bilingual / Chinese Counsel'
  ]
};

export const GOOGLE_REVIEWS_DATA: GoogleReview[] = [
  {
    id: 'rev-1',
    author_name: 'Rachel Yap',
    author_badge: '4 reviews',
    rating: 5,
    relative_time_description: '3 months ago',
    text: 'Ms Ava Rachel Low is responsive, dedicated, overprepared mindset, articulated matters in detailed. She provided solutions in different options regardless of the complexity. She is honest and transparent about cost.',
    category: 'Commercial & Letter Writing',
    highlight: 'Responsive, dedicated, overprepared mindset & transparent about cost',
    verified: true
  },
  {
    id: 'rev-2',
    author_name: 'Robow Hassan',
    author_badge: '2 reviews',
    rating: 5,
    relative_time_description: '4 months ago',
    text: 'I thank you so immensely for give me good legal advise on the fraud that has happened to me counsel Eva, its pleasure speaking with you for free legal counsel, without any charges, your advise will assist many people who are facing similar issues.',
    category: 'Fraud & Legal Advice',
    highlight: 'Good legal advice on fraud & immense assistance',
    verified: true
  },
  {
    id: 'rev-3',
    author_name: 'Brian Oscar',
    author_badge: '2 reviews',
    rating: 5,
    relative_time_description: '10 months ago',
    text: 'I had a very difficult situation as an international student dealing with Visa issues, but she was very helpful, articulate and hospitable to me when I first contacted her. She was able to resolve the issue in almost an hour of her working on it.',
    category: 'Visa Application & Immigration',
    highlight: 'Resolved difficult international student Visa issue in almost an hour',
    verified: true
  },
  {
    id: 'rev-4',
    author_name: 'Andy Andy',
    author_badge: '1 review',
    rating: 5,
    relative_time_description: 'a year ago',
    text: 'I called to speak to Ava Rachel Low at LWCCO Low Wah Chin & Co. about a legal requirement I had. Straight away she returned my call and was incredibly knowledgeable, resourceful, proactive and helpful right from the start.',
    category: 'Commercial & Letter Writing',
    highlight: 'Incredibly knowledgeable, resourceful, proactive and helpful',
    verified: true
  },
  {
    id: 'rev-5',
    author_name: 'Blue Girl',
    author_badge: '1 review',
    rating: 5,
    relative_time_description: '9 months ago',
    text: 'Ava Rachel Low is a helpful solicitor and gives me good advice to peace my mind. I am grateful to have found her.',
    category: 'Fraud & Legal Advice',
    highlight: 'Helpful solicitor giving peace of mind',
    verified: true
  },
  {
    id: 'rev-6',
    author_name: 'Max Rho',
    author_badge: '1 review',
    rating: 5,
    relative_time_description: '4 months ago',
    text: 'Miss Rachel is helpful and knowledgeable, she will advise you the cheapest and better way to resolve your issue! Thumbs up 👍🏻👍🏻',
    category: 'Commercial & Letter Writing',
    highlight: 'Advised the best and most cost-effective way to resolve the issue',
    verified: true
  },
  {
    id: 'rev-7',
    author_name: 'Chrisna Tanos',
    author_badge: '10 reviews · 4 photos',
    rating: 5,
    relative_time_description: '2 years ago',
    text: 'Ava Rachel Low is a very nice and professional solicitor. She assisted me with my visa application issues in good writing and explanation of the legal settings. Many thanks to her fast and efficient service.',
    category: 'Visa Application & Immigration',
    highlight: 'Assisted with visa application issues with good legal drafting and fast service',
    owner_response: {
      text: 'Thank you',
      relative_time_description: 'a year ago'
    },
    verified: true
  },
  {
    id: 'rev-8',
    author_name: 'Jillian',
    author_badge: '8 reviews',
    rating: 5,
    relative_time_description: '2 years ago',
    text: 'Absolutely wonderful to work with. Extremely intelligent, knowledgeable and resourceful. Fluent in English, comprehended the LAWS in Australia, consolidated and refined all aspects of a very complex case that involved 3 Wills, provided me with exceptional legal clarity.',
    category: 'Wills & Estate Distribution',
    highlight: 'Consolidated & refined a very complex multi-jurisdiction case involving 3 Wills',
    owner_response: {
      text: 'Thank you Jillian. I am very much humbled.',
      relative_time_description: '2 years ago'
    },
    verified: true
  },
  {
    id: 'rev-9',
    author_name: 'Jerry Ho',
    author_badge: '11 reviews · 3 photos',
    rating: 5,
    relative_time_description: '4 years ago',
    text: 'Very responsive, also able to provide some professional opinion & advise based on your briefing before asking payment from you. After taking their service, the lawyer also will investigate your case together thoroughly.',
    category: 'Accident & Personal Injury',
    highlight: 'Won accident case through thorough investigation and professional advocacy',
    owner_response: {
      text: 'Thank you for your review. Congratulations on your victory with your accident case.',
      relative_time_description: '3 years ago'
    },
    verified: true
  },
  {
    id: 'rev-10',
    author_name: 'Ryan Rogers',
    author_badge: '4 reviews',
    rating: 5,
    relative_time_description: '3 years ago',
    text: 'Very responsive, also able to provide some professional opinions & advice. Charges are very reasonable.',
    category: 'Commercial & Letter Writing',
    highlight: 'Very responsive, professional opinion & reasonable charges',
    owner_response: {
      text: 'Thank you Ryan. Wish you all a new start with your life. All the best.',
      relative_time_description: '3 years ago'
    },
    verified: true
  },
  {
    id: 'rev-11',
    author_name: 'msluxem',
    author_badge: '7 reviews · 1 photo',
    rating: 5,
    relative_time_description: 'a year ago',
    text: 'Rachel is very responsible, knowledgeable lawyer that knows what she is doing! Fight all in for their client and do not hesitate their job and pass to the juniors.',
    category: 'Fraud & Legal Advice',
    highlight: 'Fights all-in for clients and personally handles the matter directly without delegating away',
    owner_response: {
      text: 'Thank you',
      relative_time_description: 'a year ago'
    },
    verified: true
  },
  {
    id: 'rev-12',
    author_name: 'พิมพ์ พลอย (Pim Ploy)',
    author_badge: '2 reviews',
    rating: 5,
    relative_time_description: '11 months ago',
    text: 'She gave good advice, my case was an emergency but she accommodated me on time, and she helped me with everything she could. I am truly appreciative.',
    category: 'Fraud & Legal Advice',
    highlight: 'Accommodated emergency consultation on short notice with full dedication',
    verified: true
  },
  {
    id: 'rev-13',
    author_name: 'Juey Fang',
    author_badge: 'Local Guide · 14 reviews · 8 photos',
    rating: 5,
    relative_time_description: '2 years ago',
    text: 'My company has faced issue and Miss Low has taken instant action to helped us solving the problem. Very appreciate her fast respond and professional in writing the letter for us. Do not hesitate to look for Miss Low if you are facing any legal problem.',
    category: 'Commercial & Letter Writing',
    highlight: 'Instant corporate letter drafting and dispute resolution for company issue',
    owner_response: {
      text: 'Thank you Juey Fang for your review. Thank you for giving me the opportunity to serve you.',
      relative_time_description: '2 years ago'
    },
    verified: true
  },
  {
    id: 'rev-14',
    author_name: 'Yee Teng Law',
    author_badge: '2 reviews · 1 photo',
    rating: 5,
    relative_time_description: '11 months ago',
    text: 'Rachel is a very good lawyer who has helped me a lot and solved many of my problems.',
    category: 'Fraud & Legal Advice',
    highlight: 'Solved complex problems with dedication',
    owner_response: {
      text: 'Thank you Yee Teng. All the best in life! Best wishes for you that you will excel in all your future endeavours.',
      relative_time_description: '11 months ago'
    },
    verified: true
  },
  {
    id: 'rev-15',
    author_name: 'The Colour Beige Personified',
    author_badge: 'Local Guide · 9 reviews',
    rating: 5,
    relative_time_description: '2 years ago',
    text: 'Rachel is a warm and friendly lawyer who does her work professionally and goes the extra mile to help her clients with their enquiries whenever she can!',
    category: 'Fraud & Legal Advice',
    highlight: 'Warm, professional, and goes the extra mile',
    owner_response: {
      text: 'Thank you.',
      relative_time_description: '2 years ago'
    },
    verified: true
  },
  {
    id: 'rev-16',
    author_name: 'Jen Low',
    author_badge: '3 reviews · 1 photo',
    rating: 5,
    relative_time_description: '2 years ago',
    text: 'Thanks a lot. Ms. Low is a Professional Lawyer, providing great service and thorough information about my case.',
    original_language: 'Chinese (Translated)',
    category: 'Bilingual / Chinese Counsel',
    highlight: 'Professional service and comprehensive case analysis',
    owner_response: {
      text: 'Thank you.',
      relative_time_description: '2 years ago'
    },
    verified: true
  },
  {
    id: 'rev-17',
    author_name: 'Sow Shian',
    author_badge: '4 reviews · 3 photos',
    rating: 5,
    relative_time_description: '2 years ago',
    text: 'Lawyer Low is very professional in explaining all consultations, and she also is very patient.',
    category: 'Fraud & Legal Advice',
    highlight: 'Exceptional patience and clarity in explaining legal consultations',
    owner_response: {
      text: 'Thank you',
      relative_time_description: 'a year ago'
    },
    verified: true
  },
  {
    id: 'rev-18',
    author_name: 'Jozsef Kocsis',
    author_badge: '5 reviews',
    rating: 5,
    relative_time_description: '10 months ago',
    text: 'An accommodating, trusted and well-serviced lawyer.',
    category: 'Fraud & Legal Advice',
    highlight: 'Accommodating, trusted, and high quality service',
    verified: true
  },
  {
    id: 'rev-19',
    author_name: 'Jefferson Chia',
    author_badge: '1 review',
    rating: 5,
    relative_time_description: '2 years ago',
    text: 'She’s very friendly and professional.',
    category: 'Commercial & Letter Writing',
    highlight: 'Friendly and highly professional',
    owner_response: {
      text: "Thank you Jefferson. He's a nice and dedicated person too. Always strive to help the community. Salute👍",
      relative_time_description: '2 years ago'
    },
    verified: true
  },
  {
    id: 'rev-20',
    author_name: 'Shunbin Wong',
    author_badge: '5 reviews · 1 photo',
    rating: 5,
    relative_time_description: '4 years ago',
    text: 'Helpful and kindly handled my case.',
    category: 'Fraud & Legal Advice',
    highlight: 'Kind and diligent case handling',
    owner_response: {
      text: 'Thank you.',
      relative_time_description: '3 years ago'
    },
    verified: true
  },
  {
    id: 'rev-21',
    author_name: 'Lau Ken Seang',
    author_badge: '1 review',
    rating: 5,
    relative_time_description: '3 years ago',
    text: 'Good lawyer!! Highly competent and dependable.',
    category: 'Fraud & Legal Advice',
    highlight: 'Dependable and dedicated legal service',
    owner_response: {
      text: 'Thank you Mr. Lau.',
      relative_time_description: '3 years ago'
    },
    verified: true
  },
  {
    id: 'rev-22',
    author_name: '风行资本 (Wind Capital)',
    author_badge: '3 reviews · 1 photo',
    rating: 5,
    relative_time_description: 'a year ago',
    text: "Coming from China, I'm delighted to have found this lawyer. She's a Chinese-speaking lawyer! This lawyer possesses profound legal expertise, excels at identifying key elements in complex cases, and handles matters with extreme care and caution.",
    original_language: 'Chinese (Translated)',
    category: 'Bilingual / Chinese Counsel',
    highlight: 'Profound legal expertise and multilingual Chinese consultation for cross-border clients',
    verified: true
  },
  {
    id: 'rev-23',
    author_name: 'Michael Chai',
    author_badge: 'Local Guide · 30 reviews · 43 photos',
    rating: 5,
    relative_time_description: '2 years ago',
    text: 'The service was fantastic! Very professional, attentive, patient, and friendly. A highly recommended lawyer!',
    original_language: 'Chinese (Translated)',
    category: 'Bilingual / Chinese Counsel',
    highlight: 'Fantastic service, attentive, patient, and highly recommended',
    owner_response: {
      text: 'Thank you Michael.',
      relative_time_description: '2 years ago'
    },
    verified: true
  },
  {
    id: 'rev-24',
    author_name: 'Alex Alex',
    author_badge: '2 reviews',
    rating: 5,
    relative_time_description: 'a year ago',
    text: "The service was excellent and very professional; it's rare to find a lawyer like this. Wishing you all your dreams come true, everything goes smoothly, and all your wishes come true!",
    original_language: 'Chinese (Translated)',
    category: 'Bilingual / Chinese Counsel',
    highlight: 'Rare level of professionalism and excellent client care',
    verified: true
  },
  {
    id: 'rev-25',
    author_name: 'Rachel W',
    author_badge: 'Local Guide · 36 reviews · 9 photos',
    rating: 5,
    relative_time_description: 'a year ago',
    text: 'Highly professional with exceptional ethics, they avoid misleading clients. While analyzing the case, they patiently explain and propose the best solution for the client.',
    original_language: 'Chinese (Translated)',
    category: 'Bilingual / Chinese Counsel',
    highlight: 'Exceptional ethics, honest case analysis, and best tailored solutions',
    owner_response: {
      text: 'Thank you.',
      relative_time_description: 'a year ago'
    },
    verified: true
  },
  {
    id: 'rev-26',
    author_name: 'Alan Andy',
    author_badge: '1 review',
    rating: 5,
    relative_time_description: 'a year ago',
    text: "She's a very professional and dedicated lawyer! She's always responsive and patiently answers all my questions! She's solved so many of my problems!",
    original_language: 'Chinese (Translated)',
    category: 'Bilingual / Chinese Counsel',
    highlight: 'Always responsive, dedicated, and solved numerous legal problems',
    owner_response: {
      text: 'Thank you, Andy. I am deeply grateful.',
      relative_time_description: 'a year ago'
    },
    verified: true
  },
  {
    id: 'rev-27',
    author_name: 'AIN DIANA',
    author_badge: '5 reviews',
    rating: 5,
    relative_time_description: '2 years ago',
    text: 'The best lawyer service.. Always follow up cases with clients as best as possible.. Very polite lawyer with clients..❣️',
    original_language: 'Indonesian (Translated)',
    category: 'Fraud & Legal Advice',
    highlight: 'Diligent case follow-up and utmost politeness',
    owner_response: {
      text: 'Thank you Puan Ain',
      relative_time_description: '2 years ago'
    },
    verified: true
  },
  {
    id: 'rev-28',
    author_name: 'Kk Chye',
    author_badge: '1 review',
    rating: 5,
    relative_time_description: 'a year ago',
    text: 'She is a good lawyer who provides excellent service, is professional, patient, and analytical.',
    original_language: 'Chinese (Translated)',
    category: 'Bilingual / Chinese Counsel',
    highlight: 'Professional, patient, and sharp analytical mind',
    owner_response: {
      text: 'Thank you Mr. Chye.',
      relative_time_description: 'a year ago'
    },
    verified: true
  },
  {
    id: 'rev-29',
    author_name: 'Pred Bih',
    author_badge: '2 reviews',
    rating: 5,
    relative_time_description: '3 years ago',
    text: 'I highly recommend the legal services of Low Wah Chin & Co because they are very professional, especially in terms of helping me in terms of advice in my case, congratulations on everything going smoothly, I give it 5 stars.',
    original_language: 'Malay (Translated)',
    category: 'Accident & Personal Injury',
    highlight: 'Highly recommended for smooth case resolution and expert advice',
    owner_response: {
      text: 'Thank you Pred',
      relative_time_description: '3 years ago'
    },
    verified: true
  }
];
