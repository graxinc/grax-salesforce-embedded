# Packaging

Install `sfdx` CLI:

```
$ npm install sfdx-cli --global
$ sfdx --version
sfdx-cli/7.176.1 darwin-x64 node-v16.10.0
```

Log into an SFDC org, and go to Setup -> Quick Find "Dev Hub" and:

- Enable Dev Hub
- Enable Unlocked Packages and Second-Generation Managed Packages

Connect the `sfdx` CLI with this org and give it the `DevHub alias:

```
$ sfdx auth:web:login -d -a DevHub
Successfully authorized foo+dev@example.com with org ID 00D46000001EXAMPLE

% sfdx force:org:list             
=== Orgs

     ALIAS  USERNAME            ORG ID             CONNECTED STATUS 
 ─── ────── ─────────────────── ────────────────── ──────────────── 
 (D) DevHub foo+dev@example.com 00D46000001EXAMPLE Connected   
```

Create a package and version:

```bash
$ sfdx force:package:beta:create -d "foo dev" -n grax-salesforce-embedded -t Unlocked -r force-app

$ sfdx force:package:beta:list

 Namespace Prefix Name                     Id                 Alias                    Description Type     
 ──────────────── ──────────────────────── ────────────────── ──────────────────────── ─────────── ──────── 
                  grax-salesforce-embedded 0Ho5e000000GnJvCAK grax-salesforce-embedded             Unlocked 

$ sfdx force:package:version:create -d force-app -p grax-salesforce-embedded -v DevHub --wait 10 -x
```
