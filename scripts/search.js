const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', async (e) => {
    const searchText = e.target.value.trim(); 
    if (searchText.length === 0) {
    const isActiveOpen = openBtn.classList.contains('bg-[#4A00FF]');
    const isActiveClosed = closedBtn.classList.contains('bg-[#4A00FF]');

    if (isActiveOpen) {
        const openIssues = allFetchedIssues.filter(i => i.status === 'open');
        displayIssues(openIssues);
        totalCountEl.innerText = openIssues.length;
    } 
    else if (isActiveClosed) {
        const closedIssues = allFetchedIssues.filter(i => i.status === 'closed');
        displayIssues(closedIssues);
        totalCountEl.innerText = closedIssues.length;
    } 
    else {
        displayIssues(allFetchedIssues);
        totalCountEl.innerText = allFetchedIssues.length;
    }
    
    return; 
}
    showLoading();

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
    .then(res => res.json())
    .then(json => {
        const searchResults = json.data; 
        
        const activeBtn = buttons.find(btn => btn.classList.contains('bg-[#4A00FF]'));
        
        let finalData;

        if (activeBtn === openBtn) {
            finalData = searchResults.filter(i => i.status === 'open');
        } 
        else if (activeBtn === closedBtn) {
            finalData = searchResults.filter(i => i.status === 'closed');
        } 
        else {
            finalData = searchResults;
        }

        displayIssues(finalData);
        totalCountEl.innerText = finalData.length;
    });
});



