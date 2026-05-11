/* =========================================================
   ClientFlow Business Workflow Demo
   Frontend-only interactive prototype
========================================================= */

const storageKey = "clientFlowDemoRequests";

const defaultRequests = [
  {
    id: "RC-1001",
    clientName: "Amanda Wells",
    phone: "(555) 214-8821",
    email: "amanda.wells@example.com",
    address: "1842 Oak Hollow Dr",
    serviceType: "Seasonal Cleanup",
    status: "New",
    priority: "High",
    requestedDate: "2026-05-14",
    preferredContact: "Text",
    summary: "Needs spring cleanup, mulch refresh, and trimming around front walkway.",
    customFields: {
      propertyType: "Residential",
      gateAccess: "No gate",
      equipmentNeeded: "Mulch tools, hedge trimmer",
      serviceFrequency: "Seasonal",
    },
    notes: [
      "Customer asked for estimate before scheduling.",
      "Mentioned previous provider stopped responding.",
    ],
    nextAction: "Prepare estimate and follow up by Friday.",
  },
  {
    id: "RC-1002",
    clientName: "Marcus Green",
    phone: "(555) 778-1934",
    email: "marcus.green@example.com",
    address: "77 Riverside Bend",
    serviceType: "Gutter Cleaning",
    status: "Scheduled",
    priority: "Medium",
    requestedDate: "2026-05-16",
    preferredContact: "Phone",
    summary: "Two-story home needs gutter cleaning before heavy rain season.",
    customFields: {
      propertyType: "Residential",
      gateAccess: "Side gate unlocked",
      equipmentNeeded: "Extension ladder, leaf bags",
      serviceFrequency: "Twice yearly",
    },
    notes: [
      "Customer prefers morning appointments.",
      "Driveway is narrow; park on street if needed.",
    ],
    nextAction: "Confirm crew availability for Thursday morning.",
  },
  {
    id: "RC-1003",
    clientName: "Lena Ortiz",
    phone: "(555) 330-4457",
    email: "lena.ortiz@example.com",
    address: "928 Maple Ridge Ct",
    serviceType: "Mowing",
    status: "In Progress",
    priority: "Low",
    requestedDate: "2026-05-10",
    preferredContact: "Email",
    summary: "Recurring mowing client with preference for higher grass height.",
    customFields: {
      propertyType: "Residential",
      gateAccess: "Gate code #4432",
      equipmentNeeded: "30-inch walk-behind mower",
      serviceFrequency: "Weekly",
    },
    notes: [
      "Customer wants grass cut at 3.5 inches.",
      "Backyard has a narrow gate; avoid large mower.",
    ],
    nextAction: "Complete weekly service and mark ready for invoice.",
  },
  {
    id: "RC-1004",
    clientName: "Northside Yoga Studio",
    phone: "(555) 901-2208",
    email: "studio@example.com",
    address: "310 Pearl Street",
    serviceType: "Mulching",
    status: "Waiting",
    priority: "Medium",
    requestedDate: "2026-05-12",
    preferredContact: "Email",
    summary: "Commercial front entry mulch refresh. Waiting on approval for color choice.",
    customFields: {
      propertyType: "Commercial",
      gateAccess: "Front entry only",
      equipmentNeeded: "Mulch tools, wheelbarrow",
      serviceFrequency: "As needed",
    },
    notes: [
      "Sent estimate with brown and black mulch options.",
      "Owner wants to confirm color with business partner.",
    ],
    nextAction: "Follow up on mulch color approval.",
  },
  {
    id: "RC-1005",
    clientName: "Caleb Price",
    phone: "(555) 642-9081",
    email: "caleb.price@example.com",
    address: "522 Willow Creek Ln",
    serviceType: "Aeration",
    status: "Completed",
    priority: "Low",
    requestedDate: "2026-05-06",
    preferredContact: "Text",
    summary: "Spring lawn aeration completed. Customer interested in fall service reminder.",
    customFields: {
      propertyType: "Residential",
      gateAccess: "No fence",
      equipmentNeeded: "Core aerator",
      serviceFrequency: "Twice yearly",
    },
    notes: [
      "Aeration completed on May 8.",
      "Add customer to fall reminder list.",
    ],
    nextAction: "Send fall aeration reminder in September.",
  },
  {
    id: "RC-1006",
    clientName: "Harbor House Rentals",
    phone: "(555) 806-1145",
    email: "maintenance@example.com",
    address: "19 Harbor View Apt Complex",
    serviceType: "Property Walkthrough",
    status: "New",
    priority: "High",
    requestedDate: "2026-05-15",
    preferredContact: "Phone",
    summary: "Rental property manager requested walkthrough for multiple outdoor maintenance items.",
    customFields: {
      propertyType: "Commercial / Multi-unit",
      gateAccess: "Manager will meet on site",
      equipmentNeeded: "Inspection checklist, camera",
      serviceFrequency: "Monthly",
    },
    notes: [
      "Potential recurring account if first walkthrough goes well.",
      "Manager asked about monthly maintenance options.",
    ],
    nextAction: "Call manager to schedule walkthrough.",
  },
];

