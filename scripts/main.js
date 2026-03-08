const issuesWrapper = document.getElementById('issuesWrapper');
const totalCountEl = document.getElementById('totalCount');

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

const buttons = [allBtn, openBtn, closedBtn];
function setActiveButton(activeBtn) {
    buttons.forEach(btn => {
        btn.classList.remove("bg-[#4A00FF]", "text-white");
        btn.classList.add("bg-white", "text-gray-500", "border", "border-gray-100");
    });

    activeBtn.classList.remove("bg-white", "text-gray-500", "border", "border-gray-100");
    activeBtn.classList.add("bg-[#4A00FF]", "text-white");

    if (activeBtn === allBtn) {
        activeBtn.classList.add("border-gray-100");
    }
}

allBtn.addEventListener("click", () => {
    displayIssues(allFetchedIssues);
    totalCountEl.innerText = allFetchedIssues.length;
    setActiveButton(allBtn);
});

const showLoading = () => {
    issuesWrapper.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#4A00FF]"></div>
            <p class="mt-4 text-gray-500 font-medium">Loading issues...</p>
        </div>
    `;
};

let allFetchedIssues = [];
// API theke data fetching
const loadIssues = async () => {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const json = await response.json();
    allFetchedIssues = json.data; 
    return allFetchedIssues;
};


async function getAllIssues() {
    showLoading();
    const issuesList = await loadIssues();
    totalCountEl.innerText = issuesList.length;
    setActiveButton(allBtn);
    displayIssues(issuesList);
}

// UI-te card creation
function displayIssues(issues) {
    issuesWrapper.innerHTML = ''; 
    if (issues.length === 0) {
        issuesWrapper.innerHTML = `
            <p class="col-span-full text-gray-800 font-bold text-[32px] text-center">No issues found!</p>   
        `;
        return;
    }

    issues.forEach(issue => {
        const isOpen = issue.status === 'open';
        // 1. status-based theme
        const theme = {
            // top border color
            cardBorder: isOpen ? 'border-t-green-500' : 'border-t-purple-500', 
            
            statusIcon: isOpen 
                ? `<img src="assets/Open-Status.png" class="w-5 h-5 object-contain" alt="open">` 
                : `<img src="assets/Closed-Status.png" class="w-5 h-5 object-contain" alt="closed">` 
        };

        // 2. Priority text color
        const getPriorityStyle = (priority) => {
            const p = priority ? priority.toLowerCase() : '';

            if (p === 'high') {
                return 'bg-red-100 text-red-600';
            } 
            else if (p === 'medium') {
                return 'bg-orange-100 text-orange-600';
            } 
            else if (p === 'low') {
                return 'bg-gray-100 text-gray-600';
            } 
            else {
                return 'bg-gray-100 text-gray-600';
            }

        };
        const priorityStyle = getPriorityStyle(issue.priority);

        const getLabelStyle = (label) => {

            const l = label ? label.toLowerCase() : '';

            if (l === 'bug') {
                return 'bg-red-100 text-red-600';
            } 
            else if (l === 'enhancement') {
                return 'bg-green-100 text-green-600';
            } 
            else if (l === 'help wanted') {
                return 'bg-orange-100 text-orange-600';
            } 
            else if (l === 'good first issue') {
                return 'bg-indigo-100 text-indigo-600';
            } 
            else {
                return 'bg-gray-100 text-gray-600';
            }

        };
        // const labelStyle = getLabelStyle(issue.labels);

        const card = `
            <div class="bg-white border border-gray-100 border-t-4 ${theme.cardBorder} rounded-xl shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between overflow-hidden">
                <div class="p-5 flex-grow border-b border-gray-200">
                    <div class="flex justify-between items-center mb-4">
                         ${theme.statusIcon}
                         <span class="text-[10px] font-extrabold py-0.5 px-2.5 rounded-full uppercase ${priorityStyle}">
                            ${issue.priority}
                         </span>
                    </div>
                    
                    <h3 class="font-bold text-gray-900 text-base leading-tight mb-2 line-clamp-2 hover:text-[#4A00FF] cursor-pointer">
                        ${issue.title}
                    </h3>
                    
                    <p class="text-[12px] text-gray-500 line-clamp-3 mb-5 font-medium">
                        ${issue.description}
                    </p>
                    
                    <div class="flex flex-wrap gap-3">
                        ${issue.labels.map(label => `
                            <span class="text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase ${getLabelStyle(label)} flex items-center gap-2">
                                <i class="fa-solid fa-tag text-[9px]"></i> ${label}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <div class="p-5 border-t border-gray-50 bg-gray-50/40 flex flex-col text-[11px] text-gray-400 font-semibold tracking-wide">
                    <span>#${issue.id} by <span class="text-gray-600">${issue.author}</span></span>
                    <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        `;
        issuesWrapper.innerHTML += card;
    });
}



getAllIssues();