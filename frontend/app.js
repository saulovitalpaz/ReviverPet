// Estado da aplicação
let appData = {
    currentPatientId: null,
    patients: [],
    patient: {},
    consultations: [],
    documents: [],
    treatments: [],
    hasUnsavedChanges: false
};

const API_BASE = '/api';

// Inicialização
document.addEventListener('DOMContentLoaded', async function () {
    await loadPatientList();
    setupEventListeners();

    // Tab de fisiatria listener
    const physioBtn = document.getElementById('tab-fisiatria-btn');
    if (physioBtn) {
        physioBtn.addEventListener('click', () => {
            switchTab(4);
            setTimeout(initFisiatria, 100);
        });
    }
});

// Carregar lista de pacientes para a sidebar
async function loadPatientList() {
    try {
        const response = await fetch(`${API_BASE}/patients/`);
        if (response.ok) {
            appData.patients = await response.json();
            renderSidebar();

            // Se houver pacientes e nenhum selecionado, seleciona o primeiro
            if (appData.patients.length > 0 && !appData.currentPatientId) {
                selectPatient(appData.patients[0].id);
            }
        }
    } catch (error) {
        console.error("Erro ao carregar lista:", error);
    }
}

function renderSidebar() {
    const list = document.getElementById('sidebar-patient-list');
    if (!list) return;

    list.innerHTML = appData.patients.map(p => `
        <div class="patient-item ${appData.currentPatientId === p.id ? 'active' : ''}" onclick="selectPatient(${p.id})">
            <span class="patient-icon">${p.species === 'Cão' ? '🐕' : '🐈'}</span>
            <div class="patient-info">
                <div class="p-name">${p.name}</div>
                <div class="p-species">${p.species} - ${p.breed || ''}</div>
            </div>
        </div>
    `).join('');
}

async function selectPatient(id) {
    if (appData.hasUnsavedChanges && !confirm("Existem alterações não salvas. Deseja mudar de paciente mesmo assim?")) {
        return;
    }

    appData.currentPatientId = id;
    renderSidebar();
    await loadPatientData();
    switchTab(0);
}

async function createNewPatient() {
    const name = prompt("Nome do novo paciente:");
    if (!name) return;

    try {
        const response = await fetch(`${API_BASE}/patients/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                species: "Cão",
                breed: "SRD"
            })
        });

        if (response.ok) {
            const newP = await response.json();
            await loadPatientList();
            selectPatient(newP.id);
            showNotification("Paciente criado!", "success");
        }
    } catch (error) {
        showNotification("Erro ao criar paciente", "error");
    }
}

async function loadPatientData() {
    if (!appData.currentPatientId) return;

    try {
        const response = await fetch(`${API_BASE}/patients/${appData.currentPatientId}`);
        if (response.ok) {
            const data = await response.json();
            appData.patient = data;

            // Preenche campos básicos
            document.getElementById('pat-name').textContent = data.name || "";
            document.getElementById('pat-species').textContent = data.species || "";
            document.getElementById('pat-breed').textContent = data.breed || "";
            document.getElementById('pat-birth').textContent = data.birth_date || "";
            document.getElementById('pat-tutor').textContent = data.tutor_name || "";
            document.getElementById('pat-phone').textContent = data.phone || "";
            document.getElementById('pat-conditions').textContent = data.conditions || "";

            // Popula listas
            appData.consultations = data.consultations || [];
            appData.treatments = data.treatments || [];
            appData.documents = data.documents || [];

            // Renderiza listas
            renderAllLists();
            markAsSaved();
        }
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

function renderAllLists() {
    const consContainer = document.getElementById('consultations-container');
    consContainer.innerHTML = '';
    appData.consultations.forEach(renderConsultation);

    const treatContainer = document.getElementById('treatments-container');
    treatContainer.innerHTML = '';
    appData.treatments.forEach(renderTreatment);

    const docContainer = document.getElementById('documents-container');
    docContainer.innerHTML = '';
    appData.documents.forEach(renderDocument);
}

// Configurar listeners
function setupEventListeners() {
    // Salvar com Ctrl+S
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveData();
        }
    });

    // Upload de logo
    document.getElementById('logo-picker').addEventListener('change', function (e) {
        updateImage(e, 'brand-logo');
    });

    // Upload de foto do paciente
    document.getElementById('photo-picker').addEventListener('change', function (e) {
        updateImage(e, 'patient-img');
    });

    // Upload de documentos
    document.getElementById('doc-picker').addEventListener('change', addDocuments);
}

// Gerenciar abas
function switchTab(index) {
    document.querySelectorAll('.tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.tab-content').forEach((content, i) => {
        content.classList.toggle('active', i === index);
    });
}

function markAsUnsaved() {
    appData.hasUnsavedChanges = true;
    const status = document.getElementById('save-status');
    status.textContent = '⚠ Alterações pendentes';
    status.style.background = 'var(--warning)';
}

function markAsSaved() {
    appData.hasUnsavedChanges = false;
    const status = document.getElementById('save-status');
    status.textContent = '✓ Conectado';
    status.style.background = 'var(--primary)';
}

async function saveData() {
    if (!appData.currentPatientId) return;

    try {
        const patientData = {
            name: document.getElementById('pat-name').textContent,
            species: document.getElementById('pat-species').textContent,
            breed: document.getElementById('pat-breed').textContent,
            birth_date: document.getElementById('pat-birth').textContent,
            tutor_name: document.getElementById('pat-tutor').textContent,
            phone: document.getElementById('pat-phone').textContent,
            conditions: document.getElementById('pat-conditions').textContent
        };

        const response = await fetch(`${API_BASE}/patients/${appData.currentPatientId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData)
        });

        if (response.ok) {
            markAsSaved();
            showNotification('✓ Salvo com sucesso', 'success');
            loadPatientList(); // Atualiza nome na sidebar se mudou
        }
    } catch (error) {
        showNotification('Erro ao salvar', 'error');
    }
}

