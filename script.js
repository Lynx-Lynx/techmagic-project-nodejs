const DIV = document.getElementsByClassName('content')[0];

async function loadJSON () {
  const res = await fetch('./data.json');
  const data = res.json().then(json => {
    DIV.innerHTML = json.content;
  });
}

window.addEventListener('load', loadJSON)