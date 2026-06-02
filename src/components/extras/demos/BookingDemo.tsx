"use client";

import { useState } from "react";

interface Props {
  variant: string;
  isUk: boolean;
}

const BEAUTY_SERVICES = [
  { id: "brows", label: "Eyebrows", labelUk: "Брови", duration: 60, price: 650 },
  { id: "lashes", label: "Eyelash extension", labelUk: "Нарощування вій", duration: 120, price: 1200 },
  { id: "nails", label: "Manicure", labelUk: "Манікюр", duration: 90, price: 700 },
  { id: "makeup", label: "Evening makeup", labelUk: "Вечірній макіяж", duration: 90, price: 900 },
];

const MASTERS = [
  { id: "olena", name: "Olena K.", nameUk: "Олена К.", specialty: "Brows & Lashes", specialtyUk: "Брови та вії" },
  { id: "maria", name: "Maria S.", nameUk: "Марія С.", specialty: "Nails & Makeup", specialtyUk: "Нігті та макіяж" },
  { id: "anna", name: "Anna P.", nameUk: "Анна П.", specialty: "All services", specialtyUk: "Всі послуги" },
];

const MEDICAL_SPECIALTIES = [
  { id: "therapist", label: "Therapist", labelUk: "Терапевт" },
  { id: "cardio", label: "Cardiologist", labelUk: "Кардіолог" },
  { id: "neuro", label: "Neurologist", labelUk: "Невролог" },
  { id: "derm", label: "Dermatologist", labelUk: "Дерматолог" },
];

const DOCTORS = {
  therapist: [{ id: "koval", name: "Dr. Kovalenko M.", nameUk: "Лікар Коваленко М." }],
  cardio: [{ id: "petr", name: "Dr. Petrenko O.", nameUk: "Лікар Петренко О." }],
  neuro: [{ id: "ivan", name: "Dr. Ivanenko V.", nameUk: "Лікар Іваненко В." }],
  derm: [{ id: "shev", name: "Dr. Shevchenko L.", nameUk: "Лікар Шевченко Л." }],
};

const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const BOOKED_SLOTS = ["10:00", "14:00", "16:00"];

