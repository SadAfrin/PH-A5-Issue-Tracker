document.getElementById('open-btn')?.addEventListener('click', () => {
    const openIssues = allFetchedIssues.filter(issue => issue.status === 'open');
    displayIssues(openIssues);
});