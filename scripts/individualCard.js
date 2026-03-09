const modal = document.getElementById("issueModal");
const modalContainer = document.getElementById("modalContainer");

function showIssueDetails(id) {

    // modal open
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    modalContainer.innerHTML = "<p class='text-center py-10'>Loading issue...</p>";

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issue/" + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {

            const issue = json.data;

            const isHigh = issue.priority?.toLowerCase() === 'high';
            const isOpen = issue.status === 'open';

            modalContainer.innerHTML = `
                <h2 class="text-3xl font-bold text-gray-900 mb-2">${issue.title}</h2>

                <div class="flex items-center gap-3 mb-5 text-sm text-gray-400 font-medium">
                    <span class="${isOpen ? 'bg-green-600' : 'bg-purple-600'} text-white px-3 py-1 rounded-full text-xs font-bold capitalize">
                        ${issue.status}ed
                    </span>
                    <span>• Opened by <span class="text-gray-400 font-semibold">${issue.author}</span> • ${new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>

                <div class="flex flex-wrap gap-2 mb-6">
                    ${issue.labels.map(label => `
                        <span class="bg-orange-50 text-orange-500 border border-orange-200 px-3 py-1 rounded-full text-[11px] font-semibold uppercase flex items-center gap-1">
                            <i class="fa-solid fa-tag text-[9px]"></i> ${label}
                        </span>
                    `).join('')}
                </div>

                <p class="text-gray-500 text-lg leading-relaxed mb-8">
                    ${issue.description}
                </p>

                <div class="flex justify-start gap-32 px-6 items-center">
                    <div>
                        <p class="text-gray-400 text-xs font-semibold mb-2">Assignee:</p>
                        <p class="text-gray-900 text-[14px] font-bold">${issue.author}</p>
                    </div>
                    <div>
                        <p class="text-gray-400 text-xs font-semibold   mb-3">Priority:</p>
                        <span class="${isHigh ? 'bg-red-500' : 'bg-orange-400'} text-white px-3 py-2 rounded-2xl text-xs font-semibold uppercase shadow-sm">
                            ${issue.priority}
                        </span>
                    </div>
                </div>

                <div class="flex justify-end pt-8">
                    <button onclick="closeIssueModal()" 
                        class="bg-[#4A00FF] hover:bg-[#4A00FF] text-white px-10 py-3 rounded-2xl font-bold text-sm transition-all shadow-xl">
                        Close
                    </button>
                </div>
            `;
        });
}

function closeIssueModal(){
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}