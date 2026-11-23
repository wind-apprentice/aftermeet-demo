// ============================================================
// script.js — the whole demo, step by step (runs top to bottom)
// Step types: see README.md → "Step reference"
// Story (Level 1): Ian, Edward and Neo end their sync. Ian runs @AfterMeet in
// Gemini Enterprise with the transcript, assigns the item nobody owned and
// approves. Owners confirm by email, Edward reports a blocker on Wednesday,
// and on Friday the agenda draft for Monday is waiting in Ian's Drafts.
// ============================================================

var SCRIPT = [
  // ---------- 1. Teams meeting ends ----------
  { type: "left", to: "teams" },
  { type: "join", who: "Ian" }, { type: "join", who: "Edward" }, { type: "join", who: "Neo" },
  { type: "chat_sys", text: "Transcription is on" },
  { type: "speak", id: "01_ian",    who: "Ian",    text: "Let’s wrap up. Edward, can you add the four-hour estimate to slide six by Thursday, and update the cost table by Monday?" },
  { type: "speak", id: "02_edward", who: "Edward", text: "Sure, I’ll do both." },
  { type: "speak", id: "03_ian",    who: "Ian",    text: "Neo, the final demo video with AI voices by Friday?" },
  { type: "speak", id: "04_neo",    who: "Neo",    text: "Yes, Friday works." },
  { type: "speak", id: "05_ian",    who: "Ian",    text: "And someone should check the data policy with IT. Thanks, everyone." },
  { type: "leave", who: "Edward" }, { type: "leave", who: "Neo" }, { type: "leave", who: "Ian" },
  { type: "chat_sys", text: "Meeting ended · transcript ready in the meeting recap" },
  { type: "wait", ms: 800 },

  // ---------- 2. Gemini Enterprise: @AfterMeet ----------
  { type: "clock", t: "Mon 14:35" },
  { type: "left", to: "gemini" },
  { type: "ge_user", text: "@AfterMeet process today’s AI Agent Project Sync", file: "AI Agent Project Sync – Transcript.docx" },
  { type: "ge_typing", ms: 1600 },
  { type: "ge_items", intro: "I found <b>2 decisions</b> and <b>4 action items</b>. Each one quotes the transcript.",
    items: [
      { task: "Add the 4-hour estimate to slide 6", owner: "Edward", due: "Thu 11/26", quote: "Edward, can you add the four-hour estimate to slide six by Thursday…" },
      { task: "Update the cost table", owner: "Edward", due: "Mon 11/30", quote: "…and update the cost table by Monday?" },
      { task: "Final demo video with AI voices", owner: "Neo", due: "Fri 11/27", quote: "Neo, the final demo video with AI voices by Friday?" },
      { task: "Check the data policy with IT", owner: "", due: "", quote: "Someone should check the data policy with IT." },
    ] },
  { type: "ge_ask", id: "owner", title: "Needs your input",
    question: "No owner was named for <b>“Check the data policy with IT”</b>. Who should own it?",
    options: ["Ian", "Edward", "Neo"] },
  { type: "ge_click", id: "owner", option: "Ian" },
  { type: "ge_approve", id: "go", lines: ["Add 4 items to the SharePoint list <i>AfterMeet Items</i>", "Email Edward and Neo to confirm their items"] },
  { type: "ge_click", id: "go", option: "Approve" },
  { type: "ge_agent", html: "✅ Done. 4 items added · 2 confirmation emails sent from your Outlook." },
  { type: "wait", ms: 1200 },

  // ---------- 3. SharePoint list fills ----------
  { type: "left", to: "sharepoint" },
  { type: "sp_row", id: "a1", task: "Add the 4-hour estimate to slide 6", owner: "Edward", due: "Thu 11/26", status: "Pending" },
  { type: "sp_row", id: "a2", task: "Update the cost table", owner: "Edward", due: "Mon 11/30", status: "Pending" },
  { type: "sp_row", id: "a3", task: "Final demo video with AI voices", owner: "Neo", due: "Fri 11/27", status: "Pending" },
  { type: "sp_row", id: "a4", task: "Check the data policy with IT", owner: "Ian", due: "Fri 11/27", status: "Confirmed" },
  { type: "sp_log", t: "Mon 14:36", text: "4 items created from the transcript" },
  { type: "sp_log", t: "Mon 14:36", text: "Ian took “data policy”" },

  // ---------- 4. Edward confirms by email ----------
  { type: "clock", t: "Mon 14:36" },
  { type: "ph_mail", id: "m1", subject: "[AfterMeet] AI Agent Project Sync · Please confirm", preview: "You have 2 action items from today’s meeting",
    body: `Hi Edward, you have <b>2 action items</b> from today’s meeting:
<div class="it"><b>1. Add the 4-hour estimate to slide 6</b><br>Due Thu 26 Nov<br><q>Ian: “Edward, can you add the four-hour estimate to slide six by Thursday…”</q></div>
<div class="it"><b>2. Update the cost table</b><br>Due Mon 30 Nov<br><q>Ian: “…and update the cost table by Monday?”</q></div>
<p class="hint">Reply with <b>OK</b> · a change (e.g. “2 → Tue”) · “not mine”</p>` },
  { type: "ph_open", id: "m1" },
  { type: "wait", ms: 1800 },
  { type: "clock", t: "Mon 14:40" },
  { type: "ph_reply", text: "1 OK, 2 OK" },
  { type: "sp_status", id: "a1", status: "Confirmed" },
  { type: "sp_status", id: "a2", status: "Confirmed" },
  { type: "sp_log", t: "Mon 14:40", text: "Edward confirmed 2 items" },
  { type: "clock", t: "Mon 14:42" },
  { type: "notify", who: "Neo", text: "replied OK to his confirmation email" },
  { type: "sp_status", id: "a3", status: "Confirmed" },
  { type: "sp_log", t: "Mon 14:42", text: "Neo confirmed “demo video”" },
  { type: "toast", text: "✅ Every item has a confirmed owner · Ian sent no messages himself", ms: 2600 },

  // ---------- 5. Wednesday: digest + blocker ----------
  { type: "skip", big: "⏩ Wednesday 09:00", small: "Daily follow-up: one digest per person, only near the deadline", clock: "Wed 09:00" },
  { type: "ph_back" },
  { type: "ph_mail", id: "m2", subject: "[AfterMeet] Your open items · Wed 25 Nov", preview: "Due tomorrow: Add the 4-hour estimate to slide 6",
    body: `<p class="due">Due tomorrow</p>
<div class="it"><b>1. Add the 4-hour estimate to slide 6</b></div>
<p class="sub">Coming up</p>
<div class="it">2. Update the cost table · due Mon 30 Nov</div>
<p class="hint">How is it going? Reply <b>done</b> · <b>on track</b> · <b>blocked</b> + reason</p>` },
  { type: "ph_open", id: "m2" },
  { type: "wait", ms: 1400 },
  { type: "clock", t: "Wed 10:02" },
  { type: "ph_reply", text: "1 blocked: waiting for data from Finance" },
  { type: "sp_status", id: "a1", status: "Blocked" },
  { type: "sp_status", id: "a2", status: "In progress" },
  { type: "sp_log", t: "Wed 10:02", text: "Edward blocked: waiting for Finance", warn: true },
  { type: "wait", ms: 600 },
  { type: "left", to: "outlook" },
  { type: "ol_mail", folder: "Inbox", from: "AfterMeet", subject: "[AfterMeet] 1 blocker in AI Agent Project Sync",
    body: `<p><b>Edward is blocked</b> on “Add the 4-hour estimate to slide 6”.</p><p>Reason: waiting for data from Finance.<br>Due Thu 26 Nov.</p><p class="hint">Open the list · Reply to Edward</p>` },
  { type: "toast", text: "🔔 Ian knows on Wednesday, not at next Monday’s meeting", ms: 2600 },

  // ---------- 6. Friday: done + agenda draft ----------
  { type: "skip", big: "⏩ Friday", small: "", clock: "Fri 16:40" },
  { type: "left", to: "sharepoint" },
  { type: "notify", who: "Neo", text: "marked “demo video” done in the list" },
  { type: "sp_status", id: "a3", status: "Done" },
  { type: "sp_log", t: "Fri 16:40", text: "Neo marked “demo video” done" },
  { type: "sp_status", id: "a4", status: "Done" },
  { type: "sp_log", t: "Fri 16:52", text: "Ian marked “data policy” done" },
  { type: "clock", t: "Fri 17:00" },
  { type: "wait", ms: 600 },
  { type: "left", to: "outlook" },
  { type: "ol_mail", folder: "Drafts", from: "AfterMeet (draft)", subject: "Agenda · AI Agent Project Sync · Mon 30 Nov 14:00",
    body: `<p>Draft agenda built from last week’s list:</p>
<p class="sub">Open from last time</p>
<div class="ag"><span class="pill st-Blocked">Blocked</span>Slide 6 estimate · Edward is waiting for Finance data (since Wed)</div>
<div class="ag"><span class="pill st-In-progress">In progress</span>Cost table · Edward, due Monday</div>
<p class="sub">Done since last time</p>
<div class="ag"><span class="pill st-Done">Done</span>Final demo video with AI voices · Neo</div>
<div class="ag"><span class="pill st-Done">Done</span>Data policy checked with IT · Ian</div>
<p class="hint">Saved to Drafts · Ian reviews and sends</p>` },
  { type: "wait", ms: 3600 },
  { type: "endcard" },
];
if (typeof module !== "undefined") module.exports = { SCRIPT };
