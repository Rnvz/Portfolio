const https = require('https');

const icons = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/biopython/biopython-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg'
];

async function check(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', () => resolve({ url, status: 'error' }));
  });
}

async function run() {
  for (const url of icons) {
    const res = await check(url);
    console.log(res.url, res.status);
  }
}

run();
