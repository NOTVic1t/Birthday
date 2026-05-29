const CONFIG = {
  // ── BIRTHDAY PERSON ─────────────────────────────────────────
  name: "Hana Yuki",
  age: "25",
  tagline: "A moment woven in light",

  // ── EVENT DETAILS ────────────────────────────────────────────
  date: {
    display: "Saturday, 14 June 2025",
    iso: "2025-06-14T17:00:00",       // countdown target
    time: "17.00 WIB",
    doors: "16.30 WIB",
  },

  venue: {
    name: "The Rooftop at Le Méridien",
    address: "Jl. Jend. Sudirman No.19-20, Jakarta Pusat",
    dresscode: "Blush & Ivory",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521!2d106.8228!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLe+M%C3%A9ridien+Jakarta!5e0!3m2!1sen!2sid!4v1700000000000",
    mapsLink: "https://maps.google.com/?q=Le+Meridien+Jakarta",
  },

  // ── RSVP ─────────────────────────────────────────────────────
  rsvp: {
    whatsapp: "6281234567890",       // no + or spaces
    deadline: "7 June 2025",
    message: "Hi, I'd like to confirm my attendance for Hana's birthday celebration 🌸",
  },

  // ── MUSIC ────────────────────────────────────────────────────
  music: {
    // Replace with your hosted .mp3 / .ogg URL
    url: "https://cdn.pixabay.com/audio/2023/04/11/audio_b2f4f4e6e1.mp3",
    title: "Reverie — Soft Piano",
    autoplay: false,   // browsers block autoplay; user taps to play
  },

  // ── GALLERY (optional placeholder images) ───────────────────
  gallery: [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
  ],

  // ── BRAND ────────────────────────────────────────────────────
  palette: {
    primary:   "#f4c6d0",   // blush rose
    secondary: "#d8b4d8",   // soft lavender
    accent:    "#c9a0c0",   // dusty mauve
    dark:      "#2c1f2e",   // deep plum
    light:     "#fdf6f9",   // near white
    gold:      "#d4af8a",   // warm gold
  },
};
