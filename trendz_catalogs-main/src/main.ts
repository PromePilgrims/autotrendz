import 'reflect-metadata'

import os from 'os'
import fs from 'fs'

import * as dotenv from 'dotenv'
dotenv.config()

import { getCatalogs } from './external/baixecatalogo'
import { unzipFile, downloadFile, extractDbs, saveMetadata } from './services'

async function bootstrap() {
  const catalogs = await getCatalogs()

  const catalogsWithAndroidApp = catalogs.filter(catalog => catalog.plataformas.some(plataforma => plataforma.ENUM_CODIGO_PLATAFORMA == 3))

  for (const catalog of catalogsWithAndroidApp) {
    const packageName = new URL(catalog.plataformas.find(plataforma => plataforma.ENUM_CODIGO_PLATAFORMA == 3)!.url_catalogo)
      .searchParams
      .get('id')
    const apkPureURL = `https://d.apkpure.net/b/APK/${packageName}?version=latest`
    const fileName = os.tmpdir() + '/temp_app.zip'
    const destinationPath = os.tmpdir() + '/app'
    const destinationDbFolder = `databases/${catalog.nome}`

    if (fs.existsSync(destinationDbFolder)) continue

    await downloadFile(fileName, apkPureURL)
    await unzipFile(fileName, destinationPath)
    await extractDbs(destinationPath, destinationDbFolder)
    await saveMetadata({ ...catalog, extract_date: new Date().toISOString() }, destinationDbFolder)
  }
}

bootstrap()
