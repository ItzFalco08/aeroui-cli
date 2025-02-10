#!/usr/bin/env node
const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const { green, bold, italic, underline, gray } = require('kleur');
const ComponentsCode = require('./code'); // Corrected import
const { blue } = require('kleur/colors');
const inquirer = require('inquirer').default; // For interactive selection

const program = new Command();

program
  .command('add <ComponentName>')
  .description('Add a component from AeroUI')
  .action(async (ComponentName) => {
    let baseDir = fs.existsSync(path.join(process.cwd(), 'src')) ? 'src' : process.cwd();
    let componentDir = path.join(baseDir, 'components', 'aeroui');

    // Create component directory recursively
    fs.mkdirSync(componentDir, { recursive: true });

    // Check if component exists
    const componentData = ComponentsCode[ComponentName];
    if (!componentData) {
      console.error(`Error: Component '${ComponentName}' not found.`);
      return;
    }

    // **Ask user to choose between JSX or TSX**
    const { fileType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'fileType',
        message: 'Choose the file type:',
        choices: ['JSX', 'TSX'],
      },
    ]);

    // Determine extension and code
    const ext = fileType.toLowerCase(); // 'jsx' or 'tsx'
    const code = componentData[ext];
    if (!code) {
      console.error(`Error: No ${ext} version for ${ComponentName}.`);
      return;
    }

    // Write file
    const filePath = path.join(componentDir, `${ComponentName}.${ext}`);
    fs.writeFileSync(filePath, code.trim(), 'utf-8');

    console.log(green(bold('\nDone..')));
    console.log(gray(`\nSuccessfully created ` + blue(bold(`${ComponentName}.${ext} `)) + 'in' + underline(` ${componentDir}\n`)));
  });

program.parse();