let requests = loadRequests();

function loadRequests() {
  const savedRequests = localStorage.getItem(storageKey);

  if (!savedRequests) {
    return structuredClone(defaultRequests);
  }

  try {
    const parsedRequests = JSON.parse(savedRequests);

    if (!Array.isArray(parsedRequests)) {
      return structuredClone(defaultRequests);
    }

    return parsedRequests;
  } catch (error) {
    console.warn("Could not load saved ClientFlow demo records.", error);
    return structuredClone(defaultRequests);
  }
}

function saveRequests() {
  localStorage.setItem(storageKey, JSON.stringify(requests));
}

function resetDemoData() {
  requests = structuredClone(defaultRequests);
  selectedRequestId = requests[0].id;
  activeStatus = "All";
  activeSearch = "";
  searchInput.value = "";

  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.status === "All");
  });

  saveRequests();
  render();
}

const statusOrder = ["New", "Scheduled", "In Progress", "Waiting", "Completed"];

let activeStatus = "All";
let activeSearch = "";
let selectedRequestId = requests[0].id;

const summaryGrid = document.querySelector("#summaryGrid");
const requestList = document.querySelector("#requestList");
const detailPanel = document.querySelector("#detailPanel");
const resultCount = document.querySelector("#resultCount");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll(".filter-button");
const newRequestButton = document.querySelector("#newRequestButton");
const newRequestModal = document.querySelector("#newRequestModal");
const closeModalButton = document.querySelector("#closeModalButton");
const cancelRequestButton = document.querySelector("#cancelRequestButton");
const newRequestForm = document.querySelector("#newRequestForm");
const addNoteModal = document.querySelector("#addNoteModal");
const closeNoteModalButton = document.querySelector("#closeNoteModalButton");
const cancelNoteButton = document.querySelector("#cancelNoteButton");
const addNoteForm = document.querySelector("#addNoteForm");
const noteText = document.querySelector("#noteText");
const resetDemoButton = document.querySelector("#resetDemoButton");

function getStatusClass(status) {
  return `status-${status.toLowerCase().replace(/\s+/g, "-")}`;
}

function getPriorityClass(priority) {
  return `priority-${priority.toLowerCase()}`;
}

