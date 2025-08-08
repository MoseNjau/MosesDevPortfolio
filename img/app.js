(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

// CV Download Protection Function
function downloadCV() {
    // Create a custom modal for code input
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        width: 90%;
    `;
    
    modalContent.innerHTML = `
        <div style="color: white; margin-bottom: 30px;">
            <i class="fas fa-lock" style="font-size: 48px; margin-bottom: 20px; color: #ffd700;"></i>
            <h3 style="margin: 0 0 10px 0; font-size: 24px;">CV Access Required</h3>
            <p style="margin: 0; opacity: 0.9; font-size: 16px;">Enter the access code to download Moses Njau's CV</p>
        </div>
        <div style="margin-bottom: 30px;">
            <input type="password" id="cvAccessCode" placeholder="Enter access code" 
                   style="width: 100%; padding: 15px; border: none; border-radius: 8px; 
                          font-size: 16px; text-align: center; letter-spacing: 2px;
                          background: rgba(255, 255, 255, 0.9); color: #333;">
        </div>
        <div style="display: flex; gap: 15px; justify-content: center;">
            <button onclick="verifyAndDownload()" 
                    style="background: #27ae60; color: white; border: none; padding: 12px 25px; 
                           border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600;
                           transition: all 0.3s ease;">
                <i class="fas fa-download"></i> Download
            </button>
            <button onclick="closeModal()" 
                    style="background: #e74c3c; color: white; border: none; padding: 12px 25px; 
                           border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600;
                           transition: all 0.3s ease;">
                <i class="fas fa-times"></i> Cancel
            </button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Focus on input field
    setTimeout(() => {
        document.getElementById('cvAccessCode').focus();
    }, 100);
    
    // Allow Enter key to submit
    document.getElementById('cvAccessCode').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verifyAndDownload();
        }
    });
    
    // Store modal reference for closing
    window.currentModal = modal;
}

function verifyAndDownload() {
    const enteredCode = document.getElementById('cvAccessCode').value;
    const correctCode = '0710429497'; // Your special access code
    
    if (enteredCode === correctCode) {
        // Success - show success message and download
        showSuccessMessage();
        setTimeout(() => {
            // Create a download link for the CV
            const link = document.createElement('a');
            link.href = 'Moses_Njau_CV.pdf'; // Your CV file
            link.download = 'Moses_Muiruri_Njau_CV.pdf';
            link.click();
            closeModal();
        }, 1500);
    } else {
        // Show error message
        showErrorMessage();
    }
}

function showSuccessMessage() {
    const input = document.getElementById('cvAccessCode');
    input.style.background = '#d4edda';
    input.style.borderColor = '#27ae60';
    input.value = 'Access Granted! ';
    input.style.color = '#27ae60';
    input.style.fontWeight = 'bold';
}

function showErrorMessage() {
    const input = document.getElementById('cvAccessCode');
    input.style.background = '#f8d7da';
    input.style.borderColor = '#e74c3c';
    input.style.animation = 'shake 0.5s';
    input.value = '';
    input.placeholder = 'Invalid code. Try again...';
    
    // Reset after 2 seconds
    setTimeout(() => {
        input.style.background = 'rgba(255, 255, 255, 0.9)';
        input.style.borderColor = 'transparent';
        input.placeholder = 'Enter access code';
        input.style.animation = '';
    }, 2000);
}

function closeModal() {
    if (window.currentModal) {
        document.body.removeChild(window.currentModal);
        window.currentModal = null;
    }
}

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);