// ─────────────────────────── HELPERS ───────────────────────────
const API = '/api';

// Rich Text Helpers
function richCmd(cmd, val = null) {
    document.execCommand(cmd, false, val);
    markAsUnsaved();
}

function getRich(id) {
    const el = document.getElementById(id);
    return el ? el.innerHTML : '';
}

function setRich(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html || '';
}

let state = {
    currentPatientId: null,
    patients: [],
    consultations: [],
    treatments: [],
    documents: [],
    hasUnsaved: false,
    selectedPain: null,
    painMarkers: [], // [{x: %, y: %}]
};

// ─────────────────────────── ASSETS ───────────────────────────
const SILHOUETTES = {
    dog: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
        <defs>
            <linearGradient id="dog-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#f5f0ee" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="#ebe3df" stop-opacity="0.3"/>
            </linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#dog-bg)" rx="12"/>

        <!-- Body contour -->
        <path d="M60,68 C58,60 52,52 48,48 L44,42 L42,36 C42,32 46,30 50,34 L54,40 L58,46
                 C62,42 68,38 78,36 C90,33 110,30 135,28 C160,26 185,28 210,32
                 C230,35 248,40 260,46 C268,50 274,56 276,62 L278,68 L280,78
                 C282,82 284,86 284,92 L282,100 L278,108 L274,116 L270,128 L268,140 L266,150
                 C264,156 260,160 254,160 C250,160 248,156 248,150 L250,138 L252,126
                 L250,118 L246,112 C240,108 234,106 228,106 C222,108 216,112 212,118
                 L208,128 L204,140 L200,150 C198,156 194,160 188,160 C184,160 182,156 182,150
                 L184,138 L188,126 L190,118 L188,110 L184,106
                 C176,102 164,100 150,100 C136,100 124,102 116,106
                 L112,110 L110,118 L108,128 L104,140 L100,150
                 C98,156 94,160 88,160 C84,160 82,156 82,150
                 L84,138 L88,126 L90,118 L88,112 L84,108 C78,104 72,102 66,102
                 C60,104 56,108 54,114 L50,126 L46,140 L44,150
                 C42,156 38,160 32,160 C28,160 26,156 26,150
                 L28,138 L32,126 L36,114 L40,104 L44,94 L48,84 L52,76 L56,70 Z"
              fill="rgba(202,165,154,0.08)" stroke="#8a7873" stroke-width="1.2" stroke-linejoin="round"/>

        <!-- Ear -->
        <path d="M48,48 C44,40 38,34 36,30 C34,24 38,22 42,26 L48,36 L52,44" fill="rgba(202,165,154,0.12)" stroke="#8a7873" stroke-width="1"/>
        <!-- Eye -->
        <circle cx="52" cy="52" r="2.5" fill="#8a7873" opacity="0.6"/>
        <!-- Nose -->
        <ellipse cx="42" cy="58" rx="3" ry="2" fill="#8a7873" opacity="0.4"/>
        <!-- Mouth -->
        <path d="M42,60 Q46,64 50,62" fill="none" stroke="#8a7873" stroke-width="0.6" opacity="0.5"/>

        <!-- Tail -->
        <path d="M278,68 C284,60 290,54 294,50 C298,46 302,48 300,52 C296,58 288,66 280,72" fill="none" stroke="#8a7873" stroke-width="1.2"/>

        <!-- Spine (dashed) -->
        <path d="M58,52 C70,42 90,35 120,32 C150,29 180,30 210,34 C240,38 260,46 274,58" fill="none" stroke="#ba8c80" stroke-width="1" stroke-dasharray="4,3" opacity="0.7"/>

        <!-- Ribcage lines -->
        <path d="M110,36 C108,48 106,62 110,76" fill="none" stroke="#ba8c80" stroke-width="0.5" opacity="0.3"/>
        <path d="M125,33 C122,46 120,60 124,76" fill="none" stroke="#ba8c80" stroke-width="0.5" opacity="0.3"/>
        <path d="M140,30 C137,44 136,58 140,76" fill="none" stroke="#ba8c80" stroke-width="0.5" opacity="0.3"/>
        <path d="M155,29 C152,42 152,58 156,76" fill="none" stroke="#ba8c80" stroke-width="0.5" opacity="0.3"/>
        <path d="M170,30 C168,44 168,58 172,78" fill="none" stroke="#ba8c80" stroke-width="0.5" opacity="0.3"/>

        <!-- Joints (circles) -->
        <!-- Front left: shoulder, elbow, carpus -->
        <circle cx="84" cy="108" r="3" fill="rgba(186,140,128,0.2)" stroke="#ba8c80" stroke-width="0.8"/>
        <circle cx="88" cy="126" r="2.5" fill="rgba(186,140,128,0.15)" stroke="#ba8c80" stroke-width="0.6"/>
        <circle cx="86" cy="144" r="2" fill="rgba(186,140,128,0.15)" stroke="#ba8c80" stroke-width="0.6"/>
        <!-- Front right: shoulder, elbow, carpus -->
        <circle cx="116" cy="106" r="3" fill="rgba(186,140,128,0.2)" stroke="#ba8c80" stroke-width="0.8"/>
        <circle cx="110" cy="126" r="2.5" fill="rgba(186,140,128,0.15)" stroke="#ba8c80" stroke-width="0.6"/>
        <circle cx="104" cy="144" r="2" fill="rgba(186,140,128,0.15)" stroke="#ba8c80" stroke-width="0.6"/>
        <!-- Hind left: hip, knee, tarsus -->
        <circle cx="212" cy="118" r="3" fill="rgba(186,140,128,0.2)" stroke="#ba8c80" stroke-width="0.8"/>
        <circle cx="206" cy="134" r="2.5" fill="rgba(186,140,128,0.15)" stroke="#ba8c80" stroke-width="0.6"/>
        <circle cx="200" cy="148" r="2" fill="rgba(186,140,128,0.15)" stroke="#ba8c80" stroke-width="0.6"/>
        <!-- Hind right: hip, knee, tarsus -->
        <circle cx="246" cy="112" r="3" fill="rgba(186,140,128,0.2)" stroke="#ba8c80" stroke-width="0.8"/>
        <circle cx="252" cy="126" r="2.5" fill="rgba(186,140,128,0.15)" stroke="#ba8c80" stroke-width="0.6"/>
        <circle cx="250" cy="144" r="2" fill="rgba(186,140,128,0.15)" stroke="#ba8c80" stroke-width="0.6"/>

        <!-- Region labels -->
        <style>text.lbl{font:bold 6px 'Outfit',sans-serif;fill:#8a7873;opacity:0.65;text-anchor:middle;pointer-events:none;}</style>
        <text class="lbl" x="60" y="28">Cervical</text>
        <text class="lbl" x="110" y="22">Torácica</text>
        <text class="lbl" x="170" y="22">Lombar</text>
        <text class="lbl" x="240" y="28">Sacral</text>
        <text class="lbl" x="48" y="68">Cabeça</text>
        <text class="lbl" x="296" y="44">Cauda</text>
        <text class="lbl" x="72" y="172">M.A.E.</text>
        <text class="lbl" x="120" y="172">M.A.D.</text>
        <text class="lbl" x="194" y="172">M.P.E.</text>
        <text class="lbl" x="256" y="172">M.P.D.</text>
        <text class="lbl" x="85" cy="98" y="98">Ombro</text>
        <text class="lbl" x="248" y="102">Quadril</text>
    </svg>`,
    cat: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
        <defs>
            <linearGradient id="cat-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#f5f0ee" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="#ebe3df" stop-opacity="0.3"/>
            </linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#cat-bg)" rx="12"/>

        <!-- Body contour (feline proportions: longer body, shorter legs, arched back) -->
        <path d="M68,72 C64,64 58,56 54,50 L50,44 C48,38 44,34 40,30 C38,24 36,20 40,22
                 C44,24 48,28 52,34 L56,42 L60,50
                 C66,44 76,38 90,34 C105,30 125,28 150,28 C175,28 200,30 220,34
                 C238,38 252,44 262,52 C268,58 272,66 272,74
                 C274,80 276,88 276,96 L274,104 L270,112 L266,122 L264,134 L262,146
                 C260,152 256,156 250,156 C246,156 244,152 246,146 L248,134 L250,122
                 L248,114 L244,108 C238,104 232,102 226,102 C220,104 214,108 210,116
                 L206,128 L202,140 L198,148 C196,154 192,156 186,156 C182,156 180,152 182,146
                 L186,134 L190,122 L192,114 L190,108
                 C182,104 170,100 155,100 C140,100 128,102 120,106
                 L116,112 L114,120 L110,132 L106,144 L102,148
                 C100,154 96,156 90,156 C86,156 84,152 86,146
                 L90,134 L94,122 L96,114 L94,108 L90,104 C84,100 78,98 72,98
                 C66,100 62,104 60,110 L56,122 L52,136 L48,146
                 C46,152 42,156 36,156 C32,156 30,152 32,146
                 L36,134 L40,120 L44,108 L48,96 L52,86 L56,78 L62,72 Z"
              fill="rgba(202,165,154,0.08)" stroke="#8a7873" stroke-width="1.2" stroke-linejoin="round"/>

        <!-- Ears (pointy triangular) -->
        <path d="M54,50 L44,28 L40,22 C40,20 42,20 44,22 L50,32 L56,44"
              fill="rgba(202,165,154,0.12)" stroke="#8a7873" stroke-width="0.8"/>
        <path d="M58,48 L52,26 L48,20 C48,18 50,18 52,20 L56,30 L60,42"
              fill="rgba(202,165,154,0.12)" stroke="#8a7873" stroke-width="0.8"/>
        <!-- Eye (larger for cat) -->
        <ellipse cx="58" cy="56" rx="3" ry="2.5" fill="#8a7873" opacity="0.5"/>
        <circle cx="57" cy="56" r="1" fill="#2c2422" opacity="0.4"/>
        <!-- Nose -->
        <path d="M48,62 L50,64 L52,62" fill="rgba(186,140,128,0.4)" stroke="#8a7873" stroke-width="0.5"/>
        <!-- Whiskers -->
        <line x1="38" y1="60" x2="48" y2="62" stroke="#8a7873" stroke-width="0.3" opacity="0.4"/>
        <line x1="36" y1="64" x2="48" y2="64" stroke="#8a7873" stroke-width="0.3" opacity="0.4"/>
        <line x1="52" y1="62" x2="64" y2="58" stroke="#8a7873" stroke-width="0.3" opacity="0.4"/>
        <line x1="52" y1="64" x2="66" y2="62" stroke="#8a7873" stroke-width="0.3" opacity="0.4"/>

        <!-- Tail (long, curved, upward) -->
        <path d="M272,74 C280,66 288,56 294,44 C298,36 302,30 306,28 C310,26 312,30 308,38
                 C304,46 296,58 286,70" fill="none" stroke="#8a7873" stroke-width="1.2"/>

        <!-- Spine (dashed) -->
        <path d="M62,54 C78,42 100,34 130,30 C160,28 190,30 220,36 C245,42 260,50 270,62" fill="none" stroke="#ba8c80" stroke-width="1" stroke-dasharray="4,3" opacity="0.7"/>

        <!-- Ribcage -->
        <path d="M115,34 C112,46 112,62 116,78" fill="none" stroke="#ba8c80" stroke-width="0.5" opacity="0.25"/>
        <path d="M135,30 C132,44 132,60 136,78" fill="none" stroke="#ba8c80" stroke-width="0.5" opacity="0.25"/>
        <path d="M155,28 C152,42 152,60 156,78" fill="none" stroke="#ba8c80" stroke-width="0.5" opacity="0.25"/>
        <path d="M175,30 C172,44 172,60 176,80" fill="none" stroke="#ba8c80" stroke-width="0.5" opacity="0.25"/>

        <!-- Joints -->
        <circle cx="90" cy="104" r="3" fill="rgba(186,140,128,0.2)" stroke="#ba8c80" stroke-width="0.8"/>
        <circle cx="94" cy="122" r="2.5" fill="rgba(186,140,128,0.15)" stroke="#ba8c80" stroke-width="0.6"/>
        <circle cx="120" cy="106" r="3" fill="rgba(186,140,128,0.2)" stroke="#ba8c80" stroke-width="0.8"/>
        <circle cx="114" cy="122" r="2.5" fill="rgba(186,140,128,0.15)" stroke="#ba8c80" stroke-width="0.6"/>
        <circle cx="210" cy="116" r="3" fill="rgba(186,140,128,0.2)" stroke="#ba8c80" stroke-width="0.8"/>
        <circle cx="204" cy="134" r="2.5" fill="rgba(186,140,128,0.15)" stroke="#ba8c80" stroke-width="0.6"/>
        <circle cx="244" cy="108" r="3" fill="rgba(186,140,128,0.2)" stroke="#ba8c80" stroke-width="0.8"/>
        <circle cx="250" cy="122" r="2.5" fill="rgba(186,140,128,0.15)" stroke="#ba8c80" stroke-width="0.6"/>

        <!-- Region labels -->
        <style>text.lbl{font:bold 6px 'Outfit',sans-serif;fill:#8a7873;opacity:0.65;text-anchor:middle;pointer-events:none;}</style>
        <text class="lbl" x="68" y="28">Cervical</text>
        <text class="lbl" x="120" y="22">Torácica</text>
        <text class="lbl" x="180" y="22">Lombar</text>
        <text class="lbl" x="248" y="30">Sacral</text>
        <text class="lbl" x="50" y="74">Cabeça</text>
        <text class="lbl" x="304" y="24">Cauda</text>
        <text class="lbl" x="78" y="168">M.A.E.</text>
        <text class="lbl" x="126" y="168">M.A.D.</text>
        <text class="lbl" x="196" y="168">M.P.E.</text>
        <text class="lbl" x="256" y="168">M.P.D.</text>
    </svg>`
};

// ─────────────────────────── BOOT ───────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
    await loadPatientList();
    setupEventListeners();

    document.getElementById('tab-fisiatria-btn').addEventListener('click', () => {
        switchTab(4);
        setTimeout(initFisiatria, 120);
    });
});

