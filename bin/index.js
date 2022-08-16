#!/usr/bin/env node --harmony

"use strict";
process.env.NODE_PATH = __dirname + "/../node_modules/";

const {program} = require("commander");
// console.log(process.argv);
program
    .version(require("../package.json").version)
    .command("create <projectName>")
    // .option("--remote", "clone remote git project")
    // .description("create a new project, the options [--remote] is clone git")
    .action((projectName, cmd) => require("../command/create")(projectName, cmd));

program.parse(process.argv);

if (!program.args.length)
    program.help()