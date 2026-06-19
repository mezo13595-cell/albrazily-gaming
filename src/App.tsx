import { useState, useEffect, useRef, createContext, useContext } from 'react';
import {
  Copy,
  Check,
  Apple,
  Plane,
  Users,
  Send,
  Youtube,
  ChevronRight,
  ExternalLink,
  Menu,
  X,
  Globe,
  Video,
  UserPlus,
  Lock,
  Upload,
  AlertTriangle,
  Loader2,
  Zap,
  Shield,
  ToggleLeft,
  ToggleRight,
  DollarSign,
  TrendingUp,
  XCircle
} from 'lucide-react';

// === Telegram Configuration — fill in your credentials ===
const TELEGRAM_BOT_TOKEN = '8996243290:AAEuX32YcDpIuApc7kB_XdIzOdflX1k1y3o';
const TELEGRAM_CHAT_ID = '1096675312';
const ADMIN_ACTIVATION_CODE = 'ALBRAZILY-ACTIVE'; // Fixed activation code granted by admin
const TELEGRAM_GROUP_URL = 'https://t.me/albrazily0';

async function sendSubmissionToTelegram(
  playerId: string,
  regFile: File,
  depositFile: File
): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Telegram bot not configured');
  }

  const baseUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

  const msgRes = await fetch(`${baseUrl}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: `🍎 Apple of Fortune — New Submission\n\n📋 Melbet Player ID: ${playerId}`,
    }),
  });
  if (!msgRes.ok) throw new Error('Failed to send message');

  async function sendPhoto(file: File, caption: string) {
    const fd = new FormData();
    fd.append('chat_id', TELEGRAM_CHAT_ID);
    fd.append('photo', file);
    fd.append('caption', caption);
    const res = await fetch(`${baseUrl}/sendPhoto`, { method: 'POST', body: fd });
    if (!res.ok) throw new Error('Failed to send photo');
  }

  await sendPhoto(regFile, '📸 Registration Screenshot');
  await sendPhoto(depositFile, '💰 Deposit Screenshot');
}

type Language = 'en' | 'ar';

interface Translations {
  nav: {
    bonus: string;
    tools: string;
    partnership: string;
    community: string;
    contact: string;
    contactUs: string;
  };
  hero: {
    exclusiveOffer: string;
    title: string;
    subtitle: string;
    promoCodeLabel: string;
    copyCode: string;
    copied: string;
    copiedMessage: string;
  };
  tools: {
    title1: string;
    title2: string;
    description: string;
    appleHelper: {
      title: string;
      subtitle: string;
      description: string;
      buttonText: string;
    };
    aviator: {
      title: string;
      subtitle: string;
      description: string;
      buttonText: string;
    };
  };
  agent: {
    title1: string;
    title2: string;
    description: string;
    buttonText: string;
  };
  community: {
    title1: string;
    title2: string;
    description: string;
    youtube: {
      title: string;
      description: string;
      buttonText: string;
    };
    tiktok: {
      title: string;
      description: string;
      buttonText: string;
    };
    scriptsGroup: {
      title: string;
      description: string;
      buttonText: string;
    };
    agent: {
      title: string;
      description: string;
      buttonText: string;
    };
  };
  footer: {
    tagline: string;
    copyright: string;
  };
  floating: {
    tooltip: string;
  };
  script: {
    premiumTitle: string;
    playerId: string;
    playerIdPlaceholder: string;
    regScreenshot: string;
    depositScreenshot: string;
    depositNotice: string;
    submitButton: string;
    syncing: string;
    submissionSuccess: string;
    enterAdminCode: string;
    adminCodePlaceholder: string;
    confirmActivation: string;
    submitErrorRequired: string;
    submitErrorTelegram: string;
    submitErrorConfig: string;
    activateButton: string;
    wrongKey: string;
    onlineUsers: string;
    serverOverload: string;
    serverOverloadDesc: string;
    contactSupport: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      bonus: 'Bonus',
      tools: 'Tools',
      partnership: 'Partnership',
      community: 'Community',
      contact: 'Contact',
      contactUs: 'Contact Us'
    },
    hero: {
      exclusiveOffer: 'Exclusive Offer Available',
      title: 'ALBRAZILY',
      subtitle: 'Use these promo codes during registration on Melbet to claim your exclusive welcome package.',
      promoCodeLabel: 'Your Promo Codes',
      copyCode: 'COPY',
      copied: 'COPIED!',
      copiedMessage: 'Code copied to clipboard!'
    },
    tools: {
      title1: 'Scripts & ',
      title2: 'Tools Hub',
      description: 'Enhance your gaming experience with our premium prediction tools',
      appleHelper: {
        title: 'Apple of Fortune',
        subtitle: 'Melbet',
        description: 'Optimize your strategy with our prediction assistant.',
        buttonText: 'Coming Soon...'
      },
      aviator: {
        title: 'Aviator Predictor',
        subtitle: 'Melbet',
        description: 'Simulate plane data and monitor flight trends.',
        buttonText: 'Coming Soon...'
      }
    },
    agent: {
      title1: 'GROW YOUR REVENUE:',
      title2: 'BECOME A MELBET AGENT',
      description: 'Join our official sub-agent network. Get the best commission rates and full support.',
      buttonText: 'APPLY FOR PARTNERSHIP'
    },
    community: {
      title1: 'Community & ',
      title2: 'Support Hub',
      description: 'Stay connected and get the support you need',
      youtube: {
        title: 'Strategy Guides',
        description: 'Watch tutorials, tips and strategies on our YouTube channel.',
        buttonText: 'Visit Channel'
      },
      tiktok: {
        title: 'Shorts & Trends',
        description: 'Follow us for quick tips and trending content.',
        buttonText: 'Follow Us'
      },
      scriptsGroup: {
        title: 'Official Scripts Group',
        description: 'Join our Telegram group for script updates and support.',
        buttonText: 'Join Group'
      },
      agent: {
        title: 'Agent Inquiries',
        description: 'Contact us directly for partnership opportunities.',
        buttonText: 'Message Agent'
      }
    },
    footer: {
      tagline: 'Gaming Strategy Center',
      copyright: '© 2026 ALBRAZILY. All rights reserved.'
    },
    floating: {
      tooltip: 'Contact Support'
    },
    script: {
      premiumTitle: 'Apple of Fortune Premium Script',
      playerId: 'Melbet Player ID',
      playerIdPlaceholder: 'Enter your Player ID',
      regScreenshot: 'Registration Screenshot',
      depositScreenshot: 'Deposit Screenshot',
      depositNotice: 'Notice: Deposit must be between 200 to 500 EGP or 5$ to 10$ minimum, and registration via our promo code is required for automatic script activation.',
      submitButton: 'Submit & Verify Deposit',
      syncing: 'Sending your data...',
      submissionSuccess: 'Your data has been sent successfully! Please enter the activation code provided by admin to complete the process.',
      enterAdminCode: 'Activation Code',
      adminCodePlaceholder: 'Enter the code provided by admin',
      confirmActivation: 'Confirm Activation',
      submitErrorRequired: 'Please fill in Player ID and upload both screenshots.',
      submitErrorTelegram: 'Failed to send data. Please try again or contact support.',
      submitErrorConfig: 'Telegram bot is not configured yet. Please contact support.',
      activateButton: 'Activate Script',
      wrongKey: 'Invalid activation code. Please enter the code provided by admin.',
      onlineUsers: 'Online Users',
      serverOverload: 'ERROR: Server Overloaded!',
      serverOverloadDesc: 'Due to high traffic from 14,000+ active users, script grid generation is temporarily queued. Please try again later or contact support immediately to speed up activation.',
      contactSupport: 'Contact Support Agent'
    }
  },
  ar: {
    nav: {
      bonus: 'المكافأة',
      tools: 'الأدوات',
      partnership: 'الشراكة',
      community: 'المجتمع',
      contact: 'تواصل',
      contactUs: 'تواصل معنا'
    },
    hero: {
      exclusiveOffer: 'عرض حصري متاح',
      title: 'ALBRAZILY',
      subtitle: 'استخدم أكواد الخصم هذه عند التسجيل في ميلبت للحصول على باقة الترحيب الحصرية.',
      promoCodeLabel: 'أكواد الخصم الخاصة بك',
      copyCode: 'نسخ',
      copied: 'تم النسخ!',
      copiedMessage: 'تم نسخ الكود!'
    },
    tools: {
      title1: 'مركز ',
      title2: 'السكربتات والأدوات',
      description: 'عزز تجربتك في الألعاب مع أدوات التنبؤ المتميزة',
      appleHelper: {
        title: 'تفاحة الحظ',
        subtitle: 'ميلبت',
        description: 'حسّن استراتيجيتك مع مساعد التنبؤ الخاص بنا.',
        buttonText: 'قريباً...'
      },
      aviator: {
        title: 'متوقع أفياتور',
        subtitle: 'ميلبت',
        description: 'محاكاة بيانات الطائرة ومراقبة اتجاهات الطيران.',
        buttonText: 'قريباً...'
      }
    },
    agent: {
      title1: 'زد دخلك:',
      title2: 'كن وكيل ميلبت',
      description: 'انضم إلى شبكة الوكلاء الفرعيين الرسمية. احصل على أفضل معدلات العمولة ودعم كامل.',
      buttonText: 'التقدم للشراكة'
    },
    community: {
      title1: 'المجتمع و ',
      title2: 'مركز الدعم',
      description: 'ابقَ متصلاً واحصل على الدعم الذي تحتاجه',
      youtube: {
        title: 'أدلة الاستراتيجية',
        description: 'شاهد الدروس والنصائح والاستراتيجيات على قناتنا في يوتيوب.',
        buttonText: 'زيارة القناة'
      },
      tiktok: {
        title: 'الفيديوهات والترندات',
        description: 'تابعنا للحصول على نصائح سريعة ومحتوى رائج.',
        buttonText: 'تابعنا'
      },
      scriptsGroup: {
        title: 'مجموعة السكربتات الرسمية',
        description: 'انضم إلى مجموعة التلجرام لتحديثات السكربتات والدعم.',
        buttonText: 'انضم للمجموعة'
      },
      agent: {
        title: 'استفسارات الوكلاء',
        description: 'تواصل معنا مباشرة لفرص الشراكة.',
        buttonText: 'راسل الوكيل'
      }
    },
    footer: {
      tagline: 'مركز استراتيجيات الألعاب',
      copyright: '© 2026 ALBRAZILY. جميع الحقوق محفوظة.'
    },
    floating: {
      tooltip: 'تواصل مع الدعم'
    },
    script: {
      premiumTitle: 'سكربت تفاحة الحظ المميز',
      playerId: 'معرف اللاعب في ميلبت',
      playerIdPlaceholder: 'أدخل معرف اللاعب',
      regScreenshot: 'صورة التسجيل',
      depositScreenshot: 'صورة الإيداع',
      depositNotice: 'تنبيه: يجب أن يكون الإيداع من 200 إلى 500 جنيه أو من 5$ إلى 10$ كحد أدنى، والتسجيل عبر بروموكود الخاص بنا مطلوب لتفعيل السكريبت تلقائياً.',
      submitButton: 'إرسال وتأكيد الإيداع',
      syncing: 'جاري إرسال بياناتك...',
      submissionSuccess: 'تم إرسال بياناتك بنجاح! برجاء إدخال كود التفعيل الممنوح لك من الإدارة لإكمال العملية.',
      enterAdminCode: 'كود التفعيل',
      adminCodePlaceholder: 'أدخل كود التفعيل من الإدارة',
      confirmActivation: 'تأكيد التفعيل',
      submitErrorRequired: 'يرجى إدخال معرف اللاعب ورفع الصورتين.',
      submitErrorTelegram: 'فشل إرسال البيانات. يرجى المحاولة مرة أخرى أو التواصل مع الدعم.',
      submitErrorConfig: 'بوت التلجرام غير مُعد بعد. يرجى التواصل مع الدعم.',
      activateButton: 'تفعيل السكربت',
      wrongKey: 'كود تفعيل غير صحيح. يرجى إدخال الكود الممنوح من الإدارة.',
      onlineUsers: 'المستخدمون المتصلون',
      serverOverload: 'خطأ: السيرفر ممتلئ!',
      serverOverloadDesc: 'بسبب الضغط العالي من أكثر من 14,000 مستخدم نشط، تم إيقاف توليد شبكة التفاح مؤقتاً في طابور الانتظار. يرجى المحاولة لاحقاً أو مراسلة الدعم فوراً لتسريع التفعيل.',
      contactSupport: 'تواصل مع وكيل الدعم'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRTL, language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    isRTL
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const { isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAppleModal, setShowAppleModal] = useState(false);
  const [showMasterControl, setShowMasterControl] = useState(false);
  const [masterClickCount, setMasterClickCount] = useState(0);
  const masterClickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMasterClick = () => {
    setMasterClickCount((prev) => prev + 1);
    if (masterClickTimerRef.current) clearTimeout(masterClickTimerRef.current);
    masterClickTimerRef.current = setTimeout(() => setMasterClickCount(0), 2000);
  };

  useEffect(() => {
    if (masterClickCount >= 5) {
      setShowMasterControl(true);
      setMasterClickCount(0);
    }
  }, [masterClickCount]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen bg-cyber-black text-white font-['Inter'] ${isRTL ? 'font-["Tajawal","Inter"]' : ''}`}>
      {/* Navbar */}
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <HeroSection onLogoClick={handleMasterClick} />

      {/* Scripts & Tools Hub */}
      <ScriptsToolsHub onAppleClick={() => setShowAppleModal(true)} />

      {/* Agent Partnership Section */}
      <AgentPartnershipSection />

      {/* Community Section */}
      <CommunitySection />

      {/* Footer */}
      <Footer />

      {/* Floating Telegram Button */}
      <FloatingTelegramButton />

      {/* Apple of Fortune Modal */}
      {showAppleModal && <AppleOfFortuneModal onClose={() => setShowAppleModal(false)} />}

      {/* Master Control Panel */}
      {showMasterControl && <MasterControlPanel onClose={() => setShowMasterControl(false)} />}
    </div>
  );
}

