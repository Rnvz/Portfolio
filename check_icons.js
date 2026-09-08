const https = require('https');

const icons = [
  'mysql', 'sqlite', 'figma', 'anaconda', 'biopython', 'github', 'git', 'c', 'jira', 'css3', 'matplotlib'
];

async function check(icon) {
  return new Promise((resolve) => {
    https.get(`https://cdn.simpleicons.org/${icon}`, (res) => {
      resolve({ icon, status: res.statusCode });
    }).on('error', () => resolve({ icon, status: 'error' }));
  });
}

async function run() {
  for (const icon of icons) {
    const res = await check(icon);
    console.log(res.icon, res.status);
  }
}

run();