// ─────────────────────────── PATIENT LIST ───────────────────────────
async function loadPatientList() {
    try {
        const res = await fetch(`${API}/patients/`);
        if (!res.ok) throw new Error();
        state.patients = await res.json();
        renderSidebar();
        if (state.patients.length > 0 && !state.currentPatientId) {
            selectPatient(state.patients[0].id);
        }
    } catch {
        showToast('Não foi possível carregar pacientes', 'error');
    }
}

function renderSidebar(filter = '') {
    const list = document.getElementById('sidebar-patient-list');
    const filtered = filter
        ? state.patients.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
        : state.patients;

    if (filtered.length === 0) {
        list.innerHTML = `<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:0.85rem;">Nenhum paciente encontrado</div>`;
        return;
    }

    list.innerHTML = `
        <div class="sidebar-action" onclick="enterApp('landing')" style="padding:10px 14px; border-bottom:1px solid var(--border); cursor:pointer; display:flex; align-items:center; gap:10px; color:var(--text-muted); font-size:0.85rem; font-weight:600;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Início / Sair
        </div>
    ` + filtered.map(p => `
        <div class="patient-item ${state.currentPatientId === p.id ? 'active' : ''}" onclick="selectPatient(${p.id})">
            <span class="p-icon">${p.species === 'Cão' ? '🐕' : '🐈'}</span>
            <div class="patient-info">
                <div class="p-name">${escHtml(p.name)}</div>
                <div class="p-breed">${escHtml(p.species || '')}${p.breed ? ' · ' + escHtml(p.breed) : ''}</div>
            </div>
        </div>
    `).join('');
}

