class KV {

    namespace: string;
    accountId: string;
    token: string;

    constructor({namespace, accountId, token}: {namespace: string, accountId: string, token: string}) {
        this.namespace = namespace;
        this.accountId = accountId;
        this.token = token;
    }
    async get(key: string) {
        return this.core('GET', key);
    }

    async put(key: string, value: string, metadata?: string) {
        const formData = new FormData();
        formData.append("metadata", 
            metadata ? JSON.stringify(metadata) : JSON.stringify({value})
        );
        formData.append('value', value);
        return this.core('PUT', key, formData);
    }

    async delete(key: string) {
        return this.core('DELETE', key);
    }

    async core(requestType: "PUT" | "GET" | "DELETE", valueToFind: string, body?: FormData) {
        const options: RequestInit = {
            method: requestType,
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          };

          const allowedRequestTypesForJSONHeader = [
            'GET',
            'DELETE'
          ];
          if (allowedRequestTypesForJSONHeader.includes(requestType.toUpperCase())) {
            (options.headers as Record<string, string>)['Content-Type'] = 'application/json';
          }
          if (body) {
            options.body = body;
          }

          const request = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/storage/kv/namespaces/${this.namespace}/values/${valueToFind}`,
            options
          );

          if (!request.ok) {
            const response = await request.text();
            throw new Error(JSON.stringify({
                status: request.status,
                message: response,
            }));
          }

          const response = request.text();

          return response;
          
    }

}
