<template>
  <AppNav :current-page="currentPage" @navigate="navigate" />
  <main>
    <HomePage v-if="currentPage === 'home'" @navigate="navigate" @view-lifestyle="handleViewLifestyle" />
    <ExplorerPage v-else-if="currentPage === 'explorer'" @navigate="navigate" />
    <LifestylePage v-else-if="currentPage === 'insights'" @navigate="navigate" />
    <AboutPage v-else-if="currentPage === 'about'" />
  </main>
  <AppFooter @navigate="navigate" />
</template>

<script setup>
import { ref } from 'vue'
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'
import HomePage from './pages/HomePage.vue'
import ExplorerPage from './pages/ExplorerPage.vue'
import LifestylePage from './pages/LifestylePage.vue'
import AboutPage from './pages/AboutPage.vue'
import { useExplorer } from './composables/useExplorer.js'

const currentPage = ref('home')
const { viewLifestyle, insSchool } = useExplorer()

function navigate(id) {
  currentPage.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleViewLifestyle(id) {
  viewLifestyle(id)
  navigate('insights')
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

:root {
  --bg:#F5F3EF; --s:#fff; --s2:#EFECE7;
  --b:#E0DBD3; --b2:#C8C2B8;
  --ink:#1A1714; --ink2:#524E49; --ink3:#9E9890;
  --blue:#1F6FEB; --blue-s:#E8F1FD; --blue-d:#1558C4;
  --green:#1E9E56; --green-s:#E4F6EC; --green-d:#167840;
  --orange:#E8882A; --orange-s:#FDF0E3; --orange-d:#C46E18;
  --purple:#7C3AED; --red:#D63B3B;
  --r:10px; --r2:6px;
  --sh:0 1px 8px rgba(0,0,0,0.06); --sh-lg:0 6px 28px rgba(0,0,0,0.08);
}

*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
body {
  font-family:'DM Sans',sans-serif;
  background:var(--bg);
  color:var(--ink);
  font-size:15px;
  line-height:1.6;
  overflow-x:hidden;
  display:flex;
  flex-direction:column;
  min-height:100vh;
}
::-webkit-scrollbar { width:4px; }
::-webkit-scrollbar-track { background:transparent; }
::-webkit-scrollbar-thumb { background:var(--b2); border-radius:99px; }

/* wider shared container */
.wrap {
  max-width:1200px;
  margin:0 auto;
  padding:0 24px;
}

.page-container {
  width:100%;
  max-width:1200px;
  margin:0 auto;
  padding-left:24px;
  padding-right:24px;
}

/* ── TRANSITIONS ── */
@keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
.anim-fadeup { animation:fadeUp 0.22s ease both; }
.anim-fadein { animation:fadeIn 0.18s ease both; }

/* ── NAV ── */
nav {
  position:fixed;
  top:0; left:0; right:0;
  z-index:500;
  height:56px;
  background:rgba(245,243,239,0.96);
  backdrop-filter:blur(20px);
  -webkit-backdrop-filter:blur(20px);
  border-bottom:1px solid var(--b);
  display:flex;
  align-items:center;
  padding:0 20px;
}
.nav-brand {
  font-family:'Playfair Display',serif;
  font-size:1rem;
  font-weight:900;
  color:var(--ink);
  display:flex;
  align-items:center;
  gap:8px;
  margin-right:20px;
  cursor:pointer;
}
.nav-gem {
  width:26px;
  height:26px;
  border-radius:6px;
  background:linear-gradient(135deg,var(--blue),var(--green));
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:0.65rem;
  color:#fff;
  font-weight:700;
  letter-spacing:-0.02em;
}
.nav-links { display:flex; align-items:center; gap:1px; flex:1; }
.nl {
  font-size:0.74rem;
  font-weight:600;
  color:var(--ink2);
  padding:5px 11px;
  border-radius:var(--r2);
  cursor:pointer;
  transition:all 0.14s;
}
.nl:hover { background:var(--s2); color:var(--ink); }
.nl.active { background:var(--blue-s); color:var(--blue); }
.nav-right { margin-left:auto; }
.nav-cta {
  background:var(--ink);
  color:#fff;
  font-family:'DM Sans',sans-serif;
  font-size:0.72rem;
  font-weight:700;
  padding:6px 14px;
  border-radius:var(--r2);
  border:none;
  cursor:pointer;
  transition:background 0.14s;
}
.nav-cta:hover { background:var(--blue); }

/* ── MOBILE NAV ── */
.nav-hamburger {
  display:none;
  flex-direction:column;
  gap:4px;
  cursor:pointer;
  padding:6px;
  border:none;
  background:transparent;
  flex-shrink:0;
  margin-left:auto;
}
.nav-hamburger span {
  display:block;
  width:20px;
  height:2px;
  background:var(--ink);
  border-radius:99px;
  transition:all 0.2s;
}
.mobile-nav-drawer {
  display:none;
  position:fixed;
  top:56px; left:0; right:0;
  background:rgba(245,243,239,0.98);
  backdrop-filter:blur(20px);
  border-bottom:1px solid var(--b);
  z-index:400;
  padding:12px 16px 16px;
  flex-direction:column;
  gap:4px;
}
.mobile-nav-drawer.open { display:flex; }
.mobile-nl {
  font-size:0.9rem;
  font-weight:600;
  color:var(--ink2);
  padding:10px 12px;
  border-radius:var(--r2);
  cursor:pointer;
  transition:background 0.12s;
}
.mobile-nl:hover { background:var(--s2); }
.mobile-nl.active { background:var(--blue-s); color:var(--blue); }
.mobile-nav-cta {
  margin-top:6px;
  padding:11px 16px;
  background:var(--ink);
  color:#fff;
  border:none;
  border-radius:var(--r2);
  font-family:'DM Sans',sans-serif;
  font-size:0.84rem;
  font-weight:700;
  cursor:pointer;
  text-align:center;
}

/* ── MAIN ── */
main {
  padding-top:56px;
  width:100%;
  flex:1;
  display:flex;
  flex-direction:column;
}
.page { display:flex; flex-direction:column; flex:1; }

/* ── SHARED ATOMS ── */
.btn {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:5px;
  font-family:'DM Sans',sans-serif;
  font-weight:600;
  font-size:0.78rem;
  padding:8px 16px;
  border-radius:var(--r2);
  cursor:pointer;
  border:none;
  transition:all 0.14s;
  text-decoration:none;
  white-space:nowrap;
}
.btn-p { background:var(--blue); color:#fff; }
.btn-p:hover { background:var(--blue-d); }
.btn-s { background:var(--s); color:var(--ink); border:1.5px solid var(--b); }
.btn-s:hover { border-color:var(--b2); }
.btn-g { background:var(--green); color:#fff; }
.btn-g:hover { background:var(--green-d); }
.btn-gh { background:transparent; color:var(--blue); border:1.5px solid var(--blue); }
.btn-gh:hover { background:var(--blue-s); }
.btn-lg { padding:11px 22px; font-size:0.84rem; }
.btn-sm { padding:5px 11px; font-size:0.7rem; }

.chip {
  display:inline-flex;
  align-items:center;
  font-size:0.62rem;
  font-weight:700;
  letter-spacing:0.04em;
  text-transform:uppercase;
  padding:2px 7px;
  border-radius:99px;
}
.cq { background:#FFF2E0; color:#A05A00; }
.cn { background:#E8F1FD; color:#1558C4; }
.c5 { background:#FCEAEA; color:#791F1F; }
.c4 { background:#FAEEDA; color:#633806; }
.c3 { background:#FFF2E0; color:#A05A00; }
.c2 { background:#EAF3DE; color:#27500A; }
.c1 { background:#E8F1FD; color:#0C447C; }

.page-topbar { background:var(--s); border-bottom:1px solid var(--b); padding:14px 24px; }
.page-title { font-family:'Playfair Display',serif; font-size:1.25rem; font-weight:900; }
.page-sub { font-size:0.71rem; color:var(--ink2); margin-top:1px; }

/* ── GRADE BADGES ── */
.gbadge { display:inline-flex; align-items:center; font-size:0.74rem; font-weight:700; padding:2px 7px; border-radius:4px; }
.gap2 { background:#D1FAE5; color:#065F46; }
.ga { background:#D1FAE5; color:#065F46; }
.gb { background:#DBEAFE; color:#1E40AF; }
.gc { background:#FEF9C3; color:#854D0E; }
.gd { background:#FFE4E6; color:#9F1239; }
.gf { background:#F3F4F6; color:#6B7280; }

/* ── HOME ── */
.hero { background:linear-gradient(150deg,#EBF2FD 0%,var(--bg) 45%,#E5F7EC 100%); padding:56px 0 44px; border-bottom:1px solid var(--b); }
.hero-in { display:grid; grid-template-columns:1fr 360px; gap:40px; align-items:center; }
.hero-ey { font-size:0.66rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--blue); margin-bottom:12px; display:flex; align-items:center; gap:6px; }
.hero-ey::before { content:''; width:14px; height:2px; background:var(--blue); border-radius:99px; }
.hero-h1 { font-family:'Playfair Display',serif; font-size:2.7rem; font-weight:900; line-height:1.1; margin-bottom:12px; letter-spacing:-0.02em; }
.hero-h1 em { color:var(--blue); font-style:italic; }
.hero-sub { font-size:0.88rem; color:var(--ink2); line-height:1.75; margin-bottom:20px; max-width:390px; }
.hero-acts { display:flex; gap:9px; flex-wrap:wrap; }
.hcard { background:var(--s); border-radius:var(--r); box-shadow:var(--sh-lg); border:1px solid var(--b); overflow:hidden; }
.hcard-head { background:var(--s2); padding:10px 14px; border-bottom:1px solid var(--b); display:flex; justify-content:space-between; align-items:center; }
.hcard-title { font-size:0.65rem; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color:var(--ink2); }
.hcard-badge { font-size:0.62rem; font-weight:700; background:var(--blue-s); color:var(--blue); padding:2px 7px; border-radius:99px; }
.hcard-body { padding:10px; }
.hcard-row { display:flex; align-items:center; gap:8px; padding:7px 9px; border-radius:6px; cursor:pointer; transition:background 0.12s; }
.hcard-row:hover { background:var(--s2); }
.hre { font-size:1rem; flex-shrink:0; }
.hri { flex:1; }
.hrn { font-size:0.78rem; font-weight:600; }
.hrs { font-size:0.62rem; color:var(--ink3); margin-top:1px; }
.hrr { text-align:right; }
.hrsc { font-family:'Playfair Display',serif; font-size:1.25rem; font-weight:900; line-height:1; }
.hrbar { width:40px; height:2px; background:var(--b); border-radius:99px; margin-top:5px; overflow:hidden; margin-left:auto; }
.hrbar-f { height:100%; border-radius:99px; }
.hcard-note { margin:0 10px 10px; padding:9px 11px; border-radius:6px; background:var(--s2); border:1px solid var(--b); }
.hcard-note-lbl { font-size:0.6rem; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; color:var(--blue); margin-bottom:2px; }
.hcard-note-txt { font-size:0.73rem; color:var(--ink2); line-height:1.5; }
.how-strip { background:var(--s); border-bottom:1px solid var(--b); }
.how-in { display:grid; grid-template-columns:repeat(3,1fr); }
.how-item { padding:22px 18px; border-right:1px solid var(--b); position:relative; }
.how-item:last-child { border-right:none; }
.how-num { font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:900; color:var(--b); line-height:1; margin-bottom:6px; }
.how-title { font-size:0.84rem; font-weight:700; margin-bottom:3px; }
.how-text { font-size:0.74rem; color:var(--ink2); line-height:1.55; }
.how-icon { position:absolute; top:18px; right:14px; font-size:1.15rem; opacity:0.3; }
.home-mid { padding:40px 0; }
.home-mid-in { display:grid; grid-template-columns:1fr 1fr; gap:36px; align-items:center; }
.home-mid h2 { font-family:'Playfair Display',serif; font-size:1.6rem; font-weight:900; line-height:1.15; margin-bottom:10px; }
.home-mid p { font-size:0.82rem; color:var(--ink2); line-height:1.72; margin-bottom:8px; }
.fc { background:var(--s); border:1px solid var(--b); border-radius:var(--r); padding:11px 13px; display:flex; gap:8px; align-items:flex-start; margin-bottom:6px; }
.fi { font-size:1rem; flex-shrink:0; margin-top:2px; }
.ft { font-size:0.76rem; font-weight:700; margin-bottom:2px; }
.fd { font-size:0.69rem; color:var(--ink2); line-height:1.5; }
.home-cta { background:linear-gradient(135deg,var(--ink),#2C2822); padding:32px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; }
.home-cta h3 { font-family:'Playfair Display',serif; font-size:1.35rem; font-weight:900; color:#fff; line-height:1.2; }
.home-cta p { font-size:0.74rem; color:rgba(255,255,255,0.38); margin-top:2px; }

/* ── EXPLORER ── */
/* keep these generic, wider, and not overly restrictive */
.exp-entry { padding:24px 24px 0; }
.exp-entry-h { text-align:center; margin-bottom:28px; }
.exp-entry-h h2 { font-family:'Playfair Display',serif; font-size:1.5rem; font-weight:900; margin-bottom:6px; }
.exp-entry-h p { font-size:0.82rem; color:var(--ink2); }

.two-paths { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.path-card { background:var(--s); border:1px solid var(--b); border-radius:14px; padding:24px 20px; cursor:pointer; transition:border-color 0.18s,transform 0.18s,box-shadow 0.18s; text-align:center; display:flex; flex-direction:column; align-items:center; }
.path-card:hover { border-color:var(--b2); transform:translateY(-2px); box-shadow:var(--sh-lg); }
.path-card.pc-search:hover { border-color:var(--blue); }
.path-card.pc-guide:hover { border-color:var(--blue); }
.pc-icon { width:44px; height:44px; border-radius:11px; display:flex; align-items:center; justify-content:center; font-size:20px; margin:0 auto 12px; }
.pc-icon.blue { background:var(--blue-s); }
.pc-icon.green { background:var(--blue-s); color:var(--blue); }
.pc-title { font-size:0.92rem; font-weight:700; color:var(--ink); margin-bottom:5px; }
.pc-sub { font-size:0.76rem; color:var(--ink2); line-height:1.55; margin-bottom:14px; }
.pc-btn { display:inline-flex; align-items:center; gap:5px; padding:7px 16px; border-radius:99px; font-size:0.74rem; font-weight:600; border:none; cursor:pointer; transition:all 0.14s; }
.pc-btn.blue { background:var(--blue-s); color:var(--blue); }
.path-card.pc-search:hover .pc-btn.blue { background:var(--blue); color:#fff; }
.pc-btn.green { background:var(--blue-s); color:var(--blue); }
.path-card.pc-guide:hover .pc-btn.green { background:var(--blue); color:#fff; }

.search-path { padding:20px 160px 32px; }
.back-row { display:flex; align-items:center; gap:6px; font-size:0.74rem; font-weight:600; color:var(--ink2); cursor:pointer; margin-bottom:16px; width:fit-content; transition:color 0.12s; }
.back-row:hover { color:var(--blue); }
.srch-row { display:flex; gap:8px; align-items:center; margin-bottom:10px; }
.srch-wrap { flex:1; display:flex; align-items:center; gap:8px; padding:10px 14px; border:1.5px solid var(--b2); border-radius:var(--r); background:var(--s); transition:border-color 0.13s; }
.srch-wrap:focus-within { border-color:var(--blue); }
.srch-wrap input { flex:1; border:none; background:transparent; font-size:0.84rem; color:var(--ink); outline:none; font-family:'DM Sans',sans-serif; }
.srch-wrap input::placeholder { color:var(--ink3); }
.filter-tog { display:flex; align-items:center; gap:6px; padding:10px 14px; border:1.5px solid var(--b); border-radius:var(--r); font-size:0.74rem; font-weight:600; color:var(--ink2); background:var(--s); cursor:pointer; transition:all 0.13s; white-space:nowrap; flex-shrink:0; }
.filter-tog.open { border-color:var(--blue); color:var(--blue); background:var(--blue-s); }
.f-badge { background:var(--orange-s); color:var(--orange-d); border-radius:99px; font-size:0.6rem; font-weight:700; padding:1px 5px; }
.filter-panel { background:var(--s); border:1px solid var(--b); border-radius:var(--r); overflow:hidden; max-height:0; transition:max-height 0.26s cubic-bezier(0.22,1,0.36,1); margin-bottom:0; }
.filter-panel.open { max-height:160px; margin-bottom:10px; }
.fp-inner { padding:14px 16px; display:flex; gap:20px; flex-wrap:wrap; }
.fp-sec { display:flex; flex-direction:column; gap:6px; }
.fp-lbl { font-size:0.64rem; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; color:var(--ink2); }
.fp-tiles { display:flex; gap:5px; flex-wrap:wrap; }
.fp-tile { padding:5px 12px; border:1px solid var(--b); border-radius:99px; cursor:pointer; font-size:0.73rem; font-weight:500; color:var(--ink2); background:var(--s); transition:all 0.11s; white-space:nowrap; }
.fp-tile:hover { border-color:var(--b2); color:var(--ink); }
.fp-tile .ti { font-size:12px; margin-right:3px; }
.fp-tile.sel-both { background:var(--s2); border-color:var(--b2); color:var(--ink); }
.fp-tile.sel-qld { background:#FFF2E0; border-color:#A05A00; color:#A05A00; }
.fp-tile.sel-nsw { background:#E8F1FD; border-color:#1558C4; color:#1558C4; }
.fp-tile.sel-rem { background:var(--s2); border-color:var(--b2); color:var(--ink); font-weight:600; }
.fp-tile.sel-perm { background:var(--green-s); border-color:var(--green-d); color:var(--green-d); }
.fp-tile.sel-temp { background:var(--blue-s); border-color:var(--blue-d); color:var(--blue-d); }
.sort-row { display:flex; align-items:center; gap:7px; margin-bottom:14px; flex-wrap:wrap; }
.sort-lbl { font-size:0.69rem; color:var(--ink3); flex-shrink:0; }
.sort-pill { padding:4px 11px; border:1px solid var(--b); border-radius:99px; font-size:0.72rem; font-weight:500; color:var(--ink2); cursor:pointer; transition:all 0.11s; background:var(--s); white-space:nowrap; }
.sort-pill:hover { border-color:var(--b2); color:var(--ink); }
.sort-pill.active { background:var(--ink); color:#fff; border-color:var(--ink); }

.guide-path { padding:24px 160px 40px; }
.guide-progress { margin-bottom:24px; }
.gp-track { height:3px; background:var(--b); border-radius:99px; overflow:hidden; margin-bottom:8px; }
.gp-fill { height:100%; background:var(--green); border-radius:99px; transition:width 0.4s cubic-bezier(0.22,1,0.36,1); }
.gp-labels { display:flex; justify-content:space-between; }
.gp-label { font-size:0.66rem; color:var(--ink3); transition:color 0.2s; }
.gp-label.done { color:var(--green-d); font-weight:600; }
.gp-label.active { color:var(--ink); font-weight:600; }
.guide-q-wrap { position:relative; min-height:280px; }
.guide-q { padding:4px 0; }
.gq-label { font-size:0.68rem; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; color:var(--ink2); margin-bottom:8px; }
.gq-text { font-size:1rem; font-weight:600; color:var(--ink); margin-bottom:16px; line-height:1.4; }
.gq-opts { display:flex; flex-direction:column; gap:6px; }
.gq-opt { display:flex; align-items:center; gap:10px; padding:11px 14px; border:1px solid var(--b); border-left:3px solid transparent; border-radius:var(--r2); cursor:pointer; transition:border-color 0.14s,background 0.14s; background:var(--s); }
.gq-opt:hover { border-color:var(--b2); background:var(--s2); }
.gq-opt.sel { border-left-color:var(--green); background:var(--green-s); }
.gq-opt.sel .gqo-title { color:var(--green-d); }
.gqo-icon { font-size:18px; flex-shrink:0; width:28px; text-align:center; }
.gqo-title { font-size:0.82rem; font-weight:600; color:var(--ink); }
.gqo-sub { font-size:0.7rem; color:var(--ink2); margin-top:1px; }
.guide-footer { margin-top:16px; display:flex; justify-content:space-between; align-items:center; }
.gf-skip { font-size:0.72rem; color:var(--ink3); cursor:pointer; transition:color 0.12s; }
.gf-skip:hover { color:var(--ink2); }
.gf-next { padding:8px 20px; background:var(--green); color:#fff; border:none; border-radius:99px; font-family:'DM Sans',sans-serif; font-size:0.78rem; font-weight:700; cursor:pointer; transition:all 0.14s; opacity:0.35; pointer-events:none; }
.gf-next.ready { opacity:1; pointer-events:all; }
.gf-next.ready:hover { background:var(--green-d); }

.guide-q-enter-active, .guide-q-leave-active { transition:opacity 0.2s ease, transform 0.2s ease; }
.guide-q-enter-from { opacity:0; transform:translateY(6px); }
.guide-q-leave-to { opacity:0; transform:translateY(-6px); }

.results-zone { margin-top:0; }
.r-meta { font-size:0.72rem; color:var(--ink3); margin-bottom:8px; }
.r-meta strong { color:var(--ink); font-weight:600; }
.school-list { border:1px solid var(--b); border-radius:var(--r); overflow:hidden; background:var(--s); }
.srow { border-bottom:1px solid var(--b); }
.srow:last-child { border-bottom:none; }
.srow-main { display:flex; align-items:center; gap:10px; padding:10px 10px; cursor:pointer; transition:background 0.11s; }
.srow-main:hover,.srow.open .srow-main { background:var(--s2); }
.srow-left { flex:1; min-width:0; }
.srow-name { font-size:0.85rem; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.srow-meta { font-size:0.68rem; color:var(--ink2); margin-top:2px; display:flex; gap:5px; align-items:center; flex-wrap:wrap; }
.srow-metric { text-align:right; flex-shrink:0; min-width:86px; }
.mv { font-size:0.84rem; font-weight:600; }
.mv-inc { color:var(--green-d); }
.mv-none { font-size:0.69rem; font-weight:400; color:var(--ink3); }
.msub { font-size:0.62rem; color:var(--ink3); margin-top:1px; }
.msub-personalised { display:inline-flex; align-items:center; gap:3px; margin-top:3px; font-size:0.58rem; font-weight:700; color:var(--green-d); }
.srow-acts { display:flex; gap:4px; flex-shrink:0; }
.btn-cmp { font-size:0.67rem; padding:4px 8px; border-radius:var(--r2); border:1px solid var(--b); background:transparent; color:var(--ink2); cursor:pointer; transition:all 0.11s; white-space:nowrap; }
.btn-cmp:hover { border-color:var(--b2); }
.btn-cmp.added { background:var(--green-s); color:var(--green-d); border-color:var(--green-d); }
.btn-exp { font-size:0.67rem; padding:4px 8px; border-radius:var(--r2); border:1px solid var(--blue-s); background:var(--blue-s); color:var(--blue); cursor:pointer; white-space:nowrap; transition:all 0.11s; }
.btn-exp:hover { background:var(--blue); color:#fff; }
.srow-detail { background:var(--s2); border-top:1px solid var(--b); padding:10px; }
.detail-enter-active { animation:fadeIn 0.16s ease; }

.inc-box { background:var(--s); border:1px solid var(--b); border-left:3px solid var(--green); border-radius:0 var(--r2) var(--r2) 0; padding:13px 14px; }
.inc-box-title { font-size:0.64rem; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; color:var(--ink2); margin-bottom:9px; padding-bottom:6px; border-bottom:1px solid var(--b); }
.inc-big { font-family:'Playfair Display',serif; font-size:2rem; font-weight:900; color:var(--green-d); line-height:1; margin-bottom:3px; }
.inc-sublbl { font-size:0.7rem; color:var(--ink3); margin-bottom:10px; }
.inc-rows { display:flex; flex-direction:column; gap:5px; margin-bottom:10px; }
.inc-r { display:flex; gap:8px; align-items:baseline; }
.inc-rk { font-size:0.68rem; color:var(--ink3); min-width:80px; }
.inc-rv { font-size:0.75rem; font-weight:500; }
.inc-rv.good { color:var(--green-d); }
.inc-rv.warn { color:var(--orange-d); }
.inc-src { font-size:0.66rem; color:var(--ink3); font-style:italic; margin-bottom:10px; }
.no-inc { font-size:0.78rem; color:var(--ink3); padding:10px 0; }
.life-lnk { font-size:0.76rem; font-weight:600; color:var(--blue); cursor:pointer; padding-top:8px; border-top:1px solid var(--b); margin-top:2px; }
.life-lnk:hover { text-decoration:underline; }

.cmp-tray { position:fixed; bottom:0; left:0; right:0; z-index:300; background:var(--s); border-top:1px solid var(--b); padding:10px 20px; display:flex; align-items:center; gap:12px; box-shadow:0 -4px 20px rgba(0,0,0,0.06); transform:translateY(100%); transition:transform 0.22s cubic-bezier(0.22,1,0.36,1); }
.cmp-tray.show { transform:translateY(0); }
.tray-enter-active,.tray-leave-active { transition:transform 0.22s cubic-bezier(0.22,1,0.36,1); }
.tray-enter-from,.tray-leave-to { transform:translateY(100%); }
.tray-lbl { font-size:0.7rem; color:var(--ink3); flex-shrink:0; }
.tray-items { display:flex; gap:6px; flex:1; flex-wrap:wrap; }
.tray-item { display:flex; align-items:center; gap:4px; background:var(--s2); border:1px solid var(--b); border-radius:99px; padding:3px 10px; font-size:0.72rem; font-weight:500; }
.tray-x { color:var(--ink3); cursor:pointer; font-size:0.85rem; line-height:1; }
.tray-x:hover { color:var(--red); }
.tray-slot { padding:3px 10px; border:1px dashed var(--b); border-radius:99px; font-size:0.72rem; color:var(--ink3); }
.tray-go { background:var(--ink); color:#fff; border:none; border-radius:var(--r2); padding:6px 16px; font-size:0.76rem; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:background 0.14s; flex-shrink:0; }
.tray-go:hover { background:var(--blue); }
.tray-clear { font-size:0.72rem; color:var(--ink3); cursor:pointer; transition:color 0.12s; flex-shrink:0; }
.tray-clear:hover { color:var(--red); }

#cmp-view { flex:1; }
.cmp-title { font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:900; margin-bottom:4px; }
.cmp-sub-txt { font-size:0.74rem; color:var(--ink2); margin-bottom:16px; }
.cmp-wrap { overflow-x:auto; border-radius:var(--r); border:1px solid var(--b); }
.cmp-tbl { width:100%; border-collapse:collapse; }
.cmp-tbl th { background:var(--s2); padding:10px 12px; font-size:0.7rem; font-weight:700; text-align:left; border-bottom:1px solid var(--b); }
.cmp-tbl td { padding:9px 12px; font-size:0.78rem; border-bottom:1px solid var(--b); }
.cmp-sec td { background:var(--s2); font-size:0.62rem; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color:var(--ink2); padding:6px 12px; }
.cmp-best { background:var(--green-s); color:var(--green-d); font-weight:600; }
.cmp-lo { color:var(--ink2); }

.pagination { display:flex; align-items:center; justify-content:center; gap:4px; padding:16px 0 4px; flex-wrap:wrap; }
.pg-btn { min-width:34px; height:34px; padding:0 10px; border:1px solid var(--b); border-radius:var(--r2); font-size:0.78rem; font-weight:500; color:var(--ink2); background:var(--s); cursor:pointer; transition:all 0.12s; display:flex; align-items:center; justify-content:center; }
.pg-btn:hover:not(:disabled) { border-color:var(--b2); color:var(--ink); }
.pg-btn.active { background:var(--ink); color:#fff; border-color:var(--ink); font-weight:700; }
.pg-btn:disabled { opacity:0.35; cursor:not-allowed; }
.pg-ellipsis { font-size:0.78rem; color:var(--ink3); padding:0 2px; }
.pg-info { font-size:0.71rem; color:var(--ink3); text-align:center; padding-bottom:8px; }

/* ── LIFESTYLE INSIGHTS ── */
.ins-search-bar { position:sticky; top:56px; z-index:100; background:var(--s); border-bottom:1px solid var(--b); padding:12px 160px; display:flex; align-items:center; gap:10px; }
.ins-sw { flex:1; max-width:360px; display:flex; align-items:center; gap:8px; padding:8px 12px; border:1.5px solid var(--b2); border-radius:var(--r); background:var(--s); transition:border-color 0.13s; }
.ins-sw:focus-within { border-color:var(--blue); }
.ins-sw input { flex:1; border:none; background:transparent; font-size:0.84rem; color:var(--ink); outline:none; font-family:'DM Sans',sans-serif; }
.ins-sw input::placeholder { color:var(--ink3); }
.ins-sr { position:absolute; top:calc(100% + 4px); left:0; right:0; max-width:360px; background:var(--s); border:1px solid var(--b); border-radius:var(--r); box-shadow:var(--sh-lg); z-index:200; max-height:260px; overflow-y:auto; }
.ins-sr.show { display:block; }
.ins-sri { padding:9px 12px; cursor:pointer; transition:background 0.1s; border-bottom:1px solid var(--b); }
.ins-sri:last-child { border-bottom:none; }
.ins-sri:hover { background:var(--s2); }
.ins-sri-name { font-size:0.8rem; font-weight:600; }
.ins-sri-sub { font-size:0.66rem; color:var(--ink3); margin-top:1px; }
.ins-clear { font-size:0.72rem; color:var(--ink3); cursor:pointer; padding:2px 4px; }
.ins-clear:hover { color:var(--red); }
.ins-tray-bar { background:var(--blue-s); border-bottom:1px solid #C5D9F9; padding:8px 160px; display:none; align-items:center; gap:8px; flex-wrap:wrap; font-size:0.72rem; }
.ins-tray-bar.show { display:flex; }
.itp-lbl { color:var(--blue-d); font-weight:600; }
.itp-pill { background:var(--s); border:1px solid var(--blue); color:var(--blue); border-radius:99px; padding:2px 10px; font-size:0.7rem; font-weight:600; cursor:pointer; transition:all 0.12s; }
.itp-pill:hover,.itp-pill.active { background:var(--blue); color:#fff; }
.itp-sbs { background:var(--s); border:1px solid var(--b2); color:var(--ink2); border-radius:99px; padding:2px 10px; font-size:0.7rem; font-weight:600; cursor:pointer; transition:all 0.12s; }
.itp-sbs.active { background:var(--ink); color:#fff; border-color:var(--ink); }
.ins-body { padding:20px 160px 40px; flex:1; }
.ins-school-hdr { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:16px; }
.ish-name { font-family:'Playfair Display',serif; font-size:1.35rem; font-weight:900; margin-bottom:5px; }
.ish-meta { font-size:0.7rem; color:var(--ink2); display:flex; gap:5px; align-items:center; flex-wrap:wrap; }
.ish-acts { display:flex; gap:6px; flex-shrink:0; }
.life-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:20px; }
.life-card { background:var(--s); border:1px solid var(--b); border-radius:var(--r); padding:14px; }
.lc-title { font-size:0.68rem; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color:var(--ink2); margin-bottom:10px; }
.lr { display:flex; justify-content:space-between; align-items:baseline; gap:8px; padding:4px 0; border-bottom:1px solid var(--b); }
.lr:last-child { border-bottom:none; }
.lrk { font-size:0.82rem; color:var(--ink3); }
.lrv { font-size:0.88rem; font-weight:500; }
.lrv.good { color:var(--green-d); }
.lrv.warn { color:var(--orange-d); }
.lrv.bad { color:var(--red); }
.lrv.muted { color:var(--ink3); }
.editorial { background:var(--s); border:1px solid var(--b); border-radius:var(--r); padding:20px; }
.editorial-title { font-family:'Playfair Display',serif; font-size:1.15rem; font-weight:900; margin-bottom:4px; }
.editorial-sub { font-size:0.75rem; color:var(--ink3); margin-bottom:16px; }
.to-cols { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.to-col { padding:12px 14px; border-radius:var(--r2); }
.to-col.reg { background:var(--green-s); }
.to-col.city { background:var(--blue-s); }
.to-col-lbl { font-size:0.7rem; font-weight:700; margin-bottom:8px; }
.to-item { font-size:0.73rem; color:var(--ink2); padding:3px 0; display:flex; align-items:center; gap:6px; }
.au { color:var(--green-d); font-weight:700; }
.ad { color:var(--red); font-weight:700; }

.sbs-wrap { overflow-x:auto; border-radius:var(--r); border:1px solid var(--b); }
.sbs-tbl { width:100%; border-collapse:collapse; }
.sbs-tbl th { background:var(--s2); padding:10px 12px; font-size:0.7rem; font-weight:700; text-align:left; border-bottom:1px solid var(--b); }
.sbs-tbl td { padding:8px 12px; font-size:0.76rem; border-bottom:1px solid var(--b); }
.sbs-sec td { background:var(--s2); font-size:0.62rem; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color:var(--ink2); padding:6px 12px; }
.sbs-best { background:var(--green-s); color:var(--green-d); font-weight:600; }
.sbs-lo { color:var(--ink2); }

/* ── ABOUT ── */
.about-body { padding:40px 0 60px; }
.about-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px; }
.about-card { background:var(--s); border:1px solid var(--b); border-radius:var(--r); padding:18px; }
.about-card-title { display:flex; align-items:center; gap:8px; font-size:0.84rem; font-weight:700; margin-bottom:8px; }
.about-card-text { font-size:0.76rem; color:var(--ink2); line-height:1.65; }
.disclaimer { background:#FFF8E7; border:1px solid #F0D080; border-radius:var(--r2); padding:14px 16px; font-size:0.76rem; color:var(--ink2); line-height:1.6; }

/* ── FOOTER ── */
footer { background:var(--ink); color:rgba(255,255,255,0.55); }
.foot-in { display:grid; grid-template-columns:1fr 1fr 1fr; gap:32px; padding:32px 24px; }
.foot-brand { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:900; color:#fff; margin-bottom:5px; }
.foot-dot { color:var(--blue); }
.foot-tag { font-size:0.72rem; line-height:1.55; }
.foot-ct { font-size:0.65rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.4); margin-bottom:8px; }
.foot-links { display:flex; flex-direction:column; gap:4px; }
.foot-links a { font-size:0.76rem; color:rgba(255,255,255,0.55); cursor:pointer; transition:color 0.12s; }
.foot-links a:hover { color:#fff; }
.foot-bottom { display:flex; justify-content:space-between; padding:12px 24px 16px; border-top:1px solid rgba(255,255,255,0.08); font-size:0.68rem; }

/* ── MOBILE ── */
@media(max-width:768px){
  .nav-links,.nav-right { display:none; }
  .nav-hamburger { display:flex; }
  .wrap,
  .page-container { padding:0 16px; }

  .cmp-tray { padding:10px 16px; gap:8px; flex-wrap:wrap; }
  .tray-lbl { width:100%; font-size:0.7rem; }
  .tray-items { flex:1; order:2; }
  .tray-go { order:1; flex-shrink:0; }
  .tray-clear { order:3; margin-left:auto; }

  .hero { padding:32px 0 28px; }
  .hero-in { grid-template-columns:1fr; gap:24px; }
  .hero-h1 { font-size:2rem; }
  .hcard { display:none; }

  .how-in { grid-template-columns:1fr; }
  .how-item { border-right:none; border-bottom:1px solid var(--b); padding:18px 16px; }
  .how-item:last-child { border-bottom:none; }

  .home-mid { padding:28px 0; }
  .home-mid-in { grid-template-columns:1fr; gap:20px; }
  .home-mid h2 { font-size:1.4rem; }
  .home-cta { flex-direction:column; align-items:flex-start; padding:24px 16px; gap:14px; }

  .page-topbar { padding:12px 16px; }
  .exp-entry { padding:24px 16px; }
  .exp-entry-h h2 { font-size:1.25rem; }
  .two-paths { grid-template-columns:1fr; gap:10px; }
  .path-card { padding:18px 16px; text-align:left; flex-direction:row; align-items:flex-start; }
  .pc-icon { margin:0; flex-shrink:0; width:38px; height:38px; font-size:18px; }

  .search-path { padding:16px 16px 24px; max-width:100%; }
  .srch-row { flex-wrap:wrap; gap:6px; }
  .filter-tog { width:100%; justify-content:center; }
  .fp-inner { flex-direction:column; gap:14px; padding:12px 14px; }
  .sort-row { gap:5px; }
  .sort-pill { font-size:0.68rem; padding:4px 9px; }

  .guide-path { padding:18px 20px 28px; }
  .srow-main { padding:10px 12px; gap:8px; }
  .srow-name { font-size:0.82rem; }
  .srow-metric { min-width:72px; }
  .mv { font-size:0.8rem; }
  .srow-acts { flex-direction:column; gap:3px; }
  .btn-cmp,.btn-exp { font-size:0.64rem; padding:4px 7px; }
  .srow-detail { padding:10px 12px; }

  .life-grid { grid-template-columns:1fr; gap:8px; }
  .to-cols { grid-template-columns:1fr; }
  .about-grid { grid-template-columns:1fr; }
  .foot-in { grid-template-columns:1fr; gap:20px; }
  .foot-bottom { flex-direction:column; gap:3px; }
  .sbs-wrap,.cmp-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; border-radius:var(--r); }
  .sbs-tbl,.cmp-tbl { min-width:420px; font-size:0.72rem; }

  .ins-search-bar { padding:10px 16px; flex-wrap:wrap; gap:8px; }
  .ins-sw { max-width:100%; width:100%; }
  .ins-tray-bar { padding:8px 16px; }
  .ins-body { padding:12px 16px 32px; }
  .ins-school-hdr { flex-direction:column; gap:10px; }
  .ish-acts { width:100%; }
}

@media(max-width:480px){
  .hero-h1 { font-size:1.7rem; }
  .exp-entry-h h2 { font-size:1.1rem; }
  .two-paths { gap:8px; }
  .path-card { padding:14px 12px; }
  .gqo-sub { display:none; }
}
</style>
