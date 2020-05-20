const ghpages = require('gh-pages');

ghpages.publish('build', {
  message: 'Updated GitHub Pages version to 0.1',
  branch: 'ghPage',
  repo: 'https://github.com/ToTheHit/vk-extension-miniApp.git'
}, (err) => {
  if (err) {
    console.log(err);
  }
});
