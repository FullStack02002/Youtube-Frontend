const formatDuration=(durationInseconds)=>{

    const minutes=Math.floor(durationInseconds/60);
    const seconds=Math.floor(durationInseconds%60);

    const formatedSeconds=seconds<10?`0${seconds}`:seconds;

    return `${minutes}:${formatedSeconds}`;



}

export {formatDuration};