// ============================================
// DR_ Portfolio — Shared Scripts
// ============================================

// --- Pixel Cursor Trail ---
const canvas = document.getElementById('cursor-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const PIXEL_SIZE = 5;
    const ACCENT = '#FF8C00';
    const pixels = [];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', (e) => {
        pixels.push({
            x: Math.floor(e.clientX / PIXEL_SIZE) * PIXEL_SIZE,
            y: Math.floor(e.clientY / PIXEL_SIZE) * PIXEL_SIZE,
            alpha: 1
        });
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = pixels.length - 1; i >= 0; i--) {
            const p = pixels[i];
            p.alpha -= 0.05;
            if (p.alpha <= 0) { pixels.splice(i, 1); continue; }
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = ACCENT;
            ctx.fillRect(p.x, p.y, PIXEL_SIZE, PIXEL_SIZE);
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    animate();
}

// ============================================
// HOME PAGE — Typewriter Effects
// ============================================
const nameEl = document.getElementById('hero-name');
if (nameEl) {
    const nameCursor = document.getElementById('name-cursor');
    const nameText   = 'DAVID RABBA';
    let ni = 0;

    function typeName() {
        if (ni < nameText.length) {
            nameEl.insertBefore(document.createTextNode(nameText[ni]), nameCursor);
            ni++;
            setTimeout(typeName, 90);
        }
    }
    typeName();

    // Terminal typewriter (only exists on home page)
    const termBody = document.getElementById('terminal-body');
    if (termBody) {
        const lines = [
            { type: 'cmd',     text: '$ whoami' },
            { type: 'output',  text: 'David Rabba' },
            { type: 'cmd',     text: '$ cat about.txt' },
            { type: 'output',  text: 'Data Science Student' },
            { type: 'output',  text: '@ University of Jordan' },
            { type: 'cmd',     text: '$ echo $FOCUS' },
            { type: 'output',  text: 'AI & Machine Learning' },
            { type: 'cmd',     text: '$ ./check_status.sh' },
            { type: 'success', text: '[✓] Open to opportunities' },
        ];
        const delays = { cmd: 650, output: 320, success: 450 };
        let li = 0;

        function typeTerminal() {
            if (li >= lines.length) return;
            const line = lines[li];
            const el   = document.createElement('span');
            el.classList.add('terminal-line', line.type, 'visible');
            el.textContent = line.text;
            termBody.appendChild(el);
            termBody.appendChild(document.createElement('br'));
            li++;
            setTimeout(typeTerminal, delays[line.type]);
        }
        setTimeout(typeTerminal, 900);
    }
}

// ============================================
// CONTACT PAGE — Form Submission
// ============================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const status    = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = '...sending';

        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(e.target),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                status.textContent = '[✓] Message sent successfully!';
                status.className = 'text-success';
                contactForm.reset();
            } else {
                throw new Error('Submission failed. Please try again.');
            }
        } catch (err) {
            status.textContent = '[✗] ' + err.message;
            status.className = 'text-danger';
        } finally {
            status.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = '→ Send Message';
        }
    });
}
