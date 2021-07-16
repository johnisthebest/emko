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

// This method should be called from your web-server when the user visits "http://localhost:5000"
public Task GetCallback(string code)
{
  var response = await new OAuthClient().RequestToken(
    new AuthorizationCodeTokenRequest("ClientId", "ClientSecret", code, "http://localhost:5000")
  );

  var spotify = new SpotifyClient(response.AccessToken);
  // Also important for later: response.RefreshToken
}

var newResponse = await new OAuthClient().RequestToken(
  new AuthorizationCodeRefreshRequest("ClientId", "ClientSecret", response.RefreshToken)
);

var spotify = new SpotifyClient(newResponse.AccessToken);
