const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '✕' : '☰';
});

navLinks.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  }
});

const registrationForm = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');

registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = '';
  formMessage.classList.remove('success');

  const requiredFields = [...registrationForm.querySelectorAll('[required]')];
  let isValid = true;

  requiredFields.forEach((field) => {
    field.classList.remove('invalid');
    if (!field.value.trim()) {
      field.classList.add('invalid');
      isValid = false;
    }
  });

  const email = registrationForm.elements.email;
  if (email.value && !email.validity.valid) {
    email.classList.add('invalid');
    isValid = false;
  }

  if (!isValid) {
    formMessage.textContent = 'Please complete all required fields with valid information.';
    return;
  }

  const teamName = registrationForm.elements.teamName.value.trim();
  formMessage.classList.add('success');
  formMessage.textContent = `✓ ${teamName} is registered! Confirmation will be sent by email.`;
  registrationForm.reset();
});

const registrationDeadline = new Date('2027-01-20T23:59:59').getTime();

function updateCountdown() {
  const distance = Math.max(0, registrationDeadline - Date.now());
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  document.getElementById('countDays').textContent = String(days).padStart(2, '0');
  document.getElementById('countHours').textContent = String(hours).padStart(2, '0');
  document.getElementById('countMinutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('countSeconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

const teamMembers = document.getElementById('teamMembers');
const addMemberButton = document.getElementById('addMember');

function refreshMemberNumbers() {
  [...teamMembers.children].forEach((member, index) => {
    member.querySelector(':scope > span').textContent = String(index + 1).padStart(2, '0');
  });
}

addMemberButton.addEventListener('click', () => {
  if (teamMembers.children.length >= 4) {
    addMemberButton.textContent = 'Maximum 4 members reached';
    return;
  }

  const member = document.createElement('div');
  member.className = 'team-member';
  member.innerHTML = '<span></span><input aria-label="Team member" placeholder="Member name"><select aria-label="Member role"><option>Developer</option><option>Product lead</option><option>Designer</option><option>Data analyst</option></select><button class="remove-member" type="button" aria-label="Remove member">×</button>';
  teamMembers.appendChild(member);
  refreshMemberNumbers();
});

teamMembers.addEventListener('click', (event) => {
  if (!event.target.matches('.remove-member') || teamMembers.children.length <= 2) return;
  event.target.closest('.team-member').remove();
  refreshMemberNumbers();
});

document.querySelectorAll('.rules details, .faq-list details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    const symbol = detail.querySelector('summary b');
    symbol.textContent = detail.open ? '−' : '+';
  });
});
