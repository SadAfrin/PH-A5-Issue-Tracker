document.getElementById('open-btn').addEventListener('click', () => {
    showLoading();
    const openIssues = allFetchedIssues.filter(issue => issue.status === 'open');
    displayIssues(openIssues);
    totalCountEl.innerText = openIssues.length;   
    setActiveButton(openBtn);                     
});