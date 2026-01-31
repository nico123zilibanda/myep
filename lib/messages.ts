
export type MessageKey = keyof typeof messages;

export const messages = {
  // ================= AUTH =================
  AUTH_REGISTER_SUCCESS: "Usajili umefanikiwa 🎉 Karibu kwenye mfumo.",
  AUTH_REGISTER_FAILED: "Usajili haukufanikiwa. Tafadhali jaribu tena.",
  AUTH_REGISTER_EMAIL_EXISTS: "Email hii tayari imesajiliwa.",

  AUTH_LOGIN_SUCCESS: "Umefanikiwa kuingia kwenye mfumo.",
  AUTH_LOGIN_FAILED: "Email au nenosiri sio sahihi.",
  AUTH_LOGIN_BLOCKED: "Akaunti yako haijawashwa. Tafadhali wasiliana na msimamizi.",

  AUTH_LOGOUT_SUCCESS: "Umetoka kwenye mfumo salama.",

  // ================= CATEGORY =================
  CATEGORY_CREATE_SUCCESS: "Category imeongezwa kwa mafanikio.",
  CATEGORY_UPDATE_SUCCESS: "Category imehaririwa kwa mafanikio.",
  CATEGORY_DELETE_SUCCESS: "Category imefutwa kwa mafanikio.",
  CATEGORY_FAILED_DELETED: "Category haijafutwa kwa mafanikio.",
  CATEGORY_NOT_FOUND: "Category haijapatikana.",
  CATEGORY_FETCH_FAILED: "Imeshindikana kupata categories.",

    // ================= OPPORTUNITY =================
  OPPORTUNITY_CREATE_SUCCESS: "Fursa imeongezwa kwa mafanikio.",
  OPPORTUNITY_UPDATE_SUCCESS: "Fursa imehaririwa kwa mafanikio.",
  OPPORTUNITY_FAILED_DELETED: "Fursa haijafutwa kwa mafanikio.",
  OPPORTUNITY_DELETE_SUCCESS: "Fursa imefutwa kwa mafanikio.",
  OPPORTUNITY_NOT_FOUND: "Fursa haijapatikana.",
  OPPORTUNITY_FETCH_FAILED: "Imeshindikana kupata Fursa.",

    // ================= TRAINING =================
  TRAINING_CREATE_SUCCESS: "Funzo limeongezwa kwa mafanikio.",
  TRAINING_UPDATE_SUCCESS: "Funzo limehaririwa kwa mafanikio.",
  TRAINING_DELETE_SUCCESS: "Funzo limefutwa kwa mafanikio.",
  TRAINING_NOT_FOUND: "Funzo halijapatikana.",
  TRAINING_FETCH_FAILED: "Imeshindikana kupata Mafunzo.",

// ================= QUESTIONS =================
QUESTION_FETCH_SUCCESS: "Maswali yamepatikana.",
QUESTION_FETCH_FAILED: "Imeshindikana kupata maswali.",

QUESTION_CREATE_SUCCESS: "Swali lako limewasilishwa kikamilifu.",
QUESTION_CREATE_FAILED: "Imeshindikana kuwasilisha swali.",

QUESTION_UPDATE_SUCCESS: "Jibu limehifadhiwa kikamilifu.",
QUESTION_UPDATE_FAILED: "Imeshindikana kuhifadhi jibu.",

QUESTION_DELETE_SUCCESS: "Swali limefutwa kikamilifu.",
QUESTION_DELETE_FAILED: "Imeshindikana kufuta swali.",
        // ================= YOUTH =================
  YOUTH_CREATE_SUCCESS: "Kijana ameongezwa kwa mafanikio.",
  YOUTH_UPDATE_SUCCESS: "Kijana amehaririwa kwa mafanikio.",
  YOUTH_DELETE_SUCCESS: "Kijana amefutwa kwa mafanikio.",
  YOUTH_NOT_FOUND: "Kijana hajapatikana.",
  YOUTH_FETCH_FAILED: "Imeshindikana kupata vijana.",
  // ================= GENERIC =================
  ACTION_SUCCESS: "Kitendo kimefanikiwa.",
  ACTION_FAILED: "Kitendo hakijafanikiwa. Tafadhali jaribu tena.",
  UNAUTHORIZED: "Huna ruhusa ya kufanya kitendo hiki.",
  SERVER_ERROR: "Hitilafu ya mfumo. Tafadhali jaribu tena baadaye.",
} as const;
