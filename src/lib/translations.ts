export type Language = 'en' | 'ar';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  en: {
    // Auth Pages
    operatorId: "Operator ID (Email)",
    accessCode: "Access Code",
    verifyAccessCode: "Verify Access Code",
    operatorName: "Operator Name",
    factoryName: "Factory Name",
    establishUplink: "ESTABLISH UPLINK",
    verifying: "VERIFYING...",
    or: "OR",
    uplinkGoogle: "UPLINK VIA GOOGLE",
    unauthorizedAccess: "UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED",
    requestClearance: "REQUEST CLEARANCE (SIGN UP)",
    returnToLogin: "RETURN TO LOGIN TERMINAL",
    returnToLoginArrow: "← RETURN TO LOGIN TERMINAL",
    forgotAccessCode: "FORGOT ACCESS CODE?",
    
    // Forgot Password
    forgotPasswordTitle: "CREDENTIAL RECOVERY",
    forgotPasswordDesc: "Enter your registered operator ID to receive a secure password reset link.",
    resetEmailSent: "Recovery uplink established. Check your secure inbox for the reset link.",
    sendRecoveryLink: "SEND RECOVERY UPLINK",
    processing: "PROCESSING...",

    // Sidebar
    mainTerminal: "MAIN TERMINAL",
    analyticsEngine: "ANALYTICS ENGINE",
    storageVault: "STORAGE VAULT",
    plantFloor: "PLANT FLOOR",
    securityAudit: "SECURITY AUDIT",
    factoryStatistics: "FACTORY STATISTICS",
    qaSupport: "Q&A / SUPPORT",
    systemLogout: "SYSTEM LOGOUT",
    tier1Clearance: "Tier 1 Clearance",
    nodeLinkNominal: "NODE_LINK: NOMINAL",

    // Dashboard Header
    executeSearch: "EXECUTE SYSTEM SEARCH...",
    latency: "LATENCY: 14MS",

    // General
    aymaOs: "AYMA OS",
    plantOperator: "PLANT OPERATOR",
    registerClearance: "REGISTER CLEARANCE",
    requestSystemClearance: "Request System Clearance",
    authFailed: "AUTHENTICATION FAILED: Invalid credentials or unauthorized access.",
    googleFailed: "GOOGLE UPLINK FAILED",
    passwordMismatch: "ACCESS CODES DO NOT MATCH",
    registrationFailed: "REGISTRATION FAILED",
  },
  ar: {
    // Auth Pages
    operatorId: "معرف المشغل (البريد الإلكتروني)",
    accessCode: "رمز الوصول",
    verifyAccessCode: "تأكيد رمز الوصول",
    operatorName: "اسم المشغل",
    factoryName: "اسم المصنع",
    establishUplink: "تأسيس الاتصال",
    verifying: "جاري التحقق...",
    or: "أو",
    uplinkGoogle: "الدخول عبر جوجل",
    unauthorizedAccess: "يمنع منعاً باتاً الدخول غير المصرح به",
    requestClearance: "طلب تصريح (تسجيل حساب جديد)",
    returnToLogin: "العودة إلى شاشة تسجيل الدخول",
    returnToLoginArrow: "→ العودة إلى شاشة تسجيل الدخول",
    forgotAccessCode: "هل نسيت رمز الوصول؟",

    // Forgot Password
    forgotPasswordTitle: "استعادة بيانات الاعتماد",
    forgotPasswordDesc: "أدخل معرف المشغل المسجل الخاص بك لتلقي رابط آمن لإعادة تعيين كلمة المرور.",
    resetEmailSent: "تم إنشاء رابط الاستعادة. تحقق من صندوق الوارد الخاص بك.",
    sendRecoveryLink: "إرسال رابط الاستعادة",
    processing: "جاري المعالجة...",

    // Sidebar
    mainTerminal: "المحطة الرئيسية",
    analyticsEngine: "محرك التحليلات",
    storageVault: "خزنة البيانات",
    plantFloor: "أرضية المصنع",
    securityAudit: "التدقيق الأمني",
    factoryStatistics: "إحصائيات المصنع",
    qaSupport: "الدعم والأسئلة الشائعة",
    systemLogout: "تسجيل الخروج من النظام",
    tier1Clearance: "تصريح من المستوى الأول",
    nodeLinkNominal: "حالة الربط: طبيعية",

    // Dashboard Header
    executeSearch: "تنفيذ بحث في النظام...",
    latency: "زمن الوصول: 14MS",

    // General
    aymaOs: "نظام أيما",
    plantOperator: "مشغل المصنع",
    registerClearance: "تسجيل التصريح",
    requestSystemClearance: "طلب تصريح النظام",
    authFailed: "فشل المصادقة: بيانات غير صالحة أو وصول غير مصرح به.",
    googleFailed: "فشل الاتصال عبر جوجل",
    passwordMismatch: "رموز الوصول غير متطابقة",
    registrationFailed: "فشل التسجيل",
  }
};
