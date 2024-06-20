
export async function GET(request: Request) {
  return new Response(JSON.stringify({
    message: 'Test health check for port 3008 CMUI'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}; 