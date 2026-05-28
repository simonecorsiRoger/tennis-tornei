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


// ── Welcome Screen ──────────────────────────────────────────────
function WelcomeScreen({ onScegliAdmin, onScegliGiocatore, onScegliCoach }) {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #052e16, #14532d, #16a34a)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ textAlign: "center", maxWidth: 440, width: "100%" }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>🎾</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "#fff", margin: "0 0 6px", lineHeight: 1.1 }}>PIATTI TENNIS CENTER</h1>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, fontWeight: 700, margin: "0 0 4px", letterSpacing: 1 }}>Schedule Tournaments</p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0 0 48px" }}>Gestione tornei e iscrizioni</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <button onClick={onScegliAdmin}
            style={{ padding: "18px 24px", background: "#fff", color: "#14532d", border: "none", borderRadius: 16, fontSize: 17, fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, transition: "all 0.2s", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = ""}>
            <span style={{ fontSize: 24 }}>⚙️</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 900 }}>Accedi come Admin</div>
              <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>Gestisci tornei e giocatori</div>
            </div>
          </button>

          <button onClick={onScegliGiocatore}
            style={{ padding: "18px 24px", background: "rgba(255,255,255,0.12)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", borderRadius: 16, fontSize: 17, fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = ""}>
            <span style={{ fontSize: 24 }}>👤</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 900 }}>Accedi come Giocatore</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Vedi i tuoi tornei e rispondi</div>
            </div>
          </button>

          <button onClick={onScegliCoach}
            style={{ padding: "18px 24px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 16, fontSize: 17, fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = ""}>
            <span style={{ fontSize: 24 }}>🎓</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 900 }}>Accedi come Coach</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Vedi i tornei assegnati</div>
            </div>
          </button>
        </div>

        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 40 }}>
          © {new Date().getFullYear()} TennisTornei
        </p>
      </div>
    </div>
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
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 14, color: "#14532d", lineHeight: 1.2 }}>PIATTI TENNIS CENTER<br/><span style={{ fontSize: 10, color: "#16a34a", fontWeight: 700, letterSpacing: 1 }}>SCHEDULE TOURNAMENTS</span></div>
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
const GRUPPI_NOMI = ["J30","J60","J100","J200+","ITF 15,25k M","ITF 15,25k F","Challenger"];
const GRUPPO_COLORS = {
  "J30": "#7c3aed", "J60": "#2563eb", "J100": "#0891b2",
  "J200+": "#059669", "ITF 15,25k M": "#d97706",
  "ITF 15,25k F": "#db2777", "Challenger": "#dc2626"
};

