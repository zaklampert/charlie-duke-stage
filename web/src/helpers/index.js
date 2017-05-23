const pauseHowls = () =>{
  const howls = window.Howler._howls;
    howls && howls.forEach(howl=>{
      howl.pause();
  });
}

export {
  pauseHowls,
}
