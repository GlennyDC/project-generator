import { execSync } from "child_process";
import * as path from "path";
import * as rimraf from "rimraf";

const gitIsInstalled = (): boolean => {
  try {
    execSync("git --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

const isInGitRepo = (): boolean => {
  try {
    execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

interface GitInitResponse {
  success: boolean;
  message?: string;
}

export const tryGitInit = (projectDir: string): GitInitResponse => {
  if (!gitIsInstalled) {
    return { success: false, message: "GIT is not installed" };
  }

  if (isInGitRepo()) {
    return { success: false, message: "Already in GIT repo" };
  }

  let initSuccessful = false;

  try {
    execSync("git init", { stdio: "ignore" });
    initSuccessful = true;

    execSync("git checkout -b main", { stdio: "ignore" });
    execSync("git add -A", { stdio: "ignore" });
    execSync('git commit -m "Initial commit"', { stdio: "ignore" });

    return { success: true };
  } catch (err) {
    if (initSuccessful) {
      rimraf.sync(path.join(projectDir, ".git"));
    }
    return { success: false, message: err.message };
  }
};
