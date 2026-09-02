// Datos Simulados del Journal (Combined Sources & Repeatability)
const mockJournal = [
    { id: "DEC-0005", time: "2026-09-01 14:30:00", symbol: "SOL/USDT", action: "BUY", score: "3/4", sources: "Sentiment + Technical + API", outcome: "CLOSED_WIN" },
    { id: "DEC-0004", time: "2026-09-01 12:00:00", symbol: "BTC/USDT", action: "SKIP", score: "1/4", sources: "Sentiment + Technical", outcome: "N/A" },
    { id: "DEC-0003", time: "2026-09-01 09:15:00", symbol: "ETH/USDT", action: "BUY", score: "4/4", sources: "Sentiment + Technical + API", outcome: "CLOSED_LOSS" },
    { id: "DEC-0002", time: "2026-08-31 18:45:00", symbol: "SOL/USDT", action: "BUY", score: "3/4", sources: "Sentiment + Technical + API", outcome: "CLOSED_WIN" },
    { id: "DEC-0001", time: "2026-08-31 10:00:00", symbol: "AVAX/USDT", action: "SKIP", score: "2/4", sources: "Technical Only", outcome: "N/A" }
];

let isFailureSimulated = false;

// Renderizar Journal
function renderJournal() {
    const tbody = document.getElementById("journal-table-body");
    tbody.innerHTML = "";

    mockJournal.forEach((row) => {
        const tr = document.createElement("tr");
        tr.setAttribute("tabindex", "0");

        let outcomeBadge = `<span style="color: #8B949E;">${row.outcome}</span>`;
        if (row.outcome === "CLOSED_WIN") {
            outcomeBadge = `<span style="color: #2EA043; font-weight: bold;">CLOSED_WIN (+10%)</span>`;
        } else if (row.outcome === "CLOSED_LOSS") {
            outcomeBadge = `<span style="color: #F85149; font-weight: bold;">CLOSED_LOSS (-5%)</span>`;
        }

        let actionStyle = row.action === "BUY" ? "color: #2EA043; font-weight: bold;" : "color: #D29922;";

        tr.innerHTML = `
            <td><code>${row.id}</code></td>
            <td>${row.time}</td>
            <td><strong>${row.symbol}</strong></td>
            <td><span style="${actionStyle}">${row.action}</span></td>
            <td>${row.score}</td>
            <td><span style="font-size:0.75rem; color:#A371F7;">${row.sources}</span></td>
            <td>${outcomeBadge}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Simular Ciclo (Track 1: Repeatability)
function runSimulatedCycle() {
    const newId = `DEC-000${mockJournal.length + 1}`;
    const now = new Date().toISOString().replace("T", " ").substring(0, 19);
    
    const newRecord = {
        id: newId,
        time: now,
        symbol: "NEAR/USDT",
        action: "BUY",
        score: "3/4",
        sources: isFailureSimulated ? "Fallback Cache + Technical" : "Sentiment + Technical + API",
        outcome: "CLOSED_WIN"
    };

    mockJournal.unshift(newRecord);
    renderJournal();

    alert(`[ATLAS Autonomous Agent]\nNuevo ciclo ejecutado:\nID: ${newId} | Asset: NEAR/USDT | Acción: BUY\nFuentes: ${newRecord.sources}`);
}

// Simular Caída de API (Common Score: Coping with Failure)
function toggleFailureSimulation() {
    isFailureSimulated = !isFailureSimulated;
    const statusApi = document.getElementById("status-api");
    const statusFallback = document.getElementById("status-fallback");
    const btn = document.getElementById("btn-toggle-failure");

    if (isFailureSimulated) {
        statusApi.className = "status-indicator offline";
        statusApi.style.color = "#F85149";
        statusApi.innerHTML = `<span class="dot" style="background:#F85149;"></span> RYO-CHAN API: DOWN (Simulated)`;
        
        statusFallback.innerHTML = `<span class="dot" style="background:#D29922;"></span> Fallback Protection: ACTIVE (Cached Data)`;
        btn.innerText = "🔄 Restablecer API";
        alert("⚠️ [Coping with Failure Mode]\nSe simuló una caída de la API principal. ATLAS continuará operando de forma autónoma utilizando memoria en caché sin colapsar.");
    } else {
        statusApi.className = "status-indicator online";
        statusApi.style.color = "inherit";
        statusApi.innerHTML = `<span class="dot"></span> RYO-CHAN API: OK`;
        
        statusFallback.innerHTML = `<span class="dot"></span> Fallback Protection: ACTIVE`;
        btn.innerText = "⚡ Simular Fallo de API";
    }
}

// Inicialización & Accessibility Keyboard Shortcuts (Track 2: Works for everyone)
document.addEventListener("DOMContentLoaded", () => {
    renderJournal();

    document.getElementById("btn-run-cycle").addEventListener("click", runSimulatedCycle);
    document.getElementById("btn-toggle-failure").addEventListener("click", toggleFailureSimulation);

    // Atajos de Teclado
    document.addEventListener("keydown", (e) => {
        if (e.key === "r" || e.key === "R") runSimulatedCycle();
        if (e.key === "f" || e.key === "F") toggleFailureSimulation();
    });
});
