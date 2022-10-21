

let songContainer = document.querySelector('.container')
let searchMusic;
let updatedSearchMusic = (e) => {
    searchMusic = document.querySelector('input').value
     if (!searchMusic || searchMusic === '') {
        alert('Please search for a song')
     } else {
        while (songContainer.firstChild) {
            songContainer.removeChild(songContainer.firstChild);
        }
                
        fetch(`https://itunes.apple.com/search?media=music&term=${searchMusic}`)
        .then((response) =>
            response.json()
        )
        .then((data) => {
            const musicData = data.results;
            return musicData.map((result) => {


                const div = document.createElement('div'),
                    image = document.createElement('img'),  
                    artist = document.createElement("p"),  
                    song = document.createElement("p"),  
                    audio = document.createElement("audio"),  
                    audiosrc = document.createElement("source")
                    console.log(result);

                    image.src = result.artworkUrl100;
                    artist.innerHTML = result.artistName;
                    song.innerHTML = result.trackName;
                    audiosrc.src = result.previewUrl;
                    audio.setAttribute('controls', '');

                    div.appendChild(image);
                    div.appendChild(artist);
                    div.appendChild(song);
                    audio.appendChild(audiosrc);
                    div.appendChild(audio);

                    songContainer.appendChild(div);

            })
        })
        .catch((error) => {
            console.log('this ia an error', error)
        })

     }
     e.preventDefault()
}

let btn = document.querySelector('button')
btn.addEventListener('click', updatedSearchMusic)

document.addEventListener('play', (e) => {
    let stopMusic = document.getElementsByTagName('audio')

    for (let i = 0; i < stopMusic.length; i++){
        if (stopMusic[i] != e.target) {
            stopMusic[i].pause();
        }
    }
}, true)