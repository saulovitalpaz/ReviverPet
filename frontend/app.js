// Estado da aplicação
let appData = {
    currentPatientId: 1, // Simulating we are viewing Patient ID 1
    patient: {},
    consultations: [],
    documents: [],
    treatments: [],
    hasUnsavedChanges: false
};

const API_BASE = '/api';

// Inicialização
document.addEventListener('DOMContentLoaded', async function () {
    await ensurePatientExists();
    await loadPatientData();
    setupEventListeners();

    // Tab de fisiatria listener
    document.getElementById('tab-fisiatria-btn').addEventListener('click', () => {
        switchTab(4);
        setTimeout(initFisiatria, 100);
    });
});

async function ensurePatientExists() {
    try {
        const response = await fetch(`${API_BASE}/patients/${appData.currentPatientId}`);
        if (!response.ok) {
            // Se o paciente 1 não existe, cria um padrão vazio
            await fetch(`${API_BASE}/patients/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: "Rex",
                    species: "Cão",
                    breed: "Golden Retriever"
                })
            });
        }
    } catch (error) {
        console.error("Erro ao verificar paciente:", error);
    }
}

async function loadPatientData() {
    try {
        const response = await fetch(`${API_BASE}/patients/${appData.currentPatientId}`);
        if (response.ok) {
            const data = await response.json();

            // Popula dados básicos
            if (data.name) document.getElementById('pat-name').textContent = data.name;
            if (data.species) document.getElementById('pat-species').textContent = data.species;

            // Popula listas
            appData.consultations = data.consultations || [];
            appData.treatments = data.treatments || [];
            appData.documents = data.documents || [];
            // Assuming physioclinicalHistory is defined elsewhere or will be added
            // physioclinicalHistory = data.fisiatria_sessions || [];

            // Renderiza listas
            document.getElementById('consultations-container').innerHTML = '';
            appData.consultations.forEach(renderConsultation);

            document.getElementById('treatments-container').innerHTML = '';
            appData.treatments.forEach(renderTreatment);

            document.getElementById('documents-container').innerHTML = '';
            appData.documents.forEach(renderDocument);
        }
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        showNotification("Erro ao carregar prontuário", "error");
    }
}

// Configurar listeners
function setupEventListeners() {
    // Detectar mudanças
    document.querySelector('.content').addEventListener('input', markAsUnsaved);

    // Salvar com Ctrl+S
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveData();
        }
    });

    // Aviso ao sair
    window.addEventListener('beforeunload', function (e) {
        if (appData.hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = '';
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
    // Atualizar abas
    document.querySelectorAll('.tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });

    // Atualizar conteúdo
    document.querySelectorAll('.tab-content').forEach((content, i) => {
        content.classList.toggle('active', i === index);
    });
}

// Marcar como não salvo
function markAsUnsaved() {
    appData.hasUnsavedChanges = true;
    const status = document.getElementById('save-status');
    status.textContent = '⚠ Não salvo';
    status.classList.add('unsaved');
}

// Marcar como salvo
function markAsSaved() {
    appData.hasUnsavedChanges = false;
    const status = document.getElementById('save-status');
    status.textContent = '✓ Salvo';
    status.classList.remove('unsaved');
}

// Salvar dados do Paciente via API
async function saveData() {
    try {
        const patientData = {
            name: document.getElementById('pat-name').textContent,
            species: document.getElementById('pat-species').textContent
        };

        const response = await fetch(`${API_BASE}/patients/${appData.currentPatientId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData)
        });

        if (response.ok) {
            markAsSaved();
            showNotification('✓ Dados salvos com sucesso!', 'success');
        } else {
            throw new Error("Falha na API");
        }
    } catch (error) {
        showNotification('✗ Erro ao salvar dados', 'error');
        console.error('Erro:', error);
    }
}

// Atualizar imagem (Apenas visual por enquanto)
function updateImage(event, elementId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById(elementId).src = e.target.result;
            markAsUnsaved();
        };
        reader.readAsDataURL(file);
    }
}