function filterPatients(q) {
    renderSidebar(q);
}

async function selectPatient(id) {
    if (state.hasUnsaved && !await confirmAction('Há alterações não salvas. Continuar?')) return;
    state.currentPatientId = id;
    renderSidebar(document.getElementById('patient-search').value);
    await loadPatientData();
    switchTab(0);
}

// ─────────────────────────── PATIENT DATA ───────────────────────────
async function loadPatientData() {
    if (!state.currentPatientId) return;
    try {
        const res = await fetch(`${API}/patients/${state.currentPatientId}`);
        if (!res.ok) { showToast('Erro ao carregar paciente', 'error'); return; }
        const data = await res.json();

        ['pat-name', 'pat-species', 'pat-breed', 'pat-birth', 'pat-tutor', 'pat-phone'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const key = id.replace('pat-', '');
                el.value = data[key] || '';
            }
        });

        // Rich field for conditions
        setRich('pat-conditions', data.allergies || '');

        const img = document.getElementById('patient-img');
        if (img) {
            img.src = data.photo_path ? `${API}${data.photo_path}` : `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23e9ecef' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23adb5bd' font-size='60'%3E${(data.species || 'Cão').toLowerCase().includes('cat') ? '🐱' : '🐶'}%3C/text%3E%3C/svg%3E`;
        }

        state.consultations = data.consultations || [];
        state.treatments = data.treatments || [];
        state.documents = data.documents || [];
        renderConsultations();
        renderTreatments();
        renderDocuments();

        // Load Fisiatria Summary
        const fisRes = await fetch(`${API}/patients/${state.currentPatientId}/fisiatria/`);
        if (fisRes.ok) {
            const fisData = await fisRes.json();
            const card = document.getElementById('fisiatria-summary-card');
            const content = document.getElementById('fisiatria-summary-content');
            if (fisData && fisData.length > 0 && card && content) {
                const last = fisData[fisData.length - 1]; // Assume chronological order or last is latest
                const emojis = ['😀 Sem dor', '😐 Dor leve', '😫 Dor moderada', '😭 Dor severa'];
                const painText = last.pain_level !== null ? emojis[last.pain_level] || 'Desconhecida' : 'Não registrada';
                const checklistItems = last.gait_analysis ? Object.entries(last.gait_analysis).filter(([k, v]) => v).map(([k]) => k.replace('_', ' ')).join(', ') : '';

                content.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 8px;">
                        <div>
                            <strong style="display:block; color:var(--text); margin-bottom:4px;">Nível de Dor: ${painText}</strong>
                            ${checklistItems ? `<div style="font-size:0.85rem;">Alterações detectadas: <b>${checklistItems}</b></div>` : ''}
                        </div>
                        <div style="text-align:right; font-size:0.8rem; color:var(--text-muted);">
                            ${last.date || ''}<br>
                            ${last.pain_map ? `${last.pain_map.length} ponto(s) de dor mapeado(s)` : ''}
                        </div>
                    </div>
                    ${last.notes ? `<div style="margin-top:8px; padding-top:8px; border-top:1px solid var(--border); font-size:0.85rem; font-style:italic;">"${escHtml(last.notes)}"</div>` : ''}
                `;
                card.style.display = 'block';
            } else if (card) {
                card.style.display = 'none';
            }
        }

        markAsSaved();
    } catch (err) {
        showToast('Erro ao carregar dados do paciente', 'error');
    }
}

async function saveData() {
    if (!state.currentPatientId) { showToast('Selecione um paciente primeiro', 'info'); return; }
    try {
        const body = {
            name: document.getElementById('pat-name').value,
            species: document.getElementById('pat-species').value,
            breed: document.getElementById('pat-breed').value,
            birth_date: document.getElementById('pat-birth').value,
            tutor_name: document.getElementById('pat-tutor').value,
            phone: document.getElementById('pat-phone').value,
            allergies: getRich('pat-conditions'),
        };
        const res = await fetch(`${API}/patients/${state.currentPatientId}`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error();
        markAsSaved();
        showToast('✓ Salvo com sucesso', 'success');
        loadPatientList();
    } catch {
        showToast('Erro ao salvar', 'error');
    }
}

// ─────────────────────────── NEW PATIENT ───────────────────────────
function openNewPatientModal() { openModal('modal-paciente'); }

async function submitNewPatient() {
    const name = document.getElementById('new-pat-name').value.trim();
    const species = document.getElementById('new-pat-species').value.trim();
    const breed = document.getElementById('new-pat-breed').value.trim();
    if (!name) { showToast('Informe o nome do animal', 'warning'); return; }

    try {
        const res = await fetch(`${API}/patients/`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, species: species || 'Cão', breed: breed || 'SRD' })
        });
        if (!res.ok) throw new Error();
        const p = await res.json();
        closeModal('modal-paciente');
        document.getElementById('new-pat-name').value = '';
        showToast('Paciente criado!', 'success');
        await loadPatientList();
        selectPatient(p.id);
    } catch {
        showToast('Erro ao criar paciente', 'error');
    }
}

// ─────────────────────────── CONSULTAS ───────────────────────────
function renderConsultations() {
    const c = document.getElementById('consultations-container');
    if (state.consultations.length === 0) {
        c.innerHTML = `<div class="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            <p>Nenhuma consulta registrada para este paciente.</p>
        </div>`;
        return;
    }
    c.innerHTML = state.consultations.slice().reverse().map(con => `
        <div class="consultation-card">
            <div class="consultation-header">
                <div class="consultation-date">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    ${escHtml(con.date || 'Sem data')}
                </div>
                <button class="btn-icon danger" onclick="deleteConsultation(${con.id})" title="Excluir">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                </button>
            </div>
            ${con.complaint ? `<div class="consultation-field"><strong>Queixa</strong><p>${escHtml(con.complaint)}</p></div>` : ''}
            ${con.diagnosis ? `<div class="consultation-field"><strong>Diagnóstico</strong><p>${escHtml(con.diagnosis)}</p></div>` : ''}
            ${con.exam ? `<div class="consultation-field"><strong>Exame Físico</strong><div class="rich-view">${con.exam}</div></div>` : ''}
            <div class="consultation-field"><strong>Conduta</strong><div class="rich-view">${con.conduct || ''}</div></div>
            ${con.prescription ? `<div class="consultation-field prescription-box"><strong>Prescrição / Receita</strong><div class="rich-view">${con.prescription}</div></div>` : ''}
        </div>
    `).join('');
}

function openConsultaModal() {
    if (!state.currentPatientId) { showToast('Selecione um paciente primeiro', 'info'); return; }
    document.getElementById('cons-complaint').value = '';
    document.getElementById('cons-diagnosis').value = '';
    setRich('cons-exam', '');
    setRich('cons-conduct', '');
    setRich('cons-prescription', '');
    openModal('modal-consulta');
}

async function submitConsulta() {
    const conduct = getRich('cons-conduct').trim();
    if (!conduct || conduct === '<br>') { showToast('Informe ao menos a conduta', 'warning'); return; }

    const data = {
        date: new Date().toLocaleDateString('pt-BR'),
        complaint: document.getElementById('cons-complaint').value.trim(),
        exam: getRich('cons-exam'),
        diagnosis: document.getElementById('cons-diagnosis').value.trim(),
        conduct: conduct,
        prescription: getRich('cons-prescription')
    };
    try {
        const res = await fetch(`${API}/patients/${state.currentPatientId}/consultations/`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error();
        closeModal('modal-consulta');
        showToast('Consulta registrada', 'success');
        await loadPatientData();
        switchTab(1);
    } catch {
        showToast('Erro ao salvar consulta', 'error');
    }
}

async function deleteConsultation(id) {
    if (!await confirmAction('Excluir esta consulta?')) return;
    try {
        await fetch(`${API}/consultations/${id}`, { method: 'DELETE' });
        showToast('Consulta excluída', 'success');
        loadPatientData();
    } catch {
        showToast('Erro ao excluir consulta', 'error');
    }
}

// ─────────────────────────── TRATAMENTOS ───────────────────────────
function renderTreatments() {
    const c = document.getElementById('treatments-container');
    if (state.treatments.length === 0) {
        c.innerHTML = `<div class="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3"/><circle cx="18" cy="18" r="3"/><path d="M18 15v3l2 1"/></svg>
            <p>Nenhum tratamento no plano terapêutico.</p>
        </div>`;
        return;
    }
    c.innerHTML = state.treatments.map(t => `
        <div class="treatment-card">
            <div class="treatment-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="m10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3"/><circle cx="18" cy="18" r="3"/><path d="M18 15v3l2 1"/></svg>
            </div>
            <div class="treatment-info">
                <strong>${escHtml(t.medication)}</strong>
                <span>${escHtml(t.dosage || '')} · ${escHtml(t.frequency || '')} · ${escHtml(t.duration || '')} ${t.route ? ` · ${escHtml(t.route)}` : ''}</span>
                ${t.observations ? `<div class="treatment-obs rich-view">${t.observations}</div>` : ''}
            </div>
            <button class="btn-icon danger" onclick="deleteTreatment(${t.id})" title="Excluir">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
        </div>
    `).join('');
}

function openTratamentoModal() {
    if (!state.currentPatientId) { showToast('Selecione um paciente primeiro', 'info'); return; }
    ['trat-medication', 'trat-dosage', 'trat-frequency', 'trat-duration', 'trat-route'].forEach(id => {
        document.getElementById(id).value = '';
    });
    setRich('trat-notes', '');
    openModal('modal-tratamento');
}

async function submitTratamento() {
    const medication = document.getElementById('trat-medication').value.trim();
    if (!medication) { showToast('Informe o medicamento', 'warning'); return; }
    const data = {
        medication,
        dosage: document.getElementById('trat-dosage').value.trim() || '—',
        frequency: document.getElementById('trat-frequency').value.trim() || '—',
        duration: document.getElementById('trat-duration').value.trim() || '—',
        route: document.getElementById('trat-route').value,
        observations: getRich('trat-notes')
    };
    try {
        const res = await fetch(`${API}/patients/${state.currentPatientId}/treatments/`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error();
        closeModal('modal-tratamento');
        showToast('Tratamento adicionado', 'success');
        await loadPatientData();
        switchTab(3);
    } catch {
        showToast('Erro ao adicionar tratamento', 'error');
    }
}

async function deleteTreatment(id) {
    if (!await confirmAction('Excluir este tratamento?')) return;
    try {
        await fetch(`${API}/treatments/${id}`, { method: 'DELETE' });
        showToast('Tratamento excluído', 'success');
        loadPatientData();
    } catch {
        showToast('Erro ao excluir', 'error');
    }
}

// ─────────────────────────── DOCUMENTOS ───────────────────────────
function renderDocuments() {
    const c = document.getElementById('documents-container');
    if (state.documents.length === 0) {
        c.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
            <p>Nenhum documento ou exame anexado.</p>
        </div>`;
        return;
    }
    c.innerHTML = state.documents.map(doc => `
        <div class="doc-card" onclick="viewDoc(${doc.id})">
            <div class="doc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
            </div>
            <div class="doc-info">
                <p>${escHtml(doc.name)}</p>
                <span>${escHtml(doc.uploaded_at || doc.uploadedAt || '')}</span>
            </div>
            <div class="doc-actions">
                <button class="btn-icon" title="Visualizar" onclick="event.stopPropagation(); viewDoc(${doc.id})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
                <button class="btn-icon danger" title="Excluir" onclick="event.stopPropagation(); deleteDoc(${doc.id})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                </button>
            </div>
        </div>
    `).join('');
}

