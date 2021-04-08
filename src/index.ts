import * as chalk from "chalk";
import * as inquirer from "inquirer";

// Provide correct source map support for the transpiled TS
import "source-map-support/register";

(async (): Promise<void> => {
  console.log(chalk.green("Project generator\n"));
  const { projectName } = await inquirer.prompt([
    { type: "input", name: "projectName", message: "Project name" },
  ]);
  console.log(projectName);
})();
