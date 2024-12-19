  const profileContainer = document.getElementById('profile');

 document.getElementById('fetchProfile').addEventListener('click', async () => {
   const username = document.getElementById('username').value.trim();
   
   if (!username) {
     profileContainer.innerHTML = '<p>Please enter a username.</p>';
     return;
   }

   profileContainer.innerHTML = '<p>Loading...</p>';

   try {

     const userResponse = await fetch(`https://api.github.com/users/${username}`);

     if (!userResponse.ok) {
       throw new Error('User not found');
     }

     const userData = await userResponse.json();

     
     const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
     const reposData = await reposResponse.json();
 
     profileContainer.innerHTML = `
       <div style="border: 1px solid #ccc; padding: 16px; border-radius: 8px;">
         <img src="${userData.avatar_url}" alt="Profile Picture" style="width: 100px; border-radius: 50%;" />
         <h2>${userData.name || 'No Name'}</h2>
         <p>@${userData.login}</p>
         <p>${userData.bio || 'No bio available'}</p>
         <p><strong>Company:</strong> ${userData.company || 'N/A'}</p>
         <p><strong>Location:</strong> ${userData.location || 'N/A'}</p>
         <p><strong>Followers:</strong> ${userData.followers}</p>
         <p><strong>Following:</strong> ${userData.following}</p>
         <p><strong>Public Repositories:</strong> ${userData.public_repos}</p>
       </div>
     `;
   } catch (error) {
     profileContainer.innerHTML = `<p>Error: ${error.message}</p>`;
   }
 });



 document.getElementById('searchButton').addEventListener('click', function() {

  let movieName = document.getElementById('movieInput').value;
  let apiUrl = 'https://api.tvmaze.com/singlesearch/shows?q=' + movieName;
  fetch(apiUrl)
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
         let resultDiv = document.getElementById('movieResult');
          if (data.name) {
              resultDiv.innerHTML = '<h2>' + data.name + '</h2>' +
                                    '<p><strong>Language:</strong> ' + data.language + '</p>' +
                                    '<p><strong>Genres:</strong> ' + data.genres.join(', ') + '</p>' +
                                    '<p><strong>Summary:</strong> ' + data.summary + '</p>' +
                                    (data.image ? '<img src="' + data.image.medium + '" alt="Show Poster">' : '');
          } else {
              resultDiv.innerHTML = '<p>Show not found!</p>';
          }
      })
      .catch(function(error) {
          console.log('Error:', error);
      });
});