function GestioneGiocatori({ giocatori, onAggiungi, onElimina, onToggleGruppo, onBack }) {
  const [nome, setNome] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeGruppo, setActiveGruppo] = useState("tutti");
  const [expandedId, setExpandedId] = useState(null);

  const handleAggiungi = async () => {
    if (!nome.trim() || !pin.trim()) return alert("Inserisci nome e PIN.");
    if (pin.length < 4) return alert("Il PIN deve avere almeno 4 cifre.");
    setLoading(true);
    await onAggiungi(nome.trim(), pin.trim());
    setNome(""); setPin("");
    setLoading(false);
  };

  const giocatoriFiltrati = activeGruppo === "tutti"
    ? giocatori
    : giocatori.filter(g => (g.gruppi || []).includes(activeGruppo));

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 14, fontWeight: 700, marginBottom: 20, padding: 0 }}>
        ← Torna ai tornei
      </button>

      {/* Add player */}
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

      {/* Players list */}
      <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", padding: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#374151", margin: "0 0 16px" }}>Giocatori registrati ({giocatori.length})</h3>

        {/* Group filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          <button onClick={() => setActiveGruppo("tutti")}
            style={{ padding: "5px 14px", borderRadius: 20, border: "2px solid #e5e7eb", background: activeGruppo === "tutti" ? "#14532d" : "transparent", color: activeGruppo === "tutti" ? "#fff" : "#6b7280", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
            Tutti ({giocatori.length})
          </button>
          {GRUPPI_NOMI.map(g => {
            const count = giocatori.filter(p => (p.gruppi || []).includes(g)).length;
            if (count === 0) return null;
            return (
              <button key={g} onClick={() => setActiveGruppo(g)}
                style={{ padding: "5px 14px", borderRadius: 20, border: `2px solid ${GRUPPO_COLORS[g]}`, background: activeGruppo === g ? GRUPPO_COLORS[g] : "transparent", color: activeGruppo === g ? "#fff" : GRUPPO_COLORS[g], fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                {g} ({count})
              </button>
            );
          })}
        </div>

        {giocatoriFiltrati.length === 0 ? (
          <p style={{ color: "#9ca3af", fontStyle: "italic" }}>Nessun giocatore in questa categoria.</p>
        ) : (
          giocatoriFiltrati.map(g => (
            <div key={g.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flex: 1 }}
                  onClick={e => { e.stopPropagation(); setExpandedId(expandedId === g.id ? null : g.id); }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: (g.gruppi || []).length > 0 ? GRUPPO_COLORS[(g.gruppi || [])[0]] || "#16a34a" : "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 800 }}>
                    {g.nome.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#111827" }}>{g.nome}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 3, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, color: "#9ca3af" }}>PIN: {g.pin}</span>
                      {(g.gruppi || []).map(gr => (
                        <span key={gr} style={{ fontSize: 10, fontWeight: 700, color: GRUPPO_COLORS[gr], background: `${GRUPPO_COLORS[gr]}18`, padding: "1px 8px", borderRadius: 10 }}>{gr}</span>
                      ))}
                      {(g.gruppi || []).length === 0 && <span style={{ fontSize: 11, color: "#d1d5db", fontStyle: "italic" }}>Nessun gruppo</span>}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setExpandedId(expandedId === g.id ? null : g.id)}
                    style={{ padding: "6px 12px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                    {expandedId === g.id ? "▲" : "✏️ Gruppi"}
                  </button>
                  <button onClick={() => { if (window.confirm(`Eliminare ${g.nome}?`)) onElimina(g.id); }}
                    style={{ padding: "6px 12px", background: "#fee2e2", color: "#7f1d1d", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                    🗑️
                  </button>
                </div>
              </div>

              {/* Expanded group assignment */}
              {expandedId === g.id && (
                <div style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 14px", marginBottom: 10 }} onClick={e => e.stopPropagation()}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 8 }}>ASSEGNA GRUPPI:</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {GRUPPI_NOMI.map(gr => {
                      const isIn = (g.gruppi || []).includes(gr);
                      return (
                        <button key={gr} onClick={e => { e.stopPropagation(); onToggleGruppo(g.id, gr, isIn); }}
                          style={{ padding: "6px 14px", borderRadius: 20, border: `2px solid ${GRUPPO_COLORS[gr]}`, background: isIn ? GRUPPO_COLORS[gr] : "transparent", color: isIn ? "#fff" : GRUPPO_COLORS[gr], fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}>
                          {isIn ? "✓ " : "+ "}{gr}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
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
function AdminNewTorneo({ onSave, onCancel, torneoEdit, giocatori, coach }) {
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
          <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>🎓 Coach accompagnatore</span>
          <select value={form.coach_id || ""} onChange={e => handleChange("coach_id", e.target.value ? parseInt(e.target.value) : null)}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, fontFamily: "inherit" }}>
            <option value="">— Nessun coach —</option>
            {(coach || []).map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </label>

        {/* Partecipanti */}
        <div style={{ borderTop: "1.5px solid #e5e7eb", paddingTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#374151" }}>👥 Giocatori invitati</span>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>{partecipanti.length} / {form.max_partecipanti}</span>
          </div>

          {/* Seleziona da giocatori registrati - con filtro per gruppo */}
          {giocatori.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 8 }}>SELEZIONA DA GIOCATORI REGISTRATI</label>
              {/* Aggiungi gruppo intero */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                {["J30","J60","J100","J200+","ITF 15,25k M","ITF 15,25k F","Challenger"].map(gruppo => {
                  const gruppoGiocatori = giocatori.filter(g => (g.gruppi || []).includes(gruppo) && !partecipanti.find(p => p.nome.toLowerCase() === g.nome.toLowerCase()));
                  if (gruppoGiocatori.length === 0) return null;
                  const GRUPPO_COLORS = { "J30": "#7c3aed", "J60": "#2563eb", "J100": "#0891b2", "J200+": "#059669", "ITF 15,25k M": "#d97706", "ITF 15,25k F": "#db2777", "Challenger": "#dc2626" };
                  return (
                    <button key={gruppo} onClick={() => gruppoGiocatori.forEach(g => aggiungiPartecipante(g.nome))}
                      style={{ padding: "5px 12px", background: `${GRUPPO_COLORS[gruppo]}15`, border: `1.5px solid ${GRUPPO_COLORS[gruppo]}`, borderRadius: 20, fontSize: 12, fontWeight: 700, color: GRUPPO_COLORS[gruppo], cursor: "pointer" }}>
                      + Gruppo {gruppo} ({gruppoGiocatori.length})
                    </button>
                  );
                })}
              </div>
              {/* Singoli giocatori */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {giocatori.filter(g => !partecipanti.find(p => p.nome.toLowerCase() === g.nome.toLowerCase())).map(g => {
                  const GRUPPO_COLORS = { "J30": "#7c3aed", "J60": "#2563eb", "J100": "#0891b2", "J200+": "#059669", "ITF 15,25k M": "#d97706", "ITF 15,25k F": "#db2777", "Challenger": "#dc2626" };
                  return (
                    <button key={g.id} onClick={() => aggiungiPartecipante(g.nome)}
                      style={{ padding: "5px 12px", background: "#f9fafb", border: `1.5px solid ${GRUPPO_COLORS[g.gruppo] || "#d1d5db"}`, borderRadius: 20, fontSize: 12, fontWeight: 700, color: GRUPPO_COLORS[g.gruppo] || "#374151", cursor: "pointer" }}>
                      + {g.nome}
                    </button>
                  );
                })}
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
function TorneoDetailAdmin({ torneo: torneoInit, onBack, onRispondi, onDelete, onEdit }) {
  const [torneo, setTorneo] = useState(torneoInit);

  const handleRispondi = async (torneoId, nome, risposta) => {
    setTorneo(prev => ({
      ...prev,
      partecipanti: (prev.partecipanti || []).map(p =>
        p.nome.toLowerCase() === nome.toLowerCase() ? { ...p, risposta } : p
      )
    }));
    await onRispondi(torneoId, nome, risposta);
  };
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
              <div key={i} style={{ padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #16a34a, #4ade80)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 800 }}>
                      {p.nome.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontWeight: 600, color: "#111827" }}>{p.nome}</span>
                  </div>
                  <Badge stato={p.risposta} />
                </div>
                {/* Admin controls */}
                <div style={{ display: "flex", gap: 6, marginLeft: 42 }}>
                  <button onClick={() => handleRispondi(torneo.id, p.nome, "confermato")}
                    style={{ padding: "5px 12px", background: p.risposta === "confermato" ? "#16a34a" : "#f0fdf4", color: p.risposta === "confermato" ? "#fff" : "#16a34a", border: "1.5px solid #16a34a", borderRadius: 8, fontWeight: 700, fontSize: 11, cursor: "pointer" }}>
                    ✓ Conferma
                  </button>
                  <button onClick={() => handleRispondi(torneo.id, p.nome, "in attesa")}
                    style={{ padding: "5px 12px", background: p.risposta === "in attesa" ? "#f59e0b" : "#fefce8", color: p.risposta === "in attesa" ? "#fff" : "#d97706", border: "1.5px solid #f59e0b", borderRadius: 8, fontWeight: 700, fontSize: 11, cursor: "pointer" }}>
                    ◷ In attesa
                  </button>
                  <button onClick={() => handleRispondi(torneo.id, p.nome, "rifiutato")}
                    style={{ padding: "5px 12px", background: p.risposta === "rifiutato" ? "#dc2626" : "#fff1f2", color: p.risposta === "rifiutato" ? "#fff" : "#dc2626", border: "1.5px solid #dc2626", borderRadius: 8, fontWeight: 700, fontSize: 11, cursor: "pointer" }}>
                    ✗ Rifiuta
                  </button>
                </div>
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


// ── Calendar constants ──────────────────────────────────────────
const DAYS_IT = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
const MONTHS_IT = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7;
  const days = [];
  for (let i = 0; i < startDow; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

const CAT_COLORS = {
  "Singolare Maschile": "#2563eb",
  "Singolare Femminile": "#db2777",
  "Doppio Maschile": "#7c3aed",
  "Doppio Femminile": "#d97706",
  "Doppio Misto": "#0891b2",
  "J30": "#7c3aed", "J60": "#2563eb", "J100": "#0891b2",
  "J200+": "#059669", "ITF 15,25k M": "#d97706",
  "ITF 15,25k F": "#db2777", "Challenger": "#dc2626",
};

function AdminCalendar({ tornei, onViewTorneo, onNewTorneo, onShowGiocatori, giocatori }) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [calView, setCalView] = useState("month");
  const [selectedTorneo, setSelectedTorneo] = useState(null);

  const calDays = getCalendarDays(currentYear, currentMonth);
  const weeks = [];
  for (let i = 0; i < calDays.length; i += 7) weeks.push(calDays.slice(i, i + 7));

  const torneiDelGiorno = (day) => {
    if (!day) return [];
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tornei.filter(t => t.data === dateStr);
  };

  const torneiDelMese = tornei.filter(t =>
    t.data.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`)
  );

  const isToday = (day) => day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

  const prevMonth = () => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); } else setCurrentMonth(m => m - 1); };
  const nextMonth = () => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); } else setCurrentMonth(m => m + 1); };

  const getColor = (t) => CAT_COLORS[t.categoria] || "#16a34a";

  return (
    <div>
      {/* Top bar */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={() => setCalView(calView === "month" ? "week" : "month")}
          style={{ padding: "10px 16px", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: "pointer", color: "#374151" }}>
          {calView === "month" ? "📅 Vista Settimana" : "📆 Vista Mese"}
        </button>
        <div style={{ flex: 1 }} />
        <button onClick={() => onShowGiocatori()}
          style={{ padding: "10px 16px", background: "#fff", color: "#14532d", border: "1.5px solid #16a34a", borderRadius: 12, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
          👥 Giocatori ({giocatori.length})
        </button>
        <button onClick={onNewTorneo}
          style={{ padding: "10px 20px", background: "linear-gradient(135deg, #14532d, #16a34a)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
          + Torneo
        </button>
      </div>

      {/* Month navigation */}
      <div style={{ background: "#fff", borderRadius: 16, padding: "14px 20px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1.5px solid #e5e7eb" }}>
        <button onClick={prevMonth} style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: "#111827" }}>{MONTHS_IT[currentMonth]}</div>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>{currentYear} · {torneiDelMese.length} torneo/i</div>
        </div>
        <button onClick={nextMonth} style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
      </div>

      {/* Calendar grid */}
      <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1.5px solid #e5e7eb", marginBottom: 16 }}>
        {/* Day headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
          {DAYS_IT.map((d, i) => (
            <div key={d} style={{ textAlign: "center", padding: "10px 0", fontSize: 11, fontWeight: 800, color: i >= 5 ? "#16a34a" : "#9ca3af", letterSpacing: 1 }}>{d}</div>
          ))}
        </div>

        {/* Month view */}
        {calView === "month" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
            {calDays.map((day, idx) => {
              const torneiGiorno = torneiDelGiorno(day);
              const today = isToday(day);
              const isWeekend = idx % 7 >= 5;
              return (
                <div key={idx} style={{ minHeight: 80, padding: "6px 4px", borderRight: idx % 7 !== 6 ? "1px solid #f3f4f6" : "none", borderBottom: "1px solid #f3f4f6", background: !day ? "#fafafa" : isWeekend ? "#f9fffe" : "#fff" }}>
                  {day && (
                    <>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: today ? "#16a34a" : "transparent", color: today ? "#fff" : isWeekend ? "#16a34a" : "#374151", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: today ? 800 : 600, marginBottom: 3 }}>{day}</div>
                      {torneiGiorno.map(t => (
                        <div key={t.id} onClick={() => setSelectedTorneo(t)}
                          style={{ background: getColor(t) + "20", borderLeft: `2px solid ${getColor(t)}`, borderRadius: "0 5px 5px 0", padding: "2px 4px", marginBottom: 2, cursor: "pointer", fontSize: 9, fontWeight: 700, color: getColor(t), overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          🎾 {t.nome}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Week view */}
        {calView === "week" && (
          <div>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ borderBottom: wi < weeks.length - 1 ? "2px solid #f0fdf4" : "none" }}>
                <div style={{ background: "#f0fdf4", padding: "5px 12px", fontSize: 10, fontWeight: 800, color: "#16a34a", letterSpacing: 1 }}>SETTIMANA {wi + 1}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
                  {week.map((day, di) => {
                    const torneiGiorno = torneiDelGiorno(day);
                    const today = isToday(day);
                    return (
                      <div key={di} style={{ minHeight: 100, padding: "6px 4px", borderRight: di !== 6 ? "1px solid #f3f4f6" : "none", background: !day ? "#fafafa" : di >= 5 ? "#f9fffe" : "#fff" }}>
                        {day && (
                          <>
                            <div style={{ width: 26, height: 26, borderRadius: "50%", background: today ? "#16a34a" : "transparent", color: today ? "#fff" : di >= 5 ? "#16a34a" : "#374151", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: today ? 800 : 600, marginBottom: 5 }}>{day}</div>
                            {torneiGiorno.map(t => (
                              <div key={t.id} onClick={() => setSelectedTorneo(t)}
                                style={{ background: getColor(t), borderRadius: 7, padding: "4px 6px", marginBottom: 4, cursor: "pointer", color: "#fff", fontSize: 9, fontWeight: 700, boxShadow: `0 2px 4px ${getColor(t)}40` }}>
                                🎾 {t.nome}
                                {t.maestro && <div style={{ fontSize: 8, opacity: 0.85 }}>👨‍🏫 {t.maestro}</div>}
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tornei del mese list */}
      {torneiDelMese.length > 0 && (
        <div style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1.5px solid #e5e7eb" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#111827", margin: "0 0 14px" }}>📋 Tornei di {MONTHS_IT[currentMonth]}</h3>
          {torneiDelMese.map(t => {
            const confermati = (t.partecipanti || []).filter(p => p.risposta === "confermato").length;
            const inAttesa = (t.partecipanti || []).filter(p => p.risposta === "in attesa").length;
            return (
              <div key={t.id} onClick={() => onViewTorneo(t)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 8px", borderBottom: "1px solid #f3f4f6", cursor: "pointer", borderRadius: 8, transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ width: 6, height: 44, borderRadius: 3, background: getColor(t), flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "#111827", fontSize: 14 }}>{t.nome}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                    📅 {new Date(t.data).toLocaleDateString("it-IT", { weekday: "short", day: "numeric", month: "short" })} · 📍 {t.luogo}
                    {t.maestro && ` · 🎓 ${t.maestro}`}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a" }}>✓ {confermati}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#d97706" }}>◷ {inAttesa}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: getColor(t), background: getColor(t) + "18", padding: "2px 8px", borderRadius: 10 }}>{t.categoria}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Torneo detail modal */}
      {selectedTorneo && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 200, padding: 16 }}
          onClick={() => setSelectedTorneo(null)}>
          <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: 28, width: "100%", maxWidth: 500 }}
            onClick={e => e.stopPropagation()}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: "#e5e7eb", margin: "0 auto 20px" }} />
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: getColor(selectedTorneo), marginTop: 6, flexShrink: 0 }} />
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#111827", margin: "0 0 6px" }}>{selectedTorneo.nome}</h3>
                <span style={{ fontSize: 11, fontWeight: 700, color: getColor(selectedTorneo), background: getColor(selectedTorneo) + "18", padding: "2px 10px", borderRadius: 20 }}>{selectedTorneo.categoria}</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
              <div style={{ fontSize: 14, color: "#6b7280" }}>📅 {new Date(selectedTorneo.data).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
              <div style={{ fontSize: 14, color: "#6b7280" }}>📍 {selectedTorneo.luogo}</div>
              {selectedTorneo.maestro && <div style={{ fontSize: 14, color: "#374151", fontWeight: 600 }}>🎓 {selectedTorneo.maestro}</div>}
              <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                <span style={{ fontSize: 13, color: "#16a34a", fontWeight: 700 }}>✓ {(selectedTorneo.partecipanti || []).filter(p => p.risposta === "confermato").length} Confermati</span>
                <span style={{ fontSize: 13, color: "#d97706", fontWeight: 700 }}>◷ {(selectedTorneo.partecipanti || []).filter(p => p.risposta === "in attesa").length} In attesa</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { onViewTorneo(selectedTorneo); setSelectedTorneo(null); }}
                style={{ flex: 1, padding: 12, background: "linear-gradient(135deg, #14532d, #16a34a)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                Vai al torneo →
              </button>
              <button onClick={() => setSelectedTorneo(null)}
                style={{ padding: "12px 16px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 12, fontWeight: 700, cursor: "pointer" }}>✕</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ── Login Coach ─────────────────────────────────────────────────
function LoginCoach({ onLogin }) {
  const [nome, setNome] = useState("");
  const [pin, setPin] = useState("");
  const [errore, setErrore] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!nome.trim() || !pin.trim()) { setErrore("Inserisci nome e PIN."); return; }
    setLoading(true);
    setErrore("");
    const { data } = await supabase.from("coach").select("*")
      .ilike("nome", nome.trim()).eq("pin", pin.trim()).single();
    if (data) { onLogin(data); }
    else { setErrore("Nome o PIN non corretti. Contatta l'admin."); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ background: "#fff", borderRadius: 24, padding: 40, width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: "1.5px solid #e5e7eb" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: "#14532d", margin: "0 0 4px" }}>Area Coach</h1>
          <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>Piatti Tennis Center</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Il tuo nome</label>
            <input value={nome} onChange={e => setNome(e.target.value)} placeholder="es. Carlo Ferri"
              style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>PIN</label>
            <input value={pin} onChange={e => setPin(e.target.value)} type="password" placeholder="••••"
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
          {errore && <div style={{ background: "#fee2e2", color: "#7f1d1d", padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600 }}>⚠️ {errore}</div>}
          <button onClick={handleLogin} disabled={loading}
            style={{ padding: "13px", background: "linear-gradient(135deg, #14532d, #16a34a)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: "pointer", marginTop: 4 }}>
            {loading ? "Accesso..." : "Accedi →"}
          </button>
        </div>
        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 12, marginTop: 20 }}>Non hai le credenziali? Contatta l'admin.</p>
      </div>
    </div>
  );
}

// ── Profilo Coach ───────────────────────────────────────────────
function ProfiloCoach({ coach, tornei, onLogout }) {
  const [selectedTorneo, setSelectedTorneo] = useState(null);
  const mieiTornei = tornei.filter(t => t.coach_id === coach.id);

  if (selectedTorneo) {
    return (
      <div style={{ minHeight: "100vh", background: "#f0fdf4", fontFamily: "'Inter', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 64 }}>
            <button onClick={() => setSelectedTorneo(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 14, fontWeight: 700, padding: 0 }}>← Torna al profilo</button>
          </div>
        </header>
        <main style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px" }}>
          <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(135deg, #14532d, #16a34a)", padding: "32px", color: "#fff" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, opacity: 0.7, marginBottom: 8 }}>{selectedTorneo.categoria.toUpperCase()}</div>
              <h2 style={{ margin: "0 0 12px", fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900 }}>{selectedTorneo.nome}</h2>
              <div style={{ opacity: 0.85, fontSize: 14, lineHeight: 1.8 }}>
                <div>📅 {new Date(selectedTorneo.data).toLocaleDateString("it-IT", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
                <div>📍 {selectedTorneo.luogo}</div>
                <div>⏰ Iscrizioni entro: {new Date(selectedTorneo.scadenza_iscrizione).toLocaleDateString("it-IT")}</div>
              </div>
            </div>
            <div style={{ padding: 28 }}>
              {selectedTorneo.descrizione && <p style={{ color: "#4b5563", marginTop: 0, lineHeight: 1.7, borderLeft: "3px solid #16a34a", paddingLeft: 14 }}>{selectedTorneo.descrizione}</p>}
              <h4 style={{ margin: "0 0 12px", color: "#374151", fontSize: 14, fontWeight: 800, letterSpacing: 1 }}>GIOCATORI ISCRITTI</h4>
              {(selectedTorneo.partecipanti || []).length === 0
                ? <p style={{ color: "#9ca3af", fontStyle: "italic" }}>Nessun giocatore ancora.</p>
                : (selectedTorneo.partecipanti || []).map((p, i) => (
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
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f0fdf4", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>🎾</span>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 14, color: "#14532d", lineHeight: 1 }}>PIATTI TENNIS CENTER</div>
              <div style={{ fontSize: 10, color: "#16a34a", fontWeight: 700, letterSpacing: 1 }}>SCHEDULE TOURNAMENTS</div>
            </div>
          </div>
          <button onClick={onLogout} style={{ padding: "7px 14px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Esci</button>
        </div>
      </header>
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ background: "linear-gradient(135deg, #14532d, #16a34a)", borderRadius: 16, padding: "24px 28px", marginBottom: 28, color: "#fff", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, flexShrink: 0 }}>
            {coach.nome.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, fontFamily: "'Playfair Display', serif" }}>🎓 {coach.nome}</div>
            <div style={{ opacity: 0.85, fontSize: 13, marginTop: 2 }}>{mieiTornei.length} torneo/i assegnato/i</div>
          </div>
        </div>

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#111827", margin: "0 0 16px" }}>I tuoi tornei</h3>

        {mieiTornei.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#9ca3af" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎾</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Nessun torneo assegnato ancora.</div>
          </div>
        ) : (
          mieiTornei.map(t => {
            const confermati = (t.partecipanti || []).filter(p => p.risposta === "confermato").length;
            const inAttesa = (t.partecipanti || []).filter(p => p.risposta === "in attesa").length;
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
                  {scaduto && <span style={{ background: "#f3f4f6", color: "#6b7280", fontSize: 11, padding: "3px 8px", borderRadius: 8, fontWeight: 700 }}>CHIUSO</span>}
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>
                  <div>📅 {new Date(t.data).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
                  <div>📍 {t.luogo} · 🎾 {t.categoria}</div>
                </div>
                <div style={{ display: "flex", gap: 12, borderTop: "1px solid #f3f4f6", paddingTop: 12 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "#16a34a" }}>{confermati}</div>
                    <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600 }}>CONFERMATI</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "#f59e0b" }}>{inAttesa}</div>
                    <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600 }}>IN ATTESA</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "#6b7280" }}>{(t.partecipanti || []).length}</div>
                    <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600 }}>TOTALE</div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}

// ── Gestione Coach (Admin) ──────────────────────────────────────
function GestioneCoach({ coach, onAggiungi, onElimina, onBack }) {
  const [nome, setNome] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAggiungi = async () => {
    if (!nome.trim() || !pin.trim()) return alert("Inserisci nome e PIN.");
    if (pin.length < 4) return alert("Il PIN deve avere almeno 4 cifre.");
    setLoading(true);
    await onAggiungi(nome.trim(), pin.trim());
    setNome(""); setPin("");
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 14, fontWeight: 700, marginBottom: 20, padding: 0 }}>
        ← Torna ai tornei
      </button>
      <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", padding: 28, marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#111827", margin: "0 0 20px" }}>🎓 Gestione Coach</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Nome coach</label>
            <input value={nome} onChange={e => setNome(e.target.value)} placeholder="es. Carlo Ferri"
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
          {loading ? "..." : "+ Aggiungi Coach"}
        </button>
      </div>
      <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", padding: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#374151", margin: "0 0 16px" }}>Coach registrati ({coach.length})</h3>
        {coach.length === 0 ? (
          <p style={{ color: "#9ca3af", fontStyle: "italic" }}>Nessun coach ancora.</p>
        ) : (
          coach.map(c => (
            <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #14532d, #16a34a)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 800 }}>
                  {c.nome.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#111827" }}>{c.nome}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>PIN: {c.pin}</div>
                </div>
              </div>
              <button onClick={() => { if (window.confirm(`Eliminare ${c.nome}?`)) onElimina(c.id); }}
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

// ── Main App ────────────────────────────────────────────────────
export default function App() {
  const [tornei, setTornei] = useState([]);
  const [giocatori, setGiocatori] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("welcome"); // welcome | admin | giocatore
  const [adminLoggato, setAdminLoggato] = useState(false);
  const [giocatoreLoggato, setGiocatoreLoggato] = useState(null);
  const [selectedTorneo, setSelectedTorneo] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editTorneo, setEditTorneo] = useState(null);
  const [showGiocatori, setShowGiocatori] = useState(false);
  const [showCoach, setShowCoach] = useState(false);
  const [coach, setCoach] = useState([]);
  const [coachLoggato, setCoachLoggato] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const caricaDati = async () => {
    setLoading(true);
    const { data: torneiData } = await supabase.from("tornei").select("*").order("data", { ascending: true });
    const { data: partData } = await supabase.from("partecipanti").select("*");
    const { data: giocatoriData } = await supabase.from("giocatori").select("*").order("nome");
    const { data: gruppiData } = await supabase.from("giocatore_gruppi").select("*");
    const { data: coachData } = await supabase.from("coach").select("*").order("nome");
    const torneiConPart = (torneiData || []).map(t => ({
      ...t,
      partecipanti: (partData || []).filter(p => p.torneo_id === t.id),
    }));
    // Attach groups to each player
    const giocatoriConGruppi = (giocatoriData || []).map(g => ({
      ...g,
      gruppi: (gruppiData || []).filter(gg => gg.giocatore_id === g.id).map(gg => gg.gruppo),
    }));
    setTornei(torneiConPart);
    setGiocatori(giocatoriConGruppi);
    setCoach(coachData || []);
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

  const toggleGruppo = async (giocatoreId, gruppo, isIn) => {
    // Update local state immediately for responsive UI
    setGiocatori(prev => prev.map(g => {
      if (g.id !== giocatoreId) return g;
      const gruppiAttuali = g.gruppi || [];
      const nuoviGruppi = isIn
        ? gruppiAttuali.filter(gr => gr !== gruppo)
        : [...gruppiAttuali, gruppo];
      return { ...g, gruppi: nuoviGruppi };
    }));
    // Then persist to database
    if (isIn) {
      await supabase.from("giocatore_gruppi").delete()
        .eq("giocatore_id", giocatoreId).eq("gruppo", gruppo);
    } else {
      await supabase.from("giocatore_gruppi").insert([{ giocatore_id: giocatoreId, gruppo }]);
    }
  };

  const aggiungiCoach = async (nome, pin) => {
    await supabase.from("coach").insert([{ nome, pin }]);
    await caricaDati();
  };

  const eliminaCoach = async (id) => {
    await supabase.from("coach").delete().eq("id", id);
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

  // Login coach
  if (view === "coach" && !coachLoggato) {
    return <LoginCoach onLogin={(c) => setCoachLoggato(c)} />;
  }

  // Profilo coach
  if (view === "coach" && coachLoggato) {
    return <ProfiloCoach coach={coachLoggato} tornei={tornei} onLogout={() => { setCoachLoggato(null); setView("welcome"); }} />;
  }

  // Login giocatore
  if (view === "giocatore" && !giocatoreLoggato) {
    return <LoginGiocatore onLogin={(g) => setGiocatoreLoggato(g)} />;
  }

  // Welcome screen
  if (view === "welcome") {
    return (
      <WelcomeScreen
        onScegliAdmin={() => setView("admin")}
        onScegliGiocatore={() => setView("giocatore")}
        onScegliCoach={() => setView("coach")}
      />
    );
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
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 16, color: "#14532d", lineHeight: 1 }}>PIATTI TENNIS CENTER</div>
              <div style={{ fontSize: 10, color: "#16a34a", fontWeight: 700, letterSpacing: 1 }}>SCHEDULE TOURNAMENTS</div>
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
          <AdminNewTorneo torneoEdit={editTorneo} giocatori={giocatori} coach={coach} onSave={saveTorneo} onCancel={() => { setShowForm(false); setEditTorneo(null); }} />
        ) : showCoach ? (
          <GestioneCoach coach={coach} onAggiungi={aggiungiCoach} onElimina={eliminaCoach} onBack={() => setShowCoach(false)} />
        ) : showGiocatori ? (
          <GestioneGiocatori giocatori={giocatori} onAggiungi={aggiungiGiocatore} onElimina={eliminaGiocatore} onToggleGruppo={toggleGruppo} onBack={() => setShowGiocatori(false)} />
        ) : selectedTorneo ? (
          <TorneoDetailAdmin torneo={selectedTorneo} onBack={() => setSelectedTorneo(null)}
            onRispondi={rispondi} onDelete={deleteTorneo}
            onEdit={(t) => { setEditTorneo(t); setShowForm(true); setSelectedTorneo(null); }} />
        ) : (
          <AdminCalendar
            tornei={tornei}
            giocatori={giocatori}
            onViewTorneo={setSelectedTorneo}
            onNewTorneo={() => { setShowForm(true); setEditTorneo(null); }}
            onShowGiocatori={() => setShowGiocatori(true)}
          />
        )}
      </main>
    </div>
  );
}