function getNextDays(n: number): string[] {
  const days: string[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  for (let i = 0; i < n; i++) {
    days.push(d.toISOString().split("T")[0]);
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function BeautyBooking({ isUk }: { isUk: boolean }) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [master, setMaster] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const days = getNextDays(10);
  const selectedService = BEAUTY_SERVICES.find((s) => s.id === service);

  const stepLabels = isUk
    ? ["Послуга", "Майстер", "Дата і час", "Контакти"]
    : ["Service", "Master", "Date & Time", "Contacts"];

  if (done) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
          {isUk ? "Запис підтверджено!" : "Booking confirmed!"}
        </h3>
        <p className="text-neutral-500 mb-6">
          {isUk
            ? `${name}, чекаємо вас ${date} о ${time} у майстра ${MASTERS.find((m) => m.id === master)?.[isUk ? "nameUk" : "name"]}`
            : `${name}, we'll see you on ${date} at ${time} with ${MASTERS.find((m) => m.id === master)?.name}`}
        </p>
        <button onClick={() => { setStep(1); setService(""); setMaster(""); setDate(""); setTime(""); setName(""); setPhone(""); setDone(false); }}
          className="px-6 py-2.5 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-colors">
          {isUk ? "Нове бронювання" : "New booking"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
        {isUk ? "Онлайн-запис — Салон краси" : "Online Booking — Beauty Salon"}
      </h2>
      <p className="text-neutral-500 text-sm mb-8">
        {isUk ? "4 кроки: послуга → майстер → дата/час → підтвердження." : "4 steps: service → master → date/time → confirmation."}
      </p>

      <div className="max-w-xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                step === s ? "bg-rose-500 text-white" : step > s ? "bg-rose-100 text-rose-600" : "bg-neutral-100 text-neutral-400"
              }`}>
                {step > s ? "✓" : s}
              </div>
              <span className={`text-xs hidden sm:block ${step >= s ? "text-neutral-700" : "text-neutral-400"}`}>
                {stepLabels[s - 1]}
              </span>
              {s < 4 && <div className={`flex-1 h-0.5 mx-2 ${step > s ? "bg-rose-300" : "bg-neutral-200"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-lg shadow-neutral-100">
          {step === 1 && (
            <div className="space-y-3">
              <p className="font-semibold text-neutral-900 mb-4">{isUk ? "Оберіть послугу" : "Choose a service"}</p>
              {BEAUTY_SERVICES.map((s) => (
                <button key={s.id} onClick={() => { setService(s.id); setStep(2); }}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-neutral-100 hover:border-rose-300 hover:bg-rose-50 transition-all text-left">
                  <div>
                    <p className="font-medium text-neutral-900">{isUk ? s.labelUk : s.label}</p>
                    <p className="text-xs text-neutral-400">{s.duration} {isUk ? "хв" : "min"}</p>
                  </div>
                  <p className="font-bold text-rose-600">{s.price} ₴</p>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="font-semibold text-neutral-900 mb-4">{isUk ? "Оберіть майстра" : "Choose a master"}</p>
              <div className="space-y-3">
                {MASTERS.map((m) => (
                  <button key={m.id} onClick={() => { setMaster(m.id); setStep(3); }}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-neutral-100 hover:border-rose-300 hover:bg-rose-50 transition-all text-left">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold shrink-0">
                      {m.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{isUk ? m.nameUk : m.name}</p>
                      <p className="text-xs text-neutral-400">{isUk ? m.specialtyUk : m.specialty}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="font-semibold text-neutral-900 mb-4">{isUk ? "Оберіть дату" : "Choose date"}</p>
              <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                {days.slice(0, 7).map((d) => {
                  const dayObj = new Date(d);
                  return (
                    <button key={d} onClick={() => setDate(d)}
                      className={`shrink-0 w-14 rounded-xl border py-2 text-center transition-all ${
                        date === d ? "border-rose-500 bg-rose-500 text-white" : "border-neutral-200 text-neutral-700 hover:border-rose-300"
                      }`}>
                      <p className="text-xs">{dayObj.toLocaleDateString(isUk ? "uk-UA" : "en-US", { weekday: "short" })}</p>
                      <p className="text-lg font-bold">{dayObj.getDate()}</p>
                    </button>
                  );
                })}
              </div>
              {date && (
                <>
                  <p className="font-semibold text-neutral-900 mb-3">{isUk ? "Доступний час" : "Available slots"}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((t) => {
                      const booked = BOOKED_SLOTS.includes(t);
                      return (
                        <button key={t} disabled={booked} onClick={() => { setTime(t); setStep(4); }}
                          className={`py-2 rounded-xl border text-sm font-medium transition-all ${
                            booked ? "border-neutral-100 bg-neutral-50 text-neutral-300 cursor-not-allowed" :
                            time === t ? "border-rose-500 bg-rose-500 text-white" :
                            "border-neutral-200 text-neutral-700 hover:border-rose-300"
                          }`}>
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="font-semibold text-neutral-900 mb-4">{isUk ? "Ваші контакти" : "Your contacts"}</p>
              <div className="p-3 bg-rose-50 rounded-xl text-sm text-rose-700 mb-4">
                {selectedService?.[isUk ? "labelUk" : "label"]} • {date} {time} • {MASTERS.find((m) => m.id === master)?.[isUk ? "nameUk" : "name"]}
              </div>
              <input
                type="text"
                placeholder={isUk ? "Ваше ім'я" : "Your name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-rose-400 focus:outline-none text-sm"
              />
              <input
                type="tel"
                placeholder={isUk ? "Телефон" : "Phone"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-rose-400 focus:outline-none text-sm"
              />
              <button
                disabled={!name || !phone}
                onClick={() => setDone(true)}
                className="w-full py-3 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUk ? "Підтвердити запис" : "Confirm booking"}
              </button>
            </div>
          )}
        </div>

        {step > 1 && (
          <button onClick={() => setStep((s) => s - 1)} className="mt-4 text-sm text-neutral-400 hover:text-neutral-600 transition-colors">
            ← {isUk ? "Назад" : "Back"}
          </button>
        )}
      </div>
    </div>
  );
}

function MedicalBooking({ isUk }: { isUk: boolean }) {
  const [step, setStep] = useState(1);
  const [specialty, setSpecialty] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [done, setDone] = useState(false);

  const days = getNextDays(7);

  if (done) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
          {isUk ? "Запис підтверджено!" : "Appointment confirmed!"}
        </h3>
        <p className="text-neutral-500">
          {isUk ? `Очікуємо вас ${date} о ${time}` : `We expect you on ${date} at ${time}`}
        </p>
      </div>
    );
  }

  const doctorList = specialty ? DOCTORS[specialty as keyof typeof DOCTORS] ?? [] : [];

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
        {isUk ? "Онлайн-запис — Медична клініка" : "Online Appointment — Medical Clinic"}
      </h2>
      <p className="text-neutral-500 text-sm mb-8">
        {isUk ? "Спеціалізація → лікар → вільні слоти → підтвердження." : "Specialty → doctor → slots → confirmation."}
      </p>

      <div className="max-w-xl mx-auto">
        <div className="bg-teal-50 rounded-3xl p-6">
          {step === 1 && (
            <div>
              <p className="font-semibold text-teal-900 mb-4">{isUk ? "Оберіть спеціалізацію" : "Choose specialty"}</p>
              <div className="grid grid-cols-2 gap-3">
                {MEDICAL_SPECIALTIES.map((s) => (
                  <button key={s.id} onClick={() => { setSpecialty(s.id); setStep(2); }}
                    className="p-4 rounded-xl bg-white border border-teal-100 hover:border-teal-400 hover:bg-teal-50 transition-all text-left">
                    <p className="font-medium text-teal-900 text-sm">{isUk ? s.labelUk : s.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="font-semibold text-teal-900 mb-4">{isUk ? "Оберіть лікаря" : "Choose a doctor"}</p>
              {doctorList.map((d) => (
                <button key={d.id} onClick={() => { setDoctor(d.id); setStep(3); }}
                  className="w-full p-4 rounded-xl bg-white border border-teal-100 hover:border-teal-400 text-left mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                    {(isUk ? d.nameUk : d.name)[3]}
                  </div>
                  <p className="font-medium text-teal-900 text-sm">{isUk ? d.nameUk : d.name}</p>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="font-semibold text-teal-900 mb-4">{isUk ? "Оберіть дату" : "Choose date"}</p>
              <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
                {days.map((d) => {
                  const dayObj = new Date(d);
                  return (
                    <button key={d} onClick={() => setDate(d)}
                      className={`shrink-0 w-14 rounded-xl border py-2 text-center ${
                        date === d ? "border-teal-600 bg-teal-600 text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-teal-400"
                      }`}>
                      <p className="text-xs">{dayObj.toLocaleDateString(isUk ? "uk-UA" : "en-US", { weekday: "short" })}</p>
                      <p className="text-lg font-bold">{dayObj.getDate()}</p>
                    </button>
                  );
                })}
              </div>
              {date && (
                <>
                  <p className="font-semibold text-teal-900 mb-3">{isUk ? "Доступний час" : "Available slots"}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((t) => {
                      const booked = BOOKED_SLOTS.includes(t);
                      return (
                        <button key={t} disabled={booked} onClick={() => { setTime(t); setDone(true); }}
                          className={`py-2 rounded-xl border text-sm font-medium ${
                            booked ? "bg-neutral-100 text-neutral-300 border-neutral-100 cursor-not-allowed" :
                            "bg-white border-teal-200 text-teal-800 hover:border-teal-500 hover:bg-teal-50"
                          }`}>
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {step > 1 && !done && (
          <button onClick={() => setStep((s) => s - 1)} className="mt-4 text-sm text-neutral-400 hover:text-neutral-600">
            ← {isUk ? "Назад" : "Back"}
          </button>
        )}
      </div>
    </div>
  );
}

export function BookingDemo({ variant, isUk }: Props) {
  if (variant === "medical-booking") return <MedicalBooking isUk={isUk} />;
  return <BeautyBooking isUk={isUk} />;
}
