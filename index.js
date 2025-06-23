const username = "scranso";

fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(user => {
        const profileSection = document.getElementById("github-profile");
        profileSection.className = "profileSection";
        
        profileSection.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.name}'s avatar" width="100">
          <h2>${user.name}</h2>
          <p>${user.bio || ''}</p>
          <p><strong>Location:</strong> ${user.location || 'N/A'}</p>
          <p><strong>Public Repos:</strong> ${user.public_repos}</p>
          <a href="${user.html_url}" target="_blank">View GitHub Profile</a>  
        `;
    })
    .catch(error => {
        console.error("error fetching profile:", error);
        document.getElementById("github-profile").textContent = "Unable to load Github profile.";
    });

// fetch(`https://api.github.com/users/${username}/repos?sort=updated`)      <----- Abandoned for cleaner code
//     .then(res => res.json())
//     .then(repos => {
//         const repoSection = document.getElementById("github-repos");
//         repoSection.innerHTML = "<h3>Featured Repositories</h3>";

//         const list = document.createElement("ul");
//         repos.slice(0, 3).forEach(repo => {
//             const item = document.createElement("li");
//             item.innerHTML = `
//                 <a href="${repo.html_url}" target="_blank"><strong>${repo.name}</strong></a>: ${repo.description || 'No description'}
//             `;
//             list.appendChild(item);
//         });

//         repoSection.appendChild(list);
//     })
//     .catch(error => {
//         console.error("Error fetching repos:", error);
//         document.getElementById("github-repos").textContent = "Unable to load repositories.";
//     });

function fetchRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${Response.status}`);
            return res.json();
        })
        .then(displayRepos)
        .catch(handleRepoError);
}

function displayRepos(repos) {
    const repoSection = document.getElementById("github-repos");

    if (repos.length === 0) {
        repoSection.textContent = "No public repositories available.";
        return;
    }

    repoSection.innerHTML = "<h3>Recent Repositories</h3>";

    const list = document.createElement("ul");

    repos.slice(0, 5).forEach(repo => {
        const repoBox = document.createElement("div");
        repoBox.className = 'repoBox';
        
        repoBox.innerHTML = `
            <a href="${repo.html_url}" target="_blank"><strong>${repo.name}</strong></a>
            <p>${repo.description || 'No description provided.'}</p>
            `;
            list.appendChild(repoBox);
    });

    repoSection.appendChild(list);
}

function handleRepoError(error) {
    console.error("Repo fetch error:", error);
    document.getElementById("github-repos").textContent = "Failed to load repositories.";
}

fetchRepos(username);