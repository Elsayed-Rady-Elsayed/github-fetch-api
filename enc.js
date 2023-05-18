let inputField = document.getElementById("inputField");
let getBtn = document.getElementById("getBtn");
let showData = document.getElementById("showData");

getBtn.onclick = () => {
  if (inputField.value == "") {
    showData.innerHTML = "please etner the github username";
  } else {
    fetchData(inputField.value);
  }
};
function fetchData(name) {
  fetch(`https://api.github.com/users/${name}/repos`)
    .then((data) => data.json())
    .then((repos) => {
      //profile image//
      showData.innerHTML = "";
      let pf_info = document.createElement("div");
      pf_info.className = "pf-info";
      let img = document.createElement("img");
      img.className = "pf-img";
      img.src = repos[0].owner.avatar_url;
      img.alt = "the profile";
      //profile name and link//
      let pf_link = document.createElement("a");
      pf_link.href = repos[0].owner.html_url;
      pf_link.setAttribute("target", "_blank");
      pf_link.className = "pf-link";
      pf_link.appendChild(document.createTextNode(repos[0].owner.login));
      pf_info.appendChild(img);
      pf_info.appendChild(pf_link);
      showData.appendChild(pf_info);
      //repos appending//
      repos.forEach((element) => {
        //repo div//
        let right = document.createElement("right-details");
        right.className = "right";
        let repDiv = document.createElement("div");
        repDiv.classList.add("repo");
        let repoName = document.createTextNode(element.name);
        if (element.name.length > 25) {
          repoName.textContent = element.name.substring(0, 25) + "...";
        }
        repDiv.appendChild(repoName);
        //link to the repo//
        let visitLink = document.createElement("a");
        visitLink.appendChild(document.createTextNode("visit"));
        visitLink.href = element.html_url;
        visitLink.setAttribute("target", "_blank");
        right.appendChild(visitLink);
        //repo stars//
        let starsSpan = document.createElement("span");
        let stars = document.createTextNode(element.stargazers_count);
        starsSpan.appendChild(stars);
        right.appendChild(starsSpan);
        repDiv.appendChild(right);
        showData.appendChild(repDiv);
      });
    });
}
