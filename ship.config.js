const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const packages = JSON.parse(
  shell.exec('yarn run --silent lerna list --toposort --json', {
    silent: true,
  })
);
const cwd = process.cwd();

module.exports = {
  monorepo: {
    mainVersionFile: 'lerna.json',
    // We rely on Lerna to bump our dependencies.
    packagesToBump: [],
    packagesToPublish: packages.map(({ location }) =>
      location.replace(`${cwd}/`, '')
    ),
  },
  versionUpdated: ({ version, exec, dir }) => {
    // Update version in `react-instantsearch-core`
    fs.writeFileSync(
      path.resolve(
        dir,
        'packages',
        'react-instantsearch-core',
        'src',
        'core',
        'version.js'
      ),
      `export default '${version}';\n`
    );
    // Update version in `react-instantsearch-hooks`
    fs.writeFileSync(
      path.resolve(
        dir,
        'packages',
        'react-instantsearch-hooks',
        'src',
        'version.ts'
      ),
      `export default '${version}';\n`
    );

    // Update version in packages and dependencies
    exec(
      `yarn lerna version ${version} --exact --no-git-tag-version --no-push --yes`
    );

    // Update peerDependency in `react-instantsearch-dom-maps`
    const file = path.resolve(
      dir,
      'packages',
      'react-instantsearch-dom-maps',
      'package.json'
    );
    const package = require(file);
    package.peerDependencies['react-instantsearch-dom'] = `${version}`;
    fs.writeFileSync(file, JSON.stringify(package, null, 2));
  },
  shouldPrepare: ({ releaseType, commitNumbersPerType }) => {
    const { fix = 0 } = commitNumbersPerType;
    if (releaseType === 'patch' && fix === 0) {
      return false;
    }
    return true;
  },
  pullRequestTeamReviewers: ['frontend-experiences-web'],
  buildCommand: ({ version }) =>
    `NODE_ENV=production VERSION=${version} yarn build`,
  slack: {
    // disable slack notification for `prepared` lifecycle.
    // Ship.js will send slack message only for `releaseSuccess`.
    prepared: null,
    releaseSuccess: ({
      version,
      tagName,
      latestCommitHash,
      latestCommitUrl,
      repoURL,
    }) => ({
      pretext: [
        `:tada: Successfully released *React InstantSearch v${version}*`,
        '',
        `Make sure to run \`yarn run release-templates\` in \`create-instantsearch-app\`.`,
      ].join('\n'),
      fields: [
        {
          title: 'Branch',
          value: 'master',
          short: true,
        },
        {
          title: 'Commit',
          value: `*<${latestCommitUrl}|${latestCommitHash}>*`,
          short: true,
        },
        {
          title: 'Version',
          value: version,
          short: true,
        },
        {
          title: 'Release',
          value: `${repoURL}/releases/tag/${tagName}`,
        },
      ],
    }),
  },
};
