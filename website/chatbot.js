/* ============================================================
   HIMANSHU v2.0 — SKY-LAB AI ASSISTANT
   Voice · Multilingual (EN/HI/MR) · WhatsApp Handoff
   ============================================================ */

(function () {
  'use strict';

  /* ================= CONFIG ================= */
  const CONFIG = {
    whatsappNumber: '919867577309',        // SKY-LAB main line
    whatsappDefaultMsg: 'Hi SKY-LAB, I have an enquiry about your laboratory services.',
    phoneNumber: '9867577309',
    email: 'mails@skylabenviro.com',
    webUrl: 'https://skylabenviro.com'
  };

  /* ================= KNOWLEDGE BASE ================= */
  /* Each entry has keywords + response per language */
  const KB = {

    greeting: {
      keywords: ['hi','hello','hey','namaste','namaskar','good morning','good evening','good afternoon','start','hii','hiii','hola','sup','namaste ji'],
      response: {
        en: `Namaste! 🙏 I'm <strong>Himanshu</strong>, your SKY-LAB assistant. I can help you with:<ul><li>Testing services & capabilities</li><li>NABL / ISO certifications</li><li>Location & contact</li><li>Quotes & enquiries</li><li>MPCB / FSSAI compliance</li></ul>What would you like to know?`,
        hi: `नमस्ते! 🙏 मैं <strong>हिमांशु</strong> हूँ, आपका SKY-LAB सहायक। मैं इनमें मदद कर सकता हूँ:<ul><li>परीक्षण सेवाएँ और क्षमताएँ</li><li>NABL / ISO प्रमाणपत्र</li><li>स्थान और संपर्क</li><li>कोटेशन और पूछताछ</li><li>MPCB / FSSAI अनुपालन</li></ul>आप क्या जानना चाहेंगे?`,
        mr: `नमस्कार! 🙏 मी <strong>हिमांशू</strong>, तुमचा SKY-LAB सहाय्यक. मी यामध्ये मदत करू शकतो:<ul><li>चाचणी सेवा आणि क्षमता</li><li>NABL / ISO प्रमाणपत्रे</li><li>ठिकाण आणि संपर्क</li><li>कोट आणि चौकशी</li><li>MPCB / FSSAI अनुपालन</li></ul>तुम्हाला काय जाणून घ्यायचे आहे?`
      }
    },

    whoAreYou: {
      keywords: ['who are you','your name','what is your name','introduce yourself','who is himanshu','about you'],
      response: {
        en: `I'm <strong>Himanshu</strong> — SKY-LAB's virtual assistant. Available 24/7 to answer questions about our laboratory, services, certifications, and connect you with our team. 😊`,
        hi: `मैं <strong>हिमांशु</strong> हूँ — SKY-LAB का वर्चुअल सहायक। 24/7 उपलब्ध हूँ हमारी लैब, सेवाओं, प्रमाणपत्रों के बारे में जानकारी देने के लिए। 😊`,
        mr: `मी <strong>हिमांशू</strong> — SKY-LAB चा व्हर्च्युअल सहाय्यक. 24/7 उपलब्ध आहे लॅब, सेवा, प्रमाणपत्रांबद्दल माहिती देण्यासाठी. 😊`
      }
    },

    about: {
      keywords: ['about sky lab','about skylab','about company','who is sky lab','what is sky lab','tell me about','company profile','founded','established','history','since when','how old'],
      response: {
        en: `<strong>SKY-LAB Analytical Laboratory</strong> has served industry since <strong>1991</strong>. NABL-accredited environmental & analytical testing lab in Bhiwandi, Maharashtra.<br><br><strong>Quick facts:</strong><ul><li>35+ years experience</li><li>1000+ testing parameters</li><li>400+ clients</li><li>50+ expert analysts</li></ul>Serving pharma, chemicals, food, textile, infrastructure, government.`,
        hi: `<strong>SKY-LAB Analytical Laboratory</strong> 1991 से उद्योग की सेवा कर रही है। भिवंडी, महाराष्ट्र में NABL-मान्यता प्राप्त पर्यावरणीय और विश्लेषणात्मक परीक्षण लैब।<br><br><strong>मुख्य तथ्य:</strong><ul><li>35+ वर्षों का अनुभव</li><li>1000+ परीक्षण पैरामीटर</li><li>400+ ग्राहक</li><li>50+ विशेषज्ञ विश्लेषक</li></ul>`,
        mr: `<strong>SKY-LAB Analytical Laboratory</strong> 1991 पासून उद्योगाची सेवा करत आहे. भिवंडी, महाराष्ट्र येथे NABL-मान्यताप्राप्त पर्यावरणीय आणि विश्लेषणात्मक चाचणी लॅब.<br><br><strong>मुख्य तथ्ये:</strong><ul><li>35+ वर्षांचा अनुभव</li><li>1000+ चाचणी पॅरामीटर्स</li><li>400+ ग्राहक</li><li>50+ तज्ञ विश्लेषक</li></ul>`
      }
    },

    services: {
      keywords: ['services','what do you do','what do you offer','testing services','capabilities','what tests','list of services','service list','offerings'],
      response: {
        en: `We offer <strong>18 core services</strong>:<br><br><strong>🌿 Environment</strong> — Monitoring, Air, Water, Soil, Noise<br><strong>🍎 Food</strong> — Food Testing, Microbiology<br><strong>🧵 Textile</strong> — Fibre & Fabric, Chemical & Eco<br><strong>📋 Consultancy</strong> — Environmental, MPCB, Safety Audit<br><strong>⚙️ Turnkey</strong> — ETP/STP, RO Plants<br><strong>🎓 Training</strong> — Instrumental, EHS & Fire Safety<br><strong>🔬 R&D</strong> — R&D Centre, Contract Research<br><br>Ask me about any specific one!`,
        hi: `हम <strong>18 मुख्य सेवाएँ</strong> देते हैं:<br><br><strong>🌿 पर्यावरण</strong> — निगरानी, वायु, जल, मिट्टी, ध्वनि<br><strong>🍎 खाद्य</strong> — खाद्य परीक्षण, सूक्ष्मजीव विज्ञान<br><strong>🧵 वस्त्र</strong> — फाइबर, रसायन व इको<br><strong>📋 परामर्श</strong> — पर्यावरणीय, MPCB, सुरक्षा ऑडिट<br><strong>⚙️ टर्नकी</strong> — ETP/STP, RO संयंत्र<br><strong>🎓 प्रशिक्षण</strong> — इंस्ट्रुमेंटल, EHS<br><strong>🔬 अनुसंधान</strong> — R&D, कॉन्ट्रैक्ट रिसर्च`,
        mr: `आम्ही <strong>18 मुख्य सेवा</strong> देतो:<br><br><strong>🌿 पर्यावरण</strong> — देखरेख, हवा, पाणी, माती, ध्वनी<br><strong>🍎 अन्न</strong> — अन्न चाचणी, सूक्ष्मजीवशास्त्र<br><strong>🧵 कापड</strong> — फायबर, रसायन व इको<br><strong>📋 सल्ला</strong> — पर्यावरणीय, MPCB, सुरक्षा ऑडिट<br><strong>⚙️ टर्नकी</strong> — ETP/STP, RO प्रकल्प<br><strong>🎓 प्रशिक्षण</strong> — इन्स्ट्रुमेंटल, EHS<br><strong>🔬 संशोधन</strong> — R&D, कॉन्ट्रॅक्ट रिसर्च`
      }
    },

    environment: {
      keywords: ['environment','environmental','air monitoring','water testing','soil','noise','emission','stack','ambient air','effluent','pollution'],
      response: {
        en: `<strong>Environmental Testing</strong> 🌿<ul><li>Ambient & Stack Air Monitoring</li><li>Water & Wastewater</li><li>Soil Testing</li><li>Noise, Vibration & Illumination</li><li>Environmental Monitoring</li></ul>All tests follow CPCB / MPCB / IS standards.`,
        hi: `<strong>पर्यावरणीय परीक्षण</strong> 🌿<ul><li>परिवेशीय व स्टैक वायु निगरानी</li><li>जल व अपशिष्ट जल</li><li>मिट्टी परीक्षण</li><li>ध्वनि, कंपन व प्रकाश</li></ul>सभी परीक्षण CPCB / MPCB / IS मानकों पर।`,
        mr: `<strong>पर्यावरणीय चाचणी</strong> 🌿<ul><li>हवा व स्टॅक देखरेख</li><li>पाणी व सांडपाणी</li><li>माती चाचणी</li><li>ध्वनी, कंपन व प्रकाश</li></ul>सर्व चाचण्या CPCB / MPCB / IS मानकांनुसार.`
      }
    },

    food: {
      keywords: ['food testing','food test','fssai','nutrition','microbiology','pathogen','shelf life'],
      response: {
        en: `<strong>Food Testing</strong> 🍎<ul><li>Nutritional analysis</li><li>Adulteration detection</li><li>Microbiological testing</li><li>Pesticide residues & heavy metals</li></ul>Turnaround: 3–7 working days. FSSAI-aligned.`,
        hi: `<strong>खाद्य परीक्षण</strong> 🍎<ul><li>पोषण विश्लेषण</li><li>मिलावट पहचान</li><li>सूक्ष्मजीव परीक्षण</li><li>कीटनाशक व भारी धातु</li></ul>समय: 3–7 कार्य दिवस। FSSAI-अनुरूप।`,
        mr: `<strong>अन्न चाचणी</strong> 🍎<ul><li>पोषण विश्लेषण</li><li>भेसळ ओळख</li><li>सूक्ष्मजीव चाचणी</li><li>कीटकनाशक व जड धातू</li></ul>वेळ: 3–7 कामकाजाचे दिवस. FSSAI-अनुरूप.`
      }
    },

    textile: {
      keywords: ['textile','fibre','fabric','cloth','yarn','garment','azo','eco testing'],
      response: {
        en: `<strong>Textile Testing</strong> 🧵<ul><li>Fibre & Fabric — tensile, tear, abrasion, pilling</li><li>Chemical & Eco — azo dyes, formaldehyde, RSL, pH</li></ul>IS / ISO / AATCC compliant.`,
        hi: `<strong>वस्त्र परीक्षण</strong> 🧵<ul><li>फाइबर व फैब्रिक — तन्य, फाड़, घर्षण</li><li>रसायन व इको — एज़ो, फॉर्मल्डिहाइड, RSL</li></ul>IS / ISO / AATCC अनुरूप।`,
        mr: `<strong>कापड चाचणी</strong> 🧵<ul><li>फायबर व फॅब्रिक — तन्य, फाटणे, घर्षण</li><li>रसायन व इको — अॅझो, फॉर्मल्डिहाइड, RSL</li></ul>IS / ISO / AATCC अनुरूप.`
      }
    },

    consultancy: {
      keywords: ['consultancy','consulting','mpcb','consent','environmental clearance','safety audit','energy audit','compliance'],
      response: {
        en: `<strong>Consultancy</strong> 📋<ul><li>Environmental Consultancy</li><li>MPCB Consent Management (CTE/CTO)</li><li>Safety & Energy Audit</li></ul>Hundreds of MPCB consents handled across Maharashtra.`,
        hi: `<strong>परामर्श</strong> 📋<ul><li>पर्यावरणीय परामर्श</li><li>MPCB सहमति प्रबंधन (CTE/CTO)</li><li>सुरक्षा व ऊर्जा ऑडिट</li></ul>महाराष्ट्र में सैकड़ों MPCB सहमतियाँ।`,
        mr: `<strong>सल्ला</strong> 📋<ul><li>पर्यावरणीय सल्ला</li><li>MPCB संमती व्यवस्थापन (CTE/CTO)</li><li>सुरक्षा व ऊर्जा ऑडिट</li></ul>महाराष्ट्रात शेकडो MPCB संमती.`
      }
    },

    turnkey: {
      keywords: ['etp','stp','turnkey','treatment plant','ro plant','water treatment','effluent treatment','sewage'],
      response: {
        en: `<strong>Turnkey Projects</strong> ⚙️<ul><li>ETP & STP design, build, commission</li><li>RO & Water Treatment Plants (5–500+ KLD)</li></ul>Full DPR to handover, including O&M.`,
        hi: `<strong>टर्नकी प्रोजेक्ट</strong> ⚙️<ul><li>ETP व STP डिज़ाइन, निर्माण, कमीशन</li><li>RO व जल उपचार संयंत्र (5–500+ KLD)</li></ul>डीपीआर से हैंडओवर तक।`,
        mr: `<strong>टर्नकी प्रकल्प</strong> ⚙️<ul><li>ETP व STP डिझाइन, बांधकाम, कमिशनिंग</li><li>RO व पाणी प्रक्रिया प्रकल्प (5–500+ KLD)</li></ul>DPR पासून हस्तांतरणापर्यंत.`
      }
    },

    training: {
      keywords: ['training','course','learn','instrument training','ehs','fire safety','workshop'],
      response: {
        en: `<strong>Training</strong> 🎓<ul><li>Analytical Instrumental — AAS, GC, HPLC, UV-Vis</li><li>EHS & Fire Safety</li></ul>Custom programs for technicians & graduates. Certificates issued.`,
        hi: `<strong>प्रशिक्षण</strong> 🎓<ul><li>विश्लेषणात्मक उपकरण — AAS, GC, HPLC</li><li>EHS व अग्नि सुरक्षा</li></ul>प्रमाणपत्र प्रदान।`,
        mr: `<strong>प्रशिक्षण</strong> 🎓<ul><li>विश्लेषणात्मक उपकरणे — AAS, GC, HPLC</li><li>EHS व अग्नि सुरक्षा</li></ul>प्रमाणपत्रे दिली जातात.`
      }
    },

    rnd: {
      keywords: ['r&d','research','development','method development','validation','contract research'],
      response: {
        en: `<strong>R&D Services</strong> 🔬<ul><li>Method development & validation</li><li>Contract research (NDA-protected)</li></ul>Pharma, agri, specialty chemicals, food.`,
        hi: `<strong>R&D सेवाएँ</strong> 🔬<ul><li>विधि विकास व सत्यापन</li><li>अनुबंध अनुसंधान (NDA-संरक्षित)</li></ul>फार्मा, कृषि, रसायन, खाद्य।`,
        mr: `<strong>R&D सेवा</strong> 🔬<ul><li>पद्धत विकास व प्रमाणीकरण</li><li>करार संशोधन (NDA-संरक्षित)</li></ul>फार्मा, कृषी, रसायन, अन्न.`
      }
    },

    certifications: {
      keywords: ['nabl','iso','certification','certificate','accredited','accreditation','iso 17025','approval','govt recognized','government approved'],
      response: {
        en: `<strong>Certifications</strong> 🏆<ul><li>✅ NABL Accredited</li><li>✅ ISO/IEC 17025</li><li>✅ Government Recognized</li></ul>Reports accepted by MPCB, FSSAI, courts, international bodies.`,
        hi: `<strong>प्रमाणपत्र</strong> 🏆<ul><li>✅ NABL मान्यता प्राप्त</li><li>✅ ISO/IEC 17025</li><li>✅ सरकार द्वारा मान्यता प्राप्त</li></ul>रिपोर्ट MPCB, FSSAI, अदालतों द्वारा स्वीकृत।`,
        mr: `<strong>प्रमाणपत्रे</strong> 🏆<ul><li>✅ NABL मान्यताप्राप्त</li><li>✅ ISO/IEC 17025</li><li>✅ शासन मान्यताप्राप्त</li></ul>अहवाल MPCB, FSSAI, न्यायालयांकडून स्वीकारले जातात.`
      }
    },

    contact: {
      keywords: ['contact','phone','call','email','mail','mobile','number','reach','talk to','speak to','helpline'],
      response: {
        en: `<strong>Contact SKY-LAB</strong> 📞<br><br><strong>Phone:</strong><ul><li><a href="tel:9867577309">98675 77309</a></li><li><a href="tel:9867577312">98675 77312</a></li><li><a href="tel:9867577310">98675 77310</a></li></ul><strong>Email:</strong> <a href="mailto:mails@skylabenviro.com">mails@skylabenviro.com</a><br><strong>Web:</strong> <a href="https://skylabenviro.com" target="_blank">skylabenviro.com</a>`,
        hi: `<strong>SKY-LAB से संपर्क</strong> 📞<br><br><strong>फोन:</strong><ul><li><a href="tel:9867577309">98675 77309</a></li><li><a href="tel:9867577312">98675 77312</a></li><li><a href="tel:9867577310">98675 77310</a></li></ul><strong>ईमेल:</strong> <a href="mailto:mails@skylabenviro.com">mails@skylabenviro.com</a>`,
        mr: `<strong>SKY-LAB शी संपर्क</strong> 📞<br><br><strong>फोन:</strong><ul><li><a href="tel:9867577309">98675 77309</a></li><li><a href="tel:9867577312">98675 77312</a></li><li><a href="tel:9867577310">98675 77310</a></li></ul><strong>ईमेल:</strong> <a href="mailto:mails@skylabenviro.com">mails@skylabenviro.com</a>`
      }
    },

    location: {
      keywords: ['location','where','address','office','lab address','map','directions','situated','reach you','visit'],
      response: {
        en: `<strong>Our Location</strong> 📍<br><br>202, CFC-3, Asmita Texpa, Plot No. 1,<br>Additional Kalyan-Bhiwandi Industrial Area,<br>MIDC, Village Kon, Bhiwandi, Thane – 421311<br><br><a href="https://maps.google.com/?q=19.258206,73.103912" target="_blank">📍 Open in Google Maps</a>`,
        hi: `<strong>हमारा पता</strong> 📍<br><br>202, CFC-3, अस्मिता टेक्सपा, प्लॉट नं. 1,<br>अतिरिक्त कल्याण-भिवंडी औद्योगिक क्षेत्र,<br>MIDC, गाँव कोण, भिवंडी, ठाणे – 421311<br><br><a href="https://maps.google.com/?q=19.258206,73.103912" target="_blank">📍 Google Maps में खोलें</a>`,
        mr: `<strong>आमचा पत्ता</strong> 📍<br><br>202, CFC-3, अस्मिता टेक्सपा, प्लॉट क्र. 1,<br>अतिरिक्त कल्याण-भिवंडी औद्योगिक क्षेत्र,<br>MIDC, गाव कोण, भिवंडी, ठाणे – 421311<br><br><a href="https://maps.google.com/?q=19.258206,73.103912" target="_blank">📍 Google Maps उघडा</a>`
      }
    },

    hours: {
      keywords: ['timing','hours','open','close','working hours','visit time','available','when open'],
      response: {
        en: `<strong>Working Hours</strong> 🕒<ul><li>Mon–Fri: 9:30 AM – 6:30 PM</li><li>Sat: 9:30 AM – 2:00 PM</li><li>Sun: Closed</li></ul>Sample pickup on request. Priority testing available.`,
        hi: `<strong>कार्य समय</strong> 🕒<ul><li>सोम–शुक्र: सुबह 9:30 – शाम 6:30</li><li>शनि: सुबह 9:30 – दोपहर 2:00</li><li>रवि: बंद</li></ul>नमूना संग्रह अनुरोध पर।`,
        mr: `<strong>कामाची वेळ</strong> 🕒<ul><li>सोम–शुक्र: सकाळी 9:30 – संध्याकाळी 6:30</li><li>शनि: सकाळी 9:30 – दुपारी 2:00</li><li>रवि: बंद</li></ul>नमुना संकलन विनंतीनुसार.`
      }
    },

    quote: {
      keywords: ['quote','quotation','price','pricing','cost','rate','charges','fees','how much','budget','estimate','proposal'],
      response: {
        en: `<strong>Get a Quote</strong> 💰<br><br>Pricing depends on:<ul><li>Parameters & sample count</li><li>Matrix & turnaround</li></ul>Fastest ways:<ol><li>Call <a href="tel:9867577309">98675 77309</a></li><li>Email <a href="mailto:mails@skylabenviro.com">mails@skylabenviro.com</a></li><li>Use our <a href="#contact">Contact form</a></li></ol><a class="hms-wa-cta" href="https://wa.me/919867577309?text=Hi%20SKY-LAB%2C%20I%20need%20a%20quote" target="_blank">💬 WhatsApp us now</a>`,
        hi: `<strong>कोटेशन प्राप्त करें</strong> 💰<br><br>मूल्य निर्भर करता है:<ul><li>पैरामीटर व नमूना संख्या</li><li>मैट्रिक्स व टर्नअराउंड</li></ul>सबसे तेज़:<ol><li>कॉल <a href="tel:9867577309">98675 77309</a></li><li>ईमेल <a href="mailto:mails@skylabenviro.com">mails@skylabenviro.com</a></li><li><a href="#contact">संपर्क फॉर्म</a></li></ol><a class="hms-wa-cta" href="https://wa.me/919867577309?text=Hi%20SKY-LAB%2C%20I%20need%20a%20quote" target="_blank">💬 WhatsApp करें</a>`,
        mr: `<strong>कोट मिळवा</strong> 💰<br><br>किंमत अवलंबून:<ul><li>पॅरामीटर्स व नमुना संख्या</li><li>मॅट्रिक्स व टर्नअराउंड</li></ul>सर्वात वेगवान:<ol><li>कॉल <a href="tel:9867577309">98675 77309</a></li><li>ईमेल <a href="mailto:mails@skylabenviro.com">mails@skylabenviro.com</a></li><li><a href="#contact">संपर्क फॉर्म</a></li></ol><a class="hms-wa-cta" href="https://wa.me/919867577309?text=Hi%20SKY-LAB%2C%20I%20need%20a%20quote" target="_blank">💬 WhatsApp करा</a>`
      }
    },

    process: {
      keywords: ['process','how do you test','sample','procedure','steps','workflow','how it works','turnaround','tat','time taken','duration'],
      response: {
        en: `<strong>Our Process</strong> 🔬<ol><li>Sample Collection</li><li>Preservation & Login</li><li>Analysis</li><li>QA Verification</li><li>Signed Report</li></ol><strong>Turnaround:</strong><ul><li>Standard: 5–7 days</li><li>Priority: 2–3 days</li><li>Urgent: 24–48 hrs</li></ul>`,
        hi: `<strong>हमारी प्रक्रिया</strong> 🔬<ol><li>नमूना संग्रह</li><li>संरक्षण व लॉगिन</li><li>विश्लेषण</li><li>QA सत्यापन</li><li>हस्ताक्षरित रिपोर्ट</li></ol><strong>समय:</strong><ul><li>मानक: 5–7 दिन</li><li>प्राथमिकता: 2–3 दिन</li><li>अति आवश्यक: 24–48 घंटे</li></ul>`,
        mr: `<strong>आमची प्रक्रिया</strong> 🔬<ol><li>नमुना संकलन</li><li>जतन व नोंदणी</li><li>विश्लेषण</li><li>QA पडताळणी</li><li>स्वाक्षरी अहवाल</li></ol><strong>वेळ:</strong><ul><li>मानक: 5–7 दिवस</li><li>प्राधान्य: 2–3 दिवस</li><li>तातडीचे: 24–48 तास</li></ul>`
      }
    },

    sampleCollection: {
      keywords: ['sample collection','pickup','pick up','collect sample','onsite','on site','field visit','come to site'],
      response: {
        en: `Yes! We offer <strong>on-site sample collection</strong> across Maharashtra. Strict chain-of-custody maintained.<br><br>To schedule: Call <a href="tel:9867577309">98675 77309</a> or WhatsApp us.<br><br><a class="hms-wa-cta" href="https://wa.me/919867577309?text=Hi%20SKY-LAB%2C%20I%20need%20sample%20collection" target="_blank">💬 Schedule via WhatsApp</a>`,
        hi: `हाँ! हम महाराष्ट्र भर में <strong>ऑन-साइट नमूना संग्रह</strong> प्रदान करते हैं।<br><br>शेड्यूल के लिए: कॉल <a href="tel:9867577309">98675 77309</a><br><br><a class="hms-wa-cta" href="https://wa.me/919867577309?text=Hi%20SKY-LAB%2C%20I%20need%20sample%20collection" target="_blank">💬 WhatsApp करें</a>`,
        mr: `हो! आम्ही महाराष्ट्रभर <strong>ऑन-साइट नमुना संकलन</strong> देतो.<br><br>वेळ ठरवण्यासाठी: कॉल <a href="tel:9867577309">98675 77309</a><br><br><a class="hms-wa-cta" href="https://wa.me/919867577309?text=Hi%20SKY-LAB%2C%20I%20need%20sample%20collection" target="_blank">💬 WhatsApp करा</a>`
      }
    },

    technology: {
      keywords: ['instrument','equipment','technology','aas','gc','hplc','uv','spectrophotometer','machine','facility'],
      response: {
        en: `<strong>Our Instruments</strong> 🧪<ul><li>AAS — Atomic Absorption</li><li>GC — Gas Chromatography</li><li>HPLC</li><li>UV-Vis Spectrophotometer</li><li>BOD Incubator</li><li>Sound Level Meter</li></ul>All calibrated under NABL protocols.`,
        hi: `<strong>हमारे उपकरण</strong> 🧪<ul><li>AAS — परमाणु अवशोषण</li><li>GC — गैस क्रोमैटोग्राफी</li><li>HPLC</li><li>UV-Vis स्पेक्ट्रोफोटोमीटर</li><li>BOD इनक्यूबेटर</li><li>साउंड लेवल मीटर</li></ul>`,
        mr: `<strong>आमची उपकरणे</strong> 🧪<ul><li>AAS</li><li>GC</li><li>HPLC</li><li>UV-Vis स्पेक्ट्रोफोटोमीटर</li><li>BOD इनक्युबेटर</li><li>साउंड लेव्हल मीटर</li></ul>`
      }
    },

    industries: {
      keywords: ['industry','industries','clients','sectors','who do you serve','pharma','chemicals','manufacturing'],
      response: {
        en: `We serve: Pharmaceuticals, Chemicals, Infrastructure, Oil & Gas, Manufacturing, Textiles, Food, Logistics, Government.`,
        hi: `हम सेवा देते हैं: फार्मा, रसायन, अवसंरचना, तेल व गैस, विनिर्माण, वस्त्र, खाद्य, लॉजिस्टिक्स, सरकार।`,
        mr: `आम्ही सेवा देतो: फार्मा, रसायन, पायाभूत, तेल व वायू, उत्पादन, कापड, अन्न, लॉजिस्टिक्स, शासन.`
      }
    },

    clients: {
      keywords: ['client list','who are your clients','trusted by','big clients','companies','brands'],
      response: {
        en: `Trusted by Reliance, Tata, TCS, Birla Group, Godrej, L&T, Bharat Petroleum, CEAT, HP, MMRDA and 400+ enterprises.`,
        hi: `रिलायंस, टाटा, TCS, बिड़ला, गोदरेज, L&T, भारत पेट्रोलियम, CEAT, HP, MMRDA और 400+ उद्यमों द्वारा भरोसा।`,
        mr: `रिलायन्स, टाटा, TCS, बिर्ला, गोदरेज, L&T, भारत पेट्रोलियम, CEAT, HP, MMRDA आणि 400+ उद्योगांचा विश्वास.`
      }
    },

    projects: {
      keywords: ['project','projects','case study','work','portfolio','past work'],
      response: {
        en: `<strong>Featured Projects</strong> 📊<ol><li>Industrial Zone Air Quality — Manufacturing</li><li>Municipal Water Quality — Government</li><li>Food Safety Program — Food Industry</li><li>MPCB Compliance — Infrastructure</li><li>Lab Setup — Pharmaceuticals</li></ol>`,
        hi: `<strong>प्रमुख परियोजनाएँ</strong> 📊<ol><li>औद्योगिक क्षेत्र वायु गुणवत्ता</li><li>नगरपालिका जल गुणवत्ता</li><li>खाद्य सुरक्षा कार्यक्रम</li><li>MPCB अनुपालन</li><li>लैब सेटअप — फार्मा</li></ol>`,
        mr: `<strong>प्रमुख प्रकल्प</strong> 📊<ol><li>औद्योगिक क्षेत्र हवा गुणवत्ता</li><li>महानगरपालिका पाणी गुणवत्ता</li><li>अन्न सुरक्षा कार्यक्रम</li><li>MPCB अनुपालन</li><li>लॅब सेटअप — फार्मा</li></ol>`
      }
    },

    nablMeaning: {
      keywords: ['what is nabl','nabl meaning','nabl stands for','nabl full form'],
      response: {
        en: `<strong>NABL</strong> = National Accreditation Board for Testing and Calibration Laboratories. India's apex body (under DST, Govt. of India) that accredits labs against <strong>ISO/IEC 17025</strong>. NABL reports carry legal & regulatory weight.`,
        hi: `<strong>NABL</strong> = राष्ट्रीय परीक्षण और अंशांकन प्रयोगशाला प्रत्यायन बोर्ड। भारत की शीर्ष संस्था जो प्रयोगशालाओं को <strong>ISO/IEC 17025</strong> के अनुसार मान्यता देती है।`,
        mr: `<strong>NABL</strong> = राष्ट्रीय चाचणी व कॅलिब्रेशन प्रयोगशाळा प्रत्यायन मंडळ. भारताची सर्वोच्च संस्था जी प्रयोगशाळांना <strong>ISO/IEC 17025</strong> नुसार मान्यता देते.`
      }
    },

    mpcb: {
      keywords: ['what is mpcb','mpcb meaning','mpcb full form','maharashtra pollution'],
      response: {
        en: `<strong>MPCB</strong> = Maharashtra Pollution Control Board. Industries need <strong>CTE</strong> (before construction), <strong>CTO</strong> (before production), renewals, and annual reports. We handle the full lifecycle.`,
        hi: `<strong>MPCB</strong> = महाराष्ट्र प्रदूषण नियंत्रण बोर्ड। उद्योगों को <strong>CTE</strong>, <strong>CTO</strong>, नवीनीकरण और वार्षिक रिपोर्ट चाहिए। हम पूरा प्रबंधन करते हैं।`,
        mr: `<strong>MPCB</strong> = महाराष्ट्र प्रदूषण नियंत्रण मंडळ. उद्योगांना <strong>CTE</strong>, <strong>CTO</strong>, नूतनीकरण आणि वार्षिक अहवाल आवश्यक. आम्ही संपूर्ण व्यवस्थापन करतो.`
      }
    },

    fssai: {
      keywords: ['what is fssai','fssai meaning','fssai full form','food license'],
      response: {
        en: `<strong>FSSAI</strong> = Food Safety and Standards Authority of India. Our food testing reports support FSSAI license, annual returns, product launches, and import/export.`,
        hi: `<strong>FSSAI</strong> = भारतीय खाद्य संरक्षा और मानक प्राधिकरण। हमारी खाद्य परीक्षण रिपोर्ट FSSAI लाइसेंस, वार्षिक रिटर्न, उत्पाद लॉन्च और आयात/निर्यात के लिए सहायक।`,
        mr: `<strong>FSSAI</strong> = भारतीय अन्न सुरक्षा व मानक प्राधिकरण. आमचे अन्न चाचणी अहवाल FSSAI परवाना, वार्षिक रिटर्न, उत्पादन लॉन्च, आयात/निर्यातसाठी उपयुक्त.`
      }
    },

    thanks: {
      keywords: ['thank','thanks','thx','appreciate','great','awesome','helpful','nice','good job'],
      response: {
        en: `You're most welcome! 😊 <strong>Beyond Testing. Building Trust.</strong>`,
        hi: `आपका स्वागत है! 😊 <strong>परीक्षण से परे। विश्वास का निर्माण।</strong>`,
        mr: `तुमचे स्वागत! 😊 <strong>चाचणीच्या पलीकडे. विश्वासाची निर्मिती.</strong>`
      }
    },

    bye: {
      keywords: ['bye','goodbye','see you','talk later','ciao','exit','close'],
      response: {
        en: `Goodbye! 👋 Reach us at <a href="tel:9867577309">98675 77309</a> or <a href="mailto:mails@skylabenviro.com">mails@skylabenviro.com</a>. Have a great day!`,
        hi: `अलविदा! 👋 <a href="tel:9867577309">98675 77309</a> पर संपर्क करें। आपका दिन शुभ हो!`,
        mr: `निरोप! 👋 <a href="tel:9867577309">98675 77309</a> वर संपर्क करा. तुमचा दिवस चांगला जावो!`
      }
    },

    help: {
      keywords: ['help','what can you do','options','menu','how to use','commands'],
      response: {
        en: `I can help with:<ul><li>🔬 Services</li><li>🏆 Certifications</li><li>📍 Location & contact</li><li>💰 Quotes</li><li>🧪 Instruments</li><li>📋 MPCB / FSSAI</li><li>🚚 Sample collection</li></ul>Just type your question or tap a chip above.`,
        hi: `मैं इनमें मदद कर सकता हूँ:<ul><li>🔬 सेवाएँ</li><li>🏆 प्रमाणपत्र</li><li>📍 स्थान व संपर्क</li><li>💰 कोटेशन</li><li>🧪 उपकरण</li><li>📋 MPCB / FSSAI</li><li>🚚 नमूना संग्रह</li></ul>`,
        mr: `मी यामध्ये मदत करू शकतो:<ul><li>🔬 सेवा</li><li>🏆 प्रमाणपत्रे</li><li>📍 ठिकाण व संपर्क</li><li>💰 कोट</li><li>🧪 उपकरणे</li><li>📋 MPCB / FSSAI</li><li>🚚 नमुना संकलन</li></ul>`
      }
    }
  };

  /* ================= FALLBACKS ================= */
  const FALLBACKS = {
    en: [
      `I'm not sure about that — let me connect you with our team. 📞 <a href="tel:9867577309">98675 77309</a><br><br><a class="hms-wa-cta" href="https://wa.me/919867577309?text=Hi%20SKY-LAB%2C%20I%20have%20a%20question" target="_blank">💬 Ask on WhatsApp</a>`,
      `Hmm, didn't quite catch that. Try:<ul><li>"What services do you offer?"</li><li>"Where are you located?"</li><li>"How do I get a quote?"</li></ul>`,
      `That's outside my knowledge. Our team can help: <a href="tel:9867577309">98675 77309</a> · <a href="mailto:mails@skylabenviro.com">mails@skylabenviro.com</a>`
    ],
    hi: [
      `मुझे इसका पक्का जवाब नहीं पता — आप हमारी टीम से बात करें: 📞 <a href="tel:9867577309">98675 77309</a><br><br><a class="hms-wa-cta" href="https://wa.me/919867577309?text=नमस्ते%20SKY-LAB" target="_blank">💬 WhatsApp पर पूछें</a>`,
      `क्षमा करें, समझ नहीं पाया। पूछें:<ul><li>"कौन सी सेवाएँ हैं?"</li><li>"आप कहाँ स्थित हैं?"</li><li>"कोटेशन कैसे मिलेगा?"</li></ul>`,
      `यह मेरी जानकारी से बाहर है। टीम मदद करेगी: <a href="tel:9867577309">98675 77309</a>`
    ],
    mr: [
      `मला याची खात्री नाही — आमच्या टीमशी बोला: 📞 <a href="tel:9867577309">98675 77309</a><br><br><a class="hms-wa-cta" href="https://wa.me/919867577309?text=नमस्कार%20SKY-LAB" target="_blank">💬 WhatsApp वर विचारा</a>`,
      `माफ करा, समजले नाही. विचारा:<ul><li>"कोणत्या सेवा आहेत?"</li><li>"तुम्ही कुठे आहात?"</li><li>"कोट कसा मिळेल?"</li></ul>`,
      `हे माझ्या माहितीबाहेर आहे. टीम मदत करेल: <a href="tel:9867577309">98675 77309</a>`
    ]
  };

  /* ================= LANGUAGE DETECTION ================= */
  function detectLanguage(text) {
    if (!text) return 'en';
    // Devanagari range: \u0900-\u097F
    const deva = (text.match(/[\u0900-\u097F]/g) || []).length;
    const latin = (text.match(/[a-zA-Z]/g) || []).length;
    if (deva === 0) return 'en';

    // Distinguish Marathi vs Hindi by common markers
    const marathiMarkers = ['आहे','आहात','काय','कुठे','कसे','मला','तुम्ही','नाही','होय','आम्ही','तुमच्या','मराठी','कृपया','धन्यवाद'];
    const hindiMarkers = ['है','हैं','क्या','कहाँ','कैसे','मुझे','आप','नहीं','हाँ','हम','आपके','हिंदी','कृपया','धन्यवाद'];
    let mrScore = 0, hiScore = 0;
    marathiMarkers.forEach(w => { if (text.includes(w)) mrScore++; });
    hindiMarkers.forEach(w => { if (text.includes(w)) hiScore++; });
    if (mrScore > hiScore) return 'mr';
    if (hiScore > mrScore) return 'hi';
    // fallback: Marathi shares many markers with Hindi — default to Hindi
    return 'hi';
  }

  /* ================= INTENT MATCHING ================= */
  function normalize(str) {
    return String(str || '').toLowerCase().replace(/[^\w\s\u0900-\u097F]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function findIntent(text) {
    const t = normalize(text);
    if (!t) return null;
    let best = null, bestScore = 0;
    for (const key in KB) {
      const entry = KB[key];
      if (!entry || !entry.keywords) continue;
      let score = 0;
      for (const kw of entry.keywords) {
        const k = normalize(kw);
        if (!k) continue;
        if (t === k) score += 6;
        else if (t.includes(k)) score += 2 + k.split(' ').length;
        else {
          const words = k.split(' ').filter(w => w.length > 3);
          for (const w of words) if (t.includes(w)) score += 1;
        }
      }
      if (score > bestScore) { bestScore = score; best = entry.response; }
    }
    return bestScore >= 2 ? best : null;
  }

  /* ================= DOM ================= */
  const els = {
    launcher:    document.getElementById('himanshuLauncher'),
    panel:       document.getElementById('himanshuPanel'),
    messages:    document.getElementById('hmsMessages'),
    form:        document.getElementById('hmsForm'),
    input:       document.getElementById('hmsInput'),
    typing:      document.getElementById('hmsTyping'),
    close:       document.getElementById('himanshuClose'),
    minimize:    document.getElementById('himanshuMinimize'),
    quickWrap:   document.getElementById('hmsQuick'),
    backdrop:    document.querySelector('.hms-backdrop'),
    langSelect:  document.getElementById('hmsLang'),
    speakToggle: document.getElementById('hmsSpeakToggle'),
    mic:         document.getElementById('hmsMic'),
    listening:   document.getElementById('hmsListening'),
    listenLang:  document.getElementById('hmsListeningLang'),
    listenCancel:document.getElementById('hmsListeningCancel'),
    status:      document.getElementById('hmsStatus')
  };
  if (!els.launcher || !els.panel) return;

  /* ================= STATE ================= */
  let isOpen = false;
  let hasGreeted = false;
  let currentLang = 'en';         // resolved per message
  let langOverride = 'auto';      // from select
  let speakOn = false;            // voice output
  let recognizing = false;
  let recognition = null;

  /* ================= TIME ================= */
  function now() {
    const d = new Date();
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, '0');
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + m + ' ' + ap;
  }

  /* ================= MESSAGE RENDER ================= */
  function addMessage(html, who = 'bot', lang = 'en') {
    const msg = document.createElement('div');
    msg.className = 'hms-msg hms-' + who;
    const avatar = document.createElement('div');
    avatar.className = 'hms-msg-avatar';
    avatar.textContent = who === 'bot' ? 'H' : 'You';

    const content = document.createElement('div');
    let langTag = '';
    if (who === 'bot' && lang !== 'en') {
      const label = lang === 'hi' ? 'हिंदी' : 'मराठी';
      langTag = ' <span class="hms-msg-lang">' + label + '</span>';
    }
    content.innerHTML = '<div class="hms-msg-bubble">' + html + langTag + '</div>' +
                        '<div class="hms-msg-time">' + now() + '</div>';

    msg.appendChild(avatar);
    msg.appendChild(content);
    els.messages.appendChild(msg);
    els.messages.scrollTop = els.messages.scrollHeight;

    if (who === 'bot' && speakOn && 'speechSynthesis' in window) {
      speak(stripHtml(html), lang);
    }
  }

  function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || '').replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
  }

  /* ================= SPEECH OUTPUT ================= */
  function speak(text, lang) {
    if (!text || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
      u.rate = 0.98;
      u.pitch = 1.05;
      window.speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }

  /* ================= TYPING ================= */
  function showTyping() { els.typing.classList.add('hms-show'); }
  function hideTyping() { els.typing.classList.remove('hms-show'); }

  /* ================= BOT REPLY ================= */
  function botReply(html, lang) {
    showTyping();
    const delay = Math.min(320 + html.length * 6, 1100);
    setTimeout(() => {
      hideTyping();
      addMessage(html, 'bot', lang);
    }, delay);
  }

  /* ================= HANDLE USER ================= */
  function handleUser(text) {
    const clean = String(text || '').trim();
    if (!clean) return;

    // Resolve language
    const resolved = langOverride === 'auto' ? detectLanguage(clean) : langOverride;
    currentLang = resolved;

    addMessage(clean, 'user');

    const intent = findIntent(clean);
    if (intent && intent[resolved]) {
      botReply(intent[resolved], resolved);
    } else if (intent && intent.en) {
      // fall back to English version of the same intent
      botReply(intent.en, 'en');
    } else {
      const pool = FALLBACKS[resolved] || FALLBACKS.en;
      const fb = pool[Math.floor(Math.random() * pool.length)];
      botReply(fb, resolved);
    }
  }

  /* ================= OPEN/CLOSE ================= */
  function openChat() {
    isOpen = true;
    els.panel.classList.add('hms-open');
    els.launcher.classList.add('hms-hidden');
    els.launcher.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    if (!hasGreeted) {
      hasGreeted = true;
      setTimeout(() => {
        const hour = new Date().getHours();
        let greetEn, greetHi, greetMr;
        if (hour < 12) { greetEn = 'Good morning'; greetHi = 'सुप्रभात'; greetMr = 'सुप्रभात'; }
        else if (hour < 17) { greetEn = 'Good afternoon'; greetHi = 'नमस्ते'; greetMr = 'नमस्कार'; }
        else { greetEn = 'Good evening'; greetHi = 'शुभ संध्या'; greetMr = 'शुभ संध्याकाळ'; }
        const hello = `🙏 <strong>${greetEn}!</strong> I'm <strong>Himanshu</strong>, SKY-LAB's AI assistant.<br><br>Ask me anything about our testing services, certifications, or how to get a quote.<br><br><em>आप हिंदी या मराठी में भी पूछ सकते हैं.</em>`;
        addMessage(hello, 'bot', 'en');
      }, 350);
    }
    setTimeout(() => els.input && els.input.focus(), 400);
  }
  function closeChat() {
    isOpen = false;
    els.panel.classList.remove('hms-open');
    els.launcher.classList.remove('hms-hidden');
    els.launcher.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (recognizing && recognition) { try { recognition.stop(); } catch(e){} }
  }

  /* ================= EVENTS ================= */
  els.launcher.addEventListener('click', openChat);
  els.close.addEventListener('click', closeChat);
  els.minimize.addEventListener('click', closeChat);
  if (els.backdrop) els.backdrop.addEventListener('click', closeChat);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeChat();
  });

  els.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = els.input.value;
    if (!val.trim()) return;
    els.input.value = '';
    handleUser(val);
  });

  if (els.quickWrap) {
    els.quickWrap.addEventListener('click', (e) => {
      const chip = e.target.closest('.hms-qchip');
      if (!chip) return;
      // WhatsApp chip special-case
      if (chip.dataset.action === 'whatsapp') {
        const msg = encodeURIComponent(CONFIG.whatsappDefaultMsg);
        window.open('https://wa.me/' + CONFIG.whatsappNumber + '?text=' + msg, '_blank');
        return;
      }
      handleUser(chip.dataset.q || chip.textContent);
    });
  }

  /* ================= LANGUAGE SELECT ================= */
  if (els.langSelect) {
    els.langSelect.addEventListener('change', () => {
      langOverride = els.langSelect.value;
    });
  }

  /* ================= VOICE OUTPUT TOGGLE ================= */
  if (els.speakToggle) {
    els.speakToggle.addEventListener('click', () => {
      speakOn = !speakOn;
      els.speakToggle.classList.toggle('hms-speak-on', speakOn);
      if (!speakOn && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    });
  }

  /* ================= VOICE INPUT (Web Speech API) ================= */
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      recognizing = true;
      els.mic.classList.add('hms-mic-active');
      els.listening.classList.add('hms-show');
      const langName = { en: 'English', hi: 'हिंदी', mr: 'मराठी' };
      els.listenLang.textContent = langName[langOverride === 'auto' ? 'en' : langOverride] || 'English';
      if (els.status) els.status.textContent = 'Listening…';
    };

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      els.listening.classList.remove('hms-show');
      els.mic.classList.remove('hms-mic-active');
      if (els.status) els.status.textContent = 'SKY-LAB AI · Online';
      if (transcript && transcript.trim()) handleUser(transcript);
    };

    recognition.onerror = (e) => {
      recognizing = false;
      els.mic.classList.remove('hms-mic-active');
      els.listening.classList.remove('hms-show');
      if (els.status) els.status.textContent = 'SKY-LAB AI · Online';
      const err = e.error || 'unknown';
      if (err === 'not-allowed') {
        addMessage('🎙️ Microphone access was blocked. Please allow it in your browser settings, or just type your question.', 'bot');
      } else if (err === 'no-speech') {
        addMessage('I didn\'t hear anything. Try again, or type your question.', 'bot');
      }
    };

    recognition.onend = () => {
      recognizing = false;
      els.mic.classList.remove('hms-mic-active');
      els.listening.classList.remove('hms-show');
      if (els.status) els.status.textContent = 'SKY-LAB AI · Online';
    };

    els.mic.addEventListener('click', () => {
      if (recognizing) { try { recognition.stop(); } catch(e){} return; }
      // Set recognition language based on selector (or English)
      const map = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN' };
      recognition.lang = map[langOverride === 'auto' ? 'en' : langOverride] || 'en-IN';
      try { recognition.start(); } catch (err) { /* already started */ }
    });

    els.listenCancel.addEventListener('click', () => {
      try { recognition.stop(); } catch(e){}
    });

  } else {
    // No support — disable mic gracefully
    if (els.mic) {
      els.mic.setAttribute('disabled', 'true');
      els.mic.setAttribute('title', 'Voice input not supported in this browser');
      els.mic.addEventListener('click', (e) => {
        e.preventDefault();
        addMessage('🎙️ Voice input isn\'t supported in this browser. Please try Chrome, Edge, or Safari. You can always type your question below!', 'bot');
      });
    }
  }

  /* ================= SHORTCUT: press "/" to open ================= */
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !isOpen &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openChat();
    }
  });

  /* ================= SESSION NUDGE ================= */
  try {
    if (!sessionStorage.getItem('hms_nudged_v2')) {
      setTimeout(() => {
        if (!isOpen) {
          sessionStorage.setItem('hms_nudged_v2', '1');
          const label = els.launcher.querySelector('.hms-launcher-label');
          if (label) {
            const orig = label.textContent;
            label.textContent = 'Need help? Ask Himanshu';
            setTimeout(() => { label.textContent = orig; }, 5000);
          }
        }
      }, 25000);
    }
  } catch (err) {}

})();