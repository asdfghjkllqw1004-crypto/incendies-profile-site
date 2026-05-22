import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CalendarDays, MapPin, Users, Sparkles, X, Ticket, Flame } from "lucide-react";

const RESERVATION_URL = "https://smore.im/form/Z5epq9G2fj";
const PROFILE_ICON_SIZE = 88;
const PROFILE_ICON_FONT_SIZE = 30;
const CARD_MEDIA_HEIGHT = 126;
const CARD_MIN_HEIGHT = 248;
const CARD_BODY_MIN_HEIGHT = 58;
const DEFAULT_IMAGE_POSITION = "center 18%";

const rehearsalPhotos = [
  {
    title: "연습 사진",
    caption: "무대가 되기 전의 시간",
    image: "/images/rehearsal-main.jpg",
    size: "large",
  },
  ...Array.from({ length: 6 }, (_, index) => ({
    title: `장면 연습 ${index + 1}`,
    caption: "장면의 감정과 움직임을 쌓아가는 순간",
    image: `/images/rehearsal-scene-${index + 1}.jpg`,
  })),
  ...Array.from({ length: 2 }, (_, index) => ({
    title: `스텝 회의 ${index + 1}`,
    caption: "무대 뒤에서 공연의 구조를 맞춰가는 순간",
    image: `/images/rehearsal-staff-${index + 1}.jpg`,
  })),
];

const actors = [
  { name: "김선영", role: "배우", character: "의사", quote: "헛걸음 하셨네 여기도 애들은 없어요.", color: "from-stone-900 to-red-950", image: "/images/kim-seon-young.jpg", fallbackImage: "/images/김선영(1).jpg", imagePosition: "center 18%" },
  { name: "김영만", role: "배우", character: "샴세딘", quote: "별들의 침묵이 니안에 있구나", color: "from-zinc-900 to-orange-950", image: "/images/kim-young-man.jpg", fallbackImage: "/images/김영만.jpg", imagePosition: "center 18%" },
  { name: "김종현", role: "배우", character: "니하드 / 랄프 / 민병대", quote: "처음이 어렵지 금방 쉬워져", color: "from-neutral-900 to-red-900", image: "/images/kim-jong-hyun.jpg", fallbackImage: "/images/김종현.jpg", imagePosition: "center 18%" },
  { name: "박다현", role: "배우", character: "어린 나왈", quote: "무슨 일이 있어도 난 널 언제나 사랑할 거야.", color: "from-stone-800 to-amber-950", image: "/images/park-da-hyun.jpg", fallbackImage: "/images/박다현.jpg", imagePosition: "center 18%" },
  { name: "박서연", role: "배우", character: "사우다", quote: "네가 슬플 땐 노래를 불러줄게.", color: "from-zinc-950 to-rose-950", image: "/images/park-seo-yeon.png", fallbackImage: "/images/박서연.png", imagePosition: "center 18%" },
  { name: "박지원", role: "배우", character: "지한 말락", quote: "네 인생이 죄다 네 뺨 위로 흐르고 있어!", color: "from-neutral-950 to-red-950", image: "/images/park-ji-won.jpg", fallbackImage: "/images/박지원.jpg", imagePosition: "center 18%" },
  { name: "엄지원", role: "배우", character: "노년 나왈", quote: "함께 있는 것보다 아름다운 일은 없어.", color: "from-stone-900 to-orange-900", image: "/images/eom-ji-won.jpg", fallbackImage: "/images/엄지원.jpg", imagePosition: "center 18%" },
  { name: "이상엽", role: "배우", character: "시몽", quote: "하나 더하기 하나가, 하나가 될수도있어?", color: "from-zinc-900 to-red-900", image: "/images/lee-sang-yeop.jpg", fallbackImage: "/images/이상엽.jpg", imagePosition: "center 18%" },
  { name: "이수민", role: "배우", character: "앙투완", quote: "아직도 당신 어머님 목소리가 귀에 울리는 것 같아요.", color: "from-neutral-900 to-amber-950", image: "/images/lee-su-min.jpg", fallbackImage: "/images/이수민(1).jpg", imagePosition: "center 18%" },
  { name: "인수민", role: "배우", character: "알퐁스 르벨 / 엘람", quote: "제 친구이기 때문이죠. 제 친구.", color: "from-stone-950 to-red-950", image: "/images/in-su-min.png", fallbackImage: "/images/인수민.png", imagePosition: "center 18%" },
  { name: "전세영", role: "배우", character: "나지라 / 압데사마드", quote: "읽고 쓰고 셈하고 말하는 법을 배워", color: "from-zinc-950 to-orange-950", image: "/images/jeon-se-young.jpg", fallbackImage: "/images/전세영.jpg", imagePosition: "center 18%" },
  { name: "정은상", role: "배우", character: "와합 / 수위 / 남자", quote: "우린 늘 함께 있을거야", color: "from-neutral-950 to-rose-950", image: "/images/jeong-eun-sang.png", fallbackImage: "/images/정은상.png", imagePosition: "center 18%" },
  { name: "최서원", role: "배우", character: "중년 나왈", quote: "그 고통은 내 안에 독처럼 스며있어", color: "from-stone-900 to-red-950", image: "/images/choi-seo-won.jpg", fallbackImage: "/images/최서원.jpg", imagePosition: "center 18%" },
  { name: "최소진", role: "배우", character: "잔느", quote: "엄마의 침묵 속에는 무언가가 있어. 난 그걸 이해하고 싶어.", color: "from-zinc-900 to-amber-950", image: "/images/choi-so-jin.jpg", fallbackImage: "/images/최소진(1).jpg", imagePosition: "center 18%" },
];

