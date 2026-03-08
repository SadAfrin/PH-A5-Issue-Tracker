document.getElementById('closed-btn')?.addEventListener('click', () => {
    const closedIssues = allFetchedIssues.filter(issue => issue.status === 'closed');
    displayIssues(closedIssues);
});