import { inspectAsync, readAsync, writeAsync } from "fs-jetpack"

type ErrorJSON = {
  url: string,
  error: any,
  timestamp: string,
}

async function save(path: string, url: string, data: any) {
  const urlObject = new URL(url)
  const nextUrl = urlObject.pathname
    .replace(/\//g, '_')
    .replace(/\./g, '_')
    .replace(/&/g, '_')
    .replace(/=/g, '_')
    .replace(/%/g, '_')

  await writeAsync(`${path}/${nextUrl}.json`, data)
}

async function getUrl(url: string) {
  const urlObject = new URL(url)
  const nextUrl = urlObject.pathname
    .replace(/\//g, '_')
    .replace(/\./g, '_')
    .replace(/&/g, '_')
    .replace(/=/g, '_')
    .replace(/%/g, '_')

  return readAsync(`./tmp/json/${nextUrl}.json`, 'json')
}

async function saveError(url: string, error: any) {
  const currentErrors = (
    (await readAsync('./tmp/errors.json', 'json') || []) as ErrorJSON[]
  ).filter((item) => item.url !== url);

  currentErrors.push({ 
    url,
    error,
    timestamp: new Date().toISOString()
  });

  await writeAsync('./tmp/errors.json', currentErrors, { jsonIndent: 2 });
}

export const storage = {
  save,
  saveError,
  get: getUrl,
}