import type { Product } from "./products";

/**
 * Hindi taglines for each product. Technical details (composition, dosage)
 * stay in English as published by the manufacturer.
 */
export const taglinesHi: Record<string, string> = {
  aquabac: "तालाब का संतुलन बनाए रखने वाला मिट्टी व पानी का प्रोबायोटिक",
  "bacitox-plus": "अनोखा मिट्टी व पानी कंडीशनर",
  rhodobac: "कई स्ट्रेन वाला स्थिर तरल प्रोबायोटिक",
  fepromix: "पेट के प्रोबायोटिक्स का बेहतरीन मिश्रण",
  hatchpro: "हैचरी के लिए असरदार घुलनशील प्रोबायोटिक",
  "envipro-gold": "वनस्पति आधारित तरल अमोनिया बाइंडर",
  dynablend: "अमोनिया कम करने का स्थिर मिश्रण",
  "nitrisol-hp": "नाइट्राइट का पूरा समाधान",
  zeomin: "खनिज ज़ियोलाइट का अनूठा मिश्रण",
  "zeomin-forte": "प्रोबायोटिक्स के साथ ट्रिपल एक्शन ज़ियोलाइट",
  dissox: "घुली ऑक्सीजन बढ़ाने वाले पर्यावरण-अनुकूल दाने",
  "dissox-fla-tablets": "ऑक्सीजन देने वाली गोलियां, तल की गैस भी सोखें",
  "benzatec-80": "असरदार और भरोसेमंद कीटाणुनाशक",
  "profect-plus": "बेहद असरदार ब्रॉड-स्पेक्ट्रम सैनिटाइज़र",
  "profect-ultra": "काई व घोंघा नाशक",
  minblend: "मुख्य खनिजों का स्थिर मिश्रण",
  mipramax: "प्रोबायोटिक्स व अमीनो एसिड के साथ ज़रूरी खनिज",
  "mintroplex-gold": "मोल्टिंग के लिए चिलेटेड खनिज, विटामिन व अमीनो एसिड",
  "mintroplex-ultra": "जल्दी असर करने वाले तरल खनिज",
  "maxigro-xl": "अमीनो एसिड, इम्युनिटी बूस्टर व एंटीऑक्सीडेंट के साथ खनिज",
  "solumin-l": "आसानी से घुलने वाले सूक्ष्म व मुख्य खनिज (तरल)",
  "solumin-s": "अमीनो एसिड व प्रोबायोटिक्स के साथ ज़रूरी खनिज",
  vibrocid: "विब्रियो के खिलाफ़ वनस्पति आधारित उत्पाद",
  "pathostat-blu": "वायरस, बैक्टीरिया व फंगस रोधी वनस्पति मिश्रण",
  syngromix: "लिवर रक्षक व ग्रोथ बढ़ाने वाला फाइटोबायोटिक",
  "orbigel-hp": "लिवर टॉनिक व फ़ीड बाइंडिंग जेल",
  "yeaforte-plus": "डायरेक्ट-फ़ेड माइक्रोबियल (DFM) फ़ॉर्मूला",
  blucee: "असरदार और घुलनशील विटामिन सी",
  ceemax: "सबसे स्थिर व असरदार विटामिन सी",
  nagrowall: "बिना एंटीबायोटिक ग्रोथ व इम्युनिटी बढ़ाने वाला",
  argucide: "मछली के बाहरी परजीवियों का पूरा इलाज",
  ectocyp: "मछली के बाहरी परजीवियों की दवा",
  mectimax: "बाहरी व अंदरूनी परजीवियों की दवा",
  raprosoft: "तालाब के पानी की कठोरता नियंत्रक",
  molasafe: "खनिजों के साथ ऑर्गेनिक कार्बन",
};

export const productTagline = (product: Product, lang: "en" | "hi") =>
  (lang === "hi" && taglinesHi[product.slug]) || product.tagline;

/** Primary and secondary display names for the locale. */
export const productNames = (product: Product, lang: "en" | "hi") =>
  lang === "hi"
    ? { primary: product.nameHi, secondary: product.name }
    : { primary: product.name, secondary: product.nameHi };