function getFilteredRequests() {
  const search = activeSearch.trim().toLowerCase();

  return requests.filter((request) => {
    const matchesStatus =
      activeStatus === "All" || request.status === activeStatus;

    const searchableText = [
      request.id,
      request.clientName,
      request.phone,
      request.email,
      request.address,
      request.serviceType,
      request.status,
      request.priority,
      request.summary,
      request.nextAction,
      ...Object.values(request.customFields),
      ...request.notes,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = !search || searchableText.includes(search);

    return matchesStatus && matchesSearch;
  });
}

function renderSummary() {
  const summaryItems = [
    {
      label: "Open Requests",
      value: requests.filter((request) => request.status !== "Completed").length,
    },
    {
      label: "New Requests",
      value: requests.filter((request) => request.status === "New").length,
    },
    {
      label: "Waiting",
      value: requests.filter((request) => request.status === "Waiting").length,
    },
    {
      label: "Completed",
      value: requests.filter((request) => request.status === "Completed").length,
    },
  ];

  summaryGrid.innerHTML = summaryItems
    .map(
      (item) => `
        <article class="summary-card">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `
    )
    .join("");
}

function renderRequestList() {
  const filteredRequests = getFilteredRequests();

  resultCount.textContent =
    filteredRequests.length === 1
      ? "1 record"
      : `${filteredRequests.length} records`;

  if (filteredRequests.length === 0) {
    requestList.innerHTML = `
      <div class="detail-empty">
        <strong>No matching records found.</strong>
        <p>Try changing the search term or status filter.</p>
      </div>
    `;
    detailPanel.innerHTML = `
      <div class="detail-empty">
        <strong>No request selected.</strong>
        <p>Select a record from the list to view details.</p>
      </div>
    `;
    return;
  }

  const selectedStillVisible = filteredRequests.some(
    (request) => request.id === selectedRequestId
  );

  if (!selectedStillVisible) {
    selectedRequestId = filteredRequests[0].id;
  }

  requestList.innerHTML = filteredRequests
    .map(
      (request) => `
        <button
          type="button"
          class="request-row ${request.id === selectedRequestId ? "active" : ""}"
          data-request-id="${request.id}"
        >
          <div class="request-row-top">
            <div>
              <h4>${request.clientName}</h4>
              <p>${request.serviceType} · ${request.address}</p>
            </div>
            <span class="status-pill ${getStatusClass(request.status)}">
              ${request.status}
            </span>
          </div>

          <div class="row-meta">
            <span class="priority-pill ${getPriorityClass(request.priority)}">
              ${request.priority} Priority
            </span>
            <span class="status-pill status-completed">
              ${request.id}
            </span>
          </div>
        </button>
      `
    )
    .join("");

  document.querySelectorAll(".request-row").forEach((row) => {
    row.addEventListener("click", () => {
      selectedRequestId = row.dataset.requestId;
      render();
    });
  });

  renderDetailPanel();
}

function renderCustomFields(customFields) {
  return Object.entries(customFields)
    .map(
      ([key, value]) => `
        <div class="custom-field">
          <span>${formatFieldName(key)}</span>
          <strong>${value}</strong>
        </div>
      `
    )
    .join("");
}

function formatFieldName(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function renderDetailPanel() {
  const request = requests.find((item) => item.id === selectedRequestId);

  if (!request) {
    detailPanel.innerHTML = `
      <div class="detail-empty">
        <strong>No request selected.</strong>
        <p>Select a record from the list to view details.</p>
      </div>
    `;
    return;
  }

  detailPanel.innerHTML = `
    <div class="detail-content">
      <div class="detail-top">
        <div>
          <h3>${request.clientName}</h3>
          <p>${request.serviceType} · ${request.id}</p>
          <div class="row-meta">
            <span class="status-pill ${getStatusClass(request.status)}">
              ${request.status}
            </span>
            <span class="priority-pill ${getPriorityClass(request.priority)}">
              ${request.priority} Priority
            </span>
          </div>
        </div>

        <div class="detail-actions">
          <button type="button" class="small-button" id="addNoteButton">
            Add Note
          </button>
          <button type="button" class="small-button primary" id="advanceStatusButton">
            Advance Status
          </button>
        </div>
      </div>

      <div class="detail-grid">
        <div class="info-block">
          <span>Phone</span>
          <strong>${request.phone}</strong>
        </div>

        <div class="info-block">
          <span>Email</span>
          <strong>${request.email}</strong>
        </div>

        <div class="info-block">
          <span>Address</span>
          <strong>${request.address}</strong>
        </div>

        <div class="info-block">
          <span>Preferred Contact</span>
          <strong>${request.preferredContact}</strong>
        </div>
      </div>

      <div class="detail-section">
        <h4>Request Summary</h4>
        <p>${request.summary}</p>
      </div>

      <div class="detail-section">
        <div class="section-title-row">
          <h4>Custom Fields</h4>
          <span class="customize-badge">Customizable</span>
        </div>

        <p class="detail-helper-text">
          These example fields are specific to River City Property Services. A real version
          could track the details that matter for your business.
        </p>

        <div class="custom-field-grid">
          ${renderCustomFields(request.customFields)}
        </div>
      </div>

      <div class="detail-section">
        <h4>Internal Notes</h4>
        <ul class="notes-list">
          ${request.notes.map((note) => `<li>${note}</li>`).join("")}
        </ul>
      </div>

      <div class="detail-section">
        <h4>Next Action</h4>
        <p>${request.nextAction}</p>
      </div>
    </div>
  `;

  document
    .querySelector("#advanceStatusButton")
    .addEventListener("click", advanceSelectedStatus);

  document
    .querySelector("#addNoteButton")
    .addEventListener("click", openAddNoteModal);
}

function advanceSelectedStatus() {
  const request = requests.find((item) => item.id === selectedRequestId);

  if (!request) return;

  const currentIndex = statusOrder.indexOf(request.status);

  if (currentIndex === -1 || currentIndex === statusOrder.length - 1) {
    request.status = "New";
  } else {
    request.status = statusOrder[currentIndex + 1];
  }

  request.notes.unshift(`Status changed to ${request.status} in demo mode.`);
  request.nextAction =
    request.status === "Completed"
      ? "Review for billing, follow-up, or future service reminder."
      : `Next step depends on ${request.status.toLowerCase()} workflow.`;

  saveRequests();
  render();
}

function openAddNoteModal() {
  const request = requests.find((item) => item.id === selectedRequestId);

  if (!request) return;

  addNoteModal.classList.remove("hidden");
  addNoteModal.setAttribute("aria-hidden", "false");
  noteText.value = "";
  noteText.focus();
}

function closeAddNoteModal() {
  addNoteModal.classList.add("hidden");
  addNoteModal.setAttribute("aria-hidden", "true");
  addNoteForm.reset();
}

function handleAddNoteSubmit(event) {
  event.preventDefault();

  const request = requests.find((item) => item.id === selectedRequestId);

  if (!request) return;

  const formData = new FormData(addNoteForm);
  const note = formData.get("noteText").trim();

  if (!note) return;

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  request.notes.unshift(`${note} — Added ${today}`);

  saveRequests();
  closeAddNoteModal();
  render();
}

function render() {
  renderSummary();
  renderRequestList();
}

searchInput.addEventListener("input", (event) => {
  activeSearch = event.target.value;
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeStatus = button.dataset.status;

    filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn === button);
    });

    render();
  });
});