// Adicionar consulta via API
async function addConsultation() {
    const newConsultationData = {
        date: new Date().toLocaleDateString('pt-BR'),
        complaint: 'Nova queixa principal...',
        exam: 'Descreva o exame físico...',
        diagnosis: 'Hipótese diagnóstica...',
        conduct: 'Plano de tratamento...'
    };

    try {
        const response = await fetch(`${API_BASE}/patients/${appData.currentPatientId}/consultations/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newConsultationData)
        });

        if (response.ok) {
            const dbConsultation = await response.json();
            appData.consultations.unshift(dbConsultation);
            // Re-render
            document.getElementById('consultations-container').innerHTML = '';
            appData.consultations.forEach(renderConsultation);
            markAsSaved();
            showNotification('Consulta criada', 'success');
        } else {
            throw new Error("Falha na API");
        }
    } catch (error) {
        showNotification('Erro ao criar consulta', 'error');
        console.error('Erro:', error);
    }
}

// Renderizar consulta
function renderConsultation(consultation) {
    const container = document.getElementById('consultations-container');
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = consultation.id;
    card.innerHTML = `
        <div class="card-header">
            <div class="card-date">📅 ${consultation.data}</div>
            <div class="card-actions">
                <button class="btn-icon" onclick="deleteConsultation(${consultation.id})" title="Excluir">🗑️</button>
            </div>
        </div>
        <div class="consultation-field">
            <strong>Queixa Principal</strong>
            <div class="editable" contenteditable="true" data-field="queixa">${consultation.queixa}</div>
        </div>
        <div class="consultation-field">
            <strong>Exame Físico</strong>
            <div class="editable" contenteditable="true" data-field="exame">${consultation.exame}</div>
        </div>
        <div class="consultation-field">
            <strong>Hipótese Diagnóstica</strong>
            <div class="editable" contenteditable="true" data-field="diagnostico">${consultation.diagnostico}</div>
        </div>
        <div class="consultation-field">
            <strong>Conduta / Tratamento</strong>
            <div class="editable" contenteditable="true" data-field="conduta">${consultation.conduta}</div>
        </div>
    `;

    container.insertBefore(card, container.firstChild);
}

// Deletar consulta via API
async function deleteConsultation(id) {
    if (confirm('Tem certeza que deseja excluir esta consulta?')) {
        try {
            const response = await fetch(`${API_BASE}/consultations/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                appData.consultations = appData.consultations.filter(c => c.id !== id);
                document.querySelector(`[data-id="${id}"]`).remove();
                markAsUnsaved();
                showNotification('Consulta excluída', 'success');
            } else {
                throw new Error("Falha na exclusão");
            }
        } catch (error) {
            showNotification('Erro ao excluir consulta', 'error');
            console.error(error);
        }
    }
}

// Pesquisar consultas
function searchConsultations(query) {
    const cards = document.querySelectorAll('#consultations-container .card');
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query.toLowerCase()) ? 'block' : 'none';
    });
}

// Adicionar documentos via API
async function addDocuments(event) {
    const files = event.target.files;
    for (let file of files) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${API_BASE}/patients/${appData.currentPatientId}/documents/`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const dbDoc = await response.json();
                appData.documents.push(dbDoc);
                renderDocument(dbDoc);
                markAsUnsaved();
                showNotification('Documento salvo', 'success');
            }
        } catch (error) {
            console.error("Erro no upload:", error);
            showNotification('Erro ao salvar documento', 'error');
        }
    }
}

// Renderizar documento
function renderDocument(doc) {
    const container = document.getElementById('documents-container');
    const item = document.createElement('div');
    item.className = 'document-item';
    item.dataset.id = doc.id;

    // Fallback logic for extraction depending on the structure
    let extension = "DOC";
    if (doc.name) {
        extension = doc.name.split('.').pop().toUpperCase();
    } else if (doc.nome) { // Fallback for old mock structure
        extension = doc.nome.split('.').pop().toUpperCase();
    }

    const displayName = doc.name || doc.nome;
    const addedDate = doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : doc.data;

    item.innerHTML = `
        <div style="display: flex; align-items: center; flex: 1;">
            <div class="document-icon">${extension.substring(0, 3)}</div>
            <div>
                <div style="font-weight: 600; color: var(--secondary);">${displayName}</div>
                <div style="font-size: 12px; color: var(--accent);">Adicionado em ${addedDate}</div>
            </div>
        </div>
        <button class="btn-icon" onclick="deleteDocument(${doc.id})" title="Excluir">🗑️</button>
    `;

    item.onclick = function (e) {
        if (!e.target.classList.contains('btn-icon')) {
            window.open(`${API_BASE}/documents/${doc.id}/view`, '_blank');
        }
    };

    container.appendChild(item);
}

// Deletar documento via API
async function deleteDocument(id) {
    if (confirm('Tem certeza que deseja excluir este documento?')) {
        try {
            const response = await fetch(`${API_BASE}/documents/${id}`, { method: 'DELETE' });
            if (response.ok) {
                appData.documents = appData.documents.filter(d => d.id !== id);
                document.querySelector(`#documents-container [data-id="${id}"]`).remove();
                markAsUnsaved();
                showNotification('Documento excluído', 'success');
            }
        } catch (error) {
            console.error(error);
            showNotification('Erro', 'error');
        }
    }
}