function renderConsultation(c) {
    const container = document.getElementById('consultations-container');
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:15px">
            <strong style="color:var(--primary)">📅 ${c.date || 'Sem data'}</strong>
            <button class="btn-icon" onclick="deleteConsultation(${c.id})">🗑️</button>
        </div>
        <div class="consultation-field">
            <strong>Exame/Conduta</strong>
            <div class="editable">${c.conduct || c.diagnosis || ''}</div>
        </div>
    `;
    container.prepend(card);
}

async function addConsultation() {
    if (!appData.currentPatientId) return;
    const cond = prompt("Descrição da consulta:");
    if (!cond) return;

    const data = {
        date: new Date().toLocaleDateString('pt-BR'),
        complaint: "",
        exam: "",
        diagnosis: "",
        conduct: cond
    };

    const response = await fetch(`${API_BASE}/patients/${appData.currentPatientId}/consultations/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        loadPatientData();
        showNotification("Consulta registrada", "success");
    }
}

async function deleteConsultation(id) {
    if (!confirm("Excluir consulta?")) return;
    await fetch(`${API_BASE}/consultations/${id}`, { method: 'DELETE' });
    loadPatientData();
}

// Implementações simplificadas para Documentos e Tratamentos seguem o mesmo padrão
async function addDocuments(e) {
    const files = e.target.files;
    for (let file of files) {
        const formData = new FormData();
        formData.append("file", file);
        await fetch(`${API_BASE}/patients/${appData.currentPatientId}/documents/`, {
            method: 'POST',
            body: formData
        });
    }
    loadPatientData();
}

function renderDocument(doc) {
    const container = document.getElementById('documents-container');
    const div = document.createElement('div');
    div.className = 'card';
    div.style.cursor = 'pointer';
    div.innerHTML = `📄 ${doc.name} <button class="btn-icon" style="float:right" onclick="event.stopPropagation(); deleteDoc(${doc.id})">🗑️</button>`;
    div.onclick = () => window.open(`${API_BASE}/documents/${doc.id}/view`, '_blank');
    container.appendChild(div);
}

async function deleteDoc(id) {
    await fetch(`${API_BASE}/documents/${id}`, { method: 'DELETE' });
    loadPatientData();
}

function renderTreatment(t) {
    const container = document.getElementById('treatments-container');
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `💊 <strong>${t.medication}</strong> - ${t.dosage} (${t.frequency}) <button class="btn-icon" style="float:right" onclick="deleteTreatment(${t.id})">🗑️</button>`;
    container.appendChild(div);
}

async function addTreatment() {
    const med = prompt("Medicamento:");
    if (!med) return;
    await fetch(`${API_BASE}/patients/${appData.currentPatientId}/treatments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medication: med, dosage: "1 dose", frequency: "1x ao dia", duration: "7 dias" })
    });
    loadPatientData();
}

async function deleteTreatment(id) {
    await fetch(`${API_BASE}/treatments/${id}`, { method: 'DELETE' });
    loadPatientData();
}

function updateImage(event, elementId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => document.getElementById(elementId).src = e.target.result;
        reader.readAsDataURL(file);
    }
}

function showNotification(msg, type) {
    const n = document.createElement('div');
    n.className = 'save-status';
    n.style.cssText = `bottom:80px; left:50%; transform:translateX(-50%); background:${type === 'success' ? 'var(--success)' : 'var(--danger)'}; z-index:10000`;
    n.textContent = msg;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 3000);
}

// Fisiatria
let evolutionChart = null;
async function initFisiatria() {
    const response = await fetch(`${API_BASE}/patients/${appData.currentPatientId}/fisiatria/`);
    const history = await response.json();
    renderChart(history);
}

function renderChart(history) {
    const ctx = document.getElementById('evolutionChart').getContext('2d');
    if (evolutionChart) evolutionChart.destroy();

    evolutionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: history.map(h => h.date),
            datasets: [{
                label: 'Nível de Dor (Glasgow)',
                data: history.map(h => h.pain_level),
                borderColor: '#2d5a27',
                tension: 0.4,
                fill: false
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function filterPatients(query) {
    const items = document.querySelectorAll('.patient-item');
    items.forEach(item => {
        const name = item.querySelector('.p-name').textContent.toLowerCase();
        item.style.display = name.includes(query.toLowerCase()) ? 'flex' : 'none';
    });
}

// === Landing Page Logic ===
function enterApp(mode) {
    const landing = document.getElementById('landing-page');
    if (landing) {
        landing.style.transition = 'opacity 0.4s ease-out';
        landing.style.opacity = '0';
        setTimeout(() => {
            landing.style.display = 'none';
        }, 400);
    }

    const appLayout = document.getElementById('main-app');
    if (appLayout) {
        setTimeout(() => {
            appLayout.style.display = 'grid';
            appLayout.style.animation = 'fadeIn 0.8s ease-out';

            // Re-render chart since display: none can mess up canvas sizing
            if (evolutionChart && typeof initFisiatria === 'function') {
                // Ensure physioclinicalHistory is defined or just init again
                if (document.querySelectorAll('.tab')[4].classList.contains('active')) {
                    initFisiatria();
                }
            }
        }, 400);
    }

    if (mode === 'meus-animais') {
        console.log("Modo Ativado: Meus Animais");
    } else {
        console.log("Modo Ativado: ReviverPet");
    }
}

