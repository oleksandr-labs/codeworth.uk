"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  variant: string;
  isUk: boolean;
}

type Language = "en" | "uk" | "de" | "fr" | "pl";
type Scenario = "checkin" | "room" | "restaurant" | "concierge";

interface Message {
  role: "guest" | "ai";
  text: string;
  lang?: Language;
}

const CONVERSATIONS: Record<
  Scenario,
  Record<Language, { guest: string; reply: string; followUp?: string; followUpReply?: string }>
> = {
  checkin: {
    en: {
      guest: "Hi, I'd like to check in please. Reservation under Smith.",
      reply: "Welcome to The Grand, Mr. Smith! 🏨 Your Deluxe King room on the 8th floor is ready. Check-in was at 2 PM and you're right on time. May I see your ID and the card used for booking? I've also noted you requested a late checkout — confirmed for 1 PM tomorrow at no extra charge.",
      followUp: "Can I get extra pillows and a wake-up call at 7 AM?",
      followUpReply: "Of course! I'm sending a request to housekeeping for 2 extra pillows right now, and your 7:00 AM wake-up call is set. Is there anything else I can arrange for your stay? 🛏️",
    },
    uk: {
      guest: "Привіт, я хотів би зареєструватися. Бронювання на прізвище Сміт.",
      reply: "Ласкаво просимо до The Grand, пане Сміт! 🏨 Ваш номер Deluxe King на 8-му поверсі готовий. Заїзд був о 14:00 — ви прийшли вчасно. Чи можу я побачити ваше посвідчення особи та картку, використану для бронювання? Також бачу ваш запит на пізній виїзд — підтверджено на 13:00 завтра без додаткових витрат.",
      followUp: "Можна додаткові подушки і дзвінок-будильник о 7 ранку?",
      followUpReply: "Звичайно! Зараз відправляю запит до housekeeping на 2 додаткові подушки, а будильник на 7:00 встановлено. Чи можу я щось ще організувати для вашого перебування? 🛏️",
    },
    de: {
      guest: "Guten Tag, ich möchte einchecken. Reservierung auf den Namen Schmidt.",
      reply: "Willkommen im The Grand, Herr Schmidt! 🏨 Ihr Deluxe-King-Zimmer im 8. Stock ist bereit. Der Check-in beginnt um 14:00 Uhr — Sie sind pünktlich. Darf ich Ihren Ausweis und die Buchungskarte sehen? Ich habe auch Ihren Wunsch nach spätem Checkout notiert — bestätigt für 13:00 Uhr morgen ohne Aufpreis.",
      followUp: "Kann ich zusätzliche Kissen und einen Weckruf um 7 Uhr bekommen?",
      followUpReply: "Natürlich! Ich schicke sofort eine Anfrage an die Hauswirtschaft für 2 zusätzliche Kissen, und Ihr Weckruf um 7:00 Uhr ist eingestellt. Kann ich noch etwas für Ihren Aufenthalt arrangieren? 🛏️",
    },
    fr: {
      guest: "Bonjour, je voudrais m'enregistrer. Réservation au nom de Dupont.",
      reply: "Bienvenue au The Grand, M. Dupont! 🏨 Votre chambre Deluxe King au 8ème étage est prête. L'enregistrement est à 14h00 — vous arrivez à temps. Puis-je voir votre pièce d'identité et la carte utilisée pour la réservation? J'ai également noté votre demande de départ tardif — confirmé pour 13h00 demain sans frais supplémentaires.",
      followUp: "Puis-je avoir des oreillers supplémentaires et un réveil à 7h?",
      followUpReply: "Bien sûr! J'envoie immédiatement une demande à la gouvernante pour 2 oreillers supplémentaires, et votre réveil à 7h00 est réglé. Puis-je organiser autre chose pour votre séjour? 🛏️",
    },
    pl: {
      guest: "Cześć, chciałbym się zameldować. Rezerwacja na nazwisko Kowalski.",
      reply: "Witamy w The Grand, Panie Kowalski! 🏨 Pana pokój Deluxe King na 8. piętrze jest gotowy. Zameldowanie od 14:00 — jest Pan punktualnie. Czy mogę zobaczyć dowód tożsamości i kartę użytą do rezerwacji? Zanotowałem też prośbę o późny wymeldowanie — potwierdzone na 13:00 jutro bez dodatkowych opłat.",
      followUp: "Czy mogę dostać dodatkowe poduszki i budzenie o 7 rano?",
      followUpReply: "Oczywiście! Wysyłam teraz prośbę do obsługi pokojowej o 2 dodatkowe poduszki, a budzenie na 7:00 jest ustawione. Czy mogę jeszcze coś zorganizować na czas Pana pobytu? 🛏️",
    },
  },
  room: {
    en: {
      guest: "The AC in my room isn't working properly, it's too warm.",
      reply: "I'm sorry to hear that, and I completely understand how uncomfortable that can be! 🌡️ I've immediately raised a priority maintenance request for Room 814. Our technician will be with you within 20 minutes. In the meantime, may I offer you a complimentary upgrade to Room 822 on the same floor? It has a park view and is available right now.",
      followUp: "Yes please, I'd take the upgrade.",
      followUpReply: "Perfect! I'm processing the room change now. New key cards for Room 822 will be at the front desk in 5 minutes, and a porter will help you move your luggage. I've also added a complimentary breakfast for tomorrow as an apology. 🔑",
    },
    uk: {
      guest: "Кондиціонер у моєму номері не працює, дуже жарко.",
      reply: "Прошу вибачення — розуміємо, як це незручно! 🌡️ Я негайно відправив пріоритетний запит до технічного обслуговування для номера 814. Наш технік буде у вас протягом 20 хвилин. Тим часом можу запропонувати безкоштовне підвищення класу до номера 822 на тому ж поверсі? Він має вид на парк і зараз вільний.",
      followUp: "Так, погоджуюся на апгрейд.",
      followUpReply: "Чудово! Зараз обробляю зміну номера. Нові ключ-картки для номера 822 будуть на стійці реєстрації за 5 хвилин, а портьє допоможе з багажем. Також додав безкоштовний сніданок на завтра як вибачення. 🔑",
    },
    de: {
      guest: "Die Klimaanlage in meinem Zimmer funktioniert nicht richtig, es ist zu warm.",
      reply: "Es tut mir leid — das ist sehr unangenehm! 🌡️ Ich habe sofort eine Prioritätswartungsanfrage für Zimmer 814 eingereicht. Unser Techniker wird in 20 Minuten bei Ihnen sein. Darf ich Ihnen in der Zwischenzeit ein kostenloses Upgrade auf Zimmer 822 auf derselben Etage anbieten? Es hat Parkblick und ist jetzt frei.",
      followUp: "Ja bitte, ich nehme das Upgrade.",
      followUpReply: "Perfekt! Ich bearbeite den Zimmerwechsel jetzt. Neue Schlüsselkarten für Zimmer 822 sind in 5 Minuten an der Rezeption, und ein Portier hilft Ihnen mit dem Gepäck. Als Entschuldigung habe ich auch ein kostenloses Frühstück für morgen hinzugefügt. 🔑",
    },
    fr: {
      guest: "La climatisation dans ma chambre ne fonctionne pas, il fait trop chaud.",
      reply: "Je suis vraiment désolé — nous comprenons tout à fait l'inconfort! 🌡️ J'ai immédiatement soumis une demande de maintenance prioritaire pour la chambre 814. Notre technicien sera chez vous dans 20 minutes. En attendant, puis-je vous proposer une mise à niveau gratuite vers la chambre 822 au même étage? Elle a vue sur le parc et est disponible maintenant.",
      followUp: "Oui s'il vous plaît, je prends la mise à niveau.",
      followUpReply: "Parfait! Je traite le changement de chambre maintenant. Les nouvelles cartes-clés pour la chambre 822 seront à la réception dans 5 minutes, et un portier vous aidera avec les bagages. J'ai aussi ajouté un petit-déjeuner gratuit pour demain en guise d'excuses. 🔑",
    },
    pl: {
      guest: "Klimatyzacja w moim pokoju nie działa, jest za gorąco.",
      reply: "Przepraszam bardzo — rozumiemy, jak to jest niekomfortowe! 🌡️ Natychmiast złożyłem priorytetowe zgłoszenie do obsługi technicznej dla pokoju 814. Nasz technik będzie u Pana w ciągu 20 minut. Tymczasem czy mogę zaproponować bezpłatny upgrade do pokoju 822 na tym samym piętrze? Ma widok na park i jest teraz wolny.",
      followUp: "Tak, chętnie skorzystam z upgradu.",
      followUpReply: "Świetnie! Przetwarzam zmianę pokoju. Nowe karty kluczowe do pokoju 822 będą na recepcji za 5 minut, a bagażowy pomoże z bagażem. Dodałem też bezpłatne śniadanie na jutro jako przeprosiny. 🔑",
    },
  },
  restaurant: {
    en: {
      guest: "I'd like to book a table for 4 people tonight at 7 PM.",
      reply: "Great choice! 🍽️ I'm checking availability for tonight at 7 PM... I have a lovely corner table for 4 available on our terrace — perfect for this evening's weather. Shall I confirm it? Also, do you have any dietary requirements I should note for the kitchen? We can arrange vegan, gluten-free, or allergy-specific menus.",
      followUp: "Yes please confirm. One person is vegan.",
      followUpReply: "Confirmed! Table 12 on the terrace for 4 at 7:00 PM tonight. 🌿 I've notified our chef about the vegan guest — they'll prepare a dedicated plant-based menu. You'll receive a confirmation SMS shortly. See you tonight!",
    },
    uk: {
      guest: "Хочу забронювати столик на 4 осіб сьогодні о 19:00.",
      reply: "Чудовий вибір! 🍽️ Перевіряю доступність на сьогодні о 19:00... Є гарний кутовий столик на 4 особи на нашій терасі — ідеально для сьогоднішньої погоди. Підтвердити? Також чи є особливі дієтичні вимоги, які я маю передати на кухню? Ми можемо приготувати веганське, безглютенове або алергічне меню.",
      followUp: "Так, підтвердіть будь ласка. Одна особа — веган.",
      followUpReply: "Підтверджено! Столик 12 на терасі на 4 особи о 19:00 сьогодні. 🌿 Я повідомив нашого шеф-кухаря про гостя-вегана — вони підготують спеціальне рослинне меню. Незабаром отримаєте SMS-підтвердження. До зустрічі ввечері!",
    },
    de: {
      guest: "Ich möchte heute Abend um 19 Uhr einen Tisch für 4 Personen reservieren.",
      reply: "Gute Wahl! 🍽️ Ich überprüfe die Verfügbarkeit für heute Abend um 19 Uhr... Es gibt einen schönen Ecktisch für 4 auf unserer Terrasse — perfekt für das heutige Abendwetter. Soll ich bestätigen? Haben Sie Ernährungsanforderungen, die ich für die Küche notieren soll?",
      followUp: "Ja bitte bestätigen. Eine Person ist Veganer.",
      followUpReply: "Bestätigt! Tisch 12 auf der Terrasse für 4 Personen um 19:00 Uhr heute Abend. 🌿 Ich habe unseren Koch über den veganen Gast informiert. Sie erhalten in Kürze eine Bestätigungs-SMS. Bis heute Abend!",
    },
    fr: {
      guest: "Je voudrais réserver une table pour 4 personnes ce soir à 19h.",
      reply: "Excellent choix! 🍽️ Je vérifie les disponibilités pour ce soir à 19h... J'ai une belle table d'angle pour 4 disponible sur notre terrasse — parfaite pour ce soir. Dois-je confirmer? Avez-vous des exigences alimentaires particulières à noter pour la cuisine?",
      followUp: "Oui confirmez s'il vous plaît. Une personne est végane.",
      followUpReply: "Confirmé! Table 12 sur la terrasse pour 4 personnes à 19h ce soir. 🌿 J'ai informé notre chef du convive végane. Vous recevrez un SMS de confirmation sous peu. À ce soir!",
    },
    pl: {
      guest: "Chciałbym zarezerwować stolik dla 4 osób dzisiaj o 19:00.",
      reply: "Świetny wybór! 🍽️ Sprawdzam dostępność na dziś wieczór o 19:00... Mam piękny narożny stolik dla 4 na naszym tarasie — idealny na dzisiejszy wieczór. Potwierdzić? Czy ma Pan jakieś wymagania dietetyczne, które powinienem przekazać kuchni?",
      followUp: "Tak, proszę potwierdzić. Jedna osoba jest weganką.",
      followUpReply: "Potwierdzone! Stolik 12 na tarasie dla 4 osób o 19:00 dziś wieczór. 🌿 Powiadomiłem naszego szefa kuchni o weganinie. Wkrótce otrzyma Pan SMS z potwierdzeniem. Do zobaczenia wieczorem!",
    },
  },
  concierge: {
    en: {
      guest: "What are the best places to visit near the hotel?",
      reply: "I'd love to help with local recommendations! 📍 Within walking distance: (1) The Victoria & Albert Museum — 8 min walk, free entry, world-class design collections; (2) Hyde Park — 5 min, perfect for a morning run; (3) Harrods — 12 min, iconic department store. For dinner tonight I recommend Dishoom (Kensington) — amazing Indian cuisine, book ahead. Shall I arrange a taxi or make a reservation anywhere?",
      followUp: "Yes, please book me a table at Dishoom for 2 tonight.",
      followUpReply: "On it! 📲 I'm contacting Dishoom Kensington now. For 2 guests tonight — what time works best? Also, shall I arrange a taxi there? It's about a 10-minute ride from the hotel.",
    },
    uk: {
      guest: "Що варто відвідати поблизу готелю?",
      reply: "Радий допомогти з рекомендаціями! 📍 Пішки: (1) Музей Вікторії і Альберта — 8 хв, безкоштовно, світовий рівень; (2) Гайд-парк — 5 хв, ідеально для ранкового бігу; (3) Harrods — 12 хв, культовий універмаг. На вечерю рекомендую Dishoom (Кенсінгтон) — неперевершена індійська кухня, краще бронювати заздалегідь. Замовити таксі або столик?",
      followUp: "Так, будь ласка, забронюйте столик у Dishoom на 2 осіб сьогодні.",
      followUpReply: "Вже роблю! 📲 Зв'язуюсь з Dishoom Kensington. На 2 гостей сьогодні — на який час вам зручно? Також замовити таксі? Це приблизно 10 хвилин від готелю.",
    },
    de: {
      guest: "Was sind die besten Sehenswürdigkeiten in der Nähe des Hotels?",
      reply: "Gerne helfe ich mit lokalen Empfehlungen! 📍 Zu Fuß erreichbar: (1) Victoria & Albert Museum — 8 Min., freier Eintritt; (2) Hyde Park — 5 Min., perfekt für einen Morgenlauf; (3) Harrods — 12 Min., das ikonische Kaufhaus. Zum Abendessen empfehle ich Dishoom (Kensington) — außergewöhnliche indische Küche, bitte im Voraus buchen. Soll ich ein Taxi oder eine Reservierung arrangieren?",
      followUp: "Ja, bitte buchen Sie mir einen Tisch bei Dishoom für 2 heute Abend.",
      followUpReply: "Sofort! 📲 Ich kontaktiere jetzt Dishoom Kensington. Für 2 Gäste heute Abend — welche Uhrzeit passt am besten? Soll ich auch ein Taxi arrangieren? Es sind etwa 10 Minuten vom Hotel.",
    },
    fr: {
      guest: "Quels sont les meilleurs endroits à visiter près de l'hôtel?",
      reply: "Je serais ravi de vous aider avec des recommandations locales! 📍 À pied: (1) Musée V&A — 8 min, entrée gratuite; (2) Hyde Park — 5 min, parfait pour un jogging matinal; (3) Harrods — 12 min, le célèbre grand magasin. Pour ce soir je recommande Dishoom (Kensington) — cuisine indienne exceptionnelle, réservez à l'avance. Puis-je organiser un taxi ou une réservation?",
      followUp: "Oui, réservez-moi une table chez Dishoom pour 2 ce soir.",
      followUpReply: "Je m'en occupe! 📲 Je contacte Dishoom Kensington maintenant. Pour 2 personnes ce soir — quelle heure vous convient? Voulez-vous aussi que je réserve un taxi? C'est environ 10 minutes de l'hôtel.",
    },
    pl: {
      guest: "Co warto zwiedzić w pobliżu hotelu?",
      reply: "Chętnie pomogę z lokalnymi rekomendacjami! 📍 W zasięgu spaceru: (1) Muzeum V&A — 8 min piechotą, bezpłatny wstęp; (2) Hyde Park — 5 min, idealne na poranny jogging; (3) Harrods — 12 min, kultowy dom towarowy. Na kolację polecam Dishoom (Kensington) — niesamowita kuchnia indyjska, warto rezerwować wcześniej. Czy mam zamówić taksówkę lub stoliczek?",
      followUp: "Tak, proszę zarezerwować stolik w Dishoom dla 2 osób dziś wieczór.",
      followUpReply: "Już to robię! 📲 Kontaktuję się z Dishoom Kensington. Dla 2 gości dziś wieczór — na którą godzinę? Czy zamówić też taksówkę? To około 10 minut od hotelu.",
    },
  },
};