function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-24 h-24'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full p-0.5 bg-gradient-to-br from-cyber-yellow via-cyber-gold to-cyber-yellow animate-pulse-neon`}>
      <div className="w-full h-full rounded-full bg-cyber-charcoal flex items-center justify-center overflow-hidden">
        <img
          src="/ChatGPT_Image_18_مايو_2026،_01_41_45_م_(1).png"
          alt="ALBRAZILY Logo"
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-yellow/20 to-cyber-green/20">
          <span className="font-['Orbitron'] font-bold text-cyber-yellow text-xs sm:text-sm">A</span>
        </div>
      </div>
    </div>
  );
}

function LanguageToggle() {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyber-dark border border-gray-700 hover:border-cyber-yellow/50 transition-all duration-300"
      >
        <Globe size={16} className="text-cyber-yellow" />
        <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'ع'}</span>
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} bg-cyber-charcoal border border-gray-700 rounded-lg overflow-hidden shadow-xl z-50`}>
          <button
            onClick={() => {
              setLanguage('en');
              setIsOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 w-full hover:bg-cyber-dark transition-colors ${
              language === 'en' ? 'text-cyber-yellow' : 'text-gray-300'
            }`}
          >
            <span className="text-sm">English</span>
            {language === 'en' && <Check size={14} />}
          </button>
          <button
            onClick={() => {
              setLanguage('ar');
              setIsOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 w-full hover:bg-cyber-dark transition-colors ${
              language === 'ar' ? 'text-cyber-yellow' : 'text-gray-300'
            }`}
          >
            <span className="text-sm">العربية</span>
            {language === 'ar' && <Check size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}

function Navbar({
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollToSection: (id: string) => void;
}) {
  const { t, isRTL } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-black/95 backdrop-blur-md border-b border-cyber-yellow/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 sm:h-20 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Logo size="sm" />
            <span className="font-['Orbitron'] font-bold text-lg sm:text-xl tracking-wider bg-gradient-to-r from-cyber-yellow to-cyber-green bg-clip-text text-transparent">
              ALBRAZILY
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-300 hover:text-cyber-yellow transition-colors duration-300 text-sm font-medium"
            >
              {t.nav.bonus}
            </button>
            <button
              onClick={() => scrollToSection('tools')}
              className="text-gray-300 hover:text-cyber-yellow transition-colors duration-300 text-sm font-medium"
            >
              {t.nav.tools}
            </button>
            <button
              onClick={() => scrollToSection('partnership')}
              className="text-gray-300 hover:text-cyber-yellow transition-colors duration-300 text-sm font-medium"
            >
              {t.nav.partnership}
            </button>
            <button
              onClick={() => scrollToSection('community')}
              className="text-gray-300 hover:text-cyber-yellow transition-colors duration-300 text-sm font-medium"
            >
              {t.nav.community}
            </button>
            <LanguageToggle />
            <a
              href={TELEGRAM_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyber-yellow to-cyber-gold text-cyber-black font-semibold text-sm hover:shadow-lg hover:shadow-cyber-yellow/30 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Send size={16} />
              {t.nav.contact}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cyber-black/98 border-b border-cyber-yellow/20 backdrop-blur-md">
          <div className="px-4 py-6 space-y-4">
            <LanguageToggle />
            <button
              onClick={() => scrollToSection('hero')}
              className={`block w-full py-3 px-4 text-gray-300 hover:text-cyber-yellow hover:bg-cyber-dark/50 rounded-lg transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {t.nav.bonus}
            </button>
            <button
              onClick={() => scrollToSection('tools')}
              className={`block w-full py-3 px-4 text-gray-300 hover:text-cyber-yellow hover:bg-cyber-dark/50 rounded-lg transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {t.nav.tools}
            </button>
            <button
              onClick={() => scrollToSection('partnership')}
              className={`block w-full py-3 px-4 text-gray-300 hover:text-cyber-yellow hover:bg-cyber-dark/50 rounded-lg transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {t.nav.partnership}
            </button>
            <button
              onClick={() => scrollToSection('community')}
              className={`block w-full py-3 px-4 text-gray-300 hover:text-cyber-yellow hover:bg-cyber-dark/50 rounded-lg transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {t.nav.community}
            </button>
            <a
              href={TELEGRAM_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyber-yellow to-cyber-gold text-cyber-black font-semibold"
            >
              <Send size={18} />
              {t.nav.contactUs}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function PromoCodeBox({ code }: { code: string }) {
  const { t, isRTL } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className="flex-1 bg-cyber-black rounded-xl border border-cyber-yellow/50 py-3 px-5">
        <p className="font-['Orbitron'] text-xl sm:text-2xl font-bold tracking-widest text-cyber-yellow text-center">
          {code}
        </p>
      </div>
      <button
        onClick={copyToClipboard}
        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 text-sm ${
          copied
            ? 'bg-cyber-green text-cyber-black'
            : 'bg-gradient-to-r from-cyber-yellow to-cyber-gold text-cyber-black hover:shadow-lg hover:shadow-cyber-yellow/40'
        } ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        {copied ? (
          <>
            <span>{t.hero.copied}</span>
            <Check size={18} />
          </>
        ) : (
          <>
            <span>{t.hero.copyCode}</span>
            <Copy size={18} />
          </>
        )}
      </button>
    </div>
  );
}

function HeroSection({ onLogoClick }: { onLogoClick: () => void }) {
  const { t, isRTL } = useLanguage();

  const promoCodes = ['abed23', 'Abd000'];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-black via-cyber-charcoal to-cyber-black" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-yellow/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyber-green/10 rounded-full blur-3xl" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(240,225,0,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(240,225,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-dark border border-cyber-yellow/30 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
          <span className="text-sm text-gray-300">{t.hero.exclusiveOffer}</span>
        </div>

        {/* Title */}
        <h1 className="font-['Orbitron'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span
            className="bg-gradient-to-r from-cyber-yellow via-cyber-gold to-cyber-green bg-clip-text text-transparent cursor-default select-none"
            onClick={onLogoClick}
          >
            {t.hero.title}
          </span>
          <br />
          <span className="text-white text-3xl sm:text-4xl md:text-5xl">Gaming Strategy Center</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* Promo Codes Box */}
        <div className="bg-gradient-to-r from-cyber-yellow/10 via-cyber-dark to-cyber-green/10 border border-cyber-yellow/30 rounded-2xl p-6 sm:p-8 mb-6 max-w-md mx-auto">
          <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider">{t.hero.promoCodeLabel}</p>

          {/* Promo Code 1 */}
          <div className="mb-4">
            <PromoCodeBox code={promoCodes[0]} />
          </div>

          {/* Promo Code 2 */}
          <div>
            <PromoCodeBox code={promoCodes[1]} />
          </div>
        </div>

        {/* CTA Arrow */}
        <div className="animate-bounce">
          <ChevronRight size={32} className={`text-cyber-yellow mx-auto ${isRTL ? '-rotate-90' : 'rotate-90'}`} />
        </div>
      </div>
    </section>
  );
}

function ScriptsToolsHub({ onAppleClick }: { onAppleClick: () => void }) {
  const { t, isRTL } = useLanguage();

  return (
    <section id="tools" className="relative py-20 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-cyber-charcoal/50 to-cyber-black" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-['Orbitron'] text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">{t.tools.title1}</span>
            <span className="bg-gradient-to-r from-cyber-yellow to-cyber-green bg-clip-text text-transparent">{t.tools.title2}</span>
          </h2>
          <p className={`text-gray-400 max-w-xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
            {t.tools.description}
          </p>
        </div>

        {/* Tools Grid */}
        <div className={`grid md:grid-cols-2 gap-6 lg:gap-8`}>
          {/* Card 1: Apple of Fortune */}
          <ToolCard
            icon={<Apple className="text-cyber-yellow" size={32} />}
            title={t.tools.appleHelper.title}
            subtitle={t.tools.appleHelper.subtitle}
            description={t.tools.appleHelper.description}
            buttonText="Launch Script"
            buttonColor="yellow"
            onClick={onAppleClick}
            active={true}
          />

          {/* Card 2: Aviator Predictor */}
          <ToolCard
            icon={<Plane className="text-cyber-green" size={32} />}
            title={t.tools.aviator.title}
            subtitle={t.tools.aviator.subtitle}
            description={t.tools.aviator.description}
            buttonText={t.tools.aviator.buttonText}
            buttonColor="green"
            onClick={() => {}}
            active={false}
          />
        </div>
      </div>
    </section>
  );
}

function ToolCard({
  icon,
  title,
  subtitle,
  description,
  buttonText,
  buttonColor,
  onClick,
  active
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonColor: 'yellow' | 'green';
  onClick: () => void;
  active: boolean;
}) {
  const [isActive, setIsActive] = useState(false);
  const { isRTL } = useLanguage();

  return (
    <div
      className="group relative bg-gradient-to-br from-cyber-dark/80 to-cyber-charcoal border border-gray-800 rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:border-cyber-yellow/50 hover:shadow-xl hover:shadow-cyber-yellow/10 hover:-translate-y-1"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: buttonColor === 'yellow'
            ? 'radial-gradient(circle at center, rgba(240,225,0,0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(0,255,65,0.15) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
          buttonColor === 'yellow'
            ? 'bg-cyber-yellow/10 border border-cyber-yellow/30 group-hover:bg-cyber-yellow/20'
            : 'bg-cyber-green/10 border border-cyber-green/30 group-hover:bg-cyber-green/20'
        }`}>
          {icon}
        </div>

        {/* Title */}
        <h3 className="font-['Orbitron'] text-xl sm:text-2xl font-bold text-white mb-1">{title}</h3>
        <p className={`text-sm font-medium mb-4 ${buttonColor === 'yellow' ? 'text-cyber-yellow' : 'text-cyber-green'}`}>
          {subtitle}
        </p>

        {/* Description */}
        <p className={`text-gray-400 mb-8 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>{description}</p>

        {/* Button */}
        {active ? (
          <button
            onClick={onClick}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              buttonColor === 'yellow'
                ? 'bg-gradient-to-r from-cyber-yellow to-cyber-gold text-cyber-black hover:shadow-lg hover:shadow-cyber-yellow/40'
                : 'bg-gradient-to-r from-cyber-green to-emerald-500 text-cyber-black hover:shadow-lg hover:shadow-cyber-green/40'
            } ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Zap size={18} />
            <span>{buttonText}</span>
          </button>
        ) : (
          <button
            disabled
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-not-allowed bg-gray-700 text-gray-400 border border-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <span className="animate-pulse">{buttonText}</span>
          </button>
        )}
      </div>
    </div>
  );
}

function AgentPartnershipSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="partnership" className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-charcoal via-cyber-black to-cyber-dark" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-yellow/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyber-green/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-cyber-dark to-cyber-charcoal border border-cyber-yellow/30 rounded-3xl p-8 sm:p-12 text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-cyber-yellow/20 to-cyber-green/20 border border-cyber-yellow/30 flex items-center justify-center">
            <Users className="text-cyber-yellow" size={40} />
          </div>

          {/* Title */}
          <h2 className="font-['Orbitron'] text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">{t.agent.title1}</span>
            <br />
            <span className="bg-gradient-to-r from-cyber-yellow to-cyber-green bg-clip-text text-transparent">
              {t.agent.title2}
            </span>
          </h2>

          {/* Description */}
          <p className={`text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
            {t.agent.description}
          </p>

          {/* CTA Button */}
          <a
            href={TELEGRAM_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyber-yellow to-cyber-gold text-cyber-black font-bold text-lg hover:shadow-xl hover:shadow-cyber-yellow/40 transition-all duration-300 hover:-translate-y-1 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t.agent.buttonText}
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="community" className="relative py-20 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-cyber-charcoal/30 to-cyber-black" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-['Orbitron'] text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">{t.community.title1}</span>
            <span className="bg-gradient-to-r from-cyber-yellow to-cyber-green bg-clip-text text-transparent">{t.community.title2}</span>
          </h2>
          <p className={`text-gray-400 max-w-xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
            {t.community.description}
          </p>
        </div>

        {/* Community Cards Grid - 2x2 */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {/* YouTube Card */}
          <CommunityCard
            icon={<Youtube className="text-red-500" size={28} />}
            title={t.community.youtube.title}
            description={t.community.youtube.description}
            buttonText={t.community.youtube.buttonText}
            buttonLink="https://youtube.com/@albrazily-r5s?si=vId0jhDVjlkZdHkH"
            accentColor="red"
          />

          {/* TikTok Card */}
          <CommunityCard
            icon={<Video className="text-pink-500" size={28} />}
            title={t.community.tiktok.title}
            description={t.community.tiktok.description}
            buttonText={t.community.tiktok.buttonText}
            buttonLink="https://www.tiktok.com/@albrazily829?_r=1&_t=ZS-97DVbHlsLih"
            accentColor="pink"
          />

          {/* Telegram Scripts Group Card */}
          <CommunityCard
            icon={<Send className="text-cyber-blue" size={28} />}
            title={t.community.scriptsGroup.title}
            description={t.community.scriptsGroup.description}
            buttonText={t.community.scriptsGroup.buttonText}
            buttonLink={TELEGRAM_GROUP_URL}
            accentColor="blue"
          />

          {/* Agent Partnership Card */}
          <CommunityCard
            icon={<UserPlus className="text-cyber-yellow" size={28} />}
            title={t.community.agent.title}
            description={t.community.agent.description}
            buttonText={t.community.agent.buttonText}
            buttonLink={TELEGRAM_GROUP_URL}
            accentColor="yellow"
          />
        </div>
      </div>
    </section>
  );
}

