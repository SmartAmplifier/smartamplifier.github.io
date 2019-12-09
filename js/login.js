const login = '<h1>First login with same Google account as you are logged in with Google Assistant</h1><div class="login"><div class="g-signin2" data-onsuccess="onSignIn"></div></div>'

function register()
{
    //var amplifier = document.getElementById('amplifier').value;
    axios({
        method: 'post',
        url: `http://smart-amplifier-api.radimkozak.com/pair/new/amplifier/`,
        data: {
          email: `0radimkozak0@gmail.com`,
          amplifier: `b30043c16d19`
        }
      });
}

function onSignIn(googleUser)
{
    var profile = googleUser.getBasicProfile();

    // get id token googleUser.getAuthResponse().id_token
    document.getElementById('content').innerHTML = "<h1>Account info</h1>"
    document.getElementById('content').innerHTML += `<p>Name: ${profile.getName()}</p>`
    document.getElementById('content').innerHTML += `<img src="${profile.getImageUrl()}" alt="Jak psát web">`
    document.getElementById('content').innerHTML += `<p>Name: ${profile.getEmail()}</p>`
    axios.get(`http://smart-amplifier-api.radimkozak.com/get/paired/amplifier/${profile.getEmail()}`)
    .then(response => {
        console.log(response.data.amplifier);
        if(response.data.amplifier == undefined)
        {
            document.getElementById('content').innerHTML += `<p>No paired amplifier<p/>`
        }
        else
        {
            document.getElementById('content').innerHTML += `<p>Paired amplifier: ${response.data.amplifier}<p/>`
            }
            document.getElementById('content').innerHTML += `
            <form style="padding-bottom: 10px" onsubmit="return register()">
            <div style="margin:auto; padding-bottom: 10px" class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon3">Pair new amplifier</span>
            </div>
            <input type="text" class="form-control" id="amplifier" aria-describedby="basic-addon3">
            </div>
            <button type="submit" class="btn btn-primary">Pair</button>
            </form>`
            document.getElementById('content').innerHTML += `<button style="width:100px; margin: auto;" type="button" onclick="signOut();" class="btn btn-primary btn-lg btn-block">Sign out</button>`
    });

    axios({
        method: 'post',
        url: `http://smart-amplifier-api.radimkozak.com/pair/new/amplifier/`,
        data: {
          email: `0radimkozak0@gmail.com`,
          amplifier: `b30043c16d19`
        }
      }).then(response => {
          console.log(response);
      });
}

function returnLogin()
{
    return login
}

function signOut()
{
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        location.reload();
    });
}