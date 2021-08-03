function sptfy() {

//-------------------------------------------------- Auth (refresh)

       /**
         * Obtains parameters from the hash of the URL
         * @return Object
         */
        function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }

        var params = getHashParams();

        var access_token = params.access_token,
            refresh_token = params.refresh_token,
            error = params.error;

        if (error) {
          alert('There was an error during the authentication');
        } else {
          if (access_token) {
            // render oauth info


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
              // render initial screen
              $('#login').show();
              $('#loggedin').hide();
          }

          document.getElementById('obtain-new-token').addEventListener('click', function() {
            $.ajax({
              url: '/refresh_token',
              data: {
                'refresh_token': refresh_token
              }
            }).done(function(data) {
              access_token = data.access_token;
              console.log(access_token);
            });
          }, false);         
        }

//-------------------------------------------------- Get user id

let user = new Promise(function(resolve,) {

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
             resolve(username);
             })
}); 

user.then((result) => { 

console.log("User:" + " " + username);
// -------------------------------------------------- Get playlists made by user (max 250) (links)

var playlist_links = [];

  for (z = 0; z < 201; z = z + 50) {

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
  
 // -------------------------------------------------- Check playlists

var user_made =[];

let play_code = () => {

        const promises = [];

        for (let i =0; i < playlist_links.length; i++){

          promises.push ( new Promise ((resolve,) => {

              fetch(playlist_links[i], {
                         method: 'GET', headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access_token
                        }
                        })
          
            .then((response) => {return response.json()})
            .then((data) => { 
                 
                       nofp = data.items;
                       codes = nofp.map (nofp =>(nofp.id));
                       createid = nofp.map (nofp => (nofp.owner.id)); 

                                for (let i = 0;i < 50; i++)  { 

                                      var createid_string = JSON.stringify(createid[i]);
                                      var username_string = JSON.stringify(username);
                                      var compare = createid_string === username_string;

                                           if (compare != true) { delete codes[i] }
                                }   

                       user_made = user_made.concat(codes);
                       user_made = user_made.filter(function(entry) { return entry.trim() != ''; });  
                       resolve (user_made);
            })           

          }))
        }

        return Promise.all(promises);
}


play_code().then(results => { 

// -------------------------------------------------- Get tracks (MAX 300/playlist) (links)

var track_links = [];

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

// -------------------------------------------------- Check tracks

var song_options = [];

let track_code = () => {

        const promises = [];

        for (let s = 0; s < track_links.length; s++) {                              // ---------------------------- TEST CHANGE

          promises.push ( new Promise ((resolve,) => {

              fetch(track_links[s], {
                         method: 'GET', headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access_token
                        }
                        })
          
            .then((response) => {return response.json()})
            .then((data) => { 
                 
                      var noft = data.items;
                      var song = noft.map (noft => (noft.track));
                      song_options = song_options.concat(song);

                      resolve(song_options);
            })           

          }))
        }

        return Promise.all(promises);
}

track_code().then(results => {

// -------------------------------------------------- Variable assginments + inital setup with API results

var song_names = song_options.map (song_options => (song_options.name));

var song_artists = song_options.map (song_options => (song_options.artists));

var song_ids = song_options.map (song_options => (song_options.id));
    // song_ids = song_ids.filter(function(entry) { return entry != null; });


nmbr(song_names);
artist1(song_artists);
artist2(song_artists);

            var url_album = 'https://api.spotify.com/v1/tracks?ids='
                url_album += encodeURIComponent (song_ids[n]) 
                url_album += '%2C';
                url_album += encodeURIComponent (song_ids[m])

            let album_code = new Promise (function(resolve,reject) {

                      fetch(url_album, {
                             method: 'GET', headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access_token
                            }
                      })

                      .then((response) => {return response.json()})
                      .then((data) => { 
                 
                            var nofc = data.tracks;
                            var cover = nofc.map (nofc => (nofc.album.images[1].url));
                  
                            document.getElementById('ac1').style.backgroundImage= 'url(' + cover[0] + ')';
                            document.getElementById('ac2').style.backgroundImage= 'url(' + cover[1] + ')'; 

                      })             
            })

// -------------------------------------------------- Choosing process

let choice = new Promise(function(resolve,reject) {

// -------------------------------------------------- Button 1

document.getElementById("ac1").addEventListener("click", function() {

  if (song_names.length == 2) {
    console.log("done! Your favourite song is" + " " + song_names[n])

    var modal = document.getElementById("f_modal");
    function btn() { modal.style.display = "block"; }

    // window.onclick = function(event) {
    //                   if (event.target == modal) {
    //                   modal.style.display = "none";
    //                 }
    // }

    btn();

    document.getElementById('s_name_f').innerHTML=song_names[n];
    artist1_f(song_artists);

            var url_album = 'https://api.spotify.com/v1/tracks?ids='
                url_album += encodeURIComponent (song_ids[n]) 

            let album_code = new Promise (function(resolve,reject) {

                      fetch(url_album, {
                             method: 'GET', headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access_token
                            }
                      })

                      .then((response) => {return response.json()})
                      .then((data) => { 
                 
                            var nofc = data.tracks;
                            var cover = nofc.map (nofc => (nofc.album.images[1].url));
                  
                            document.getElementById('ac_f').style.backgroundImage= 'url(' + cover + ')';   

                      })             
            })
  }
  
  else {
    song_names.splice(m,1);
    song_artists.splice(m,1);
    song_ids.splice(m,1);
    nmbr(song_names);
    artist1(song_artists);
    artist2(song_artists);

            var url_album = 'https://api.spotify.com/v1/tracks?ids='
                url_album += encodeURIComponent (song_ids[n]) 
                url_album += '%2C';
                url_album += encodeURIComponent (song_ids[m])

            let album_code = new Promise (function(resolve,reject) {

                      fetch(url_album, {
                             method: 'GET', headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access_token
                            }
                      })

                      .then((response) => {return response.json()})
                      .then((data) => { 
                 
                            var nofc = data.tracks;
                            var cover = nofc.map (nofc => (nofc.album.images[1].url));
                  
                            document.getElementById('ac1').style.backgroundImage= 'url(' + cover[0] + ')';
                            document.getElementById('ac2').style.backgroundImage= 'url(' + cover[1] + ')';    

                      })             
            })
}

});

// -------------------------------------------------- Button 2

document.getElementById("ac2").addEventListener("click", function() {

  if (song_names.length == 2) { 
      console.log("done! Your favourite song is" + " " + song_names[m])
      
    var modal = document.getElementById("f_modal");
    function btn() { modal.style.display = "block"; }

    // window.onclick = function(event) {
    //                   if (event.target == modal) {
    //                   modal.style.display = "none";
    //                 }
    // }

    btn();

    document.getElementById('s_name_f').innerHTML=song_names[m];
    artist2_f(song_artists);

            var url_album = 'https://api.spotify.com/v1/tracks?ids='
                url_album += encodeURIComponent (song_ids[m]) 

            let album_code = new Promise (function(resolve,reject) {

                      fetch(url_album, {
                             method: 'GET', headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access_token
                            }
                      })

                      .then((response) => {return response.json()})
                      .then((data) => { 
                 
                            var nofc = data.tracks;
                            var cover = nofc.map (nofc => (nofc.album.images[1].url));
                  
                            document.getElementById('ac_f').style.backgroundImage= 'url(' + cover + ')';   

                      })             
            })

  }

  else {
    song_names.splice(n,1);
    song_artists.splice(n,1);
    song_ids.splice(n,1);
    nmbr(song_names);
    artist1(song_artists);
    artist2(song_artists);

            var url_album = 'https://api.spotify.com/v1/tracks?ids='
                url_album += encodeURIComponent (song_ids[n]) 
                url_album += '%2C';
                url_album += encodeURIComponent (song_ids[m])

            let album_code = new Promise (function(resolve,reject) {

                      fetch(url_album, {
                             method: 'GET', headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access_token
                            }
                      })

                      .then((response) => {return response.json()})
                      .then((data) => { 
                 
                            var nofc = data.tracks;
                            var cover = nofc.map (nofc => (nofc.album.images[1].url));
                  
                            document.getElementById('ac1').style.backgroundImage= 'url(' + cover[0] + ')';
                            document.getElementById('ac2').style.backgroundImage= 'url(' + cover[1] + ')';                 
                      })             
            })
  }

//-- choice
});

//-- play.code.then 
});

