import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const CATEGORIE = ["Singolare Maschile", "Singolare Femminile", "Doppio Maschile", "Doppio Femminile", "Doppio Misto"];

function Badge({ stato }) {
  const styles = {
    confermato: { bg: "#d1fae5", color: "#065f46", label: "✓ Confermato" },
    rifiutato: { bg: "#fee2e2", color: "#7f1d1d", label: "✗ Rifiutato" },
    "in attesa": { bg: "#fef3c7", color: "#78350f", label: "◷ In attesa" },
  };
  const s = styles[stato] || styles["in attesa"];
  return (
    <span style={{ background: s.bg, color: s.color, padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: "monospace" }}>
      {s.label}
    </span>
  );
}


// ── Login Admin ─────────────────────────────────────────────────
function LoginAdmin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState("");

  const ADMIN_PASSWORD = "tennis2026"; // Cambia questa password!

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setErrore("Password non corretta.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ background: "#fff", borderRadius: 24, padding: 40, width: "100%", maxWidth: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: "1.5px solid #e5e7eb" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚙️</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: "#14532d", margin: "0 0 6px" }}>Area Admin</h1>
          <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>Inserisci la password per accedere</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password"
              placeholder="••••••••"
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
          {errore && (
            <div style={{ background: "#fee2e2", color: "#7f1d1d", padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600 }}>
              ⚠️ {errore}
            </div>
          )}
          <button onClick={handleLogin}
            style={{ padding: "13px", background: "linear-gradient(135deg, #14532d, #16a34a)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
            Accedi →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Login Giocatore ─────────────────────────────────────────────
function LoginGiocatore({ onLogin }) {
  const [nome, setNome] = useState("");
  const [pin, setPin] = useState("");
  const [errore, setErrore] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!nome.trim() || !pin.trim()) { setErrore("Inserisci nome e PIN."); return; }
    setLoading(true);
    setErrore("");
    const { data } = await supabase.from("giocatori").select("*")
      .ilike("nome", nome.trim()).eq("pin", pin.trim()).single();
    if (data) {
      onLogin(data);
    } else {
      setErrore("Nome o PIN non corretti. Contatta il tuo maestro.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ background: "#fff", borderRadius: 24, padding: 40, width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: "1.5px solid #e5e7eb" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎾</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, color: "#14532d", margin: "0 0 6px" }}>TennisTornei</h1>
          <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>Accedi con il tuo nome e PIN</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Il tuo nome</label>
            <input value={nome} onChange={e => setNome(e.target.value)}
              placeholder="es. Marco Rossi"
              style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>PIN</label>
            <input value={pin} onChange={e => setPin(e.target.value)} type="password"
              placeholder="••••"
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
          {errore && (
            <div style={{ background: "#fee2e2", color: "#7f1d1d", padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600 }}>
              ⚠️ {errore}
            </div>
          )}
          <button onClick={handleLogin} disabled={loading}
            style={{ padding: "13px", background: "linear-gradient(135deg, #14532d, #16a34a)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: "pointer", marginTop: 4 }}>
            {loading ? "Accesso..." : "Accedi →"}
          </button>
        </div>
        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 12, marginTop: 20 }}>
          Non hai le credenziali? Contatta il tuo maestro.
        </p>
      </div>
    </div>
  );
}

// ── Profilo Giocatore ───────────────────────────────────────────
function ProfiloGiocatore({ giocatore, tornei, onRispondi, onLogout }) {
  const [selectedTorneo, setSelectedTorneo] = useState(null);
  const mieiTornei = tornei.filter(t =>
    (t.partecipanti || []).some(p => p.nome.toLowerCase() === giocatore.nome.toLowerCase())
  );

  if (selectedTorneo) {
    return (
      <TorneoDetailGiocatore
        torneo={selectedTorneo}
        giocatore={giocatore}
        onBack={() => setSelectedTorneo(null)}
        onRispondi={async (torneoId, nome, risposta) => {
          await onRispondi(torneoId, nome, risposta);
          // aggiorna torneo selezionato
          setSelectedTorneo(prev => {
            const lista = prev.partecipanti || [];
            const nuovi = lista.map(p => p.nome.toLowerCase() === nome.toLowerCase() ? { ...p, risposta } : p);
            return { ...prev, partecipanti: nuovi };
          });
        }}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f0fdf4", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>🎾</span>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 18, color: "#14532d" }}>TennisTornei</div>
          </div>
          <button onClick={onLogout}
            style={{ padding: "7px 14px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            Esci
          </button>
        </div>
      </header>
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px" }}>
        {/* Banner profilo */}
        <div style={{ background: "linear-gradient(135deg, #14532d, #16a34a)", borderRadius: 16, padding: "24px 28px", marginBottom: 28, color: "#fff", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, flexShrink: 0 }}>
            {giocatore.nome.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, fontFamily: "'Playfair Display', serif" }}>Ciao, {giocatore.nome}!</div>
            <div style={{ opacity: 0.85, fontSize: 13, marginTop: 2 }}>Hai {mieiTornei.length} torneo/i assegnato/i</div>
          </div>
        </div>

        {/* Statistiche */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
          {[
            { n: mieiTornei.filter(t => (t.partecipanti || []).find(p => p.nome.toLowerCase() === giocatore.nome.toLowerCase())?.risposta === "confermato").length, label: "Confermati", color: "#16a34a", bg: "#d1fae5" },
            { n: mieiTornei.filter(t => (t.partecipanti || []).find(p => p.nome.toLowerCase() === giocatore.nome.toLowerCase())?.risposta === "in attesa").length, label: "In attesa", color: "#d97706", bg: "#fef3c7" },
            { n: mieiTornei.filter(t => (t.partecipanti || []).find(p => p.nome.toLowerCase() === giocatore.nome.toLowerCase())?.risposta === "rifiutato").length, label: "Rifiutati", color: "#dc2626", bg: "#fee2e2" },
          ].map(({ n, label, color, bg }) => (
            <div key={label} style={{ background: bg, borderRadius: 12, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color }}>{n}</div>
              <div style={{ fontSize: 11, color, fontWeight: 700 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Lista tornei */}
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#111827", margin: "0 0 16px" }}>I tuoi tornei</h3>
        {mieiTornei.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#9ca3af" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎾</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Nessun torneo assegnato ancora.</div>
          </div>
        ) : (
          mieiTornei.map(t => {
            const mioRecord = (t.partecipanti || []).find(p => p.nome.toLowerCase() === giocatore.nome.toLowerCase());
            const oggi = new Date().toISOString().split("T")[0];
            const scaduto = t.scadenza_iscrizione < oggi;
            return (
              <div key={t.id} onClick={() => setSelectedTorneo(t)}
                style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: 20, marginBottom: 14, cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#16a34a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.transform = ""; }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: scaduto ? "#d1d5db" : "linear-gradient(90deg, #16a34a, #4ade80)" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111827", fontFamily: "'Playfair Display', serif" }}>{t.nome}</h4>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 8 }}>
                    {mioRecord && <Badge stato={mioRecord.risposta} />}
                    {scaduto && <span style={{ background: "#f3f4f6", color: "#6b7280", fontSize: 11, padding: "3px 8px", borderRadius: 8, fontWeight: 700 }}>CHIUSO</span>}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>📅 {new Date(t.data).toLocaleDateString("it-IT", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>📍 {t.luogo}</div>
                  {t.maestro && <div style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>🎓 {t.maestro}</div>}
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}

// ── Dettaglio Torneo (Giocatore) ────────────────────────────────
function TorneoDetailGiocatore({ torneo, giocatore, onBack, onRispondi }) {
  const [showRispondi, setShowRispondi] = useState(false);
  const [loading, setLoading] = useState(false);
  const oggi = new Date().toISOString().split("T")[0];
  const scaduto = torneo.scadenza_iscrizione < oggi;
  const partecipanti = torneo.partecipanti || [];
  const confermati = partecipanti.filter(p => p.risposta === "confermato");
  const inAttesa = partecipanti.filter(p => p.risposta === "in attesa");
  const rifiutati = partecipanti.filter(p => p.risposta === "rifiutato");
  const mioRecord = partecipanti.find(p => p.nome.toLowerCase() === giocatore.nome.toLowerCase());

  const handleRispondi = async (risposta) => {
    setLoading(true);
    await onRispondi(torneo.id, giocatore.nome, risposta);
    setLoading(false);
    setShowRispondi(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0fdf4", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 64 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 14, fontWeight: 700, padding: 0 }}>← Torna al profilo</button>
        </div>
      </header>
      <main style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(135deg, #14532d, #16a34a)", padding: "32px", color: "#fff" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, opacity: 0.7, marginBottom: 8 }}>{torneo.categoria.toUpperCase()}</div>
            <h2 style={{ margin: "0 0 12px", fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900 }}>{torneo.nome}</h2>
            <div style={{ opacity: 0.85, fontSize: 14, lineHeight: 1.8 }}>
              <div>📅 {new Date(torneo.data).toLocaleDateString("it-IT", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
              <div>📍 {torneo.luogo}</div>
              <div>⏰ Iscrizioni entro: {new Date(torneo.scadenza_iscrizione).toLocaleDateString("it-IT")}</div>
              {torneo.maestro && <div>🎓 Maestro: <strong>{torneo.maestro}</strong></div>}
            </div>
          </div>
          <div style={{ padding: 28 }}>
            {torneo.descrizione && <p style={{ color: "#4b5563", marginTop: 0, lineHeight: 1.7, borderLeft: "3px solid #16a34a", paddingLeft: 14 }}>{torneo.descrizione}</p>}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[
                { n: confermati.length, label: "Confermati", color: "#16a34a", bg: "#d1fae5" },
                { n: inAttesa.length, label: "In attesa", color: "#d97706", bg: "#fef3c7" },
                { n: rifiutati.length, label: "Rifiutati", color: "#dc2626", bg: "#fee2e2" },
              ].map(({ n, label, color, bg }) => (
                <div key={label} style={{ background: bg, borderRadius: 12, padding: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color }}>{n}</div>
                  <div style={{ fontSize: 11, color, fontWeight: 700 }}>{label}</div>
                </div>
              ))}
            </div>

            {scaduto ? (
              <div style={{ background: "#f3f4f6", borderRadius: 12, padding: 18, textAlign: "center", color: "#6b7280" }}>
                ⛔ Le iscrizioni per questo torneo sono chiuse.
              </div>
            ) : !showRispondi ? (
              <div>
                {mioRecord && (
                  <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 12, padding: "14px 18px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 20 }}>👤</span>
                    <div>
                      <div style={{ fontWeight: 700, color: "#111827", fontSize: 14 }}>La tua risposta attuale:</div>
                      <div style={{ marginTop: 4 }}><Badge stato={mioRecord.risposta} /></div>
                    </div>
                  </div>
                )}
                <button onClick={() => setShowRispondi(true)}
                  style={{ width: "100%", padding: 14, background: "linear-gradient(135deg, #16a34a, #22c55e)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: "pointer" }}>
                  🎾 {mioRecord?.risposta !== "in attesa" ? "Cambia risposta" : "Rispondi all'invito"}
                </button>
              </div>
            ) : (
              <div style={{ background: "#f9fafb", borderRadius: 14, padding: 20 }}>
                <h4 style={{ margin: "0 0 16px", color: "#111827" }}>Partecipi a questo torneo?</h4>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => handleRispondi("confermato")} disabled={loading}
                    style={{ flex: 1, padding: 13, background: "#16a34a", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, cursor: "pointer", fontSize: 15 }}>
                    ✓ Partecipo
                  </button>
                  <button onClick={() => handleRispondi("rifiutato")} disabled={loading}
                    style={{ flex: 1, padding: 13, background: "#dc2626", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, cursor: "pointer", fontSize: 15 }}>
                    ✗ Non partecipo
                  </button>
                  <button onClick={() => setShowRispondi(false)}
                    style={{ padding: "13px 16px", background: "#e5e7eb", color: "#374151", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Gestione Giocatori (Admin) ──────────────────────────────────
function GestioneGiocatori({ giocatori, onAggiungi, onElimina, onBack }) {
  const [nome, setNome] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAggiungi = async () => {
    if (!nome.trim() || !pin.trim()) return alert("Inserisci nome e PIN.");
    if (pin.length < 4) return alert("Il PIN deve avere almeno 4 cifre.");
    setLoading(true);
    await onAggiungi(nome.trim(), pin.trim());
    setNome("");
    setPin("");
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 14, fontWeight: 700, marginBottom: 20, padding: 0 }}>
        ← Torna ai tornei
      </button>
      <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", padding: 28, marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#111827", margin: "0 0 20px" }}>👥 Gestione Giocatori</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Nome giocatore</label>
            <input value={nome} onChange={e => setNome(e.target.value)} placeholder="es. Marco Rossi"
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>PIN (min. 4 cifre)</label>
            <input value={pin} onChange={e => setPin(e.target.value)} placeholder="es. 1234" maxLength={8}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>
        <button onClick={handleAggiungi} disabled={loading}
          style={{ width: "100%", padding: 12, background: "linear-gradient(135deg, #14532d, #16a34a)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
          {loading ? "..." : "+ Aggiungi Giocatore"}
        </button>
      </div>

      <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", padding: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#374151", margin: "0 0 16px" }}>Giocatori registrati ({giocatori.length})</h3>
        {giocatori.length === 0 ? (
          <p style={{ color: "#9ca3af", fontStyle: "italic" }}>Nessun giocatore ancora.</p>
        ) : (
          giocatori.map(g => (
            <div key={g.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #16a34a, #4ade80)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 800 }}>
                  {g.nome.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#111827" }}>{g.nome}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>PIN: {g.pin}</div>
                </div>
              </div>
              <button onClick={() => { if (window.confirm(`Eliminare ${g.nome}?`)) onElimina(g.id); }}
                style={{ padding: "6px 12px", background: "#fee2e2", color: "#7f1d1d", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ── Torneo Card (Admin) ─────────────────────────────────────────
function TorneoCard({ torneo, onViewDetail, view, nomeGiocatore }) {
  const confermati = (torneo.partecipanti || []).filter(p => p.risposta === "confermato").length;
  const inAttesa = (torneo.partecipanti || []).filter(p => p.risposta === "in attesa").length;
  const oggi = new Date().toISOString().split("T")[0];
  const scaduto = torneo.scadenza_iscrizione < oggi;
  return (
    <div onClick={() => onViewDetail(torneo)}
      style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 16, padding: "24px", cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.10)"; e.currentTarget.style.borderColor = "#16a34a"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "#e5e7eb"; }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: scaduto ? "#d1d5db" : "linear-gradient(90deg, #16a34a, #4ade80)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#111827", fontFamily: "'Playfair Display', serif", lineHeight: 1.3 }}>{torneo.nome}</h3>
        {scaduto && <span style={{ background: "#f3f4f6", color: "#6b7280", fontSize: 11, padding: "3px 8px", borderRadius: 8, fontWeight: 700, whiteSpace: "nowrap", marginLeft: 8 }}>CHIUSO</span>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#6b7280" }}>📅 {new Date(torneo.data).toLocaleDateString("it-IT", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
        <div style={{ fontSize: 13, color: "#6b7280" }}>📍 {torneo.luogo}</div>
        <div style={{ fontSize: 13, color: "#6b7280" }}>🎾 {torneo.categoria}</div>
        {torneo.maestro && <div style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>🎓 {torneo.maestro}</div>}
      </div>
      <div style={{ display: "flex", gap: 12, borderTop: "1px solid #f3f4f6", paddingTop: 14 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#16a34a" }}>{confermati}</div>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>CONFERMATI</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#f59e0b" }}>{inAttesa}</div>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>IN ATTESA</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#6b7280" }}>{torneo.max_partecipanti}</div>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>MAX</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#3b82f6" }}>{(torneo.partecipanti || []).length}</div>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>ISCRITTI</div>
        </div>
      </div>
    </div>
  );
}

// ── Admin New Torneo ────────────────────────────────────────────
function AdminNewTorneo({ onSave, onCancel, torneoEdit, giocatori }) {
  const empty = { nome: "", data: "", luogo: "", categoria: CATEGORIE[0], max_partecipanti: 16, scadenza_iscrizione: "", descrizione: "", maestro: "" };
  const [form, setForm] = useState(torneoEdit ? { ...torneoEdit } : empty);
  const [partecipanti, setPartecipanti] = useState(torneoEdit ? torneoEdit.partecipanti || [] : []);
  const [nuovoNome, setNuovoNome] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const aggiungiPartecipante = (nome) => {
    const n = nome || nuovoNome.trim();
    if (!n) return;
    if (partecipanti.find(p => p.nome.toLowerCase() === n.toLowerCase())) {
      alert("Già presente."); return;
    }
    setPartecipanti(prev => [...prev, { nome: n, risposta: "in attesa" }]);
    setNuovoNome("");
  };

  const rimuoviPartecipante = (nome) => setPartecipanti(prev => prev.filter(p => p.nome !== nome));

  const handleSubmit = async () => {
    if (!form.nome || !form.data || !form.luogo || !form.scadenza_iscrizione) return alert("Compila tutti i campi obbligatori.");
    setLoading(true);
    await onSave({ ...form, partecipanti });
    setLoading(false);
  };

  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: 32, border: "1.5px solid #e5e7eb", maxWidth: 560, margin: "0 auto" }}>
      <h2 style={{ margin: "0 0 24px", fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#111827" }}>
        {torneoEdit ? "✏️ Modifica Torneo" : "➕ Nuovo Torneo"}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { label: "Nome torneo *", key: "nome", type: "text", placeholder: "es. Open Estivo Milano" },
          { label: "Data torneo *", key: "data", type: "date" },
          { label: "Luogo *", key: "luogo", type: "text", placeholder: "es. Tennis Club Milano" },
          { label: "Scadenza iscrizioni *", key: "scadenza_iscrizione", type: "date" },
          { label: "Max partecipanti", key: "max_partecipanti", type: "number" },
        ].map(({ label, key, type, placeholder }) => (
          <label key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{label}</span>
            <input type={type} value={form[key]} placeholder={placeholder}
              onChange={e => handleChange(key, type === "number" ? parseInt(e.target.value) : e.target.value)}
              style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
          </label>
        ))}
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>Categoria</span>
          <select value={form.categoria} onChange={e => handleChange("categoria", e.target.value)}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, fontFamily: "inherit" }}>
            {CATEGORIE.map(c => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>Descrizione</span>
          <textarea value={form.descrizione} rows={3} onChange={e => handleChange("descrizione", e.target.value)}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, fontFamily: "inherit", resize: "vertical" }} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>🎓 Maestro accompagnatore</span>
          <input type="text" value={form.maestro || ""} placeholder="es. Carlo Ferri"
            onChange={e => handleChange("maestro", e.target.value)}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
        </label>

        {/* Partecipanti */}
        <div style={{ borderTop: "1.5px solid #e5e7eb", paddingTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#374151" }}>👥 Giocatori invitati</span>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>{partecipanti.length} / {form.max_partecipanti}</span>
          </div>

          {/* Seleziona da giocatori registrati */}
          {giocatori.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 6 }}>SELEZIONA DA GIOCATORI REGISTRATI</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {giocatori.filter(g => !partecipanti.find(p => p.nome.toLowerCase() === g.nome.toLowerCase())).map(g => (
                  <button key={g.id} onClick={() => aggiungiPartecipante(g.nome)}
                    style={{ padding: "6px 12px", background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 20, fontSize: 13, fontWeight: 700, color: "#14532d", cursor: "pointer" }}>
                    + {g.nome}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input manuale */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input value={nuovoNome} onChange={e => setNuovoNome(e.target.value)}
              onKeyDown={e => e.key === "Enter" && aggiungiPartecipante()}
              placeholder="Oppure scrivi il nome manualmente..."
              style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
            <button onClick={() => aggiungiPartecipante()}
              style={{ padding: "10px 18px", background: "#14532d", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, fontSize: 20, cursor: "pointer" }}>+</button>
          </div>

          {partecipanti.length === 0 ? (
            <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px", color: "#9ca3af", fontSize: 13, textAlign: "center", border: "1.5px dashed #e5e7eb" }}>
              Nessun giocatore aggiunto ancora.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 200, overflowY: "auto" }}>
              {partecipanti.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f9fafb", borderRadius: 10, padding: "9px 14px", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #16a34a, #4ade80)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 800 }}>
                      {p.nome.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontWeight: 600, color: "#111827", fontSize: 14 }}>{p.nome}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Badge stato={p.risposta} />
                    <button onClick={() => rimuoviPartecipante(p.nome)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 18 }}>×</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <button onClick={handleSubmit} disabled={loading}
            style={{ flex: 1, padding: "12px", background: loading ? "#9ca3af" : "linear-gradient(135deg, #16a34a, #22c55e)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
            {loading ? "..." : torneoEdit ? "Salva modifiche" : "Crea Torneo"}
          </button>
          <button onClick={onCancel}
            style={{ padding: "12px 20px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Torneo Detail (Admin) ───────────────────────────────────────
function TorneoDetailAdmin({ torneo, onBack, onRispondi, onDelete, onEdit }) {
  const confermati = (torneo.partecipanti || []).filter(p => p.risposta === "confermato");
  const rifiutati = (torneo.partecipanti || []).filter(p => p.risposta === "rifiutato");
  const inAttesa = (torneo.partecipanti || []).filter(p => p.risposta === "in attesa");

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 14, fontWeight: 700, marginBottom: 20, padding: 0 }}>
        ← Torna ai tornei
      </button>
      <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg, #14532d, #16a34a)", padding: "32px", color: "#fff" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, opacity: 0.7, marginBottom: 8 }}>{torneo.categoria.toUpperCase()}</div>
          <h2 style={{ margin: "0 0 12px", fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900 }}>{torneo.nome}</h2>
          <div style={{ opacity: 0.85, fontSize: 14, lineHeight: 1.8 }}>
            <div>📅 {new Date(torneo.data).toLocaleDateString("it-IT", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
            <div>📍 {torneo.luogo}</div>
            <div>⏰ Iscrizioni entro: {new Date(torneo.scadenza_iscrizione).toLocaleDateString("it-IT")}</div>
            {torneo.maestro && <div>🎓 Maestro: <strong>{torneo.maestro}</strong></div>}
          </div>
        </div>
        <div style={{ padding: 32 }}>
          {torneo.descrizione && <p style={{ color: "#4b5563", marginTop: 0, lineHeight: 1.7, borderLeft: "3px solid #16a34a", paddingLeft: 14 }}>{torneo.descrizione}</p>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { n: confermati.length, label: "Confermati", color: "#16a34a", bg: "#d1fae5" },
              { n: inAttesa.length, label: "In attesa", color: "#d97706", bg: "#fef3c7" },
              { n: rifiutati.length, label: "Rifiutati", color: "#dc2626", bg: "#fee2e2" },
            ].map(({ n, label, color, bg }) => (
              <div key={label} style={{ background: bg, borderRadius: 12, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color }}>{n}</div>
                <div style={{ fontSize: 12, color, fontWeight: 700 }}>{label}</div>
              </div>
            ))}
          </div>
          <h4 style={{ margin: "0 0 12px", color: "#374151", fontSize: 14, fontWeight: 800, letterSpacing: 1 }}>ELENCO PARTECIPANTI</h4>
          {(torneo.partecipanti || []).length === 0
            ? <p style={{ color: "#9ca3af", fontStyle: "italic" }}>Nessun partecipante ancora.</p>
            : (torneo.partecipanti || []).map((p, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #16a34a, #4ade80)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 800 }}>
                    {p.nome.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontWeight: 600, color: "#111827" }}>{p.nome}</span>
                </div>
                <Badge stato={p.risposta} />
              </div>
            ))
          }
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button onClick={() => onEdit(torneo)}
              style={{ flex: 1, padding: "11px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>
              ✏️ Modifica
            </button>
            <button onClick={() => { if (window.confirm("Eliminare questo torneo?")) onDelete(torneo.id); }}
              style={{ flex: 1, padding: "11px", background: "#fee2e2", color: "#7f1d1d", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>
              🗑️ Elimina
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main App ────────────────────────────────────────────────────
export default function App() {
  const [tornei, setTornei] = useState([]);
  const [giocatori, setGiocatori] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("admin"); // admin | giocatore
  const [adminLoggato, setAdminLoggato] = useState(false);
  const [giocatoreLoggato, setGiocatoreLoggato] = useState(null);
  const [selectedTorneo, setSelectedTorneo] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editTorneo, setEditTorneo] = useState(null);
  const [showGiocatori, setShowGiocatori] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const caricaDati = async () => {
    setLoading(true);
    const { data: torneiData } = await supabase.from("tornei").select("*").order("data", { ascending: true });
    const { data: partData } = await supabase.from("partecipanti").select("*");
    const { data: giocatoriData } = await supabase.from("giocatori").select("*").order("nome");
    const torneiConPart = (torneiData || []).map(t => ({
      ...t,
      partecipanti: (partData || []).filter(p => p.torneo_id === t.id),
    }));
    setTornei(torneiConPart);
    setGiocatori(giocatoriData || []);
    setLoading(false);
  };

  useEffect(() => { caricaDati(); }, []);

  const saveTorneo = async (form) => {
    const { partecipanti, ...dati } = form;
    if (editTorneo) {
      await supabase.from("tornei").update({ nome: dati.nome, data: dati.data, luogo: dati.luogo, categoria: dati.categoria, max_partecipanti: dati.max_partecipanti, scadenza_iscrizione: dati.scadenza_iscrizione, descrizione: dati.descrizione, maestro: dati.maestro }).eq("id", editTorneo.id);
      await supabase.from("partecipanti").delete().eq("torneo_id", editTorneo.id);
      if (partecipanti.length > 0) await supabase.from("partecipanti").insert(partecipanti.map(p => ({ torneo_id: editTorneo.id, nome: p.nome, risposta: p.risposta })));
    } else {
      const { data: newT } = await supabase.from("tornei").insert([{ nome: dati.nome, data: dati.data, luogo: dati.luogo, categoria: dati.categoria, max_partecipanti: dati.max_partecipanti, scadenza_iscrizione: dati.scadenza_iscrizione, descrizione: dati.descrizione, maestro: dati.maestro }]).select().single();
      if (newT && partecipanti.length > 0) await supabase.from("partecipanti").insert(partecipanti.map(p => ({ torneo_id: newT.id, nome: p.nome, risposta: p.risposta })));
    }
    await caricaDati();
    setShowForm(false);
    setEditTorneo(null);
    setSelectedTorneo(null);
  };

  const deleteTorneo = async (id) => {
    await supabase.from("tornei").delete().eq("id", id);
    await caricaDati();
    setSelectedTorneo(null);
  };

  const rispondi = async (torneoId, nome, risposta) => {
    const { data: existing } = await supabase.from("partecipanti").select("*").eq("torneo_id", torneoId).ilike("nome", nome).single();
    if (existing) {
      await supabase.from("partecipanti").update({ risposta }).eq("id", existing.id);
    } else {
      await supabase.from("partecipanti").insert([{ torneo_id: torneoId, nome, risposta }]);
    }
    await caricaDati();
  };

  const aggiungiGiocatore = async (nome, pin) => {
    await supabase.from("giocatori").insert([{ nome, pin }]);
    await caricaDati();
  };

  const eliminaGiocatore = async (id) => {
    await supabase.from("giocatori").delete().eq("id", id);
    await caricaDati();
  };

  const filtered = tornei.filter(t =>
    t.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.luogo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Vista giocatore loggato
  if (view === "giocatore" && giocatoreLoggato) {
    return (
      <ProfiloGiocatore
        giocatore={giocatoreLoggato}
        tornei={tornei}
        onRispondi={rispondi}
        onLogout={() => { setGiocatoreLoggato(null); }}
      />
    );
  }

  // Login giocatore
  if (view === "giocatore" && !giocatoreLoggato) {
    return <LoginGiocatore onLogin={(g) => setGiocatoreLoggato(g)} />;
  }

  // Login admin
  if (view === "admin" && !adminLoggato) {
    return <LoginAdmin onLogin={() => setAdminLoggato(true)} />;
  }

  // Vista admin
  return (
    <div style={{ minHeight: "100vh", background: "#f0fdf4", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>🎾</span>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: "#14532d", lineHeight: 1 }}>TennisTornei</div>
              <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 700, letterSpacing: 1 }}>GESTIONE TORNEI</div>
            </div>
          </div>
          <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 12, padding: 4, gap: 4 }}>
            <button onClick={() => { setView("admin"); setSelectedTorneo(null); setShowForm(false); setShowGiocatori(false); }}
              style={{ padding: "7px 14px", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: view === "admin" ? "#fff" : "transparent", color: view === "admin" ? "#16a34a" : "#6b7280", boxShadow: view === "admin" ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>
              ⚙️ Admin
            </button>
            {adminLoggato && (
              <button onClick={() => { setAdminLoggato(false); setView("giocatore"); }}
                style={{ padding: "7px 12px", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12, background: "transparent", color: "#dc2626" }}>
                Esci
              </button>
            )}
            <button onClick={() => { setView("giocatore"); setSelectedTorneo(null); setShowForm(false); }}
              style={{ padding: "7px 14px", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: view === "giocatore" ? "#fff" : "transparent", color: view === "giocatore" ? "#16a34a" : "#6b7280", boxShadow: view === "giocatore" ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>
              👤 Giocatori
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px" }}>
        {showForm ? (
          <AdminNewTorneo torneoEdit={editTorneo} giocatori={giocatori} onSave={saveTorneo} onCancel={() => { setShowForm(false); setEditTorneo(null); }} />
        ) : showGiocatori ? (
          <GestioneGiocatori giocatori={giocatori} onAggiungi={aggiungiGiocatore} onElimina={eliminaGiocatore} onBack={() => setShowGiocatori(false)} />
        ) : selectedTorneo ? (
          <TorneoDetailAdmin torneo={selectedTorneo} onBack={() => setSelectedTorneo(null)}
            onRispondi={rispondi} onDelete={deleteTorneo}
            onEdit={(t) => { setEditTorneo(t); setShowForm(true); setSelectedTorneo(null); }} />
        ) : (
          <>
            <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "center" }}>
              <div style={{ flex: 1, position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}>🔍</span>
                <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Cerca torneo..."
                  style={{ width: "100%", padding: "11px 14px 11px 38px", borderRadius: 12, border: "1.5px solid #e5e7eb", fontSize: 14, background: "#fff", boxSizing: "border-box", outline: "none", fontFamily: "inherit" }} />
              </div>
              <button onClick={() => setShowGiocatori(true)}
                style={{ padding: "11px 16px", background: "#fff", color: "#14532d", border: "1.5px solid #16a34a", borderRadius: 12, fontWeight: 800, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>
                👥 Giocatori ({giocatori.length})
              </button>
              <button onClick={() => { setShowForm(true); setEditTorneo(null); }}
                style={{ padding: "11px 20px", background: "linear-gradient(135deg, #14532d, #16a34a)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>
                + Torneo
              </button>
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>⏳ Caricamento...</div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🎾</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Nessun torneo trovato</div>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 16 }}>
                {filtered.map(t => <TorneoCard key={t.id} torneo={t} onViewDetail={setSelectedTorneo} view="admin" />)}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
