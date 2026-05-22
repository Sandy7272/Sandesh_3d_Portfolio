window.addEventListener('error', (event) => {
  console.error("GLOBAL ERROR:", event.error);
  fetch('http://localhost:5174/__log_error', {
    method: 'POST',
    body: event.error ? event.error.stack : event.message
  }).catch(()=> {
    // fallback if fetch fails
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.left = '0';
    div.style.zIndex = '9999';
    div.style.background = 'red';
    div.style.color = 'white';
    div.style.padding = '10px';
    div.innerText = event.error ? event.error.stack : event.message;
    document.body.appendChild(div);
  });
});

window.addEventListener('unhandledrejection', (event) => {
  console.error("UNHANDLED REJECTION:", event.reason);
  const div = document.createElement('div');
  div.style.position = 'fixed';
  div.style.top = '50px';
  div.style.left = '0';
  div.style.zIndex = '9999';
  div.style.background = 'orange';
  div.style.color = 'white';
  div.style.padding = '10px';
  div.innerText = event.reason ? (event.reason.stack || event.reason) : "Unknown rejection";
  document.body.appendChild(div);
});