const LANG_LABELS: Record<Language, string> = {
  en: "🇬🇧 EN",
  uk: "🇺🇦 UK",
  de: "🇩🇪 DE",
  fr: "🇫🇷 FR",
  pl: "🇵🇱 PL",
};

export function AiHospitalityDemo({ isUk }: Props) {
  const [scenario, setScenario] = useState<Scenario>("checkin");
  const [lang, setLang] = useState<Language>("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scenarios: { id: Scenario; en: string; uk: string; emoji: string }[] = [
    { id: "checkin", en: "Check-in", uk: "Заїзд", emoji: "🏨" },
    { id: "room", en: "Room Issue", uk: "Проблема в номері", emoji: "🛏️" },
    { id: "restaurant", en: "Restaurant", uk: "Ресторан", emoji: "🍽️" },
    { id: "concierge", en: "Concierge", uk: "Консьєрж", emoji: "🗺️" },
  ];

  function reset() {
    setMessages([]);
    setStep(0);
  }

  function handleSend() {
    const conv = CONVERSATIONS[scenario][lang];
    if (step === 0) {
      const guestMsg: Message = { role: "guest", text: conv.guest, lang };
      setMessages([guestMsg]);
      setLoading(true);
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "ai", text: conv.reply }]);
        setLoading(false);
        setStep(1);
      }, 1400);
    } else if (step === 1 && conv.followUp) {
      const guestMsg: Message = { role: "guest", text: conv.followUp, lang };
      setMessages((prev) => [...prev, guestMsg]);
      setLoading(true);
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "ai", text: conv.followUpReply ?? "" }]);
        setLoading(false);
        setStep(2);
      }, 1200);
    }
  }

  const conv = CONVERSATIONS[scenario][lang];
  const nextGuestMsg = step === 0 ? conv.guest : step === 1 ? conv.followUp : null;

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
        {isUk ? "AI-Консьєрж Готелю — live демо" : "Hotel AI Concierge — Live Demo"}
      </h2>
      <p className="text-neutral-500 text-sm mb-8">
        {isUk
          ? "Мультимовний голосовий AI для готелів. Оберіть сценарій та мову гостя."
          : "Multilingual voice AI for hotels. Pick a scenario and guest language."}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
              {isUk ? "1. Сценарій" : "1. Scenario"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setScenario(s.id); reset(); }}
                  className={`flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                    scenario === s.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  <span>{s.emoji}</span>
                  <span>{isUk ? s.uk : s.en}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
              {isUk ? "2. Мова гостя" : "2. Guest language"}
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(LANG_LABELS) as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); reset(); }}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    lang === l
                      ? "bg-indigo-600 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>
          </div>

          {nextGuestMsg && step < 2 ? (
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <p className="text-xs font-semibold text-indigo-500 mb-1.5">
                {isUk ? "Наступне повідомлення гостя:" : "Next guest message:"}
              </p>
              <p className="text-sm text-neutral-700 italic">"{nextGuestMsg}"</p>
            </div>
          ) : step >= 2 ? (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
              <p className="text-sm font-semibold text-emerald-700">
                {isUk ? "✓ Діалог завершено" : "✓ Conversation complete"}
              </p>
            </div>
          ) : null}

          {step < 2 ? (
            <button
              onClick={handleSend}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-base hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-70 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isUk ? "AI відповідає..." : "AI is responding..."}
                </>
              ) : (
                <>
                  <span>📨</span>
                  {step === 0
                    ? (isUk ? "Надіслати запит гостя" : "Send Guest Request")
                    : (isUk ? "Продовжити діалог" : "Continue Conversation")}
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => { reset(); }}
              className="w-full py-4 rounded-2xl bg-neutral-100 text-neutral-700 font-bold text-base hover:bg-neutral-200 transition-all"
            >
              🔄 {isUk ? "Спробувати ще раз" : "Try Again"}
            </button>
          )}

          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <p className="text-xs text-indigo-600 font-semibold mb-1">
              {isUk ? "💡 Технологія" : "💡 Technology"}
            </p>
            <p className="text-xs text-neutral-500">
              {isUk
                ? "Whisper (мовлення → текст) → GPT-4o (розуміння + відповідь) → TTS (текст → мовлення). Інтеграція з PMS (Opera), CRM та системою замовлень."
                : "Whisper (speech-to-text) → GPT-4o (understanding + response) → TTS (text-to-speech). Integrates with PMS (Opera), CRM and room ordering systems."}
            </p>
          </div>
        </div>

        {/* Chat window */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden flex flex-col min-h-[420px]">
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-lg">🏨</div>
            <div>
              <p className="text-sm font-bold text-white">The Grand AI Concierge</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400">{isUk ? "онлайн 24/7" : "online 24/7"}</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px]">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <span className="text-4xl mb-3">💬</span>
                <p className="text-sm text-white/40">
                  {isUk ? "Оберіть сценарій та натисніть «Надіслати»" : "Pick a scenario and click Send"}
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "guest" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "guest"
                      ? "bg-indigo-500 text-white rounded-tr-sm"
                      : "bg-white/10 text-white rounded-tl-sm"
                  }`}
                >
                  {msg.role === "ai" && (
                    <p className="text-xs text-indigo-300 font-semibold mb-1">AI Concierge</p>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
