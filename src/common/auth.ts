import { OpenFgaClient } from '@openfga/sdk';

const client = new OpenFgaClient({
    storeId:'01JC0TK88KBZ4TF6R85AF13FCH',apiUrl:'http://localhost:8080',authorizationModelId:'01JC37JPKWA2CS6FNNNS2860VK'
});
export async function check(userId: string, objectId: string,objectName:string,relation:string): Promise<boolean> {
    let req={
        user: `users:${userId}`,
        relation: relation,
        object: `${objectName}:${objectId}`,
}
console.log(req)
    
    const response = await client.check(req);
    return response.allowed;
}