// Adicionar tratamento via API
async function addTreatment() {
    const newTreatmentData = {
        medication: 'Novo medicamento...',
        dosage: 'Dosagem...',
        frequency: 'Frequência...',
        duration: 'Duração...',
        observations: 'Obs...'
    };

    try {
        const response = await fetch(`${API_BASE}/patients/${appData.currentPatientId}/treatments/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTreatmentData)
        });

        if (response.ok) {
            const dbTreatment = await response.json();
            appData.treatments.push(dbTreatment);
            renderTreatment(dbTreatment);
            markAsUnsaved();
            showNotification('Tratamento adicionado', 'success');
        }
    } catch (err) {
        console.error(err);
        showNotification('Erro', 'error');
    }
}

// Renderizar tratamento
function renderTreatment(treatment) {
    const container = document.getElementById('treatments-container');
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = treatment.id;
    card.innerHTML = `
        <div class="card-header">
            <div class="card-date">💊 Tratamento</div>
            <div class="card-actions">
                <button class="btn-icon" onclick="deleteTreatment(${treatment.id})" title="Excluir">🗑️</button>
            </div>
        </div>
        <div class="form-grid">
            <div class="form-field">
                <label>Medicamento</label>
                <div class="editable" contenteditable="true" data-field="medicamento">${treatment.medication || treatment.medicamento}</div>
            </div>
            <div class="form-field">
                <label>Dosagem</label>
                <div class="editable" contenteditable="true" data-field="dosagem">${treatment.dosage || treatment.dosagem}</div>
            </div>
            <div class="form-field">
                <label>Frequência</label>
                <div class="editable" contenteditable="true" data-field="frequencia">${treatment.frequency || treatment.frequencia}</div>
            </div>
            <div class="form-field">
                <label>Duração</label>
                <div class="editable" contenteditable="true" data-field="duracao">${treatment.duration || treatment.duracao}</div>
            </div>
        </div>
        <div class="consultation-field">
            <strong>Observações</strong>
            <div class="editable" contenteditable="true" data-field="observacoes">${treatment.observations || treatment.observacoes}</div>
        </div>
    `;

    container.appendChild(card);
}

// Deletar tratamento via API
async function deleteTreatment(id) {
    if (confirm('Tem certeza que deseja excluir este tratamento?')) {
        try {
            const response = await fetch(`${API_BASE}/treatments/${id}`, { method: 'DELETE' });
            if (response.ok) {
                appData.treatments = appData.treatments.filter(t => t.id !== id);
                document.querySelector(`#treatments-container [data-id="${id}"]`).remove();
                markAsUnsaved();
                showNotification('Tratamento excluído', 'success');
            }
        } catch (error) {
            console.error(error);
            showNotification('Erro', 'error');
        }
    }
}

// Adicionar consulta de exemplo
function addSampleConsultation() {
    if (appData.consultations.length === 0) {
        const sample = {
            id: Date.now(),
            data: new Date().toLocaleDateString('pt-BR'),
            queixa: 'Paciente apresenta claudicação no membro posterior direito há 3 dias',
            exame: 'Temperatura: 38.5°C | FC: 90bpm | FR: 28rpm | Dor à palpação da articulação coxofemoral direita',
            diagnostico: 'Possível agravamento da displasia coxofemoral',
            conduta: 'Fisioterapia 3x/semana, anti-inflamatório (Carprofeno 50mg BID por 7 dias), repouso relativo'
        };
        renderConsultation(sample);
    }
}

// Notificações
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--danger)'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: var(--shadow);
        z-index: 10000;
        animation: slideIn 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => notification.remove(), 300); // Remove after animation
    }, 3000); // Notification visible for 3 seconds
}

