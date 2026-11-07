let allPRs = [];

const elements = {
    summary: document.getElementById("summary"),
    table: document.getElementById("prTable"),
    branch: document.getElementById("branchFilter"),
    status: document.getElementById("statusFilter"),
    search: document.getElementById("search"),
    updated: document.getElementById("lastUpdated")
};

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function getStatusClass(status) {
    if (status === "Validation Failed" ||
        status === "Changes Requested") {
        return "status-failed";
    }

    if (status === "Ready to Merge") {
        return "status-success";
    }

    if (status === "Waiting for Approval") {
        return "status-pending";
    }

    if (status === "Validation In Progress") {
        return "status-running";
    }

    return "status-neutral";
}

function renderSummary(prs) {
    const failed = prs.filter(
        pr => pr.dashboardStatus === "Validation Failed"
    ).length;

    const waiting = prs.filter(
        pr => pr.dashboardStatus === "Waiting for Approval"
    ).length;

    const ready = prs.filter(
        pr => pr.dashboardStatus === "Ready to Merge"
    ).length;

    elements.summary.innerHTML = `
        <div>Open PRs: ${prs.length}</div>
        <div>Validation Failed: ${failed}</div>
        <div>Waiting Approval: ${waiting}</div>
        <div>Ready to Merge: ${ready}</div>
    `;
}

function renderTable(prs) {
    if (!prs.length) {
        elements.table.innerHTML = `
            <tr>
                <td colspan="9">No matching open pull requests found.</td>
            </tr>
        `;
        return;
    }

    elements.table.innerHTML = prs.map(pr => {
        const reviewers = Array.isArray(pr.pendingReviewers)
            ? pr.pendingReviewers.join(", ")
            : "";

        const pipelineLinks = Array.isArray(pr.failedChecks)
            ? pr.failedChecks
                .filter(check => check.url)
                .map(check => `
                    <a href="${escapeHTML(check.url)}"
                       target="_blank"
                       rel="noopener noreferrer">
                        ${escapeHTML(check.name)}
                    </a>
                `).join(", ")
            : "";

        const pipelineText = pipelineLinks
            ? `${escapeHTML(pr.pipelineStatus)} (${pipelineLinks})`
            : escapeHTML(pr.pipelineStatus || "Not Started");

        return `
            <tr>
                <td>
                    <a href="${escapeHTML(pr.prUrl)}"
                       target="_blank"
                       rel="noopener noreferrer">
                        #${escapeHTML(pr.number)} ↗
                    </a>
                </td>

                <td>${escapeHTML(pr.story || "-")}</td>

                <td>${escapeHTML(pr.developer || "-")}</td>

                <td>${escapeHTML(pr.sourceBranch || "-")}</td>

                <td>${escapeHTML(pr.targetBranch || "-")}</td>

                <td>${pipelineText}</td>

                <td>
                    ${escapeHTML(pr.approvedCount ?? 0)}
                    /
                    ${escapeHTML(pr.requiredApprovals ?? 1)}
                </td>

                <td>${escapeHTML(reviewers || "-")}</td>

                <td>
                    <span class="status ${getStatusClass(pr.dashboardStatus)}">
                        ${escapeHTML(pr.dashboardStatus || "Unknown")}
                    </span>
                </td>
            </tr>
        `;
    }).join("");
}

function renderDashboard() {
    const branch = elements.branch.value;
    const status = elements.status.value;
    const search = elements.search.value.toLowerCase().trim();

    const filteredPRs = allPRs.filter(pr => {
        const branchMatch =
            branch === "all" || pr.targetBranch === branch;

        const statusMatch =
            status === "all" || pr.dashboardStatus === status;

        const searchableText = [
            pr.number,
            pr.title,
            pr.story,
            pr.developer,
            pr.sourceBranch,
            pr.targetBranch
        ].join(" ").toLowerCase();

        const searchMatch = searchableText.includes(search);

        return branchMatch && statusMatch && searchMatch;
    });

    renderSummary(filteredPRs);
    renderTable(filteredPRs);
}

async function loadDashboard() {
    try {
        const response = await fetch(
            "./data/prs.json?t=" + Date.now(),
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error(
                `Unable to load prs.json: HTTP ${response.status}`
            );
        }

        const data = await response.json();

        allPRs = Array.isArray(data.prs) ? data.prs : [];

        elements.updated.textContent =
            "Last Updated: " +
            (data.lastUpdated
                ? new Date(data.lastUpdated).toLocaleString()
                : "Not available");

        renderDashboard();

    } catch (error) {
        console.error("Dashboard loading error:", error);

        elements.updated.textContent =
            "Unable to load dashboard data.";

        elements.table.innerHTML = `
            <tr>
                <td colspan="9">
                    Unable to load PR data. Check the prs.json file and browser console.
                </td>
            </tr>
        `;
    }
}

elements.branch.addEventListener("change", renderDashboard);
elements.status.addEventListener("change", renderDashboard);
elements.search.addEventListener("input", renderDashboard);

loadDashboard();

// Refresh dashboard data every 60 seconds.
setInterval(loadDashboard, 60000);
