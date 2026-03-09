document.getElementById('closed-btn').addEventListener('click', () => {
    showLoading();
    const closedIssues = allFetchedIssues.filter(issue => issue.status === 'closed');
    displayIssues(closedIssues);
    totalCountEl.innerText = closedIssues.length;   
    setActiveButton(closedBtn);                     
});