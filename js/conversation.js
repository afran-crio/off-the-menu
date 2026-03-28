/* ============================================
   OFF THE MENU - Conversation / Diagnostic Engine
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const answers = {
    name: '',
    brand: '',
    stage: null,
    challenge: null,
    content: null,
    priority: null,
    extras: []
  };

  const screens = ['intro', 'name', 'q1', 'q2', 'q3', 'q4', 'q5', 'result'];
  let currentScreen = 0;

  const progressBar = document.getElementById('progressBar');
  const startBtn = document.getElementById('startBtn');
  const nameNext = document.getElementById('nameNext');
  const extrasNext = document.getElementById('extrasNext');

  // --- Systems data (USD, 1.5x markup) ---
  const systems = {
    starter: {
      name: 'Brand & Visibility System',
      tier: 'Starter',
      audience: 'For brands that need a clear identity, consistent presence, and a strong content foundation to get noticed.',
      price: 999,
      priceLabel: '$999/month',
      term: 'Minimum 3-month retainer · 1 shoot/month · 8-10 assets per shoot',
      desc: 'We establish your visual identity, content rhythm, and foundational strategy.',
      features: [
        'Brand Positioning & Verbal Identity',
        'Visual Direction & Content Style Guide',
        'Monthly Content Calendar',
        '1 Shoot per Month (8-10 assets)',
        'Content Editing & Post Production',
        'Social Media Management',
        'Monthly Performance Review'
      ]
    },
    growth: {
      name: 'Narrative & Campaign System',
      tier: 'Growth',
      audience: 'For brands ready to move beyond posting and into strategic storytelling, campaigns, and real audience growth.',
      price: 1349,
      priceLabel: '$1,349/month',
      term: 'Minimum 3-month retainer · 2 shoots/month · 12-14 assets per shoot',
      desc: 'Narrative development, campaign thinking, and a higher content cadence for depth and momentum.',
      features: [
        'Everything in Starter, plus:',
        'Narrative & Campaign Strategy',
        '2 Shoots per Month (12-14 assets)',
        'Reels & Short-Form Video Content',
        'Campaign Planning & Execution',
        'Community Management',
        'Monthly Strategy Review & Reporting'
      ]
    },
    premium: {
      name: 'Creative Leadership & Direction',
      tier: 'Premium',
      audience: 'For established or multi-outlet brands that need a creative partner to lead brand direction end-to-end.',
      price: 1999,
      priceLabel: '$1,999 - $2,499/month',
      term: 'Minimum 6-month retainer · 3+ shoots/month · 16-18 assets per shoot',
      desc: 'Full creative leadership. We operate as your brand\'s creative team across all touchpoints.',
      features: [
        'Everything in Growth, plus:',
        'Creative Direction & Brand Leadership',
        '3+ Shoots per Month (16-18 assets)',
        'Multi-Platform Content Strategy',
        'Founder & Team Visibility Strategy',
        'Advanced Campaign Systems',
        'Priority Access & Dedicated Team',
        'Quarterly Brand Reviews'
      ]
    }
  };

  const extensions = {
    website: {
      name: 'Digital Experience & Website Strategy',
      desc: 'Custom website design or digital menu system aligned with your brand identity.',
      price: 649,
      priceLabel: '$649',
      billing: 'one-time setup'
    },
    'paid-media': {
      name: 'Paid Media & Growth',
      desc: 'Strategic paid media planning, creative direction, and performance optimisation.',
      price: 349,
      priceLabel: '$349/month',
      billing: 'per month + ad spend'
    },
    influencer: {
      name: 'Creator & Community Marketing',
      desc: 'Creator strategy, influencer shortlisting, and collaboration concepts.',
      price: 249,
      priceLabel: '$249/month',
      billing: 'per month'
    },
    launch: {
      name: 'Launch Strategy & PR Visibility',
      desc: 'Launch narrative, campaign planning, PR development, and media coordination.',
      price: 699,
      priceLabel: '$699',
      billing: 'per launch'
    },
    events: {
      name: 'Event Amplification & Documentation',
      desc: 'Pre-event storytelling, on-ground direction, and post-event recap strategy.',
      price: 249,
      priceLabel: '$249',
      billing: 'per event'
    },
    packaging: {
      name: 'Brand Systems, Packaging & Merchandise',
      desc: 'Visual system design, menu design direction, and production-ready asset handover.',
      price: 449,
      priceLabel: '$449',
      billing: 'project-based'
    },
    founder: {
      name: 'Thought Leadership & Founder Visibility',
      desc: 'Founder narrative, content themes, and visibility strategy across platforms.',
      price: 349,
      priceLabel: '$349/month',
      billing: 'per month'
    }
  };

  // --- Personalised insight copy ---
  const insights = {
    stage: {
      launching: 'you\'re building from the ground up - the foundation matters most right now',
      early: 'your brand is live but your presence doesn\'t yet match the experience you offer',
      established: 'you\'ve built something real - now it\'s about levelling up how you show up',
      multi: 'you\'re scaling across locations and need one creative voice holding it all together'
    },
    challenge: {
      'no-identity': 'Without a clear identity, every piece of content is a guess. We\'ll fix that first.',
      'no-content': 'Posting without strategy is like cooking without a recipe. We\'ll build the rhythm.',
      'no-story': 'You have the ingredients - now you need the narrative that ties it all together.',
      'no-direction': 'You don\'t need more hands. You need a creative lead who understands the vision.'
    },
    priority: {
      visibility: 'getting seen consistently is the first step - everything else builds on that',
      narrative: 'the brands people remember are the ones that make them feel something',
      growth: 'real growth comes from strategy, not just content volume',
      leadership: 'creative leadership means every decision ladders up to the same brand vision'
    }
  };

  // --- Navigation ---
  function showScreen(index) {
    const allScreens = document.querySelectorAll('.convo__screen');
    const current = allScreens[currentScreen];

    current.classList.remove('convo__screen--visible');

    setTimeout(() => {
      current.classList.remove('convo__screen--active');
      currentScreen = index;
      const next = allScreens[currentScreen];
      next.classList.add('convo__screen--active');

      void next.offsetWidth;

      requestAnimationFrame(() => {
        next.classList.add('convo__screen--visible');
      });

      const progress = (index / (screens.length - 1)) * 100;
      progressBar.style.width = progress + '%';

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }

  // --- Start button ---
  startBtn.addEventListener('click', () => {
    showScreen(1);
    setTimeout(() => {
      document.getElementById('userName').focus();
    }, 500);
  });

  // --- Name screen next ---
  nameNext.addEventListener('click', () => {
    answers.name = document.getElementById('userName').value.trim();
    answers.brand = document.getElementById('brandName').value.trim();
    showScreen(2);
  });

  // Allow Enter key on name fields
  document.querySelectorAll('.convo__field input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        nameNext.click();
      }
    });
  });

  // --- Show intro with animation ---
  setTimeout(() => {
    document.querySelector('.convo__screen--active').classList.add('convo__screen--visible');
  }, 100);

  // --- Single-select options (Q1–Q4) ---
  document.querySelectorAll('.convo__options:not(.convo__options--multi)').forEach(group => {
    group.querySelectorAll('.convo__option').forEach(option => {
      option.addEventListener('click', () => {
        const question = group.dataset.question;
        const value = option.dataset.value;

        group.querySelectorAll('.convo__option').forEach(o => o.classList.remove('convo__option--selected'));
        option.classList.add('convo__option--selected');

        answers[question] = value;

        setTimeout(() => {
          const qNum = parseInt(group.closest('.convo__screen').id.replace('screen-q', ''));
          const nextScreenId = 'q' + (qNum + 1);
          const nextIndex = screens.indexOf(nextScreenId);
          if (nextIndex !== -1) {
            showScreen(nextIndex);
          }
        }, 400);
      });
    });
  });

  // --- Multi-select options (Q5) ---
  document.querySelectorAll('.convo__options--multi .convo__option').forEach(option => {
    option.addEventListener('click', () => {
      const value = option.dataset.value;

      if (value === 'none') {
        document.querySelectorAll('.convo__options--multi .convo__option').forEach(o => {
          o.classList.remove('convo__option--selected');
        });
        option.classList.add('convo__option--selected');
        answers.extras = [];
      } else {
        const noneBtn = document.querySelector('.convo__option[data-value="none"]');
        if (noneBtn) noneBtn.classList.remove('convo__option--selected');

        option.classList.toggle('convo__option--selected');

        if (option.classList.contains('convo__option--selected')) {
          answers.extras.push(value);
        } else {
          answers.extras = answers.extras.filter(v => v !== value);
        }
      }
    });
  });

  // --- Extras next button ---
  extrasNext.addEventListener('click', () => {
    generateResult();
    showScreen(screens.indexOf('result'));
  });

  // --- Recommendation Engine ---
  function getRecommendation() {
    let score = 0;

    const stageScores = { launching: 0, early: 0, established: 1, multi: 2 };
    score += stageScores[answers.stage] || 0;

    const challengeScores = { 'no-identity': 0, 'no-content': 0, 'no-story': 1, 'no-direction': 2 };
    score += challengeScores[answers.challenge] || 0;

    const contentScores = { nothing: 0, diy: 0, freelancers: 1, managed: 2 };
    score += contentScores[answers.content] || 0;

    const priorityScores = { visibility: 0, narrative: 1, growth: 1, leadership: 2 };
    score += priorityScores[answers.priority] || 0;

    if (score >= 5) return 'premium';
    if (score >= 2) return 'growth';
    return 'starter';
  }

  function getRelevantExtensions() {
    return answers.extras
      .filter(e => e !== 'none' && extensions[e])
      .map(e => ({ key: e, ...extensions[e] }));
  }

  function formatCurrency(num) {
    return '$' + num.toLocaleString('en-US');
  }

  function generateResult() {
    const systemKey = getRecommendation();
    const system = systems[systemKey];
    const relevantExtensions = getRelevantExtensions();

    const brandDisplay = answers.brand || 'your brand';
    const nameDisplay = answers.name || '';
    const greeting = nameDisplay ? nameDisplay + ', here\'s' : 'Here\'s';

    // Build personalised insight
    const stageInsight = insights.stage[answers.stage] || '';
    const challengeInsight = insights.challenge[answers.challenge] || '';
    const priorityInsight = insights.priority[answers.priority] || '';

    // Calculate quote
    const systemMonthly = system.price;
    const monthlyExtensions = relevantExtensions
      .filter(e => e.billing === 'per month' || e.billing === 'per month + ad spend')
      .reduce((sum, e) => sum + e.price, 0);
    const onetimeExtensions = relevantExtensions
      .filter(e => e.billing !== 'per month' && e.billing !== 'per month + ad spend');
    const totalMonthly = systemMonthly + monthlyExtensions;
    const hasMonthlyExtensions = monthlyExtensions > 0;
    const hasOnetimeExtensions = onetimeExtensions.length > 0;

    let html = `
      <p class="result__label">Your Personalised Recommendation</p>
      <h2 class="result__heading">${greeting} what we'd build for <em>${brandDisplay}.</em></h2>
    `;

    // Personalised insight card
    html += `
      <div class="result__insight">
        <p class="result__insight-text">Since ${stageInsight}, and your biggest priority is ${priorityInsight} - we recommend starting with our <strong>${system.tier}</strong> system.</p>
        <p class="result__insight-challenge">${challengeInsight}</p>
      </div>
    `;

    // System card
    html += `
      <div class="result__system">
        <div class="result__system-badge">Recommended for ${brandDisplay}</div>
        <h3 class="result__system-name">${system.name}</h3>
        <p class="result__system-audience">${system.audience}</p>
        <p class="result__system-price">${system.priceLabel}</p>
        <p class="result__system-term">${system.term}</p>
        <div class="result__system-divider"></div>
        <p class="result__system-desc">${system.desc}</p>
        <ul class="result__system-features">
          ${system.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
    `;

    // Extensions
    if (relevantExtensions.length > 0) {
      html += `
        <div class="result__extensions">
          <p class="result__extensions-title">Suggested Add-Ons for ${brandDisplay}</p>
          ${relevantExtensions.map(ext => `
            <div class="result__extension-card">
              <div class="result__extension-header">
                <div>
                  <p class="result__extension-name">${ext.name}</p>
                  <p class="result__extension-desc">${ext.desc}</p>
                </div>
                <div class="result__extension-pricing">
                  <span class="result__extension-price">${ext.priceLabel}</span>
                  <span class="result__extension-billing">${ext.billing}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Quote breakdown
    html += `
      <div class="result__quote">
        <p class="result__quote-title">Your Estimated Investment</p>
        <div class="result__quote-lines">
          <div class="result__quote-line">
            <span>${system.name} (${system.tier})</span>
            <span>${formatCurrency(systemMonthly)}/mo</span>
          </div>
    `;

    relevantExtensions.forEach(ext => {
      const isMonthly = ext.billing === 'per month' || ext.billing === 'per month + ad spend';
      html += `
          <div class="result__quote-line result__quote-line--ext">
            <span>${ext.name}</span>
            <span>${ext.priceLabel}${!isMonthly ? ' <span class="result__quote-note">(' + ext.billing + ')</span>' : ''}</span>
          </div>
      `;
    });

    html += `
          <div class="result__quote-divider"></div>
          <div class="result__quote-line result__quote-line--total">
            <span>Estimated Monthly</span>
            <span>${formatCurrency(totalMonthly)}/mo</span>
          </div>
    `;

    if (hasOnetimeExtensions) {
      const onetimeTotal = onetimeExtensions.reduce((sum, e) => sum + e.price, 0);
      html += `
          <div class="result__quote-line result__quote-line--onetime">
            <span>One-time / Project-based</span>
            <span>${formatCurrency(onetimeTotal)}+</span>
          </div>
      `;
    }

    html += `
        </div>
        <p class="result__quote-disclaimer">*Estimates based on starting rates. Final scope and pricing confirmed during our first conversation. Extension pricing varies based on project complexity.</p>
      </div>
    `;

    // CTA
    html += `
      <div class="result__cta">
        <h3>Like what you see${nameDisplay ? ', ' + nameDisplay : ''}?</h3>
        <p>Let's talk about how this system works for ${brandDisplay}. No obligations - just a conversation.</p>
        <div class="result__cta-buttons">
          <a href="contact.html" class="btn btn--white">
            Get in Touch
            <span class="btn__arrow">&rarr;</span>
          </a>
          <a href="services.html" class="btn btn--outline" style="border-color: rgba(255,255,255,0.3); color: var(--white);">
            Compare All Systems
            <span class="btn__arrow">&rarr;</span>
          </a>
        </div>
      </div>

      <div class="result__restart">
        <button id="restartBtn">Start Over</button>
      </div>
    `;

    document.getElementById('resultContent').innerHTML = html;

    // Bind restart
    document.getElementById('restartBtn').addEventListener('click', () => {
      answers.name = '';
      answers.brand = '';
      answers.stage = null;
      answers.challenge = null;
      answers.content = null;
      answers.priority = null;
      answers.extras = [];
      document.getElementById('userName').value = '';
      document.getElementById('brandName').value = '';
      document.querySelectorAll('.convo__option--selected').forEach(o => o.classList.remove('convo__option--selected'));
      showScreen(0);
    });
  }

});