async function addDocuments(e) {
    const files = e.target.files;
    if (!files.length || !state.currentPatientId) return;
    for (const file of files) {
        const fd = new FormData();
        fd.append('file', file);
        try {
            await fetch(`${API}/patients/${state.currentPatientId}/documents/`, { method: 'POST', body: fd });
        } catch { /* handled below */ }
    }
    showToast(`${files.length} arquivo(s) adicionado(s)`, 'success');
    e.target.value = '';
    loadPatientData();
}

function viewDoc(id) { window.open(`${API}/documents/${id}/view`, '_blank'); }

async function deleteDoc(id) {
    if (!await confirmAction('Excluir este documento?')) return;
    try {
        await fetch(`${API}/documents/${id}`, { method: 'DELETE' });
        showToast('Documento excluído', 'success');
        loadPatientData();
    } catch {
        showToast('Erro ao excluir', 'error');
    }
}

// ─────────────────────────── FISIATRIA ───────────────────────────
let evolutionChart = null;

async function initFisiatria() {
    if (!state.currentPatientId) return;
    initAnatomyMap();
    try {
        const res = await fetch(`${API}/patients/${state.currentPatientId}/fisiatria/`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        renderFisiatriaChart(data);
    } catch {
        renderFisiatriaChart([]);
    }
}

function initAnatomyMap() {
    const container = document.getElementById('anatomy-map-container');
    if (!container) return;

    const patient = state.patients.find(p => p.id === state.currentPatientId);
    const species = (patient?.species?.toLowerCase().includes('cat') || patient?.species?.toLowerCase().includes('gato')) ? 'cat' : 'dog';

    container.innerHTML = SILHOUETTES[species] + `<div id="anatomy-markers"></div>`;
    container.onclick = (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        addMarker(x, y);
    };
    renderMarkers();
}

function addMarker(x, y) {
    state.painMarkers.push({ x, y });
    renderMarkers();
    document.getElementById('btn-save-fisiatria').disabled = false;
}

function renderMarkers() {
    const layer = document.getElementById('anatomy-markers');
    if (!layer) return;
    layer.innerHTML = state.painMarkers.map(m => `
        <div class="anatomy-dot" style="left:${m.x}%; top:${m.y}%"></div>
    `).join('');
}

function clearMap() {
    state.painMarkers = [];
    renderMarkers();
}

function selectPain(value) {
    state.selectedPain = value;
    document.querySelectorAll('.pain-btn').forEach(btn => {
        btn.classList.toggle('selected', parseInt(btn.dataset.value) === value);
    });
    document.getElementById('btn-save-fisiatria').disabled = false;
}

async function saveFisiatriaSession() {
    if (!state.currentPatientId) return;

    // Collect checklist data
    const checklist = {};
    document.querySelectorAll('#fisiatria-checklist input[type="checkbox"]').forEach(i => {
        checklist[i.name] = i.checked;
    });

    const data = {
        pain_level: state.selectedPain,
        date: new Date().toLocaleDateString('pt-BR'),
        gait_analysis: checklist,
        pain_map: state.painMarkers,
        notes: getRich('fis-notes')
    };

    try {
        const res = await fetch(`${API}/patients/${state.currentPatientId}/fisiatria/`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error();
        showToast('Sessão de Fisiatria salva com sucesso!', 'success');
        clearFisiatriaForm();
        await initFisiatria();
    } catch {
        showToast('Erro ao salvar sessão', 'error');
    }
}

function clearFisiatriaForm() {
    state.selectedPain = null;
    state.painMarkers = [];
    document.querySelectorAll('.pain-btn').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('#fisiatria-checklist input[type="checkbox"]').forEach(i => i.checked = false);
    document.getElementById('fis-notes').value = '';
    document.getElementById('btn-save-fisiatria').disabled = true;
    renderMarkers();
}

function renderFisiatriaChart(history) {
    const canvas = document.getElementById('evolutionChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (evolutionChart) { evolutionChart.destroy(); evolutionChart = null; }

    if (!history || history.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#aaa';
        ctx.font = '14px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Sem dados de evolução registrados', canvas.width / 2, 100);
        return;
    }

    evolutionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: history.map(h => h.date),
            datasets: [{
                label: 'Nível de Dor',
                data: history.map(h => h.pain_level),
                borderColor: '#2d5a27',
                backgroundColor: 'rgba(45,90,39,0.08)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2d5a27',
                pointRadius: 6,
                pointHoverRadius: 8,
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { min: 0, max: 5, ticks: { stepSize: 1 }, grid: { color: 'rgba(0,0,0,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

// ─────────────────────────── UI HELPERS ───────────────────────────
function switchTab(index) {
    document.querySelectorAll('.tab').forEach((t, i) => t.classList.toggle('active', i === index));
    document.querySelectorAll('.tab-content').forEach((c, i) => c.classList.toggle('active', i === index));
}

function markAsUnsaved() {
    state.hasUnsaved = true;
    const dot = document.getElementById('save-dot');
    const text = document.getElementById('save-text');
    if (dot) dot.classList.add('unsaved');
    if (text) text.textContent = 'Alterações pendentes';
}

function markAsSaved() {
    state.hasUnsaved = false;
    const dot = document.getElementById('save-dot');
    const text = document.getElementById('save-text');
    if (dot) dot.classList.remove('unsaved');
    if (text) text.textContent = 'Conectado';
}

function updateImage(event, elementId) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => document.getElementById(elementId).src = e.target.result;
    reader.readAsDataURL(file);
}

// ─────────────────────────── MODALS ───────────────────────────
function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('open');
    const firstInput = el.querySelector('input, textarea');
    if (firstInput) setTimeout(() => firstInput.focus(), 80);
}

function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
}

// Close modal on overlay click
document.addEventListener('click', e => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('open');
    }
});

// ─────────────────────────── TOAST ───────────────────────────
const toastIcons = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>`,
    error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
    warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>`,
    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
};

function showToast(msg, type = 'info') {
    const stack = document.getElementById('toast-stack');
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `${toastIcons[type] || ''}<span>${escHtml(msg)}</span>`;
    stack.appendChild(el);
    setTimeout(() => {
        el.classList.add('out');
        setTimeout(() => el.remove(), 350);
    }, 3200);
}

// ─────────────────────────── CONFIRM ───────────────────────────
function confirmAction(msg) {
    // Custom confirm dialog fallback to native for now
    return Promise.resolve(window.confirm(msg));
}

// ─────────────────────────── LANDING ───────────────────────────
function enterApp(mode) {
    const landing = document.getElementById('landing-page');
    const mainApp = document.getElementById('main-app');

    if (mode === 'landing') {
        mainApp.style.opacity = '0';
        setTimeout(() => {
            mainApp.style.display = 'none';
            landing.style.display = 'flex';
            landing.style.opacity = '1';
        }, 450);
        return;
    }

    if (!landing || !mainApp) return;

    landing.style.transition = 'opacity 0.45s ease';
    landing.style.opacity = '0';
    setTimeout(() => {
        landing.style.display = 'none';
        mainApp.style.display = 'grid';
        mainApp.style.animation = 'fadeUp 0.6s ease';

        // Custom logic based on mode
        if (mode === 'meus-animais') {
            // Perhaps show a specific tab or list if needed
            console.log('Entering in Meus Animais mode');
        } else if (mode === 'reviverpet') {
            console.log('Entering in ReviverPet mode');
        }
    }, 450);
}

// ─────────────────────────── MISC ───────────────────────────
function setupEventListeners() {
    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 's') { e.preventDefault(); saveData(); }
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
        }
    });
    document.getElementById('logo-picker').addEventListener('change', e => updateImage(e, 'brand-logo'));
    document.getElementById('photo-picker').addEventListener('change', e => updateImage(e, 'patient-img'));
    document.getElementById('doc-picker').addEventListener('change', addDocuments);
}

function escHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
