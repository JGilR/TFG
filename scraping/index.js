import identity from 'oci-identity'
import common from 'oci-common'

// Imports for writting a JSON file
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

// Using DEFAULT credentials of OCI
const provider = new common.ConfigFileAuthenticationDetailsProvider()

// Get Tenancy ID
const tenancyId = provider.getTenantId()

const info = {
  Compartments: []
}

const client = new identity.IdentityClient({
  authenticationDetailsProvider: provider
})

// Get all information about traffic
async function getCloudInfo () {
  // List all Compartments inside root
  const listCompartmentsRequest = { compartmentId: tenancyId }
  const listCompartmentsResponse = await client.listCompartments(listCompartmentsRequest)

  info.Compartments = listCompartmentsResponse.items
  console.log(info)
  return info
}

const cloudInfo = await getCloudInfo()

// Copying the response inside a JSON File
const filePath = path.join(process.cwd(), './db/info.json')
await writeFile(filePath, JSON.stringify(cloudInfo, null, 2), 'utf-8')
