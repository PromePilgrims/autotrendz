import path from 'path'

export function assetsPath(): string {
  return `${path.dirname(require.main.filename)}/assets`
}