function CommunityCard({
  icon,
  title,
  description,
  buttonText,
  buttonLink,
  accentColor
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  accentColor: 'red' | 'pink' | 'blue' | 'yellow';
}) {
  const { isRTL } = useLanguage();

  const colorStyles = {
    red: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30 hover:border-red-500/50'
    },
    pink: {
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/30 hover:border-pink-500/50'
    },
    blue: {
      bg: 'bg-cyber-blue/10',
      border: 'border-cyber-blue/30 hover:border-cyber-blue/50'
    },
    yellow: {
      bg: 'bg-cyber-yellow/10',
      border: 'border-cyber-yellow/30 hover:border-cyber-yellow/50'
    }
  };

  const style = colorStyles[accentColor];

  return (
    <div className={`group bg-cyber-dark/80 border ${style.border} rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl ${style.bg} flex items-center justify-center mb-6`}>
        {icon}
      </div>

      {/* Title */}
      <h3 className={`font-['Orbitron'] text-lg sm:text-xl font-bold text-white mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{title}</h3>

      {/* Description */}
      <p className={`text-gray-400 mb-6 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>{description}</p>

      {/* Button */}
      <a
        href={buttonLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyber-charcoal border border-gray-700 text-white font-semibold hover:border-cyber-yellow/50 hover:bg-cyber-dark transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        {buttonText}
        <ExternalLink size={16} />
      </a>
    </div>
  );
}

function Footer() {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="relative py-16 px-4 border-t border-cyber-yellow/20">
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-charcoal to-cyber-black" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center">
          {/* Large Logo */}
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>

          {/* Brand Name */}
          <h3 className="font-['Orbitron'] text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-cyber-yellow to-cyber-green bg-clip-text text-transparent">
            ALBRAZILY
          </h3>
          <p className="text-gray-400 mb-8">{t.footer.tagline}</p>

          {/* Social Links */}
          <div className={`flex justify-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <a
              href={TELEGRAM_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-cyber-dark border border-gray-800 flex items-center justify-center text-gray-400 hover:text-cyber-yellow hover:border-cyber-yellow/50 transition-all duration-300"
            >
              <Send size={20} />
            </a>
            <a
              href="https://youtube.com/@albrazily-r5s?si=vId0jhDVjlkZdHkH"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-cyber-dark border border-gray-800 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500/50 transition-all duration-300"
            >
              <Youtube size={20} />
            </a>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-sm">
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Master Control State - Global for the session
let masterControlState = {
  liveMode: false,
  balance: '0',
  outcome: null as 'win' | 'loss' | null,
  winningApples: [] as number[]
};

function AppleOfFortuneModal({ onClose }: { onClose: () => void }) {
  const { t, isRTL, language } = useLanguage();
  const [stage, setStage] = useState<'verification' | 'syncing' | 'awaitingActivation' | 'script'>('verification');
  const [playerId, setPlayerId] = useState('');
  const [regFile, setRegFile] = useState<File | null>(null);
  const [depositFile, setDepositFile] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState('');
  const [keyError, setKeyError] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [userCount, setUserCount] = useState(2145);
  const [sessionTimer, setSessionTimer] = useState(3600);
  const [masterState, setMasterState] = useState(masterControlState);

  // Check for existing session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('appleFortune_session');
    if (savedSession) {
      const session = JSON.parse(savedSession);
      const now = Date.now();
      if (session.expiresAt > now) {
        setStage('script');
        const remaining = Math.floor((session.expiresAt - now) / 1000);
        setSessionTimer(remaining);
      } else {
        localStorage.removeItem('appleFortune_session');
      }
    }
  }, []);

  // Session timer
  useEffect(() => {
    if (stage === 'script' && sessionTimer > 0) {
      const timer = setInterval(() => {
        setSessionTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            localStorage.removeItem('appleFortune_session');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [stage, sessionTimer]);

  // User counter fluctuation (2000-2500)
  useEffect(() => {
    if (stage === 'script') {
      const countInterval = setInterval(() => {
        setUserCount((prev) => {
          const change = Math.floor(Math.random() * 21) - 10;
          return Math.min(2500, Math.max(2000, prev + change));
        });
      }, 2000 + Math.random() * 2000);
      return () => clearInterval(countInterval);
    }
  }, [stage]);

  // Sync with master state
  useEffect(() => {
    const syncInterval = setInterval(() => {
      setMasterState({ ...masterControlState });
    }, 500);
    return () => clearInterval(syncInterval);
  }, []);

  const handleSubmit = async () => {
    if (!playerId.trim() || !regFile || !depositFile) {
      setSubmitError(t.script.submitErrorRequired);
      return;
    }

    setSubmitError('');
    setStage('syncing');

    try {
      await sendSubmissionToTelegram(playerId.trim(), regFile, depositFile);
      setStage('awaitingActivation');
    } catch (err) {
      setStage('verification');
      if (err instanceof Error && err.message === 'Telegram bot not configured') {
        setSubmitError(t.script.submitErrorConfig);
      } else {
        setSubmitError(t.script.submitErrorTelegram);
      }
    }
  };

  const handleActivate = () => {
    if (inputKey.trim().toUpperCase() === ADMIN_ACTIVATION_CODE.toUpperCase()) {
      setKeyError(false);
      setStage('script');
      const expiresAt = Date.now() + 3600000;
      localStorage.setItem('appleFortune_session', JSON.stringify({ activated: true, expiresAt }));
    } else {
      setKeyError(true);
    }
  };

  const handleFileChange = (type: 'reg' | 'deposit', file: File | null) => {
    if (type === 'reg') {
      setRegFile(file);
    } else {
      setDepositFile(file);
    }
    setSubmitError('');
  };

  const apples = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    multiplier: [1.1, 1.2, 1.3, 1.5, 1.7, 2.0, 2.5, 3.0, 4.0, 5.0, 6.0, 8.0, 10.0, 12.0, 15.0, 20.0, 25.0, 34.0, 0, 0][i] || 0,
    rotten: i >= 18
  }));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-cyber-dark to-cyber-charcoal border border-cyber-yellow/30 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className={`sticky top-0 bg-cyber-dark/95 backdrop-blur-sm border-b border-cyber-yellow/20 px-6 py-4 flex items-center justify-between z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 rounded-xl bg-cyber-yellow/10 border border-cyber-yellow/30 flex items-center justify-center">
              <Apple className="text-cyber-yellow" size={20} />
            </div>
            <span className="font-['Orbitron'] text-lg font-bold text-white">{t.script.premiumTitle}</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {stage === 'verification' && (
            <div className="space-y-6">
              {/* Lock Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyber-yellow/10 border border-cyber-yellow/30 flex items-center justify-center">
                  <Lock className="text-cyber-yellow" size={28} />
                </div>
                <h3 className="font-['Orbitron'] text-xl font-bold text-white mb-1">{t.script.premiumTitle}</h3>
              </div>

              {/* Fields */}
              <div className="space-y-4">
                {/* Player ID */}
                <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                  <label className="block text-sm text-gray-400 mb-2">{t.script.playerId}</label>
                  <input
                    type="text"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    placeholder={t.script.playerIdPlaceholder}
                    className="w-full px-4 py-3 bg-cyber-black border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-cyber-yellow/50 focus:outline-none transition-colors"
                  />
                </div>

                {/* File Uploads */}
                <div className={`grid grid-cols-2 gap-4 ${isRTL ? 'direction-rtl' : ''}`}>
                  <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                    <label className="block text-sm text-gray-400 mb-2">{t.script.regScreenshot}</label>
                    <label className="flex items-center justify-center gap-2 px-4 py-8 bg-cyber-black border border-gray-600 rounded-lg cursor-pointer hover:border-cyber-yellow/30 transition-colors">
                      <Upload size={20} className="text-gray-400" />
                      <span className="text-sm text-gray-400 truncate">
                        {regFile ? regFile.name.substring(0, 15) + '...' : t.script.regScreenshot}
                      </span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('reg', e.target.files?.[0] || null)} />
                    </label>
                  </div>

                  <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                    <label className="block text-sm text-gray-400 mb-2">{t.script.depositScreenshot}</label>
                    <label className="flex items-center justify-center gap-2 px-4 py-8 bg-cyber-black border border-gray-600 rounded-lg cursor-pointer hover:border-cyber-yellow/30 transition-colors">
                      <Upload size={20} className="text-gray-400" />
                      <span className="text-sm text-gray-400 truncate">
                        {depositFile ? depositFile.name.substring(0, 15) + '...' : t.script.depositScreenshot}
                      </span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('deposit', e.target.files?.[0] || null)} />
                    </label>
                  </div>
                </div>

                {/* Notice */}
                <div className={`p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className="text-amber-400 text-sm leading-relaxed">
                    <span className="font-bold">{language === 'en' ? '⚠️ ' + t.script.depositNotice : t.script.depositNotice + ' ⚠️'}</span>
                  </p>
                </div>

                {submitError && (
                  <p className="text-red-500 text-sm text-center">{submitError}</p>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyber-yellow to-cyber-gold text-cyber-black font-bold text-lg hover:shadow-xl hover:shadow-cyber-yellow/40 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Zap size={20} />
                  {t.script.submitButton}
                </button>
              </div>
            </div>
          )}

          {stage === 'syncing' && (
            <div className="py-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cyber-yellow/10 border border-cyber-yellow/30 flex items-center justify-center">
                <Loader2 className="text-cyber-yellow animate-spin" size={36} />
              </div>
              <p className="text-gray-300 text-lg font-medium">{t.script.syncing}</p>
            </div>
          )}

          {stage === 'awaitingActivation' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyber-yellow/10 border border-cyber-yellow/30 flex items-center justify-center">
                  <Lock className="text-cyber-yellow" size={28} />
                </div>
                <p className="text-gray-300 text-base leading-relaxed px-2">{t.script.submissionSuccess}</p>
              </div>

              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <label className="block text-sm text-gray-400 mb-2">{t.script.enterAdminCode}</label>
                <input
                  type="text"
                  value={inputKey}
                  onChange={(e) => { setInputKey(e.target.value); setKeyError(false); }}
                  placeholder={t.script.adminCodePlaceholder}
                  className={`w-full px-4 py-3 bg-cyber-black border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors font-mono tracking-wider ${keyError ? 'border-red-500' : 'border-gray-600 focus:border-cyber-yellow/50'}`}
                />
                {keyError && <p className="text-red-500 text-sm mt-2">{t.script.wrongKey}</p>}
              </div>

              <button
                onClick={handleActivate}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyber-yellow to-cyber-gold text-cyber-black font-bold text-lg hover:shadow-xl hover:shadow-cyber-yellow/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Zap size={20} />
                {t.script.confirmActivation}
              </button>
            </div>
          )}

          {stage === 'script' && (
            <div className="space-y-4">
              {/* Session Timer */}
              <div className="p-3 rounded-xl bg-cyber-green/10 border border-cyber-green/30 text-center">
                <div className={`flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-cyber-green font-medium">{language === 'en' ? 'Session:' : 'الجلسة:'}</span>
                  <span className="font-['Orbitron'] text-xl font-bold text-white">{formatTime(sessionTimer)}</span>
                </div>
              </div>

              {/* Balance Display (Master Control) */}
              {masterState.liveMode && parseFloat(masterState.balance) > 0 && (
                <div className={`flex items-center justify-center gap-2 px-4 py-3 bg-cyber-yellow/10 border border-cyber-yellow/30 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <DollarSign className="text-cyber-yellow" size={20} />
                  <span className="text-gray-300 font-medium">{language === 'en' ? 'Balance:' : 'الرصيد:'}</span>
                  <span className="font-['Orbitron'] text-xl font-bold text-cyber-yellow">${masterState.balance}</span>
                </div>
              )}

              {/* Online Users Counter */}
              <div className={`flex items-center justify-end gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Users className="text-red-400 animate-pulse" size={18} />
                <span className="text-red-400 font-medium">{t.script.onlineUsers}:</span>
                <span className="font-['Orbitron'] text-white font-bold">{userCount.toLocaleString()}</span>
              </div>

              {/* Apple Grid */}
              <div className="relative">
                <div className="grid grid-cols-5 gap-2 p-4 bg-gradient-to-br from-green-900/20 to-cyber-charcoal rounded-xl border border-green-500/20">
                  {apples.map((apple) => {
                    const isWinning = masterState.winningApples.includes(apple.id);
                    const isHighlight = masterState.liveMode && masterState.outcome === 'win' && isWinning;
                    return (
                      <div
                        key={apple.id}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center transition-all duration-500 ${
                          isHighlight
                            ? 'bg-cyber-yellow/30 border-2 border-cyber-yellow shadow-lg shadow-cyber-yellow/50 scale-105'
                            : apple.rotten
                              ? 'bg-red-900/30 border border-red-500/30'
                              : 'bg-green-900/30 border border-green-500/30 hover:border-green-400/50'
                        }`}
                      >
                        <Apple className={`${isHighlight ? 'text-cyber-yellow' : apple.rotten ? 'text-red-500/50' : 'text-green-400'}`} size={24} />
                        {apple.multiplier > 0 && (
                          <span className={`text-xs font-bold mt-1 ${isHighlight ? 'text-cyber-yellow' : apple.rotten ? 'text-red-500/50' : 'text-green-300'}`}>
                            x{apple.multiplier}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Error Overlay - Only show for regular users (not live mode) */}
                {!masterState.liveMode && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-md p-6 bg-red-950/95 backdrop-blur-sm border border-red-500/50 rounded-xl shadow-2xl text-center">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="text-red-500" size={28} />
                      </div>
                      <h3 className="font-['Orbitron'] text-lg font-bold text-red-500 mb-3">{t.script.serverOverload}</h3>
                      <p className="text-gray-300 text-sm mb-6 leading-relaxed">{t.script.serverOverloadDesc}</p>
                      <a
                        href={TELEGRAM_GROUP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-yellow to-cyber-gold text-cyber-black font-bold transition-all duration-300 hover:shadow-lg hover:shadow-cyber-yellow/40"
                      >
                        <Send size={18} />
                        {t.script.contactSupport}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MasterControlPanel({ onClose }: { onClose: () => void }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [liveMode, setLiveMode] = useState(masterControlState.liveMode);
  const [balance, setBalance] = useState(masterControlState.balance);
  const [outcome, setOutcome] = useState<'win' | 'loss' | null>(masterControlState.outcome);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const toggleLiveMode = () => {
    const newMode = !liveMode;
    setLiveMode(newMode);
    masterControlState.liveMode = newMode;
    if (!newMode) {
      masterControlState.outcome = null;
      masterControlState.winningApples = [];
      setOutcome(null);
    }
  };

  const updateBalance = (value: string) => {
    setBalance(value);
    masterControlState.balance = value;
  };

  const setWinOutcome = () => {
    setOutcome('win');
    masterControlState.outcome = 'win';
    // Generate random winning apples (path through the grid)
    const winning: number[] = [];
    const cols = 4;
    let col = Math.floor(Math.random() * cols);
    for (let row = 0; row < 8; row++) {
      const idx = row * cols + col;
      winning.push(idx);
      if (Math.random() > 0.5) col = Math.min(cols - 1, col + 1);
      if (Math.random() > 0.7) col = Math.max(0, col - 1);
    }
    masterControlState.winningApples = winning;
  };

  const setLossOutcome = () => {
    setOutcome('loss');
    masterControlState.outcome = 'loss';
    masterControlState.winningApples = [];
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-700 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <Shield className="text-purple-400" size={20} />
            </div>
            <span className="font-['Orbitron'] text-lg font-bold text-white">Master Control</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-gray-400 text-center">Enter admin password to continue</p>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Password"
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${error ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'}`}
              />
              {error && <p className="text-red-500 text-sm">Invalid password</p>}
              <button
                onClick={handleLogin}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
              >
                Access Control
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Live Mode Toggle */}
              <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {liveMode ? (
                      <ToggleRight className="text-cyber-green" size={32} />
                    ) : (
                      <ToggleLeft className="text-gray-500" size={32} />
                    )}
                    <span className="text-white font-medium">Live Script Mode</span>
                  </div>
                  <button
                    onClick={toggleLiveMode}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      liveMode
                        ? 'bg-cyber-green text-black'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {liveMode ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              {/* Balance Simulator */}
              <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
                <label className="block text-gray-400 text-sm mb-2">Balance Simulator</label>
                <div className="flex items-center gap-3">
                  <DollarSign className="text-cyber-yellow" size={20} />
                  <input
                    type="text"
                    value={balance}
                    onChange={(e) => updateBalance(e.target.value)}
                    placeholder="10000"
                    className="flex-1 px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-lg focus:outline-none focus:border-cyber-yellow"
                  />
                </div>
              </div>

              {/* Outcome Controls */}
              <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
                <label className="block text-gray-400 text-sm mb-3">Script Outcome</label>
                <div className="flex gap-4">
                  <button
                    onClick={setWinOutcome}
                    className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                      outcome === 'win'
                        ? 'bg-cyber-green text-black'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <TrendingUp size={18} />
                    Win
                  </button>
                  <button
                    onClick={setLossOutcome}
                    className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                      outcome === 'loss'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <XCircle size={18} />
                    Loss
                  </button>
                </div>
              </div>

              {/* Status */}
              <div className="text-center text-gray-500 text-sm">
                Master Control Active - Hidden from regular users
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FloatingTelegramButton() {
  const { t, isRTL } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={TELEGRAM_GROUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 z-50 group ${isRTL ? 'left-6' : 'right-6'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pulse Ring */}
      <div className="absolute inset-0 rounded-full bg-cyber-yellow animate-ping opacity-30" />

      {/* Main Button */}
      <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyber-yellow to-cyber-gold flex items-center justify-center shadow-lg transition-all duration-300 ${
        isHovered ? 'scale-110 shadow-cyber-yellow/50' : 'shadow-cyber-yellow/30'
      }`}>
        <Send className="text-cyber-black" size={26} strokeWidth={2.5} />

        {/* Tooltip */}
        <div className={`absolute whitespace-nowrap bg-cyber-dark border border-cyber-yellow/30 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
          isRTL
            ? `left-full ml-3 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'}`
            : `right-full mr-3 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}`
        }`}>
          <span className="text-white">{t.floating.tooltip}</span>
          <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? '-right-1 rotate-45' : '-left-1 -rotate-45'}`}>
            <div className="w-2 h-2 bg-cyber-dark border-b border-r border-cyber-yellow/30" />
          </div>
        </div>
      </div>
    </a>
  );
}

export default App;
