// Datos Simulados del Journal de ATLAS
const mockJournal = [
    { id: "DEC-0005", time: "2026-06-15 14:30:00", symbol: "SOL/USDT", action: "BUY", score: "3/4", outcome: "CLOSED_WIN" },
    { id: "DEC-0004", time: "2026-06-15 12:00:00", symbol: "BTC/USDT", action: "SKIP", score: "1/4", outcome: "N/A" },
    { id: "DEC-0003", time: "2026-06-15 09:15:00", symbol: "ETH/USDT", action: "BUY", score: "4/4", outcome: "CLOSED_LOSS" },
    { id: "DEC-0002", time: "2026-06-14 18:45:00", symbol: "SOL/USDT", action: "BUY", score: "3/4", outcome: "CLOSED_WIN" },
    { id: "DEC-0001", time: "2026-06-14 10:00:00", symbol: "AVAX/USDT", action: "SKIP", score: "2/4", outcome: "N/A" }
];

// Función para renderizar la tabla del Journal
function renderJournal() {
    const tbody = document.getElementById("journal-table-body");
    tbody.innerHTML = "";

    mockJournal.forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.setAttribute("tabindex", "0"); // Permite navegar la tabla con Tab

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
            <td>${outcomeBadge}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Simular un ciclo adicional al presionar el botón o presionar 'R'
function runSimulatedCycle() {
    const newId = `DEC-000${mockJournal.length + 1}`;
    const now = new Date().toISOString().replace("T", " ").substring(0, 19);
    
    const newRecord = {
        id: newId,
        time: now,
        symbol: "NEAR/USDT",
        action: "BUY",
        score: "3/4",
        outcome: "CLOSED_WIN"
    };

    mockJournal.unshift(newRecord);
    renderJournal();

    // Notificación rápida
    alert(`[ATLAS Autonomous Agent]\nNuevo ciclo ejecutado exitosamente:\nId: ${newId} | Asset: NEAR/USDT | Acción: BUY`);
}

// Event Listeners y Navegación por Teclado
document.addEventListener("DOMContentLoaded", () => {
    renderJournal();

    const btn = document.getElementById("btn-run-cycle");
    btn.addEventListener("click", runSimulatedCycle);

    // Navegación por teclado (Teclas de acceso rápido)
    document.addEventListener("keydown", (e) => {
        // Presionar 'R' para simular ciclo
        if (e.key === "r" || e.key === "R") {
            runSimulatedCycle();
        }
    });
});
