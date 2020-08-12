var assert = require('assert');
var parser = require('../lib/parser');

describe('parseAuditData', function () {
    const data = {
        actions: [
          {
            isMajor: true,
            action: 'install',
            resolves: [Array],
            module: 'sequelize',
            target: '6.3.4'
          },
          {
            isMajor: true,
            action: 'install',
            resolves: [Array],
            module: 'sequelize-cli',
            target: '6.2.0'
          },
          {
            isMajor: true,
            action: 'install',
            resolves: [Array],
            module: 'csv-parse',
            target: '4.12.0'
          },
          {
            isMajor: true,
            action: 'install',
            resolves: [Array],
            module: 'nodemon',
            target: '2.0.4'
          },
          { action: 'review', module: 'minimist', resolves: [Array] }
        ],
        advisories: {
          '820': {
            findings: [Array],
            id: 820,
            created: '2019-04-18T18:04:28.613Z',
            updated: '2019-04-18T18:05:23.009Z',
            deleted: null,
            title: 'NoSQL Injection',
            found_by: [Object],
            reported_by: [Object],
            module_name: 'sequelize',
            cves: [],
            vulnerable_versions: '<4.12.0',
            patched_versions: '>=4.12.0',
            overview: 'Versions of `sequelize` prior to 4.12.0 are vulnerable to NoSQL Injection. Query operators such as `$gt` are not properly sanitized and may allow an attacker to alter data queries, leading to NoSQL Injection.',
            recommendation: 'Upgrade to version 4.12.0 or later',
            references: '- [GitHub Issue](https://github.com/sequelize/sequelize/issues/7310)\n' +
              '- [Snyk Report](https://snyk.io/vuln/SNYK-JS-SEQUELIZE-174147)',
            access: 'public',
            severity: 'high',
            cwe: 'CWE-943',
            metadata: [Object],
            url: 'https://npmjs.com/advisories/820'
          },
          '825': {
            findings: [Array],
            id: 825,
            created: '2019-04-19T21:51:17.199Z',
            updated: '2019-06-11T12:47:27.984Z',
            deleted: null,
            title: 'Sensitive Data Exposure',
            found_by: [Object],
            reported_by: [Object],
            module_name: 'sequelize-cli',
            cves: [],
            vulnerable_versions: '<5.5.0',
            patched_versions: '>=5.5.0',
            overview: 'Versions of `sequelize-cli` prior to 5.5.0 are vulnerable to Sensitive Data Exposure. The function `filteredURL()` does not properly sanitize the `config.password` value which may cause passwords with special characters to be logged in plain text.',
            recommendation: 'Upgrade to version 5.5.0 or later.',
            references: '- [GitHub Issue](https://github.com/sequelize/cli/issues/172)\n' +
              '- [Snyk Report](https://snyk.io/vuln/SNYK-JS-SEQUELIZECLI-174320)',
            access: 'public',
            severity: 'low',
            cwe: 'CWE-532',
            metadata: [Object],
            url: 'https://npmjs.com/advisories/825'
          },
          '1084': {
            findings: [Array],
            id: 1084,
            created: '2019-07-18T21:30:31.935Z',
            updated: '2019-11-19T23:31:37.349Z',
            deleted: null,
            title: 'Denial of Service',
            found_by: [Object],
            reported_by: [Object],
            module_name: 'mem',
            cves: [],
            vulnerable_versions: '<4.0.0',
            patched_versions: '>=4.0.0',
            overview: "Versions of `mem` prior to 4.0.0 are vulnerable to Denial of Service (DoS).  The package fails to remove old values from the cache even after a value passes its `maxAge` property. This may allow attackers to exhaust the system's memory if they are able to abuse the application logging.",
            recommendation: 'Upgrade to version 4.0.0 or later.',
            references: '- [Snyk Report](https://snyk.io/vuln/npm:mem:20180117)',
            access: 'public',
            severity: 'low',
            cwe: 'CWE-400',
            metadata: [Object],
            url: 'https://npmjs.com/advisories/1084'
          },
          '1142': {
            findings: [Array],
            id: 1142,
            created: '2019-09-03T18:21:01.415Z',
            updated: '2020-03-04T14:34:44.906Z',
            deleted: null,
            title: 'Denial of Service',
            found_by: [Object],
            reported_by: [Object],
            module_name: 'sequelize',
            cves: [],
            vulnerable_versions: '<4.44.4',
            patched_versions: '>=4.44.4',
            overview: 'Versions of `sequelize` prior to 4.44.4 are vulnerable to Denial of Service (DoS). The SQLite dialect fails to catch a `TypeError` exception for the `results` variable. The `results` value may be undefined and trigger the error on a `.map` call. This may allow attackers to submit malicious input that forces the exception and crashes the Node process.  \n' +
              '\n' +
              'The following proof-of-concept crashes the Node process:  \n' +
              '```\n' +
              "const Sequelize = require('sequelize');\n" +
              '\n' +
              'const sequelize = new Sequelize({\n' +
              "\tdialect: 'sqlite',\n" +
              "\tstorage: 'database.sqlite'\n" +
              '});\n' +
              '\n' +
              "const TypeError = sequelize.define('TypeError', {\n" +
              '\tname: Sequelize.STRING,\n' +
              '});\n' +
              '\n' +
              'TypeError.sync({force: true}).then(() => {\n' +
              '\treturn TypeError.create({name: "SELECT tbl_name FROM sqlite_master"});\n' +
              '});\n' +
              '```',
            recommendation: 'Upgrade to version 4.44.4 or later.',
            references: '- [GitHub PR](https://github.com/sequelize/sequelize/pull/11877)',
            access: 'public',
            severity: 'moderate',
            cwe: 'CWE-400',
            metadata: [Object],
            url: 'https://npmjs.com/advisories/1142'
          },
          '1146': {
            findings: [Array],
            id: 1146,
            created: '2019-09-05T20:26:35.108Z',
            updated: '2019-09-17T20:35:44.588Z',
            deleted: null,
            title: 'SQL Injection',
            found_by: [Object],
            reported_by: [Object],
            module_name: 'sequelize',
            cves: [Array],
            vulnerable_versions: '<4.44.3 || >=5.0.0 <5.15.1',
            patched_versions: '>=4.44.3 <5.0.0 || >=5.15.1',
            overview: 'Affected versions of `sequelize` are vulnerable to SQL Injection. The function `sequelize.json()` incorrectly formatted sub paths for JSON queries, which allows attackers to inject SQL statements and execute arbitrary SQL queries if user input is passed to the query.  Exploitation example:  \n' +
              '```return User.findAll({\n' +
              `  where: this.sequelize.json("data.id')) AS DECIMAL) = 1 DELETE YOLO INJECTIONS; -- ", 1)\n` +
              '});```',
            recommendation: 'If you are using `sequelize` 5.x, upgrade to version 5.15.1 or later.\n' +
              'If you are using `sequelize` 4.x, upgrade to version 4.44.3 or later.',
            references: '- [GitHub PR](https://github.com/sequelize/sequelize/pull/11329)\n' +
              '- [Snyk Report](https://snyk.io/vuln/SNYK-JS-SEQUELIZE-459751)',
            access: 'public',
            severity: 'high',
            cwe: 'CWE-89',
            metadata: [Object],
            url: 'https://npmjs.com/advisories/1146'
          },
          '1171': {
            findings: [Array],
            id: 1171,
            created: '2019-09-17T18:16:39.112Z',
            updated: '2019-10-15T17:33:24.244Z',
            deleted: null,
            title: 'Regular Expression Denial of Service',
            found_by: [Object],
            reported_by: [Object],
            module_name: 'csv-parse',
            cves: [Array],
            vulnerable_versions: '<4.4.6',
            patched_versions: '>=4.4.6',
            overview: 'Versions of `csv-parse` prior to 4.4.6 are vulnerable to Regular Expression Denial of Service. The `__isInt()` function contains a malformed regular expression that processes large specially-crafted input very slowly, leading to a Denial of Service. This is triggered when using the `cast` option.',
            recommendation: 'Upgrade to version 4.4.6 or later.',
            references: '',
            access: 'public',
            severity: 'high',
            cwe: 'CWE-400',
            metadata: [Object],
            url: 'https://npmjs.com/advisories/1171'
          },
          '1179': {
            findings: [Array],
            id: 1179,
            created: '2019-09-23T15:01:43.049Z',
            updated: '2020-03-18T19:41:45.921Z',
            deleted: null,
            title: 'Prototype Pollution',
            found_by: [Object],
            reported_by: [Object],
            module_name: 'minimist',
            cves: [],
            vulnerable_versions: '<0.2.1 || >=1.0.0 <1.2.3',
            patched_versions: '>=0.2.1 <1.0.0 || >=1.2.3',
            overview: 'Affected versions of `minimist` are vulnerable to prototype pollution. Arguments are not properly sanitized, allowing an attacker to modify the prototype of `Object`, causing the addition or modification of an existing property that will exist on all objects.  \n' +
              'Parsing the argument `--__proto__.y=Polluted` adds a `y` property with value `Polluted` to all objects. The argument `--__proto__=Polluted` raises and uncaught error and crashes the application.  \n' +
              'This is exploitable if attackers have control over the arguments being passed to `minimist`.\n',
            recommendation: 'Upgrade to versions 0.2.1, 1.2.3 or later.',
            references: '- [GitHub commit 1](https://github.com/substack/minimist/commit/4cf1354839cb972e38496d35e12f806eea92c11f#diff-a1e0ee62c91705696ddb71aa30ad4f95)\n' +
              '- [GitHub commit 2](https://github.com/substack/minimist/commit/63e7ed05aa4b1889ec2f3b196426db4500cbda94)',
            access: 'public',
            severity: 'low',
            cwe: 'CWE-471',
            metadata: [Object],
            url: 'https://npmjs.com/advisories/1179'
          },
          '1213': {
            findings: [Array],
            id: 1213,
            created: '2019-10-14T17:43:55.291Z',
            updated: '2020-07-29T20:58:02.206Z',
            deleted: null,
            title: 'Prototype Pollution',
            found_by: [Object],
            reported_by: [Object],
            module_name: 'dot-prop',
            cves: [Array],
            vulnerable_versions: '<5.1.1',
            patched_versions: '>=5.1.1',
            overview: "Versions of `dot-prop` before 5.1.1 are vulnerable to prototype pollution. The function `set` does not restrict the modification of an Object's prototype, which may allow an attacker to add or modify an existing property that will exist on all objects.\n" +
              '\n',
            recommendation: 'Upgrade to version 5.1.1 or later.',
            references: '- [GitHub advisory](https://github.com/advisories/GHSA-ff7x-qrg7-qggm)\n' +
              '- [CVE](https://nvd.nist.gov/vuln/detail/CVE-2020-8116)',
            access: 'public',
            severity: 'high',
            cwe: 'CWE-471',
            metadata: [Object],
            url: 'https://npmjs.com/advisories/1213'
          },
          '1500': {
            findings: [Array],
            id: 1500,
            created: '2020-03-26T19:21:50.174Z',
            updated: '2020-05-01T01:05:15.020Z',
            deleted: null,
            title: 'Prototype Pollution',
            found_by: [Object],
            reported_by: [Object],
            module_name: 'yargs-parser',
            cves: [],
            vulnerable_versions: '<13.1.2 || >=14.0.0 <15.0.1 || >=16.0.0 <18.1.2',
            patched_versions: '>=13.1.2 <14.0.0 || >=15.0.1 <16.0.0 || >=18.1.2',
            overview: 'Affected versions of `yargs-parser` are vulnerable to prototype pollution. Arguments are not properly sanitized, allowing an attacker to modify the prototype of `Object`, causing the addition or modification of an existing property that will exist on all objects.  \n' +
              "Parsing the argument `--foo.__proto__.bar baz'` adds a `bar` property with value `baz` to all objects. This is only exploitable if attackers have control over the arguments being passed to `yargs-parser`.\n",
            recommendation: 'Upgrade to versions 13.1.2, 15.0.1, 18.1.1 or later.',
            references: '- [Snyk Report](https://snyk.io/vuln/SNYK-JS-YARGSPARSER-560381)',
            access: 'public',
            severity: 'low',
            cwe: 'CWE-471',
            metadata: [Object],
            url: 'https://npmjs.com/advisories/1500'
          }
        },
        muted: [],
        metadata: {
          vulnerabilities: { info: 0, low: 4, moderate: 1, high: 4, critical: 0 },
          dependencies: 354,
          devDependencies: 30,
          optionalDependencies: 5,
          totalDependencies: 388
        },
        runId: '78a9a807-f651-4b30-a27d-12ca005c361b'
      };      

    const parsed = parser.parseAuditData(data);
    const correctParsed = [
        {
          cves: [],
          cwe: 'CWE-943',
          title: 'NoSQL Injection',
          severity: 'high',
          overview: 'Versions of `sequelize` prior to 4.12.0 are vulnerable to NoSQL Injection. Query operators such as `$gt` are not properly sanitized and may allow an attacker to alter data queries, leading to NoSQL Injection.',
          recommendation: 'Upgrade to version 4.12.0 or later',
          references: '- [GitHub Issue](https://github.com/sequelize/sequelize/issues/7310)\n' +
            '- [Snyk Report](https://snyk.io/vuln/SNYK-JS-SEQUELIZE-174147)',
          module_name: 'sequelize',
          vulnerable_versions: '<4.12.0',
          patched_versions: '>=4.12.0'
        },
        {
          cves: [],
          cwe: 'CWE-532',
          title: 'Sensitive Data Exposure',
          severity: 'low',
          overview: 'Versions of `sequelize-cli` prior to 5.5.0 are vulnerable to Sensitive Data Exposure. The function `filteredURL()` does not properly sanitize the `config.password` value which may cause passwords with special characters to be logged in plain text.',
          recommendation: 'Upgrade to version 5.5.0 or later.',
          references: '- [GitHub Issue](https://github.com/sequelize/cli/issues/172)\n' +
            '- [Snyk Report](https://snyk.io/vuln/SNYK-JS-SEQUELIZECLI-174320)',
          module_name: 'sequelize-cli',
          vulnerable_versions: '<5.5.0',
          patched_versions: '>=5.5.0'
        },
        {
          cves: [],
          cwe: 'CWE-400',
          title: 'Denial of Service',
          severity: 'low',
          overview: "Versions of `mem` prior to 4.0.0 are vulnerable to Denial of Service (DoS).  The package fails to remove old values from the cache even after a value passes its `maxAge` property. This may allow attackers to exhaust the system's memory if they are able to abuse the application logging.",
          recommendation: 'Upgrade to version 4.0.0 or later.',
          references: '- [Snyk Report](https://snyk.io/vuln/npm:mem:20180117)',
          module_name: 'mem',
          vulnerable_versions: '<4.0.0',
          patched_versions: '>=4.0.0'
        },
        {
          cves: [],
          cwe: 'CWE-400',
          title: 'Denial of Service',
          severity: 'moderate',
          overview: 'Versions of `sequelize` prior to 4.44.4 are vulnerable to Denial of Service (DoS). The SQLite dialect fails to catch a `TypeError` exception for the `results` variable. The `results` value may be undefined and trigger the error on a `.map` call. This may allow attackers to submit malicious input that forces the exception and crashes the Node process.  \n' +
            '\n' +
            'The following proof-of-concept crashes the Node process:  \n' +
            '```\n' +
            "const Sequelize = require('sequelize');\n" +
            '\n' +
            'const sequelize = new Sequelize({\n' +
            "\tdialect: 'sqlite',\n" +
            "\tstorage: 'database.sqlite'\n" +
            '});\n' +
            '\n' +
            "const TypeError = sequelize.define('TypeError', {\n" +
            '\tname: Sequelize.STRING,\n' +
            '});\n' +
            '\n' +
            'TypeError.sync({force: true}).then(() => {\n' +
            '\treturn TypeError.create({name: "SELECT tbl_name FROM sqlite_master"});\n' +
            '});\n' +
            '```',
          recommendation: 'Upgrade to version 4.44.4 or later.',
          references: '- [GitHub PR](https://github.com/sequelize/sequelize/pull/11877)',
          module_name: 'sequelize',
          vulnerable_versions: '<4.44.4',
          patched_versions: '>=4.44.4'
        },
        {
          cves: [ 'CVE-2019-10752' ],
          cwe: 'CWE-89',
          title: 'SQL Injection',
          severity: 'high',
          overview: 'Affected versions of `sequelize` are vulnerable to SQL Injection. The function `sequelize.json()` incorrectly formatted sub paths for JSON queries, which allows attackers to inject SQL statements and execute arbitrary SQL queries if user input is passed to the query.  Exploitation example:  \n' +
            '```return User.findAll({\n' +
            `  where: this.sequelize.json("data.id')) AS DECIMAL) = 1 DELETE YOLO INJECTIONS; -- ", 1)\n` +
            '});```',
          recommendation: 'If you are using `sequelize` 5.x, upgrade to version 5.15.1 or later.\n' +
            'If you are using `sequelize` 4.x, upgrade to version 4.44.3 or later.',
          references: '- [GitHub PR](https://github.com/sequelize/sequelize/pull/11329)\n' +
            '- [Snyk Report](https://snyk.io/vuln/SNYK-JS-SEQUELIZE-459751)',
          module_name: 'sequelize',
          vulnerable_versions: '<4.44.3 || >=5.0.0 <5.15.1',
          patched_versions: '>=4.44.3 <5.0.0 || >=5.15.1'
        },
        {
          cves: [ 'CVE-2019-17592' ],
          cwe: 'CWE-400',
          title: 'Regular Expression Denial of Service',
          severity: 'high',
          overview: 'Versions of `csv-parse` prior to 4.4.6 are vulnerable to Regular Expression Denial of Service. The `__isInt()` function contains a malformed regular expression that processes large specially-crafted input very slowly, leading to a Denial of Service. This is triggered when using the `cast` option.',
          recommendation: 'Upgrade to version 4.4.6 or later.',
          references: '',
          module_name: 'csv-parse',
          vulnerable_versions: '<4.4.6',
          patched_versions: '>=4.4.6'
        },
        {
          cves: [],
          cwe: 'CWE-471',
          title: 'Prototype Pollution',
          severity: 'low',
          overview: 'Affected versions of `minimist` are vulnerable to prototype pollution. Arguments are not properly sanitized, allowing an attacker to modify the prototype of `Object`, causing the addition or modification of an existing property that will exist on all objects.  \n' +
            'Parsing the argument `--__proto__.y=Polluted` adds a `y` property with value `Polluted` to all objects. The argument `--__proto__=Polluted` raises and uncaught error and crashes the application.  \n' +
            'This is exploitable if attackers have control over the arguments being passed to `minimist`.\n',
          recommendation: 'Upgrade to versions 0.2.1, 1.2.3 or later.',
          references: '- [GitHub commit 1](https://github.com/substack/minimist/commit/4cf1354839cb972e38496d35e12f806eea92c11f#diff-a1e0ee62c91705696ddb71aa30ad4f95)\n' +
            '- [GitHub commit 2](https://github.com/substack/minimist/commit/63e7ed05aa4b1889ec2f3b196426db4500cbda94)',
          module_name: 'minimist',
          vulnerable_versions: '<0.2.1 || >=1.0.0 <1.2.3',
          patched_versions: '>=0.2.1 <1.0.0 || >=1.2.3'
        },
        {
          cves: [ 'CVE-2020-8116' ],
          cwe: 'CWE-471',
          title: 'Prototype Pollution',
          severity: 'high',
          overview: "Versions of `dot-prop` before 5.1.1 are vulnerable to prototype pollution. The function `set` does not restrict the modification of an Object's prototype, which may allow an attacker to add or modify an existing property that will exist on all objects.\n" +
            '\n',
          recommendation: 'Upgrade to version 5.1.1 or later.',
          references: '- [GitHub advisory](https://github.com/advisories/GHSA-ff7x-qrg7-qggm)\n' +
            '- [CVE](https://nvd.nist.gov/vuln/detail/CVE-2020-8116)',
          module_name: 'dot-prop',
          vulnerable_versions: '<5.1.1',
          patched_versions: '>=5.1.1'
        },
        {
          cves: [],
          cwe: 'CWE-471',
          title: 'Prototype Pollution',
          severity: 'low',
          overview: 'Affected versions of `yargs-parser` are vulnerable to prototype pollution. Arguments are not properly sanitized, allowing an attacker to modify the prototype of `Object`, causing the addition or modification of an existing property that will exist on all objects.  \n' +
            "Parsing the argument `--foo.__proto__.bar baz'` adds a `bar` property with value `baz` to all objects. This is only exploitable if attackers have control over the arguments being passed to `yargs-parser`.\n",
          recommendation: 'Upgrade to versions 13.1.2, 15.0.1, 18.1.1 or later.',
          references: '- [Snyk Report](https://snyk.io/vuln/SNYK-JS-YARGSPARSER-560381)',
          module_name: 'yargs-parser',
          vulnerable_versions: '<13.1.2 || >=14.0.0 <15.0.1 || >=16.0.0 <18.1.2',
          patched_versions: '>=13.1.2 <14.0.0 || >=15.0.1 <16.0.0 || >=18.1.2'
        }
      ];      

    it('CWE Parser', function () {
        assert(parsed.cwe === correctParsed.cwe);
    });
    it('Title Parser', function () {
        assert(parsed.title === correctParsed.title);
    });
    it('Severity Parser', function () {
        assert(parsed.severity === correctParsed.severity);
    });
    it('overview Parser', function () {
        assert(parsed.overview === correctParsed.overview);
    });
    it('Recomendation Parser', function () {
        assert(parsed.recommendation === correctParsed.recommendation);
    });
    it('Vulnerable Version Parser', function () {
        assert(parsed.vulnerable_versions === correctParsed.vulnerable_versions);
    });
});
