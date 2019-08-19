#!/usr/bin/env node
var program = require('commander');
var json =require('./json.js');

program
  .version('0.1.0')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook');

program
  .command('do <action>')
  .option('-w,--digitalWrite <pin> <status>','do action')
  .option('-r,--digitalRead  <pin> <status>','do')
  .action(function(action,pin,status){
    if(action=="digital"){
      client.write("you set digital pin %s to %s",pin,status);
    }else if(action=="analog"){
      client.write("you set analog pin %s to %s",pin,status);
    }
    else if(action=="start"){
      json.modifyJson(0,0,"true")
      const child_process = require('child_process');
      let subProcess=child_process.exec("startServer",function(err,stdout){
          if(err)console.log(err);
          console.log(stdout);
          json.modifyJson(0,0,"false")
          subProcess.kill()
      });
    }
  });
  
program
  .command('setup [env]')
  .description('run setup commands for all envs')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(env, options){
    var mode = options.setup_mode || "normal";
    env = env || 'all';
    console.log('setup for %s env(s) with %s mode', env, mode);
  });

program
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function(cmd, options){
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  }).on('--help', function() {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ deploy exec sequential');
    console.log('  $ deploy exec async');
  });
  

program
  .command('*')
  .action(function(env){
    console.log('deploying "%s"', env);
  });

program.parse(process.argv);