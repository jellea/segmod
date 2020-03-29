var audio = new Audio();
var data = [];
var theme;

window.onload = () => {
  theme = new Theme();
  theme.install(document.body);
  theme.start();

  Module.onRuntimeInitialized = _ => {
    window.read = () => {
      tableFrews = document.getElementById("freqs").value;
      tableData = document.getElementById("index").value;
      vec = Module.gen(tableFrews, tableData);

      for (var i = 0; i < vec.size(); i++) {
        // TODO: figure out correct type over wasm->js embind
        data[i] = vec.get(i);
      }

      var wave = new RIFFWAVE();
      wave.header.bitsPerSample = 16;
      wave.header.sampleRate = 44100;
      wave.header.numChannels = 1;
      wave.Make(data);
      audio.src = wave.dataURI;
    };

    read();
    draw();
  }
};

audio.onpause = () => {
  document.getElementById("playButton").className = "off"
}

const play = (e) => {
  e.className = !audio.paused ? "off" : "";
  if (!audio.paused) {
    audio.pause();
  } else{
    audio.play();
  }
}

const loopToggle = (e) => {
  audio.loop = !audio.loop;
  e.className = audio.loop ? "" : "off";
}