newRequestButton.addEventListener("click", openNewRequestModal);
closeModalButton.addEventListener("click", closeNewRequestModal);
cancelRequestButton.addEventListener("click", closeNewRequestModal);
newRequestForm.addEventListener("submit", handleNewRequestSubmit);

newRequestModal.addEventListener("click", (event) => {
  if (event.target === newRequestModal) {
    closeNewRequestModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (!newRequestModal.classList.contains("hidden")) {
    closeNewRequestModal();
  }

  if (!addNoteModal.classList.contains("hidden")) {
    closeAddNoteModal();
  }
});

closeNoteModalButton.addEventListener("click", closeAddNoteModal);
cancelNoteButton.addEventListener("click", closeAddNoteModal);
addNoteForm.addEventListener("submit", handleAddNoteSubmit);

addNoteModal.addEventListener("click", (event) => {
  if (event.target === addNoteModal) {
    closeAddNoteModal();
  }
});

resetDemoButton.addEventListener("click", resetDemoData);

function openNewRequestModal() {
  newRequestModal.classList.remove("hidden");
  newRequestModal.setAttribute("aria-hidden", "false");
  document.querySelector("#clientName").focus();
}

function closeNewRequestModal() {
  newRequestModal.classList.add("hidden");
  newRequestModal.setAttribute("aria-hidden", "true");
  newRequestForm.reset();
}

function getNextRequestId() {
  const highestNumber = requests.reduce((highest, request) => {
    const numberPart = Number(request.id.replace("RC-", ""));
    return numberPart > highest ? numberPart : highest;
  }, 1000);

  return `RC-${highestNumber + 1}`;
}

function handleNewRequestSubmit(event) {
  event.preventDefault();

  const formData = new FormData(newRequestForm);

  const newRequest = {
    id: getNextRequestId(),
    clientName: formData.get("clientName"),
    phone: formData.get("phone"),
    email: formData.get("email") || "No email provided",
    address: formData.get("address"),
    serviceType: formData.get("serviceType"),
    status: "New",
    priority: formData.get("priority"),
    requestedDate: new Date().toISOString().slice(0, 10),
    preferredContact: formData.get("preferredContact"),
    summary: formData.get("summary"),
    customFields: {
      propertyType: formData.get("propertyType"),
      gateAccess: formData.get("gateAccess") || "Not provided",
      equipmentNeeded: formData.get("equipmentNeeded") || "To be determined",
      serviceFrequency: formData.get("serviceFrequency"),
    },
    notes: [
      "Request added in demo mode. In a production version, this would be saved to a database.",
    ],
    nextAction:
      formData.get("nextAction") ||
      "Review request details and decide next follow-up step.",
  };

  requests.unshift(newRequest);
  selectedRequestId = newRequest.id;
  activeStatus = "All";
  activeSearch = "";
  searchInput.value = "";

filterButtons.forEach((btn) => {
  btn.classList.toggle("active", btn.dataset.status === "All");
});

  saveRequests();
  closeNewRequestModal();
  render();
}

render();