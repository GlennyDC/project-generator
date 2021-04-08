import * as dns from "dns";
import * as fs from "fs";

export const dirExists = (dirPath: string): boolean => fs.existsSync(dirPath);

export const createDir = async (
  dirPath: string,
  options = { recursive: true },
): Promise<void> => {
  await fs.promises.mkdir(dirPath, options);
};

export const isOnline = (): Promise<boolean> => {
  return new Promise((resolve) => {
    dns.lookup("registry.yarnpkg.com", (err) => {
      if (err) {
        return resolve(false);
      } else {
        return resolve(true);
      }
    });
  });
};

export const isWriteable = async (dirPath: string): Promise<boolean> => {
  try {
    await fs.promises.access(dirPath, fs.constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
};
