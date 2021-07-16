// Make sure "http://localhost:5000" is in your applications redirect URIs!
var loginRequest = new LoginRequest(
  new Uri("http://localhost:5000"),
  "ClientId",
  LoginRequest.ResponseType.Code
)
{
  Scope = new[] { Scopes.PlaylistReadPrivate, Scopes.PlaylistReadCollaborative }
};
var uri = loginRequest.ToUri();
// Redirect user to uri via your favorite web-server
