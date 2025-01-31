import fs from 'fs'

export async function saveMetadata(metadata: Record<string, any>, destination: string): Promise<void> {
  fs.writeFileSync(destination + '/metadata.json', JSON.stringify(metadata))
}
