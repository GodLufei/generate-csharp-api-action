import * as core from '@actions/core'
import * as github from '@actions/github'
import * as io from '@actions/io'
import * as path from "path"
import * as fs from "fs"
import { wait } from './wait'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const token: string = core.getInput('token')
    const source: string = core.getInput('source')
    generateRefitCode(token, source);
    core.setOutput('state', 0)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

const generateRefitCode = (token: string, source: string) => {
  if (!token)
    return core.setFailed('token must be set');

  const sourcePath: string = path.join(process.env.GITHUB_WORKSPACE ?? __dirname, source);
  core.debug(`scanning the path ${sourcePath}`);

  fs.readdirSync(sourcePath).forEach(file => {
    core.debug(file);
  });

};
