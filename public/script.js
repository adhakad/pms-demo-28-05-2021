if(ROOMH_ID){
  console.log(ROOMH_ID);console.log("not null");
}


const myName = prompt("Please enter your name");
// show loading state
const loading = document.createElement("div");
const spin = document.createElement("div");
loading.setAttribute("class", "d-flex loading");
spin.classList.add("loading_spinner");

loading.appendChild(spin);
document.body.appendChild(loading);

const socket = io("/");
const peer = new Peer(undefined, {
  secure: true,
  host: "spanion-video-chat-peer.herokuapp.com",
  // host: "/",
  // port: "3001",
});

const peers = {};
const videoGrid = document.getElementById("video-grid");
const videoText = document.createElement("div");
const videoItem = document.createElement("div");
videoItem.classList.add("video__item");
videoText.classList.add("video__name");
videoItem.append(videoText);

const video = document.createElement("video");
video.muted = true;

const mediaConfig = {
  video: true,
  audio: true,
};

peer.on("open", (id) => {
  if (loading) loading.remove();
  socket.emit("join-room", ROOM_ID, { id, name: myName });
  navigator.mediaDevices
    .getUserMedia(mediaConfig)
    .then((stream) => {
      addClickListeners(stream);
      addVideoStream(video, stream, id, myName);
      //console.log(id);console.log("user");
      peer.on("call", (call) => {
        call.answer(stream);
        const video = document.createElement("video");
        if(ROOMH_ID){
          call.on("stream", (userStream) => {
            const userId = call.peer;
            const userName = call.metadata.name; 
            if(userId==ROOMH_ID){
              addVideoStream(video, userStream,userId, userName);
              //console.log(userId);console.log("join user");
            }
          });
        }
      });
      if(ROOMH_ID==!id){
        socket.on("user-connected", ({ id, name }) => {
          console.log(id);console.log("a");                 
          connectToNewUser({ id, name }, stream);
        });
      }
    })
    .catch((err) => {
      document.write(err);
    });
});

socket.on("user-disconnected", ({ id, name }) => {
  const video = document.getElementById(id);
  if (video) {
    video.parentElement.remove();
  }
  if (peers[id]) peers[id].close();
});

function connectToNewUser({ id, name }, stream) {
  const call = peer.call(id, stream, { metadata: { name: myName } });
  const video = document.createElement("video");
      call.on("stream", (userStream) => {
        addVideoStream(video, userStream, id, name);
        console.log(id);console.log("new user connect");
      });
  call.on("close", () => {
    video.remove();
  });
  peers[id] = call;
}



function addVideoStream(video, stream, id, name) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  video.setAttribute("id", id);
  const clonedItem = videoItem.cloneNode(true);
  clonedItem.children[0].innerHTML = name;
  clonedItem.append(video);
  videoGrid.append(clonedItem);
  // weird error cleanup
  const nodes = document.querySelectorAll(".video__item") || [];
  nodes.forEach((node) => {
    if (node.children && node.children.length < 2) {
      node.remove();
    }
  });
}

function addClickListeners(stream) {
  const pause = document.getElementById("pause-video");
  const mute = document.getElementById("mute-video");
  pause.addEventListener("click", () => {
    stream.getTracks().forEach((t) => {
      if (t.kind === "video") {
        t.enabled = !t.enabled;
        pause.innerHTML = t.enabled ? "🐵" : "🙈";
      }
    });
  });
  mute.addEventListener("click", () => {
    stream.getTracks().forEach((t) => {
      if (t.kind === "audio") {
        t.enabled = !t.enabled;
        mute.innerHTML = t.enabled ? "🔊" : "🔈";
      }
    });
  });
}

function log(text) {
  console.info(text);
}