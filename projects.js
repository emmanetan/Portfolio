// Add screenshots to images/projects, then set image to their relative path,
// for example: image: 'images/projects/pos.png'. Leave it empty until ready.
// Set url to the actual project URL when a website is available.
// Projects with an empty url open their screenshot in project-preview.html.
window.portfolioProjects = [
  {
    id: 'pos',
    title: 'POS – Point of Sale System',
    category: 'Desktop application',
    description: 'A point of sale system with barcode scanner and receipt printer integration.',
    image: '',
    url: '',
    stack: [
      ['Language', ['Java']],
      ['Database', ['MySQL']],
      ['Hardware', ['Barcode Scanner', 'Receipt Printer']],
    ],
  },
  {
    id: 'school-dormitory',
    title: 'School-Based Dormitory Management System',
    category: 'Desktop application',
    description: 'A school-based dormitory management system built with Java and MySQL.',
    image: '',
    url: '',
    stack: [
      ['Language', ['Java']],
      ['Database', ['MySQL']],
    ],
  },
  {
    id: 'nextgenhire',
    title: 'NextGenHire',
    category: 'Job search platform',
    description: 'A job search platform for fresh graduates, built with C#, .NET, and Blazor.',
    image: '',
    url: '',
    stack: [
      ['Language', ['C#']],
      ['Framework', ['.NET', 'Blazor']],
      ['Database', ['MongoDB']],
    ],
  },
  {
    id: 'calapan-car-rental',
    title: 'CalapanCarRental',
    category: 'Car rental management',
    description: 'A car rental management system with GPS tracking integration.',
    image: '',
    url: '',
    stack: [
      ['Language', ['C#']],
      ['Framework', ['.NET', 'Blazor']],
      ['Database', ['MySQL']],
      ['Integration', ['GPS Tracking']],
    ],
  },
  {
    id: 'dormhub',
    title: 'DormHub',
    category: 'Dormitory management',
    description: 'A dormitory management system built with Laravel, Tailwind CSS, and Bootstrap.',
    image: 'images/projects/DormHub.jpg',
    url: '',
    stack: [
      ['Language', ['PHP']],
      ['Framework', ['Laravel']],
      ['Styling & UI', ['Tailwind CSS', 'Bootstrap']],
      ['Database', ['MySQL']],
    ],
  },
  {
    id: 'barangay-management',
    title: 'Web-Based Barangay Management System',
    category: 'Document digitization & data entry',
    description: 'A web-based barangay management system with OCR-based document digitization and automated data entry.',
    image: '',
    url: 'https://barangaysagpon.page/',
    stack: [
      ['Language', ['PHP']],
      ['Framework', ['Laravel']],
      ['Styling & UI', ['Tailwind CSS', 'Flowbite', 'Catalyst UI', 'Heroicons']],
      ['Database', ['MySQL']],
      ['Cloud services', ['Microsoft Azure']],
      ['Object storage', ['Cloudflare R2']],
    ],
  },
  {
    id: 'pitaka',
    title: 'Pitaka',
    category: 'Personal budget tracking',
    description: 'A personal finance management application designed to help users track income, monitor expenses, manage budgets, and visualize financial activity through interactive charts and reports.',
    image: 'images/projects/Pitaka.png',
    url: 'https://pitaka-six.vercel.app/',
    stack: [
      ['Framework', ['Next.js', 'React']],
      ['Language', ['TypeScript']],
      ['Styling & UI', ['Tailwind CSS', 'shadcn/ui', 'Radix UI']],
      ['Database & ORM', ['SQLite', 'Prisma ORM']],
      ['State', ['Zustand']],
      ['Data fetching', ['TanStack Query (React Query)']],
      ['Charts', ['Recharts']],
      ['Runtime & tools', ['Bun']],
    ],
  },
];

(() => {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;

  const createElement = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  window.portfolioProjects.forEach((project, index) => {
    const card = createElement('article', 'project-card scroll-reveal');
    card.style.setProperty('--reveal-delay', `${index % 2 * 80}ms`);
    card.setAttribute('aria-labelledby', `project-${project.id}`);

    const visual = createElement('div', 'project-visual');
    const placeholder = createElement('div', 'project-placeholder');
    const icon = createElement('i', 'fa fa-picture-o');
    icon.setAttribute('aria-hidden', 'true');
    placeholder.append(icon, createElement('span', '', 'Screenshot coming soon'));
    visual.appendChild(placeholder);

    // Do not create an image or send an image request until a path is configured.
    if (project.image) {
      const image = createElement('img', 'project-image');
      image.alt = `${project.title} screenshot`;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.hidden = true;
      image.addEventListener('load', () => {
        image.hidden = false;
        placeholder.hidden = true;
      });
      image.addEventListener('error', () => {
        image.hidden = true;
        placeholder.hidden = false;
      });
      image.src = project.image;
      visual.appendChild(image);
    }

    const body = createElement('div', 'project-body');
    body.appendChild(createElement('p', 'project-category', `${String(index + 1).padStart(2, '0')} / ${project.category}`));
    const title = createElement('h3', 'project-title', project.title);
    title.id = `project-${project.id}`;
    body.append(title, createElement('p', 'project-description', project.description));

    const stack = createElement('dl', 'project-stack');
    project.stack.forEach(([label, technologies]) => {
      const values = createElement('dd');
      technologies.forEach(technology => values.appendChild(createElement('span', 'project-tech', technology)));
      stack.append(createElement('dt', '', label), values);
    });
    body.appendChild(stack);

    const actions = createElement('div', 'project-actions');
    const actionType = project.url ? 'Website' : 'Image preview';
    const open = createElement('a', 'project-open');
    open.href = project.url || `project-preview.html?project=${encodeURIComponent(project.id)}`;
    open.target = '_blank';
    open.rel = 'noopener noreferrer';
    open.setAttribute('aria-label', `Open ${project.title} ${project.url ? 'website' : 'image preview'} in a new tab`);
    const arrow = createElement('i', 'fa fa-external-link');
    arrow.setAttribute('aria-hidden', 'true');
    open.append(createElement('span', '', 'Open'), arrow);
    actions.append(createElement('span', 'project-action-type', actionType), open);
    body.appendChild(actions);

    card.append(visual, body);
    grid.appendChild(card);
  });
})();
