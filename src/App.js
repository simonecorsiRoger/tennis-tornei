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

function TorneoCard({ torneo, onViewDetail, view, nomeGiocatore }) {
  const confermati = (torneo.partecipanti || []).filter(p => p.risposta === "confermato").length;
  const inAttesa = (torneo.partecipanti || []).filter(p => p.risposta === "in attesa").length;
  const oggi = new Date().toISOString().split("T")[0];
  const scaduto = torneo.scadenza_iscrizione < oggi;
  const mioStato = nomeGiocatore
    ? (torneo.partecipanti || []).find(p => p.nome.toLowerCase() === nomeGiocatore.toLowerCase())?.risposta
    : null;

  return (
    <div
      onClick={() => onViewDetail(torneo)}
      style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 16, padding: "24px", cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.10)"; e.currentTarget.style.borderColor = "#16a34a"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "#e5e7eb"; }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: scaduto ? "#d1d5db" : "linear-gradient(90deg, #16a34a, #4ade80)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#111827", fontFamily: "'Playfair Display', serif", lineHeight: 1.3 }}>{torneo.nome}</h3>
        <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 8 }}>
          {mioStato && <Badge stato={mioStato} />}
          {scaduto && <span style={{ background: "#f3f4f6", color: "#6b7280", fontSize: 11, padding: "3px 8px", borderRadius: 8, fontWeight: 700, whiteSpace: "nowrap" }}>CHIUSO</span>}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6b7280", fontSize: 13 }}>
          <span>📅</span> {new Date(torneo.data).toLocaleDateString("it-IT", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6b7280", fontSize: 13 }}>
          <span>📍</span> {torneo.luogo}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6b7280", fontSize: 13 }}>
          <span>🎾</span> {torneo.categoria}
        </div>
        {torneo.maestro && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151", fontWeight: 600 }}>
            <span>🎓</span> {torneo.maestro}
          </div>
        )}
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
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>MAX POSTI</div>
        </div>
        {view === "admin" && (
          <div style={{ marginLeft: "auto", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#3b82f6" }}>{(torneo.partecipanti || []).length}</div>
            <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>ISCRITTI</div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminNewTorneo({ onSave, onCancel, torneoEdit }) {
  const empty = { nome: "", data: "", luogo: "", categoria: CATEGORIE[0], max_partecipanti: 16, scadenza_iscrizione: "", descrizione: "", maestro: "" };
  const [form, setForm] = useState(torneoEdit ? { ...torneoEdit } : empty);
  const [partecipanti, setPartecipanti] = useState(torneoEdit ? torneoEdit.partecipanti || [] : []);
  const [nuovoNome, setNuovoNome] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const aggiungiPartecipante = () => {
    const nome = nuovoNome.trim();
    if (!nome) return;
    if (partecipanti.find(p => p.nome.toLowerCase() === nome.toLowerCase())) {
      alert("Questo nome è già presente nell'elenco.");
      return;
    }
    setPartecipanti(prev => [...prev, { nome, risposta: "in attesa" }]);
    setNuovoNome("");
  };

  const rimuoviPartecipante = (nome) => {
    setPartecipanti(prev => prev.filter(p => p.nome !== nome));
  };

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
          { label: "Luogo *", key: "luogo", type: "text", placeholder: "es. Tennis Club Milano, Campo 1" },
          { label: "Scadenza iscrizioni *", key: "scadenza_iscrizione", type: "date" },
          { label: "Max partecipanti", key: "max_partecipanti", type: "number" },
        ].map(({ label, key, type, placeholder }) => (
          <label key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{label}</span>
            <input
              type={type}
              value={form[key]}
              placeholder={placeholder}
              onChange={e => handleChange(key, type === "number" ? parseInt(e.target.value) : e.target.value)}
              style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, outline: "none", fontFamily: "inherit" }}
            />
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
          <input
            type="text"
            value={form.maestro || ""}
            placeholder="es. Carlo Ferri"
            onChange={e => handleChange("maestro", e.target.value)}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, outline: "none", fontFamily: "inherit" }}
          />
        </label>

        {/* Sezione partecipanti invitati */}
        <div style={{ borderTop: "1.5px solid #e5e7eb", paddingTop: 20, marginTop: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#374151" }}>👥 Partecipanti invitati</span>
            <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>{partecipanti.length} / {form.max_partecipanti || "∞"}</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input
              value={nuovoNome}
              onChange={e => setNuovoNome(e.target.value)}
              onKeyDown={e => e.key === "Enter" && aggiungiPartecipante()}
              placeholder="Nome e cognome giocatore..."
              style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, outline: "none", fontFamily: "inherit" }}
            />
            <button onClick={aggiungiPartecipante}
              style={{ padding: "10px 18px", background: "#14532d", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, fontSize: 20, cursor: "pointer", lineHeight: 1 }}>
              +
            </button>
          </div>
          {partecipanti.length === 0 ? (
            <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 16px", color: "#9ca3af", fontSize: 13, textAlign: "center", border: "1.5px dashed #e5e7eb" }}>
              Nessun partecipante aggiunto. Inserisci i nomi dei giocatori invitati.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 220, overflowY: "auto" }}>
              {partecipanti.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f9fafb", borderRadius: 10, padding: "9px 14px", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #16a34a, #4ade80)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>
                      {p.nome.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontWeight: 600, color: "#111827", fontSize: 14 }}>{p.nome}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Badge stato={p.risposta} />
                    <button onClick={() => rimuoviPartecipante(p.nome)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 18, lineHeight: 1, padding: "0 2px" }}>×</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <button onClick={handleSubmit} disabled={loading}
            style={{ flex: 1, padding: "12px", background: loading ? "#9ca3af" : "linear-gradient(135deg, #16a34a, #22c55e)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Salvataggio..." : torneoEdit ? "Salva modifiche" : "Crea Torneo"}
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

function TorneoDetail({ torneo, view, onBack, onRispondi, onDelete, onEdit, nomeGiocatore }) {
  const [inputNome, setInputNome] = useState(nomeGiocatore || "");
  const [showRispondi, setShowRispondi] = useState(false);
  const [loading, setLoading] = useState(false);
  const oggi = new Date().toISOString().split("T")[0];
  const scaduto = torneo.scadenza_iscrizione < oggi;
  const partecipanti = torneo.partecipanti || [];
  const confermati = partecipanti.filter(p => p.risposta === "confermato");
  const rifiutati = partecipanti.filter(p => p.risposta === "rifiutato");
  const inAttesa = partecipanti.filter(p => p.risposta === "in attesa");
  const mioRecord = partecipanti.find(p => p.nome.toLowerCase() === inputNome.toLowerCase());

  const handleRispondi = async (risposta) => {
    if (!inputNome.trim()) return alert("Inserisci il tuo nome.");
    setLoading(true);
    await onRispondi(torneo.id, inputNome.trim(), risposta);
    setLoading(false);
    setShowRispondi(false);
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <button onClick={onBack}
        style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 14, fontWeight: 700, marginBottom: 20, padding: 0 }}>
        ← Torna ai tornei
      </button>
      <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg, #14532d, #16a34a)", padding: "32px 32px 24px", color: "#fff" }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
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

          {view === "admin" && (
            <>
              <h4 style={{ margin: "0 0 12px", color: "#374151", fontSize: 14, fontWeight: 800, letterSpacing: 1 }}>ELENCO PARTECIPANTI</h4>
              {partecipanti.length === 0
                ? <p style={{ color: "#9ca3af", fontStyle: "italic" }}>Nessun partecipante ancora.</p>
                : partecipanti.map((p, i) => (
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
            </>
          )}

          {view === "player" && (
            <>
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
                  {!mioRecord && (
                    <div style={{ background: "#fef9c3", border: "1.5px solid #fde68a", borderRadius: 12, padding: "12px 16px", marginBottom: 14, fontSize: 13, color: "#78350f" }}>
                      ⚠️ Non sei nella lista degli invitati. Puoi comunque rispondere inserendo il tuo nome.
                    </div>
                  )}
                  <button onClick={() => setShowRispondi(true)}
                    style={{ width: "100%", padding: 14, background: "linear-gradient(135deg, #16a34a, #22c55e)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: "pointer" }}>
                    🎾 {mioRecord ? "Cambia risposta" : "Rispondi all'invito"}
                  </button>
                </div>
              ) : (
                <div style={{ background: "#f9fafb", borderRadius: 14, padding: 20 }}>
                  <h4 style={{ margin: "0 0 14px", color: "#111827" }}>Come ti chiami?</h4>
                  <input
                    value={inputNome}
                    onChange={e => setInputNome(e.target.value)}
                    placeholder="Nome e cognome"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #d1d5db", fontSize: 14, marginBottom: 14, boxSizing: "border-box", fontFamily: "inherit" }}
                  />
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => handleRispondi("confermato")} disabled={loading}
                      style={{ flex: 1, padding: 12, background: "#16a34a", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, cursor: "pointer", fontSize: 14 }}>
                      ✓ Partecipo
                    </button>
                    <button onClick={() => handleRispondi("rifiutato")} disabled={loading}
                      style={{ flex: 1, padding: 12, background: "#dc2626", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, cursor: "pointer", fontSize: 14 }}>
                      ✗ Non partecipo
                    </button>
                    <button onClick={() => setShowRispondi(false)}
                      style={{ padding: "12px 16px", background: "#e5e7eb", color: "#374151", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("player");
  const [tornei, setTornei] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTorneo, setSelectedTorneo] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editTorneo, setEditTorneo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [nomeGiocatore, setNomeGiocatore] = useState("");
  const [nomeInput, setNomeInput] = useState("");

  // Carica tornei da Supabase
  const caricaTornei = async () => {
    setLoading(true);
    const { data: torneiData } = await supabase.from("tornei").select("*").order("data", { ascending: true });
    const { data: partData } = await supabase.from("partecipanti").select("*");
    const torneiConPart = (torneiData || []).map(t => ({
      ...t,
      partecipanti: (partData || []).filter(p => p.torneo_id === t.id),
    }));
    setTornei(torneiConPart);
    setLoading(false);
  };

  useEffect(() => { caricaTornei(); }, []);

  const saveTorneo = async (form) => {
    const { partecipanti, ...dati } = form;
    if (editTorneo) {
      // Aggiorna torneo
      await supabase.from("tornei").update({
        nome: dati.nome, data: dati.data, luogo: dati.luogo, categoria: dati.categoria,
        max_partecipanti: dati.max_partecipanti, scadenza_iscrizione: dati.scadenza_iscrizione,
        descrizione: dati.descrizione, maestro: dati.maestro,
      }).eq("id", editTorneo.id);
      // Elimina e reinserisci i partecipanti
      await supabase.from("partecipanti").delete().eq("torneo_id", editTorneo.id);
      if (partecipanti.length > 0) {
        await supabase.from("partecipanti").insert(
          partecipanti.map(p => ({ torneo_id: editTorneo.id, nome: p.nome, risposta: p.risposta }))
        );
      }
    } else {
      // Crea nuovo torneo
      const { data: newTorneo } = await supabase.from("tornei").insert([{
        nome: dati.nome, data: dati.data, luogo: dati.luogo, categoria: dati.categoria,
        max_partecipanti: dati.max_partecipanti, scadenza_iscrizione: dati.scadenza_iscrizione,
        descrizione: dati.descrizione, maestro: dati.maestro,
      }]).select().single();
      if (newTorneo && partecipanti.length > 0) {
        await supabase.from("partecipanti").insert(
          partecipanti.map(p => ({ torneo_id: newTorneo.id, nome: p.nome, risposta: p.risposta }))
        );
      }
    }
    await caricaTornei();
    setShowForm(false);
    setEditTorneo(null);
  };

  const deleteTorneo = async (id) => {
    await supabase.from("tornei").delete().eq("id", id);
    await caricaTornei();
    setSelectedTorneo(null);
  };

  const rispondi = async (torneoId, nome, risposta) => {
    const { data: existing } = await supabase.from("partecipanti")
      .select("*").eq("torneo_id", torneoId).ilike("nome", nome).single();
    if (existing) {
      await supabase.from("partecipanti").update({ risposta }).eq("id", existing.id);
    } else {
      await supabase.from("partecipanti").insert([{ torneo_id: torneoId, nome, risposta }]);
    }
    await caricaTornei();
    // Aggiorna selectedTorneo
    setSelectedTorneo(prev => {
      if (!prev || prev.id !== torneoId) return prev;
      const lista = prev.partecipanti || [];
      const exists = lista.find(p => p.nome.toLowerCase() === nome.toLowerCase());
      const nuovi = exists
        ? lista.map(p => p.nome.toLowerCase() === nome.toLowerCase() ? { ...p, risposta } : p)
        : [...lista, { nome, risposta }];
      return { ...prev, partecipanti: nuovi };
    });
  };

  const torneiVisibili = tornei.filter(t => {
    const matchSearch =
      t.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.luogo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchSearch) return false;
    if (view === "player" && nomeGiocatore) {
      return (t.partecipanti || []).some(p => p.nome.toLowerCase() === nomeGiocatore.toLowerCase());
    }
    return true;
  });

  const confermaNome = () => setNomeGiocatore(nomeInput.trim());

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
            <button onClick={() => { setView("player"); setSelectedTorneo(null); setShowForm(false); }}
              style={{ padding: "7px 16px", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: view === "player" ? "#fff" : "transparent", color: view === "player" ? "#16a34a" : "#6b7280", boxShadow: view === "player" ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }}>
              👤 Giocatori
            </button>
            <button onClick={() => { setView("admin"); setSelectedTorneo(null); setShowForm(false); }}
              style={{ padding: "7px 16px", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: view === "admin" ? "#fff" : "transparent", color: view === "admin" ? "#16a34a" : "#6b7280", boxShadow: view === "admin" ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }}>
              ⚙️ Admin
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px" }}>
        {showForm ? (
          <AdminNewTorneo torneoEdit={editTorneo} onSave={saveTorneo} onCancel={() => { setShowForm(false); setEditTorneo(null); }} />
        ) : selectedTorneo ? (
          <TorneoDetail
            torneo={selectedTorneo} view={view} onBack={() => setSelectedTorneo(null)}
            onRispondi={rispondi} onDelete={deleteTorneo}
            onEdit={(t) => { setEditTorneo(t); setShowForm(true); setSelectedTorneo(null); }}
            nomeGiocatore={nomeGiocatore}
          />
        ) : (
          <>
            {view === "player" && (
              <div style={{ background: "linear-gradient(135deg, #14532d, #16a34a)", borderRadius: 16, padding: "20px 24px", marginBottom: 24, color: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 32 }}>🎾</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 17 }}>{nomeGiocatore ? `Ciao, ${nomeGiocatore}!` : "Chi sei?"}</div>
                    <div style={{ opacity: 0.85, fontSize: 13 }}>
                      {nomeGiocatore ? "Ecco i tornei a cui sei stato invitato." : "Inserisci il tuo nome per vedere i tornei a cui sei invitato."}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input value={nomeInput} onChange={e => setNomeInput(e.target.value)} onKeyDown={e => e.key === "Enter" && confermaNome()}
                    placeholder="Es. Marco Rossi"
                    style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "none", fontSize: 14, fontFamily: "inherit", outline: "none", color: "#111827" }} />
                  <button onClick={confermaNome}
                    style={{ padding: "10px 18px", background: "rgba(255,255,255,0.2)", color: "#fff", border: "2px solid rgba(255,255,255,0.4)", borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                    Cerca
                  </button>
                  {nomeGiocatore && (
                    <button onClick={() => { setNomeGiocatore(""); setNomeInput(""); }}
                      style={{ padding: "10px 14px", background: "rgba(255,255,255,0.1)", color: "#fff", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                      ✕ Tutti
                    </button>
                  )}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "center" }}>
              <div style={{ flex: 1, position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}>🔍</span>
                <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Cerca torneo, luogo, categoria..."
                  style={{ width: "100%", padding: "11px 14px 11px 38px", borderRadius: 12, border: "1.5px solid #e5e7eb", fontSize: 14, background: "#fff", boxSizing: "border-box", outline: "none", fontFamily: "inherit" }} />
              </div>
              {view === "admin" && (
                <button onClick={() => { setShowForm(true); setEditTorneo(null); }}
                  style={{ padding: "11px 20px", background: "linear-gradient(135deg, #14532d, #16a34a)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>
                  + Nuovo Torneo
                </button>
              )}
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Caricamento tornei...</div>
              </div>
            ) : torneiVisibili.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🎾</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>
                  {view === "player" && nomeGiocatore ? `Nessun torneo trovato per "${nomeGiocatore}"` : "Nessun torneo trovato"}
                </div>
                {view === "admin" && <div style={{ fontSize: 14, marginTop: 6 }}>Clicca su "+ Nuovo Torneo" per aggiungerne uno.</div>}
              </div>
            ) : (
              <div style={{ display: "grid", gap: 16 }}>
                {torneiVisibili.map(t => (
                  <TorneoCard key={t.id} torneo={t} view={view} onViewDetail={setSelectedTorneo} nomeGiocatore={nomeGiocatore} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