const staff = [
  { name: "임지우", role: "기획", quote: "화염을 보러 와주신 관객 여러분 정말 감사합니다.", image: "/images/im-ji-woo.png", fallbackImage: "/images/임지우.png", imagePosition: "center 18%" },
  { name: "박주희", role: "연출", quote: "여러분의 기억 속에 사그라지지 않을 불꽃으로 남길 바랍니다.", image: "/images/park-joo-hee.jpg", fallbackImage: "/images/박주희(1).jpg", imagePosition: "center 18%" },
  { name: "배아현", role: "연출", quote: "여러분의 마음속에 오래도록 타오르는 불꽃으로 남길 바랍니다.", image: "/images/bae-a-hyun.png", fallbackImage: "/images/배아현.png", imagePosition: "center 18%" },
  { name: "전민지", role: "무대감독", quote: "이 뜨거운 불꽃이 어디에 닿게 될지 함께 지켜봐 주세요.", image: "/images/jeon-min-ji.png", fallbackImage: "/images/전민지.png", imagePosition: "center 18%" },
  { name: "민채원", role: "조명", quote: "무대 위 작은 불빛들이 여러분의 마음 속에 불꽃처럼 오래 남길 바랍니다", image: "/images/min-chae-won.png", fallbackImage: "/images/민채원.png", imagePosition: "center 18%" },
  { name: "이수민", role: "음향", quote: "가장 뜨겁게 타오르는 순간을 들려드리겠습니다", image: "/images/lee-su-min-staff.jpg", fallbackImage: "/images/이수민(1).jpg", imagePosition: "center 18%" },
];

function getInitials(name) { return name.slice(0, 2); }

const profileIconClass = "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-black/30 font-semibold leading-none tracking-tight text-stone-100 shadow-inner";