//-- track links (result)
});

//-- playlist links (result)
});

//-- user (result)
});

//-- function
};


// -------------------------------------------------- HMTL interaction functions

 function nmbr(song_names) {
do {
n = Math.floor(Math.random() * song_names.length);
document.getElementById('s_name1').innerHTML=song_names[n];


m = Math.floor(Math.random() * song_names.length);
document.getElementById('s_name2').innerHTML=song_names[m];

console.log('songs remaining:' + ' ' + song_names.length);

}

while(n==m)
};

function artist1(song_artists) {

var getout = song_artists[n];
var a_array = [];

for (i = 0; i < getout.length; i++) {
var nofa = getout[i].name;
a_array = a_array.concat(nofa);
}

var artist_name = a_array.toString();
var newchar = ', ';
artist_name = artist_name.split(',').join(newchar);
document.getElementById('a_name1').innerHTML= artist_name;

}

function artist2(song_artists) {

var getout = song_artists[m];
var a_array = [];

for (i = 0; i < getout.length; i++) {
var nofa = getout[i].name;
a_array = a_array.concat(nofa);
}

var artist_name = a_array.toString();
var newchar = ', ';
artist_name = artist_name.split(',').join(newchar);
document.getElementById('a_name2').innerHTML= artist_name;

}

function artist1_f(song_artists) {

var getout = song_artists[n];
var a_array = [];

for (i = 0; i < getout.length; i++) {
var nofa = getout[i].name;
a_array = a_array.concat(nofa);
}

var artist_name = a_array.toString();
var newchar = ', ';
artist_name = artist_name.split(',').join(newchar);
document.getElementById('a_name_f').innerHTML= artist_name;

}

function artist2_f(song_artists) {

var getout = song_artists[m];
var a_array = [];

for (i = 0; i < getout.length; i++) {
var nofa = getout[i].name;
a_array = a_array.concat(nofa);
}

var artist_name = a_array.toString();
var newchar = ', ';
artist_name = artist_name.split(',').join(newchar);
document.getElementById('a_name_f').innerHTML= artist_name;

}