// Fisiatria Logic
let evolutionChart = null;
let physioclinicalHistory = []; // Simulating DB for chart

async function initFisiatria() {
    // Inicializar o gráfico vazio ou com dados
    try {
        const response = await fetch(`${API_BASE}/patients/${appData.currentPatientId}/fisiatria/`);
        if (response.ok) {
            physioclinicalHistory = await response.json();
        } else {
            console.error('Failed to fetch fisiatria history');
            physioclinicalHistory = []; // Ensure it's an empty array on failure
        }
    } catch (error) {
        console.error('Error fetching fisiatria history:', error);
        physioclinicalHistory = []; // Ensure it's an empty array on error
    }
    renderEvolutionChart();
}

async function saveFisiatriaSession() {
    // Coletar dor
    const painRadio = document.querySelector('input[name="pain"]:checked');
    const painLevel = painRadio ? parseInt(painRadio.value) : null;

    // Coletar Marcha
    const gait = {
        claudicacao1: document.getElementById('gait-claudicacao1').checked,
        claudicacao2: document.getElementById('gait-claudicacao2').checked,
        claudicacao3: document.getElementById('gait-claudicacao3').checked,
        claudicacao4: document.getElementById('gait-claudicacao4').checked,
        arrasta: document.getElementById('gait-arrasta').checked,
        cruzamento: document.getElementById('gait-cluzamento').checked,
        cifose: document.getElementById('gait-cifose').checked
    };

    // Coletar Goniometria
    const gonio = {
        ombro: { flex: document.getElementById('go-ombro-flex').value, ext: document.getElementById('go-ombro-ext').value },
        cotovelo: { flex: document.getElementById('go-cotovelo-flex').value, ext: document.getElementById('go-cotovelo-ext').value },
        carpo: { flex: document.getElementById('go-carpo-flex').value, ext: document.getElementById('go-carpo-ext').value },
        coxo: { flex: document.getElementById('go-coxo-flex').value, ext: document.getElementById('go-coxo-ext').value },
        joelho: { flex: document.getElementById('go-joelho-flex').value, ext: document.getElementById('go-joelho-ext').value },
        tarso: { flex: document.getElementById('go-tarso-flex').value, ext: document.getElementById('go-tarso-ext').value }
    };

    const sessionData = {
        date: new Date().toLocaleDateString('pt-BR'),
        pain_level: painLevel,
        gait_analysis: gait,
        goniometry_data: gonio
    };

    try {
        const response = await fetch(`${API_BASE}/patients/${appData.currentPatientId}/fisiatria/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sessionData)
        });

        if (response.ok) {
            const dbSession = await response.json();
            physioclinicalHistory.push(dbSession);
            renderEvolutionChart();
            showNotification('Sessão Fisiátrica registrada!', 'success');
        } else {
            throw new Error('Falha ao salvar sessão fisiátrica');
        }
    } catch (error) {
        showNotification('Erro ao salvar sessão fisiátrica', 'error');
        console.error('Erro:', error);
    }
}

function renderEvolutionChart() {
    const ctx = document.getElementById('evolutionChart').getContext('2d');

    // Dados reias do BD
    const labels = physioclinicalHistory.length > 0 ? physioclinicalHistory.map(h => h.date) : ['Sessão 1', 'Sessão 2', 'Sessão 3'];
    const dataJoelho = physioclinicalHistory.length > 0 ? physioclinicalHistory.map(h => {
        if (h.goniometry_data && h.goniometry_data.joelho && h.goniometry_data.joelho.flex) {
            return parseInt(h.goniometry_data.joelho.flex);
        }
        return null;
    }) : [40, 55, 75];

    if (evolutionChart) {
        evolutionChart.destroy();
    }

    evolutionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Joelho (Flexão °)',
                data: dataJoelho,
                borderColor: '#c5a9a0',
                backgroundColor: 'rgba(197, 169, 160, 0.2)',
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                spanGaps: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    title: { display: true, text: 'Graus (°)' }
                }
            }
        }
    });
}

// Inicializar aba quando clicada
document.getElementById('tab-fisiatria-btn').addEventListener('click', () => {
    switchTab(4);
    setTimeout(initFisiatria, 100); // Dar tempo do canvas renderizar
});
