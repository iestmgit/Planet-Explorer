const PLANETS_DATA = {
    sun: {
        name: "خورشید",
        nameEn: "Sun",
        radius: 15,
        color: 0xFDB813,
        emissive: 0xFDB813,
        emissiveIntensity: 0.8,
        distance: 0,
        speed: 0,
        rotationSpeed: 0.001,
        description: "ستاره مرکزی منظومه شمسی. ۹۹.۸٪ جرم منظومه شمسی را دارد.",
        stats: {
            "قطر": "۱,۳۹۲,۷۰۰ کیلومتر",
            "دمای سطح": "۵,۵۰۰ درجه سانتی‌گراد",
            "سن": "۴.۶ میلیارد سال"
        }
    },
    mercury: {
        name: "عطارد",
        nameEn: "Mercury",
        radius: 1.5,
        color: 0x8C8C8C,
        distance: 30,
        speed: 0.02,
        rotationSpeed: 0.005,
        description: "نزدیک‌ترین سیاره به خورشید. کوچک‌ترین سیاره منظومه شمسی.",
        stats: {
            "دوره چرخش": "۸۸ روز",
            "دمای روز": "۴۳۰ درجه",
            "دمای شب": "-۱۸۰ درجه"
        }
    },
    venus: {
        name: "زهره",
        nameEn: "Venus",
        radius: 2.8,
        color: 0xE6E6B8,
        distance: 45,
        speed: 0.015,
        rotationSpeed: 0.002,
        description: "گرم‌ترین سیاره منظومه شمسی به دلیل اثر گلخانه‌ای شدید.",
        stats: {
            "دمای سطح": "۴۶۲ درجه",
            "فشار جو": "۹۲ برابر زمین",
            "جهت چرخش": "معکوس!"
        }
    },
    earth: {
        name: "زمین",
        nameEn: "Earth",
        radius: 3,
        color: 0x2233FF,
        distance: 65,
        speed: 0.01,
        rotationSpeed: 0.01,
        description: "تنها سیاره شناخته‌شده با حیات. خانه ما!",
        stats: {
            "جمعیت": "۸ میلیارد",
            "ماه": "۱ عدد",
            "دمای میانگین": "۱۵ درجه"
        },
        hasMoon: true
    },
    mars: {
        name: "مریخ",
        nameEn: "Mars",
        radius: 2.2,
        color: 0xFF4500,
        distance: 85,
        speed: 0.008,
        rotationSpeed: 0.009,
        description: "سیاره سرخ. هدف اصلی اکتشافات فضایی آینده.",
        stats: {
            "روز": "۲۴.۶ ساعت",
            "کوه‌ها": "المپیک مونس - بلندترین",
            "قطب‌ها": "یخ خشک"
        }
    },
    jupiter: {
        name: "مشتری",
        nameEn: "Jupiter",
        radius: 8,
        color: 0xD4A373,
        distance: 120,
        speed: 0.004,
        rotationSpeed: 0.02,
        description: "بزرگ‌ترین سیاره. یک غول گازی با طوفان بزرگ قرمز.",
        stats: {
            "قطر": "۱۱ برابر زمین",
            "ماه‌ها": "۹۵ عدد",
            "چرخش": "سریع‌ترین"
        }
    },
    saturn: {
        name: "زحل",
        nameEn: "Saturn",
        radius: 7,
        color: 0xF4D03F,
        distance: 160,
        speed: 0.003,
        rotationSpeed: 0.018,
        description: "زیباترین سیاره با حلقه‌های مشهورش.",
        stats: {
            "حلقه‌ها": "هزاران حلقه یخی",
            "چگالی": "کمتر از آب!",
            "ماه بزرگ": "تیتان"
        },
        hasRings: true
    },
    uranus: {
        name: "اورانوس",
        nameEn: "Uranus",
        radius: 5,
        color: 0x7DE3F4,
        distance: 200,
        speed: 0.002,
        rotationSpeed: 0.015,
        description: "سیاره‌ای که روی جانب خود می‌چرخد!",
        stats: {
            "جهت چرخش": "۹۸ درجه کج",
            "سردترین": "-۲۲۴ درجه",
            "حلقه‌ها": "۱۳ حلقه تیره"
        }
    },
    neptune: {
        name: "نپتون",
        nameEn: "Neptune",
        radius: 4.8,
        color: 0x4169E1,
        distance: 240,
        speed: 0.001,
        rotationSpeed: 0.016,
        description: "دورترین سیاره. بادهایی با سرعت ۲,۱۰۰ کیلومتر در ساعت!",
        stats: {
            "سال": "۱۶۵ زمینی",
            "بادها": "سریع‌ترین در منظومه",
            "رنگ": "آبی عمیق"
        }
    }
};
