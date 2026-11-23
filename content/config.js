// ============================================================
// config.js — global settings (names, titles, audio options)
// ============================================================
var CONFIG = {
  meetingTitle: "AI Agent Project Sync",   // Teams window + SharePoint list + email subjects
  startClock: "Mon 14:00",                 // clock at the start (changed by {type:"clock"} / skip steps)

  laptopLabel: "Ian’s laptop · organizer",  // label above the left screen
  phoneLabel: "Edward’s phone · owner",     // label above the phone
  phoneOwner: "Edward Lu",                  // shown in the phone inbox header
  phoneInbox: [                             // older emails already in Edward's inbox (background only)
    { from: "Finance Team", subject: "Q4 budget template", preview: "Please use the attached template for…" },
    { from: "Ian Chen", subject: "Slides draft v3", preview: "Here is the latest version of our deck" },
    { from: "IT Service Desk", subject: "Your request has been resolved", preview: "Ticket INC-20931 has been closed" },
  ],

  agentName: "AfterMeet",                   // name of the Gemini Enterprise workflow agent
  listName: "AfterMeet Items",              // SharePoint list name

  // Voice files: audio/<id>.mp3 for every "speak" step that has an id.
  // If a file is missing, the browser's built-in voice reads the line instead.
  useAudioFiles: true,
  audioDir: "audio",

  // Narrator: short voiceover + subtitle bar for the key moments ({type:"narrate"} steps).
  // Press N during playback to turn narration on/off.
  narration: true,
  narrator: { label: "AfterMeet", tts: { edge: "en-US-EmmaNeural", openai: "shimmer" },
              browserVoiceNames: ["Karen", "Google UK English Female", "Emma", "Jenny", "Hazel"], browserVoice: 3, pitch: 1.0, rate: 0.98 },

  watermark: "Concept demo · simulated UI · fictional data",
  endCard: {
    title: "AfterMeet",
    subtitle: "The meeting ends. The work doesn’t.",
    footnote: "An AI Agent that turns meetings into finished work · Group 3",
  },
};
if (typeof module !== "undefined") module.exports = { CONFIG };
