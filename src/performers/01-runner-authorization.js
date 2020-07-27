const simpleGit = require('simple-git');
const yaml = require('yaml');

const git = simpleGit();

/**
 * If the branch being pushed is not "production" then a Gitlab runner tagged as "production" cannot be used.
 * @param {string} refname
 * @param {string} oldrev
 * @param {string} newrev
 * @return {boolean}
 */
module.exports.perform = (refname, oldrev, newrev) => {
  return git.catFile(['blob', `${newrev}:.gitlab-ci.yml`]).then((contents) => {
    const gitlabCiFile = yaml.parse(contents);
    for (const [key] of Object.entries(gitlabCiFile)) {
      if (gitlabCiFile[key]['tags'] && gitlabCiFile[key]['tags'].includes('production')) {
        if (!gitlabCiFile[key]['only'] || gitlabCiFile[key]['only'].length > 1 || gitlabCiFile[key]['only'][0] !== 'production') {
          throw new Error('Only the production branch can target the production Gitlab runner.');
        }
      }
    }
    return true;
  });
};
