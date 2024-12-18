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
       <h3>Latest 5 Repositories</h3>
       <ul>
         ${reposData.slice(0, 5).map(repo => `
           <li>
             <a href="${repo.html_url}" target="_blank">${repo.name}</a>
             <p>${repo.description || 'No description available'}</p>
             <p><strong>Language:</strong> ${repo.language || 'N/A'}</p>
             <p><strong>Stars:</strong> ${repo.stargazers_count} | <strong>Forks:</strong> ${repo.forks_count}</p>
           </li>
         `).join('')}
       </ul>
     `;
   } catch (error) {
     profileContainer.innerHTML = `<p>Error: ${error.message}</p>`;
   }
 });