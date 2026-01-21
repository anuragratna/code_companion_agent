document.addEventListener('DOMContentLoaded', () => {
    const buildBtn = document.getElementById('buildBtn');
    const promptInput = document.getElementById('promptInput');
    const statusArea = document.getElementById('statusArea');
    const statusText = document.getElementById('statusText');
    const progressBar = document.getElementById('progressBar');
    const resultsArea = document.getElementById('resultsArea');
    const loader = buildBtn.querySelector('.loader');
    const btnText = buildBtn.querySelector('.btn-text');

    buildBtn.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            alert('Please enter a project description.');
            return;
        }

        // Reset UI
        setLoading(true);
        resultsArea.classList.add('hidden');
        statusArea.className = 'status-visible';
        updateStatus('Initializing...', 10);

        try {
            updateStatus('Thinking (Planner & Architect)...', 40);
            
            const response = await fetch('/api/build', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                updateStatus('Build Complete!', 100);
                showResults();
            } else {
                updateStatus('Error: ' + (data.detail || 'Build failed'), 100);
                alert('Build failed: ' + (data.detail || 'Unknown error'));
            }
        } catch (error) {
            updateStatus('Connection Error', 100);
            alert('Error connecting to server. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    });

    function updateStatus(text, progress) {
        statusText.textContent = text;
        progressBar.style.width = progress + '%';
    }

    function setLoading(isLoading) {
        if (isLoading) {
            buildBtn.disabled = true;
            loader.classList.remove('hidden');
            btnText.textContent = 'Processing...';
        } else {
            buildBtn.disabled = false;
            loader.classList.add('hidden');
            btnText.textContent = 'Build Application';
        }
    }

    function showResults() {
        resultsArea.classList.remove('hidden');
    }
});