function ProfileInitial({ name, image, fallbackImage, imagePosition = DEFAULT_IMAGE_POSITION }) {
  const [currentImage, setCurrentImage] = useState(image || "");
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setCurrentImage(image || "");
    setImageFailed(false);
  }, [image]);

  const shouldShowImage = Boolean(currentImage) && !imageFailed;

  return (
    <div className={`${profileIconClass} bg-black/20`} style={{ width: `${PROFILE_ICON_SIZE}px`, height: `${PROFILE_ICON_SIZE}px`, minWidth: `${PROFILE_ICON_SIZE}px`, minHeight: `${PROFILE_ICON_SIZE}px`, maxWidth: `${PROFILE_ICON_SIZE}px`, maxHeight: `${PROFILE_ICON_SIZE}px`, flexBasis: `${PROFILE_ICON_SIZE}px`, fontSize: PROFILE_ICON_FONT_SIZE, boxSizing: "border-box", lineHeight: 1 }}>
      {shouldShowImage ? (
        <img src={currentImage} alt={`${name} 프로필 사진`} className="h-full w-full object-cover" style={{ objectPosition: imagePosition }} loading="lazy" decoding="async" onError={() => { if (fallbackImage && currentImage !== fallbackImage) { setCurrentImage(fallbackImage); return; } setImageFailed(true); }} />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}

function RehearsalImageCard({ photo, index, onClick }) {
  const [imageFailed, setImageFailed] = useState(false);
  const isLarge = photo.size === "large";

  useEffect(() => {
    setImageFailed(false);
  }, [photo.image]);

  return (
    <button
      type="button"
      onClick={() => onClick(photo)}
      className={`group relative w-full overflow-hidden border border-white/10 bg-white/[0.05] text-left shadow-2xl shadow-black/30 transition hover:border-red-300/40 ${
        isLarge ? "min-h-[330px] rounded-[2rem]" : "min-h-[185px] rounded-3xl"
      }`}
    >
      {!imageFailed ? (
        <img
          src={photo.image}
          alt={photo.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          style={{ objectPosition: "center center" }}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(135deg,#22100d,#090605_60%,#3f0f0f)]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/10 to-transparent" />

      <span className="absolute right-3 top-3 z-20 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-bold text-white/90 backdrop-blur">
        크게 보기
      </span>

      {imageFailed && (
        <div className="absolute inset-5 flex items-center justify-center rounded-[1.3rem] border border-dashed border-white/20 bg-black/20 text-center backdrop-blur-[1px]">
          <div className="space-y-2 px-5">
            <p className="text-4xl font-black text-white/70">{isLarge ? "+" : index + 1}</p>
            <p className="text-sm font-bold text-white">사진 준비 중</p>
          </div>
        </div>
      )}

      <div className={`absolute left-4 right-4 ${isLarge ? "bottom-5" : "bottom-4"}`}>
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-red-200">Rehearsal</p>
        <h3 className={`${isLarge ? "text-2xl" : "text-base"} font-black leading-tight text-white`}>{photo.title}</h3>
        <p className={`${isLarge ? "mt-2 line-clamp-2" : "mt-1 line-clamp-1"} text-[11px] leading-5 text-stone-300`}>{photo.caption}</p>
      </div>
    </button>
  );
}

function RehearsalModal({ selected, onClose }) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [selected?.image]);

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[430px] overflow-hidden rounded-3xl border border-white/10 bg-[#120d0b] shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full bg-black/50 p-2 text-white transition hover:bg-white/15"
              aria-label="닫기"
            >
              <X size={20} />
            </button>

            <div className="relative h-[560px] max-h-[78vh] overflow-hidden bg-black">
              {!imageFailed ? (
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="h-full w-full object-contain"
                  loading="eager"
                  decoding="async"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-stone-400">
                  사진을 불러올 수 없습니다.
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-red-300">Rehearsal</p>
              <h3 className="text-2xl font-black text-white">{selected.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-300">{selected.caption}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PersonCard({ person, type, onClick }) {
  return (
    <motion.button layout type="button" onClick={() => onClick(person)} whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-2.5 text-left shadow-2xl shadow-black/20 backdrop-blur transition hover:border-red-300/30 hover:bg-white/[0.08]" style={{ minHeight: `${CARD_MIN_HEIGHT}px` }}>
      <div className={`relative mb-2 flex w-full shrink-0 items-center justify-center overflow-hidden rounded-[1.1rem] bg-gradient-to-br ${person.color || "from-stone-900 to-red-950"}`} style={{ height: `${CARD_MEDIA_HEIGHT}px` }}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.24),transparent_28%),radial-gradient(circle_at_65%_75%,rgba(248,113,113,0.25),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <ProfileInitial name={person.name} image={person.image} fallbackImage={person.fallbackImage} imagePosition={person.imagePosition} />
        </div>
        <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between gap-1.5">
          <span className="inline-flex h-6 min-w-[48px] items-center justify-center rounded-full bg-white/12 px-2 text-[10px] font-bold text-stone-100 backdrop-blur">{type}</span>
          <span className="inline-flex h-6 min-w-[54px] items-center justify-center rounded-full bg-red-500/20 px-2 text-[10px] font-bold text-red-100 backdrop-blur">Profile</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col space-y-1" style={{ minHeight: `${CARD_BODY_MIN_HEIGHT}px` }}>
        <p className="text-[11px] leading-4 text-red-200">{person.role}</p>
        <h3 className="truncate text-base font-bold leading-tight text-white">{person.name}</h3>
        {type === "Actor" && <p className="line-clamp-1 text-[11px] leading-4 text-stone-300">{person.character}</p>}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/0 transition group-hover:ring-red-300/40" />
    </motion.button>
  );
}

function ModalProfilePhoto({ selected }) {
  const [currentImage, setCurrentImage] = useState(selected?.image || "");
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setCurrentImage(selected?.image || "");
    setImageFailed(false);
  }, [selected?.image]);

  const shouldShowImage = Boolean(currentImage) && !imageFailed;

  return (
    <div className={`relative h-[430px] overflow-hidden bg-gradient-to-br ${selected.color || "from-stone-900 to-red-950"}`}>
      {shouldShowImage ? (
        <img
          src={currentImage}
          alt={`${selected.name} 프로필 사진`}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: selected.imagePosition || DEFAULT_IMAGE_POSITION }}
          loading="eager"
          decoding="async"
          onError={() => {
            if (selected.fallbackImage && currentImage !== selected.fallbackImage) {
              setCurrentImage(selected.fallbackImage);
              return;
            }
            setImageFailed(true);
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_30%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.32),transparent_35%)]">
          <span className="text-7xl font-black text-white/80">{getInitials(selected.name)}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/18 to-black/10" />
      <div className="absolute bottom-6 left-6 right-6">
        <p className="mb-2 text-sm font-medium text-red-200">{selected.role}</p>
        <h2 className="text-4xl font-black tracking-tight text-white">{selected.name}</h2>
      </div>
    </div>
  );
}

function ProfileModal({ selected, onClose }) {
  return (
    <AnimatePresence>
      {selected && (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0, scale: 0.98 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} onClick={(e) => e.stopPropagation()} className="relative grid max-h-[92vh] w-full max-w-[430px] overflow-y-auto rounded-3xl border border-white/10 bg-[#120d0b] shadow-2xl">
            <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white transition hover:bg-white/15" aria-label="닫기"><X size={20} /></button>
            <ModalProfilePhoto selected={selected} />
            <div className="space-y-6 p-7">
              <div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-300">Character</p><h3 className="text-2xl font-bold text-white">{selected.character || selected.role}</h3></div>
              <blockquote className="rounded-2xl border border-red-300/15 bg-red-500/10 p-5 text-base leading-8 text-red-50">“{selected.quote}”</blockquote>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PerformanceProfilePromoSite() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("actors");
  const [selected, setSelected] = useState(null);
  const [selectedRehearsal, setSelectedRehearsal] = useState(null);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredActors = useMemo(() => actors.filter((person) => `${person.name} ${person.role} ${person.character} ${person.quote}`.toLowerCase().includes(normalizedQuery)), [normalizedQuery]);
  const filteredStaff = useMemo(() => staff.filter((person) => `${person.name} ${person.role} ${person.quote}`.toLowerCase().includes(normalizedQuery)), [normalizedQuery]);
  const currentList = tab === "actors" ? filteredActors : filteredStaff;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-[#0b0807] text-stone-100 shadow-2xl shadow-black/40">
      <section className="relative isolate px-5 py-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(185,28,28,0.45),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.18),transparent_32%),linear-gradient(180deg,#160b08_0%,#0b0807_72%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-red-800/20 blur-3xl" />
        <nav className="mx-auto flex max-w-7xl flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur">
          <div className="flex w-full items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-red-200"><Flame size={20} /></div><div><p className="text-sm font-bold tracking-[0.24em] text-white">INCENDIES</p><p className="text-xs text-stone-400">공연 프로필 아카이브</p></div></div>
          <div className="grid w-full grid-cols-3 gap-2"><a href={RESERVATION_URL} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-red-500 px-3 text-xs font-black text-white transition hover:bg-red-400">예약하기</a><a href="#rehearsal" className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-white/10 bg-white/[0.06] px-3 text-xs font-black text-white transition hover:bg-white/10">연습 사진</a><a href="#profiles" className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-white px-3 text-xs font-black text-stone-950 transition hover:bg-red-100">프로필 보기</a></div>
        </nav>
        <div className="mx-auto grid max-w-7xl items-center gap-10 pb-14 pt-14">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200/20 bg-red-500/10 px-4 py-2 text-sm text-red-100"><Sparkles size={16} /> 배우 · 스텝 공식 프로필</div>
            <div className="space-y-5"><h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white">수원여자대학교<br /><span className="bg-gradient-to-r from-red-200 via-orange-200 to-stone-100 bg-clip-text text-transparent">연기영상과</span></h1><p className="max-w-2xl text-base leading-7 text-stone-300">공연을 만든 배우와 스텝을 담았습니다.<br />프로필 카드를 눌러 확인해보세요.</p></div>
            <div className="flex flex-col gap-3"><a href="#profiles" className="inline-flex items-center justify-center gap-2 rounded-full bg-red-500 px-7 py-4 text-base font-bold text-white shadow-xl shadow-red-950/40 transition hover:bg-red-400"><Users size={19} /> 참여진 프로필 보기</a><a href="#rehearsal" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/10">연습 사진 보기</a><a href={RESERVATION_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/10"><Ticket size={19} /> 예약하러 가기</a></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative"><div className="absolute -inset-5 rounded-[2.5rem] bg-red-700/20 blur-3xl" /><div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/40 backdrop-blur"><div className="min-h-[420px] overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_40%_20%,rgba(254,202,202,0.24),transparent_28%),linear-gradient(135deg,#2b0b08,#090605_55%,#581c1c)] p-6"><div className="flex h-full flex-col justify-between"><div className="flex justify-between text-sm text-red-100/80"><span>Official Archive</span><span>2026</span></div><div className="space-y-4"><div className="h-1 w-24 rounded-full bg-red-200/70" /><h2 className="text-5xl font-black tracking-[-0.06em] text-white">화염</h2><p className="max-w-xs text-sm leading-6 text-stone-300">배우와 스텝의 이름이 하나의 불씨처럼 모여,<br />관객에게 공연의 첫인상을 남깁니다.</p></div><div className="mt-6 grid grid-cols-2 gap-3 pb-1">{["14 Actors", "6 Staff"].map((item) => <div key={item} className="min-w-0 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-center text-sm font-bold leading-none text-stone-100">{item}</div>)}</div></div></div></div></motion.div>
        </div>
      </section>

      <section id="info" className="border-y border-white/10 bg-white/[0.03] px-5 py-8"><div className="mx-auto grid max-w-7xl gap-4"><div className="rounded-3xl border border-white/10 bg-black/20 p-6"><CalendarDays className="mb-4 text-red-200" /><p className="text-xs font-bold uppercase tracking-[0.22em] text-red-200/80">공연 일시</p><div className="mt-3 space-y-1.5 text-white"><p className="text-lg font-black leading-6">5월 29일</p><p className="text-sm leading-6 text-stone-300">19:00</p><p className="pt-2 text-lg font-black leading-6">5월 30일</p><p className="text-sm leading-6 text-stone-300">14:00 · 18:00</p></div></div><div className="rounded-3xl border border-white/10 bg-black/20 p-6"><MapPin className="mb-4 text-red-200" /><p className="text-xs font-bold uppercase tracking-[0.22em] text-red-200/80">공연 장소</p><h3 className="mt-3 text-lg font-black leading-7 text-white">수원여자대학교<br />말리극장</h3></div><div className="rounded-3xl border border-white/10 bg-black/20 p-6"><Ticket className="mb-4 text-red-200" /><p className="text-xs font-bold uppercase tracking-[0.22em] text-red-200/80">예매 / 문의</p><a href={RESERVATION_URL} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center justify-center rounded-full bg-red-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-400">예약하러 가기</a></div></div></section>

      <section id="rehearsal" className="px-5 py-16"><div className="mx-auto max-w-7xl"><div className="mb-10 grid gap-5"><div className="space-y-4"><p className="text-sm font-bold uppercase tracking-[0.35em] text-red-300">Rehearsal</p><h2 className="text-4xl font-black tracking-[-0.04em] text-white sm:text-6xl">연습 사진</h2></div><p className="max-w-2xl text-sm leading-7 text-stone-400">공연이 완성되기 전,<br />배우와 스텝이 함께 쌓아온 시간을 담았습니다.<br />무대 뒤의 과정까지 함께 느껴보세요.</p></div><div className="grid gap-5"><RehearsalImageCard photo={rehearsalPhotos[0]} index={0} onClick={setSelectedRehearsal} /><div className="grid grid-cols-2 gap-3">{rehearsalPhotos.slice(1).map((photo, index) => <RehearsalImageCard key={photo.title} photo={photo} index={index} onClick={setSelectedRehearsal} />)}</div></div></div></section>

      <section id="profiles" className="px-5 py-16"><div className="mx-auto max-w-7xl"><div className="mb-10 flex flex-col justify-between gap-6"><div className="space-y-4"><p className="text-sm font-bold uppercase tracking-[0.35em] text-red-300">Profiles</p><h2 className="text-4xl font-black tracking-[-0.04em] text-white sm:text-6xl">참여진 프로필</h2><p className="max-w-2xl text-base leading-7 text-stone-400">이름을 검색하거나 카드를 눌러<br />역할과 한 줄 문장을 확인할 수 있습니다.</p></div><div className="flex w-full flex-col gap-3"><div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="이름 또는 역할 검색" className="w-full rounded-full border border-white/10 bg-white/[0.06] py-4 pl-12 pr-5 text-sm text-white outline-none placeholder:text-stone-500 focus:border-red-300/50" /></div><div className="grid grid-cols-2 gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1"><button onClick={() => setTab("actors")} className={`rounded-full px-5 py-3 text-sm font-bold transition ${tab === "actors" ? "bg-white text-stone-950" : "text-stone-300 hover:bg-white/10"}`}>배우 14명</button><button onClick={() => setTab("staff")} className={`rounded-full px-5 py-3 text-sm font-bold transition ${tab === "staff" ? "bg-white text-stone-950" : "text-stone-300 hover:bg-white/10"}`}>스텝 6명</button></div></div></div><motion.div layout className="grid grid-cols-2 gap-3"><AnimatePresence mode="popLayout">{currentList.map((person) => <motion.div key={`${person.name}-${person.role}`} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}><PersonCard person={person} type={tab === "actors" ? "Actor" : "Staff"} onClick={setSelected} /></motion.div>)}</AnimatePresence></motion.div>{currentList.length === 0 && <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center text-stone-400">검색 결과가 없습니다. 이름이나 역할을 다시 입력해주세요.</div>}</div></section>

      <section className="px-5 pb-16"><div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-red-200/15 bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.28),transparent_30%),linear-gradient(135deg,#1c0d0a,#090605)] p-8 sm:p-12"><div className="grid gap-8"><div><p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-red-200">For Audience</p><h2 className="text-3xl font-black leading-tight tracking-[-0.04em] text-white">공연을 보기 전,<br />인물들의 얼굴을<br />먼저 만나보세요.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-stone-300">공연 전후로 배우와 스텝을 기억할 수 있는<br />작은 아카이브입니다.</p></div><a href="#profiles" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-black text-stone-950 transition hover:bg-red-100">지금 프로필 보기 <Users size={18} /></a></div></div></section>
      <footer className="border-t border-white/10 px-5 py-10 text-center text-xs leading-6 text-stone-500"><p>© 2026 INCENDIES Profile Archive.</p><p>저희 공연을 보러 와주셔서 감사합니다.</p></footer>
      <ProfileModal selected={selected} onClose={() => setSelected(null)} />
      <RehearsalModal selected={selectedRehearsal} onClose={() => setSelectedRehearsal(null)} />
    </main>
  );
}
