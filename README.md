# Cloudlare KV Fetch wrapper
# Usage
    const kv = new KV({
        namespace: 'your-kv-namespace-id',
        accountId: 'your-account-id',
        token: 'your-api-token'
    });

  ## Fetch Key
  await kv.get("foo");

  ## Put Key
  await kv.put('foo', 'bar');

  ## Delete Key
  await kv.delete('foo')
