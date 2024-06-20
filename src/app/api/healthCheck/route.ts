
export async function GET(request: Request) {
  return new Response(JSON.stringify({
    message: 'Test health check for port 3030 Flowcraft'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}; 