import { IPowerBiService } from '@/modules/power-bi/domain'
import { EmbedToken } from '@/modules/power-bi/domain/entity'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as msal from '@azure/msal-node'

type Input = {
  clientId: string
  clientSecret: string
  authority: string
  scopeBase: string
  scopeManagement: string
  azureSubscriptionId: string
  resourceGroupName: string
  capacityName: string
}

@Injectable()
export class PowerBiService implements IPowerBiService {
  private readonly configs: Input

  constructor() {
    const configService = new ConfigService()

    this.configs = {
      clientId: configService.get('POWERBI_CLIENT_ID'),
      clientSecret: configService.get('POWERBI_CLIENT_SECRET'),
      authority: configService.get('POWERBI_AUTHORITY_URL'),
      scopeBase: configService.get('POWERBI_SCOPE_BASE'),
      scopeManagement: configService.get('POWERBI_SCOPE_MANAGEMENT'),
      azureSubscriptionId: configService.get('AZURE_SUBSCRIPTION_ID'),
      resourceGroupName: configService.get('POWERBI_RESOURCE_NAME'),
      capacityName: configService.get('POWERBI_CAPACITY_NAME'),
    }
  }

  async authenticateOnAzureApp(scope: string): Promise<string | null> {
    const clientApplication = new msal.ConfidentialClientApplication({
      auth: {
        clientId: this.configs.clientId,
        authority: this.configs.authority,
        clientSecret: this.configs.clientSecret,
      },
    })

    const clientCredentialRequest = {
      scopes: [scope],
    }

    const token = await clientApplication.acquireTokenByClientCredential(
      clientCredentialRequest,
    )

    if (token) {
      return token.accessToken
    }

    return null
  }

  async getRequestHeader(scope: string = this.configs.scopeBase) {
    const token = await this.authenticateOnAzureApp(scope)

    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }

  async getEmbedToken({
    workspaceId,
    reportId,
  }: IPowerBiService.GetEmbedTokenInput): Promise<IPowerBiService.GetEmbedTokenOutput> {
    const reportInGroupApi = `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}`
    const headers = await this.getRequestHeader()

    const result = await fetch(reportInGroupApi, {
      method: 'GET',
      headers: headers,
    })

    if (!result.ok) {
      return null
    }

    const resultJson = await result.json()

    const datasetIds = [resultJson.datasetId]

    const params = {
      reports: [{ id: reportId }],
      datasets: [],
      targetWorkspaces: [{ id: workspaceId }],
    }

    for (const datasetId of datasetIds) {
      params['datasets'].push({ id: datasetId })
    }

    const embedTokenApi = 'https://api.powerbi.com/v1.0/myorg/GenerateToken'

    const gTokenResult = await fetch(embedTokenApi, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params),
    })

    if (!gTokenResult.ok) {
      return null
    }

    const gTokenResultJson = (await gTokenResult.json()) as any

    return new EmbedToken(
      gTokenResultJson.token,
      resultJson.name,
      resultJson.embedUrl,
      gTokenResultJson.expiration,
    )
  }

  async isCapacitySuspended(): Promise<boolean> {
    const { azureSubscriptionId, resourceGroupName, capacityName } =
      this.configs

    const capacityDetailsApi = `https://management.azure.com/subscriptions/${azureSubscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/${capacityName}?api-version=2021-01-01`

    const headers = await this.getRequestHeader(this.configs.scopeManagement)

    const result = await fetch(capacityDetailsApi, {
      method: 'GET',
      headers: headers,
    })

    const resultJson = await result.json()

    return resultJson.properties.state === 'Paused'
  }

  async suspendCapacity(): Promise<boolean> {
    const { azureSubscriptionId, resourceGroupName, capacityName } =
      this.configs

    const suspendCapacityApi = `https://management.azure.com/subscriptions/${azureSubscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/${capacityName}/suspend?api-version=2021-01-01`

    const headers = await this.getRequestHeader(this.configs.scopeManagement)

    const result = await fetch(suspendCapacityApi, {
      method: 'POST',
      headers: headers,
    })

    return result.ok
  }

  async resumeCapacity(): Promise<boolean> {
    const { azureSubscriptionId, resourceGroupName, capacityName } =
      this.configs

    const resumeCapacityApi = `https://management.azure.com/subscriptions/${azureSubscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/${capacityName}/resume?api-version=2021-01-01`

    const headers = await this.getRequestHeader(this.configs.scopeManagement)

    await fetch(resumeCapacityApi, {
      method: 'POST',
      headers: headers,
    })

    return await this.isCapacitySuspended()
  }
}
