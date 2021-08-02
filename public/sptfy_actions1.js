function sptfy() {

//-------------------------------------------------- Auth (implicit)

        var stateKey = 'spotify_auth_state';

       
        function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }

      
        function generateRandomString(length) {
          var text = '';
          var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

          for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
        };

        var params = getHashParams();

        var access_token = params.access_token,
            state = params.state,
            storedState = localStorage.getItem(stateKey);

         if (access_token && (state == null || state !== storedState)) {
          alert('There was an error during the authentication');
        } else {
          localStorage.removeItem(stateKey);
          if (access_token) {
            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                  'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                  $('#login').hide();
                  $('#loggedin').show();
                }
            });
          } else {
              $('#login').show();
              $('#loggedin').hide();
          }

          document.getElementById('login-button').addEventListener('click', function() {

            var client_id = '81472223417c43ddba6f616bded26b4e'; // Your client id
            var redirect_uri = 'http://localhost:8888/'; // Your redirect uri

            var state = generateRandomString(16);

            localStorage.setItem(stateKey, state);
            var scope = 'user-read-private playlist-read-private ';

            var url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            url += '&state=' + encodeURIComponent(state);

            window.location = url;

;
          }, false);


//-------------------------------------------------- Get user id

                fetch('https://api.spotify.com/v1/me', {
                 method : 'GET', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
                }
                 })

              .then((response) => {return response.json()})

              .then((data) => { 
                         username = data.id;
                         
// -------------------------------------------------- Get playlists made by user (max 200)

var playlist_links = [];

  for (z = 0; z < 151; z = z + 50) {

          var playlist_url = 'https://api.spotify.com/v1/me/playlists?limit=50&offset=';
              playlist_url += encodeURIComponent (z);

              if ( playlist_links.length == 0){
                playlist_links = playlist_url.split();
              }
              else{
                var playlist_holder = [];
                playlist_holder = playlist_url.split();

                playlist_links = playlist_links.concat(playlist_holder);

              }         
  }

 // -------------------------------------------------- Check playlists 0 - 50 

                       fetch(playlist_links[0], {
                         method: 'GET', headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access_token
                        }
                        })

          
            .then((response) => {return response.json()})
                  .then((data) => { 
                 
                      var nofp = data.items;
                      var codes = nofp.map (nofp =>(nofp.id));

                      var createid = nofp.map (nofp => (nofp.owner.id));

               for (i = 0;i < 50; i++)  { 

                        var createid_string = JSON.stringify(createid[i]);
                        var username_string = JSON.stringify(username);

                        var compare = createid_string === username_string;

                          if (compare != true)
                          {   
                            delete codes[i];      
                          }
                      
              }

   // -------------------------------------------------- Check playlists 50 - 100 

                       fetch(playlist_links[1], {
                         method: 'GET', headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access_token
                        }
                        })

          
            .then((response) => {return response.json()})
                  .then((data) => { 
                 
                      var nofp = data.items;
                      var codes1 = nofp.map (nofp =>(nofp.id));

                      var createid = nofp.map (nofp => (nofp.owner.id));

               for (i = 0;i < 50; i++)  { 

                        var createid_string = JSON.stringify(createid[i]);
                        var username_string = JSON.stringify(username);

                        var compare = createid_string === username_string;

                          if (compare != true)
                          {   
                            delete codes1[i];      
                          }
                      
              }

   // -------------------------------------------------- Check playlists 100 - 150 

                       fetch(playlist_links[2], {
                         method: 'GET', headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access_token
                        }
                        })

          
            .then((response) => {return response.json()})
                  .then((data) => { 
                 
                      var nofp = data.items;
                      var codes2 = nofp.map (nofp =>(nofp.id));

                      var createid = nofp.map (nofp => (nofp.owner.id));

               for (i = 0;i < 50; i++)  { 

                        var createid_string = JSON.stringify(createid[i]);
                        var username_string = JSON.stringify(username);

                        var compare = createid_string === username_string;

                          if (compare != true)
                          {   
                            delete codes2[i];      
                          }
                      
              } 
 // -------------------------------------------------- Check playlists 150 - 200

                       fetch(playlist_links[3], {
                         method: 'GET', headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access_token
                        }
                        })

          
            .then((response) => {return response.json()})
                  .then((data) => { 
                 
                      var nofp = data.items;
                      var codes3 = nofp.map (nofp =>(nofp.id));

                      var createid = nofp.map (nofp => (nofp.owner.id));

               for (i = 0;i < 50; i++)  { 

                        var createid_string = JSON.stringify(createid[i]);
                        var username_string = JSON.stringify(username);

                        var compare = createid_string === username_string;

                          if (compare != true)
                          {   
                            delete codes3[i];      
                          }
                      
              }                                              
//-------------------------------------------------- Combine playlists into an array + remove empty values + define array with all songs

      var user_made = [];
      user_made = user_made.concat(codes, codes1, codes2, codes3);
      user_made = user_made.filter(function(entry) { return entry.trim() != ''; });     
 
      var song_options = [];
      var track_links = []; 
      var track_id = []; 
      var album_c_links = [];
      var of20_album_c_links =[];
      var album_covers = [];

//-------------------------------------------------- Get songs in playlists (max 300 songs in a single playlist)

      for (z=0; z < 301; z = z + 100) {

          for (i=0; i < user_made.length; i++) {
                  var playlist_code = user_made[i];

                  var url_tracks = 'https://api.spotify.com/v1/playlists/';
                    url_tracks += encodeURIComponent (playlist_code);
                    url_tracks += '/tracks?market=ca&fields=items(track(name,id,artists(name)))&limit=100&offset=';
                    url_tracks += encodeURIComponent (z);

                    if (track_links.length == 0) {
                         track_links = url_tracks.split();
                    }
                    else {
                      var track_holder = [];
                      track_holder = url_tracks.split();
                      track_links = track_links.concat(track_holder);
                    }
          } 
      }

          for (s = 0; s < track_links.length; s++) { q=1;


                     fetch(track_links[s], {
                           method: 'GET', headers: {
                             'Accept': 'application/json',
                             'Content-Type': 'application/json',
                             'Authorization': 'Bearer ' + access_token
                     }
                    })
                          .then((response) => { return response.json()})

                                .then((data) => {                       

                                var noft = data.items;
                                var song = noft.map (noft => (noft.track));
                                var track = noft.map(noft => (noft.track.id)); 
                                    
                            if (q == track_links.length) {

                                 console.log(song_options);
                                 console.log(track_id);

// //-------------------------------------------------- Get album cover 

//                                     for (t = 0; t < track_id.length; t = t +20){
                                        
//                                         var track_url = 'https://api.spotify.com/v1/tracks?ids=';

//                                         for(g = 0; g<20; g++){

//                                           if (g == 19){
//                                             track_url += encodeURIComponent (track_id[t]);
//                                           }
//                                           else{
//                                             track_url += encodeURIComponent (track_id[t]);
//                                             track_url += ',';
//                                           }

//                                         }
                                            

//                                         if ( album_c_links.length == 0){
//                                              album_c_links = track_url.split();
//                                           }
//                                         else{
//                                               var cover_holder = [];
//                                               cover_holder = track_url.split();

//                                               album_c_links = album_c_links.concat(cover_holder);
//                                           }  
//                                       }          
// console.log(album_c_links);


//                                    for (c = 0; c < album_c_links.length; c++){ k=1;

//                                             fetch(album_c_links[c] , {
//                                             method: 'GET', headers: {
//                                             'Accept': 'application/json',
//                                             'Content-Type': 'application/json',
//                                             'Authorization': 'Bearer ' + access_token

//                                             }})

//                                             .then((response) => {return response.json()})

//                                             .then((data) => {                       
//                                             var nofc = data.tracks;
//                                             var cover = nofc.map (nofc => (nofc.album.images[c].url));

//                                             console.log(cover);

//                                             if (k == track_id.length) {
                                                
//                                                 console.log(album_covers);
//                                             }

//                                             else{
//                                              album_covers = album_covers.concat(cover);
//                                              k++;
//                                             }

//                                             })
//                                 }
                          
                        }
                                else {

                                 song_options = song_options.concat(song);
                                 track_id = track_id.concat(track);

                                 q++;
                                }
                                
//-- songs in playlist                                                   
             })
         }  

//-- userid 
})

//-- playlists
})

})           

})
   
})  

//-- function
 }};